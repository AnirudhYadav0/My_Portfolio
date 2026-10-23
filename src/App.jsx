import React, { useState, useEffect, useCallback, Suspense } from 'react';
import BootSequence from './components/BootSequence';
import WebGLFallback from './components/WebGLFallback';
import UniverseNavigation from './components/UniverseNavigation';
import HUDPanel from './components/HUDPanel';
import DeveloperTerminal from './components/DeveloperTerminal';
import RecruiterMode from './components/RecruiterMode';
import { useReducedMotion } from './hooks/useReducedMotion';

// Lazy-load the heavy 3D scene
const UniverseScene = React.lazy(() => import('./components/UniverseScene'));

// ============================================================
// WebGL detection
// ============================================================
function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

// ============================================================
// Scene Error Boundary for WebGL / GPU context resilience
// ============================================================
class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('UniverseScene 3D render error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'linear-gradient(135deg, #05060B 0%, #090D19 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '20px', padding: '24px', textAlign: 'center',
          zIndex: 10,
        }}>
          <div style={{ fontSize: '36px' }}>⚡</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#F4F7FF' }}>
            3D Graphics Pipeline Encountered an Issue
          </div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: '#929BB3', maxWidth: '440px', lineHeight: 1.6 }}>
            Your hardware or browser may have had a temporary GPU context reset. You can reload the 3D scene or explore the complete portfolio in accessible Recruiter Mode.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                background: '#00F5FF', color: '#05060B', border: 'none',
                borderRadius: '8px', padding: '10px 20px', fontWeight: 700,
                cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Retry 3D Scene
            </button>
            <button
              onClick={this.props.onFallback}
              style={{
                background: 'transparent', color: '#00F5FF',
                border: '1px solid rgba(0,245,255,0.4)', borderRadius: '8px',
                padding: '10px 20px', fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Switch to Recruiter Mode
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [phase, setPhase] = useState('boot'); // 'boot' | 'universe' | 'fallback'
  const [selectedId, setSelectedId] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [webglSupported] = useState(detectWebGL);
  const prefersReducedMotion = useReducedMotion();
  // Track viewport width for responsive HUD sizing
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1280));

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Boot → Universe transition
  const handleBootComplete = useCallback(() => {
    if (!webglSupported) {
      setPhase('fallback');
      // Automatically open recruiter mode as the accessible fallback experience
      setRecruiterMode(true);
    } else {
      setPhase('universe');
    }
  }, [webglSupported]);

  // Keyboard shortcuts
  useEffect(() => {
    if (phase !== 'universe') return;

    const handleKey = (e) => {
      // If typing in input, textarea, or select, ignore global navigation shortcuts
      const isInputFocused = e.target && e.target.tagName && e.target.tagName.match(/input|textarea|select/i);
      if (isInputFocused) {
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      // Backtick or 'T' toggles terminal
      if ((e.key === '`' || e.key === 't' || e.key === 'T') && !terminalOpen) {
        setTerminalOpen(true);
        return;
      }

      // Escape closes open panels with correct modal layer priority:
      // 1. Terminal (topmost) -> 2. Recruiter Mode -> 3. HUD planet panel
      if (e.key === 'Escape') {
        if (terminalOpen) {
          setTerminalOpen(false);
          return;
        }
        if (recruiterMode) {
          setRecruiterMode(false);
          return;
        }
        if (selectedId) {
          setSelectedId(null);
          return;
        }
      }

      // 'M' toggles recruiter mode
      if (e.key === 'm' || e.key === 'M') {
        setRecruiterMode(prev => !prev);
        return;
      }

      // Numeric shortcuts 1-6 to quickly jump to worlds
      if (!terminalOpen && !recruiterMode && ['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const numIds = ['about', 'tripnexus', 'enterskill', 'skills', 'experience', 'contact'];
        const chosen = numIds[parseInt(e.key, 10) - 1];
        if (chosen) {
          setSelectedId(chosen);
          return;
        }
      }

      // Arrow keys cycle through planets
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !terminalOpen && !recruiterMode) {
        e.preventDefault();
        const ids = ['about', 'tripnexus', 'enterskill', 'skills', 'experience', 'contact'];
        const currIdx = selectedId ? ids.indexOf(selectedId) : -1;
        if (e.key === 'ArrowRight') {
          const nextIdx = (currIdx + 1) % ids.length;
          setSelectedId(ids[nextIdx]);
        } else {
          const prevIdx = currIdx <= 0 ? ids.length - 1 : currIdx - 1;
          setSelectedId(ids[prevIdx]);
        }
        return;
      }

      // R or Home resets camera / universe view
      if (e.key === 'r' || e.key === 'R' || e.key === 'Home') {
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, selectedId, terminalOpen, recruiterMode]);

  const handleNavigate = useCallback((dest) => {
    setSelectedId(dest);
    setTerminalOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle scanline overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
          zIndex: 9999,
        }}
      />

      {/* Boot Phase */}
      {phase === 'boot' && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {/* WebGL Fallback */}
      {phase === 'fallback' && (
        <>
          <WebGLFallback onContinue={() => setRecruiterMode(true)} />
          {recruiterMode && (
            <RecruiterMode onClose={() => setRecruiterMode(false)} />
          )}
        </>
      )}

      {/* Main Universe Phase */}
      {phase === 'universe' && (
        <>
          {/* 3D Canvas */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
            <Suspense
              fallback={
                <div style={{
                  position: 'fixed', inset: 0,
                  background: 'linear-gradient(135deg, #05060B 0%, #090D19 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '16px',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: '2px solid rgba(0,245,255,0.2)',
                    borderTop: '2px solid #00F5FF',
                    animation: 'orbit 1s linear infinite',
                  }} aria-label="Loading 3D scene" />
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                    color: 'rgba(0,245,255,0.5)',
                    letterSpacing: '0.1em',
                  }}>
                    LOADING UNIVERSE…
                  </div>
                </div>
              }
            >
              <SceneErrorBoundary onFallback={() => setRecruiterMode(true)}>
                <UniverseScene
                  selectedId={selectedId}
                  onSelect={(id) => {
                    setSelectedId(id);
                    if (id) setTerminalOpen(false);
                  }}
                />
              </SceneErrorBoundary>
            </Suspense>
          </div>

          {/* Navigation Overlay */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000, pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'all', height: '100%' }}>
              <UniverseNavigation
                selectedId={selectedId}
                onSelect={(id) => {
                  setSelectedId(id);
                  setTerminalOpen(false);
                }}
                onReset={handleReset}
                onTerminal={() => setTerminalOpen(v => !v)}
                onRecruiterMode={() => setRecruiterMode(v => !v)}
                isRecruiterMode={recruiterMode}
              />
            </div>
          </div>

          {/* HUD Cockpit Modal */}
          {selectedId && !recruiterMode && (
            <HUDPanel
              activeDestination={selectedId}
              onClose={() => setSelectedId(null)}
              onNavigate={handleNavigate}
            />
          )}

          {/* Developer Terminal */}
          {terminalOpen && (
            <DeveloperTerminal
              onClose={() => setTerminalOpen(false)}
              onNavigate={handleNavigate}
            />
          )}

          {/* Recruiter Mode */}
          {recruiterMode && (
            <RecruiterMode onClose={() => setRecruiterMode(false)} />
          )}
        </>
      )}
    </div>
  );
}

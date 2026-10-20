import React, { useState, useEffect, useCallback, Suspense } from 'react';
import BootSequence from './components/BootSequence';
import WebGLFallback from './components/WebGLFallback';
import UniverseNavigation from './components/UniverseNavigation';
import HUDPanel from './components/HUDPanel';
import DeveloperTerminal from './components/DeveloperTerminal';
import RecruiterMode from './components/RecruiterMode';

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
// APP
// ============================================================
export default function App() {
  const [phase, setPhase] = useState('boot'); // 'boot' | 'universe' | 'fallback'
  const [selectedId, setSelectedId] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [webglSupported] = useState(detectWebGL);

  // Boot → Universe transition
  const handleBootComplete = useCallback(() => {
    if (!webglSupported) {
      setPhase('fallback');
    } else {
      setPhase('universe');
    }
  }, [webglSupported]);

  // Keyboard shortcuts
  useEffect(() => {
    if (phase !== 'universe') return;

    const handleKey = (e) => {
      // Backtick opens terminal
      if (e.key === '`' && !terminalOpen) {
        setTerminalOpen(true);
        return;
      }
      // Escape closes panels
      if (e.key === 'Escape') {
        if (terminalOpen) {
          setTerminalOpen(false);
          return;
        }
        if (selectedId) {
          setSelectedId(null);
          return;
        }
        if (recruiterMode) {
          setRecruiterMode(false);
          return;
        }
      }
      // R resets camera
      if (e.key === 'r' || e.key === 'R') {
        if (!e.target.tagName.match(/input|textarea/i)) {
          setSelectedId(null);
        }
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
          <WebGLFallback onContinue={() => {}} />
          <RecruiterMode onClose={() => {}} />
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
              <UniverseScene
                selectedId={selectedId}
                onSelect={(id) => {
                  setSelectedId(id);
                  if (id) setTerminalOpen(false);
                }}
              />
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

          {/* HUD Panel */}
          {selectedId && !recruiterMode && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 5000, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '460px', maxWidth: '94vw', pointerEvents: 'all' }}>
                <HUDPanel
                  activeDestination={selectedId}
                  onClose={() => setSelectedId(null)}
                  onNavigate={handleNavigate}
                />
              </div>
            </div>
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

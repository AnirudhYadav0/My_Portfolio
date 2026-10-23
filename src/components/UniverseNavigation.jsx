import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Github, Terminal, Briefcase, Globe, Layers, ChevronRight } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { profile } from '../data/profile';
import { toggleAmbientAudio, playCyberClick } from '../utils/audioSynth';

export default function UniverseNavigation({
  selectedId,
  onSelect,
  onReset,
  onTerminal,
  onRecruiterMode,
  isRecruiterMode,
}) {
  const selected = DESTINATIONS.find(d => d.id === selectedId);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAudioToggle = () => {
    const active = toggleAmbientAudio();
    setIsMuted(!active);
  };

  return (
    <>
      {/* Top HUD Bar */}
      <header style={styles.topBar} role="banner">
        {/* Left: Cyber Geometric Emblem + Brand */}
        <div style={styles.logo} onClick={onReset} role="button" tabIndex={0} aria-label="Return to Universe overview">
          <svg width="30" height="30" viewBox="0 0 36 36" aria-hidden="true">
            <defs>
              <linearGradient id="neonHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="100%" stopColor="#FF35D3" />
              </linearGradient>
            </defs>
            {/* Hexagon tech boundary */}
            <polygon
              points="18,3 32,10.5 32,25.5 18,33 4,25.5 4,10.5"
              fill="rgba(9, 13, 25, 0.7)"
              stroke="url(#neonHexGrad)"
              strokeWidth="1.8"
            />
            {/* Inner gyro core */}
            <circle cx="18" cy="18" r="6" fill="#090D19" stroke="#00F5FF" strokeWidth="1.2" />
            <circle cx="18" cy="18" r="2.5" fill="#FF35D3" />
          </svg>
          <div style={styles.brandTitle}>NEONVERSE</div>
        </div>

        {/* Center: Segmented Navigation Pill Switcher (Desktop/Tablet) */}
        {!isMobile && (
          <nav style={styles.centerSegment} aria-label="Primary navigation modes">
            <button
              onClick={() => {
                playCyberClick();
                if (isRecruiterMode) onRecruiterMode();
                onReset();
              }}
              style={{
                ...styles.segmentBtn,
                background: !isRecruiterMode && !selectedId ? 'rgba(0, 245, 255, 0.18)' : 'transparent',
                color: !isRecruiterMode && !selectedId ? '#00F5FF' : '#929BB3',
                borderColor: !isRecruiterMode && !selectedId ? '#00F5FF' : 'transparent',
                boxShadow: !isRecruiterMode && !selectedId ? '0 0 16px rgba(0, 245, 255, 0.35)' : 'none',
              }}
              aria-pressed={!isRecruiterMode && !selectedId}
            >
              UNIVERSE
            </button>

            <button
              onClick={() => {
                playCyberClick();
                onTerminal();
              }}
              style={{
                ...styles.segmentBtn,
                color: '#929BB3',
                borderColor: 'transparent',
              }}
            >
              TERMINAL
            </button>

            <button
              onClick={() => {
                playCyberClick();
                onRecruiterMode();
              }}
              style={{
                ...styles.segmentBtn,
                background: isRecruiterMode ? 'rgba(0, 245, 255, 0.18)' : 'transparent',
                color: isRecruiterMode ? '#00F5FF' : '#929BB3',
                borderColor: isRecruiterMode ? '#00F5FF' : 'transparent',
                boxShadow: isRecruiterMode ? '0 0 16px rgba(0, 245, 255, 0.35)' : 'none',
              }}
              aria-pressed={isRecruiterMode}
            >
              RECRUITER MODE
            </button>
          </nav>
        )}

        {/* Right: Audio Ambient Toggle & GitHub */}
        <div style={styles.rightActions}>
          <button
            onClick={handleAudioToggle}
            style={{
              ...styles.iconBtn,
              borderColor: !isMuted ? '#00F5FF' : 'rgba(146, 155, 179, 0.25)',
              color: !isMuted ? '#00F5FF' : '#929BB3',
              background: !isMuted ? 'rgba(0, 245, 255, 0.12)' : 'transparent',
              boxShadow: !isMuted ? '0 0 14px rgba(0, 245, 255, 0.4)' : 'none',
            }}
            title={isMuted ? 'Play Ambient Sci-Fi Audio' : 'Mute Ambient Audio'}
            aria-label={isMuted ? 'Play Ambient Sci-Fi Audio' : 'Mute Ambient Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconBtn}
            title="GitHub Repository"
            aria-label="GitHub Profile"
          >
            <Github size={15} />
          </a>
        </div>
      </header>

      {/* Hero Left Content Overlay — visible when no world is selected */}
      {!selectedId && (
        <section
          style={{
            ...styles.heroOverlay,
            paddingLeft: isMobile ? '20px' : '48px',
            paddingRight: isMobile ? '20px' : '0',
            alignItems: isMobile ? 'flex-end' : 'center',
            paddingBottom: isMobile ? '130px' : '0',
            maxWidth: isMobile ? '100%' : '620px',
          }}
          aria-live="polite"
        >
          <div style={{
            ...styles.heroContent,
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            {/* Tag */}
            <div style={styles.heroTag} aria-hidden="true">
              <span style={styles.tagDot} />
              FULL-STACK DEVELOPER / DIGITAL BUILDER
            </div>

            {/* Glowing Dual-Tone Name Header */}
            <h1 style={styles.heroName}>
              <span style={styles.nameCyan}>ANIRUDH </span>
              <span style={styles.nameMagenta}>YADAV</span>
            </h1>

            {/* Subtitle */}
            <p style={styles.heroTagline}>
              "Building meaningful digital experiences, one world at a time."
            </p>

            {/* Actions */}
            <div style={styles.heroActions}>
              <button
                style={styles.exploreBtn}
                onClick={() => {
                  playCyberClick();
                  onSelect('about');
                }}
                aria-label="Explore Universe — start with About Me"
              >
                EXPLORE UNIVERSE <ChevronRight size={16} />
              </button>

              <a
                href={profile.resume || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                download="Anirudh_Yadav_Resume.pdf"
                style={styles.resumeBtn}
                aria-label="Quick view resume"
              >
                QUICK VIEW RESUME
              </a>
            </div>

            {/* Bottom-left interaction guides (Desktop) */}
            {!isMobile && (
              <div style={styles.instructionList} aria-label="Navigation controls hint">
                <div style={styles.instructionItem}>
                  <span style={styles.instructionIcon}>↓</span> Drag to explore
                </div>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionIcon}>↓</span> Scroll to zoom
                </div>
                <div style={styles.instructionItem}>
                  <span style={styles.instructionIcon}>⊙</span> Click a planet
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Bottom Center Planet Quick Dock (Desktop) */}
      {!selectedId && !isMobile && (
        <nav style={styles.bottomDock} aria-label="Planet navigation dock">
          {DESTINATIONS.map(dest => (
            <button
              key={dest.id}
              onClick={() => {
                playCyberClick();
                onSelect(dest.id);
              }}
              style={{
                ...styles.dockItem,
                borderColor: `${dest.color}35`,
                color: dest.color,
              }}
              aria-label={`Navigate to ${dest.label}`}
            >
              <span style={{ ...styles.dockDot, background: dest.color, boxShadow: `0 0 8px ${dest.color}` }} />
              <span>{dest.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Bottom Right Mode Pill Switcher */}
      {!selectedId && !isMobile && (
        <div style={styles.bottomRightToggle}>
          <button
            onClick={() => {
              playCyberClick();
              onRecruiterMode();
            }}
            style={styles.modeToggleBtn}
            aria-label="Toggle Recruiter or Explorer Mode"
          >
            <span style={{ ...styles.modeDot, background: isRecruiterMode ? '#FF35D3' : '#00F5FF' }} />
            {isRecruiterMode ? 'RECRUITER MODE' : 'EXPLORER MODE'}
          </button>
        </div>
      )}

      {/* Selected Destination Breadcrumb Header */}
      {selectedId && (
        <div style={styles.breadcrumb} aria-current="page" aria-label={`Viewing ${selected?.label}`}>
          <button
            style={styles.breadcrumbBack}
            onClick={() => {
              playCyberClick();
              onSelect(null);
            }}
            aria-label="Return to Universe overview"
          >
            ← BACK TO UNIVERSE
          </button>
          <span style={styles.breadcrumbSep} aria-hidden="true">/</span>
          <span style={{ color: selected?.color || '#00F5FF', fontWeight: 700 }}>
            {selected?.label}
          </span>
          <span style={{ color: '#929BB3', fontSize: '11px', marginLeft: '4px' }}>
            ({selected?.sublabel})
          </span>
        </div>
      )}

      {/* Mobile Bottom Dock Bar (Concept image top-right reference) */}
      {isMobile && (
        <nav style={styles.mobileDock} aria-label="Mobile navigation bar">
          <button
            style={{
              ...styles.mobileDockBtn,
              color: !isRecruiterMode && !selectedId ? '#00F5FF' : '#929BB3',
            }}
            onClick={() => {
              playCyberClick();
              if (isRecruiterMode) onRecruiterMode();
              onReset();
            }}
            aria-label="Universe"
          >
            <Globe size={18} />
            <span>Universe</span>
          </button>

          <button
            style={styles.mobileDockBtn}
            onClick={() => {
              playCyberClick();
              onTerminal();
            }}
            aria-label="Terminal"
          >
            <Terminal size={18} />
            <span>Terminal</span>
          </button>

          <button
            style={{
              ...styles.mobileDockBtn,
              color: isRecruiterMode ? '#00F5FF' : '#929BB3',
            }}
            onClick={() => {
              playCyberClick();
              onRecruiterMode();
            }}
            aria-label="Recruiter Mode"
          >
            <Briefcase size={18} />
            <span>Recruiter</span>
          </button>

          <button
            style={{
              ...styles.mobileDockBtn,
              color: mobileMenuOpen || selectedId ? '#00F5FF' : '#929BB3',
            }}
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Worlds Menu"
          >
            <Layers size={18} />
            <span>Worlds</span>
          </button>
        </nav>
      )}

      {/* Mobile Worlds Drawer Menu */}
      {isMobile && mobileMenuOpen && (
        <div style={styles.mobileMenuModal} role="dialog" aria-label="Worlds menu">
          <div style={styles.mobileMenuHeader}>
            <span>CHOOSE DESTINATION</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={styles.mobileMenuClose}
              aria-label="Close worlds menu"
            >
              ✕
            </button>
          </div>
          <div style={styles.mobileMenuList}>
            {DESTINATIONS.map(d => (
              <button
                key={d.id}
                onClick={() => {
                  playCyberClick();
                  onSelect(d.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  ...styles.mobileMenuItem,
                  borderColor: `${d.color}44`,
                  color: d.color,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ ...styles.dockDot, background: d.color }} />
                  <span style={{ fontWeight: 700, fontSize: '13px' }}>{d.label}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#929BB3' }}>{d.sublabel}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  topBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
    background: 'linear-gradient(180deg, rgba(5,6,11,0.92) 0%, rgba(5,6,11,0) 100%)',
    zIndex: 4000,
    pointerEvents: 'all',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  brandTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '15px',
    fontWeight: 800,
    letterSpacing: '0.22em',
    color: '#00F5FF',
    textShadow: '0 0 14px rgba(0,245,255,0.6)',
  },
  centerSegment: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(9, 13, 25, 0.7)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(0, 245, 255, 0.18)',
    borderRadius: '30px',
    padding: '4px',
    gap: '4px',
  },
  segmentBtn: {
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '24px',
    padding: '7px 18px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
  },
  rightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  iconBtn: {
    background: 'rgba(9, 13, 25, 0.6)',
    border: '1px solid rgba(146, 155, 179, 0.25)',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#929BB3',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
  },
  heroOverlay: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2000,
    pointerEvents: 'none',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    pointerEvents: 'all',
  },
  heroTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.12em',
    color: '#00F5FF',
    textTransform: 'uppercase',
  },
  tagDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00F5FF',
    boxShadow: '0 0 10px #00F5FF',
  },
  heroName: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(38px, 5.5vw, 68px)',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    lineHeight: 1.02,
    margin: 0,
  },
  nameCyan: {
    color: '#F4F7FF',
    textShadow: '0 0 40px rgba(0, 245, 255, 0.65)',
  },
  nameMagenta: {
    color: '#FF35D3',
    textShadow: '0 0 45px rgba(255, 53, 211, 0.75)',
  },
  heroTagline: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '16px',
    color: '#929BB3',
    maxWidth: '430px',
    lineHeight: 1.6,
    margin: 0,
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    marginTop: '6px',
  },
  exploreBtn: {
    background: 'rgba(0, 245, 255, 0.1)',
    border: '1.5px solid #00F5FF',
    borderRadius: '30px',
    color: '#00F5FF',
    padding: '12px 28px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13.5px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 0 24px rgba(0, 245, 255, 0.35)',
    transition: 'all 0.25s ease',
  },
  resumeBtn: {
    background: 'transparent',
    border: '1px solid rgba(146, 155, 179, 0.35)',
    borderRadius: '30px',
    color: '#F4F7FF',
    padding: '12px 24px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.25s ease',
  },
  instructionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '20px',
  },
  instructionItem: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146, 155, 179, 0.55)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  instructionIcon: {
    color: '#00F5FF',
  },
  bottomDock: {
    position: 'fixed',
    bottom: '28px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(9, 13, 25, 0.75)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(0, 245, 255, 0.18)',
    borderRadius: '40px',
    zIndex: 2000,
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
  },
  dockItem: {
    background: 'transparent',
    border: '1px solid',
    borderRadius: '20px',
    padding: '6px 14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10.5px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    transition: 'all 0.2s',
  },
  dockDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  bottomRightToggle: {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    zIndex: 2000,
  },
  modeToggleBtn: {
    background: 'rgba(9, 13, 25, 0.75)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(0, 245, 255, 0.2)',
    borderRadius: '30px',
    padding: '8px 16px',
    color: '#F4F7FF',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10.5px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
  },
  modeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    boxShadow: '0 0 8px currentColor',
  },
  breadcrumb: {
    position: 'fixed',
    top: '76px',
    left: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.08em',
    zIndex: 3500,
    background: 'rgba(9, 13, 25, 0.85)',
    backdropFilter: 'blur(10px)',
    padding: '7px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(0, 245, 255, 0.2)',
  },
  breadcrumbBack: {
    background: 'transparent',
    border: 'none',
    color: '#00F5FF',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: 700,
    padding: 0,
  },
  breadcrumbSep: {
    color: 'rgba(146, 155, 179, 0.3)',
  },
  mobileDock: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'rgba(9, 13, 25, 0.95)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(0, 245, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 3500,
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  },
  mobileDockBtn: {
    background: 'transparent',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9px',
    letterSpacing: '0.04em',
    cursor: 'pointer',
    padding: '6px 12px',
  },
  mobileMenuModal: {
    position: 'fixed',
    inset: '0 0 60px 0',
    background: 'rgba(5, 6, 11, 0.96)',
    backdropFilter: 'blur(16px)',
    zIndex: 3400,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    animation: 'fadeIn 0.25s ease',
  },
  mobileMenuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#00F5FF',
    borderBottom: '1px solid rgba(0, 245, 255, 0.15)',
    paddingBottom: '12px',
  },
  mobileMenuClose: {
    background: 'transparent',
    border: 'none',
    color: '#929BB3',
    fontSize: '18px',
    cursor: 'pointer',
  },
  mobileMenuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
  },
  mobileMenuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(9, 13, 25, 0.7)',
    border: '1px solid',
    borderRadius: '10px',
    padding: '14px 16px',
    cursor: 'pointer',
    textAlign: 'left',
  },
};

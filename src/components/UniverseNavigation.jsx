import React from 'react';
import { RotateCcw, Terminal, Briefcase } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { profile } from '../data/profile';

export default function UniverseNavigation({
  selectedId,
  onSelect,
  onReset,
  onTerminal,
  onRecruiterMode,
  isRecruiterMode,
}) {
  const selected = DESTINATIONS.find(d => d.id === selectedId);

  return (
    <>
      {/* Top HUD bar */}
      <div style={styles.topBar} role="banner">
        {/* Logo */}
        <div style={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <radialGradient id="nl" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#090D19"/>
              </radialGradient>
            </defs>
            <circle cx="16" cy="16" r="14" fill="url(#nl)" />
            <circle cx="16" cy="16" r="5" fill="#090D19"/>
            <circle cx="16" cy="16" r="2" fill="#00F5FF"/>
          </svg>
          <div>
            <div style={styles.logoName}>NEONVERSE</div>
            <div style={styles.logoSub}>ANIRUDH YADAV</div>
          </div>
        </div>

        {/* Nav controls */}
        <nav style={styles.navControls} aria-label="Universe controls">
          <button
            style={styles.iconBtn}
            onClick={onReset}
            title="Reset view"
            aria-label="Reset camera to default view"
          >
            <RotateCcw size={16} />
          </button>
          <button
            style={styles.iconBtn}
            onClick={onTerminal}
            title="Open terminal"
            aria-label="Open developer terminal"
          >
            <Terminal size={16} />
            <span style={styles.btnLabel}>TERMINAL</span>
          </button>
          <button
            onClick={onRecruiterMode}
            style={{
              ...styles.recruiterBtn,
              background: isRecruiterMode ? 'rgba(0,245,255,0.15)' : 'transparent',
              borderColor: isRecruiterMode ? '#00F5FF' : 'rgba(146,155,179,0.3)',
              color: isRecruiterMode ? '#00F5FF' : '#929BB3',
            }}
            aria-label={isRecruiterMode ? 'Switch to Explorer Mode' : 'Switch to Recruiter Mode'}
            aria-pressed={isRecruiterMode}
          >
            <Briefcase size={14} />
            {isRecruiterMode ? 'EXPLORER' : 'RECRUITER'}
          </button>
        </nav>
      </div>

      {/* Hero overlay — only visible when nothing selected */}
      {!selectedId && (
        <div style={styles.heroOverlay} aria-live="polite">
          <div style={styles.heroContent}>
            <div style={styles.heroTag} aria-hidden="true">
              <span style={styles.tagDot} />
              FULL-STACK DEVELOPER / DIGITAL BUILDER
            </div>
            <h1 style={styles.heroName}>ANIRUDH YADAV</h1>
            <p style={styles.heroTagline}>
              "Building meaningful digital experiences, one world at a time."
            </p>
            <div style={styles.heroActions}>
              <button
                style={styles.primaryBtn}
                onClick={() => onSelect('about')}
                aria-label="Explore the universe — start with About Me"
              >
                EXPLORE UNIVERSE
              </button>
              <a
                href={profile.resume || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.secondaryBtn}
                aria-label="Quick view resume"
              >
                QUICK VIEW RESUME
              </a>
            </div>
            <div style={styles.instruction} aria-label="Navigation hint">
              Drag to explore · Select a planet to discover
            </div>
          </div>
        </div>
      )}

      {/* Bottom planet selector */}
      {!selectedId && (
        <nav style={styles.bottomNav} aria-label="Planet destinations">
          {DESTINATIONS.map(dest => (
            <button
              key={dest.id}
              style={{
                ...styles.destBtn,
                borderColor: `${dest.color}40`,
                color: dest.color,
              }}
              onClick={() => onSelect(dest.id)}
              aria-label={`Navigate to ${dest.label} — ${dest.sublabel}`}
            >
              <span style={{...styles.destDot, background: dest.color}} />
              <span style={styles.destLabel}>{dest.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Selected destination breadcrumb with quick world cycling */}
      {selectedId && (
        <div style={styles.breadcrumb} aria-current="page" aria-label={`Currently viewing: ${selected?.label}`}>
          <button
            style={styles.breadcrumbBack}
            onClick={() => onSelect(null)}
            aria-label="Return to universe overview"
            title="Return to universe overview (or press Esc / R)"
          >
            ← UNIVERSE
          </button>
          <span style={styles.breadcrumbSep} aria-hidden="true">›</span>
          <span style={{ color: selected?.color || '#00F5FF', fontWeight: 700 }}>{selected?.label}</span>

          <div style={styles.cycleGroup}>
            <button
              onClick={() => {
                const ids = DESTINATIONS.map(d => d.id);
                const idx = ids.indexOf(selectedId);
                const prev = ids[(idx - 1 + ids.length) % ids.length];
                onSelect(prev);
              }}
              style={styles.cycleBtn}
              title="Previous world (Left Arrow)"
              aria-label="Navigate to previous world"
            >
              ◀
            </button>
            <button
              onClick={() => {
                const ids = DESTINATIONS.map(d => d.id);
                const idx = ids.indexOf(selectedId);
                const next = ids[(idx + 1) % ids.length];
                onSelect(next);
              }}
              style={styles.cycleBtn}
              title="Next world (Right Arrow)"
              aria-label="Navigate to next world"
            >
              ▶
            </button>
          </div>
        </div>
      )}

      {/* Keyboard shortcut hint (hidden when a panel is open) */}
      {!selectedId && (
        <div style={styles.shortcuts} aria-hidden="true">
          <span>` terminal</span>
          <span>←/→ cycle</span>
          <span>M recruiter</span>
          <span>R reset</span>
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
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    background: 'linear-gradient(180deg, rgba(5,6,11,0.95) 0%, rgba(5,6,11,0) 100%)',
    zIndex: 3000,
    pointerEvents: 'all',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoName: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#00F5FF',
    lineHeight: 1,
  },
  logoSub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9px',
    letterSpacing: '0.15em',
    color: 'rgba(146,155,179,0.7)',
    marginTop: '2px',
  },
  navControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  iconBtn: {
    background: 'transparent',
    border: '1px solid rgba(146,155,179,0.2)',
    borderRadius: '6px',
    color: '#929BB3',
    cursor: 'pointer',
    padding: '7px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.05em',
  },
  btnLabel: {
    display: 'none',
    '@media (min-width: 600px)': { display: 'inline' },
  },
  recruiterBtn: {
    background: 'transparent',
    border: '1px solid',
    borderRadius: '6px',
    cursor: 'pointer',
    padding: '7px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.08em',
    transition: 'all 0.2s ease',
    fontWeight: 600,
  },
  heroOverlay: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '48px',
    zIndex: 2000,
    pointerEvents: 'none',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    pointerEvents: 'all',
  },
  heroTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.12em',
    color: 'rgba(0,245,255,0.7)',
    textTransform: 'uppercase',
  },
  tagDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00F5FF',
    animation: 'pulse-cyan 2s ease-in-out infinite',
    flexShrink: 0,
  },
  heroName: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(36px, 5vw, 64px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#F4F7FF',
    lineHeight: 1,
    textShadow: '0 0 80px rgba(0,245,255,0.15)',
  },
  heroTagline: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '16px',
    color: '#929BB3',
    maxWidth: '400px',
    lineHeight: 1.6,
    fontStyle: 'italic',
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
  },
  primaryBtn: {
    background: '#00F5FF',
    color: '#05060B',
    border: 'none',
    borderRadius: '8px',
    padding: '13px 28px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
  },
  secondaryBtn: {
    background: 'transparent',
    border: '1px solid rgba(0,245,255,0.4)',
    color: '#00F5FF',
    borderRadius: '8px',
    padding: '12px 24px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
  },
  instruction: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146,155,179,0.5)',
    letterSpacing: '0.04em',
  },
  bottomNav: {
    position: 'fixed',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '12px 20px',
    background: 'rgba(9,13,25,0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(0,245,255,0.1)',
    borderRadius: '40px',
    zIndex: 2000,
    maxWidth: '90vw',
  },
  destBtn: {
    background: 'transparent',
    border: '1px solid',
    borderRadius: '20px',
    padding: '6px 14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.08em',
    fontWeight: 600,
  },
  destDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  destLabel: {
    whiteSpace: 'nowrap',
  },
  breadcrumb: {
    position: 'fixed',
    bottom: '24px',
    left: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#929BB3',
    letterSpacing: '0.08em',
    zIndex: 3000,
    background: 'rgba(9,13,25,0.7)',
    backdropFilter: 'blur(8px)',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(0,245,255,0.1)',
  },
  breadcrumbBack: {
    background: 'transparent',
    border: 'none',
    color: '#929BB3',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.08em',
    transition: 'color 0.2s',
    padding: 0,
  },
  breadcrumbSep: {
    color: 'rgba(146,155,179,0.3)',
  },
  cycleGroup: {
    display: 'flex',
    gap: '4px',
    marginLeft: '6px',
  },
  cycleBtn: {
    background: 'transparent',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '6px',
    color: '#929BB3',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    padding: '2px 7px',
    lineHeight: 1.6,
    transition: 'all 0.2s ease',
  },
  shortcuts: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    display: 'flex',
    gap: '16px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: 'rgba(146,155,179,0.35)',
    letterSpacing: '0.05em',
    zIndex: 2000,
  },
};

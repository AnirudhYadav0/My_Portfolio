import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const BOOT_LINES = [
  { text: '[ NEONVERSE SYSTEM INITIALIZING ]', delay: 0, color: '#00F5FF' },
  { text: '[ ESTABLISHING CONNECTION ]', delay: 600, color: '#8B5CFF' },
  { text: '[ DEVELOPER PROFILE FOUND ]', delay: 1300, color: '#71FF9C' },
  { text: '[ UNIVERSE ONLINE ]', delay: 2000, color: '#00F5FF' },
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRefs = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip immediately for reduced motion
      setTimeout(() => onComplete(), 100);
      return;
    }

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
      timerRefs.current.push(t);
    });

    const finishTimer = setTimeout(() => {
      setDone(true);
      setTimeout(() => onComplete(), 600);
    }, 2800);
    timerRefs.current.push(finishTimer);

    return () => timerRefs.current.forEach(clearTimeout);
  }, [prefersReducedMotion, onComplete]);

  const handleSkip = () => {
    timerRefs.current.forEach(clearTimeout);
    setSkipped(true);
    onComplete();
  };

  return (
    <div style={styles.container} aria-label="System boot sequence">
      {/* Background grid */}
      <div style={styles.grid} aria-hidden="true" />

      {/* Logo */}
      <div style={styles.logo} aria-hidden="true">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <defs>
            <radialGradient id="bg1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.9"/>
              <stop offset="60%" stopColor="#8B5CFF" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#05060B"/>
            </radialGradient>
          </defs>
          <circle cx="30" cy="30" r="28" fill="url(#bg1)" />
          <circle cx="30" cy="30" r="20" fill="none" stroke="#00F5FF" strokeWidth="0.8" opacity="0.5"/>
          <circle cx="30" cy="30" r="12" fill="#090D19"/>
          <circle cx="30" cy="30" r="5" fill="#00F5FF" opacity="0.95"/>
        </svg>
        <span style={styles.logoText}>NEONVERSE</span>
      </div>

      {/* Terminal lines */}
      <div style={styles.terminal} role="log" aria-live="polite">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              ...styles.termLine,
              color: line.color,
              opacity: visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <span style={styles.prompt}>▶</span>
            {line.text}
          </div>
        ))}
        {done && (
          <div style={styles.cursor} aria-hidden="true">
            <span style={styles.promptSymbol}>visitor@neonverse:~$</span>
            <span style={styles.blink}>█</span>
          </div>
        )}
      </div>

      {/* Skip button */}
      {!skipped && (
        <button
          onClick={handleSkip}
          style={styles.skipBtn}
          aria-label="Skip intro animation"
        >
          SKIP INTRO ›
        </button>
      )}

      {/* Loading bar */}
      <div style={styles.loadingBar} aria-hidden="true">
        <div
          style={{
            ...styles.loadingFill,
            width: done ? '100%' : `${(visibleLines.length / BOOT_LINES.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    background: '#05060B',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    zIndex: 9000,
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  logoText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    letterSpacing: '0.4em',
    color: 'rgba(0,245,255,0.7)',
    textTransform: 'uppercase',
  },
  terminal: {
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '0 24px',
  },
  termLine: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    letterSpacing: '0.05em',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  prompt: {
    opacity: 0.6,
    fontSize: '10px',
    flexShrink: 0,
  },
  cursor: {
    marginTop: '8px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    color: '#00F5FF',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  promptSymbol: {
    opacity: 0.6,
  },
  blink: {
    display: 'inline-block',
    animation: 'blink 1s step-end infinite',
  },
  skipBtn: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    background: 'transparent',
    border: '1px solid rgba(0,245,255,0.3)',
    color: 'rgba(0,245,255,0.7)',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.08em',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },
  loadingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'rgba(0,245,255,0.1)',
  },
  loadingFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #8B5CFF, #00F5FF)',
    transition: 'width 0.4s ease',
  },
};

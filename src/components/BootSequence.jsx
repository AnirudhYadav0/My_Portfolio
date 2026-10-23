import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const BOOT_STEPS = [
  { text: 'Loading system modules...', delay: 250 },
  { text: 'Connecting to Anirudh Yadav...', delay: 850 },
  { text: 'Developer profile found.', delay: 1500 },
  { text: 'Initializing 3D universe...', delay: 2100 },
  { text: 'Universe online.', delay: 2700 },
];

export default function BootSequence({ onComplete }) {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRefs = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 55);
    timerRefs.current.push(progressInterval);

    // Sequential step display
    BOOT_STEPS.forEach((step, idx) => {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, idx]);
      }, step.delay);
      timerRefs.current.push(timer);
    });

    // Ready to enter
    const readyTimer = setTimeout(() => {
      setProgress(100);
      setIsReady(true);
    }, 3000);
    timerRefs.current.push(readyTimer);

    return () => {
      timerRefs.current.forEach(clearInterval);
      timerRefs.current.forEach(clearTimeout);
    };
  }, [prefersReducedMotion, onComplete]);

  const handleEnter = () => {
    timerRefs.current.forEach(clearInterval);
    timerRefs.current.forEach(clearTimeout);
    onComplete();
  };

  return (
    <div style={styles.container} role="dialog" aria-label="System boot sequence">
      {/* Background Starfield and Cyber Grid */}
      <div style={styles.gridOverlay} aria-hidden="true" />
      <div style={styles.vignette} aria-hidden="true" />

      {/* Main Terminal Window */}
      <div style={styles.card}>
        {/* Title Block */}
        <div style={styles.header}>
          <h1 style={styles.title}>NEONVERSE</h1>
          <div style={styles.subtitle}>INITIALIZING DEVELOPER UNIVERSE...</div>
        </div>

        {/* Terminal Box */}
        <div style={styles.terminalBox}>
          {/* Corner tech accents */}
          <div style={{ ...styles.corner, top: -1, left: -1, borderWidth: '2px 0 0 2px' }} />
          <div style={{ ...styles.corner, top: -1, right: -1, borderWidth: '2px 2px 0 0' }} />
          <div style={{ ...styles.corner, bottom: -1, left: -1, borderWidth: '0 0 2px 2px' }} />
          <div style={{ ...styles.corner, bottom: -1, right: -1, borderWidth: '0 2px 2px 0' }} />

          {/* Steps checklist */}
          <div style={styles.stepList} role="status" aria-live="polite">
            {BOOT_STEPS.map((step, idx) => {
              const isChecked = completedSteps.includes(idx);
              return (
                <div
                  key={idx}
                  style={{
                    ...styles.stepItem,
                    opacity: isChecked ? 1 : 0.25,
                    transform: isChecked ? 'translateX(0)' : 'translateX(-4px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ color: isChecked ? '#00F5FF' : 'rgba(0,245,255,0.3)', marginRight: '8px' }}>
                    [✓]
                  </span>
                  <span style={{ color: isChecked ? '#F4F7FF' : '#929BB3' }}>
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar and counter */}
          <div style={styles.progressRow}>
            <div style={styles.progressBarBg} aria-hidden="true">
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${progress}%`,
                }}
              />
            </div>
            <span style={styles.progressText}>{progress}%</span>
          </div>
        </div>

        {/* Enter Button */}
        <div style={styles.actions}>
          <button
            onClick={handleEnter}
            style={{
              ...styles.enterBtn,
              opacity: isReady ? 1 : 0.85,
              boxShadow: isReady
                ? '0 0 25px rgba(0, 245, 255, 0.45), inset 0 0 15px rgba(0, 245, 255, 0.2)'
                : '0 0 15px rgba(0, 245, 255, 0.2)',
            }}
            aria-label="Enter NEONVERSE"
          >
            ENTER NEONVERSE →
          </button>

          <button
            onClick={handleEnter}
            style={styles.skipLink}
            aria-label="Skip introduction"
          >
            Skip Intro
          </button>
        </div>
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
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    overflow: 'hidden',
    padding: '20px',
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0, 245, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 245, 255, 0.035) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, transparent 30%, #05060B 90%)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '520px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '28px',
    zIndex: 2,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(32px, 5vw, 46px)',
    fontWeight: 800,
    letterSpacing: '0.22em',
    color: '#00F5FF',
    textShadow: '0 0 20px rgba(0, 245, 255, 0.6), 0 0 40px rgba(255, 53, 211, 0.3)',
    margin: 0,
    lineHeight: 1,
  },
  subtitle: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: 'rgba(0, 245, 255, 0.75)',
    textTransform: 'uppercase',
  },
  terminalBox: {
    width: '100%',
    background: 'rgba(9, 13, 25, 0.75)',
    border: '1px solid rgba(0, 245, 255, 0.25)',
    borderRadius: '8px',
    padding: '24px 28px',
    position: 'relative',
    boxShadow: '0 0 40px rgba(0, 245, 255, 0.08), inset 0 0 30px rgba(9, 13, 25, 0.8)',
    backdropFilter: 'blur(16px)',
  },
  corner: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderColor: '#00F5FF',
    borderStyle: 'solid',
    pointerEvents: 'none',
  },
  stepList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left',
    marginBottom: '24px',
  },
  stepItem: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12.5px',
    letterSpacing: '0.04em',
    display: 'flex',
    alignItems: 'center',
  },
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    borderTop: '1px solid rgba(0, 245, 255, 0.12)',
    paddingTop: '18px',
  },
  progressBarBg: {
    flex: 1,
    height: '6px',
    background: 'rgba(0, 245, 255, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid rgba(0, 245, 255, 0.2)',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00F5FF 0%, #8B5CFF 60%, #FF35D3 100%)',
    boxShadow: '0 0 12px rgba(0, 245, 255, 0.8)',
    transition: 'width 0.1s linear',
  },
  progressText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: 600,
    color: '#00F5FF',
    minWidth: '38px',
    textAlign: 'right',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    width: '100%',
  },
  enterBtn: {
    background: 'rgba(0, 245, 255, 0.1)',
    border: '1px solid #00F5FF',
    borderRadius: '30px',
    color: '#00F5FF',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    padding: '14px 36px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    textTransform: 'uppercase',
  },
  skipLink: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(146, 155, 179, 0.65)',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    padding: '4px',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    transition: 'color 0.2s',
  },
};

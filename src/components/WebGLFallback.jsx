import React from 'react';

export default function WebGLFallback({ onContinue }) {
  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <div style={styles.icon} aria-hidden="true">⚠</div>
        <h1 style={styles.title}>WebGL Unavailable</h1>
        <p style={styles.body}>
          Your browser or device doesn't support WebGL, which is required for the
          interactive 3D universe. You can still explore my portfolio using the
          accessible list view below.
        </p>
        <button style={styles.btn} onClick={onContinue} autoFocus>
          View Portfolio Without 3D
        </button>
        <p style={styles.hint}>
          To enable the 3D experience, try updating your browser or enabling
          hardware acceleration in your browser settings.
        </p>
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
    padding: '24px',
    zIndex: 8000,
  },
  panel: {
    maxWidth: '480px',
    textAlign: 'center',
    background: 'rgba(9,13,25,0.9)',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '16px',
    padding: '48px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
  icon: {
    fontSize: '40px',
    color: '#FF35D3',
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '24px',
    color: '#F4F7FF',
    fontWeight: 600,
  },
  body: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '15px',
    color: '#929BB3',
    lineHeight: 1.7,
  },
  btn: {
    background: '#00F5FF',
    color: '#05060B',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
  },
  hint: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146,155,179,0.6)',
    lineHeight: 1.6,
  },
};

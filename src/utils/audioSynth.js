// ============================================================
// CYBER AMBIENT SYNTHESIZER (Web Audio API)
// Provides gentle, immersive ethereal sci-fi soundscape
// ============================================================

let audioCtx = null;
let masterGain = null;
let oscillators = [];
let isPlaying = false;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }
}

export function toggleAmbientAudio() {
  initAudio();
  if (!audioCtx) return false;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (isPlaying) {
    // Fade out and stop
    masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.4);
    setTimeout(() => {
      oscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch {}
      });
      oscillators = [];
      isPlaying = false;
    }, 500);
    return false;
  } else {
    // Ethereal chord frequencies (C minor / space drone: C3, G3, D#4, A#4)
    const freqs = [130.81, 196.00, 311.13, 466.16];
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.065, audioCtx.currentTime + 1.2);

    oscillators = freqs.map((freq, i) => {
      const osc = audioCtx.createOscillator();
      const pan = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
      const filter = audioCtx.createBiquadFilter();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Low pass warm filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650 + i * 150, audioCtx.currentTime);

      if (pan) {
        pan.pan.setValueAtTime((i - 1.5) * 0.4, audioCtx.currentTime);
        osc.connect(filter);
        filter.connect(pan);
        pan.connect(masterGain);
      } else {
        osc.connect(filter);
        filter.connect(masterGain);
      }

      osc.start();
      return osc;
    });

    isPlaying = true;
    return true;
  }
}

export function playCyberClick() {
  try {
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.07);
  } catch {}
}

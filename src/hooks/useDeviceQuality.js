import { useState, useEffect, useMemo } from 'react';

function getDeviceQuality() {
  // Detect mobile via user agent or narrow screen
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

  // Detect hardware concurrency
  const cores = navigator.hardwareConcurrency || 2;

  // Detect deviceMemory (GB, Chrome only)
  const memory = navigator.deviceMemory || 4;

  if (isMobile || cores <= 2 || memory <= 2) return 'low';
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

const safePixelRatio = (max) => {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.devicePixelRatio || 1, max);
};

export function useDeviceQuality() {
  // Start with 'low' to avoid heavy initial render on unknown devices.
  // Updates to the real quality after first paint.
  const [quality, setQuality] = useState('low');

  useEffect(() => {
    setQuality(getDeviceQuality());
  }, []);

  // Recompute config whenever quality changes (all window access is now safe)
  const config = useMemo(() => ({
    low: {
      particleCount: 400,
      starCount: 800,
      shadowMapSize: 512,
      antialias: false,
      bloom: false,
      pixelRatio: 1,
    },
    medium: {
      particleCount: 800,
      starCount: 1500,
      shadowMapSize: 1024,
      antialias: true,
      bloom: true,
      pixelRatio: safePixelRatio(1.5),
    },
    high: {
      particleCount: 1500,
      starCount: 2500,
      shadowMapSize: 2048,
      antialias: true,
      bloom: true,
      pixelRatio: safePixelRatio(2),
    },
  }), []);

  return { quality, config: config[quality] };
}

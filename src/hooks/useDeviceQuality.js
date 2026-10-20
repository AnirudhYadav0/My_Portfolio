import { useState, useEffect } from 'react';

function getDeviceQuality() {
  // Detect mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Detect hardware concurrency
  const cores = navigator.hardwareConcurrency || 2;
  
  // Detect deviceMemory (GB, Chrome only)
  const memory = navigator.deviceMemory || 4;

  if (isMobile || cores <= 2 || memory <= 2) return 'low';
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

export function useDeviceQuality() {
  const [quality, setQuality] = useState('high');

  useEffect(() => {
    setQuality(getDeviceQuality());
  }, []);

  const config = {
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
      pixelRatio: Math.min(window.devicePixelRatio, 1.5),
    },
    high: {
      particleCount: 1500,
      starCount: 2500,
      shadowMapSize: 2048,
      antialias: true,
      bloom: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    },
  };

  return { quality, config: config[quality] };
}

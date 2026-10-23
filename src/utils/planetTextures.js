import * as THREE from 'three';

// Cache generated textures so canvas generation runs only once
const textureCache = new Map();

export function getPlanetTexture(type, color = '#00F5FF', accentColor = '#FF35D3') {
  const cacheKey = `${type}-${color}-${accentColor}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (type === 'core') {
    // ---- CYBER EARTH / CORE PLANET ----
    // Deep oceanic space base
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, '#030814');
    grad.addColorStop(0.5, '#07152b');
    grad.addColorStop(1, '#02060e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Procedural continents
    ctx.fillStyle = '#0a233f';
    for (let c = 0; c < 12; c++) {
      const cx = (c * 85 + 40) % 1024;
      const cy = 120 + ((c * 67) % 270);
      ctx.beginPath();
      ctx.arc(cx, cy, 60 + (c % 4) * 20, 0, Math.PI * 2);
      ctx.fill();

      // Additional landmass blobs
      for (let b = 0; b < 6; b++) {
        const bx = cx + Math.sin(b * 1.2) * 50;
        const by = cy + Math.cos(b * 1.2) * 35;
        ctx.beginPath();
        ctx.arc(bx, by, 30 + b * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Glowing cyan continental shelves & coastlines
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.45)';
    ctx.lineWidth = 3;
    for (let c = 0; c < 12; c++) {
      const cx = (c * 85 + 40) % 1024;
      const cy = 120 + ((c * 67) % 270);
      ctx.beginPath();
      ctx.arc(cx, cy, 70 + (c % 4) * 20, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Dense clusters of electric cyan & magenta cyberpunk city lights
    for (let i = 0; i < 900; i++) {
      const lx = Math.random() * 1024;
      const ly = 80 + Math.random() * 350;
      const isMagenta = Math.random() > 0.65;
      const rad = Math.random() * 2.2 + 0.5;

      ctx.beginPath();
      ctx.fillStyle = isMagenta ? '#FF35D3' : '#00F5FF';
      ctx.shadowColor = isMagenta ? '#FF35D3' : '#00F5FF';
      ctx.shadowBlur = 6;
      ctx.arc(lx, ly, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Atmospheric cloud belts
    ctx.fillStyle = 'rgba(0, 245, 255, 0.08)';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(0, 60 + i * 50, 1024, 18);
    }
  } else if (type === 'travel') {
    // ---- TRIPNEXUS (TRAVEL WORLD) ----
    // Azure ocean base
    ctx.fillStyle = '#061b33';
    ctx.fillRect(0, 0, 1024, 512);

    // Emerald & turquoise islands
    ctx.fillStyle = '#0d5c56';
    for (let i = 0; i < 20; i++) {
      const x = (i * 55 + 30) % 1024;
      const y = 90 + ((i * 45) % 330);
      ctx.beginPath();
      ctx.arc(x, y, 40 + (i % 3) * 15, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flight navigation routes (holographic cyan lines)
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 12]);
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 80 + i * 60);
      ctx.bezierCurveTo(340, 40 + i * 50, 680, 140 + i * 50, 1024, 80 + i * 60);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Swirling cloud eddies
    ctx.fillStyle = 'rgba(244, 247, 255, 0.14)';
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.ellipse((i * 70) % 1024, 100 + ((i * 30) % 300), 120, 25, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'saas') {
    // ---- ENTERSKILL (CYBER PRODUCT MATRIX) ----
    ctx.fillStyle = '#041510';
    ctx.fillRect(0, 0, 1024, 512);

    // Cyber green circuit grid
    ctx.strokeStyle = 'rgba(113, 255, 156, 0.25)';
    ctx.lineWidth = 1.5;
    const step = 32;
    for (let x = 0; x < 1024; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y < 512; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Glowing server data hubs
    for (let x = 0; x < 1024; x += step * 2) {
      for (let y = 0; y < 512; y += step * 2) {
        if (Math.random() > 0.45) {
          ctx.beginPath();
          ctx.fillStyle = Math.random() > 0.3 ? '#71FF9C' : '#00F5FF';
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  } else if (type === 'skill') {
    // ---- SKILL CONSTELLATION ----
    const bg = ctx.createRadialGradient(512, 256, 20, 512, 256, 400);
    bg.addColorStop(0, '#3a0c3b');
    bg.addColorStop(0.6, '#180521');
    bg.addColorStop(1, '#05020a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 512);

    // Glowing nodes & geometric constellation lines
    ctx.strokeStyle = 'rgba(255, 53, 211, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 40; i++) {
      const x1 = Math.random() * 1024;
      const y1 = Math.random() * 512;
      const x2 = x1 + (Math.random() - 0.5) * 160;
      const y2 = y1 + (Math.random() - 0.5) * 160;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.fillStyle = Math.random() > 0.5 ? '#FF35D3' : '#8B5CFF';
      ctx.beginPath();
      ctx.arc(x1, y1, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'nebula') {
    // ---- EXPERIENCE NEBULA ----
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, '#1f0d05');
    grad.addColorStop(0.4, '#381c08');
    grad.addColorStop(0.7, '#240728');
    grad.addColorStop(1, '#0a020d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Golden & amber cosmic dust trails
    for (let i = 0; i < 18; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const r = 50 + Math.random() * 90;
      const radGrad = ctx.createRadialGradient(x, y, 5, x, y, r);
      radGrad.addColorStop(0, 'rgba(255, 179, 71, 0.35)');
      radGrad.addColorStop(0.7, 'rgba(255, 53, 211, 0.15)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // ---- CONTACT PORTAL ----
    ctx.fillStyle = '#050c18';
    ctx.fillRect(0, 0, 1024, 512);

    // Concentric relativistic ring stripes
    for (let i = 0; i < 16; i++) {
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 245, 255, 0.35)' : 'rgba(113, 255, 156, 0.25)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(512, 256, 40 + i * 26, 20 + i * 13, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set(cacheKey, texture);
  return texture;
}

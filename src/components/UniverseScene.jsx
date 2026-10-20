import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceQuality } from '../hooks/useDeviceQuality';
import { DESTINATIONS } from '../data/destinations';

// ============================================================
// COHESIVE ORBITAL PATH TRACK WITH ENERGY PULSE BEACON
// ============================================================
function PlanetaryOrbitalTrack({ radius, tilt = 0, color = '#00F5FF', speed = 0.0006, isHighlighted = false }) {
  const lineRef = useRef();
  const beaconRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  const { points, trackGeometry } = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.9, 0, Math.PI * 2, false, 0);
    const pts = curve.getPoints(120);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    return { points: pts, trackGeometry: geo };
  }, [radius]);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime() * speed * 20;

    // Rotate track slowly
    if (lineRef.current) {
      lineRef.current.rotation.z += speed;
    }

    // Animate energy beacon along track
    if (beaconRef.current && points.length > 0) {
      const idx = Math.floor((t % 1) * points.length);
      const p = points[idx % points.length];
      beaconRef.current.position.set(p.x, p.y, 0);
    }
  });

  return (
    <group rotation={[Math.PI / 2 + tilt, 0, 0]}>
      {/* Orbital track ring */}
      <lineLoop ref={lineRef} geometry={trackGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={isHighlighted ? 0.35 : 0.1}
          linewidth={1}
        />
      </lineLoop>

      {/* Orbiting energy beacon */}
      <mesh ref={beaconRef}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={isHighlighted ? 0.9 : 0.5} />
      </mesh>
    </group>
  );
}

// ============================================================
// CORE-TO-PLANET VECTOR TETHER BEAM
// ============================================================
function CoreTether({ targetPosition, color = '#00F5FF', active = false }) {
  const lineGeometry = useMemo(() => {
    if (!targetPosition) return null;
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(...targetPosition),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [targetPosition]);

  if (!active || !lineGeometry) return null;

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.45} />
    </line>
  );
}

// ============================================================
// HOLOGRAPHIC TARGETING RETICLE (SELECTION FEEDBACK)
// ============================================================
function TargetingReticle({ size, color }) {
  const reticleRef = useRef();

  useFrame(({ clock }) => {
    if (!reticleRef.current) return;
    const t = clock.getElapsedTime();
    reticleRef.current.rotation.z = t * 0.8;
    const pulse = 1 + Math.sin(t * 3) * 0.05;
    reticleRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group ref={reticleRef}>
      {/* Outer bracket ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.5, size * 1.58, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner dotted reticle ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.32, size * 1.36, 16]} />
        <meshBasicMaterial color="#F4F7FF" transparent opacity={0.4} wireframe side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ============================================================
// CELESTIAL PLANET BODY WITH CUSTOM PROCEDURAL ARCHITECTURE
// ============================================================
function Planet({ dest, isSelected, isHovered, onClick, onPointerOver, onPointerOut }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const satelliteRef = useRef();
  const satelliteRef2 = useRef();
  const prefersReducedMotion = useReducedMotion();

  const { size, color, accentColor = '#8B5CFF', emissive, position, type, sector } = dest;
  const isCore = type === 'core';

  // Smooth floating and self-rotation
  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    // Planetary self-rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = t * (isCore ? 0.2 : 0.35);
      if (!isCore) {
        meshRef.current.rotation.x = t * 0.1;
      }
    }

    // Micro-float for non-core worlds
    if (!isCore && groupRef.current) {
      const floatOffset = Math.sin(t * 0.7 + position[0]) * 0.12;
      groupRef.current.position.y = position[1] + floatOffset;
    }

    // Interactive scale interpolation on hover/select
    if (meshRef.current) {
      const targetScale = isSelected ? 1.18 : isHovered ? 1.08 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Orbiting Satellites (TripNexus, EnterSkill, Skills)
    if (satelliteRef.current) {
      const satSpeed = t * 1.2;
      const r = size * 1.6;
      satelliteRef.current.position.set(
        Math.cos(satSpeed) * r,
        Math.sin(satSpeed * 0.8) * 0.3,
        Math.sin(satSpeed) * r
      );
    }
    if (satelliteRef2.current) {
      const satSpeed2 = -t * 0.9;
      const r2 = size * 1.8;
      satelliteRef2.current.position.set(
        Math.sin(satSpeed2) * r2,
        Math.cos(satSpeed2 * 0.7) * 0.4,
        Math.cos(satSpeed2) * r2
      );
    }
  });

  const emissiveColor = useMemo(() => new THREE.Color(emissive), [emissive]);
  const emissiveIntensity = isSelected ? 0.75 : isHovered ? 0.5 : 0.25;

  // Geometry selector
  const MainGeometry = useMemo(() => {
    switch (type) {
      case 'core': return <sphereGeometry args={[size, 48, 48]} />;
      case 'travel': return <icosahedronGeometry args={[size, 1]} />;
      case 'saas': return <octahedronGeometry args={[size, 0]} />;
      case 'skill': return <dodecahedronGeometry args={[size, 0]} />;
      case 'nebula': return <tetrahedronGeometry args={[size, 1]} />;
      case 'portal': return <torusGeometry args={[size * 0.75, size * 0.22, 16, 32]} />;
      default: return <sphereGeometry args={[size, 32, 32]} />;
    }
  }, [type, size]);

  return (
    <group ref={groupRef} position={position}>
      {/* Main Celestial Mesh */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          onPointerOver();
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
          onPointerOut();
        }}
      >
        {MainGeometry}
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          roughness={isCore ? 0.2 : 0.45}
          metalness={isCore ? 0.1 : 0.65}
          wireframe={type === 'skill'}
        />
      </mesh>

      {/* CORE SUN/IDENTITY PLANET: Dual Plasma Rings & Atmospheric Shield */}
      {isCore && (
        <>
          {/* Inner Pulsing Plasma Core */}
          <mesh>
            <sphereGeometry args={[size * 0.75, 32, 32]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.35} />
          </mesh>
          {/* Dynamic Gyroscopic Energy Latitude Rings */}
          <mesh rotation={[Math.PI / 4, 0.4, 0]}>
            <torusGeometry args={[size * 1.35, 0.018, 8, 64]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.45} />
          </mesh>
          <mesh rotation={[-Math.PI / 3, -0.3, 0]}>
            <torusGeometry args={[size * 1.48, 0.015, 8, 64]} />
            <meshBasicMaterial color="#8B5CFF" transparent opacity={0.4} />
          </mesh>
          {/* Corona Atmosphere Aura */}
          <mesh>
            <sphereGeometry args={[size * 1.3, 24, 24]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.08} side={THREE.BackSide} />
          </mesh>
        </>
      )}

      {/* TRIPNEXUS (TRAVEL AI): Orbiting Shuttle Probe & Planetary Flight Highway */}
      {type === 'travel' && (
        <>
          <mesh rotation={[Math.PI / 3, 0.25, 0]}>
            <ringGeometry args={[size * 1.25, size * 1.36, 48]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
          {/* Orbiting Satellite Shuttle */}
          <group ref={satelliteRef}>
            <mesh>
              <coneGeometry args={[0.07, 0.15, 6]} />
              <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[0, -0.09, 0]}>
              <sphereGeometry args={[0.03, 6, 6]} />
              <meshBasicMaterial color="#FF35D3" transparent opacity={0.8} />
            </mesh>
          </group>
        </>
      )}

      {/* ENTERSKILL (SAAS PLATFORM): Dual Orbiting Micro Data Nodes & Cyber Ring */}
      {type === 'saas' && (
        <>
          <mesh rotation={[-Math.PI / 4, 0.35, 0]}>
            <ringGeometry args={[size * 1.22, size * 1.3, 36]} />
            <meshBasicMaterial color="#71FF9C" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          {/* Primary Orbiting Cube Node */}
          <group ref={satelliteRef}>
            <mesh>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color="#71FF9C" emissive="#71FF9C" emissiveIntensity={0.7} />
            </mesh>
          </group>
          {/* Secondary Counter-Orbiting Node */}
          <group ref={satelliteRef2}>
            <mesh>
              <octahedronGeometry args={[0.08, 0]} />
              <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={0.6} />
            </mesh>
          </group>
        </>
      )}

      {/* SKILL CONSTELLATION: Satellite Clusters */}
      {type === 'skill' && (
        <>
          <group ref={satelliteRef}>
            <mesh>
              <dodecahedronGeometry args={[0.1, 0]} />
              <meshBasicMaterial color="#FF35D3" />
            </mesh>
          </group>
          <group ref={satelliteRef2}>
            <mesh>
              <dodecahedronGeometry args={[0.08, 0]} />
              <meshBasicMaterial color="#8B5CFF" />
            </mesh>
          </group>
        </>
      )}

      {/* EXPERIENCE NEBULA: Translucent Nebula Dust Shell */}
      {type === 'nebula' && (
        <>
          <mesh rotation={[0.5, 0.5, 0]}>
            <tetrahedronGeometry args={[size * 1.3, 1]} />
            <meshBasicMaterial color="#FFB347" transparent opacity={0.12} wireframe />
          </mesh>
          <mesh>
            <sphereGeometry args={[size * 0.45, 12, 12]} />
            <meshBasicMaterial color="#FFB347" />
          </mesh>
        </>
      )}

      {/* CONTACT PORTAL: Rotating Event Horizon Vortex */}
      {type === 'portal' && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[size * 0.52, 32]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 0.65, size * 0.72, 32]} />
            <meshBasicMaterial color="#71FF9C" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        </>
      )}

      {/* Targeting Reticle on Select or Hover */}
      {(isSelected || isHovered) && (
        <TargetingReticle size={size} color={isSelected ? '#00F5FF' : color} />
      )}

      {/* Soft Planetary Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[size * 1.6, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.12 : isHovered ? 0.08 : 0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Interactive Cyber HUD Label */}
      <Html
        position={[0, size + 0.58, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
        occlude={false}
      >
        <div style={{
          textAlign: 'center',
          userSelect: 'none',
          opacity: isHovered || isSelected ? 1 : 0.72,
          transform: isHovered || isSelected ? 'scale(1.08)' : 'scale(1)',
          transition: 'all 0.25s ease',
          pointerEvents: 'none',
        }}>
          {sector && (
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '7.5px',
              letterSpacing: '0.12em',
              color: 'rgba(146,155,179,0.7)',
              textTransform: 'uppercase',
              marginBottom: '1px',
            }}>
              {sector}
            </div>
          )}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: color,
            textTransform: 'uppercase',
            textShadow: `0 0 12px ${color}`,
            whiteSpace: 'nowrap',
          }}>
            {dest.label}
          </div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '8px',
            color: 'rgba(244,247,255,0.6)',
            whiteSpace: 'nowrap',
            marginTop: '1px',
          }}>
            {dest.sublabel}
          </div>
        </div>
      </Html>
    </group>
  );
}

// ============================================================
// CINEMATIC CAMERA & ORBIT CONTROLLER
// ============================================================
function CameraController({ targetPosition, controlsRef, selectedId }) {
  const { camera } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const defaultCamPos = useMemo(() => new THREE.Vector3(0, 3.2, 12.8), []);
  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  // Compute smooth framing position
  const { targetCamPos, targetLookAt } = useMemo(() => {
    if (!targetPosition) {
      return { targetCamPos: defaultCamPos, targetLookAt: defaultTarget };
    }

    const tp = new THREE.Vector3(...targetPosition);
    const dir = tp.clone().normalize();

    // Position camera slightly offset to left-center to accommodate the right HUD panel
    const camOffset = dir.clone().multiplyScalar(3.8).add(new THREE.Vector3(0, 1.2, 0));
    const newCamPos = tp.clone().add(camOffset);

    return {
      targetCamPos: newCamPos,
      targetLookAt: tp,
    };
  }, [targetPosition, defaultCamPos, defaultTarget]);

  useFrame(() => {
    if (prefersReducedMotion) {
      camera.position.copy(targetCamPos);
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLookAt);
        controlsRef.current.update();
      }
      return;
    }

    // Smooth camera swoop
    camera.position.lerp(targetCamPos, 0.045);

    // Smooth focal target transition
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt, 0.045);
      controlsRef.current.update();
    }
  });

  return null;
}

// ============================================================
// COSMIC DUST & PARTICLES
// ============================================================
function CosmicDust({ count = 800 }) {
  const ref = useRef();
  const prefersReducedMotion = useReducedMotion();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00F5FF'),
      new THREE.Color('#8B5CFF'),
      new THREE.Color('#FF35D3'),
      new THREE.Color('#71FF9C'),
      new THREE.Color('#F4F7FF'),
    ];

    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!prefersReducedMotion && ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ============================================================
// MAIN 3D SCENE COMPONENT
// ============================================================
function Scene({ selectedId, hoveredId, onSelect, onHover, onHoverEnd }) {
  const prefersReducedMotion = useReducedMotion();
  const { config } = useDeviceQuality();
  const controlsRef = useRef();

  const selectedDest = DESTINATIONS.find(d => d.id === selectedId);
  const activeHoveredDest = DESTINATIONS.find(d => d.id === hoveredId);
  const activeFocus = selectedDest || activeHoveredDest;

  return (
    <>
      {/* Atmospheric Fog for Infinite Deep Space Horizon */}
      <fogExp2 attach="fog" args={['#05060B', 0.024]} />

      {/* Atmospheric Lighting System */}
      <ambientLight intensity={0.25} color="#090D19" />
      <hemisphereLight
        skyColor="#090D19"
        groundColor="#05060B"
        intensity={0.35}
      />

      {/* Core Star Point Light (Origin Sun) */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2.8}
        color="#00F5FF"
        distance={28}
        decay={2}
      />

      {/* Deep Space Ultraviolet Rim Light */}
      <pointLight
        position={[10, 6, -8]}
        intensity={1.0}
        color="#8B5CFF"
        distance={32}
        decay={2}
      />

      {/* Cyber Green Terminal Accent Light */}
      <pointLight
        position={[-8, -5, -4]}
        intensity={0.7}
        color="#71FF9C"
        distance={24}
        decay={2}
      />

      {/* Distant Starfield */}
      <Stars
        radius={70}
        depth={35}
        count={config?.starCount || 1600}
        factor={4}
        saturation={0.5}
        fade
        speed={prefersReducedMotion ? 0 : 0.4}
      />

      {/* Cosmic Dust Field */}
      <CosmicDust count={config?.particleCount || 750} />

      {/* Planetary Orbital Tracks & Beacons */}
      {DESTINATIONS.filter(d => d.orbitRadius > 0).map(dest => (
        <PlanetaryOrbitalTrack
          key={`track-${dest.id}`}
          radius={dest.orbitRadius}
          tilt={dest.orbitTilt}
          color={dest.color}
          speed={dest.orbitSpeed}
          isHighlighted={selectedId === dest.id || hoveredId === dest.id}
        />
      ))}

      {/* Vector Tether from Core to Active Target */}
      {activeFocus && activeFocus.id !== 'about' && (
        <CoreTether
          targetPosition={activeFocus.position}
          color={activeFocus.color}
          active={Boolean(selectedId || hoveredId)}
        />
      )}

      {/* Planetary Worlds */}
      {DESTINATIONS.map(dest => (
        <Planet
          key={dest.id}
          dest={dest}
          isSelected={selectedId === dest.id}
          isHovered={hoveredId === dest.id}
          onClick={() => onSelect(dest.id)}
          onPointerOver={() => onHover(dest.id)}
          onPointerOut={() => onHoverEnd()}
        />
      ))}

      {/* Camera & Focus Interpolation */}
      <CameraController
        targetPosition={selectedDest?.position || null}
        controlsRef={controlsRef}
        selectedId={selectedId}
      />

      {/* OrbitControls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={4.5}
        maxDistance={22}
        autoRotate={!selectedId && !prefersReducedMotion}
        autoRotateSpeed={0.35}
        dampingFactor={0.06}
        enableDamping
      />
    </>
  );
}

// ============================================================
// EXPORTED UNIVERSE SCENE
// ============================================================
export default function UniverseScene({ selectedId, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);
  const { config } = useDeviceQuality();

  return (
    <Canvas
      camera={{ position: [0, 3.2, 12.8], fov: 60 }}
      dpr={config?.pixelRatio || 1.5}
      gl={{ antialias: config?.antialias ?? true, alpha: false }}
      style={{ background: 'linear-gradient(135deg, #05060B 0%, #090D19 100%)' }}
      aria-label="Interactive 3D developer universe"
    >
      <Suspense fallback={null}>
        <Scene
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={setHoveredId}
          onHoverEnd={() => setHoveredId(null)}
        />
      </Suspense>
    </Canvas>
  );
}

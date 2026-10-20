import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceQuality } from '../hooks/useDeviceQuality';
import { DESTINATIONS } from '../data/destinations';



// ============================================================
// ORBITAL RING
// ============================================================
function OrbitalRing({ radius, tilt = 0, color = '#00F5FF', opacity = 0.15, speed = 0.002 }) {
  const ref = useRef();
  const prefersReducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (!prefersReducedMotion && ref.current) {
      ref.current.rotation.z += speed;
    }
  });

  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.85, 0, Math.PI * 2, false, 0);
    const points = curve.getPoints(120);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [radius]);

  return (
    <group rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <lineLoop ref={ref} geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineLoop>
    </group>
  );
}

// ============================================================
// FLOATING PARTICLES
// ============================================================
function Particles({ count = 600 }) {
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
    ];
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 12;
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
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ============================================================
// PLANET
// ============================================================
function Planet({ dest, isSelected, isHovered, onClick, onPointerOver, onPointerOut }) {
  const ref = useRef();
  const prefersReducedMotion = useReducedMotion();
  const { size, color, emissive, position, type } = dest;

  const [orbitAngle] = React.useState(() => Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!ref.current || prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    // Gentle self-rotation
    ref.current.rotation.y = t * 0.3;

    // Float effect for non-core planets
    if (type !== 'core') {
      ref.current.position.y = position[1] + Math.sin(t * 0.5 + orbitAngle) * 0.15;
    }

    // Scale pulse on hover/select
    const targetScale = isSelected ? 1.15 : isHovered ? 1.08 : 1.0;
    const s = ref.current.scale;
    s.x += (targetScale - s.x) * 0.08;
    s.y += (targetScale - s.y) * 0.08;
    s.z += (targetScale - s.z) * 0.08;
  });

  const emissiveColor = useMemo(() => new THREE.Color(emissive), [emissive]);
  const emissiveIntensity = isSelected ? 0.6 : isHovered ? 0.4 : 0.2;

  const GeometryEl = useMemo(() => {
    switch (type) {
      case 'travel': return <icosahedronGeometry args={[size, 1]} />;
      case 'saas': return <octahedronGeometry args={[size, 0]} />;
      case 'skill': return <dodecahedronGeometry args={[size, 0]} />;
      case 'nebula': return <tetrahedronGeometry args={[size, 1]} />;
      case 'portal': return <torusGeometry args={[size * 0.7, size * 0.25, 8, 24]} />;
      default: return <sphereGeometry args={[size, 32, 32]} />;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, size]);

  return (
    <group position={position}>
      <mesh
        ref={ref}
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
        {GeometryEl}
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.4}
          metalness={0.6}
          wireframe={type === 'skill'}
        />
      </mesh>

      {/* Core Planet Special: Inner energy sphere and wireframe aura */}
      {type === 'core' && (
        <>
          <mesh>
            <sphereGeometry args={[size * 0.75, 24, 24]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.35} />
          </mesh>
          <mesh rotation={[0.4, 0.4, 0]}>
            <sphereGeometry args={[size * 1.15, 16, 16]} />
            <meshBasicMaterial color="#8B5CFF" wireframe transparent opacity={0.2} />
          </mesh>
        </>
      )}

      {/* Travel Planet Special: Flight route orbital ring */}
      {type === 'travel' && (
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[size * 1.25, size * 1.35, 32]} />
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* SaaS Planet Special: Data orbit ring */}
      {type === 'saas' && (
        <mesh rotation={[-Math.PI / 4, 0.3, 0]}>
          <ringGeometry args={[size * 1.2, size * 1.28, 32]} />
          <meshBasicMaterial color="#71FF9C" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Portal Special: Inner glowing vortex disc */}
      {type === 'portal' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[size * 0.5, 32]} />
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.45, size * 1.58, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Glow aura */}
      <mesh>
        <sphereGeometry args={[size * 1.7, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.08 : 0.03} side={THREE.BackSide} />
      </mesh>

      {/* Label */}
      <Html
        position={[0, size + 0.5, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
        occlude={false}
      >
        <div style={{
          textAlign: 'center',
          userSelect: 'none',
          opacity: isHovered || isSelected ? 1 : 0.7,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: color,
            textTransform: 'uppercase',
            textShadow: `0 0 10px ${color}`,
            whiteSpace: 'nowrap',
          }}>
            {dest.label}
          </div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '8px',
            color: 'rgba(244,247,255,0.5)',
            whiteSpace: 'nowrap',
          }}>
            {dest.sublabel}
          </div>
        </div>
      </Html>
    </group>
  );
}

// ============================================================
// CAMERA CONTROLLER
// ============================================================
function CameraController({ targetPosition }) {
  const { camera } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const defaultCamPos = useMemo(() => new THREE.Vector3(0, 3, 12), []);
  const targetCamPos = useMemo(() => {
    if (!targetPosition) return defaultCamPos;
    const tp = new THREE.Vector3(...targetPosition);
    const dir = tp.clone().normalize();
    // Position camera slightly behind and above the target
    return tp.clone().add(dir.multiplyScalar(4)).add(new THREE.Vector3(0, 1.5, 0));
  }, [targetPosition, defaultCamPos]);

  useFrame(() => {
    if (prefersReducedMotion) {
      camera.position.copy(targetCamPos);
      return;
    }
    camera.position.lerp(targetCamPos, 0.04);
  });

  return null;
}

// ============================================================
// UNIVERSE SCENE (inner)
// ============================================================
function Scene({ selectedId, hoveredId, onSelect, onHover, onHoverEnd }) {
  const prefersReducedMotion = useReducedMotion();
  const { config } = useDeviceQuality();
  const selectedDest = DESTINATIONS.find(d => d.id === selectedId);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} color="#090D19" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00F5FF" distance={20} />
      <pointLight position={[8, 4, -6]} intensity={0.8} color="#8B5CFF" distance={25} />
      <pointLight position={[-6, -4, -4]} intensity={0.6} color="#71FF9C" distance={20} />

      {/* Stars */}
      <Stars
        radius={60}
        depth={30}
        count={config?.starCount || 1500}
        factor={4}
        saturation={0.4}
        fade
        speed={prefersReducedMotion ? 0 : 0.5}
      />

      {/* Orbital rings */}
      <OrbitalRing radius={3} color="#00F5FF" opacity={0.1} speed={0.001} />
      <OrbitalRing radius={5.5} tilt={0.3} color="#8B5CFF" opacity={0.08} speed={0.0008} />
      <OrbitalRing radius={7} tilt={-0.4} color="#FF35D3" opacity={0.06} speed={0.0005} />

      {/* Particles */}
      <Particles count={config?.particleCount || 600} />

      {/* Planets */}
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

      {/* Camera */}
      <CameraController
        targetPosition={selectedDest?.position || null}
      />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        autoRotate={!selectedId && !prefersReducedMotion}
        autoRotateSpeed={0.4}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

// ============================================================
// EXPORTED UNIVERSE SCENE
// ============================================================

export default function UniverseScene({ selectedId, onSelect }) {
  const [hoveredId, setHoveredId] = React.useState(null);
  const { config } = useDeviceQuality();

  return (
    <Canvas
      camera={{ position: [0, 3, 12], fov: 60 }}
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

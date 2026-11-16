"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Uniforms = {
  uTime: { value: number };
  uRes: { value: THREE.Vector2 };
  uMouse: { value: THREE.Vector2 };
};
const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse; // smoothed, -1..1
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.7);
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = vUv;
  vec2 p = uv - 0.5;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.055;
  vec2 q = p * 1.35 + uMouse * 0.22;

  float n1 = fbm(q + vec2(t, -t * 0.6));
  float n2 = fbm(q * 1.7 + vec2(-t * 0.7, t * 0.45) + n1 * 0.9);
  float n3 = fbm(q * 2.9 - vec2(t * 0.3) + n2 * 1.4);

  vec3 night   = vec3(0.033, 0.030, 0.050);
  vec3 violet  = vec3(0.498, 0.114, 1.000);
  vec3 magenta = vec3(0.831, 0.400, 0.722);
  vec3 sun     = vec3(1.000, 0.922, 0.204);

  float blob1 = smoothstep(0.38, 0.86, n1 * 0.72 + n2 * 0.48);
  float blob2 = smoothstep(0.48, 0.92, n2 * 0.62 + n3 * 0.45);

  vec3 col = night;
  col = mix(col, violet * 0.9, blob1 * 0.8);
  col = mix(col, magenta * 0.85, blob2 * 0.55);
  col += sun * pow(max(0.0, n3 - 0.60), 2.2) * 1.15;

  // aurora band
  float band = sin((uv.y + n1 * 0.3 + t * 1.6) * 6.28318) * 0.5 + 0.5;
  col += violet * band * 0.045 * (1.0 - blob1 * 0.5);

  // corner glow following mouse (soft spotlight)
  vec2 m = uMouse * vec2(uRes.x / uRes.y, 1.0) * 0.5;
  float spot = smoothstep(0.9, 0.0, length(p - m * 0.8));
  col += violet * spot * 0.10;

  // vignette
  float vig = smoothstep(1.05, 0.30, length(p));
  col *= vig * 0.92 + 0.08;

  // grain
  float g = fract(sin(dot(uv + uTime * 0.01, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.03;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Module-scope uniforms: this plane is a singleton, and three.js requires
// mutating these values every frame (the standard R3F pattern).
const uniforms = {
  uTime: { value: 0 },
  uRes: { value: new THREE.Vector2(1, 1) },
  uMouse: { value: new THREE.Vector2(0, 0) },
};

function GradientPlane() {
  const { viewport, size } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uRes.value.set(size.width, size.height);
    mouse.current.lerp(target.current, 0.045);
    uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

function Particles({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      sizes[i] = Math.random() * 0.035 + 0.008;
    }
    return { positions, sizes };
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current || !group.current) return;
    const t = state.clock.elapsedTime;
    const attr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * (0.06 + (i % 5) * 0.012); // slow rise
      arr[i * 3] += Math.sin(t * 0.3 + i) * delta * 0.012; // gentle sway
      if (arr[i * 3 + 1] > 3.2) arr[i * 3 + 1] = -3.2;
    }
    attr.needsUpdate = true;

    mouse.current.lerp(target.current, 0.04);
    group.current.rotation.y = mouse.current.x * 0.08;
    group.current.rotation.x = -mouse.current.y * 0.06;
    group.current.position.y = Math.sin(t * 0.25) * 0.08;
  });

  return (
    <group ref={group}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          sizeAttenuation
          color="#e8ddff"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * Fullscreen fluid-gradient shader + drifting particles.
 * Pauses rendering when the hero leaves the viewport.
 */
export default function HeroCanvas() {
  const [active, setActive] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        frameloop={active && !reduce ? "always" : "never"}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "#09080d" }}
      >
        <GradientPlane />
        <Particles />
      </Canvas>
      {/* soft top/bottom blends into neighbouring sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night to-transparent" />
    </div>
  );
}

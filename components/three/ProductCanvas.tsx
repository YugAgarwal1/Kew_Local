"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ErrorInfo, type MutableRefObject, type ReactNode } from "react";
import gsap from "gsap";
import * as THREE from "three";

const modelUrl = "/models/low-voltage-form-2-switchgear-cubicle-row.glb";

class ModelBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(_: Error, __: ErrorInfo) { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function SwitchgearModel({ scrollProgress, onReady }: { scrollProgress?: MutableRefObject<number>; onReady: () => void }) {
  const { scene } = useGLTF(modelUrl);
  const assembly = useRef<THREE.Group>(null);
  const entrance = useRef(0);

  const model = useMemo(() => {
    const copy = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(copy);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    copy.position.sub(center);
    copy.scale.setScalar(3.55 / Math.max(size.x, size.y, size.z));
    copy.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      node.castShadow = true;
      node.receiveShadow = true;
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => {
        if ("envMapIntensity" in material) material.envMapIntensity = 1.15;
      });
    });
    return copy;
  }, [scene]);

  useEffect(() => {
    onReady();
    const tween = gsap.to(entrance, { current: 1, duration: 1.35, ease: "power3.out", delay: 0.12 });
    return () => { tween.kill(); };
  }, [onReady]);

  useFrame((state, delta) => {
    if (!assembly.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scroll = reduced ? 0 : (scrollProgress?.current ?? 0);
    const enter = entrance.current;
    const targetRotationX = -0.04 + (reduced ? 0 : state.pointer.y * 0.045) - scroll * 0.04;
    const targetRotationY = -0.5 + (reduced ? 0 : state.pointer.x * 0.07) + scroll * 0.42;
    const targetX = 0.06 + scroll * 0.34;
    const targetY = -0.1 + scroll * 0.18 + (1 - enter) * -0.32;
    const targetScale = 0.92 + enter * 0.08 - scroll * 0.045;
    assembly.current.rotation.x = THREE.MathUtils.damp(assembly.current.rotation.x, targetRotationX, 3.4, delta);
    assembly.current.rotation.y = THREE.MathUtils.damp(assembly.current.rotation.y, targetRotationY, 3.4, delta);
    assembly.current.position.x = THREE.MathUtils.damp(assembly.current.position.x, targetX, 3.2, delta);
    assembly.current.position.y = THREE.MathUtils.damp(assembly.current.position.y, targetY, 3.2, delta);
    assembly.current.scale.setScalar(THREE.MathUtils.damp(assembly.current.scale.x, targetScale, 3.2, delta));
  });

  return <group ref={assembly}><primitive object={model} /></group>;
}

export default function ProductCanvas({ scrollProgress }: { scrollProgress?: MutableRefObject<number> }) {
  const [modelReady, setModelReady] = useState(false);
  const [modelFailed, setModelFailed] = useState(false);

  return <div className="relative h-full w-full" aria-label="Interactive generic Form 2 switchgear concept visualization">
    <div className={`absolute inset-0 transition-opacity duration-700 ${modelReady && !modelFailed ? "opacity-0" : "opacity-100"}`}>
      <img src="/images/product-focus.webp" alt="KEW electrical equipment" className="absolute inset-0 w-full h-full object-contain p-5 opacity-85" />
    </div>
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.12, 6.8], fov: 30 }}
      shadows
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      className="absolute inset-0 touch-none"
      fallback={<div className="h-full w-full" />}
      onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.08; }}
    >
      <ambientLight intensity={0.42} />
      <directionalLight position={[4.5, 5.5, 5]} intensity={3.2} castShadow color="#ffffff" shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 1.8, 3]} intensity={1.35} color="#d8e0e8" />
      <spotLight position={[1.8, 4, 4.5]} intensity={2.2} angle={0.44} penumbra={1} color="#fff4f3" />
      <pointLight position={[-3, -1, 2]} intensity={0.8} color="#e52529" distance={7} />
      <ModelBoundary onError={() => setModelFailed(true)}>
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.8} />
          <SwitchgearModel scrollProgress={scrollProgress} onReady={() => setModelReady(true)} />
          <ContactShadows position={[0, -1.82, 0]} opacity={0.34} scale={5.7} blur={2.7} far={4.4} color="#000000" />
        </Suspense>
      </ModelBoundary>
    </Canvas>
    <span className="absolute bottom-7 right-0 border-l border-[#e52529] pl-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/42">CC0 switchgear concept · Pointer + scroll responsive</span>
  </div>;
}

useGLTF.preload(modelUrl);

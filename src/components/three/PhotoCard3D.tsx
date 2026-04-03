"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Particles } from "./Particles";

function PhotoPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/images/jatin-photo.jpg");
  const { pointer } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.3,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.4, 3, 1, 1]} />
      <meshStandardMaterial map={texture} />
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.55, 3.15, 1, 1]} />
        <meshStandardMaterial
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </mesh>
  );
}

export function PhotoCard3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <PhotoPlane />
        <Particles count={40} />
      </Canvas>
    </div>
  );
}

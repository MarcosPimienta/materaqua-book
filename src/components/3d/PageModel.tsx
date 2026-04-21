import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PageModelProps {
  index: number;
  currentPage: number;
  modelPath: string;
}

export const PageModel = ({ index, currentPage, modelPath }: PageModelProps) => {
  const group = useRef<THREE.Group>(null);
  
  // Use try-catch or conditional loading if needed, 
  // but useGLTF is a hook and must be called top-level.
  // We'll use a placeholder for now to avoid errors if file doesn't exist.
  const { scene, animations } = useGLTF(modelPath, true) || { scene: null, animations: [] };
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || !actions["Open"]) return;

    // Logic to play "Open" or "Close" based on currentPage
    if (index < currentPage) {
      // Page should be open
      actions["Open"].play().paused = false;
      actions["Open"].clampWhenFinished = true;
      actions["Open"].setLoop(THREE.LoopOnce, 1);
    } else {
      // Page should be closed
      // In a real scenario, you'd play the animation in reverse 
      // or use a separate "Close" clip.
      actions["Open"].stop();
    }
  }, [currentPage, index, actions]);

  if (!scene) {
    // Placeholder while model is missing
    return (
      <mesh position-x={index * 0.1} rotation-y={index < currentPage ? -Math.PI : 0}>
        <boxGeometry args={[4, 5, 0.05]} />
        <meshStandardMaterial color={index % 2 === 0 ? "#f4f3ec" : "#e5e4e7"} />
      </mesh>
    );
  }

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

// Preload common paths if possible
// useGLTF.preload("/models/page_1.glb");

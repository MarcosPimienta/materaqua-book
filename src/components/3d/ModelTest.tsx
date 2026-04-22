import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useBookStore } from "../../store/useBookStore";

export const ModelTest = () => {
  const coverGroup = useRef<THREE.Group>(null);
  const pageGroup = useRef<THREE.Group>(null);

  const cover = useGLTF("/models/BookCover.glb");
  const page00 = useGLTF("/models/Page00.glb");

  const { actions: coverActions } = useAnimations(cover.animations, coverGroup);
  const { actions: pageActions } = useAnimations(page00.animations, pageGroup);

  const currentPage = useBookStore((state) => state.currentPage);

  useEffect(() => {
    if (currentPage === 1) {
      if (coverActions["Animation"]) {
        coverActions["Animation"].reset().fadeIn(0.5).play();
        coverActions["Animation"].setLoop(THREE.LoopOnce, 1);
        coverActions["Animation"].clampWhenFinished = true;
      }
      if (pageActions["Animation"]) {
        pageActions["Animation"].reset().fadeIn(0.5).play();
        pageActions["Animation"].setLoop(THREE.LoopOnce, 1);
        pageActions["Animation"].clampWhenFinished = true;
      }
    } else if (currentPage === 0) {
      if (coverActions["Animation"]) coverActions["Animation"].fadeOut(0.5).stop();
      if (pageActions["Animation"]) pageActions["Animation"].fadeOut(0.5).stop();
    }
  }, [coverActions, pageActions, currentPage]);

  return (
    <group name="Model_Test">
      <group ref={coverGroup}>
        <primitive object={cover.scene} />
      </group>
      <group ref={pageGroup}>
        <primitive object={page00.scene} />
      </group>
    </group>
  );
};

useGLTF.preload("/models/BookCover.glb");
useGLTF.preload("/models/Page00.glb");

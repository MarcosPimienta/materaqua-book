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
  const prevPage = useRef(currentPage);

  useEffect(() => {
    const coverAction = coverActions["Animation"];
    const pageAction = pageActions["Animation"];

    const startPageOpening = () => {
      pageAction.reset().setLoop(THREE.LoopOnce, 1);
      pageAction.clampWhenFinished = true;
      pageAction.timeScale = 1.5;
      pageAction.play();
    };

    const startCoverClosing = () => {
      coverAction.paused = false;
      coverAction.setLoop(THREE.LoopOnce, 1);
      coverAction.clampWhenFinished = true;
      coverAction.timeScale = -1.5;
      if (coverAction.time === 0) coverAction.time = coverAction.getClip().duration;
      coverAction.play();
    };

    let timeout: any;

    // Opening Sequence (C -> 1)
    if (currentPage === 1 && prevPage.current === 0) {
      coverAction.reset().setLoop(THREE.LoopOnce, 1);
      coverAction.clampWhenFinished = true;
      coverAction.timeScale = 1.5;
      coverAction.play();
      
      // Start page opening slightly before cover finishes for fluid motion
      const overlapDelay = (coverAction.getClip().duration / 1.5) * 800; // 80% of duration in ms
      timeout = setTimeout(startPageOpening, overlapDelay);
    } 
    // Closing Sequence (1 -> C)
    else if (currentPage === 0 && prevPage.current === 1) {
      pageAction.paused = false;
      pageAction.setLoop(THREE.LoopOnce, 1);
      pageAction.clampWhenFinished = true;
      pageAction.timeScale = -1.5;
      if (pageAction.time === 0) pageAction.time = pageAction.getClip().duration;
      pageAction.play();

      // Start cover closing slightly before page finishes
      const overlapDelay = (pageAction.getClip().duration / 1.5) * 800;
      timeout = setTimeout(startCoverClosing, overlapDelay);
    }

    prevPage.current = currentPage;

    return () => {
      clearTimeout(timeout);
    };
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

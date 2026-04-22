import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useBookStore } from "../../store/useBookStore";

export const ModelTest = () => {
  const coverGroup = useRef<THREE.Group>(null);
  const pageGroup = useRef<THREE.Group>(null);

  const cover = useGLTF("/models/BookCover.glb");
  const page00 = useGLTF("/models/Page00.glb");

  const { actions: coverActions, mixer: coverMixer } = useAnimations(cover.animations, coverGroup);
  const { actions: pageActions, mixer: pageMixer } = useAnimations(page00.animations, pageGroup);

  const currentPage = useBookStore((state) => state.currentPage);
  const prevPage = useRef(currentPage);

  useEffect(() => {
    const coverAction = coverActions["Animation"];
    const pageAction = pageActions["Animation"];

    if (!coverAction || !pageAction) return;

    const onCoverOpened = (e: any) => {
      if (e.action === coverAction) {
        pageAction.reset().setLoop(THREE.LoopOnce, 1);
        pageAction.clampWhenFinished = true;
        pageAction.timeScale = 1;
        pageAction.play();
      }
    };

    const onPageClosed = (e: any) => {
      if (e.action === pageAction) {
        coverAction.paused = false;
        coverAction.setLoop(THREE.LoopOnce, 1);
        coverAction.clampWhenFinished = true;
        coverAction.timeScale = -1;
        if (coverAction.time === 0) coverAction.time = coverAction.getClip().duration;
        coverAction.play();
      }
    };

    // Opening Sequence (C -> 1)
    if (currentPage === 1 && prevPage.current === 0) {
      coverMixer.addEventListener("finished", onCoverOpened);
      coverAction.reset().setLoop(THREE.LoopOnce, 1);
      coverAction.clampWhenFinished = true;
      coverAction.timeScale = 1;
      coverAction.play();
    } 
    // Closing Sequence (1 -> C)
    else if (currentPage === 0 && prevPage.current === 1) {
      pageMixer.addEventListener("finished", onPageClosed);
      pageAction.paused = false;
      pageAction.setLoop(THREE.LoopOnce, 1);
      pageAction.clampWhenFinished = true;
      pageAction.timeScale = -1;
      if (pageAction.time === 0) pageAction.time = pageAction.getClip().duration;
      pageAction.play();
    }

    prevPage.current = currentPage;

    return () => {
      coverMixer.removeEventListener("finished", onCoverOpened);
      pageMixer.removeEventListener("finished", onPageClosed);
    };
  }, [coverActions, pageActions, coverMixer, pageMixer, currentPage]);

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

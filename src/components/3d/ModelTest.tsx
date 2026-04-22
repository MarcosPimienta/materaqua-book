import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const ModelTest = () => {
  const coverGroup = useRef<THREE.Group>(null);
  const pageGroup = useRef<THREE.Group>(null);

  const cover = useGLTF("/models/BookCover.glb");
  const page00 = useGLTF("/models/Page00.glb");

  const { actions: coverActions } = useAnimations(cover.animations, coverGroup);
  const { actions: pageActions } = useAnimations(page00.animations, pageGroup);

  useEffect(() => {
    if (coverActions["Animation"]) {
      coverActions["Animation"].play();
    }
    if (pageActions["Animation"]) {
      pageActions["Animation"].play();
    }
  }, [coverActions, pageActions]);

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

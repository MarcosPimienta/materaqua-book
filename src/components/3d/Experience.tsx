import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { ModelTest } from "./ModelTest";
import { Suspense } from "react";

export const Experience = () => {
  return (
    <div className="canvas-container">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 45 }}>
        <color attach="background" args={["#16171d"]} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <group position-y={-1}>
            <ModelTest />
            <ContactShadows
              opacity={0.5}
              scale={20}
              blur={2.4}
              far={4.5}
              color="#000000"
            />
          </group>
        </Suspense>
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
      </Canvas>
    </div>
  );
};

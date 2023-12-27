import { useFrame } from "@react-three/fiber";
import {
  Stage,
  Lightformer,
  Sky,
  AccumulativeShadows,
  useHelper,
  OrbitControls,
  BakeShadows,
  SoftShadows,
  RandomizedLight,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  const cube = useRef();

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#4b2709",
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 7, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  return (
    <>
      {/* <Environment
        background
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      > */}
      {/* <color args={["#000000"]} attach="background" />
        <Lightformer
          position-z={-5}
          scale={10}
          color="red"
          form="ring"
          intensity={10}
        /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}
      {/* <BakeShadows /> */}

      <Perf position="top-left" />
      {/* <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
      /> */}
      <OrbitControls makeDefault />

      {/* <directionalLight
        position={sunPosition}
        ref={directionalLight}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      /> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        {/* <RandomizedLight
          // amount={8}
          // radius={1}
          // ambient={0.5}
          // intensity={1}
          position={[1, 2, 3]}
          // bias={0.001}
        /> */}
      {/* </AccumulativeShadows> */}
      {/* <ambientLight intensity={0.5} /> */}
      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="potrait"
        intensity={2}
      >
        <mesh position-x={-2} position-y={1} castShadow>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </Stage>

      {/* <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}
      {/* <Sky sunPosition={sunPosition} /> */}
    </>
  );
}

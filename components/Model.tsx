"use client";

import { Center } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import * as THREE from "three";

type Props = {
  url: string;
  scale: number;
  rotation: [number, number, number];
};

export default function Model(props: Props) {
  const ext = props.url.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "glb":
    case "gltf":
      return <GLTFModel {...props} />;

    case "stl":
      return <STLModel {...props} />;

    case "obj":
      return <OBJModel {...props} />;

    default:
      throw new Error(`Unsupported format: ${ext}`);
  }
}

function GLTFModel({ url, scale, rotation }: Props) {
  const gltf = useLoader(GLTFLoader, url);

  return (
    <Center>
      <primitive object={gltf.scene} scale={scale} rotation={rotation} />
    </Center>
  );
}

function STLModel({ url, scale, rotation }: Props) {
  const geometry = useLoader(STLLoader, url);

  return (
    <Center>
      <mesh geometry={geometry} scale={scale} rotation={rotation}>
        <meshStandardMaterial color="#999" />
      </mesh>
    </Center>
  );
}

function OBJModel({ url, scale, rotation }: Props) {
  const object = useLoader(OBJLoader, url);

  return (
    <Center>
      <primitive object={object} scale={scale} rotation={rotation} />
    </Center>
  );
}

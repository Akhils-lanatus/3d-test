"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import Model from "./Model";

const MODELS = [
  { name: "Duck (GLB)", url: "/models/Duck.glb" },
  { name: "AT&T Building (STL)", url: "/models/AT&T Building.stl" },
  { name: "Bugatti (OBJ)", url: "/models/bugatti.obj" },
];

export default function Viewer() {
  const glRef = useRef<THREE.WebGLRenderer | null>(null);

  const [selectedModel, setSelectedModel] = useState(MODELS[0].url);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  const takeScreenshot = () => {
    if (!glRef.current) return;

    const url = glRef.current.domElement.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "screenshot.png";
    a.click();
  };

  const handleModelChange = (url: string) => {
    setSelectedModel(url);
    setScale(1);
    setRotation([0, 0, 0]);
  };

  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          glRef.current = gl;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 7]} intensity={1} />

          <Model
            key={selectedModel}
            url={selectedModel}
            scale={scale}
            rotation={rotation}
          />

          <OrbitControls />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      {/* Model Selector */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          gap: 10,
        }}
      >
        <select
          value={selectedModel}
          onChange={(e) => handleModelChange(e.target.value)}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {MODELS.map((model) => (
            <option key={model.url} value={model.url}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          display: "flex",
          gap: 15,
          alignItems: "flex-end",
        }}
      >
        {/* Rotation Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "10px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>
            Rotation
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setRotation(([x, y, z]) => [x - 0.2, y, z])}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              title="Rotate X axis negative"
            >
              X−
            </button>
            <button
              onClick={() => setRotation(([x, y, z]) => [x + 0.2, y, z])}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              title="Rotate X axis positive"
            >
              X+
            </button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setRotation(([x, y, z]) => [x, y - 0.2, z])}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              title="Rotate Y axis negative"
            >
              Y−
            </button>
            <button
              onClick={() => setRotation(([x, y, z]) => [x, y + 0.2, z])}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              title="Rotate Y axis positive"
            >
              Y+
            </button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setRotation(([x, y, z]) => [x, y, z - 0.2])}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
                background: "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              title="Rotate Z axis negative"
            >
              Z−
            </button>
            <button
              onClick={() => setRotation(([x, y, z]) => [x, y, z + 0.2])}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
                background: "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              title="Rotate Z axis positive"
            >
              Z+
            </button>
          </div>
        </div>

        {/* Scale Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "10px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>
            Scale
          </div>
          <button
            onClick={() => setScale((s) => s + 0.2)}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              cursor: "pointer",
              background: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "600",
            }}
            title="Scale up"
          >
            Zoom In +
          </button>
          <button
            onClick={() => setScale((s) => Math.max(0.2, s - 0.2))}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              cursor: "pointer",
              background: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "600",
            }}
            title="Scale down"
          >
            Zoom Out −
          </button>
          <div
            style={{
              fontSize: "11px",
              color: "#666",
              textAlign: "center",
              marginTop: "4px",
            }}
          >
            {scale.toFixed(1)}x
          </div>
        </div>

        {/* Screenshot */}
        <button
          onClick={takeScreenshot}
          style={{
            padding: "12px 20px",
            fontSize: "14px",
            cursor: "pointer",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          title="Take screenshot"
        >
          📸 Screenshot
        </button>
      </div>
    </>
  );
}

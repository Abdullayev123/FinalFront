import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { applyProps, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Lamborghini({ modelColor, ...props }) {
  const { scene, nodes, materials } = useGLTF("/lambo.glb");
  const { gl } = useThree();
  const isMobile = window.innerWidth < 768; // Detect mobile

  // Memoize and optimize materials
  useMemo(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        if (node.name.startsWith("glass")) node.geometry.computeVertexNormals();
        if (node.name === "silver_001_BreakDiscs_0") {
          node.material = applyProps(materials.BreakDiscs.clone(), {
            color: "#ddd",
          });
        }
      }
    });

    // Optimize materials for performance
    applyProps(materials.FrameBlack, {
      metalness: 0.5,
      roughness: 0.3,
      color: "#222222",
    });

    applyProps(materials.Chrome, {
      metalness: 1,
      roughness: 0,
      envMapIntensity: 1.2,
      color: "#aaa",
    });

    applyProps(materials.BreakDiscs, {
      metalness: 0.1,
      roughness: 0.5,
      color: "#555",
    });

    applyProps(materials.TiresGum, {
      metalness: 0,
      roughness: 0.6,
      color: "#181818",
    });

    applyProps(materials.GreyElements, { metalness: 0, color: "#292929" });

    applyProps(materials.emitbrake, {
      emissiveIntensity: isMobile ? 2 : 3,
      toneMapped: false,
    });

    applyProps(materials.LightsFrontLed, {
      emissiveIntensity: isMobile ? 2.5 : 3,
      toneMapped: false,
    });

    applyProps(materials.emitbrake, {
      emissive: "#ff0000",
      emissiveIntensity: 10,
    });

    // Disable shadows on mobile to improve FPS
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = !isMobile;
        obj.receiveShadow = !isMobile;
      }
    });

    // Optimize rendering performance by limiting animation updates
    gl.setAnimationLoop(() => {
      if (performance.now() % 2 === 0) return; // Skip every 2nd frame
      gl.render(scene, gl.camera);
    });
  }, [nodes, materials, gl, isMobile]);

  // 🔹 Use useEffect to update car color dynamically
  useEffect(() => {
    if (nodes.yellow_WhiteCar_0) {
      nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
        roughness: 0.6,
        metalness: 1,
        color: new THREE.Color(modelColor), // ✅ Update the color dynamically
        envMapIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        sheen: 1,
        transmission: 0,
      });
    }
  }, [modelColor]); // Runs when modelColor changes

  return <primitive object={scene} {...props} />;
}

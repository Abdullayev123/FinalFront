import * as THREE from "three";
import { useMemo } from "react";
import { applyProps, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

/*
Author: Steven Grey (https://sketchfab.com/Steven007)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/lamborghini-urus-2650599973b649ddb4460ff6c03e4aa2
Title: Lamborghini Urus
*/

export function Lamborghini(props) {
  const { scene, nodes, materials } = useGLTF("/lambo.glb");
  const { gl } = useThree();
  const isMobile = window.innerWidth < 768; // Detect mobile

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

    // Scale glass elements
    nodes["glass_003"].scale.setScalar(2.7);

    // Optimize materials for performance
    applyProps(materials.FrameBlack, {
      metalness: 0.5, // Lowered from 0.75
      roughness: 0.3, // Added roughness for better mobile performance
      color: "#222222",
    });

    applyProps(materials.Chrome, {
      metalness: 0.8,
      roughness: 0.1,
      color: "#333",
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
      emissiveIntensity: isMobile ? 3 : 5,
    });

    // Paint, changed from black to white, optimized for performance
    nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
      roughness: 0.4, // Increased roughness to reduce reflections
      metalness: 0.05,
      color: "#ffffff",
      envMapIntensity: 0.5, // Lowered from 0.75 for mobile
      clearcoatRoughness: 0.1, // Added to prevent high reflections
      clearcoat: 0.8, // Lowered for mobile performance
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

  return <primitive object={scene} {...props} />;
}

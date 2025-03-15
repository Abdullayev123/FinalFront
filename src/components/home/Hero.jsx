/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Lamborghini } from "./Lambo";
import {
  AdaptiveDpr,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { Effects } from "./Effects";
import { useEffect, useRef, useState, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const rightIndicator = useRef();
  const leftIndicator = useRef();
  const scroll = useRef();

  const [modelScale, setModelScale] = useState(0.015);
  const [floorScale, setFloorScale] = useState(4);
  const [shadowScale, setShadowScale] = useState(15);
  const [position, setPosition] = useState([0, 0, 0]);
  const [modelColor, setModelColor] = useState("#ffffff");

  useGSAP(() => {
    gsap.to([leftIndicator.current], {
      rotate: 360,
      transformOrigin: "center center",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to([rightIndicator.current], {
      rotate: -360,
      transformOrigin: "center center",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 768) {
        setModelScale(0.008);
        setFloorScale(2);
        setShadowScale(7);
        setPosition([0, -0.53, 0]);
      } else if (window.innerWidth < 1024) {
        setModelScale(0.012);
        setFloorScale(3);
        setShadowScale(10);
        setPosition([0, -0.26, 0]);
      } else {
        setModelScale(0.015);
        setFloorScale(4);
        setShadowScale(15);
        setPosition([0, 0, 0]);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section id="hero" className="w-full h-screen relative overflow-hidden">
      {/* <img
      className="w-full h-full object-cover"
      src="https://res.cloudinary.com/dlajjeqxv/image/upload/v1740296590/photo-1678203699263-917199c725b2_dkbv0c.jpg"
      alt=""
    /> */}
      <Canvas
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1.3, 2]}
        camera={{ position: [10, 10, 0], fov: 25 }}
        frameloop="demand"
      >
        <AdaptiveDpr pixelated />
        <color attach="background" args={["#111111"]} />

        <Text
          position={[-4, 2, 2.5]} // Adjust position
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI / 1.4, 0]} // Rotated 45 degrees on Y-axis
        >
          Lamborghini Huracán
        </Text>

        <Text
          position={[-4, 1.5, 2.5]} // Adjust position
          fontSize={0.3}
          color="gray"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI / 1.4, 0]} // Rotated 45 degrees on Y-axis
        >
          631 HP | 0-60 in 2.9s | AWD
        </Text>

        <Suspense fallback={null}>
          <Lamborghini
            rotation={[0, Math.PI / 1.5, 0]}
            position={position}
            scale={modelScale}
            modelColor={modelColor}
          />
        </Suspense>
        <ContactShadows
          resolution={1024}
          frames={1}
          position={[0, -1.16, 0]}
          scale={shadowScale} // Dynamic shadow size
          blur={0.5}
          opacity={1}
          far={20}
        />
        <mesh
          scale={floorScale} // Dynamic floor size
          position={[3, -1.161, -1.5]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
        >
          <ringGeometry args={[0.9, 1, 4, 1]} />
          <meshStandardMaterial color="#111" roughness={0.75} />
        </mesh>

        <mesh
          scale={floorScale}
          position={[-3, -1.161, -1]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
        >
          <ringGeometry args={[0.9, 1, 3, 1]} />
          <meshStandardMaterial color="#111" roughness={0.75} />
        </mesh>

        <Environment resolution={512}>
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -9]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -6]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -3]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 0]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 3]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 6]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 9]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-50, 2, 0]}
            scale={[100, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[50, 2, 0]}
            scale={[100, 2, 1]}
          />

          <Lightformer
            form="ring"
            color="red"
            intensity={10}
            scale={2}
            position={[10, 5, 10]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <Effects />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.8}
        />
      </Canvas>
      {/* Left Indicator */}
      <div
        ref={leftIndicator}
        className="absolute left-5 top-[50%] -translate-y-1/2 text-white text-[6rem] origin-center"
      >
        +
      </div>
      {/* Right Indicator */}
      <div
        ref={rightIndicator}
        className="absolute right-5 top-[50%] -translate-y-1/2 text-white text-[6rem] origin-center"
      >
        +
      </div>
      {/* Scroll Indicator */}
      <div ref={scroll}>
        <div className="absolute bottom-10 left-[50%] -translate-x-1/2 text-white text-center">
          <button
            onClick={() => {
              document
                .getElementById("info-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 text-lg bg-white text-[#111] rounded-full shadow-md hover:bg-gray-200 transition-all"
          >
            Scroll Down ↓
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 -translate-x-1/2 flex md: flex-col gap-4">
        {["#000000", "#ffffff", "#d9480f", "#a61e4d"].map((color) => (
          <button
            key={color}
            onClick={() => setModelColor(color)}
            className={`w-5 h-12 sm:w-12 sm:h-12 rounded-full border-2 border-white cursor-pointer  `}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

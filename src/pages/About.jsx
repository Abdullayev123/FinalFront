/* eslint-disable react/no-unknown-property */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CursorContext } from "../components/context/CursorProvider";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  Stats,
} from "@react-three/drei";

import { Effects } from "../../public/Effects";
import { Lamborghini } from "../../public/Lambo";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const About = () => {
  const scroll = useRef();
  const rightIndicator = useRef();
  const leftIndicator = useRef();
  const [data, setData] = useState([]);
  const { setCursorsize } = useContext(CursorContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://finalback-k90r.onrender.com/cars"
        );
        const data = await response.json();
        setData(data.sort(() => Math.random() - 0.5)); // Shuffle inline
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [modelScale, setModelScale] = useState(0.015);
  const [floorScale, setFloorScale] = useState(4);
  const [shadowScale, setShadowScale] = useState(15);
  const [position, setPosition] = useState([0, 0, 0]);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 768) {
        // Mobile devices
        setModelScale(0.008);
        setFloorScale(2); // Smaller floor
        setShadowScale(7); // Reduce shadow size
        setPosition([0, -0.53, 0]); // Offset position
      } else if (window.innerWidth < 1024) {
        // Tablets
        setModelScale(0.012);
        setFloorScale(3);
        setShadowScale(10);
        setPosition([0, -0.26, 0]); // Offset position
      } else {
        // Desktop
        setModelScale(0.015);
        setFloorScale(4);
        setShadowScale(15);
        setPosition([0, 0, 0]); // Offset position
      }
    };

    updateScale(); // Call on mount
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useGSAP(() => {
    gsap.to(scroll.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
      ease: "power2.inOut",
    });

    gsap.to([leftIndicator.current], {
      rotate: 360,
      transformOrigin: "center center", // Ensures rotation happens from the center
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to([rightIndicator.current], {
      rotate: -360,
      transformOrigin: "center center", // Ensures rotation happens from the center
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to("#overlay", {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#info-section",
        start: "top center",
      },
    });
    gsap.set("#selected-overlay", { opacity: 0 });
    gsap.to("#selected-overlay", {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#selected-we",
        start: "top center",
      },
    });
  });

  return (
    <>
      <section id="hero" className="w-full h-screen relative overflow-hidden">
        <Canvas
          gl={{ logarithmicDepthBuffer: true, antialias: false }}
          dpr={[1, 1.5]}
          camera={{ position: [15, 0, 0], fov: 25 }}
        >
          <color attach="background" args={["#111"]} />
          <Lamborghini
            rotation={[0, Math.PI / 1.5, 0]}
            position={position}
            scale={modelScale}
          />

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
            <meshStandardMaterial color="white" roughness={0.75} />
          </mesh>

          <mesh
            scale={floorScale}
            position={[-3, -1.161, -1]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
          >
            <ringGeometry args={[0.9, 1, 3, 1]} />
            <meshStandardMaterial color="white" roughness={0.75} />
          </mesh>

          {/* We're building a cube-mapped environment declaratively.
          Anything you put in here will be filmed (once) by a cubemap-camera
          and applied to the scenes environment, and optionally background. */}
          <Environment resolution={1024}>
            {/* Ceiling */}
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
            {/* Sides */}
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
            {/* Key */}
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
              className="px-6 py-3 text-lg bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition-all"
            >
              Scroll Down ↓
            </button>
          </div>
        </div>
      </section>
      <section id="info-section" className="py-[100px] px-[18px] bg-white">
        <div id="overlay" className="flex flex-col lg:flex-row opacity-0">
          <div className="w-full mb-14 lg:w-1/3 ">
            <h1 className="text-[24px] text-[#000]">(Info)</h1>
          </div>
          <div
            id="text"
            className="w-full lg:w-2/3 text-[#000] text-2xl md:text-3xl"
          >
            <h1 className="mb-10">
              At Azerbaijan Gallery, we bring the world of automotive excellence
              to your fingertips. Whether you&apos;re a car enthusiast, a
              collector, or simply someone who appreciates the beauty of finely
              crafted vehicles, our gallery is your gateway to a stunning
              collection of cars from every era and style.
            </h1>
            <h1 className="mb-10">
              Explore our curated selection of luxury sedans, powerful sports
              cars, rugged SUVs, and timeless classics. Each vehicle is a
              masterpiece of engineering and design, showcased in
              high-resolution images and detailed descriptions. From sleek
              modern designs to vintage treasures, our gallery celebrates the
              artistry and innovation of the automotive world.
            </h1>
            <h1>
              Step into the future with our exclusive collection of modern cars.
              These vehicles represent the pinnacle of automotive technology,
              combining cutting-edge performance with breathtaking aesthetics.
              From electric vehicles (EVs) that redefine sustainability to
              high-performance supercars that push the limits of speed, our
              modern car gallery showcases the best of what today&apos;s
              automotive industry has to offer.
            </h1>
          </div>
        </div>
      </section>

      <section
        id="selected-we"
        className="py-[100px] px-[18px] bg-white text-[#000]"
      >
        <div id="selected-overlay">
          <div id="section-heading">
            <Link
              to={`/allcars/`}
              onMouseEnter={() => {
                setCursorsize({ cursorWidth: 80, cursorHeight: 80 });
              }}
              onMouseLeave={() => {
                setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
              }}
              onClick={() => {
                setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
              }}
              className="h-fit mb-10 relative group flex  -gap-30"
            >
              <h1
                id="all-cars-text"
                className="md:text-[10rem] sm:text-[7rem] text-[4rem] leading-[1] mb-0 md:mb-[60px]"
              >
                All Cars
              </h1>
              <FaArrowRight
                id="arrow"
                className="transition-all duration-500 group-hover:translate-x-10 text-[3rem] md:text-[4rem]"
              />
            </Link>
          </div>
          <div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-5 md:px-5">
              {data &&
                data.slice(0, 8).map((data, index) => {
                  return (
                    <Link
                      key={data._id}
                      to={`/allcars/${data.brand.toLowerCase()}/detail/${
                        data._id
                      }`}
                      onMouseEnter={() => {
                        setCursorsize({ cursorWidth: 80, cursorHeight: 80 });
                      }}
                      onMouseLeave={() => {
                        setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
                      }}
                      onClick={() => {
                        setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
                      }}
                      className=" mb-10 relative group"
                    >
                      <div className=" border-b-1 pb-4 flex items-center justify-between ">
                        <div className="truncate flex text-nowrap">
                          <h1 className="mr-4">({index + 1})</h1>
                          <h1 className=" text-[#000]  text-md lg:text-2xl font-extralight mr-5">
                            {data.modelName}
                          </h1>
                          <div className="text-[#000]  text-md lg:text-2xl font-extralight">
                            ({data.brand})
                          </div>
                        </div>
                        <FaArrowLeft
                          id="arrow"
                          className="transition-all duration-500 group-hover:rotate-180"
                        />
                      </div>
                      <img
                        className="absolute right-10 -top-1/2 w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        src={`${data.modelImage[0]}?w=300&h=200&auto=format&fit=crop`}
                        alt={data.modelName}
                      />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <section id="car-brands" className="bg-black">
        <div className="container mx-auto py-[100px] px-[18px] flex flex-col items-center justify-center"></div>
      </section>
    </>
  );
};

export default About;

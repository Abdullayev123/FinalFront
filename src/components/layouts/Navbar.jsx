import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TextPlugin } from "gsap/TextPlugin";

const links = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/car-brands",
    name: "Car Brands",
  },
  {
    path: "/contact",
    name: "Contact",
  },
  {
    path: "/allcars",
    name: "All Cars",
  },
];

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Navbar = () => {
  const dragContainier = useRef();
  const tmln = useRef();
  const [isActive, setisActive] = useState(true);
  // const time = gsap.timeline();
  const [text, setText] = useState("");
  const handleClick = () => {
    setisActive(!isActive);
  };

  useGSAP(() => {
    gsap.set("#menu-link-item-holder", { y: 75 });
    tmln.current = gsap
      .timeline({
        paused: true,
      })
      .to("#hidden", {
        opacity: 0,
        duration: 0.2,
        ease: "power4.inOut",
      })
      .to("#menu-overlay", {
        duration: 1.25,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.inOut",
      })
      .to("#menu-link-item-holder", {
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: -0.7,
      });
    gsap
      .to(".marquee__part", {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "linear",
      })
      .totalProgress(0.5);

    gsap.set(".marquee__inner", { xPercent: -50 });
  });
  useEffect(() => {
    gsap.to("#change-text", {
      text: text,
      duration: 0.2,
      ease: "none",
    });
  }, [text]);
  useEffect(() => {
    if (!isActive) {
      tmln.current.play();
    } else {
      tmln.current.reverse();
    }
  }, [isActive]);

  return (
    <>
      <nav
        id="navigation-bar"
        className="absolute z-[999] top-0 left-0  w-full py-0 md:py-2 overflow-hidden"
      >
        <div className="flex justify-between w-full items-center md:items-start ">
          <div
            id="hidden"
            className={`logo flex  text-3xl font-medium items-center  text-white transition duration-300 h-auto w-[200px] md:w-[400px] md:h-[100px] origin-top-left  `}
          >
            <Link to={"/"}>
              <img
                className={`opacity-100 `}
                src="https://res.cloudinary.com/dlajjeqxv/image/upload/v1738598518/AG__2_-removebg-preview_1_jbblav.png"
                alt=""
              />
            </Link>
          </div>
          <div id="hidden" className="hidden lg:block">
            <div>
              <h1 className="text-white">
                <span>&#43;</span>
                Azerbaijan Gallery
              </h1>
              <h1 className="text-white text-end">By Abdullayev</h1>
            </div>
          </div>
          <div onClick={() => handleClick()}>
            <svg
              viewBox="0 0 100 100"
              width="80"
              className={`ham hamRotate ham4  w-14 transition-all duration-300 delay-300 ${
                isActive ? "stroke-[#f8f9fa]" : "active stroke-[#000]"
              }`}
            >
              <path
                className="line top"
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
              />
              <path className="line middle" d="m 70,50 h -40" />
              <path
                className="line bottom"
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col relative max-w-screen">
          <div
            id="menu-overlay"
            className={`fixed flex flex-col gap-[5vw] pt-[80px] md:pt-[100px] top-0 right-0 z-[-10] w-full h-screen transition-all duration-[50ms] backdrop-blur-xs  bg-[#fff] px-5  sm:flex-row  `}
            ref={dragContainier}
          >
            <div
              id="menu-links"
              className="flex flex-col  space-x-6  text-[#000] text-nowrap"
            >
              {links.map((link, index) => (
                <div id="menu-link" key={index}>
                  <div id="menu-link-item-holder" className="overflow-hidden ">
                    <span
                      id="menu-link-item"
                      className="text-[52px] sm:text-[4rem]  overflow-hidden hover:opacity-80 transition-all duration-300"
                    >
                      <Link
                        to={link.path}
                        id="menu-link"
                        className="leading-[85%] tracking-[-2px] "
                        onClick={() => setisActive(!isActive)}
                        onMouseEnter={() => setText(link.name)}
                        onMouseLeave={() => setText("")}
                      >
                        {link.name}
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <span
              id="change-text"
              className="   text-[52px] hidden sm:block sm:text-[6rem] text-[#000] hover:opacity-80 transition-all absolute right-20 top-[50%] translate-y-[-50%] duration-300 "
            >
              <h1>{text}</h1>
            </span>

            <div className="marquee__inner flex w-full absolute bottom-0 left-1/2">
              {Array.from({ length: 8 }).map((x, index) => (
                <div
                  className="marquee__part w-full text-2xl text-[#000] text-nowrap"
                  key={index}
                >
                  Drive innovation
                  <span className="mx-5">+</span>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

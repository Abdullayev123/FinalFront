import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useContext, useState } from "react";
import { LoadingContext } from "../context/LoadingProvider";

gsap.registerPlugin(ScrollTrigger);
const Loading = () => {
  const tl = gsap.timeline();
  const timeTwo = gsap.timeline();
  const [progress, setprogress] = useState(0);
  const { setLoading } = useContext(LoadingContext);

  useGSAP(() => {
    const tween = tl.to("#trig", {
      duration: 2.25,
      height: "100%",
      ease: "power1.inOut",
      onUpdate: () => {
        let myProgress = tween.progress().toFixed(1);
        setprogress(myProgress);
      },
    });
    timeTwo
      .to("#zeroToHundOverlay", {
        delay: 2.5,
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
      })
      .to("#loading", {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        ease: "power4.inOut",
        onComplete: () => setLoading(false),
      });
  });

  return (
    <>
      <div
        id="loading"
        className=" fixed  top-0 left-0 bg-white w-full h-screen overflow-hidden z-[9999] transition-all duration-[1.25s]"
      >
        <div id="myLoad" className="w-full h-screen overflow-hidden relative">
          <div
            id="trig"
            className=" bg-[#020a11] absolute bottom-0 left-0 h-0 w-2"
          ></div>
          <div
            id="zeroToHundOverlay"
            className=" absolute left-20 bottom-20 overflow-hidden  border-b-1 "
          >
            <h1
              id="zeroToHundOverlayItem"
              className="text-[#020a11] text-7xl md:text-[6rem] font-extrabold"
            >
              {progress * 100}%
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

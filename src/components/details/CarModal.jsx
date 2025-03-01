/* eslint-disable react/prop-types */
// components/CarModal.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useContext } from "react";
import { CursorContext } from "../context/CursorProvider";

const CarModal = ({ isOpen, setIsOpen, image, text }) => {
  const timeLine = useRef();
  const { setCursorsize } = useContext(CursorContext);

  useEffect(() => {
    timeLine.current = gsap
      .timeline({ paused: true })
      .to("#modal", 0.5, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to("#modal-text", 0.75, {
        y: 0,
        ease: "power4.inOut",
      })
      .to(
        "#modal-image",
        0.5,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%",
          ease: "power4.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    if (isOpen) {
      timeLine.current.play();
    } else {
      timeLine.current.reverse();
    }
  }, [isOpen]);

  return (
    <div
      id="modal"
      className="w-full h-screen bg-[#000] fixed z-[999] top-0 left-0 flex md:flex-row flex-col items-center justify-between transition-all pb-[150px] md:pb-[0] "
    >
      <div className="h-full">
        <div className="overflow-hidden">
          <div id="modal-text" className="h-full p-4">
            <p className="text-white text-[3rem]">({text})</p>
          </div>
        </div>
      </div>
      <div id="modal-image" className="transition-all duration-300 md:px-0">
        <img
          src={image}
          alt=""
          className="object-contain md:object-cover w-[1200px] h-[600px]"
        />
      </div>
      <button
        className="fixed bottom-10 left-[50%] translate-x-[-50%] text-[#dee2e6] text-4xl font-bold "
        onClick={() => setIsOpen(false)}
        id="modal-button"
        onMouseEnter={() =>
          setCursorsize({ cursorWidth: 80, cursorHeight: 80 })
        }
        onMouseLeave={() =>
          setCursorsize({ cursorWidth: 30, cursorHeight: 30 })
        }
      >
        Close
      </button>
    </div>
  );
};

export default CarModal;

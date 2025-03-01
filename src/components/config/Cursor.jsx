"use client";
import gsap, { Expo } from "gsap";
import { useContext, useRef } from "react";
import { useEffect } from "react";
import { CursorContext } from "../context/CursorProvider";

const Cursor = () => {
  const { cursorsize } = useContext(CursorContext);
  const cursor = useRef();
  const mouse = useRef({
    x: 0,
    y: 0,
  });
  const manageMouseMove = (event) => {
    const { clientX, clientY } = event;
    mouse.current = {
      x: clientX,
      y: clientY,
    };
    moveCursor(mouse.current.x, mouse.current.y);
  };
  const moveCursor = (x, y) => {
    gsap.to(cursor.current, {
      x,
      y,
      xPercent: -50,
      yPercent: -50,
      duration: 0.5,
      ease: Expo,
    });
  };
  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  });
  useEffect(() => {
    gsap.to(cursor.current, {
      width: `${cursorsize.cursorWidth}px`,
      height: `${cursorsize.cursorHeight}px`,
      duration: 0.4,
    });
  }, [cursorsize]);

  return (
    <>
      <div
        ref={cursor}
        className={`hidden lg:block w-[30px] h-[30px] fixed z-[999] rounded-full bg-white mix-blend-difference lg:pointer-events-none 
`}
      ></div>
    </>
  );
};

export default Cursor;

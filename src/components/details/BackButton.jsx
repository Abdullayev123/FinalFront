import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CursorContext } from "../context/CursorProvider";

const BackButton = () => {
  const navigate = useNavigate();
  const { setCursorsize } = useContext(CursorContext);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isHover) {
      gsap.to("#animated-icon", {
        rotate: -135,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to("#animated-icon", {
        rotate: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHover]);

  return (
    <button
      className="px-6 py-1 bg-white text-[#111] font-bold text-2xl flex items-center gap-3 cursor-pointer"
      onMouseEnter={() => {
        setCursorsize({ cursorWidth: 80, cursorHeight: 80 });
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
        setIsHover(false);
      }}
      onClick={() => {
        setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
        navigate(-1);
      }}
    >
      <MdOutlineArrowOutward id="animated-icon" className="rotate-0" />
      Back
    </button>
  );
};

export default BackButton;

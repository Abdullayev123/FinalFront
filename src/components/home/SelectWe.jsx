import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { CursorContext } from "../context/CursorProvider";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SelectWe = () => {
  const [data, setData] = useState([]);
  const { setCursorsize } = useContext(CursorContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        const data = await response.json();
        setData(data.sort(() => Math.random() - 0.5)); // Shuffle inline
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useGSAP(() => {
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
      <section
        id="selected-we"
        className="py-[100px] px-[18px] bg-white text-[#111] rounded-b-2xl"
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
                          <h1 className="mr-4">(00{index + 1})</h1>
                          <h1 className=" text-[#111]  text-md lg:text-2xl font-extralight mr-5">
                            {data.modelName}
                          </h1>
                          <div className="text-[#111]  text-md lg:text-2xl font-extralight">
                            ({data.brand})
                          </div>
                        </div>
                        <FaArrowLeft
                          id="arrow"
                          className="transition-all duration-500 group-hover:rotate-180"
                        />
                      </div>
                      <img
                        className="absolute right-10 -top-1/2 -translate-y-10 w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
    </>
  );
};

export default SelectWe;

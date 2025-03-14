import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const carBrands = [
  "BMW",
  "HYUNDAI",
  "KIA",
  "MERCEDES-BENZ",
  "PORSCHE",
  "BMW",
  "HYUNDAI",
  "KIA",
  "MERCEDES-BENZ",
  "PORSCHE",
];

const Marque = () => {
  useGSAP(() => {
    let marquee = gsap
      .to("#marquee-content", {
        xPercent: -128,
        repeat: -1,
        duration: 20, // Speed
        ease: "linear",
      })
      .totalProgress(0.5);
    gsap.set("#marque-content", {
      xPercent: -50,
    });

    // Smooth Pause
    document
      .getElementById("marquee-wrapper")
      .addEventListener("mouseenter", () => {
        gsap.to(marquee, { timeScale: 0, duration: 2 }); // Smooth slowdown
      });

    // Smooth Resume
    document
      .getElementById("marquee-wrapper")
      .addEventListener("mouseleave", () => {
        gsap.to(marquee, { timeScale: 1, duration: 2 }); // Smooth speed-up
      });
  });

  return (
    <>
      <section id="car-brands-marque" className="bg-[#111] overflow-hidden">
        <div
          id="marquee-wrapper"
          onMouseEnter={() => {}}
          className="mx-auto py-5 lg:py-[100px] px-[18px] whitespace-nowrap overflow-hidden relative"
        >
          <div
            id="marquee-content"
            className="flex text-white text-2xl lg:text-[4rem] font-bold"
          >
            {carBrands.map((brand, index) => (
              <Link to={`/allcars/${brand.toLowerCase()}`} key={index}>
                {brand}
                <span className="px-10">+</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Marque;

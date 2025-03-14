import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const InfoSection = () => {
  useGSAP(() => {
    gsap.to("#info-overlay", {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#info-section",
        start: "top center",
      },
    });
  });
  return (
    <>
      <section
        id="info-section"
        className="py-[100px] px-[18px] bg-white rounded-t-xl"
      >
        <div id="info-overlay" className="flex flex-col lg:flex-row opacity-0">
          <div className="w-full mb-14 lg:w-1/3 ">
            <h1 className="text-[24px] text-[#111]">(Info)</h1>
          </div>
          <div
            id="text"
            className="w-full lg:w-2/3 text-[#111] text-2xl md:text-3xl text-balance"
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
    </>
  );
};

export default InfoSection;

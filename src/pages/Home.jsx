import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import InfoSection from "../components/home/InfoSection";
import SelectWe from "../components/home/SelectWe";
import Marque from "../components/home/Marque";
import Hero from "../components/home/Hero";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const About = () => {
  return (
    <>
      <Hero />
      <InfoSection />
      <SelectWe />
      <Marque />
    </>
  );
};

export default About;

/* eslint-disable no-unused-vars */
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const Lenis = ({ children }) => {
  const lenisRef = useRef();
  const lenis = useLenis(({ scroll }) => {});

  return (
    <>
      <ReactLenis
        options={{
          wheelMultiplier: 0.4,
          touchMultiplier: 0.4,
        }}
        root
      >
        {children}
      </ReactLenis>
    </>
  );
};

export default Lenis;

import {
  EffectComposer,
  Bloom,
  LUT,
  Vignette,
} from "@react-three/postprocessing";
import { useLoader } from "@react-three/fiber";
import { LUTCubeLoader } from "postprocessing";

export function Effects() {
  const texture = useLoader(LUTCubeLoader, "./F-6800-STD (1).cube");

  return (
    <EffectComposer disableNormalPass>
      {/* Enhanced Bloom */}
      <Bloom
        luminanceThreshold={0.1} // Makes more objects glow
        luminanceSmoothing={1.2} // Softer transitions
        intensity={1} // Stronger glow
        radius={0.85} // Wider glow spread
        mipmapBlur
      />

      {/* Subtle Chromatic Aberration for realism */}

      {/* Add Vignette for a cinematic look */}
      <Vignette
        opacity={0.2} // Darker vignette
        blur={0.5} // Blurrier vignette
        darkness={0.7} // Darker vignette
      />

      {/* LUT Effect for color grading */}
      <LUT lut={texture} />
    </EffectComposer>
  );
}

"use client";
import { useScroll, useTransform } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";

export default function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.45", "end 0.95"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.92], [0.15, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.92], [0.12, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.92], [0.09, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.92], [0.06, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.92], [0.03, 1.2]);

  return (
    <div
      className="h-[150vh] bg-black w-full relative pt-14 pb-0 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        title="Every prompt is a legal boundary."
        description="80,000 counterfactual framing evaluations converging into one SHA-256 certificate."
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}

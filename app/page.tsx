// HomePage.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import PageLoader from "./components/PageLoader";
import MultiStepForm from "./components/MultiStepForm";
import PerlinNoiseSketch from "./components/PerlinNoise";
import { gsap } from "gsap";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  // Control the form visibility from the parent
  useEffect(() => {
    if (!loading) {
      // Hide the form container initially
      if (formRef.current) {
        gsap.set(formRef.current, { opacity: 0, y: 20 });

        // Animate it in with a slight delay to ensure loader is gone
        gsap.to(formRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [loading]);

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Perlin Noise Background */}
      <PerlinNoiseSketch />

      {/* Page Loader */}
      <PageLoader onLoadComplete={() => setLoading(false)} />

      {/* Form-only content - full width */}
      <main
        ref={formRef}
        className="w-full flex-grow form-container relative z-10"
        style={{ opacity: 0 }}
      >
        {/* Multi-step Form Section */}
        <div className="w-full h-full">{!loading && <MultiStepForm />}</div>
      </main>
    </div>
  );
};

export default HomePage;

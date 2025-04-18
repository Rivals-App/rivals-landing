"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface PageLoaderProps {
  onLoadComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onLoadComplete }) => {
  useEffect(() => {
    // Set initial state of logo to be invisible
    gsap.set(".loader-logo-image", { opacity: 0, scale: 0.5 });

    // Create a direct GSAP timeline for the loader
    const loaderTl = gsap.timeline({
      onComplete: () => {
        // Notify parent component when loading is complete
        onLoadComplete();
      },
    });

    // Animate the logo directly
    loaderTl.to(".loader-logo-image", {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Progress bar animation
    loaderTl.to(".loader-progress", {
      width: "100%",
      duration: 1.8,
      ease: "power2.inOut",
    });

    // Fade out the loader container
    loaderTl.to(".loader-container", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.8,
    });

    // Cleanup
    return () => {
      loaderTl.kill();
    };
  }, [onLoadComplete]);

  return (
    <div className="loader-container fixed inset-0 bg-[#101c2b] flex flex-col items-center justify-center z-50">
      <div className="mb-8">
        <Image
          width={100}
          height={100}
          src="/static/svgs/Asset-2.svg"
          alt="logo"
          className="loader-logo-image"
          style={{ opacity: 0 }}
          draggable={false}
        />
      </div>
      <div className="w-80 h-[0.1rem] bg-[#0F2841] rounded-full overflow-hidden">
        <div className="loader-progress h-full bg-[#0F2841] w-0"></div>
      </div>
    </div>
  );
};

export default PageLoader;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function DeviceTransition() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Handle scroll events
  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Calculate progress (0 to 1) with reduced scroll distance
      const progress = Math.min(Math.max(scrollY / (windowHeight * 0.4), 0), 1);
      setScrollProgress(progress);
    };

    // Initial call and event listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate styles for iPhone with animation that stops at full rotation
  const iphoneStyles = {
    opacity: Math.max(0, 1 - scrollProgress * 2), // Fade out at 50% scroll
    transform: `
      perspective(1200px)
      rotateY(${Math.min(scrollProgress * 360, 360)}deg) 
      scale(${1 - scrollProgress * 0.3})
    `,
    transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
  };

  // Calculate styles for MacBook with animation that stops at full rotation
  const macbookStyles = {
    opacity: Math.min(1, (scrollProgress - 0.4) * 2), // Start fading in at 40% scroll
    transform: `
      perspective(1200px)
      rotateY(${Math.min(360 + (scrollProgress - 0.5) * 180, 360)}deg)
      scale(${0.9 + scrollProgress * 0.2})
    `,
    transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
  };

  // Show loading state until mounted
  if (!isMounted) {
    return (
      <div className="w-full h-[550px] md:h-[600px] flex items-center justify-center">
        <div className="w-12 h-12 border-t-4 border-[#02F199] border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[550px] md:h-[600px] relative overflow-hidden">
      {/* Green glow effect */}
      <div className="absolute w-[300px] h-full right-0 mx-auto md:mx-0 bg-gradient-to-r from-[#02F199]/10 to-[#01E8F7]/10 rounded-lg opacity-40 blur-2xl transform scale-105"></div>

      {/* iPhone with spin animation that stops */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 transform-gpu"
        style={iphoneStyles}
      >
        <div className="relative w-[300px] h-[600px]">
          <Image
            src="/static/media/Iphone.png"
            alt="iPhone 15 Pro"
            fill
            sizes="300px"
            priority
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* MacBook with spin animation that stops */}
      <div
        className="absolute inset-0 flex items-center justify-center z-0 transform-gpu"
        style={macbookStyles}
      >
        <div className="relative w-[600px] h-[450px]">
          <Image
            src="/static/media/DesktopHomeMockup.png"
            alt="MacBook Pro"
            fill
            sizes="600px"
            priority
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

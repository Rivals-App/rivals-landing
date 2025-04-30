"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MaskedBackground from "../PerlinNoise";
import Image from "next/image";

interface WelcomeScreenProps {
  onProceed: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onProceed }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states - hide all elements
    gsap.set(".welcome-title, .welcome-subtitle, .form-logo", {
      opacity: 0,
      y: 20,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Initial delay before animations start
    tl.to({}, { duration: 0.5 });

    // Logo, title, and subtitle appear together
    tl.to([".form-logo", ".welcome-title", ".welcome-subtitle"], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      // Trigger button visibility and fade-in after a delay
      .add(() => {
        setShowButton(true);
        // Use a small delay to ensure smooth transition
        setTimeout(() => {
          setButtonOpacity(1);
        }, 100);
      }, "+=0.7");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Perlin Noise Background */}
      <div className="absolute inset-0 z-0">
        <MaskedBackground logoPath={"/static/svgs/logo.svg"} />
      </div>

      {/* Content Container */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        ref={containerRef}
      >
        <div className="text-center max-w-xl">
          <div className="flex justify-center mb-8">
            <Image
              draggable={false}
              width={80}
              height={80}
              src="/static/svgs/Asset-2.svg"
              alt="logo"
              className="form-logo"
            />
          </div>
          <h2 className="welcome-title uppercase text-5xl font-bold mb-2 text-center">
            The <span className="text-[#02F199]">future</span> of gaming is here
          </h2>
          <p className="welcome-subtitle text-white mb-4 text-center text-lg">
            Welcome to where winners compete
          </p>

          {/* Button container with fixed height to prevent layout shift */}
          <div className="flex justify-center mt-8 h-[52px]">
            {showButton && (
              <button
                onClick={onProceed}
                className="welcome-button px-6 py-2 bg-white/20 border border-white text-white font-semibold hover:scale-105 hover:bg-white/40 transition-all duration-300 flex items-center"
                style={{
                  opacity: buttonOpacity,
                  transition: "opacity 0.5s ease-in-out",
                  transitionDelay: "0.1s",
                }}
              >
                Enter
                <span className="ml-6">⮐</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

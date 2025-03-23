"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface WelcomeScreenProps {
  onProceed: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onProceed }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states - hide all elements
    gsap.set(".welcome-title, .welcome-subtitle, .form-logo, .welcome-button", {
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
      // Button appears last after a delay
      .to(
        ".welcome-button",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.7" // Add 0.7s delay
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      ref={containerRef}
    >
      <div className="flex justify-center mb-8">
        <img
          width={80}
          height={80}
          src="/static/svgs/Asset-2.svg"
          alt="logo"
          className="form-logo"
          draggable={false}
        />
      </div>
      <h2 className="welcome-title uppercase w-full text-5xl font-bold mb-2 text-center">
        The <span className="text-[#02F199]">future</span> of gaming is here
      </h2>
      <p className="welcome-subtitle text-white mb-4 text-center text-lg">
        Welcome to where winners compete
      </p>

      <div className="flex justify-center mt-8">
        <button
          onClick={onProceed}
          className="welcome-button px-6 py-2 bg-white/20 border border-white text-white font-semibold hover:scale-105 hover:bg-white/40 transition-all duration-200 flex items-center"
        >
          Enter
          <span className="ml-6">⮐</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

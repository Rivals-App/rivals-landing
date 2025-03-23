/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaArrowLeft } from "react-icons/fa";

interface ConfirmationScreenProps {
  onBack: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(".conf-title, .conf-subtitle, .conf-icon, .conf-back", {
      opacity: 0,
      y: 20,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.to(".conf-back", {
      opacity: 1,
      y: 0,
      duration: 0.4,
    })
      .to(".conf-title, .conf-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
      .to(
        ".conf-icon",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto relative" ref={containerRef}>
        {/* Back button */}
        <button
          onClick={onBack}
          className="conf-back absolute top-0 left-0 -mt-16 text-gray-400 hover:text-[#02F199] transition-colors z-50"
          aria-label="Go back"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Logo */}
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

        <h2 className="conf-title text-3xl font-bold mb-6 text-center">
          You're All Set!
        </h2>
        <p className="conf-subtitle text-gray-300 mb-8 text-center">
          Thanks for joining our waitlist. We'll notify you when we launch! In
          the meantime feel free to try our{" "}
          <a
            href="https://getrivals.com/authentication"
            target="_blank"
            className="text-[#02F199] border-b border-[#02F199]"
          >
            demo
          </a>
        </p>

        <div className="conf-icon w-24 h-24 rounded-full bg-[#02F199]/20 flex items-center justify-center mx-auto scale-0">
          <svg
            className="w-12 h-12 text-[#02F199]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;

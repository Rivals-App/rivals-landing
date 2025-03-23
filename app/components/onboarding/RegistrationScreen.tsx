"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface RegistrationScreenProps {
  email: string;
  onEmailChange: (email: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  email,
  onEmailChange,
  onContinue,
  onBack,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(".reg-title, .reg-subtitle, .reg-form, .reg-back", {
      opacity: 0,
      y: 20,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.to(".reg-back", {
      opacity: 1,
      y: 0,
      duration: 0.4,
    }).to(".reg-title, .reg-subtitle, .reg-form", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      onContinue();
    }
  };

  return (
    <div className="h-full w-full px-12 flex flex-col items-center justify-center">
      {" "}
      <div className="max-w-md w-full mx-auto relative" ref={containerRef}>
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

        <h2 className="reg-title text-3xl font-bold mb-6 text-center">
          Join the Waitlist
        </h2>
        <p className="reg-subtitle text-gray-300 mb-8 text-center">
          Be the first to know when we launch
        </p>

        <form onSubmit={handleSubmit} className="reg-form space-y-4">
          <div>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 bg-[#1E2A3B] border border-gray-700 rounded-lg focus:outline-none focus:border-[#02F199]"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-row justify-between align-bottom">
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-1/3 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              Go back
            </button>
            <button
              type="submit"
              className="reg-back w-2/3 ml-4 py-2 bg-[#02F199] text-[#0c412e] font-semibold rounded-lg hover:bg-[#02F199]/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationScreen;

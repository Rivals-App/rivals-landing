"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BirthdayScreenProps {
  birthday: string;
  onBirthdayChange: (birthday: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const BirthdayScreen: React.FC<BirthdayScreenProps> = ({
  birthday,
  onBirthdayChange,
  onContinue,
  onBack,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(".bday-title, .bday-subtitle, .bday-form, .bday-back", {
      opacity: 0,
      y: 20,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.to(".bday-back", {
      opacity: 1,
      y: 0,
      duration: 0.4,
    }).to(".bday-title, .bday-subtitle, .bday-form", {
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
    if (birthday) {
      onContinue();
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
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

        <h2 className="bday-title text-3xl font-bold mb-6 text-center">
          One More Step
        </h2>
        <p className="bday-subtitle text-gray-300 mb-8 text-center">
          Please enter your date of birth
        </p>

        <form onSubmit={handleSubmit} className="bday-form space-y-4">
          <div>
            <input
              type="date"
              className="w-full px-4 py-2 bg-[#1E2A3B] border border-gray-700 rounded-lg focus:outline-none focus:border-[#02F199]"
              value={birthday}
              onChange={(e) => onBirthdayChange(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-row justify-between align-bottom">
            <button
              onClick={onBack}
              aria-label="Go back"
              className="bday-back w-1/3 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              Go back
            </button>
            <button
              type="submit"
              className="w-2/3 ml-4 py-2 bg-[#02F199] text-[#0c412e] font-semibold rounded-lg hover:bg-[#02F199]/90 transition-colors"
            >
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BirthdayScreen;

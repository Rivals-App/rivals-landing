// components/onboarding/AboutSection.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowLeft } from "react-icons/fa";
import FeatureCards from "../FeatureCards"; // Adjust path as needed

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define your feature cards
const featureCardsData = [
  {
    id: "1",
    title: "Instant Matchmaking",
    description:
      "Find opponents at your skill level and start playing in seconds. No long waits, just pure gaming.",
    image: "/static/images/matchmaking.jpg", // Update these paths to your actual image locations
    isMain: false,
  },
  {
    id: "2",
    title: "Instant Payouts",
    description:
      "Win a match, get paid immediately. No waiting periods or complex withdrawal processes.",
    image: "/static/images/payouts.jpg",
    isMain: true,
  },
  {
    id: "3",
    title: "Fair Play Guarantee",
    description:
      "Advanced anti-cheat systems and skill-based matchmaking ensure every match is fair and competitive.",
    image: "/static/images/fair-play.jpg",
    isMain: false,
  },
];

interface AboutSectionProps {
  onContinue: () => void;
  onBack: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onContinue, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(
      ".about-title, .about-subtitle, .feature-cards, .about-cta, .about-back",
      {
        opacity: 0,
        y: 30,
      }
    );

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate elements sequentially
    tl.to(".about-back", {
      opacity: 1,
      y: 0,
      duration: 0.4,
    })
      .to(".about-title", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        ".about-subtitle",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        ".feature-cards",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        ".about-cta",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col" ref={containerRef}>
      {/* Back button */}
      <button
        onClick={onBack}
        className="about-back self-start mt-10 ml-10 text-gray-400 hover:text-[#02F199] transition-colors z-50"
        aria-label="Go back"
      >
        <FaArrowLeft size={20} />
      </button>

      <div className="flex-grow flex flex-col items-center justify-start px-4 py-8">
        <h2 className="about-title text-4xl font-bold mb-3 text-center">
          About <span className="text-[#02F199]">Rivals</span>
        </h2>
        <p className="about-subtitle text-gray-300 mb-16 text-center text-lg">
          The next generation platform for competitive gaming
        </p>

        {/* Feature Cards */}
        <div className="feature-cards w-full mb-16">
          <FeatureCards isMobileView={isMobileView} cards={featureCardsData} />
        </div>

        {/* Call to action - removed mt-auto and added fixed spacing */}
        <div className="about-cta flex flex-col items-center my-8">
          <p className="mb-4">Not a part of our waitlist yet?</p>
          <button
            onClick={onContinue}
            className="px-8 py-2 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200"
          >
            Join the Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

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
    title: "Compete for Real Rewards",
    description:
      "Challenge friends and rivals in skill-based matches with real stakes. Play your favorite competitive games and earn rewards for your victories.",
    image: "/static/imgs/Card2.png", // Update these paths to your actual image locations
    isMain: false,
  },
  {
    id: "2",
    title: "Team Based Tournaments",
    description:
      "Join tournaments or create custom challenges with flexible rules. Whether you're playing solo or with a squad, RIVALS is built for competitive gamers",
    image: "/static/imgs/Card5.png",
    isMain: false,
  },
  {
    id: "3",
    title: "Instant Score Validation & Payouts",
    description:
      "Our automated system tracks scores in real time. Win a match, get paid immediately. No waiting periods or complex withdrawal processes.",
    image: "/static/imgs/Card1.png",
    isMain: true,
  },
  
  {
    id: "4",
    title: "Custom Challenges & Matches",
    description:
      "Create personalized challenges with unique rules and stake amounts. Compete on your own terms!",
    image: "/static/imgs/Card4.png",
    isMain: false,
  },
  {
    id: "5",
    title: "Secure & Transparent Gaming",
    description:
      "Powered by advanced anti-cheat systems and real-time verification, RIVALS ensures a fair gaming environment.",
    image: "/static/imgs/Card3.png",
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

      <div className="flex-grow flex flex-col items-center justify-start pt-12 md:pt-0">
        {/* Call to Action Section */}
        <div className="cta-section w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-12 relative overflow-hidden">
          {/* Text Content */}
          <div className="text-content md:w-1/2 w-full text-center md:text-left px-6 sm:px-12 mt-12 md:mt-0">
            {/* Logo */}
            <img
              src="/static/imgs/asset 4@4x-8.png" 
              alt="RIVALS Logo"
              className="w-24 h-auto mx-auto md:mx-0 mb-6"
            />
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
              EXPERIENCE THE <span className="text-[#02F199]">FUTURE</span> OF GAMING
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Take your gaming to the next level with RIVALS. Compete in skill-based matches, win real rewards, and become part of the ultimate competitive gaming community.
            </p>
            <button
              onClick={onContinue}
              className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200"
            >
              JOIN WAITLIST
            </button>
          </div>

          {/* Image Content */}
          <div className="image-content md:w-1/2 w-full mt-8 md:mt-0 flex justify-end relative hidden md:flex">
            <img
              src="/static/imgs/hero.png"
              alt="Exciting esports action"
              className="w-[100%] md:w-[70%] max-w-none object-contain"
            />
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="feature-cards-wrapper w-full px-4 py-12 sm:pt-24">
          <h2 className="about-title text-3xl md:text-4xl font-bold mb-3 text-center">
            JOIN THE <span className="text-[#02F199]">COMPETITIVE</span> REVOLUTION
          </h2>
          <p className="about-subtitle text-gray-300 mb-16 text-center text-base md:text-lg">
            Compete in Matches and earn real rewards. RIVALS is the ultimate competitive gaming platform built for true gamers.
          </p>

          {/* Feature Cards */}
          <div className="feature-cards w-full">
            <FeatureCards isMobileView={isMobileView} cards={featureCardsData} />
          </div>
        </div>

        {/* How It Works Section */}
        <div className="how-it-works w-full py-8 px-6 md:px-[120px] sm:px-12 rounded-lg">
          <h2 className="about-title text-3xl md:text-4xl font-bold mb-4 text-center">
            HOW <span className="text-[#02F199]">RIVALS</span> WORKS
          </h2>
          <p className="about-subtitle text-gray-300 mb-8 md:mb-32 text-center text-base md:text-lg">
            RIVALS makes competitive gaming seamless and rewarding.
          </p>

          <div className="flex flex-col gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center text-center md:text-right">
              <img
                src="/static/imgs/howitworks1.png"
                alt="Choose Your Game & Mode"
                className="w-full md:w-[40%] h-auto mb-4 md:mb-0 md:ml-auto"
              />
              <div className="md:w-[60%] md:pl-8">
                <h4 className="text-2xl md:text-3xl font-semibold text-[#02F199] mb-4">
                  Choose Your Game & Mode
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Select from a variety of custom RIVALS games and supported games like DOTA 2.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center text-center md:text-left">
              <img
                src="/static/imgs/howitworks2.png"
                alt="Challenge & Stake"
                className="w-full md:w-[40%] h-auto mb-4 md:mb-0 md:mr-auto"
              />
              <div className="md:w-[60%] md:pr-8">
                <h4 className="text-2xl md:text-3xl font-semibold text-[#02F199] mb-4">
                  Challenge & Stake
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Enter a match with a set stake and challenge your friends or other RIVALS players.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center text-center md:text-right">
              <img
                src="/static/imgs/howitworks3.png"
                alt="Play & Win"
                className="w-full md:w-[40%] h-auto mb-4 md:mb-0 md:ml-auto"
              />
              <div className="md:w-[60%] md:pl-8">
                <h4 className="text-2xl md:text-3xl font-semibold text-[#02F199] mb-4">
                  Play & Win
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Compete in real-time matches with automated score validation and our own ranking system.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center text-center md:text-left">
              <img
                src="/static/imgs/howitworks4.png"
                alt="Get Paid Instantly"
                className="w-full md:w-[40%] h-auto mb-4 md:mb-0 md:mr-auto"
              />
              <div className="md:w-[60%] md:pr-8">
                <h4 className="text-2xl md:text-3xl font-semibold text-[#02F199] mb-4">
                  Get Paid Instantly
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Receive your winnings instantly with our secure payout system.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Compete in Tournaments Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-12 px-12 md:px-28 sm:px-12 my-12">
          {/* Text Content */}
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
               COMPETE IN <span className="text-[#02F199]">TOURNAMENTS</span>
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Take your skills to the next level with organized competitions.
              Join daily, weekly, and seasonal tournaments where you can compete against top players and squads. Earn bigger rewards, climb the leaderboards, and prove you're the best!
            </p>
            <ul className="text-gray-300 space-y-3 mb-6">
              <li><strong>Solo & Team Tournaments</strong> – Play in 1v1, 3v3, or 5v5 formats</li>
              <li><strong>Leaderboard Rankings</strong> – Track your progress and achievements</li>
              <li><strong>Exclusive Rewards</strong> – Win cash prizes, in-game items, and special perks</li>
            </ul>
          </div>
          {/* Image Content */}
          <div className="md:w-1/2 w-full mt-8 md:mt-0 flex justify-center md:justify-end">
            <img
              src="/static/imgs/tournaments.png" 
              alt="Compete in Rivals Tournaments"
              className="w-[100%] md:w-[80%] max-w-none object-contain"
            />
          </div>
        </div>
        {/* Call to Action Section */}
        <div className="cta-final w-full flex flex-col items-center justify-center py-12 px-6 rounded-lg mt-12">
          {/* Logo */}
          <img
            src="/static/imgs/asset 4@4x-8.png" 
            alt="RIVALS Logo"
            className="w-24 h-auto mb-6"
          />
          {/* Heading */}
          <h3 className="text-4xl font-bold text-white mb-6 text-center">
            JOIN <span className="text-[#02F199]">RIVALS NOW</span>
          </h3>
          {/* Button */}
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200"
          >
            JOIN WAITLIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

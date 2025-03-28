/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCards from "../FeatureCards";
import Navbar from "../Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featureCardsData = [
  {
    id: "1",
    title: "Compete for Real Rewards",
    description:
      "Challenge friends and rivals in skill-based matches with real stakes. Play your favorite competitive games and earn rewards for your victories.",
    image: "/static/media/Card2.png",
    isMain: false,
  },
  {
    id: "2",
    title: "Team Based Tournaments",
    description:
      "Join tournaments or create custom challenges with flexible rules. Whether you're playing solo or with a squad, RIVALS is built for competitive gamers",
    image: "/static/media/Card5.png",
    isMain: false,
  },
  {
    id: "3",
    title: "Instant Score Validation & Payouts",
    description:
      "Our automated system tracks scores in real time. Win a match, get paid immediately. No waiting periods or complex withdrawal processes.",
    image: "/static/media/Card1.png",
    isMain: true,
  },

  {
    id: "4",
    title: "Custom Challenges & Matches",
    description:
      "Create personalized challenges with unique rules and stake amounts. Compete on your own terms!",
    image: "/static/media/Card4.png",
    isMain: false,
  },
  {
    id: "5",
    title: "Secure & Transparent Gaming",
    description:
      "Powered by advanced anti-cheat systems and real-time verification, RIVALS ensures a fair gaming environment.",
    image: "/static/media/Card3.png",
    isMain: false,
  },
];

interface AboutSectionProps {
  onContinue: () => void;
  onBack: () => void;
  goToEmailStep?: () => void;
  goToBlogSection?: () => void; // Add this prop
}

const AboutSection: React.FC<AboutSectionProps> = ({
  onContinue,
  onBack,
  goToEmailStep,
  goToBlogSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const howItWorksSectionRef = useRef<HTMLDivElement>(null);
  const tournamentsSectionRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleWaitlistClick = () => {
    // If goToEmailStep is provided, use it; otherwise, fall back to onContinue
    if (goToEmailStep) {
      goToEmailStep();
    } else {
      onContinue();
    }
  };

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

    // Initial animations for the hero section
    gsap.set(".hero-text, .hero-image, .hero-button", {
      opacity: 0,
      y: 30,
    });

    // Create animation timeline for initial hero section
    const tl = gsap.timeline();

    // Animate hero elements sequentially
    tl.to(".hero-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    })
      .to(
        ".hero-image",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        ".hero-button",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

    // Set up scroll triggers for different sections after a slight delay to ensure DOM is ready
    const initScrollTriggers = () => {
      // Feature section scroll animations
      if (featureSectionRef.current) {
        gsap.from(".feature-title", {
          scrollTrigger: {
            trigger: featureSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".feature-subtitle", {
          scrollTrigger: {
            trigger: featureSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });

        // We target the container of the feature cards, not the cards themselves,
        // as the FeatureCards component might handle its own animations
        gsap.from(".feature-cards-container", {
          scrollTrigger: {
            trigger: ".feature-cards",
            start: "top 70%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      // How It Works section animations
      if (howItWorksSectionRef.current) {
        gsap.from(".hiw-title", {
          scrollTrigger: {
            trigger: howItWorksSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".hiw-subtitle", {
          scrollTrigger: {
            trigger: howItWorksSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });

        // Steps animations with staggered effect
        gsap.from(".hiw-step", {
          scrollTrigger: {
            trigger: ".hiw-steps",
            start: "top 70%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Tournaments section animations
      if (tournamentsSectionRef.current) {
        gsap.from(".tournament-text", {
          scrollTrigger: {
            trigger: tournamentsSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".tournament-image", {
          scrollTrigger: {
            trigger: tournamentsSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".tournament-list li", {
          scrollTrigger: {
            trigger: ".tournament-list",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: -20,
          stagger: 0.15,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      // Final CTA section animations
      if (finalCtaRef.current) {
        gsap.from(".cta-final > *", {
          scrollTrigger: {
            trigger: finalCtaRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.7,
          ease: "power3.out",
        });
      }
    };

    // Initialize scroll triggers with a slight delay
    const timeoutId = setTimeout(initScrollTriggers, 200);

    return () => {
      // Clean up all scroll triggers when component unmounts
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
  <div>
    <Navbar goToEmailStep={goToEmailStep} goToBlogSection={goToBlogSection} />
    <div className="w-full h-full flex flex-col" ref={containerRef}>
      <div className="flex-grow flex flex-col items-center justify-start pt-6 md:pt-0">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="cta-section w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-8 relative overflow-hidden"
        >
          {/* Text Content */}
          <div className="text-content md:w-1/2 w-full text-center md:text-left px-6 sm:px-12 mt-8 md:mt-0">
            {/* Logo */}
            <img
              src="/static/media/asset 4@4x-8.png"
              alt="RIVALS Logo"
              className="w-24 h-auto mx-auto md:mx-0 mb-6 hero-text"
            />
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight hero-text">
              EXPERIENCE THE <span className="text-[#02F199]">FUTURE</span> OF GAMING
            </h3>
            <p className="text-lg text-gray-300 mb-8 hero-text">
              Take your gaming to the next level with RIVALS. Compete in skill-based matches, win real rewards, and become part of the ultimate competitive gaming community.
            </p>
            <button
              onClick={handleWaitlistClick}
              className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button"
            >
              JOIN WAITLIST
            </button>
          </div>

          {/* Image Content */}
          <div className="image-content md:w-1/2 w-full mt-8 md:mt-0 flex justify-end relative hidden md:flex">
            <img
              src="/static/media/hero.png"
              alt="Exciting esports action"
              className="w-[100%] md:w-[70%] max-w-none object-contain hero-image"
            />
          </div>
        </div>
        {/* Feature Cards Section */}
        <div
          ref={featureSectionRef}
          className="feature-cards-wrapper w-full px-4 py-12 sm:pt-24"
        >
          <h2 className="feature-title text-3xl md:text-4xl font-bold mb-3 text-center">
            JOIN THE <span className="text-[#02F199]">COMPETITIVE</span>{" "}
            REVOLUTION
          </h2>
          <p className="feature-subtitle text-gray-300 mb-16 text-center text-base md:text-lg">
            Compete in Matches and earn real rewards. RIVALS is the ultimate
            competitive gaming platform built for true gamers.
          </p>

          {/* Feature Cards */}
          <div className="feature-cards w-full feature-cards-container">
            <FeatureCards
              isMobileView={isMobileView}
              cards={featureCardsData}
            />
          </div>
        </div>

        {/* How It Works Section */}
        <div
          ref={howItWorksSectionRef}
          className="how-it-works w-full py-8 px-6 md:px-[120px] sm:px-12 rounded-lg"
        >
          <h2 className="hiw-title text-3xl md:text-4xl font-bold mb-4 text-center">
            HOW <span className="text-[#02F199]">RIVALS</span> WORKS
          </h2>
          <p className="hiw-subtitle text-gray-300 mb-8 md:mb-32 text-center text-base md:text-lg">
            RIVALS makes competitive gaming seamless and rewarding.
          </p>

          <div className="how-steps flex flex-col gap-6 md:gap-8">
            {/* Step 1 */}
            <div className="how-step flex flex-col md:flex-row items-center text-center md:text-right">
              <img
                src="/static/media/howitworks1.png"
                alt="Choose Your Game & Mode"
                className="w-[80%] md:w-[30%] h-auto mb-4 md:mb-0 md:ml-auto"
              />
              <div className="md:w-[70%] md:pl-6">
                <h4 className="text-xl md:text-2xl font-semibold text-[#02F199] mb-3">
                  Choose Your Game & Mode
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Select from a variety of custom RIVALS games and supported games like DOTA 2.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="hiw-step flex flex-col md:flex-row-reverse items-center text-center md:text-left">
              <img
                src="/static/media/howitworks2.png"
                alt="Challenge & Stake"
                className="w-[80%] md:w-[30%] h-auto mb-4 md:mb-0 md:mr-auto"
              />
              <div className="md:w-[70%] md:pr-6">
                <h4 className="text-xl md:text-2xl font-semibold text-[#02F199] mb-3">
                  Challenge & Stake
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Enter a match with a set stake and challenge your friends or other RIVALS players.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="hiw-step flex flex-col md:flex-row items-center text-center md:text-right">
              <img
                src="/static/media/howitworks3.png"
                alt="Play & Win"
                className="w-[80%] md:w-[30%] h-auto mb-4 md:mb-0 md:ml-auto"
              />
              <div className="md:w-[70%] md:pl-6">
                <h4 className="text-xl md:text-2xl font-semibold text-[#02F199] mb-3">
                  Play & Win
                </h4>
                <p className="text-sm md:text-base text-gray-300">
                  Compete in real-time matches with automated score validation and our own ranking system.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="hiw-step flex flex-col md:flex-row-reverse items-center text-center md:text-left">
              <img
                src="/static/media/howitworks4.png"
                alt="Get Paid Instantly"
                className="w-[80%] md:w-[30%] h-auto mb-4 md:mb-0 md:mr-auto"
              />
              <div className="md:w-[70%] md:pr-6">
                <h4 className="text-xl md:text-2xl font-semibold text-[#02F199] mb-3">
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
        <div
          ref={tournamentsSectionRef}
          className="w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-12 px-12 md:px-28 sm:px-12 my-12"
        >
          {/* Text Content */}
          <div className="tournament-text md:w-1/2 w-full text-center md:text-left">
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
              COMPETE IN <span className="text-[#02F199]">TOURNAMENTS</span>
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Take your skills to the next level with organized competitions.
              Join daily, weekly, and seasonal tournaments where you can compete
              against top players and squads. Earn bigger rewards, climb the
              leaderboards, and prove you're the best!
            </p>
            <ul className="tournament-list text-gray-300 space-y-3 mb-6">
              <li>
                <strong>Solo & Team Tournaments</strong> – Play in 1v1, 3v3, or
                5v5 formats
              </li>
              <li>
                <strong>Leaderboard Rankings</strong> – Track your progress and
                achievements
              </li>
              <li>
                <strong>Exclusive Rewards</strong> – Win cash prizes, in-game
                items, and special perks
              </li>
            </ul>
          </div>
          {/* Image Content */}
          <div className="tournament-image md:w-1/2 w-full mt-8 md:mt-0 flex justify-center md:justify-end">
            <img
              src="/static/media/tournaments.png"
              alt="Compete in Rivals Tournaments"
              className="w-[100%] md:w-[80%] max-w-none object-contain"
            />
          </div>
        </div>

        {/* Call to Action Section */}
        <div
          ref={finalCtaRef}
          className="cta-final w-full flex flex-col items-center justify-center py-12 px-6 rounded-lg mt-12"
        >
          {/* Logo */}
          <img
            src="/static/media/asset 4@4x-8.png"
            alt="RIVALS Logo"
            className="w-24 h-auto mb-6"
          />
          {/* Heading */}
          <h3 className="text-4xl font-bold text-white mb-6 text-center">
            JOIN <span className="text-[#02F199]">RIVALS NOW</span>
          </h3>
          {/* Button */}
          <button
            onClick={handleWaitlistClick}
            className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200"
          >
            JOIN WAITLIST
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AboutSection;

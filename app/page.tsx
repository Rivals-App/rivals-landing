/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import PerlinNoiseSketch from "./components/PerlinNoise";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";
import { ReactTyped } from "react-typed";
import Image from "next/image";

// Register GSAP ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Feature cards data
const featureCardsData = [
  {
    id: "1",
    title: "Play for Real Stakes. Win Real Money.",
    description:
      "Join 1v1 matches or tournaments. Stake your entry, compete with rivals, and instantly cash out your winnings. No delays, no disputes.",
    image: "/static/media/Card2.png",
    isMain: false,
  },
  {
    id: "2",
    title: "Every Match, Verified Instantly.",
    description:
      "Our API-driven system locks in scores from your match the moment it ends. No screenshots, no arguments — just trusted, automated validation.",
    image: "/static/media/Card5.png",
    isMain: false,
  },
  {
    id: "3",
    title: "Compete in Games You Actually Play.",
    description:
      "From arcade-style quick matches to Dota 2 leagues, Rivals gives you the tools to game your way. Solo, with friends, or in full squads. It’s your battlefield.",
    image: "/static/media/Card1.png",
    isMain: true,
  },
  {
    id: "4",
    title: "Custom Challenges. Your Rules.",
    description:
      "Create personalised matchups with custom stakes, formats, and win conditions. Set the terms. Send the invites. Let the games begin.",
    image: "/static/media/Card4.png",
    isMain: false,
  },
  {
    id: "5",
    title: "XP-Based Ranking That Actually Matters.",
    description:
      "Earn XP and level up with every match. Our dynamic ladder puts your wins to work — unlocking events, opponents, and real-world rewards.",
    image: "/static/media/Card3.png",
    isMain: false,
  },
];

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const howItWorksSectionRef = useRef<HTMLDivElement>(null);
  const tournamentsSectionRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
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

    // Initial animations for the hero section
    gsap.set(".hero-text, .hero-image", {
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
    }).to(
      ".hero-image",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Set up scroll triggers for different sections
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
      // Clean all scroll triggers when component unmounts
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Perlin Noise Background */}
      <PerlinNoiseSketch />

      <div
        ref={containerRef}
        className="w-full h-full flex flex-col relative z-10"
      >
        <Navbar />

        <div className="flex-grow flex flex-col items-center justify-start pt-6 md:pt-0">
          {/* Hero Section */}
          <div
            ref={heroRef}
            className="cta-section w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-8 relative overflow-hidden"
          >
            {/* Text Content */}
            <div className="text-content md:w-1/2 w-full text-center md:text-left px-6 sm:px-12 mt-8 md:mt-0">
              {/* Logo */}
              <Image
                src="/static/media/Logo1.png"
                alt="RIVALS Logo"
                width={96}
                height={96}
                className="w-24 h-auto mx-auto md:mx-0 mb-6 hero-text"
              />
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight hero-text">
                EXPERIENCE THE <span className="text-[#02F199]">FUTURE</span> OF
                GAMING
              </h3>
              <p className="text-lg text-gray-300 mb-8 hero-text">
                Take your gaming to the next level with RIVALS. Compete in
                skill-based matches, win real rewards, and become part of the
                ultimate competitive gaming community.
              </p>
              <Link
                href="/join-us"
                className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block"
              >
                JOIN WAITLIST
              </Link>
            </div>

            {/* Image Content */}
            <div className="image-content md:w-1/2 w-full mt-8 md:mt-0 flex justify-end relative hidden md:flex">
              <Image
                src="/static/media/Hero.png"
                alt="Exciting esports action"
                width={700}
                height={700}
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
          {/* <div
            ref={howItWorksSectionRef}
            className="how-it-works w-full py-12 px-6 md:px-24 sm:px-12 rounded-lg"
          >
            <h2 className="hiw-title text-3xl md:text-5xl font-bold mb-4 text-center">
              HOW <span className="text-[#02F199]">RIVALS</span> WORKS
            </h2>
            <p className="hiw-subtitle text-gray-300 mb-10 md:mb-20 text-center text-base md:text-xl max-w-4xl mx-auto">
              RIVALS makes competitive gaming seamless and rewarding.
            </p>

            <div className="how-steps flex flex-col gap-8 md:gap-16 items-center">
             
              <div className="hiw-step flex flex-col md:flex-row items-center text-center md:text-right md:max-w-4xl w-full">
                <div className="relative w-[85%] md:w-[45%] mb-6 md:mb-0 md:ml-auto">
                  <img
                    src="/static/media/HowItWorks1.png"
                    alt="Choose Your Game & Mode"
                    className="w-full h-auto border-2 border-white/30 rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  />
                </div>
                <div className="md:w-[55%] md:pl-8">
                  <h4 className="text-xl md:text-3xl font-semibold text-[#02F199] mb-4">
                    Explore & Create Matches
                  </h4>
                  <p className="text-base md:text-lg text-gray-300">
                    Users browse the active market of matches or create their
                    own to compete.
                  </p>
                </div>
              </div>

             
              <div className="hiw-step flex flex-col md:flex-row-reverse items-center text-center md:text-left md:max-w-4xl w-full">
                <div className="relative w-[85%] md:w-[45%] mb-6 md:mb-0 md:mr-auto">
                  <img
                    src="/static/media/HowItWorks2.png"
                    alt="Challenge & Stake"
                    className="w-full h-auto border-2 border-white/30 rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  />
                </div>
                <div className="md:w-[55%] md:pr-8">
                  <h4 className="text-xl md:text-3xl font-semibold text-[#02F199] mb-4">
                    Challenge & Stake
                  </h4>
                  <p className="text-base md:text-lg text-gray-300">
                    Enter a match with a set stake and challenge your friends or
                    other RIVALS players.
                  </p>
                </div>
              </div>

            
              <div className="hiw-step flex flex-col md:flex-row items-center text-center md:text-right md:max-w-4xl w-full">
                <div className="relative w-[85%] md:w-[45%] mb-6 md:mb-0 md:ml-auto">
                  <img
                    src="/static/media/HowItWorks3.png"
                    alt="Play & Win"
                    className="w-full h-auto border-2 border-white/30 rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  />
                </div>
                <div className="md:w-[55%] md:pl-8">
                  <h4 className="text-xl md:text-3xl font-semibold text-[#02F199] mb-4">
                    Compete & Invite
                  </h4>
                  <p className="text-base md:text-lg text-gray-300">
                    Players join matches, compete against opponents, or can
                    invite friends. Live data integrations provides real-time
                    statistics.
                  </p>
                </div>
              </div>

            
              <div className="hiw-step flex flex-col md:flex-row-reverse items-center text-center md:text-left md:max-w-4xl w-full">
                <div className="relative w-[85%] md:w-[45%] mb-6 md:mb-0 md:mr-auto">
                  <img
                    src="/static/media/HowItWorks4.png"
                    alt="Get Paid Instantly"
                    className="w-full h-auto border-2 border-white/30 rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  />
                </div>
                <div className="md:w-[55%] md:pr-8">
                  <h4 className="text-xl md:text-3xl font-semibold text-[#02F199] mb-4">
                    Win & Instant Withdrawals
                  </h4>
                  <p className="text-base md:text-lg text-gray-300">
                    After winning, users are able to instantly withdraw funds
                    via traditional bank accounts or crypto wallets.
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Compete in Tournaments Section */}
          <div>
            <div
              ref={tournamentsSectionRef}
              className="w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-12 px-12 md:px-28 sm:px-12 my-12"
            >
              {/* Text Content */}
              <div className="tournament-text md:w-1/2 w-full text-center md:text-left">
                <h3 className="text-4xl font-bold text-white mb-2 leading-tight">
                  COMPETE IN
                </h3>
                <div className="text-[#02F199] text-4xl font-bold mb-6">
                  <ReactTyped
                    strings={["TOURNAMENTS", "LEAGUES", "SINGLE MATCHES"]}
                    typeSpeed={100}
                    backSpeed={50}
                    backDelay={1500}
                    loop
                  />
                </div>
                <p className="text-lg text-gray-300 mb-6">
                  Take your skills to the next level with organized competitions.
                  Join daily, weekly, and seasonal tournaments and matches where you can
                  compete against top players and squads. Earn bigger rewards,
                  climb the leaderboards, and prove you're the best!
                </p>
                <ul className="tournament-list text-gray-300 space-y-3 mb-6">
                  <li>
                    <strong>Single Matches</strong> – Go 1v1. Prove your skill. Win cash, XP, and bragging rights.
                  </li>
                  <li>
                    <strong>Tournaments</strong> – Squad up or go solo in daily and weekly tournaments. Win bigger, climb leaderboards, and dominate the bracket.
                  </li>
                  <li>
                    <strong>Leagues</strong> – Rise through divisions, unlock elite events, and earn rewards that matter. The grind pays off.
                  </li>
                </ul>
              </div>
              {/* Image Content */}
              <div className="tournament-image md:w-1/2 w-full mt-8 md:mt-0 flex justify-center md:justify-end">
                <Image
                  src="/static/media/Tournaments.png"
                  alt="Compete in Rivals Tournaments"
                  width={800}
                  height={800}
                  className="w-[100%] md:w-[80%] max-w-none object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

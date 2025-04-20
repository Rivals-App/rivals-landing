/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import PerlinNoiseSketch from "./components/PerlinNoise";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";
import Image from "next/image";
import AnimatedTextCycle from "./components/AnimatedTextCycle";
import JoinWaitlistButton from "./components/JoinWaitlistButton";

// Register GSAP ScrollTrigger and TextPlugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Game titles for static display
const popularGames = [
  "DOTA 2",
  "FC25",
  "Valorant",
  "Chess",
  "Connect 4",
  "Formula 1",
  "Fortnite",
];

// Add the feature cards data
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
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLHeadingElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const tournamentsSectionRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const words = [
    "FRIENDS",
    "RIVALS",
    "STRANGERS",
    "PROS",
    "TEAMMATES",
    "ANYONE",
  ];

  // Check if we're in the client-side environment and set initial states
  useEffect(() => {
    setIsClient(true);

    // Short delay to ensure DOM is fully ready before revealing content
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

  // Main animations setup - only run after page is loaded
  useEffect(() => {
    if (typeof window === "undefined" || !pageLoaded) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Set initial state for hero elements
    gsap.set(".hero-image, .hero-description, .hero-button", {
      opacity: 0,
      y: 30,
    });

    // Create animation timeline for initial hero section
    const tl = gsap.timeline();

    // Animate hero elements
    tl.to(".hero-description", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    })
      .to(
        ".hero-button",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        ".hero-image",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

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

    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, [pageLoaded]);

  // Static placeholders for pre-hydration
  const staticTitle = (
    <span
      className="text-5xl md:text-6xl inline-block min-w-[180px] mt-4 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #02F199, #00AFFF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      RIVALS
    </span>
  );

  const staticGameName = (
    <span
      className="inline-block font-bold text-left min-w-[100px]"
      style={{
        background: "linear-gradient(90deg, #00AFFF, #02F199)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      FC25
    </span>
  );

  return (
    <div
      className={`min-h-screen flex flex-col text-white transition-opacity duration-500 ${
        pageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background */}
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
            className="cta-section w-full flex flex-col md:flex-row items-start justify-between rounded-lg py-8 relative overflow-hidden"
          >
            {/* Text Content */}
            <div className="text-content md:w-1/2 w-full text-center px-6 sm:px-12 mb-10 md:mt-12">
              <h3
                ref={heroTitleRef}
                className="hero-title text-center md:text-left text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
              >
                WIN MONEY AGAINST <br />
                {isClient ? (
                  <AnimatedTextCycle
                    words={words}
                    className="text-5xl md:text-6xl inline-block min-w-[180px] mt-4 overflow-hidden"
                    style={{
                      background: "linear-gradient(90deg, #02F199, #00AFFF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    interval={1}
                    transitionDuration={0.25}
                  />
                ) : (
                  staticTitle
                )}
              </h3>

              <h4
                ref={heroSubtitleRef}
                className="hero-subtitle text-center md:text-left text-xl md:text-2xl font-semibold text-gray-200 mb-6"
              >
                on games like{" "}
                <span className="text-[#02F199]">
                  {isClient ? (
                    <AnimatedTextCycle
                      words={popularGames}
                      className="inline-block font-bold text-left min-w-[100px]"
                      style={{
                        background: "linear-gradient(90deg, #00AFFF, #02F199)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                      interval={1.1} 
                      transitionDuration={0.25}
                    />
                  ) : (
                    staticGameName
                  )}
                </span>
              </h4>

              <p className="hero-description text-center md:text-left text-md text-gray-300 mb-8">
                From arcade games to esports, Rivals turns every match into a
                market. Stake your match, beat real opponents, and get paid –
                instantly.
              </p>
              <JoinWaitlistButton className="mx-auto md:mx-0" />
            </div>

            {/* Image Content */}
            <div className="image-content md:w-1/2 w-full mt-8 md:mt-0 justify-end relative hidden md:flex">
              <Image
                src="/static/media/Hero.png"
                alt="Exciting esports action"
                width={700}
                height={700}
                className="w-[100%] md:w-[70%] max-w-none object-contain hero-image"
                priority={true}
              />
            </div>
          </div>

          {/* Stats Cards Section */}
          <FeatureCards cards={featureCardsData} isMobileView={isMobileView} />

          {/* Feature Section */}
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
          </div>

          {/* Compete in Tournaments Section */}
          <div
            ref={tournamentsSectionRef}
            className="w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-12 px-12 md:px-28 sm:px-12 my-12"
          >
            {/* Text Content */}
            <div className="tournament-text md:w-1/2 w-full text-center md:text-left">
              <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
                <span className="text-[#02F199]">
                  COMPETE & WIN IN YOUR FAVORITE GAMES
                </span>
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Take your skills to the next level with organized competitions.
                Join daily, weekly, and seasonal tournaments and matches where
                you can compete against top players and squads. Earn bigger
                rewards, climb the leaderboards, and prove you&apos;re the best!
              </p>
              <ul className="tournament-list text-gray-300 space-y-3 mb-6">
                <li>
                  <strong>Single Matches</strong> – Go 1v1. Prove your skill.
                  Win cash, XP, and bragging rights.
                </li>
                <li>
                  <strong>Tournaments</strong> – Squad up or go solo in daily
                  and weekly tournaments. Win bigger, climb leaderboards, and
                  dominate the bracket.
                </li>
                <li>
                  <strong>Leagues</strong> – Rise through divisions, unlock
                  elite events, and earn rewards that matter. The grind pays
                  off.
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
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

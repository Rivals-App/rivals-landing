/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import MaskedBackground from "./components/PerlinNoise";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import StatsCards from "./components/FeatureCards";
import Footer from "./components/Footer";
<<<<<<< HEAD
import { ReactTyped } from "react-typed";
=======
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
import Image from "next/image";

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
  "F1",
  "Fortnite",
];

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLHeadingElement>(null);
  const gameTextRef = useRef<HTMLSpanElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const tournamentsSectionRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentWord, setCurrentWord] = useState("RIVALS");

  const words = [
    "FRIENDS",
    "RIVALS",
    "STRANGERS",
    "PROS",
    "TEAMMATES",
    "ANYONE",
  ];

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

  // Synchronize animations for heroTitleRef and heroSubtitleRef
  useEffect(() => {
    if (!heroTitleRef.current || !gameTextRef.current) return;

    const titleSpan = heroTitleRef.current.querySelector("span");
    const subtitleSpan = gameTextRef.current;

    if (!titleSpan || !subtitleSpan) return;

    // Ensure initial visibility
    gsap.set([titleSpan, subtitleSpan], { opacity: 1, yPercent: 0 });

    let titleIndex = 0;
    let subtitleIndex = 0;

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    timeline.to({}, {
      duration: 3, // Show each word for 3 seconds
      onComplete: () => {
        // Update indices
        const nextTitleIndex = (titleIndex + 1) % words.length;
        const nextSubtitleIndex = (subtitleIndex + 1) % popularGames.length;

        // Animate out both spans
        gsap.to([titleSpan, subtitleSpan], {
          yPercent: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            // Update text content
            setCurrentWord(words[nextTitleIndex]);
            subtitleSpan.textContent = popularGames[nextSubtitleIndex];

            // Animate in both spans
            gsap.fromTo(
              [titleSpan, subtitleSpan],
              { yPercent: 20, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            );

            // Update indices
            titleIndex = nextTitleIndex;
            subtitleIndex = nextSubtitleIndex;
          },
        });
      },
    });

    return () => {
      timeline.kill();
    };
  }, [words, popularGames]);

  // Remove the typing animation logic
  useEffect(() => {
    if (!gameTextRef.current) return;

    // Set the initial text to the first game in the list
    gameTextRef.current.textContent = popularGames[0];
  }, [popularGames]);

  // Main animations setup
  useEffect(() => {
    if (typeof window === "undefined") return;

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
<<<<<<< HEAD
      // Clean all scroll triggers when component unmounts
      clearTimeout(timeoutId);
=======
      // Clean up
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Background */}
      <MaskedBackground
        logoPath="/static/svgs/logo.svg"
        primaryColor={[2, 241, 153]} // [#02F199] in RGB
      />

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
<<<<<<< HEAD
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
=======
            <div className="text-content md:w-1/2 w-full text-center md:text-left px-6 sm:px-12 mt-8 md:mt-12">
              <h3
                ref={heroTitleRef}
                className="hero-title text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
              >
                WIN MONEY AGAINST{" "}
                <span
                  className="text-6xl md:text-7xl inline-block min-w-[180px] overflow-hidden"
                  style={{
                    background: "linear-gradient(90deg, #02F199, #00AFFF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {currentWord}
                </span>
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
              </h3>

              <h4
                ref={heroSubtitleRef}
                className="hero-subtitle text-2xl md:text-3xl font-semibold text-gray-200 mb-6"
              >
                On games like{" "}
                <span className="text-[#02F199]">
                  <span
                    ref={gameTextRef}
                    className="inline-block min-w-[100px]"
                  >
                    {popularGames[0]}
                  </span>
                </span>
              </h4>

              <p className="hero-description text-lg text-gray-300 mb-8">
                Challenge players in your favorite games, stake your match, and
                cash out instantly. RIVALS is where real gamers compete. No
                luck, just skill.
              </p>
              <Link
                href="/join-us"
                className="hero-button px-8 py-3 bg-[#02F199] text-black font-thin rounded-full hover:scale-105 transition-all duration-200"
              >
                JOIN WAITLIST
              </Link>
            </div>

            {/* Image Content */}
<<<<<<< HEAD
            <div className="image-content md:w-1/2 w-full mt-8 md:mt-0 flex justify-end relative hidden md:flex">
=======
            <div className="image-content md:w-1/2 w-full mt-8 md:mt-0 justify-end relative hidden md:flex">
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
              <Image
                src="/static/media/Hero.png"
                alt="Exciting esports action"
                width={700}
                height={700}
                className="w-[100%] md:w-[70%] max-w-none object-contain hero-image"
              />
            </div>
          </div>

          {/* Stats Cards Section */}
          <StatsCards />

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
              />
            </div>
          </div>
<<<<<<< HEAD

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

=======
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

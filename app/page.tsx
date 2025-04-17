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
  const [showGames, setShowGames] = useState(false);

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
      // Clean up all scroll triggers when component unmounts
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
              <img
                src="/static/media/Logo1.png"
                alt="RIVALS Logo"
                className="w-24 h-auto mx-auto md:mx-0 mb-6 hero-text"
              />
      <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              WIN MONEY AGAINST:{" "}
              <span className="text-[#02F199]">
                <ReactTyped
                  strings={["FRIENDS", "FOES", "RIVALS"]}
                  typeSpeed={100}
                  backSpeed={50}
                  backDelay={1000}
                  loop={false}
                  onComplete={() => setShowGames(true)}
                />
              </span>
            </h3>

            {/* only show this once the first finishes */}
            {showGames && (
              <h4 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6">
                On games like:{" "}
                <span className="text-[#02F199]">
                  <ReactTyped
                    strings={[
                      "DOTA 2",
                      "TIC TAC TOE",
                      "LEAGUE OF LEGENDS",
                      "CONNECT 4",
                      "FC25",
                      "CS2",
                    ]}
                    typeSpeed={80}
                    backSpeed={40}
                    backDelay={1200}
                    loop={true}
                  />
                </span>
              </h4>
            )}

            <p className="text-lg text-gray-300 mb-8">
              Challenge players in your favorite games, stake your match, and cash out
              instantly. RIVALS is where real gamers compete. No luck, just skill.
            </p>
            <Link
              href="/join-us"
              className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200"
            >
              JOIN WAITLIST
            </Link>
          </div>

            {/* Image Content */}
            <div className="image-content md:w-1/2 w-full mt-8 md:mt-0 flex justify-end relative hidden md:flex">
              <img
                src="/static/media/Hero.png"
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

          
          {/* Compete in Tournaments Section */}
          <div>
            <div
              ref={tournamentsSectionRef}
              className="w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-12 px-12 md:px-28 sm:px-12 my-12"
            >
              {/* Text Content */}
              <div className="tournament-text md:w-1/2 w-full text-center md:text-left">
                <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
                  <span className="text-[#02F199]">
                    <ReactTyped
                      strings={[
                        "CHALLENGE YOUR FRIENDS IN FIFA FOR £10",
                        "STAKE XP ON A GAME OF DOTA 2",
                        "WIN CASH IN CHESS TOURNAMENTS",
                        "ENTER LEAGUE OF LEGENDS LEAGUES",
                        "COMPETE IN FC25 FOR REAL MONEY"
                      ]}
                      typeSpeed={70}
                      backSpeed={40}
                      backDelay={1500}
                      loop
                    />
                  </span>
                </h3>
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
                <img
                  src="/static/media/Tournaments.png"
                  alt="Compete in Rivals Tournaments"
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

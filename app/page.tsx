"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsCards from "./components/FeatureCards";
import Footer from "./components/Footer";
import Image from "next/image";
import { ReactTyped } from 'react-typed';
import ScrollHero from "./components/ScrollHero";
import GameCarousel from "./components/GameCarousel";

// Register GSAP ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const tournamentsSectionRef = useRef<HTMLDivElement>(null);

  // Main animations setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

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
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col text-white"
    >
      <div
        ref={containerRef}
        className="w-full h-full flex flex-col relative z-10"
      >
        <Navbar />

        {/* Scroll Hero Section */}
        <ScrollHero />

        {/* Game Carousel Section */}
        <GameCarousel />

        {/* Stats Cards Section */}
        <StatsCards />
        
        {/* Feature Section */}
        <div
          ref={featureSectionRef}
          className="feature-cards-wrapper w-full px-4 py-12 sm:pt-24"
        >
          <h2 className="feature-title text-3xl md:text-4xl font-bold mb-3 text-center">
            JOIN THE <span className="gradient-text">COMPETITIVE</span>{" "}
            REVOLUTION
          </h2>
          <p className="feature-subtitle text-gray-300 mb-16 text-center text-base md:text-lg">
            Compete in Matches and earn real rewards. RIVALS is the ultimate
            competitive gaming platform built for true gamers.
          </p>
        </div>

        {/* Tournament Section */}
        <div
          ref={tournamentsSectionRef}
          className="w-full flex flex-col md:flex-row items-center justify-between rounded-lg py-12 px-12 md:px-28 sm:px-12 my-12"
        >
          <div className="tournament-text md:w-1/2 w-full text-center md:text-left">
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
              <span className="gradient-text">
                <ReactTyped
                  strings={[
                    "CHALLENGE FRIENDS IN FIFA FOR £10",
                    "STAKE XP ON A GAME OF DOTA",
                    "WIN CASH IN CHESS TOURNAMENTS",
                    "COMPETE IN LEAGUE OF LEGENDS"
                  ]}
                  typeSpeed={70}
                  backSpeed={50}
                  backDelay={1500}
                  loop
                  className="inline-block"
                />
              </span>
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Take your skills to the next level with organized competitions.
              Join daily, weekly, and seasonal tournaments and matches where you can
              compete against top players and squads. Earn bigger rewards,
              climb the leaderboards, and prove you&apos;re the best!
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
      <Footer />
    </div>
  );
};

export default HomePage;

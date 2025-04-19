"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsCards from "./components/FeatureCards";
import Footer from "./components/Footer";
import Image from "next/image";
import { ReactTyped } from 'react-typed';

// Register GSAP ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const tournamentsSectionRef = useRef<HTMLDivElement>(null);
  const textCycleRef = useRef<HTMLDivElement>(null);
  
  // Text cycling state for opponents
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const oppositionTexts = ['FRIENDS', 'RIVALS', 'STRANGERS', 'PROS', 'ANYONE'];

  // Effect for text cycling with fade transition
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      if (textCycleRef.current) {
        // Fade out current text
        gsap.to(textCycleRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Update text index
            setCurrentTextIndex(prevIndex => 
              prevIndex >= oppositionTexts.length - 1 ? 0 : prevIndex + 1
            );
            // Fade in new text
            gsap.to(textCycleRef.current, {
              opacity: 1,
              duration: 0.5
            });
          }
        });
      }
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(cycleInterval);
  }, [oppositionTexts.length]);

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
      // Clean up
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col text-white"
      style={{ backgroundColor: '#0F2841' }} // Force background color inline
    >
      <div
        ref={containerRef}
        className="w-full h-full flex flex-col relative z-10"
      >
        <Navbar />

        <div className="flex-grow flex flex-col items-center justify-start pt-6 md:pt-0">
          {/* Hero Section - Updated with fade and typewriter effects */}
          <div
            ref={heroRef}
            className="cta-section w-full flex flex-col md:flex-row items-start justify-between rounded-lg py-16 relative overflow-hidden"
          >
            {/* Text Content */}
            <div className="text-content md:w-1/2 w-full text-center md:text-left px-6 sm:px-12 mt-8 md:mt-12">
              <div className="hero-title text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                <div className="mb-2">WIN MONEY AGAINST</div>
                
                {/* Fading text for opponents */}
                <div className="h-16 md:h-24 flex items-center justify-center md:justify-start">
                  <div 
                    ref={textCycleRef}
                    className="text-6xl md:text-7xl gradient-text"
                    style={{ 
                      minWidth: '180px',
                      display: 'inline-block'
                    }}
                  >
                    {oppositionTexts[currentTextIndex]}
                  </div>
                </div>
                
                {/* Typewriter for games */}
                <div className="text-2xl md:text-3xl font-semibold text-gray-200 mt-2">
                  ON GAMES LIKE{" "}
                  <span className="gradient-text inline-block" style={{ minWidth: '120px' }}>
                    <ReactTyped
                      strings={['DOTA 2', 'FC25', 'VALORANT', 'CONNECT 4', 'CS2']}
                      typeSpeed={70}
                      backSpeed={50}
                      backDelay={1500}
                      loop
                    />
                  </span>
                </div>
              </div>

              <p className="hero-description text-lg text-gray-300 mb-8">
                Challenge players in your favorite games, stake your match, and
                cash out instantly. RIVALS is where real gamers compete. No
                luck, just skill.
              </p>
              <Link
                href="/join-us"
                className="hero-button px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200"
              >
                JOIN WAITLIST
              </Link>
            </div>

            {/* Image Content */}
            <div className="image-content md:w-1/2 w-full mt-8 md:mt-0 justify-end relative hidden md:flex">
              <Image
                src="/static/media/Hero.png"
                alt="Exciting esports action"
                width={600}  /* Reduced from 700 */
                height={600} /* Reduced from 700 */
                className="w-[90%] md:w-[70%] max-w-none object-contain hero-image" /* Reduced from 100%/80% */
              />
            </div>
          </div>

          {/* Rest of the content - unchanged */}
          <StatsCards />
          
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
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

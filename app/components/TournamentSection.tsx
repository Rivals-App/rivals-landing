/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TournamentSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    // Make sure the section is fully visible first with optimization hints
    gsap.set(sectionRef.current, {
      autoAlpha: 1,
      clearProps: "transform",
      willChange: "opacity, transform" // Hint to browser for optimization
    });

    // Use optimized animations for better performance
    const textAnimation = gsap.from(".tournament-text", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%", // Trigger earlier
        end: "bottom 20%", // End when bottom of section reaches 20% of viewport
        toggleActions: "play complete none none", // Complete the animation instead of reversing
        once: true, // Only play once
        fastScrollEnd: true, // Optimize for fast scrolling
      },
      opacity: 0,
      x: -20, // Less extreme movement
      duration: 0.6,
      ease: "power2.out",
      willChange: "opacity, transform", // Hint to browser for optimization
      force3D: true, // Better GPU acceleration
      onComplete: () => {
        // Clean up properties after animation completes for better performance
        gsap.set(".tournament-text", { clearProps: "willChange" });
      }
    });

    const imageAnimation = gsap.from(".tournament-image", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play complete none none",
        once: true,
        fastScrollEnd: true, // Optimize for fast scrolling
      },
      opacity: 0,
      x: 20,
      duration: 0.6,
      ease: "power2.out",
      willChange: "opacity, transform", // Hint to browser for optimization
      force3D: true, // Better GPU acceleration
      onComplete: () => {
        // Clean up properties after animation completes for better performance
        gsap.set(".tournament-image", { clearProps: "willChange" });
      }
    });

    const listAnimation = gsap.from(".tournament-list li", {
      scrollTrigger: {
        trigger: ".tournament-list",
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play complete none none",
        once: true,
        fastScrollEnd: true, // Optimize for fast scrolling
      },
      opacity: 0,
      y: 10, // Use vertical animation instead of horizontal
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out",
      willChange: "opacity, transform", // Hint to browser for optimization
      force3D: true, // Better GPU acceleration
      onComplete: () => {
        // Clean up properties after animation completes
        gsap.set(".tournament-list li", { clearProps: "willChange" });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === sectionRef.current ||
          trigger.vars.trigger === ".tournament-list"
        ) {
          trigger.kill();
        }
      });
      textAnimation.kill();
      imageAnimation.kill();
      listAnimation.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="tournament-section w-full px-4 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          GAMING <span className="gradient-text">TOURNAMENTS</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="tournament-text md:w-1/2 w-full text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight whitespace-nowrap overflow-hidden">
              <span className="text-[#02F199]">
                <ReactTyped
                  strings={[
                    "PLAY FRIENDS IN EAFC FOR £10",
                    "STAKE XP ON A GAME OF DOTA",
                    "WIN CASH IN ARCADE GAMES",
                    "COMPETE IN CS2 TOURNAMENTS",
                  ]}
                  typeSpeed={70}
                  backSpeed={50}
                  backDelay={1500}
                  loop
                  className="inline-block"
                />
              </span>
            </h3>

            <p className="text-lg text-gray-300 mb-8">
              Take your skills to the next level with organized competitions.
              Join daily, weekly, and seasonal tournaments and matches where you
              can compete against top players and squads. Earn bigger rewards,
              climb the leaderboards, and prove you're the best!
            </p>

            <ul className="tournament-list text-gray-300 space-y-4 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-[#02F199] to-[#01E8F7] flex items-center justify-center mt-1 mr-3">
                  <span className="text-black text-xs font-bold">1</span>
                </div>
                <div>
                  <strong>Single Matches</strong> – Go 1v1. Prove your skill.
                  Win cash, XP, and bragging rights.
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-[#02F199] to-[#01E8F7] flex items-center justify-center mt-1 mr-3">
                  <span className="text-black text-xs font-bold">2</span>
                </div>
                <div>
                  <strong>Tournaments</strong> – Squad up or go solo in daily
                  and weekly tournaments. Win bigger, climb leaderboards, and
                  dominate the bracket.
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-[#02F199] to-[#01E8F7] flex items-center justify-center mt-1 mr-3">
                  <span className="text-black text-xs font-bold">3</span>
                </div>
                <div>
                  <strong>Leagues</strong> – Rise through divisions, unlock
                  elite events, and earn rewards that matter. The grind pays
                  off.
                </div>
              </li>
            </ul>
          </div>

          <div className="tournament-image md:w-1/2 w-full mt-8 md:mt-0 flex justify-center md:justify-end relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#02F199]/30 to-[#01E8F7]/30 opacity-50 blur-xl"></div>
            <Image
              src="/static/media/Tournaments.png"
              alt="Compete in Rivals Tournaments"
              width={800}
              height={800}
              className="w-[100%] md:w-[90%] max-w-none object-contain relative z-10"
              priority
              draggable={false}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          bg-[linear-gradient(135deg,_#02F199_0%,_#30E3CA_50%,_#01E8F7_100%)]
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tournament-section {
          position: relative;
          opacity: 1 !important; /* Force visibility */
          visibility: visible !important; /* Force visibility */

          transform: none !important; /* Prevent transform issues */
        }

        .tournament-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #02f199,
            #01e8f7,
            transparent
          );
        }

        .tournament-section::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #01e8f7,
            #02f199,
            transparent
          );
        }

        /* Force visibility of child elements */
        .tournament-text,
        .tournament-image,
        .tournament-list,
        .tournament-list li {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
        }
      `}</style>
    </div>
  );
};

export default TournamentSection;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";
import ScrollHero from "./components/ScrollHero";
import GameCarousel from "./components/GameCarousel";
import TournamentSection from "./components/TournamentSection";
import Image from "next/image";
import JoinWaitlistButton from "./components/JoinWaitlistButton";
import ScrollImage from "./components/ScrollImage";

// Register ScrollTrigger plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);

  // Set page as loaded after initial render with a slightly longer delay
  useEffect(() => {
    // Use a longer timeout to ensure DOM is fully ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Increased from 100ms to 300ms

    return () => clearTimeout(timer);
  }, []);

  // Initialize animations after page is loaded
  useEffect(() => {
    if (
      !isLoaded ||
      !containerRef.current ||
      typeof window === "undefined" ||
      !isHeroImageLoaded
    )
      return;

    // Create a timeline for better control and cleanup
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        force3D: true, // Enable hardware acceleration for all animations
      },
    });

    // Create a context to keep animations scoped to component
    const ctx = gsap.context(() => {
      // Add animations to the timeline instead of creating separate tweens
      tl.from(".hero-heading", {
        opacity: 0,
        y: 30,
        duration: 1,
      })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          "-=0.7"
        ) // Overlap with previous animation
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 20,
            duration: 1,
          },
          "-=0.7"
        )
        .from(
          ".hero-image-container",
          {
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
          },
          "-=0.9"
        );
    }, containerRef);

    // Cleanup function
    return () => {
      // Kill timeline and clear context
      tl.kill();
      ctx.revert();

      // Only kill ScrollTrigger instances that belong to this component
      // This prevents issues with child components that may have their own ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => {
        // Check if the trigger is related to elements in this component
        if (
          containerRef.current &&
          containerRef.current.contains(trigger.trigger as Node)
        ) {
          trigger.kill();
        }
      });
    };
  }, [isLoaded, isHeroImageLoaded]);

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Add grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          height: "100vh",
          width: "100vw",
          background: `linear-gradient(
            90deg,
            rgba(255,255,255,0.1) 1px,
            transparent 1px 45px
          )
          50% 50% / 45px 45px,
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px 45px)
          50% 50% / 45px 45px`,
          mask: "linear-gradient(-20deg, transparent 50%, black)",
          zIndex: 0,
        }}
      ></div>

      <div ref={containerRef} className="w-full flex flex-col relative z-10">
        <Navbar />

        {/* Hero Section with new heading */}
        <div className="mt-[150px] w-full px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between md:gap-20">
              {/* Hero Text - pulled more to the left with more space */}
              <div className="w-full md:w-3/5 lg:w-3/4 text-center md:text-left md:pr-0">
                <h1 className="hero-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  <span className="block whitespace-nowrap">
                    TURN YOUR GAMING SKILLS
                  </span>
                  <span className="block">
                    INTO <span
                      className="
                        bg-[linear-gradient(135deg,_#02F199_0%,_#30E3CA_50%,_#01E8F7_100%)]
                        bg-clip-text
                        text-transparent
                      "
                      >
                      REAL REWARDS
                    </span>
                  </span>
                </h1>
                <h2 className="hero-subheading text-2xl md:text-3xl text-white mt-6 mb-8 tracking-wide">
                  <span className="font-bold">Stake.</span>{" "}
                  <span className="font-bold">Play.</span>{" "}
                  <span className="font-bold text-[#02F199]">Win.</span>
                </h2>
                <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <JoinWaitlistButton className="px-8 py-3" />
                  <a
                    href="about-rivals"
                    className="px-8 py-3 border border-white/30 text-white font-semibold rounded-full hover:border-[#02F199] hover:text-[#02F199] transition-all"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Hero Image - made even narrower */}
              <div className="hero-image-container w-full md:w-2/5 lg:w-1/4 relative flex justify-center md:justify-end mt-12 md:mt-0">
                {/* Fixed glow effect that follows the image */}
                <div className="absolute w-[300px] h-[600px] right-0 mx-auto md:mx-0 bg-gradient-to-r from-[#02F199]/10 to-[#01E8F7]/10 rounded-lg opacity-40 blur-2xl transform scale-105"></div>
                {/* <Image
                  draggable={false}
                  src="/static/media/DesktopHome.png"
                  alt="Rivals Gaming Platform"
                  width={600}
                  height={900}
                  priority // Only set priority on this main hero image
                  onLoad={() => setIsHeroImageLoaded(true)} // Track when hero image loads
                  className="relative z-10 w-auto h-auto max-h-[600px]"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[200px]">
          <ScrollImage 
            images={[
              "/static/media/Home - Matchmaking.png",
              "/static/media/Home - Opponent Found(Both users ready).png",
              "/static/media/Home - Opponent Found(Post Game).png",
            ]}
            onSequenceComplete={() => {
              // Optionally scroll to the next section when sequence completes
              // Or trigger some animation
            }}
          />
        </div>

        {/* Child components - these should manage their own animations */}
        <div className="pt-[200px]">
          <ScrollHero />
        </div>
        <div className="pt-8">
          <GameCarousel />
        </div>
        <div className="pt-8">
          <FeatureCards />
        </div>
        <div className="pt-8">
          <TournamentSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

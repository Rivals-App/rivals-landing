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

// Register GSAP ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set page as loaded after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Initialize animations after page is loaded
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;
    
    // Create a context to keep animations scoped to component
    const ctx = gsap.context(() => {
      // Animate hero elements
      gsap.from(".hero-heading", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2
      });
      
      gsap.from(".hero-subheading", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.7
      });

      gsap.from(".hero-image-container", {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        delay: 0.3
      });
      
      // Avoid using ScrollTrigger in the main page if components have their own triggers
    }, containerRef);
    
    // Cleanup function
    return () => {
      ctx.revert(); // This properly cleans up all animations
    };
  }, [isLoaded]);

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Add grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          height: '100vh',
          width: '100vw',
          background: `linear-gradient(
            90deg,
            rgba(255,255,255,0.1) 1px,
            transparent 1px 45px
          )
          50% 50% / 45px 45px,
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px 45px)
          50% 50% / 45px 45px`,
          mask: 'linear-gradient(-20deg, transparent 50%, black)',
          zIndex: 0
        }}
      ></div>
      
      <div
        ref={containerRef}
        className="w-full flex flex-col relative z-10"
      >
        <Navbar />

        {/* Hero Section with new heading */}
        <div className="w-full px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between md:gap-20">
              {/* Hero Text - pulled more to the left with more space */}
              <div className="w-full md:w-3/5 lg:w-3/4 text-center md:text-left md:pr-0">
                <h1 className="hero-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  <span className="block whitespace-nowrap">TURN YOUR GAMING SKILLS</span>
                  <span className="block">INTO <span className="text-[#02F199]">REAL REWARDS</span></span>
                </h1>
                <h2 className="hero-subheading text-2xl md:text-3xl text-white mt-6 mb-8 tracking-wide">
                  <span className="font-bold">Stake.</span> <span className="font-bold">Play.</span> <span className="font-bold text-[#02F199]">Win.</span>
                </h2>
                <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a
                    href="join-us"
                    className="px-8 py-3 bg-[#02F199] text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    Join Waitlist
                  </a>
                  <a
                    href="about-rivals"
                    className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:border-[#02F199] hover:text-[#02F199] transition-all"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              
              {/* Hero Image - made even narrower */}
              <div className="hero-image-container w-full md:w-2/5 lg:w-1/4 relative flex justify-center md:justify-end mt-12 md:mt-0">
                {/* Fixed glow effect that follows the image */}
                <div className="absolute w-[300px] h-[600px] right-0 mx-auto md:mx-0 bg-gradient-to-r from-[#02F199]/10 to-[#01E8F7]/10 rounded-lg opacity-40 blur-2xl transform scale-105"></div>
                <Image
                  src="/static/media/Iphone.png"
                  alt="Rivals Gaming Platform"
                  width={300}
                  height={600}
                  className="relative z-10 w-auto h-auto max-h-[600px]"
                  priority
                />
              </div>
            </div>
          </div>
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

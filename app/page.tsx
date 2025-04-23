"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";
import ScrollHero from "./components/ScrollHero";
import GameCarousel from "./components/GameCarousel";
import TournamentSection from "./components/TournamentSection";

// Register GSAP ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Clear any existing ScrollTriggers when component mounts/unmounts
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white">
      <div
        ref={containerRef}
        className="w-full h-full flex flex-col relative z-10"
      >
        <Navbar />

        {/* Scroll Hero Section */}
        <ScrollHero />

        {/* Game Carousel Section */}
        <GameCarousel />

        {/* Feature Cards Section */}
        <FeatureCards />
        
        {/* Tournament Section */}
        <TournamentSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

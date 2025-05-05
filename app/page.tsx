/* eslint-disable @typescript-eslint/no-unused-vars */
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
import JoinWaitlistButton from "./components/JoinWaitlistButton";
import ScrollImage from "./components/ScrollImage";
// import DeviceTransition from "./components/DeviceTransition";

// Register ScrollTrigger plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const deviceTransitionRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [deviceAnimationComplete, setDeviceAnimationComplete] = useState(false);

  // Force scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);

    // Apply a temporary body style to prevent scroll during load
    document.body.style.overflow = "hidden";

    // Remove the style after a short delay
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Initial setup - set loading after small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setIsHeroImageLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Ensure content visibility after hero image is loaded
  useEffect(() => {
    if (isHeroImageLoaded) {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        setContentVisible(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isHeroImageLoaded]);

  // Listen for the device animation complete event
  useEffect(() => {
    const transitionElement = deviceTransitionRef.current;

    if (!transitionElement) return;

    const handleAnimationComplete = () => {
      setDeviceAnimationComplete(true);
      // Optionally trigger any actions needed after animation completes
    };

    transitionElement.addEventListener(
      "animationComplete",
      handleAnimationComplete
    );

    return () => {
      transitionElement.removeEventListener(
        "animationComplete",
        handleAnimationComplete
      );
    };
  }, [isLoaded]);

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
      ScrollTrigger.getAll().forEach((trigger) => {
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
      {/* Page loading overlay */}
      {!contentVisible && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-[#02F199] border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Add grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          height: "100vh",
          width: "100%",
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

      <div
        ref={containerRef}
        className={`w-full flex flex-col relative z-10 transition-opacity duration-500 ${
          contentVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />

        {/* Hero Section with new heading */}
        <div className="mt-6 md:mt-[100px] w-full px-4 md:px-8 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between md:gap-20 md:-mt-20">
              {/* Hero Text - now below in mobile, but still left in desktop */}
              <div className="w-full md:-mt-48 md:w-3/5 lg:w-3/4 text-center md:text-left md:pr-0">
                <h1 className="hero-heading text-[2.6rem] md:text-5xl font-bold text-white leading-tight tracking-tight">
                  <span className="block">TURN YOUR GAMING SKILLS</span>
                  <span className="block">
                    INTO{" "}
                    <span
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
                <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center sm:items-stretch">
                  <JoinWaitlistButton className="px-8 py-3" />
                  <a
                    href="about-rivals"
                    className="px-4 text-md py-3 border border-white/30 text-white/60 font-normal rounded-full hover:border-[#02F199] hover:text-[#02F199] transition-all"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Hero Image - now above in mobile, but still right in desktop */}
              {/* <div
                className="hero-image-container w-full md:w-2/5 lg:w-2/4 relative flex justify-center md:justify-end"
                style={{ transform: "translateY(-32px)" }}
              >
                <div
                  className="w-full h-[550px] md:h-[600px]"
                  ref={deviceTransitionRef}
                >
                  <DeviceTransition />
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Child components - only render when main content is visible */}
        {contentVisible && (
          <>
            <div className="pt-[60px]">
              <ScrollHero />
            </div>
            <div className="pt-2">
              <GameCarousel />
            </div>
            <div className="pt-6">
              <FeatureCards />
            </div>
            <div className="pt-6 md:pt-[70px]">
              <ScrollImage
                images={[
                  "/static/media/HowItWorks1.png",
                  "/static/media/HowItWorks2.png",
                  "/static/media/HowItWorks3.png",
                  "/static/media/HowItWorks4.png",
                ]}
                onSequenceComplete={() => {
                  // Optionally scroll to the next section when sequence completes
                  // Or trigger some animation
                }}
              />
            </div>
            <div className="pt-6">
              <TournamentSection />
            </div>
          </>
        )}
      </div>

      {contentVisible && <Footer />}
    </div>
  );
};

export default HomePage;

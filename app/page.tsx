/* eslint-disable @typescript-eslint/no-explicit-any */
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
import HowItWorks from "./components/HowItWorksSection";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionContainerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [deviceAnimationComplete, setDeviceAnimationComplete] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const [transitionProgress, setTransitionProgress] = useState(0);
  const touchStartYRef = useRef<number | null>(null);
  const lastTransitionProgressRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const targetProgressRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  const animateTransition = () => {
    const ease = 0.2;
    const currentProgress = lastTransitionProgressRef.current;
    const targetProgress = targetProgressRef.current;

    const delta = targetProgress - currentProgress;

    const completionFactor =
      1 - Math.max(0, Math.min(1, (currentProgress - 0.8) * 5));
    velocityRef.current = velocityRef.current * 0.6 + delta * 0.4;

    const appliedVelocity = velocityRef.current * completionFactor;

    const newProgress = currentProgress + appliedVelocity * ease;

    if (currentProgress >= 0.99 && targetProgress >= currentProgress) {
      lastTransitionProgressRef.current = 1.0;
      velocityRef.current = 0;
    } else {
      lastTransitionProgressRef.current = Math.max(0, Math.min(1, newProgress));
    }

    setTransitionProgress(lastTransitionProgressRef.current);

    if (lastTransitionProgressRef.current >= 0.99 && !deviceAnimationComplete) {
      // Immediately hide the scroll indicator before completing the animation
      setShowScrollIndicator(false);

      setDeviceAnimationComplete(true);

      const event = new CustomEvent("animationComplete", {
        bubbles: true,
        detail: { timestamp: Date.now() },
      });
      transitionContainerRef.current?.dispatchEvent(event);

      // Force immediate content visibility
      if (mainContentRef.current) {
        mainContentRef.current.style.opacity = "1";
      }

      // Unlock scrolling immediately
      document.body.style.overflow = "";
      document.body.style.height = "";

      // Small delay before attempting to scroll
      setTimeout(() => {
        window.scrollTo({ top: 1, behavior: "auto" });
      }, 10);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    } else if (deviceAnimationComplete) {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    } else {
      animationFrameIdRef.current = requestAnimationFrame(animateTransition);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (deviceAnimationComplete) return;

    const baseSpeedFactor = 0.04;
    const speedMultiplier = window.innerWidth <= 768 ? 1.5 : 1;
    const speedFactor = baseSpeedFactor * speedMultiplier;

    const scrollAmount = e.deltaY;
    const direction = Math.sign(scrollAmount);

    const atEnd = lastTransitionProgressRef.current >= 0.99;
    if (atEnd && direction > 0) {
      // Immediately hide scroll indicator on approaching end
      setShowScrollIndicator(false);

      targetProgressRef.current = 1;
      velocityRef.current = 0;

      if (!deviceAnimationComplete) {
        setDeviceAnimationComplete(true);

        // Force immediate content visibility
        if (mainContentRef.current) {
          mainContentRef.current.style.opacity = "1";
        }

        document.body.style.overflow = "";
        document.body.style.height = "";
      }
      return;
    }

    const magnitude = Math.min(Math.abs(scrollAmount), 120);
    const adjustedDelta = (direction * magnitude) / 40;

    targetProgressRef.current = Math.min(
      1,
      Math.max(0, targetProgressRef.current + adjustedDelta * speedFactor)
    );

    if (!animationFrameIdRef.current && !deviceAnimationComplete) {
      animationFrameIdRef.current = requestAnimationFrame(animateTransition);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (touchStartYRef.current === null) return;

    const touchY = e.touches[0].clientY;
    const touchDelta = touchStartYRef.current - touchY;

    touchStartYRef.current = touchY;

    const isMobile = window.innerWidth <= 768;
    const touchMultiplier = isMobile ? 0.003 : 0.002;

    const direction = Math.sign(touchDelta);
    const magnitude = Math.min(Math.abs(touchDelta), 40);
    const adjustedDelta =
      direction * (Math.log(magnitude + 1) / Math.log(5)) * 1.2;

    targetProgressRef.current = Math.min(
      1,
      Math.max(0, targetProgressRef.current + adjustedDelta * touchMultiplier)
    );

    if (!animationFrameIdRef.current && !deviceAnimationComplete) {
      animationFrameIdRef.current = requestAnimationFrame(animateTransition);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartYRef.current === null) return;

    const momentum = {
      direction: Math.sign(
        targetProgressRef.current - lastTransitionProgressRef.current
      ),
      magnitude:
        Math.abs(
          targetProgressRef.current - lastTransitionProgressRef.current
        ) * 20,
    };

    touchStartYRef.current = null;

    if (!deviceAnimationComplete) {
      if (targetProgressRef.current > 0.8) {
        // Hide scroll indicator when nearing completion point
        setShowScrollIndicator(false);
        targetProgressRef.current = 1;
      } else if (momentum.magnitude > 0.01) {
        const momentumBoost = Math.min(0.2, momentum.magnitude);
        targetProgressRef.current = Math.min(
          1,
          Math.max(
            0,
            targetProgressRef.current + momentum.direction * momentumBoost
          )
        );
      }
    }

    if (!animationFrameIdRef.current && !deviceAnimationComplete) {
      animationFrameIdRef.current = requestAnimationFrame(animateTransition);
    }
  };

  useEffect(() => {
    if (!deviceAnimationComplete && contentVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";

      if (transitionContainerRef.current) {
        transitionContainerRef.current.style.transform = "translateZ(0)";
        (transitionContainerRef.current.style as any).backfaceVisibility =
          "hidden";
      }

      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });

      const preloadImages = () => {
        const imageUrls = [
          "/static/media/Iphone.png",
          "/static/media/DesktopHomeMockup.png",
        ];

        imageUrls.forEach((url) => {
          const img = new window.Image();
          img.src = url;
        });
      };

      preloadImages();

      if (!animationFrameIdRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(animateTransition);
      }

      // Shorter timeout for force unlock - 5 seconds instead of 8
      const forceUnlockTimeout = setTimeout(() => {
        if (!deviceAnimationComplete) {
          setShowScrollIndicator(false);
          setDeviceAnimationComplete(true);

          // Force immediate content visibility
          if (mainContentRef.current) {
            mainContentRef.current.style.opacity = "1";
          }

          document.body.style.overflow = "";
          document.body.style.height = "";
        }
      }, 5000);

      return () => {
        clearTimeout(forceUnlockTimeout);
        document.body.style.overflow = "";
        document.body.style.height = "";
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);

        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      };
    }
    return () => {};
  }, [deviceAnimationComplete, contentVisible]);

  useEffect(() => {
    window.scrollTo(0, 0);

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setIsHeroImageLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHeroImageLoaded) {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        setContentVisible(true);
      }, 100);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [isHeroImageLoaded]);

  useEffect(() => {
    if (
      !isLoaded ||
      !containerRef.current ||
      typeof window === "undefined" ||
      !isHeroImageLoaded
    )
      return;

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        force3D: true,
      },
    });

    const ctx = gsap.context(() => {
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
        )
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

      gsap.set(".device-iphone", {
        transformOrigin: "center center",
        transformPerspective: 1200,
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      });

      gsap.set(".device-macbook", {
        transformOrigin: "center center",
        transformPerspective: 1200,
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      });
    }, containerRef);

    return () => {
      tl.kill();
      ctx.revert();

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

  const typeSafeStyles = {
    iPhone: {
      opacity: Math.min(1, Math.max(0, 1 - transitionProgress * 1.8)),
      transform: `
        perspective(1200px)
        ${
          transitionProgress > 0
            ? `rotateY(${Math.min(180, transitionProgress * 180)}deg)`
            : ""
        }
        scale(${1 - transitionProgress * 0.2})
        translateZ(0)
      `,
      transition: "opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)",
      willChange: "transform, opacity",
    } as React.CSSProperties,

    macBook: {
      opacity: Math.min(1, Math.max(0, (transitionProgress - 0.4) * 2.5)),
      transform: `
        perspective(1200px)
        rotateY(${Math.max(0, (transitionProgress - 0.5) * -20)}deg)
        scale(${0.9 + transitionProgress * 0.15})
        translateZ(0)
      `,
      transition: "opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)",
      willChange: "transform, opacity",
    } as React.CSSProperties,
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      {!contentVisible && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-[#02F199] border-solid rounded-full animate-spin"></div>
        </div>
      )}

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

        <div className="mt-6 md:mt-[100px] px-3 w-full md:px-16 py-8 md:py-12">
          <div className="max-w-8xl mx-auto">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between md:gap-20 md:-mt-20">
              <div className="w-full md:-mt-48 md:w-4/5 lg:w-full text-center md:text-left md:pr-0">
                {/* Larger heading text */}
                <h1 className="hero-heading text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-bold text-white leading-tight tracking-tight">
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

                {/* Larger subheading */}
                <h2 className="hero-subheading text-3xl md:text-5xl lg:text-6xl text-white mt-8 mb-10 tracking-wide">
                  <span className="font-bold">Stake.</span>{" "}
                  <span className="font-bold">Play.</span>{" "}
                  <span className="font-bold text-[#02F199]">Win.</span>
                </h2>

                {/* Larger buttons */}
                <div className="hero-cta flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center sm:items-stretch">
                  <JoinWaitlistButton className="px-10 py-4 text-lg" />
                  <a
                    href="about-rivals"
                    className="px-6 text-lg py-4 border border-white/30 text-white/60 font-normal rounded-full hover:border-[#02F199] hover:text-[#02F199] transition-all"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Right side - Image container with increased size */}
              <div
                ref={transitionContainerRef}
                className="hero-image-container w-full md:w-2/5 lg:w-1/2 relative hidden md:flex justify-center md:justify-end"
                style={{ transform: "translateY(-32px)" }}
              >
                <div className="w-full h-[600px] md:h-[650px] lg:h-[700px] relative overflow-hidden">
                  {/* iPhone device with larger dimensions */}
                  <div
                    className="device-iphone absolute inset-0 flex items-center justify-center z-10 transform-gpu"
                    style={typeSafeStyles.iPhone}
                  >
                    <div className="relative w-[240px] h-[480px] md:w-[300px] md:h-[600px]">
                      <Image
                        src="/static/media/Iphone.png"
                        alt="iPhone 15 Pro"
                        fill
                        sizes="(max-width: 768px) 240px, 300px"
                        priority
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>

                  {/* MacBook device with larger dimensions */}
                  <div
                    className="device-macbook absolute inset-0 flex items-center justify-center z-0 transform-gpu"
                    style={typeSafeStyles.macBook}
                  >
                    <div className="relative w-[800px] h-[600px] md:w-[900px] md:h-[675px] lg:w-[1000px] lg:h-[750px]">
                      <Image
                        src="/static/media/DesktopHomeMockup.png"
                        alt="MacBook Pro"
                        fill
                        sizes="(max-width: 768px) 800px, (max-width: 1024px) 900px, 1000px"
                        priority
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={mainContentRef}
          className={`transition-opacity duration-300 ${
            deviceAnimationComplete ? "opacity-100" : "opacity-0"
          }`}
        >
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
                <HowItWorks />
                {/* <ScrollImage
                  images={[
                    "/static/media/HowItWorks1.png",
                    "/static/media/HowItWorks2.png",
                    "/static/media/HowItWorks3.png",
                    "/static/media/HowItWorks4.png",
                  ]}
                  onSequenceComplete={() => {}}
                /> */}
              </div>
              <div className="pt-6">
                <TournamentSection />
              </div>
            </>
          )}
        </div>
      </div>

      {contentVisible && <Footer />}
    </div>
  );
};

export default HomePage;

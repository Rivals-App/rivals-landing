/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// List of game images and their titles
const GAMES = [
  { src: "/static/games/CS2.png", title: "CS2" },
  { src: "/static/games/Valorant.png", title: "Valorant" },
  { src: "/static/games/Lol.jpg", title: "League of Legends" },
  { src: "/static/games/Dota2.jpg", title: "Dota 2" },
  { src: "/static/games/Fortnite.jpg", title: "Fortnite" },
  { src: "/static/games/Apex.jpg", title: "Apex Legends" },
  { src: "/static/games/Fifa.jpeg", title: "FIFA" },
  { src: "/static/games/Rocket.jpg", title: "Rocket League" },
];

// Fallback to CS2 for any missing images
const getImageWithFallback = (src: string) => {
  return src || "/static/games/CS2.png";
};

const GameCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Create duplicated array for seamless looping - but initially don't triple them
  const visibleGames = isVisible ? [...GAMES, ...GAMES, ...GAMES] : [...GAMES];

  // Add visibility detection with Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Setup animation only after component is visible and images are loaded
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !marqueeRef.current ||
      !isVisible ||
      !imagesLoaded
    )
      return;

    const cardWidth = 300; // Same as carousel-box width
    const cardGap = 40; // Gap between cards
    const totalWidth = GAMES.length * (cardWidth + cardGap);

    // Set initial position with optimization hints
    gsap.set(marqueeRef.current, {
      x: 0,
      willChange: "transform", // Hint to browser for optimization
    });

    // Create the infinite marquee animation with performance optimizations
    const marqueeAnimation = gsap.to(marqueeRef.current, {
      x: -totalWidth,
      duration: 40, // Slower animation for smoother movement
      ease: "none", // Linear movement
      repeat: -1, // Infinite repeat
      overwrite: "auto", // Prevent conflicting animations
      force3D: true, // Better GPU acceleration
      onRepeat: () => {
        // Reset position to create seamless loop
        gsap.set(marqueeRef.current, { x: 0 });
      },
    });

    // Set up ScrollTrigger to control speed based on scroll with optimizations
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      invalidateOnRefresh: true, // Better handling of window resizing
      fastScrollEnd: true, // Optimize for fast scrolling
      onUpdate: (self) => {
        // Adjust speed based on scroll direction
        const speed = self.direction === 1 ? 1.2 : 0.7;
        marqueeAnimation.timeScale(speed);
      },
    });

    // Pause animation on hover (optional)
    const handleMouseEnter = () => marqueeAnimation.pause();
    const handleMouseLeave = () => marqueeAnimation.play();

    if (marqueeRef.current) {
      marqueeRef.current.addEventListener("mouseenter", handleMouseEnter);
      marqueeRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (marqueeRef.current) {
        marqueeRef.current.removeEventListener("mouseenter", handleMouseEnter);
        marqueeRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      marqueeAnimation.kill();
      scrollTriggerInstance.kill();
    };
  }, [isVisible, imagesLoaded]);

  // Set images loaded state
  useEffect(() => {
    // Wait a moment to ensure initial images have loaded
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="game-carousel-container"
      style={{ visibility: imagesLoaded ? "visible" : "hidden" }} // Hide until images are loaded
    >
      <div className="carousel-inner">
        <h2 className="carousel-title">PLAY YOUR FAVOURITE GAMES</h2>

        <div className="carousel-overflow">
          <div ref={marqueeRef} className="carousel-track">
            {visibleGames.map((game, i) => (
              <div key={`${game.title}-${i}`} className="carousel-box">
                <div className="image-container">
                  <Image
                    src={getImageWithFallback(game.src)}
                    alt={game.title}
                    fill
                    sizes="300px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "100%",
                      height: "100%",
                    }}
                    draggable={false}
                    // Only prioritize the first 4 visible images
                    priority={i < 4 && visibleGames.length === GAMES.length}
                    // Use eager loading only for first few images
                    loading={i < 4 ? "eager" : "lazy"}
                    // Add blur placeholder for smoother loading
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                  />
                </div>
                <div className="carousel-overlay">
                  <span className="carousel-label">{game.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-carousel-container {
          position: relative;
          width: 100%;
          background-color: #000;
          padding: 4rem 0;
          overflow: hidden;
          opacity: ${imagesLoaded ? 1 : 0};
          transition: opacity 0.3s ease-in-out;
        }

        .carousel-inner {
          max-width: 100%;
          margin: 0 auto;
        }

        .carousel-title {
          text-align: center;
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 3rem;
          color: white;

          @media (min-width: 768px) {
            font-size: 5rem;
          }
        }

        .carousel-overflow {
          overflow: hidden;
          width: 100%;
        }

        .carousel-track {
          display: flex;
          gap: 40px; /* Consistent gap between items */
          padding: 2rem 0;
          will-change: transform; /* Hint to browser for optimization */
          backface-visibility: hidden; /* Reduce visual artifacts during animation */
          transform: translateZ(0); /* Force GPU acceleration */
        }

        .carousel-box {
          width: 300px; /* Fixed width */
          height: 300px; /* Fixed height */
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, opacity 0.3s;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          will-change: transform;
          flex-shrink: 0; /* Prevent shrinking */
          background-color: #181818; /* Background color for images with transparent areas */
          backface-visibility: hidden; /* Reduce visual artifacts during animation */
          transform: translateZ(0); /* Force GPU acceleration */
          position: relative;
        }

        .carousel-box:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .image-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .carousel-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          display: flex;
          align-items: flex-end;
          height: 50%;
          z-index: 2;
        }

        .carousel-label {
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default GameCarousel;

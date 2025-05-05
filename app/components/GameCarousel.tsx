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
const TOP_ROW_GAMES = [
  { src: "/static/games/CS2.png", title: "CS2" },
  { src: "/static/games/Valorant.png", title: "Valorant" },
  { src: "/static/games/Lol.jpg", title: "League of Legends" },
  { src: "/static/games/Dota2.jpg", title: "Dota 2" },
];

const BOTTOM_ROW_GAMES = [
  { src: "/static/games/Fortnite.jpg", title: "Fortnite" },
  { src: "/static/games/Apex.jpg", title: "Apex Legends" },
  { src: "/static/games/Fifa.jpeg", title: "FIFA" },
  { src: "/static/games/Rocket.jpg", title: "Rocket League" }, //SUBJECT TO CHANGE, For now just using the other half of the games. - Kamsi 
];

// Fallback to CS2 for any missing images
const getImageWithFallback = (src: string) => {
  return src || "/static/games/CS2.png";
};

// Add a helper function to check game availability
const isGameAvailable = (title: string) => title === "Dota 2";

const GameCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Create duplicated arrays for seamless looping
  const visibleTopGames = isVisible
    ? [...TOP_ROW_GAMES, ...TOP_ROW_GAMES, ...TOP_ROW_GAMES]
    : [...TOP_ROW_GAMES];
  const visibleBottomGames = isVisible
    ? [...BOTTOM_ROW_GAMES, ...BOTTOM_ROW_GAMES, ...BOTTOM_ROW_GAMES]
    : [...BOTTOM_ROW_GAMES];

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
      !topRowRef.current ||
      !bottomRowRef.current ||
      !isVisible ||
      !imagesLoaded
    )
      return;

    // Get metrics for animation
    const cardWidth = 200; // Smaller card width
    const cardGap = 20; // Smaller gap between cards
    const topRowWidth = TOP_ROW_GAMES.length * (cardWidth + cardGap);
    const bottomRowWidth = BOTTOM_ROW_GAMES.length * (cardWidth + cardGap);

    // Clear any existing animations
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.id && trigger.vars.id.includes("gameCarousel")) {
        trigger.kill();
      }
    });

    // Set initial positions with optimization hints
    gsap.set(topRowRef.current, {
      x: 0,
      willChange: "transform", // Hint to browser for optimization
    });
    gsap.set(bottomRowRef.current, {
      x: -bottomRowWidth / 2, // Start the bottom row offset for visual interest
      willChange: "transform",
    });

    // Create scroll-driven animations for top row
    const topRowAnim = gsap.timeline({
      scrollTrigger: {
        id: "gameCarouselTopRow",
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5, // Smooth scrolling effect with less delay
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      },
    });

    // Create scroll-driven animations for bottom row
    const bottomRowAnim = gsap.timeline({
      scrollTrigger: {
        id: "gameCarouselBottomRow",
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5, // Smooth scrolling effect with less delay
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      },
    });

    // Add the animations to each row based on scroll
    // Top row moves from 0 to -totalWidth (right to left)
    topRowAnim.fromTo(
      topRowRef.current,
      { x: 0 },
      {
        x: -topRowWidth / 2,
        ease: "none",
        force3D: true,
      }
    );

    // Bottom row moves from -totalWidth/2 to totalWidth/4 (left to right)
    bottomRowAnim.fromTo(
      bottomRowRef.current,
      { x: -bottomRowWidth / 2 },
      {
        x: -bottomRowWidth / 4,
        ease: "none",
        force3D: true,
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id && trigger.vars.id.includes("gameCarousel")) {
          trigger.kill();
        }
      });

      topRowAnim.kill();
      bottomRowAnim.kill();
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
      style={{ visibility: imagesLoaded ? "visible" : "hidden" }}
    >
      <div className="carousel-inner">
        <h2 className="carousel-title">PLAY YOUR FAVOURITE GAMES</h2>

        {/* Top row - moves left to right */}
        <div className="carousel-row">
          <div ref={topRowRef} className="carousel-track">
            {visibleTopGames.map((game, i) => (
              <div
                key={`top-${game.title}-${i}`}
                className={`carousel-box ${!isGameAvailable(game.title) ? "game-unavailable" : ""}`}
                onClick={() => {
                  if (!isGameAvailable(game.title)) {
                    window.location.href = "/join-us";
                  }
                }}
              >
                <div className="image-container">
                  <Image
                    src={getImageWithFallback(game.src)}
                    alt={game.title}
                    fill
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      filter: !isGameAvailable(game.title) ? "grayscale(100%)" : "none",
                      opacity: !isGameAvailable(game.title) ? 0.5 : 1,
                    }}
                    draggable={false}
                    priority={
                      i < 4 && visibleTopGames.length === TOP_ROW_GAMES.length
                    }
                    loading={i < 4 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                  />
                </div>
                {!isGameAvailable(game.title) && (
                  <div className="coming-soon-overlay">
                    <span className="coming-soon-text">COMING SOON</span>
                  </div>
                )}
                <div className="carousel-overlay">
                  <span className="carousel-label">{game.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row - moves right to left (opposite direction) */}
        <div className="carousel-row bottom-row">
          <div ref={bottomRowRef} className="carousel-track">
            {visibleBottomGames.map((game, i) => (
              <div
                key={`bottom-${game.title}-${i}`}
                className={`carousel-box ${!isGameAvailable(game.title) ? "game-unavailable" : ""}`}
                onClick={() => {
                  if (!isGameAvailable(game.title)) {
                    window.location.href = "/join-us";
                  }
                }}
              >
                <div className="image-container">
                  <Image
                    src={getImageWithFallback(game.src)}
                    alt={game.title}
                    fill
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      filter: !isGameAvailable(game.title) ? "grayscale(100%)" : "none",
                      opacity: !isGameAvailable(game.title) ? 0.5 : 1,
                    }}
                    draggable={false}
                    priority={
                      i < 4 &&
                      visibleBottomGames.length === BOTTOM_ROW_GAMES.length
                    }
                    loading={i < 4 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                  />
                </div>
                {!isGameAvailable(game.title) && (
                  <div className="coming-soon-overlay">
                    <span className="coming-soon-text">COMING SOON</span>
                  </div>
                )}
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
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 3rem;
          color: white;

          @media (min-width: 768px) {
            font-size: 5rem;
          }
        }

        .carousel-row {
          overflow: hidden;
          width: 100%;
          margin-bottom: 2rem;
        }

        .bottom-row {
          margin-top: 3rem; /* Add space between the two rows */
        }

        .carousel-track {
          display: flex;
          gap: 40px; /* Consistent gap between items */
          padding: 1rem 0;
          will-change: transform; /* Hint to browser for optimization */
          backface-visibility: hidden; /* Reduce visual artifacts during animation */
          transform: translateZ(0); /* Force GPU acceleration */
        }

        .carousel-box {
          width: 180px; /* Much smaller on mobile */
          height: 180px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, opacity 0.3s;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
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

        .carousel-box:hover .carousel-label {
          text-decoration: none;
        }

        .carousel-box:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
        }

        .carousel-box:not(.game-unavailable):hover {
          outline: 2px solid #00ff00; /* Subtle highlight for available games */
        }

        .game-unavailable {
          cursor: pointer;
          position: relative;
        }

        .game-unavailable:hover .coming-soon-overlay {
          opacity: 1;
        }

        .coming-soon-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          z-index: 2;
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
          padding: 0.75rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          display: flex;
          align-items: flex-end;
          height: 40%;
          z-index: 2;
        }

        .carousel-label {
          color: white;
          font-weight: bold;
          font-size: 0.875rem;
        }

        /* Responsive styles */
        @media (min-width: 640px) {
          .carousel-box {
            width: 200px; /* Smaller size for tablets */
            height: 200px;
          }

          .carousel-label {
            font-size: 1rem;
          }

          .carousel-overlay {
            padding: 1rem;
          }
        }

        @media (min-width: 1024px) {
          .carousel-box {
            width: 220px; /* Slightly larger for desktop */
            height: 220px;
          }

          .carousel-label {
            font-size: 1.125rem;
          }
        }

        @media (max-width: 640px) {
          .carousel-row {
            margin-bottom: 1rem;
          }

          .bottom-row {
            margin-top: 1.5rem;
          }

          .carousel-track {
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default GameCarousel;

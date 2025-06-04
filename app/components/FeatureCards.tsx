// FeatureCards.tsx
"use client";
import React, { useRef } from "react";
import OptimizedImage from './OptimizedImage';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  color1: string;
  color2: string;
  image: string;
}

const featureCards: FeatureCard[] = [
  {
    id: "skill-based",
    title: "SKILL-BASED MATCHMAKING",
    description:
      "Our advanced algorithm pairs you with players of similar skill level for fair and competitive matches every time.",
    color1: "#7dd4b0",
    color2: "#acd6f8",
    image: "/static/media/card1transparent.png",

  },
  {
    id: "secure",
    title: "SECURE PLATFORM",
    description:
      "State-of-the-art security ensures your data and transactions are protected at all times.",
    color1: "#e4ee55",
    color2: "#e4a42d",
    image: "/static/media/card2transparent.png",

  },
  {
    id: "rewards",
    title: "REAL REWARDS",
    description:
      "Earn actual prizes, not just virtual points. Win tournaments to claim cash, merchandise, and more.",
    color1: "#c93939",
    color2: "#dd81e6",
    image: "/static/media/card3transparent.png",

  },
];

const FeatureCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="feature-cards-section w-full px-4 py-12 sm:py-16">
      {/* Heading uses same sizing as game carousel */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-12">
        JOIN THE <span className="gradient-text">COMPETITIVE</span> REVOLUTION
      </h2>

      <div className="text-center text-gray-300 mb-12 max-w-2xl mx-auto px-4">
        <p>
          Compete in Matches and earn real rewards. RIVALS is the ultimate
          competitive gaming platform built for true gamers.
        </p>
      </div>

      <div
        ref={containerRef}
        className="cards flex flex-col md:flex-row gap-8 justify-center items-center max-w-7xl mx-auto"
      >
        {featureCards.map((card) => (
          <div key={card.id} className="card-wrapper w-full md:w-[350px]">
            <div
              id={card.id}
              data-id={card.id}
              className="card static-card relative w-full h-[500px] overflow-hidden rounded-xl"
              aria-label={`${card.title} feature card`}
              style={{
                "--color1": card.color1,
                "--color2": card.color2,
              } as React.CSSProperties}
            >
              {/* HOLO/SPARKLE OVERLAY LAYER */}
              <div className="card-effects absolute inset-0 pointer-events-none"></div>

              {/* Replace <img> with OptimizedImage component */}
              <div className="absolute inset-0 z-10">
                <OptimizedImage
                  src={card.image}
                  alt={`${card.title} feature illustration`}
                  className="w-full h-full object-cover object-center pointer-events-none"
                  width={800}
                  height={500}
                />
              </div>

              {/* Text + Button overlay at bottom */}
              <div className="absolute inset-0 z-20 flex flex-col">
                <div className="flex-grow"></div>

                <div className="w-full p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                  <h3 className="text-white text-xl font-bold mb-3 text-center">
                    {card.title}
                  </h3>
                  <p className="text-gray-200 text-sm text-center mx-auto max-w-[90%]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #02f199 0%, #30e3ca 50%, #01e8f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .card {
          box-shadow: 
            -5px -5px 5px -5px var(--color1),
             5px  5px 5px -5px var(--color2),
            -7px -7px 10px -5px transparent,
             7px  7px 10px -5px transparent,
             0 0 5px 0 rgba(255, 255, 255, 0),
             0 55px 35px -20px rgba(0, 0, 0, 0.5);
          transform: none !important;
          transition: none !important;
        }

        /* Overlay layers for holo/sparkles */
        .card-effects {
          position: absolute;
          inset: 0;
        }

        .card-effects:before,
        .card-effects:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background-repeat: no-repeat;
          mix-blend-mode: color-dodge;
          transition: none !important;
        }

        .card-effects:before {
          background-position: 50% 50% !important;
          background-size: 300% 300%;
          background-image: linear-gradient(
            115deg,
            transparent 0%,
            var(--color1) 25%,
            transparent 47%,
            transparent 53%,
            var(--color2) 75%,
            transparent 100%
          );
          opacity: 0.65;
          filter: brightness(0.9) contrast(1.1);
          z-index: 1;
        }

        .card-effects:after {
          background-image: 
            url("https://assets.codepen.io/13471/sparkles.gif"),
            url("https://assets.codepen.io/13471/holo.png"),
            linear-gradient(
              125deg,
              #ff008450 15%,
              #fca40040 30%,
              #ffff0030 40%,
              #00ff8a20 60%,
              #00cfff40 70%,
              #cc4cfa50 85%
            );
          background-position: 50% 50%;
          background-size: 160%;
          background-blend-mode: overlay;
          z-index: 2;
          filter: brightness(1.0) contrast(1.1);
          mix-blend-mode: color-dodge;
          opacity: 0.8;
        }

        .static-card .card-effects {
          animation: staticHoloGradient 8s linear infinite;
        }

        @keyframes staticHoloGradient {
          0%,
          100% {
            opacity: 0.65;
            background-position: 50% 50%;
            filter: brightness(0.8) contrast(1.1);
          }
          25% {
            background-position: 50% 50%;
            opacity: 0.7;
            filter: brightness(0.85) contrast(1.1);
          }
          50% {
            background-position: 50% 50%;
            opacity: 0.75;
            filter: brightness(0.9) contrast(1.15);
          }
          75% {
            background-position: 50% 50%;
            opacity: 0.7;
            filter: brightness(0.85) contrast(1.1);
          }
        }

        /* Darken the text background for readability */
        .card .bg-gradient-to-t {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(0, 0, 0, 0.7) 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
        }
      `}</style>
    </div>
  );
};

export default FeatureCards;

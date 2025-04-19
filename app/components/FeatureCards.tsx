<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  isMain: boolean;
}

interface FeatureCardsProps {
  cards: Card[];
  isMobileView: boolean;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ cards, isMobileView }) => {
  const duplicatedCards = [...cards, ...cards, ...cards];
  const cardWidth = isMobileView ? 300 : 400; // Wider cards
  const cardGap = 16; // 4rem gap
  const totalWidth = cards.length * (cardWidth + cardGap);

  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    // Set initial position
    gsap.set(marqueeRef.current, { x: 0 });

    // Create the infinite marquee animation
    const marqueeAnimation = gsap.to(marqueeRef.current, {
      x: -totalWidth,
      duration: 40, // Same duration as before
      ease: "none", // Linear movement (equivalent to "linear" in framer-motion)
      repeat: -1, // Infinite repeat
      onRepeat: () => {
        // Reset position to create seamless loop
        gsap.set(marqueeRef.current, { x: 0 });
      },
    });

    // Pause animation on hover (optional)
    const handleMouseEnter = () => marqueeAnimation.pause();
    const handleMouseLeave = () => marqueeAnimation.play();

    marqueeRef.current.addEventListener("mouseenter", handleMouseEnter);
    marqueeRef.current.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      if (marqueeRef.current) {
        marqueeRef.current.removeEventListener("mouseenter", handleMouseEnter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        marqueeRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      marqueeAnimation.kill(); // Stop animation on unmount
    };
  }, [totalWidth, cards.length]);
=======
import React from "react";
import Image from "next/image";

// Feature cards data
const featureCardsData = [
  {
    id: "1",
    icon: "/static/svgs/logo.svg",
    title: "Play for Real Stakes. Win Real Money.",
    label: "in payouts",
    description:
      "Join 1v1 matches or tournaments. Stake your entry, compete with rivals, and instantly cash out your winnings. No delays, no disputes.",
  },
  {
    id: "2",
    icon: "/static/svgs/logo.svg",
    title: "Every Match, Verified Instantly.",
    label: "downloads",
    description:
      "Our API-driven system locks in scores from your match the moment it ends. No screenshots, no arguments — just trusted, automated validation.",
  },
  {
    id: "3",
    icon: "/static/svgs/logo.svg",
    title: "Compete in Games You Actually Play.",
    label: "games played",
    description:
      "From arcade-style quick matches to Dota 2 leagues, Rivals gives you the tools to game your way. Solo, with friends, or in full squads. It's your battlefield.",
  },
  {
    id: "4",
    icon: "/static/svgs/logo.svg",
    title: "Custom Challenges. Your Rules.",
    label: "App Store Reviews",
    description:
      "Create personalised matchups with custom stakes, formats, and win conditions. Set the terms. Send the invites. Let the games begin.",
  },
  {
    id: "5",
    icon: "/static/svgs/logo.svg",
    title: "XP-Based Ranking That Actually Matters.",
    label: "Rankings",
    description:
      "Earn XP and level up with every match. Our dynamic ladder puts your wins to work — unlocking events, opponents, and real-world rewards.",
  },
];
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780

const StatsCards: React.FC = () => {
  return (
    <div className="w-full py-16 mt-6 mb-12 relative">
      {/* Section heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#02F199] to-[#00AFFF] bg-clip-text text-transparent">
          PROVEN PLATFORM
        </h2>
        <p className="text-gray-300 mt-2 text-lg">
          Where gamers stake, play and win
        </p>
      </div>

      {/* Stats cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        {featureCardsData.map((card) => (
          <div
            key={card.id}
            className="stat-card rounded-2xl p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
<<<<<<< HEAD
            <div className="h-[400px] overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
=======
            <div className="flex items-center mb-4">
              <Image
                src={card.icon}
                alt={card.label}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
              />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#02F199] to-[#00AFFF] bg-clip-text text-transparent mb-2">
              {card.title}
            </h3>
            <div className="text-gray-400 text-lg mb-4">{card.label}</div>
            <p className="text-gray-300 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;

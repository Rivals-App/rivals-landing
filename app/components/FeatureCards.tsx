/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

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
        marqueeRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      marqueeAnimation.kill(); // Stop animation on unmount
    };
  }, [totalWidth, cards.length]);

  return (
    <div className="overflow-hidden w-full">
      <div ref={marqueeRef} className="flex gap-6 py-4">
        {duplicatedCards.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className={`flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 shadow-xl
              transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-600
            `}
            style={{
              width: card.isMain ? cardWidth + 20 : cardWidth,
              minWidth: card.isMain ? cardWidth + 20 : cardWidth,
            }}
          >
            <div className="h-[400px] overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">
                {card.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;

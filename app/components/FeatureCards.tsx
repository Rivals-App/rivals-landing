import React, { useRef } from "react";
import { motion } from "framer-motion";

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
  // Duplicate cards to create seamless loop
  const duplicatedCards = [...cards, ...cards, ...cards];
  
  // Increase card width to prevent seeing duplicates
  const cardWidth = isMobileView ? 300 : 400; // Wider cards
  const cardGap = 16; // 4rem gap
  const totalWidth = cards.length * (cardWidth + cardGap);
  
  return (
    <div className="overflow-hidden w-full">
      <motion.div 
        className="flex gap-6 py-4" // Increased gap
        animate={{
          x: [-totalWidth, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40, // Slowed down animation to accommodate larger cards
            ease: "linear",
          }
        }}
      >
        {duplicatedCards.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className={`flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 shadow-xl
              ${card.isMain ? `w-[${cardWidth + 20}px]` : `w-[${cardWidth}px]`}
              transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-600
            `}
            style={{ 
              width: card.isMain ? cardWidth + 20 : cardWidth,
              minWidth: card.isMain ? cardWidth + 20 : cardWidth
            }}
          >
            <div className="h-[400px] overflow-hidden"> {/* Significantly increased height from 220px to 280px */}
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
              <p className="text-gray-300 text-sm md:text-base">{card.description}</p> {/* Larger text on larger screens */}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeatureCards;
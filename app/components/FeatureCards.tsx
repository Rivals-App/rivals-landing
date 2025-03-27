import React, { useRef, useEffect, useState } from "react";

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  image: string;
  highlight?: string;
  isMain?: boolean;
}

interface FeatureCardsProps {
  isMobileView: boolean;
  cards: FeatureCard[];
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ isMobileView, cards }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Find the index of the main card (or default to middle card)
  const mainCardIndex = cards.findIndex((card) => card.isMain);
  const centerIndex =
    mainCardIndex !== -1 ? mainCardIndex : Math.floor(cards.length / 2);

  // Effect to measure container width
  useEffect(() => {
    if (scrollContainerRef.current) {
      setContainerWidth(scrollContainerRef.current.offsetWidth);
    }
  }, []);

  // Effect to scroll to initial position on mobile
  useEffect(() => {
    if (isMobileView && scrollContainerRef.current && containerWidth > 0) {
      const cardWidth = 250; // Same as in the CSS
      const cardMargin = 8;
      const cardSpacing = cardWidth + cardMargin * 2;

      // Calculate the scroll position to center the main card
      const totalOffset = centerIndex * cardSpacing;
      const centeringOffset = (window.innerWidth - cardWidth) / 2;
      const scrollPosition = Math.max(0, totalOffset - centeringOffset);

      // Scroll to position
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollPosition;
        }
      }, 50);
    }
  }, [isMobileView, containerWidth, centerIndex]);

  const renderTitle = (card: FeatureCard) => {
    if (!card.highlight) {
      return (
        <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
      );
    }

    // Split the title to insert the highlighted part
    const parts = card.title.split(card.highlight);
    return (
      <h3 className="text-lg font-semibold text-white mb-2">
        {parts[0]}
        <span className="font-bold text-[#02F199]">{card.highlight}</span>
        {parts[1]}
      </h3>
    );
  };

  // Mobile view
  if (isMobileView) {
    return (
      <div className="w-full mb-10 mt-5 h-[336px]" ref={scrollContainerRef}>
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex px-[calc((100vw-300px)/2)]">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`relative flex-shrink-0 ${
                  card.isMain ? "w-[240px] h-[336px]" : "w-[240px] h-[336px]"
                } mx-3 rounded-xl overflow-hidden border border-white/10 shadow-lg snap-center`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-between">
                  {/* Heading at the top */}
                  <div>
                    {renderTitle(card)}
                  </div>
                  {/* Description at the bottom */}
                  <div>
                    <p className="text-sm text-gray-300">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="w-full flex justify-center items-end mb-10 mt-5">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`relative ${
            card.isMain ? "w-[240px] h-[400px] -mt-12" : "w-[240px] h-[400px]"
          } mx-3 rounded-xl overflow-hidden border border-white/10 shadow-lg`}
        >
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-between">
          {/* Heading at the top */}
          <div>
            {renderTitle(card)}
          </div>
          {/* Description at the bottom */}
            <div>
              <p className="text-sm text-gray-300">{card.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;

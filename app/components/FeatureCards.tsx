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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Find the index of the main card (or default to the first card)
  const mainCardIndex = cards.findIndex((card) => card.isMain);
  const centerIndex = mainCardIndex !== -1 ? mainCardIndex : 0; // Changed to start from 0

  // Initial scroll setup
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 400;
      const cardMargin = 16;
      const cardSpacing = cardWidth + cardMargin * 2;
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollPosition = centerIndex * cardSpacing - (containerWidth - cardWidth) / 2;
      
      // Only apply scroll if it won't prevent left scrolling
      if (scrollPosition > 0) {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }
  }, [centerIndex, cards.length]);

  // Mouse and touch event handlers for dragging
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    if (scrollContainerRef.current) {
      setStartX(clientX);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - deltaX;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const renderTitle = (card: FeatureCard) => {
    if (!card.highlight) {
      return <h3 className="text-3xl font-bold text-white mb-2">{card.title}</h3>;
    }
    const parts = card.title.split(card.highlight);
    return (
      <h3 className="text-lg font-semibold text-white mb-2">
        {parts[0]}
        <span className="font-bold text-[#02F199]">{card.highlight}</span>
        {parts[1]}
      </h3>
    );
  };

  const baseWidth = 400;
  const baseHeight = 600;

  return (
    <div
      className="w-full mb-10 mt-5 h-[650px] overflow-x-auto overflow-y-hidden select-none scrollbar-hide"
      ref={scrollContainerRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      style={{
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* IE and Edge */
      }}
    >
      <div className="flex" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
        {cards.map((card) => {
          const scale = 1;
          const width = baseWidth * scale;
          const height = baseHeight * scale;
          return (
            <div
              key={card.id}
              className="relative flex-shrink-0 mx-4 rounded-xl overflow-hidden border border-white/10 shadow-lg transition-transform duration-300"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `translateY(0px)`,
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-between">
                <div>{renderTitle(card)}</div>
                <div>
                  <p className="text-m text-gray-300">{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
};

export default FeatureCards;
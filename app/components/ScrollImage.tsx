"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ScrollImageProps {
  images: string[];
  height?: string;
  alt?: string;
  onSequenceComplete?: () => void;
}

const ScrollImage: React.FC<ScrollImageProps> = ({
  images,
  alt = "Rivals feature image",
  onSequenceComplete,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Auto-advance images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = prev < Math.min(images.length, 4) - 1 ? prev + 1 : 0;
        return newIndex;
      });
    }, 5000);
    
    return () => clearInterval(timer);
  }, [images.length]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    if (index === Math.min(images.length, 4) - 1 && onSequenceComplete) {
      onSequenceComplete();
    }
  };

  // Only use the first 4 images
  const displayImages = images.slice(0, 4);

  // New heading and description texts based on current image
  const getHeadingText = () => {
    switch(currentImageIndex) {
      case 0: return "Choose a Game";
      case 1: return "Stake XP or Money";
      case 2: return "Matchmake with a Rival";
      case 3: return "Win and Withdraw";
      default: return "Choose a Game";
    }
  };

  const getDescriptionText = () => {
    switch(currentImageIndex) {
      case 0: return "Select from our growing library of supported games";
      case 1: return "Decide how much you want to risk for the chance to win";
      case 2: return "Get matched with players of similar skill level";
      case 3: return "Claim your winnings and cash out instantly";
      default: return "Select from our growing library of supported games";
    }
  };

  return (
    <div className="w-full py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4">
        {/* Heading - Matched exactly with GameCarousel */}
        <div className="mb-12 text-center">
          <h2 className="carousel-title text-3xl md:text-7xl font-bold text-white mb-4">
            THE <span className="text-[#02F199]">RIVALS</span> EXPERIENCE
          </h2>
          <h3 className="text-white text-xl md:text-3xl font-bold mb-3">
            {getHeadingText()}
          </h3>
          <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto">
            {getDescriptionText()}
          </p>
        </div>
        
        {/* Image container - ADJUSTED FOR LANDSCAPE WITH DIRECT BORDER */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#02F199]/20 to-[#04D9FF]/20 rounded-xl opacity-50 blur-xl transform scale-105"></div>
          
          {/* Direct border on images */}
          <div className="relative aspect-video">
            {/* Transition group */}
            <div className="relative w-full h-full rounded-xl  shadow-2xl">
            {displayImages.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="inline-flex border-4 border-[#02F199]/30 rounded-3xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`${alt} ${index + 1}`}
                    width={1972}
                    height={1268}
                    className="max-h-[70vh] w-auto object-contain"
                    priority={index === currentImageIndex}
                  />
                </div>
              </div>
            ))}
            </div>
          </div>
          
          {/* Progress indicator dots - updated for 4 steps */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-3">
            {displayImages.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  index === currentImageIndex ? "bg-[#02F199] scale-110" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollImage;
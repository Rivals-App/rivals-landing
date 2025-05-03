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
  // height = "auto",
  alt = "Rivals feature image",
  onSequenceComplete,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Auto-advance images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = prev < Math.min(images.length, 3) - 1 ? prev + 1 : 0;
        return newIndex;
      });
    }, 5000);
    
    return () => clearInterval(timer);
  }, [images.length]);

  // Navigation functions
  const nextImage = () => {
    const newIndex = currentImageIndex < Math.min(images.length, 3) - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    if (newIndex === Math.min(images.length, 3) - 1 && onSequenceComplete) {
      onSequenceComplete();
    }
  };

  const prevImage = () => {
    setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : Math.min(images.length, 3) - 1);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    if (index === Math.min(images.length, 3) - 1 && onSequenceComplete) {
      onSequenceComplete();
    }
  };

  // Only use the first 3 images
  const displayImages = images.slice(0, 3);

  return (
    <div className="w-full py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4">
        {/* Heading - Matched exactly with GameCarousel */}
        <div className="mb-12 text-center">
          <h2 className="carousel-title text-3xl md:text-7xl font-bold text-white mb-4">
            THE <span className="text-[#02F199]">RIVALS</span> EXPERIENCE
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {currentImageIndex === 0 && "Join matches and compete with gamers at your skill level"}
            {currentImageIndex === 1 && "Find opponents instantly with our smart matchmaking"}
            {currentImageIndex === 2 && "Win matches and earn real rewards for your victories"}
          </p>
        </div>
        
        {/* Image container with navigation arrows - ADJUSTED FOR LANDSCAPE */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#02F199]/20 to-[#04D9FF]/20 rounded-xl opacity-50 blur-xl transform scale-105"></div>
          
          {/* Landscape frame */}
          <div className="relative rounded-xl overflow-hidden border-4 border-[#02F199]/10 shadow-2xl shadow-[#02F199]/20 aspect-video">
            {/* Transition group */}
            <div className="relative w-full h-full">
              {displayImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${alt} ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === currentImageIndex}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
            <button 
              onClick={prevImage}
              className="bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors shadow-lg z-20"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors shadow-lg z-20"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          {/* Progress indicator dots - only show 3 */}
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-3">
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
"use client";
import React from "react";
import Script from "next/script";
import { WithContext, Product } from "schema-dts";
import OptimizedImage from "./OptimizedImage";

interface StepItem {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface HowItWorksSectionProps {
  heading?: string;
  headingHighlight?: string;
  steps?: StepItem[];
}

const DEFAULT_STEPS: StepItem[] = [
  {
    number: 1,
    title: "Choose a Game",
    description: "Select from our library of skill-based games",
    imageSrc: "/static/media/HowItWorks1.png",
    imageAlt: "Choose a game",
  },
  {
    number: 2,
    title: "Stake XP or Money",
    description: "Set your stake amount for the match",
    imageSrc: "/static/media/HowItWorks2.png",
    imageAlt: "Stake XP or money",
  },
  {
    number: 3,
    title: "Match with a Rival",
    description: "Get matched with players at your skill level",
    imageSrc: "/static/media/HowItWorks3.png",
    imageAlt: "Match with a rival",
  },
  {
    number: 4,
    title: "Win and Withdraw",
    description: "Victory means instant rewards to your account",
    imageSrc: "/static/media/HowItWorks4.png",
    imageAlt: "Win and withdraw",
  },
];

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  heading = "THE",
  headingHighlight = "RIVALS EXPERIENCE",
  steps = DEFAULT_STEPS,
}) => {
  // Define product schema for the platform
  const productSchema: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Rivals Gaming Platform",
    "description": "Competitive skill-based gaming platform where players can win real money rewards",
    "brand": {
      "@type": "Brand",
      "name": "Rivals"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, '\\u003c'),
        }}
      />
      <section className="how-it-works-section w-full py-12 md:py-16 lg:py-24">
        <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4">
          {/* Heading - Using ScrollImage style */}
          <div className="mb-10 md:mb-16 lg:mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">
              {heading} <span className="text-[#02F199]">{headingHighlight}</span>
            </h2>
          </div>

          {/* Steps Grid - Using Arcade page style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mx-auto">
            {steps.map((step) => (
              <div 
                key={step.number}
                className="flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-6 sm:p-8 h-full min-h-[450px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(2,241,153,0.3)] hover:border-[#02F199]/30 border border-white/10"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl sm:text-2xl">
                  {step.number}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg mb-6">
                  {step.description}
                </p>

                {/* Step Image Container - Fixed height with proper spacing */}
                <div className="mt-auto w-full flex items-center justify-center pt-4">
                  {/* Image with border - Controlled dimensions */}
                  <div className="relative border-2 border-white/30 rounded-lg overflow-hidden w-[80%] max-w-[220px]">
                    <OptimizedImage
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      width={220}
                      height={180}
                      className="w-full object-contain"
                      quality={90}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksSection;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";
import { gsap, Power3 } from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const ArcadePage: React.FC = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline
        .from(".hero-section", {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          force3D: true,
        })
        .from(
          ".game-showcase",
          {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.5"
        )
        .from(
          ".how-to-compete",
          {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 1,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.5"
        )
        .from(
          ".cta-banner",
          {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 1.5,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.5"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white relative z-10">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          height: "100vh",
          width: "100vw",
          background: `linear-gradient(
          90deg,
          rgba(255,255,255,0.1) 1px,
          transparent 1px 45px
        )
        50% 50% / 45px 45px,
        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px 45px)
        50% 50% / 45px 45px`,
          mask: "linear-gradient(-20deg, transparent 50%, black)",
          zIndex: 0,
        }}
      ></div>

      <div className="w-full min-h-screen flex flex-col relative z-1">
        <Navbar />

        {/* Hero Section */}
        <div className="hero-section flex-grow flex flex-col items-center pt-16 md:pt-18 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="w-full max-w-6xl text-center mb-12 md:mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              STAKE. PLAY. <span className="text-[#02F199]">WIN.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Jump into quick-fire skill games. Whether it's Tic Tac Toe or
              Wordle-style battles, every match is a chance to win.
            </p>
            {/* <Link href="https://getrivals.com" target="_blank">
              <button className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                Try Demo
              </button>
            </Link> */}
          </div>
        </div>

        {/* Force a contained layout with clearly separated sections */}
        <div className="flex flex-col w-full relative isolation-auto">
          {/* Game Showcase Section */}
          <section className="game-showcase w-full px-4 md:px-6 pb-12 md:pb-24 relative z-10 overflow-hidden mb-20 sm:mb-16 md:mb-32">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                Featured <span className="text-[#02F199]">Games</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                {/* Tic Tac Toe - Fixed mobile layout */}
                <div className="bg-[#121212]/30 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(2,241,153,0.3)] hover:border-[#02F199]/30 relative z-10">
                  <div className="relative h-40 md:h-48 overflow-hidden z-10">
                    <Image
                      draggable={false}
                      src="/static/media/tictactoe.png"
                      alt="Tic Tac Toe"
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"></div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      {/* <Link href="https://getrivals.com" target="_blank">
                        <button className="px-6 py-2 md:px-8 md:py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                          Try Demo
                        </button>
                      </Link> */}
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      Tic Tac Toe
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      Classic game, competitive edge. Outsmart your opponent in a
                      race for fast XP or real cash.
                    </p>
                  </div>
                </div>

                {/* Word Grid - Similar fixes */}
                <div className="bg-[#121212]/30 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(2,241,153,0.3)] hover:border-[#02F199]/30 relative z-10">
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <Image
                      draggable={false}
                      src="/static/media/wordgrid.png"
                      alt="Word Grid"
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"></div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      {/* <Link href="https://getrivals.com" target="_blank">
                        <button className="px-6 py-2 md:px-8 md:py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                          Try Demo
                        </button>
                      </Link> */}
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      Word Grid
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      Think fast. Guess the word in the fewest tries. The sharper
                      mind wins the pot.
                    </p>
                  </div>
                </div>

                {/* Rock Paper Scissors - Fixed for tablet/mobile */}
                <div className="bg-[#121212]/30 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(2,241,153,0.3)] hover:border-[#02F199]/30 sm:col-span-2 lg:col-span-1 relative z-10">
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <Image
                      draggable={false}
                      src="/static/media/rockpaperscissors.png"
                      alt="Rock Paper Scissors"
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"></div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      {/* <Link href="https://getrivals.com" target="_blank">
                        <button className="px-6 py-2 md:px-8 md:py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                          Try Demo
                        </button>
                      </Link> */}
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      Rock Paper Scissors
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      Quickest match on Rivals. Pure reaction, pure rivalry. 3
                      rounds. Best of luck.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Clear separator to prevent overlap */}
          <div className="w-full h-0"></div>

          {/* How It Works Section - Completely isolated layout */}
          <section className="how-to-compete w-full px-4 md:px-6 pt-8 md:pt-24 mb-24 md:mb-32 relative z-10 overflow-visible mt-0">
            <div className="container mx-auto max-w-6xl relative">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-28 md:mb-24">
                How to <span className="text-[#02F199]">Compete</span>
              </h2>

              {/* Mobile-first approach with display block on small screens */}
              <div className="w-full flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-12 md:gap-14">
                {/* Step 1 */}
                <div className="w-full flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-6 pb-8 mb-16 sm:mb-0 relative">
                  <div className="w-16 h-16 mb-6 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Choose a game</h3>
                  <p className="text-gray-300 mb-8">
                    Select from our library of skill-based arcade games
                  </p>

                  {/* Explicitly sized image container with fixed height */}
                  <div className="w-full flex-grow flex items-end justify-center pb-4 h-[200px] sm:h-[160px]">
                    <div className="relative border-2 border-white/30 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] max-w-[80%] h-auto mt-8 sm:mt-4">
                      <Image
                        draggable={false}
                        src="/static/media/HowItWorks1.png"
                        alt="Choose a game"
                        width={130}
                        height={130}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="w-full flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-6 pb-8 mb-16 sm:mb-0 relative">
                  <div className="w-16 h-16 mb-6 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Stake XP or money</h3>
                  <p className="text-gray-300 mb-8">
                    Set your stake amount for the match
                  </p>

                  <div className="w-full flex-grow flex items-end justify-center pb-4 h-[200px] sm:h-[160px]">
                    <div className="relative border-2 border-white/30 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] max-w-[80%] h-auto mt-8 sm:mt-4">
                      <Image
                        draggable={false}
                        src="/static/media/HowItWorks2.png"
                        alt="Stake XP or money"
                        width={130}
                        height={130}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="w-full flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-6 pb-8 mb-16 sm:mb-0 relative">
                  <div className="w-16 h-16 mb-6 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Match with a rival</h3>
                  <p className="text-gray-300 mb-8">
                    Get matched with players at your skill level
                  </p>

                  <div className="w-full flex-grow flex items-end justify-center pb-4 h-[200px] sm:h-[160px]">
                    <div className="relative border-2 border-white/30 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] max-w-[80%] h-auto mt-8 sm:mt-4">
                      <Image
                        draggable={false}
                        src="/static/media/HowItWorks3.png"
                        alt="Match with a rival"
                        width={130}
                        height={130}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="w-full flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-6 pb-8 mb-16 sm:mb-0 relative">
                  <div className="w-16 h-16 mb-6 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Win and withdraw</h3>
                  <p className="text-gray-300 mb-8">
                    Victory means instant rewards to your account
                  </p>

                  <div className="w-full flex-grow flex items-end justify-center pb-4 h-[200px] sm:h-[160px]">
                    <div className="relative border-2 border-white/30 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] max-w-[80%] h-auto mt-8 sm:mt-4">
                      <Image
                        draggable={false}
                        src="/static/media/HowItWorks4.png"
                        alt="Win and withdraw"
                        width={130}
                        height={130}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Banner - Add padding to prevent cutoff */}
          {/* <section className="cta-banner w-full max-w-6xl mx-auto mb-16 px-4 md:px-6 relative z-10">
            <div className="bg-gradient-to-r from-[#121212]/10 to-[#121212]/80 border border-white/10 backdrop-blur-md rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-0 text-center md:text-left">
                Ready to play for more than just fun?
              </h3>
              <Link href="https://getrivals.com" target="_blank">
                <button className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                  Try Demo
                </button>
              </Link>
            </div>
          </section> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArcadePage;

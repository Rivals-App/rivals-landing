/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const ArcadePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F2841] flex flex-col text-white">
      <div className="w-full min-h-screen flex flex-col bg-transparent">
        <Navbar />

        {/* Hero Section */}
        <div className="flex-grow flex flex-col items-center pt-16 md:pt-18 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="w-full max-w-6xl text-center mb-12 md:mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              STAKE. PLAY. <span className="text-[#02F199]">WIN.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Jump into quick-fire skill games. Whether it's Tic Tac Toe or Wordle-style battles, every match is a chance to win.
            </p>
            <Link href="https://getrivals.com" target="_blank">
              <button className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                Play Now 
              </button>
            </Link>
          </div>
          
          {/* Game Showcase Section */}
          <div className="w-full mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Featured <span className="text-[#02F199]">Games</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Tic Tac Toe */}
              <div className="bg-[#121212]/30 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(2,241,153,0.3)] hover:border-[#02F199]/30">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/static/media/tictactoe.png" 
                    alt="Tic Tac Toe" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <button className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                      Play
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Tic Tac Toe</h3>
                  <p className="text-gray-300">
                    Classic game, competitive edge. Outsmart your opponent in a race for fast XP or real cash.
                  </p>
                </div>
              </div>
              
              {/* Word Grid */}
              <div className="bg-[#121212]/30 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(2,241,153,0.3)] hover:border-[#02F199]/30">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/static/media/wordgrid.png" 
                    alt="Word Grid" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <button className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                      Play
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Word Grid</h3>
                  <p className="text-gray-300">
                    Think fast. Guess the word in the fewest tries. The sharper mind wins the pot.
                  </p>
                </div>
              </div>
              
              {/* Rock Paper Scissors */}
              <div className="bg-[#121212]/30 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(2,241,153,0.3)] hover:border-[#02F199]/30">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/static/media/rockpaperscissors.png" 
                    alt="Rock Paper Scissors" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4">
                     
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <button className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                      Play
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Rock Paper Scissors</h3>
                  <p className="text-gray-300">
                    Quickest match on Rivals. Pure reaction, pure rivalry. 3 rounds. Best of luck.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* How It Works Section */}
          <div className="w-full max-w-6xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              How to <span className="text-[#02F199]">Compete</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-4 pb-6">
                <div className="w-16 h-16 mb-4 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose a game</h3>
                <p className="text-gray-300 mb-6">Select from our library of skill-based arcade games</p>
                
                {/* Step 1 Image Container */}
                <div className="w-full h-40 md:h-48 flex items-center justify-center">
                  {/* Image with border */}
                  <div className="relative border-2 border-white/30 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] max-w-[90%] h-auto">
                    <img 
                      src="/static/media/HowItWorks1.png" 
                      alt="Choose a game" 
                      className="w-full h-full object-contain max-h-[130px] md:max-h-[170px]" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-4 pb-6">
                <div className="w-16 h-16 mb-4 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Stake XP or money</h3>
                <p className="text-gray-300 mb-6">Set your stake amount for the match</p>
                
                {/* Step 2 Image Container */}
                <div className="w-full h-40 md:h-48 flex items-center justify-center">
                  {/* Image with border */}
                  <div className="relative border-2 border-white/30 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] max-w-[90%] h-auto">
                    <img 
                      src="/static/media/HowItWorks2.png" 
                      alt="Stake XP or money" 
                      className="w-full h-full object-contain max-h-[130px] md:max-h-[170px]" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-4 pb-6">
                <div className="w-16 h-16 mb-4 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Match with a rival</h3>
                <p className="text-gray-300 mb-6">Get matched with players at your skill level</p>
                
                {/* Step 3 Image Container */}
                <div className="w-full h-40 md:h-48 flex items-center justify-center">
                  {/* Image with border */}
                  <div className="relative border-2 border-white/30 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] max-w-[90%] h-auto">
                    <img 
                      src="/static/media/HowItWorks3.png" 
                      alt="Match with a rival" 
                      className="w-full h-full object-contain max-h-[130px] md:max-h-[170px]" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center bg-[#121212]/30 rounded-xl p-4 pb-6">
                <div className="w-16 h-16 mb-4 bg-[#02F199] rounded-full flex items-center justify-center text-black font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Win and withdraw</h3>
                <p className="text-gray-300 mb-6">Victory means instant rewards to your account</p>
                
                {/* Step 4 Image Container */}
                <div className="w-full h-40 md:h-48 flex items-center justify-center">
                  {/* Image with border */}
                  <div className="relative border-2 border-white/30 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)] max-w-[90%] h-auto">
                    <img 
                      src="/static/media/HowItWorks4.png" 
                      alt="Win and withdraw" 
                      className="w-full h-full object-contain max-h-[130px] md:max-h-[170px]" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Banner */}
          <div className="w-full max-w-6xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-[#121212]/10 to-[#121212]/80 border border-white/10 backdrop-blur-md rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-0 text-center md:text-left">
                Ready to play for more than just fun?
              </h3>
              <Link href="https://getrivals.com" target="_blank">
                <button className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 hero-button inline-block">
                  Play Now on Rivals
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArcadePage;

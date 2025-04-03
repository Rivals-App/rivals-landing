"use client";
import React from "react";
import Navbar from "../components/Navbar";

const ArcadePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col text-white">
      <div className="w-full min-h-screen flex flex-col bg-transparent">
        <Navbar />

        <div className="flex-grow flex flex-col items-start pt-20 md:pt-18 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="w-full max-w-6xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              RIVALS <span className="text-[#02F199]">ARCADE</span>
            </h1>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-[#121212]/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl p-8">
              <p className="text-lg text-gray-300 mb-6">
                Our Arcade is coming soon! Get ready to compete in skill-based
                games with real stakes and exciting rewards.
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#02F199]">
                  Upcoming Games
                </h2>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Tetris Showdown</li>
                  <li>Chess Masters</li>
                  <li>Reaction Time Challenge</li>
                  <li>Puzzle Battle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadePage;

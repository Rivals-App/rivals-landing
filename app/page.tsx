/* eslint-disable react/no-unescaped-entities */
import React from "react";
import WaitlistForm from "./components/WaitlistForm";

const HomePage = () => {
  return (
    <div className="text-white">
      <main className="max-w-7xl mx-auto px-14 md:px-2 py-20 md:py-12">
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="w-full text-center md:text-left">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Where Gamers
              <br />
              <span className="text-[#02F199]">Compete</span>
            </h1>
            <div className="mt-10">
              <h2 className="text-3xl font-thin mb-4">
                Join the Winners Circle
              </h2>
              <WaitlistForm />
            </div>
          </div>

          {/* Right Column - Email Mockup */}
          <div className="hidden md:block">
            <div className="bg-gradient-to-tr from-gray-900 to-gray-700 h-[300px] rounded-lg shadow-xl p-4 text-gray-800">
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

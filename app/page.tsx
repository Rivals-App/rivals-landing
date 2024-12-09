/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import WaitlistForm from "./components/WaitlistForm";
import SponsorMarquee from "./components/Marquee";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import ModalWaitlistForm from "./components/Modal";

const HomePage = () => {
  const featureCards = [
    {
      id: 1,
      title: "Single matches",
      description:
        "Challenge players to 1v1 matches across multiple game titles",
      icon: (
        <svg
          className="w-12 h-12 text-[#02F199]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Leagues",
      description: "Join competitive leagues and climb the rankings",
      icon: (
        <svg
          className="w-12 h-12 text-[#02F199]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Tournaments",
      description: "Compete in high-stakes tournament brackets",
      icon: (
        <svg
          className="w-12 h-12 text-[#02F199]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Instant payouts",
      description: "Receive your winnings instantly after each match",
      icon: (
        <svg
          className="w-12 h-12 text-[#02F199]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const sponsorLogos = [
    {
      id: 1,
      name: "StripeLogo",
      src: "./static/logos/stripe_logo.webp",
    },
    {
      id: 2,
      name: "AMEXLogo",
      src: "./static/logos/American-Express-Color.png",
    },
    {
      id: 3,
      name: "GPayLogo",
      src: "./static/logos/Google_Pay_Logo.svg.png",
    },
    {
      id: 4,
      name: "ApplePayLogo",
      src: "./static/logos/Apple_Pay_logo.svg.png",
    },
  ];

  return (
    <div className="bg-black text-white">
      <main className="w-full mx-auto pt-36 pb-8">
        {/* Hero section remains the same */}
        <div className="w-full text-center">
          <h1 className="w-full text-6xl md:text-7xl font-bold mb-6">
            Where Gamers
            <span className="text-[#02F199]"> Compete</span>
          </h1>
        </div>
        <div className="w-full my-10">
          <div className="bg-gradient-to-tr from-gray-900 to-gray-700 h-[400px] shadow-xl p-4 text-gray-800"></div>
        </div>

        {/* Features Section */}
        <section className="w-full px-14 md:px-8 my-24">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <h2 className="text-3xl ld:text-4xl font-bold mb-8">Compete in</h2>
            {featureCards.map((card) => (
              <div
                key={card.id}
                className="p-6 bg-gray-900 rounded-lg shadow-md border border-gray-800 hover:border-[#02F199] transition-colors duration-300"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsors Section */}
        <SponsorMarquee sponsorLogos={sponsorLogos} />

        {/* Sign up Section */}
        <div className="w-[100vw] bg-vid-1 bg-cover bg-no-repeat bg-[bottom_center] mb-20 text-center">
          <div className="w-full bg-black/60 mx-auto py-32">
            <WaitlistForm />
          </div>
        </div>

        {/* Connect with Us Section */}
        <section className="w-full px-14 md:px-8 my-24">
          <h2 className="text-center text-3xl ld:text-4xl font-bold mb-8">
            Connect with Us
          </h2>
          <div className="flex justify-center items-center gap-8">
            <a
              href="#"
              className="text-gray-400 hover:text-[#02F199] transition-colors"
            >
              <FaDiscord size={74} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#02F199] transition-colors"
            >
              <FaInstagram size={74} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#02F199] transition-colors"
            >
              <FaXTwitter size={74} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#02F199] transition-colors"
            >
              <FaYoutube size={74} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

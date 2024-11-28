/* eslint-disable react/no-unescaped-entities */
import React from "react";
import WaitlistForm from "./components/WaitlistForm";

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

  return (
    <div className="bg-black text-white">
      <main className="max-w-7xl mx-auto px-14 md:px-8 pt-36 pb-8">
        {/* Hero section remains the same */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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

          <div className="hidden md:block">
            <div className="bg-gradient-to-tr from-gray-900 to-gray-700 h-[300px] rounded-lg shadow-xl p-4 text-gray-800"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl ld:text-4xl font-bold mb-4">
            The monopolising, mass market solution to the <br />
            competitive gaming industry
          </h2>
          <p className="text-gray-300 mb-8">
            A platform that allows users to stake and wage money on themselves
            while playing games
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
      </main>
    </div>
  );
};

export default HomePage;

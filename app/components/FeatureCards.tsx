import React from "react";
import Image from "next/image";

// Feature cards data
const featureCardsData = [
  {
    id: "1",
    icon: "/static/svgs/logo.svg",
    title: "Win Real Money.",
    description:
      "Join 1v1 matches or tournaments. Stake your entry, compete with rivals, and instantly cash out your winnings. No delays, no disputes.",
  },
  {
    id: "2",
    icon: "/static/svgs/logo.svg",
    title: "Every Match, Verified Instantly.",
    description:
      "Our API-driven system locks in scores from your match the moment it ends. No screenshots, no arguments — just trusted, automated validation.",
  },
  {
    id: "3",
    icon: "/static/svgs/logo.svg",
    title: "Compete in Games You Actually Play.",
    description:
      "From arcade-style quick matches to Dota 2 leagues, Rivals gives you the tools to game your way. Solo, with friends, or in full squads. It's your battlefield.",
  },
  {
    id: "4",
    icon: "/static/svgs/logo.svg",
    title: "Custom Challenges. Your Rules.",
    description:
      "Create personalised matchups with custom stakes, formats, and win conditions. Set the terms. Send the invites. Let the games begin.",
  },
  {
    id: "5",
    icon: "/static/svgs/logo.svg",
    title: "XP-Based Ranking That Actually Matters.",
    description:
      "Earn XP and level up with every match. Our dynamic ladder puts your wins to work — unlocking events, opponents, and real-world rewards.",
  },
];

const StatsCards: React.FC = () => {
  return (
    <div className="w-full py-16 mt-6 mb-12 relative">
      {/* Section heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#02F199] to-[#00AFFF] bg-clip-text text-transparent">
          PROVEN PLATFORM
        </h2>
        <p className="text-gray-300 mt-2 text-lg">
          Where gamers stake, play and win
        </p>
      </div>

      {/* Stats cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        {featureCardsData.map((card) => (
          <div
            key={card.id}
            className="stat-card rounded-2xl p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <Image
                src={card.icon}
                alt={card.title}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#02F199] to-[#00AFFF] bg-clip-text text-transparent mb-2">
              {card.title}
            </h3>
            <p className="text-gray-300 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;

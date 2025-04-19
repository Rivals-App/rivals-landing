import React from "react";

const StatsCards = () => {
  const cardData = [
    {
      title: "SKILL-BASED MATCHES",
      description: "100% skill-based competition. No random elements, no luck—just your ability against theirs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      ),
      gradient: "from-[#00C2FF] to-[#01E8F7]"
    },
    {
      title: "INSTANT PAYOUTS",
      description: "Win a match, get paid right away. Cash out to your bank account or crypto wallet instantly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      gradient: "from-[#02F199] to-[#01B874]"
    },
    {
      title: "SECURE PLATFORM",
      description: "Advanced anti-cheat systems ensure fair play. All transactions and matches are secure and transparent.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      gradient: "from-[#FF5C00] to-[#FF8F00]"
    },
    {
      title: "CROSS-PLATFORM",
      description: "Play on PC, mobile, or console. Match with players across all supported platforms and devices.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      gradient: "from-[#A855F7] to-[#7E22CE]"
    }
  ];

  return (
    <div className="stats-section w-full px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">PROVEN <span className="gradient-text">PLATFORM</span></h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Built for serious gamers looking for fair competition with real rewards
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardData.map((card, index) => (
            <div 
              key={index} 
              className="feature-card bg-[#142F4C] rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 border border-[#1e4163]"
            >
              <div className={`h-2 bg-gradient-to-r ${card.gradient}`}></div>
              <div className="p-6">
                <div className={`mb-5 p-3 rounded-lg inline-block bg-gradient-to-r ${card.gradient} bg-opacity-20`}>
                  <div className="text-white">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-300">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;

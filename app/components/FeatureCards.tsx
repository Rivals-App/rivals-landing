// StatsCards.tsx
import React, { useEffect, useRef } from "react";

interface CardInfo {
  title: string;
  description: string;
  color1: string;
  color2: string;
  icon?: React.ReactNode;
}

const cardData: CardInfo[] = [
  {
    title: "SKILL‑BASED MATCHES",
    description:
      "100% skill‑based competition. No random elements, no luck—just your ability against theirs.",
    color1: "#00C2FF",
    color2: "#01E8F7",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
      </svg>
    )
  },
  {
    title: "INSTANT PAYOUTS",
    description:
      "Win a match, get paid right away. Cash out to your bank account or crypto wallet instantly.",
    color1: "#02F199",
    color2: "#01B874",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    title: "SECURE PLATFORM",
    description:
      "Advanced anti‑cheat systems ensure fair play. All transactions and matches are secure and transparent.",
    color1: "#FF5C00",
    color2: "#FF8F00",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    title: "CROSS‑PLATFORM",
    description:
      "Play on PC, mobile, or console. Match with players across all supported platforms and devices.",
    color1: "#A855F7",
    color2: "#7E22CE",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  },
];

export default function StatsCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement>(null);
  let resetTimer: any;

  useEffect(() => {
    const cards = containerRef.current!.querySelectorAll<HTMLElement>(".card");
    const styleTag = styleRef.current!;
    cards.forEach((card) => {
      const onMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        // calculate pointer pos
        const rect = card.getBoundingClientRect();
        const x =
          e instanceof MouseEvent
            ? e.clientX - rect.left
            : e.touches[0].clientX - rect.left;
        const y =
          e instanceof MouseEvent
            ? e.clientY - rect.top
            : e.touches[0].clientY - rect.top;
        const w = rect.width,
          h = rect.height;
        const px = Math.abs(Math.floor((100 / w) * x) - 100);
        const py = Math.abs(Math.floor((100 / h) * y) - 100);
        const lp = 50 + (px - 50) / 1.5;
        const tp = 50 + (py - 50) / 1.5;
        const sparkX = 50 + (px - 50) / 7;
        const sparkY = 50 + (py - 50) / 7;
        const opacity = 0.2 + (Math.abs((50 - px) + (50 - py)) * 1.5) / 100;
        const rotY = ((lp - 50) / 1.5) * 0.5;
        const rotX = -((tp - 50) / 2);

        // apply 3D tilt
        card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

        // inject dynamic gradient & sparkle positions
        styleTag.innerHTML = `
          .card:hover:before { background-position: ${lp}% ${tp}% }
          .card:hover:after {
            background-position: ${sparkX}% ${sparkY}%;
            opacity: ${opacity};
          }
        `;

        clearTimeout(resetTimer);
      };

      const onOut = () => {
        // reset
        styleTag.innerHTML = "";
        card.style.transform = "";
        resetTimer = setTimeout(() => card.classList.add("animated"), 2_500);
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("touchmove", onMove);
      card.addEventListener("mouseout", onOut);
      card.addEventListener("touchend", onOut);
      card.addEventListener("touchcancel", onOut);
    });

    return () => {
      clearTimeout(resetTimer);
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true)); // crude cleanup
      });
    };
  }, []);

  return (
    <div className="stats-section w-full px-4 py-16">
      <style ref={styleRef} />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          PROVEN <span className="gradient-text">PLATFORM</span>
        </h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Built for serious gamers looking for fair competition with real
          rewards
        </p>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center"
        >
          {cardData.map((c, i) => (
            <div
              key={i}
              className="card animated bg-[#142F4C] rounded-2xl shadow-lg relative overflow-hidden cursor-pointer w-full max-w-sm"
              style={
                {
                  "--color1": "#00C2FF",
                  "--color2": "#01E8F7",
                  height: "260px",
                  width: "100%",
                } as React.CSSProperties
              }
            >
              <div className="p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-4 text-white">
                  {c.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                <p className="text-gray-300 text-sm">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

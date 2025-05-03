// FeatureCards.tsx
"use client"
import React, { useEffect, useRef } from "react";
// No Image components are used in this file

// Define feature card data
interface FeatureCard {
  id: string;
  title: string;
  description: string;
  color1: string;
  color2: string;
  image: string;
  buttonText: string;
  buttonColor: string;
}

const featureCards: FeatureCard[] = [
  {
    id: "skill-based",
    title: "SKILL-BASED MATCHMAKING",
    description: "Our advanced algorithm pairs you with players of similar skill level for fair and competitive matches every time.",
    color1: "#7dd4b0",
    color2: "#acd6f8",
    image: "/static/media/card1transparent.png",
    buttonText: "Learn More",
    buttonColor: "#7dd4b0"
  },
  {
    id: "secure",
    title: "SECURE PLATFORM",
    description: "State-of-the-art security ensures your data and transactions are protected at all times.",
    color1: "#e4ee55",
    color2: "#e4a42d",
    image: "/static/media/card2transparent.png",
    buttonText: "Explore",
    buttonColor: "#e4a42d"
  },
  {
    id: "rewards",
    title: "REAL REWARDS",
    description: "Earn actual prizes, not just virtual points. Win tournaments to claim cash, merchandise, and more.",
    color1: "#c93939",
    color2: "#dd81e6",
    image: "/static/media/card3transparent.png",
    buttonText: "View Rewards",
    buttonColor: "#c93939"
  }
];

const FeatureCards: React.FC = () => {
  const styleRef = useRef<HTMLStyleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.card');
    const style = styleRef.current;
    
    if (!style || cards.length === 0) return;
    
    const resetTimers: { [key: string]: NodeJS.Timeout } = {};
    
    // Throttle function to limit the rate of execution for mouse/touch events
    const throttle = (func: (e: MouseEvent | TouchEvent) => void, limit: number) => {
      let inThrottle: boolean;
      return function(this: unknown, e: MouseEvent | TouchEvent) {
        if (!inThrottle) {
          func.call(this, e);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    cards.forEach(card => {
      // Mouse move handling - throttled for better performance
      const handleMouseMove = throttle((e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        
        // Get card position
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card
        let l, t;
        if ('touches' in e) {
          l = e.touches[0].clientX - rect.left;
          t = e.touches[0].clientY - rect.top;
        } else {
          l = e.clientX - rect.left;
          t = e.clientY - rect.top;
        }
        
        const h = rect.height;
        const w = rect.width;
        
        // Calculate percentages
        const px = Math.abs(Math.floor(100 / w * l) - 100);
        const py = Math.abs(Math.floor(100 / h * t) - 100);
        
        // Calculate gradient and sparkle positions
        const lp = (50 + (px - 50) / 1.5);
        const tp = (50 + (py - 50) / 1.5);
        const px_spark = (50 + (px - 50) / 7);
        const py_spark = (50 + (py - 50) / 7);
        const p_opc = 20 + (Math.abs((50 - px) + (50 - py)) * 1.5);
        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * 0.5;
        
        // Apply transform with GPU acceleration hints
        card.setAttribute('style', `transform: rotateX(${ty}deg) rotateY(${tx}deg); will-change: transform; backface-visibility: hidden;`);
        
        // Set dynamic styles for pseudo-elements
        const id = card.getAttribute('data-id') || '';
        style.innerHTML = `
          #${id}:before { background-position: ${lp}% ${tp}%; }
          #${id}:after { background-position: ${px_spark}% ${py_spark}%; opacity: ${p_opc / 100}; }
        `;
        
        // Clear any existing reset timer
        if (resetTimers[id]) {
          clearTimeout(resetTimers[id]);
        }
      }, 16); // Throttle to approximately 60fps
      
      // Mouse out handling
      const handleMouseOut = () => {
        const id = card.getAttribute('data-id') || '';
        
        // Reset styles
        style.innerHTML = style.innerHTML.replace(new RegExp(`#${id}:before.*?}`, 's'), '');
        style.innerHTML = style.innerHTML.replace(new RegExp(`#${id}:after.*?}`, 's'), '');
        card.removeAttribute('style');
        
        // Add animation class after delay
        resetTimers[id] = setTimeout(() => {
          card.classList.add('animated');
        }, 2500);
      };
      
      // Add event listeners
      card.addEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent));
      card.addEventListener('touchmove', (e) => handleMouseMove(e as TouchEvent));
      card.addEventListener('mouseout', handleMouseOut);
      card.addEventListener('touchend', handleMouseOut);
      card.addEventListener('touchcancel', handleMouseOut);
    });
    
    // Cleanup
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('touchmove', () => {});
        card.removeEventListener('mouseout', () => {});
        card.removeEventListener('touchend', () => {});
        card.removeEventListener('touchcancel', () => {});
      });
      
      Object.values(resetTimers).forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  return (
    <div className="feature-cards-section w-full px-4 py-12 sm:py-16">
      <style ref={styleRef} />
      
      {/* Heading uses same sizing as game carousel */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-12">
        JOIN THE <span className="gradient-text">COMPETITIVE</span> REVOLUTION
      </h2>
      
      <div className="text-center text-gray-300 mb-12 max-w-2xl mx-auto px-4">
        <p>Compete in Matches and earn real rewards. RIVALS is the ultimate competitive gaming platform built for true gamers.</p>
      </div>
      
      <div 
        ref={containerRef} 
        className="cards flex flex-col md:flex-row gap-8 justify-center items-center max-w-7xl mx-auto"
      >
        {featureCards.map((card) => (
          <div key={card.id} className="card-wrapper w-full md:w-[350px]">
            <div 
              id={card.id}
              data-id={card.id}
              className={`card ${card.id} animated relative w-full h-[500px] overflow-hidden rounded-xl cursor-pointer z-10 touch-none transform transition-transform`}
              aria-label={`${card.title} feature card`}
              style={{
                '--color1': card.color1,
                '--color2': card.color2,
                '--front': `url(${card.image})`,
                backgroundColor: '#040712',
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
              } as React.CSSProperties}
            >
              {/* Card background image */}
              <div 
                className="absolute inset-0 z-0" 
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: card.id === 'rewards' ? '60% auto' : 'cover',  // Make the rewards image smaller
                  backgroundPosition: card.id === 'rewards' ? 'center 40%' : '50% 50%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              
              {/* Center content with flex column */}
              <div className="absolute inset-0 z-10 flex flex-col items-center">
                {/* Transparent image - bigger and centered */}
                <div className="flex-grow flex items-center justify-center py-8 px-4 mt-4">
                  {/* You can add additional scaling for the specific card if needed */}
                  {card.id === 'rewards' && (
                    <div className="transform scale-90"></div>
                  )}
                </div>
                
                {/* Card content at the bottom */}
                <div className="w-full p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                  <h3 className="text-white text-xl font-bold mb-3 text-center">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-200 text-sm text-center mx-auto max-w-[90%]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .gradient-text {
          bg-[linear-gradient(135deg,_#02F199_0%,_#30E3CA_50%,_#01E8F7_100%)]
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .card {
          box-shadow: -5px -5px 5px -5px var(--color1),
                      5px 5px 5px -5px var(--color2),
                      -7px -7px 10px -5px transparent,
                      7px 7px 10px -5px transparent,
                      0 0 5px 0px rgba(255, 255, 255, 0),
                      0 55px 35px -20px rgba(0, 0, 0, 0.5);
          transition: transform 0.5s ease, box-shadow 0.2s ease;
          will-change: transform, filter, box-shadow; /* Specify all properties that will change */
          transform-origin: center;
          backface-visibility: hidden; /* Reduce visual artifacts during animation */
          transform: translateZ(0); /* Force GPU acceleration */
        }
        
        .card:hover {
          box-shadow: -20px -20px 30px -25px var(--color1), 
                      20px 20px 30px -25px var(--color2), 
                      -7px -7px 10px -5px var(--color1), 
                      7px 7px 10px -5px var(--color2), 
                      0 0 13px 4px rgba(255, 255, 255, 0.3), 
                      0 55px 35px -20px rgba(0, 0, 0, 0.5);
        }
        
        .card:before,
        .card:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background-repeat: no-repeat;
          opacity: 0.5;
          mix-blend-mode: color-dodge;
          transition: all 0.33s ease;
          will-change: opacity, background-position; /* Performance optimization */
        }
        
        .card:before {
          background-position: 50% 50%;
          background-size: 300% 300%;
          background-image: linear-gradient(
            115deg,
            transparent 0%,
            var(--color1) 25%,
            transparent 47%,
            transparent 53%,
            var(--color2) 75%,
            transparent 100%
          );
          opacity: 0.5;
          filter: brightness(0.7) contrast(1);
          z-index: 1;
          backface-visibility: hidden; /* Reduce visual artifacts */
        }
        
        .card:after {
          opacity: 1;
          background-image: url("https://assets.codepen.io/13471/sparkles.gif"),
                          url("https://assets.codepen.io/13471/holo.png"),
                          linear-gradient(
                            125deg,
                            #ff008450 15%,
                            #fca40040 30%,
                            #ffff0030 40%,
                            #00ff8a20 60%,
                            #00cfff40 70%,
                            #cc4cfa50 85%
                          );
          background-position: 50% 50%;
          background-size: 160%;
          background-blend-mode: overlay;
          z-index: 2;
          filter: brightness(1) contrast(1);
          transition: all 0.33s ease;
          mix-blend-mode: color-dodge;
          opacity: 0.75;
          will-change: opacity, filter; /* Performance optimization */
          backface-visibility: hidden; /* Reduce visual artifacts */
        }
        
        .card.active:after,
        .card:hover:after {
          filter: brightness(1) contrast(1);
          opacity: 1;
        }
        
        .card.active,
        .card:hover {
          animation: none;
          transition: box-shadow 0.1s ease-out;
        }
        
        .card.active:before,
        .card:hover:before {
          animation: none;
          background-image: linear-gradient(
            110deg,
            transparent 25%,
            var(--color1) 48%,
            var(--color2) 52%,
            transparent 75%
          );
          background-position: 50% 50%;
          background-size: 250% 250%;
          opacity: 0.88;
          filter: brightness(0.66) contrast(1.33);
          transition: none;
        }
        
        .card.active:before,
        .card:hover:before,
        .card.active:after,
        .card:hover:after {
          animation: none;
          transition: none;
        }
        
        .card.animated {
          transition: none;
          animation: holoCard 12s ease 0s 1;
          will-change: transform; /* Performance optimization */
        }
        
        .card.animated:before {
          transition: none;
          animation: holoGradient 12s ease 0s 1;
          will-change: opacity, background-position, filter; /* Performance optimization */
        }
        
        .card.animated:after {
          transition: none;
          animation: holoSparkle 12s ease 0s 1;
          will-change: opacity, background-position, filter; /* Performance optimization */
        }
        
        @keyframes holoSparkle {
          0%, 100% {
            opacity: 0.75;
            background-position: 50% 50%;
            filter: brightness(1.2) contrast(1.25);
          }
          5%, 8% {
            opacity: 1;
            background-position: 40% 40%;
            filter: brightness(0.8) contrast(1.2);
          }
          13%, 16% {
            opacity: 0.5;
            background-position: 50% 50%;
            filter: brightness(1.2) contrast(0.8);
          }
          35%, 38% {
            opacity: 1;
            background-position: 60% 60%;
            filter: brightness(1) contrast(1);
          }
          55% {
            opacity: 0.33;
            background-position: 45% 45%;
            filter: brightness(1.2) contrast(1.25);
          }
        }
        
        @keyframes holoGradient {
          0%, 100% {
            opacity: 0.5;
            background-position: 50% 50%;
            filter: brightness(0.5) contrast(1);
          }
          5%, 9% {
            background-position: 100% 100%;
            opacity: 1;
            filter: brightness(0.75) contrast(1.25);
          }
          13%, 17% {
            background-position: 0% 0%;
            opacity: 0.88;
          }
          35%, 39% {
            background-position: 100% 100%;
            opacity: 1;
            filter: brightness(0.5) contrast(1);
          }
          55% {
            background-position: 0% 0%;
            opacity: 1;
            filter: brightness(0.75) contrast(1.25);
          }
        }
        
        @keyframes holoCard {
          0%, 100% {
            transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
          }
          5%, 8% {
            transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
          }
          13%, 16% {
            transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
          }
          35%, 38% {
            transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
          }
          55% {
            transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FeatureCards;


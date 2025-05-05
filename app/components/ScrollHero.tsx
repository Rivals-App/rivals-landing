"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORDS = ["FRIENDS.", "TEAMMATES.", "ENEMIES.", "FOES.", "RIVALS."];

const ScrollHero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current || !listRef.current)
      return;

    // Set up GSAP animations with a delay to ensure DOM is ready
    const setupScroll = () => {
      // Check if component is still mounted
      if (!rootRef.current || !listRef.current) return;

      try {
        // Clear any existing ScrollTriggers related to this component
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.vars &&
            trigger.vars.id &&
            trigger.vars.id.includes("scrollHero")
          ) {
            trigger.kill();
          }
        });

        // Set CSS variables
        document.documentElement.style.setProperty("--start", "0");
        document.documentElement.style.setProperty("--end", "360");
        document.documentElement.style.setProperty("--lightness", "75%");
        document.documentElement.style.setProperty("--base-chroma", "0.3");

        // Get the list and items
        const list = listRef.current;
        if (!list) return;

        // Get all list items
        const items = gsap.utils.toArray<HTMLLIElement>("li", list);
        if (items.length === 0) return;

        // Set initial styles on items
        gsap.set(items, {
          opacity: (i) => (i === 0 ? 1 : 0.2),
        });

        // Create dimming animation with optimized performance
        const dimmer = gsap
          .timeline({
            id: "scrollHeroDimmer",
            overwrite: "auto",
          })
          .to(items.slice(1), {
            opacity: 1,
            stagger: 0.5,
            willChange: "opacity", // Hint to browser for optimization
          })
          .to(
            items.slice(0, items.length - 1),
            {
              opacity: 0.2,
              stagger: 0.5,
              willChange: "opacity", // Hint to browser for optimization
            },
            0
          );

        // Create dimmer scroll trigger with optimized performance
        ScrollTrigger.create({
          id: "scrollHeroDimmerTrigger",
          trigger: items[0],
          endTrigger: items[items.length - 1],
          start: "center center",
          end: "center center",
          animation: dimmer,
          scrub: 0.4, // Increased value for smoother scrolling
          fastScrollEnd: true, // Optimize for fast scrolling
          invalidateOnRefresh: true, // Better handling of window resizing
        });

        // Create color changing animation
        const scroller = gsap
          .timeline({
            id: "scrollHeroColor",
            overwrite: "auto",
          })
          .fromTo(
            document.documentElement,
            {
              "--hue": 0,
            },
            {
              "--hue": 360,
              ease: "none",
              // CSS variables are less expensive to animate than other properties
            }
          );

        // Create color scroll trigger with optimized performance
        ScrollTrigger.create({
          id: "scrollHeroColorTrigger",
          trigger: items[0],
          endTrigger: items[items.length - 1],
          start: "center center",
          end: "center center",
          animation: scroller,
          scrub: 0.4, // Increased value for smoother scrolling
          fastScrollEnd: true, // Optimize for fast scrolling
          invalidateOnRefresh: true, // Better handling of window resizing
        });

        // Create chroma entry animation with optimized performance
        gsap.fromTo(
          document.documentElement,
          {
            "--chroma": 0,
          },
          {
            "--chroma": 0.3,
            ease: "none",
            scrollTrigger: {
              id: "scrollHeroChromaEntry",
              scrub: 0.4, // Increased value for smoother scrolling
              trigger: items[0],
              start: "center center+=40",
              end: "center center",
              fastScrollEnd: true, // Optimize for fast scrolling
              invalidateOnRefresh: true, // Better handling of window resizing
            },
          }
        );

        // Create chroma exit animation with optimized performance
        gsap.fromTo(
          document.documentElement,
          {
            "--chroma": 0.3,
          },
          {
            "--chroma": 0,
            ease: "none",
            scrollTrigger: {
              id: "scrollHeroChromaExit",
              scrub: 0.4, // Increased value for smoother scrolling
              trigger: items[items.length - 2],
              start: "center center",
              end: "center center-=40",
              fastScrollEnd: true, // Optimize for fast scrolling
              invalidateOnRefresh: true, // Better handling of window resizing
            },
          }
        );

        // Create snap points - FIX: This is where the error occurs - we need to add labels first
        const snapTimeline = gsap.timeline({
          id: "scrollHeroSnap",
          overwrite: "auto",
        });

        // Add labels to the timeline for each word
        items.forEach((item, index) => {
          snapTimeline.addLabel(`word${index}`, index * 0.5);
        });

        // Now create the ScrollTrigger with labels properly defined and optimized performance
        ScrollTrigger.create({
          id: "scrollHeroSnapTrigger",
          snap: {
            snapTo: (value, self) => {
              // Calculate which label to snap to based on scroll progress
              const progress = self?.progress ?? 0;
              const labelCount = items.length;
              const snapIndex = Math.round(progress * (labelCount - 1));
              return snapIndex / (labelCount - 1);
            },
            duration: { min: 0.2, max: 0.3 },
            delay: 0.05, // Small delay for smoother snapping
            ease: "power2.out", // Smoother easing
          },
          trigger: list,
          start: "top center",
          end: "bottom center",
          invalidateOnRefresh: true, // Better handling of window resizing
        });
      } catch (error) {
        console.error("Error setting up ScrollHero animations:", error);
      }
    };

    // Run setup after the component is mounted with a longer delay
    const timeoutId = setTimeout(() => {
      setupScroll();
    }, 300); // Increased delay for DOM to be fully ready

    return () => {
      clearTimeout(timeoutId);
      // Clean up all ScrollTrigger instances related to this component
      if (typeof window !== "undefined") {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.vars &&
            trigger.vars.id &&
            trigger.vars.id.includes("scrollHero")
          ) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-hero-container">
      {/* Hero section with heading and image */}
      <header className="hero-scroll">
        <div className="relative w-full mx-auto px-0"> {/* Remove any padding here */}
          <div className="flex flex-col items-start">
            <div className="w-full mb-6 md:mb-0 z-10 pl-10 md:pl-12 lg:pl-[10rem] mt-[-40vh] md:mt-[-5vh]">
              <h1 className="text-6xl md:text-[6.8rem] -left-10 font-extrabold leading-tight">
                WIN MONEY
                <br />
                AGAINST
              </h1>
            </div>
          </div>
        </div>
        <div className="absolute right-0 border-r-4 border-white top-[45%] -translate-y-1/2 hidden md:block">
          <Image
            src="/static/media/hero.png"
            alt="Rivals Gaming"
            width={500}
            height={500}
            priority
            draggable={false}
            loading="eager"
            className="object-contain" /* Added to ensure image fits properly */
          />
        </div>
      </header>

      {/* Words scrolling section */}
      <main className="scroll-content-main -mt-[64vh] md:mt-0">
        <section className="content fluid">
          <h2 className="your-heading text-white font-bold">
            <span aria-hidden="true">YOUR&nbsp;</span>
            <span className="sr-only">YOUR things.</span>
          </h2>

          <ul
            ref={listRef}
            aria-hidden="true"
            className="words-list"
            style={{ "--count": WORDS.length } as React.CSSProperties}
          >
            {WORDS.map((word, i) => (
              <li
                key={i}
                style={{ "--i": i } as React.CSSProperties}
                className={i === WORDS.length - 1 ? "text-white" : ""}
              >
                {word}
              </li>
            ))}
          </ul>
        </section>

        {/* <section className="final-section">
          <Link
            href="/join-us"
            className="hero-button px-10 py-4 bg-[#02F199] text-black font-bold text-xl md:text-2xl rounded-full hover:scale-105 transition-all duration-200"
          >
            JOIN WAITLIST
          </Link>
        </section> */}
      </main>

      <style jsx>{`
        .scroll-hero-container {
          position: relative;
          width: 100%;
          color: white;
        }

        /* Add background grid lines similar to codepen */
        .scroll-hero-container::before {
          content: "";
          height: 100vh;
          width: 100%;
          position: fixed;
          background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.1) 1px,
                transparent 1px 45px
              )
              50% 50% / 45px 45px,
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px 45px)
              50% 50% / 45px 45px;
          mask: linear-gradient(-20deg, transparent 50%, black);
          top: 0;
          pointer-events: none;
          z-index: -1;
        }

        .hero-scroll {
          min-height: 90vh;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 2rem 0;
          position: relative;
          padding-top: 0;
        }

        .hero-image-container {
          width: 50%;
          max-width: 600px;
          display: none;
          position: absolute;
          right: 0;
          top: 45%;
          transform: translateY(-50%);
          z-index: 1;
        }

        @media (min-width: 768px) {
          .hero-image-container {
            display: block;
            right: 0; /* Ensure it's flush with the right edge */
          }
        }

        .scroll-content-main {
          width: 100%;
        }

        .content {
          --font-level: 6;
          display: flex;
          line-height: 1.25;
          width: 100%;
          padding-left: 10rem; /* Increased padding to align with text above */
          margin-top: -15vh; /* Pull up more to better connect with heading */
        }

        .your-heading {
          position: sticky;
          top: calc(50% - 0.5em);
          margin: 0;
          margin-top: 100px;
          display: inline-block;
          height: fit-content;
          font-weight: 600;
          font-size: 5rem; /* Increased font size */
        }

        .words-list {
          font-weight: 600;
          padding-inline: 0;
          margin: 0;
          margin-top: 100px;
          list-style-type: none;
          --step: calc((var(--end) - var(--start)) / (var(--count) - 1));
        }

        .words-list li {
          font-size: 5rem; /* Increased font size */
          padding: 0;
          scroll-snap-align: center;
          color: oklch(
            var(--lightness) var(--base-chroma)
              calc(var(--start) + (var(--step) * var(--i)))
          );
        }

        .words-list li.text-white {
          color: white;
        }

        .final-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .content {
            padding-left: 2rem;
            margin-top: -10vh;
          }

          .your-heading,
          .words-list,
          .words-list li {
            font-size: 2.3rem;
            margin-top: -2px;
          }
        }

        @media (min-width: 768px) and (max-width: 1200px) {
          .content {
            padding-left: 7rem;
          }

          .your-heading,
          .words-list li {
            font-size: 4.5rem;
          }
        }

        @media (min-width: 1200px) {
          .content {
            padding-left: 12rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollHero;

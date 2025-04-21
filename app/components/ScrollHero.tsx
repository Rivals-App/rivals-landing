"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const WORDS = [
  "FRIENDS.",
  "FAMILY.",
  "ENEMIES.",
  "FOES.",
  "RIVALS."
]

const ScrollHero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Set up GSAP animations
    const setupScroll = () => {
      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      
      // Set CSS variables
      document.documentElement.style.setProperty('--start', '0')
      document.documentElement.style.setProperty('--end', '360')
      document.documentElement.style.setProperty('--lightness', '75%')
      document.documentElement.style.setProperty('--base-chroma', '0.3')
      
      // Get the list and items
      const list = listRef.current
      if (!list) return
      
      // Get all list items
      const items = gsap.utils.toArray<HTMLLIElement>("li", list)
      if (items.length === 0) return
      
      // Set initial styles on items
      gsap.set(items, { 
        opacity: (i) => (i === 0 ? 1 : 0.2),
      })
      
      // Create dimming animation
      const dimmer = gsap
        .timeline()
        .to(items.slice(1), {
          opacity: 1,
          stagger: 0.5,
        })
        .to(
          items.slice(0, items.length - 1),
          {
            opacity: 0.2,
            stagger: 0.5,
          },
          0
        )

      // Create dimmer scroll trigger
      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: dimmer,
        scrub: 0.2,
      })

      // Create color changing animation
      const scroller = gsap.timeline().fromTo(
        document.documentElement,
        {
          '--hue': 0,
        },
        {
          '--hue': 360,
          ease: 'none',
        }
      )

      // Create color scroll trigger
      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: scroller,
        scrub: 0.2,
      })

      // Create chroma entry animation
      gsap.fromTo(
        document.documentElement,
        {
          '--chroma': 0,
        },
        {
          '--chroma': 0.3,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[0],
            start: 'center center+=40',
            end: 'center center',
          },
        }
      )
      
      // Create chroma exit animation
      gsap.fromTo(
        document.documentElement,
        {
          '--chroma': 0.3,
        },
        {
          '--chroma': 0,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[items.length - 2],
            start: 'center center',
            end: 'center center-=40',
          },
        }
      )

      // Create snap points
      ScrollTrigger.create({
        snap: {
          snapTo: "labels",
          duration: { min: 0.2, max: 0.3 },
          delay: 0,
          ease: "power1.inOut",
        },
        trigger: list,
        start: "top center",
        end: "bottom center",
      })
    }

    // Run setup after the component is mounted
    const timeoutId = setTimeout(() => {
      setupScroll()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={rootRef} className="scroll-hero-container">
      {/* Hero section with heading and image */}
      <header className="hero-scroll">
        <div className="relative w-full mx-auto">
          <div className="flex flex-col items-start">
            <div className="w-full mb-6 md:mb-0 z-10 pl-10 md:pl-12 lg:pl-[10rem] mt-[-5vh]">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-tight">
                WIN MONEY<br />AGAINST
              </h1>
            </div>
            
            <div className="hero-image-container absolute right-0 top-[45%] -translate-y-1/2 hidden md:block">
              <Image 
                src="/static/media/hero.png" 
                alt="Rivals Gaming" 
                width={500} 
                height={500}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Words scrolling section */}
      <main className="scroll-content-main">
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
          content: '';
          height: 100vh;
          width: 100vw;
          position: fixed;
          background: linear-gradient(
                90deg,
                rgba(255,255,255,0.1) 1px,
                transparent 1px 45px
              )
              50% 50% / 45px 45px,
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px 45px)
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
        }
        
        @media (min-width: 768px) {
          .hero-image-container {
            display: block;
            position: absolute;
            right: 0;
            top: 45%;
            transform: translateY(-50%);
            z-index: 1;
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
          margin-top: 93px;
          list-style-type: none;
          --step: calc((var(--end) - var(--start)) / (var(--count) - 1));
        }
        
        .words-list li {
          font-size: 5rem; /* Increased font size */
          padding: 0.5rem 0;
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
          .words-list li {
            font-size: 3rem;
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
  )
}

export default ScrollHero
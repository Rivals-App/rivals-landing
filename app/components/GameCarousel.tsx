"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// List of game images and their titles
const GAMES = [
  { src: "/static/games/CS2.png", title: "CS2" },
  { src: "/static/games/Valorant.png", title: "Valorant" },
  { src: "/static/games/Lol.jpg", title: "League of Legends" },
  { src: "/static/games/Dota2.jpg", title: "Dota 2" },
  { src: "/static/games/Fortnite.jpg", title: "Fortnite" },
  { src: "/static/games/Apex.jpg", title: "Apex Legends" },
  { src: "/static/games/Fifa.jpeg", title: "FIFA" },
  { src: "/static/games/Rocket.jpg", title: "Rocket League" }
]

// Fallback to CS2 for any missing images
const getImageWithFallback = (src: string) => {
  return src || "/static/games/CS2.png"
}

const GameCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const setupCarousel = () => {
      if (!trackRef.current) return

      // Get all carousel items
      const boxes = gsap.utils.toArray<HTMLElement>('.carousel-box')
      if (boxes.length === 0) return

      // Set initial positions
      const spacing = 260 // box width + gap
      const totalWidth = spacing * boxes.length
      const startX = window.innerWidth * 0.1
      
      // Position boxes with even spacing
      boxes.forEach((box, i) => {
        const x = startX + (i * spacing) % totalWidth
        gsap.set(box, {
          x,
          opacity: 0.8,
          scale: 0.9,
          zIndex: 1
        })
      })

      // Create a MUCH slower timeline
      const tl = gsap.timeline({
        repeat: -1,
        paused: false
      })

      // Animate each box individually
      boxes.forEach((box) => {
        tl.to(box, {
          duration: 40, // Much slower animation (was 20)
          ease: "none",
          x: `-=${totalWidth}`, // Move the full width
          onUpdate: function() {
            // When a box goes off left edge, wrap to the right
            const boxRect = box.getBoundingClientRect()
            if (boxRect.right < 0) {
              const currentX = gsap.getProperty(box, "x") as number
              gsap.set(box, { x: currentX + totalWidth })
            }
          }
        }, 0) // Start all animations at the same time
      })

      // Parallax effect based on scroll (even slower now)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // Slower speed overall with minimal difference on scroll direction
          const speed = self.direction === 1 ? 0.8 : 0.5
          tl.timeScale(speed)
        }
      })

      // Hover effects
      boxes.forEach((box) => {
        box.addEventListener('mouseenter', () => {
          gsap.to(box, {
            scale: 1.1,
            opacity: 1,
            duration: 0.3,
            zIndex: 10
          })
        })
        
        box.addEventListener('mouseleave', () => {
          gsap.to(box, {
            scale: 0.9,
            opacity: 0.8,
            duration: 0.3,
            zIndex: 1
          })
        })
      })

      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }

    const timeoutId = setTimeout(() => {
      setupCarousel()
    }, 200)

    return () => {
      clearTimeout(timeoutId)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="game-carousel-container">
      <div className="carousel-inner">
        <h2 className="carousel-title">PLAY YOUR FAVOURITE GAMES</h2>
        
        <div ref={trackRef} className="carousel-track">
          {/* Use the GAMES array to display different images */}
          {GAMES.map((game, i) => (
            <div key={i} className="carousel-box">
              <div className="image-container">
                <Image 
                  src={getImageWithFallback(game.src)}
                  alt={`${game.title} Game`}
                  fill
                  sizes="(max-width: 768px) 220px, 300px"
                  className="carousel-image"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <div className="carousel-overlay">
                <span className="carousel-label">{game.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .game-carousel-container {
          position: relative;
          width: 100%;
          background-color: #000;
          padding: 4rem 0;
          overflow: hidden;
        }
        
        .carousel-inner {
          max-width: 100%;
          margin: 0 auto;
        }
        
        .carousel-title {
          text-align: center;
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 3rem;
          color: white;
          
          @media (min-width: 768px) {
            font-size: 5rem;
          }
        }
        
        .carousel-track {
          position: relative;
          width: 100%;
          height: 350px; /* Increased height for larger cards */
          display: flex;
          align-items: center;
          overflow: visible;
        }
        
        .carousel-box {
          position: absolute;
          width: 300px; /* Increased width */
          height: 300px; /* Increased height */
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, opacity 0.3s;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          will-change: transform, opacity;
          background-color: #181818; /* Background color for images with transparent areas */
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        /* We're not setting object-fit in CSS anymore, it's in the style prop */
        
        .carousel-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem; /* Increased padding */
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          display: flex;
          align-items: flex-end;
          height: 50%;
          z-index: 2;
        }
        
        .carousel-label {
          color: white;
          font-weight: bold;
          font-size: 1.5rem; /* Larger text */
        }
      `}</style>
    </div>
  )
}

export default GameCarousel
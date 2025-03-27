/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState, useMemo } from "react";
import type p5 from "p5";

interface Config {
  numberOfParticles: number;
  scale: number;
  targetFrameRate: number;
  frameInterval: number;
  particleSpeed: {
    min: number;
    max: number;
  };
  opacity: number;
  strokeWeight: number;
  backgroundColor: number[];
  strokeColor: number[];
}

interface Particle {
  x: number;
  y: number;
  speed: number;
}

const PerlinNoiseSketchComponent: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const particlesRef = useRef<Particle[] | null>(null);
  const canvasWidthRef = useRef<number>(0);
  const canvasHeightRef = useRef<number>(0);

  const config = useMemo<Config>(
    () => ({
      numberOfParticles: isMobile ? 300 : 800,
      scale: 0.005,
      targetFrameRate: 30,
      frameInterval: 1000 / 30,
      particleSpeed: { min: 0.8, max: 1.2 },
      opacity: 1.0,
      strokeWeight: isMobile ? 1.0 : 1.5,
      backgroundColor: [0, 0, 0, 0],
      strokeColor: [103, 232, 160],
    }),
    [isMobile]
  );

  useEffect(() => {
    const debouncedResize = debounce(() => {
      const wasMobile = isMobile;
      const newIsMobile = window.innerWidth <= 768;

      if (wasMobile !== newIsMobile) {
        setIsMobile(newIsMobile);
      }
    }, 150);

    window.addEventListener("resize", debouncedResize);
    debouncedResize();

    return () => window.removeEventListener("resize", debouncedResize);
  }, [isMobile]);

  useEffect(() => {
    let isActive = true;
    let p5Instance: p5;
    const rafId: number | null = null;

    const loadP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      const sketch = (p: p5) => {
        const TAU = p.TAU;
        const noiseScale = config.scale;
        let lastDrawTime = 0;

        const cos = Math.cos;
        const sin = Math.sin;
        // Store p.random to use consistently
        const pRandom = p.random.bind(p);

        const onScreen = (
          x: number,
          y: number,
          width: number,
          height: number
        ): boolean => x >= 0 && x <= width && y >= 0 && y <= height;

        const initializeParticles = (
          width: number,
          height: number
        ): Particle[] => {
          const count = config.numberOfParticles;
          const particles: Particle[] = new Array(count);
          const minSpeed = config.particleSpeed.min;
          const maxSpeed = config.particleSpeed.max;

          for (let i = 0; i < count; i++) {
            particles[i] = {
              x: pRandom(width),
              y: pRandom(height),
              speed: pRandom(minSpeed, maxSpeed),
            };
          }
          return particles;
        };

        p.setup = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;

          const canvas = p.createCanvas(width, height, p.P2D);
          canvasWidthRef.current = width;
          canvasHeightRef.current = height;

          canvas.style("position", "fixed");
          canvas.style("left", "0");
          canvas.style("top", "0");
          canvas.style("z-index", "0");
          canvas.style("opacity", config.opacity.toString());

          canvas.style("background-color", "transparent");

          canvas.style("transform", "translate3d(0,0,0)");
          canvas.style("backface-visibility", "hidden");
          canvas.style("perspective", "1000px");

          particlesRef.current = initializeParticles(width, height);

          p.stroke(
            config.strokeColor[0],
            config.strokeColor[1],
            config.strokeColor[2]
          );
          p.strokeWeight(config.strokeWeight);

          p.pixelDensity(1);
          p.noSmooth();
          p.frameRate(config.targetFrameRate);
        };

        p.draw = () => {
          const currentTime = performance.now();
          if (currentTime - lastDrawTime < config.frameInterval) {
            return;
          }

          p.clear();

          const particles = particlesRef.current;
          if (!particles) return;

          const width = canvasWidthRef.current;
          const height = canvasHeightRef.current;

          const cosFunc = Math.cos;
          const sinFunc = Math.sin;

          p.beginShape(p.POINTS);

          for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            const { x, y, speed } = particle;

            p.vertex(x, y);

            const n = p.noise(x * noiseScale, y * noiseScale);
            const a = TAU * n;

            particle.x += cosFunc(a) * speed;
            particle.y += sinFunc(a) * speed;

            if (!onScreen(particle.x, particle.y, width, height)) {
              particle.x = pRandom(width);
              particle.y = pRandom(height);
            }
          }

          p.endShape();
          lastDrawTime = currentTime;
        };

        p.windowResized = () => {
          if (!isActive) return;

          const width = window.innerWidth;
          const height = window.innerHeight;

          p.resizeCanvas(width, height);
          canvasWidthRef.current = width;
          canvasHeightRef.current = height;

          const particles = particlesRef.current;
          if (particles) {
            for (let i = 0; i < particles.length; i++) {
              const particle = particles[i];
              if (!onScreen(particle.x, particle.y, width, height)) {
                // FIX: Use pRandom instead of random
                particle.x = pRandom(width);
                particle.y = pRandom(height);
              }
            }
          }
        };
      };

      if (isActive && sketchRef.current) {
        p5Instance = new p5(sketch, sketchRef.current);
      }
    };

    loadP5();

    return () => {
      isActive = false;
      if (p5Instance) {
        p5Instance.remove();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (sketchRef.current) {
        while (sketchRef.current.firstChild) {
          sketchRef.current.removeChild(sketchRef.current.firstChild);
        }
      }
    };
  }, [config]);

  return (
    <div
      ref={sketchRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    />
  );
};

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

const PerlinNoiseSketch = dynamic(
  () => Promise.resolve(PerlinNoiseSketchComponent),
  { ssr: false }
);

export default PerlinNoiseSketch;

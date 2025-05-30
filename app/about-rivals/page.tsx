/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutSectionProps {
  onContinue?: () => void;
  onBack?: () => void;
  goToRegisterStep?: () => void;
  goToBlogSection?: () => void;
  goToHomeSection?: () => void;
  currentStep?: number;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  onContinue,
  onBack,
  goToHomeSection,
  currentStep,
  goToRegisterStep,
  goToBlogSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Animation setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial opacity for hero section elements
    gsap.set(".about-hero-text", {
      opacity: 0,
      y: 30,
    });

    // Create timeline for initial animations
    const tl = gsap.timeline();

    // Animate hero elements
    tl.to(".about-hero-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    });

    // Setup scroll animations
    const setupScrollAnimations = () => {
      // Milestones animations
      if (milestonesRef.current) {
        gsap.from(".milestones-title", {
          scrollTrigger: {
            trigger: milestonesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".milestone-item", {
          scrollTrigger: {
            trigger: ".milestones-list",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: -20,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      // Vision animations
      if (visionRef.current) {
        gsap.from(".vision-title, .vision-content, .mission-content", {
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // CTA animations
      if (ctaRef.current) {
        gsap.from(".cta-content > *", {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        });
      }
    };

    // Initialize scroll animations with a slight delay
    const timeoutId = setTimeout(setupScrollAnimations, 200);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          height: '100vh',
          width: '100vw',
          background: `linear-gradient(
            90deg,
            rgba(255,255,255,0.1) 1px,
            transparent 1px 45px
          )
          50% 50% / 45px 45px,
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px 45px)
          50% 50% / 45px 45px`,
          mask: 'linear-gradient(-20deg, transparent 50%, black)',
          zIndex: 0
        }}
      ></div>

      {/* Main content */}
      <div
        className="w-full min-h-screen flex flex-col bg-transparent relative z-10"
        ref={containerRef}
      >
        <Navbar
          goToRegisterStep={goToRegisterStep}
          goToBlogSection={goToBlogSection}
          goToHomeSection={goToHomeSection}
          currentStep={currentStep}
        />

        {/* About Header */}
        <div className="flex-grow flex flex-col items-start pt-16 md:pt-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="about-header w-full max-w-6xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              ABOUT <span className="text-[#02F199]">RIVALS</span>
            </h1>
          </div>
        </div>

        {/* About Content */}
        <div className="w-full pb-16 px-4 md:px-8 lg:px-14">
          <div className="flex flex-col gap-8 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div
              ref={heroRef}
              className="bg-[#121212]/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8">
                <h2 className="about-hero-text text-3xl md:text-4xl font-bold text-white mb-4">
                  Built for <span className="text-[#02F199]">Players</span>.
                  Backed by <span className="text-[#02F199]">Believers</span>.
                </h2>
                <p className="about-hero-text text-lg text-gray-300">
                  Rivals was created to give every gamer the chance to win — not
                  just streamers and pros.
                </p>
              </div>
            </div>

            {/* Milestones Timeline */}
            <div
              ref={milestonesRef}
              className="bg-[#121212]/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8">
                <h2 className="milestones-title text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  From <span className="text-[#02F199]">Idea</span> to{" "}
                  <span className="text-[#02F199]">Impact</span>
                </h2>
                <div className="milestones-list relative">
                  {/* Timeline line */}
                  <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-[#02F199]/20 transform md:translate-x-[-50%] hidden md:block"></div>

                  {/* Timeline items */}
                  <div className="milestone-item flex flex-col md:flex-row md:justify-between mb-12 relative">
                    <div className="md:w-[45%] md:text-right pr-8 md:pr-12">
                      <h3 className="text-2xl font-bold text-[#02F199] mb-2">
                        2025 Jan
                      </h3>
                      <p className="text-gray-300">
                        Founded and First designs done
                      </p>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-3 w-4 h-4 bg-[#02F199] rounded-full transform translate-x-[-50%]"></div>
                    <div className="md:w-[45%] md:pl-12 mt-3 md:mt-0"></div>
                  </div>

                  <div className="milestone-item flex flex-col md:flex-row md:justify-between mb-12 relative">
                    <div className="md:w-[45%] md:text-right md:pr-12"></div>
                    <div className="hidden md:block absolute left-1/2 top-3 w-4 h-4 bg-[#02F199] rounded-full transform translate-x-[-50%]"></div>
                    <div className="md:w-[45%] md:pl-12">
                      <h3 className="text-2xl font-bold text-[#02F199] mb-2">
                        2025 Mar
                      </h3>
                      <p className="text-gray-300">
                        Ranked #1 at Google HQ London Pitch Day (42 startups)
                      </p>
                    </div>
                  </div>

                  <div className="milestone-item flex flex-col md:flex-row md:justify-between mb-12 relative">
                    <div className="md:w-[45%] md:text-right pr-8 md:pr-12">
                      <h3 className="text-2xl font-bold text-[#02F199] mb-2">
                        2025 Q2
                      </h3>
                      <p className="text-gray-300">
                        First tournament league, arcade games go live
                      </p>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-3 w-4 h-4 bg-[#02F199] rounded-full transform translate-x-[-50%]"></div>
                    <div className="md:w-[45%] md:pl-12 mt-3 md:mt-0"></div>
                  </div>

                  <div className="milestone-item flex flex-col md:flex-row md:justify-between relative">
                    <div className="md:w-[45%] md:text-right md:pr-12"></div>
                    <div className="hidden md:block absolute left-1/2 top-3 w-4 h-4 bg-[#02F199] rounded-full transform translate-x-[-50%]"></div>
                    <div className="md:w-[45%] md:pl-12">
                      <h3 className="text-2xl font-bold text-[#02F199] mb-2">
                        2025 Q3+
                      </h3>
                      <p className="text-gray-300">
                        Dota 2 integration, investment round in progress
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div
              ref={visionRef}
              className="bg-[#121212]/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8">
                <h2 className="vision-title text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Where We're <span className="text-[#02F199]">Headed</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="vision-content">
                    <h3 className="text-2xl font-bold text-[#02F199] mb-4">
                      Our Vision
                    </h3>
                    <p className="text-lg text-gray-300">
                      To make competitive gaming accessible, fair, and
                      financially rewarding for all players — not just the top
                      1%.
                    </p>
                  </div>

                  <div className="mission-content">
                    <h3 className="text-2xl font-bold text-[#02F199] mb-4">
                      Our Mission
                    </h3>
                    <p className="text-lg text-gray-300">
                      Build a trusted platform where players can compete, stake,
                      and win — across any game, any format, any skill level.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div
              ref={ctaRef}
              className="bg-[#121212]/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8 text-center cta-content">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                  Talk to the <span className="text-[#02F199]">Team</span>
                </h2>

                <p className="text-lg text-gray-300 mb-6">
                  Have questions? Want to learn more about Rivals? Get in touch
                  with our team!
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
                  <a
                    href="mailto:raj@rivalsapp.com"
                    className="px-6 py-3 bg-transparent border border-[#02F199] text-[#02F199] font-semibold rounded-full hover:bg-[#02F199]/10 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Email the Founder
                  </a>

                  <a
                    href="https://linkedin.com/in/raj-s-sandhu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:opacity-90 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>

                <p className="text-md text-gray-400">
                  Email: raj@rivalsapp.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rivals",
              url: "https://getrivals.com",
              logo: "https://getrivals.com/static/media/Logo1.png",
              description:
                "A competitive gaming platform where players can compete, stake, and win across any game, any format, any skill level.",
              foundingDate: "2025-01",
              founder: {
                "@type": "Person",
                name: "Raj Sandhu",
                jobTitle: "Founder & CEO",
                email: "raj@rivalsapp.com",
                sameAs: "https://linkedin.com/in/raj-s-sandhu",
              },
              sameAs: [
                "https://www.linkedin.com/company/rivals-gaming/",
                "https://discord.gg/YztnrmQT5M",
              ],
            }),
          }}
        />
      </Head>
      <AboutSection />
    </>
  );
};

export default AboutPage;

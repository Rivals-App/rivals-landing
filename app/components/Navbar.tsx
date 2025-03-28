/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface NavbarProps {
  goToEmailStep?: () => void;
  goToBlogSection?: () => void;
  goToAboutSection?: () => void; // Navigation to About section
}

const Navbar: React.FC<NavbarProps> = ({
  goToEmailStep,
  goToBlogSection,
  goToAboutSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handler for waitlist button click
  const handleWaitlistClick = (e: React.MouseEvent) => {
    if (goToEmailStep) {
      e.preventDefault();
      goToEmailStep();
    }
  };

  // Handler for blog link click
  const handleBlogClick = (e: React.MouseEvent) => {
    if (goToBlogSection) {
      e.preventDefault();
      goToBlogSection();
    }
  };

  // Handler for logo/home link click
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Important to prevent default behavior
    if (goToAboutSection) {
      goToAboutSection();
    }
  };

  // Detect scroll to add background color on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Only run animations if the ref is available
    if (!mobileMenuRef.current) return;

    try {
      if (isMobileMenuOpen) {
        mobileMenuRef.current.style.display = "block";
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (mobileMenuRef.current) {
              mobileMenuRef.current.style.display = "none";
            }
          },
        });
      }
    } catch (error) {
      console.error("Error in navbar animation:", error);
      if (mobileMenuRef.current) {
        mobileMenuRef.current.style.display = isMobileMenuOpen
          ? "block"
          : "none";
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Close the mobile menu when resizing the screen to a larger size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log("Navbar props:", {
    goToEmailStep,
    goToBlogSection,
    goToAboutSection,
  });

  return (
    <div className="relative sticky top-0 left-0 right-0 z-50 flex flex-col items-center pt-6 px-4 md:px-8">
      {/* Navbar */}
      <nav
        className={`max-w-5xl w-full rounded-full transition-all duration-300 border border-white/10 ${
          isScrolled
            ? "bg-[#121212]/20 backdrop-blur-md shadow-xl"
            : "bg-[#121212]/25 backdrop-blur-md"
        }`}
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={handleLogoClick}
                className="flex items-center cursor-pointer focus:outline-none"
              >
                <div className="relative h-8 w-auto">
                  <img
                    src="/static/media/Logo2.png"
                    alt="RIVALS Logo"
                    className="h-8 w-auto"
                  />
                </div>
              </button>
            </div>

            {/* Desktop Navigation and Action Button */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={handleBlogClick}
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 bg-transparent border-none focus:outline-none ${
                  pathname === "/blog" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Blog
              </button>
              <Link
                href="/investors"
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 ${
                  pathname === "/investors" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Investors
              </Link>
              <Link
                href="https://www.rivalsapp.com/terms-of-service"
                target="_blank"
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 ${
                  pathname === "/legal" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Legal
              </Link>
              <button
                onClick={handleWaitlistClick}
                className="inline-flex items-center px-6 py-2 text-md font-thin rounded-full bg-[#02F199] text-[#0c1622] hover:bg-[#02F199]/80 hover:text-[#FFFFFF] transition-all duration-200 ease-in-out tracking-tight"
              >
                <span>Join our waitlist</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#02F199]/20 focus:outline-none"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`absolute top-full left-0 right-0 mx-auto w-[82%] max-w-xl bg-[#121212]/95 backdrop-blur-md shadow-xl rounded-b-xl transition-all duration-300 ${
          isMobileMenuOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          <button
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#02F199] hover:bg-[#02F199]/10"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              if (goToBlogSection) {
                goToBlogSection();
              }
            }}
          >
            Blog
          </button>
          <Link
            href="/investors"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#02F199] hover:bg-[#02F199]/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Investors
          </Link>
          <Link
            href="/legal"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#02F199] hover:bg-[#02F199]/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Legal
          </Link>
          <div className="px-3 py-2 mt-4">
            <button
              className="block py-2 w-full text-center rounded-full text-base font-medium bg-[#02F199] text-[#0c1622]"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (goToEmailStep) {
                  goToEmailStep();
                }
              }}
            >
              JOIN WAITLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

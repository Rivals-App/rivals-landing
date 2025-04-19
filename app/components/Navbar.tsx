"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";

interface NavbarProps {
  goToRegisterStep?: () => void;
  goToBlogSection?: () => void;
  goToHomeSection?: () => void;
  currentStep?: number;
}

const Navbar: React.FC<NavbarProps> = ({ }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handler for navigation actions
  const handleNavigation = (
    action:
      | "home"
      | "arcade"
      | "blog"
      | "about"
      | "legal"
      | "join-us"
      | "contact-us",
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    // Always use Next.js routing
    switch (action) {
      case "home":
        router.push("/");
        break;
      case "blog":
        router.push("/blog");
        break;
      case "about":
        router.push("/about-rivals");
        break;
      case "arcade":
        router.push("/arcade");
        break;
      case "legal":
        router.push("/legal");
        break;
      case "join-us":
        router.push("/join-us");
        break;
      case "contact-us":
        router.push("/contact-us");
        break;
    }

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  // Detect scroll to add background color on scroll and resize logo and navbar padding
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);

        // Animate logo to smaller size
        if (logoRef.current) {
          gsap.to(logoRef.current, {
            height: "2rem", // Smaller size
            duration: 0.3,
            ease: "power2.out",
          });
        }

        // Animate navbar padding when scrolled
        const navbarElement = document.querySelector(".navbar-container");
        if (navbarElement) {
          gsap.to(navbarElement, {
            padding: "0.5rem 1rem",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      } else {
        setIsScrolled(false);

        // Animate logo back to original size
        if (logoRef.current) {
          gsap.to(logoRef.current, {
            height: "3rem", // Larger size
            duration: 0.3,
            ease: "power2.out",
          });
        }

        // Animate navbar padding back to original
        const navbarElement = document.querySelector(".navbar-container");
        if (navbarElement) {
          gsap.to(navbarElement, {
            padding: "1rem 1.5rem",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Set initial logo size and navbar padding
    if (logoRef.current) {
      logoRef.current.style.height = window.scrollY > 20 ? "2rem" : "3rem";
    }

    const navbarElement = document.querySelector(
      ".navbar-container"
    ) as HTMLElement;
    if (navbarElement) {
      navbarElement.style.padding =
        window.scrollY > 20 ? "0.5rem 1rem" : "1rem 1.5rem";
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
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

  // Close mobile menu on screen resize
  useEffect(() => {
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

  // Handle logo click - goes to home page
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex flex-col items-center pt-6 mb-12 px-4 md:px-8">
      {/* Navbar */}
      <nav
        className={`navbar-container max-w-[99vw] w-full rounded-full transition-all duration-300 border border-white/10 ${
          isScrolled
            ? "bg-[#121212]/20 backdrop-blur-md shadow-xl"
            : "bg-[#121212]/25 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={handleLogoClick}
                className="flex items-center cursor-pointer focus:outline-none"
              >
<<<<<<< HEAD
                <div className="relative h-8 w-auto">
                  <Image
                    src="/static/media/Logo1.png"
                    alt="RIVALS Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
=======
                <div className="relative">
                  <Image
                    ref={logoRef}
                    src="/static/media/Logo1.png"
                    alt="RIVALS Logo"
                    width={60}
                    height={60}
                    className="w-auto ml-4 transition-all duration-300"
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
                  />
                </div>
              </button>
            </div>

            {/* Desktop Navigation and Action Button */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={(e) => handleNavigation("home", e)}
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 bg-transparent border-none focus:outline-none ${
                  pathname === "/" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Home
              </button>

              <button
                onClick={(e) => handleNavigation("about", e)}
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 bg-transparent border-none focus:outline-none ${
                  pathname === "/about-rivals"
                    ? "text-[#02F199]"
                    : "text-gray-300"
                }`}
              >
                About
              </button>

              <button
                onClick={(e) => handleNavigation("blog", e)}
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 bg-transparent border-none focus:outline-none ${
                  pathname === "/blog" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Blog
              </button>

              <button
                onClick={(e) => handleNavigation("arcade", e)}
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 bg-transparent border-none focus:outline-none ${
                  pathname === "/arcade" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Arcade
              </button>

              <button
                onClick={(e) => handleNavigation("legal", e)}
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 bg-transparent border-none focus:outline-none ${
                  pathname === "/legal" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Legal
              </button>

              <button
                onClick={(e) => handleNavigation("contact-us", e)}
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 bg-transparent border-none focus:outline-none ${
                  pathname === "/contact-us"
                    ? "text-[#02F199]"
                    : "text-gray-300"
                }`}
              >
                Contact Us
              </button>

              <Link
                href="https://getrivals.com"
                target="_blank"
                className={`text-md font-medium hover:text-[#02F199] transition-colors duration-200 ${
                  pathname === "https://getrivals.com"
                    ? "text-[#02F199]"
                    : "text-gray-300"
                }`}
              >
                Try Our Demo
              </Link>

              <button
                onClick={(e) => handleNavigation("join-us", e)}
                className="inline-flex items-center px-6 py-2 text-md font-thin rounded-full bg-[#02F199] text-[#0c1622] hover:bg-[#02F199]/80 hover:text-[#FFFFFF] transition-all duration-200 ease-in-out tracking-tight"
              >
                <span>Join Waitlist</span>
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
        className="md:hidden absolute top-full left-0 right-0 mx-auto w-[82%] max-w-xl bg-[#121212]/50 backdrop-blur-md shadow-xl rounded-b-xl transition-all duration-300 opacity-0"
        style={{ display: "none", transform: "translateY(-10px)" }}
      >
        <div className="px-4 py-4 space-y-2">
          <button
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/" ? "text-[#02F199]" : "text-gray-300"
            } hover:text-[#02F199] hover:bg-[#02F199]/10`}
            onClick={(e) => handleNavigation("home", e)}
          >
            Home
          </button>

          <button
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/about-rivals" ? "text-[#02F199]" : "text-gray-300"
            } hover:text-[#02F199] hover:bg-[#02F199]/10`}
            onClick={(e) => handleNavigation("about", e)}
          >
            About
          </button>

          <button
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/blog" ? "text-[#02F199]" : "text-gray-300"
            } hover:text-[#02F199] hover:bg-[#02F199]/10`}
            onClick={(e) => handleNavigation("blog", e)}
          >
            Blog
          </button>

          <button
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/arcade" ? "text-[#02F199]" : "text-gray-300"
            } hover:text-[#02F199] hover:bg-[#02F199]/10`}
            onClick={(e) => handleNavigation("arcade", e)}
          >
            Arcade
          </button>

          <button
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/legal" ? "text-[#02F199]" : "text-gray-300"
            } hover:text-[#02F199] hover:bg-[#02F199]/10`}
            onClick={(e) => handleNavigation("legal", e)}
          >
            Legal
          </button>

          <button
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/contact-us" ? "text-[#02F199]" : "text-gray-300"
            } hover:text-[#02F199] hover:bg-[#02F199]/10`}
            onClick={(e) => handleNavigation("contact-us", e)}
          >
            Contact Us
          </button>

          <Link
            href="https://getrivals.com"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#02F199] hover:bg-[#02F199]/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Try Our Demo
          </Link>

          <div className="px-3 py-2 mt-4">
            <button
              className="block py-2 w-full text-center rounded-full text-base font-medium bg-[#02F199] text-[#0c1622] hover:bg-[#02F199]/80 hover:text-[#FFFFFF] transition-all duration-200"
              onClick={(e) => handleNavigation("join-us", e)}
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

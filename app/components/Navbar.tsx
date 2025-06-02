"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import JoinWaitlistButton from "./JoinWaitlistButton";

interface NavbarProps {
  goToRegisterStep?: () => void;
  goToBlogSection?: () => void;
  goToHomeSection?: () => void;
  currentStep?: number;
}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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

  // Simple scroll detection without animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Initial check on mount
    handleScroll();

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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
    <div className="sticky top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 mb-8 px-4 md:px-8">
      {/* Navbar */}
      <nav
        className={`navbar-container max-w-[99vw] w-full py-3 px-4 rounded-full border border-white/10 ${
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
                className="flex items-center p-2 ml-4 cursor-pointer focus:outline-none"
              >
                <div className="relative">
                  <Image
                    src="/static/media/Logo1.png"
                    alt="RIVALS Logo"
                    width={50}
                    height={50}
                    draggable={false}
                  />
                </div>
              </button>
            </div>

            {/* Desktop Navigation and Action Button */}
            <div className="hidden lg:flex items-center space-x-6 pr-4">
              <button
                onClick={(e) => handleNavigation("home", e)}
                className={`text-lg font-medium hover:text-[#02F199] bg-transparent border-none focus:outline-none ${
                  pathname === "/" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Home
              </button>

              <button
                onClick={(e) => handleNavigation("about", e)}
                className={`text-lg font-medium hover:text-[#02F199] bg-transparent border-none focus:outline-none ${
                  pathname === "/about-rivals"
                    ? "text-[#02F199]"
                    : "text-gray-300"
                }`}
              >
                About
              </button>

              <button
                onClick={(e) => handleNavigation("blog", e)}
                className={`text-lg font-medium hover:text-[#02F199] bg-transparent border-none focus:outline-none ${
                  pathname === "/blog" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Blog
              </button>

              <button
                onClick={(e) => handleNavigation("arcade", e)}
                className={`text-lg font-medium hover:text-[#02F199] bg-transparent border-none focus:outline-none ${
                  pathname === "/arcade" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Arcade
              </button>

              {/* <button
                onClick={(e) => handleNavigation("legal", e)}
                className={`text-lg font-medium hover:text-[#02F199] bg-transparent border-none focus:outline-none ${
                  pathname === "/legal" ? "text-[#02F199]" : "text-gray-300"
                }`}
              >
                Legal
              </button> */}

              <button
                onClick={(e) => handleNavigation("contact-us", e)}
                className={`text-lg font-medium hover:text-[#02F199] bg-transparent border-none focus:outline-none ${
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
                className={`text-lg font-medium hover:text-[#02F199] ${
                  pathname === "https://getrivals.com"
                    ? "text-[#02F199]"
                    : "text-gray-300"
                }`}
              >
                Try Our Demo
              </Link>

              <JoinWaitlistButton className="inline-flex items-center px-5 py-2 text-md tracking-tight" />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center mr-4">
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
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 right-0 mx-auto w-[82%] max-w-xl bg-[#121212]/50 backdrop-blur-md shadow-xl rounded-b-xl"
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
                pathname === "/about-rivals"
                  ? "text-[#02F199]"
                  : "text-gray-300"
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

            {/* <button
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/legal" ? "text-[#02F199]" : "text-gray-300"
              } hover:text-[#02F199] hover:bg-[#02F199]/10`}
              onClick={(e) => handleNavigation("legal", e)}
            >
              Legal
            </button> */}

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
              <JoinWaitlistButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

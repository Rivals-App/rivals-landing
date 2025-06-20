/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import JoinWaitlistButton from "./JoinWaitlistButton";
import Script from "next/script";
import { WithContext, FAQPage } from "schema-dts";

const Footer = () => {
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

    // Use Next.js routing
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
  };

  // Add this FAQ schema inside the Footer component before the return statement
  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Rivals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rivals is a skill-based gaming platform where players can compete against each other and win real money rewards based on their performance and skills."
        }
      },
      {
        "@type": "Question",
        "name": "How do I earn money on Rivals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can earn money on Rivals by participating in 1v1 matches, team competitions, or tournaments. Place a wager on yourself or your team and win real rewards based on your gaming performance."
        }
      },
      {
        "@type": "Question",
        "name": "What games are available on Rivals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rivals offers a variety of competitive games, including popular esports titles, arcade games, and skill-based casual games across different platforms."
        }
      },
      {
        "@type": "Question",
        "name": "How does Rivals match players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rivals uses a sophisticated skill-based matchmaking system to ensure you're paired with players of similar skill level for fair and competitive gameplay."
        }
      }
    ]
  };

  return (
    <footer className="bg-[#1D1D1D]/90 backdrop-blur-lg border-t border-t-[#02F199]/20 text-white py-12 rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Row: Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Logo and About */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Image
                draggable={false}
                src="/static/media/Logo2.png"
                alt="RIVALS Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Take your gaming to the next level with RIVALS. Compete in
              skill-based matches, win real rewards, and become part of the
              ultimate competitive gaming community.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.linkedin.com/company/rivals-gaming/"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-[#02F199] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.2c-.96 0-1.75-.78-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 11.2h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.6z" />
                </svg>
              </a>

              {/* Instagram Icon - Add this new icon */}
              <a
                href="https://www.instagram.com/rivals.app/"
                aria-label="Instagram"
                className="text-gray-400 hover:text-[#02F199] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://x.com/Rivals_App"
                aria-label="Twitter"
                className="text-gray-400 hover:text-[#02F199] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  className="h-5 w-5"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 512 462.799"
                >
                  <path
                    fillRule="nonzero"
                    d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
                  />
                </svg>
              </a>
              <a
                href="https://discord.gg/YztnrmQT5M"
                aria-label="Discord"
                className="text-gray-400 hover:text-[#02F199] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  className="h-5 w-5"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 512 388.049"
                >
                  <path
                    fillRule="nonzero"
                    d="M433.713 32.491A424.231 424.231 0 00328.061.005c-4.953 8.873-9.488 18.156-13.492 27.509a393.937 393.937 0 00-58.629-4.408c-19.594 0-39.284 1.489-58.637 4.37-3.952-9.33-8.543-18.581-13.525-27.476-36.435 6.212-72.045 17.196-105.676 32.555-66.867 98.92-84.988 195.368-75.928 290.446a425.967 425.967 0 00129.563 65.03c10.447-14.103 19.806-29.116 27.752-44.74a273.827 273.827 0 01-43.716-20.862c3.665-2.658 7.249-5.396 10.712-8.055 40.496 19.019 84.745 28.94 129.514 28.94 44.77 0 89.019-9.921 129.517-28.943 3.504 2.86 7.088 5.598 10.712 8.055a275.576 275.576 0 01-43.796 20.918 311.49 311.49 0 0027.752 44.705 424.235 424.235 0 00129.65-65.019l-.011.011c10.632-110.26-18.162-205.822-76.11-290.55zM170.948 264.529c-25.249 0-46.11-22.914-46.11-51.104 0-28.189 20.135-51.304 46.029-51.304 25.895 0 46.592 23.115 46.15 51.304-.443 28.19-20.336 51.104-46.069 51.104zm170.102 0c-25.29 0-46.069-22.914-46.069-51.104 0-28.189 20.135-51.304 46.069-51.304s46.472 23.115 46.029 51.304c-.443 28.19-20.296 51.104-46.029 51.104z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-[#02F199] uppercase text-sm tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleNavigation("home", e)}
                    className="text-gray-300 hover:text-[#02F199] transition-colors duration-200 text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about-rivals"
                    onClick={(e) => handleNavigation("about", e)}
                    className="text-gray-300 hover:text-[#02F199] transition-colors duration-200 text-sm"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    onClick={(e) => handleNavigation("blog", e)}
                    className="text-gray-300 hover:text-[#02F199] transition-colors duration-200 text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/arcade"
                    onClick={(e) => handleNavigation("arcade", e)}
                    className="text-gray-300 hover:text-[#02F199] transition-colors duration-200 text-sm"
                  >
                    Arcade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#02F199] uppercase text-sm tracking-wider">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/legal"
                    onClick={(e) => handleNavigation("legal", e)}
                    className="text-gray-300 hover:text-[#02F199] transition-colors duration-200 text-sm"
                  >
                    Legal
                  </a>
                </li>
                <li>
                  <a
                    href="/contact-us"
                    onClick={(e) => handleNavigation("contact-us", e)}
                    className="text-gray-300 hover:text-[#02F199] transition-colors duration-200 text-sm"
                  >
                    Contact Us
                  </a>
                </li>
                {/* <li>
                  <a
                    href="https://getrivals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#02F199] transition-colors duration-200 text-sm"
                  >
                    Try Our Demo
                  </a>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Join Waitlist */}
          <div className="flex flex-col justify-start items-start">
            <h4 className="font-bold mb-4 text-[#02F199] uppercase text-sm tracking-wider">
              Join our community
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Sign up to be among the first to experience competitive gaming
              redefined.
            </p>
            <JoinWaitlistButton className="w-fit" />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <div className="w-[80%]">© 2025 Rivals. All rights reserved. Rivals is not endorsed by, directly affiliated with, maintained or sponsored by Apple Inc, Electronic Arts, Activision Blizzard, Take-Two Interactive, Microsoft, Xbox, Sony, Playstation, Epic Games, NetEase Games, Marvel Games, Supercell, or any game development company unless specifically stated otherwise. All content, games titles, trade names and/or trade dress, trademarks, artwork and associated imagery are trademarks and/or copyright material of their respective owners.</div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="/legal"
              onClick={(e) => handleNavigation("legal", e)}
              className="hover:text-[#02F199] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/legal"
              onClick={(e) => handleNavigation("legal", e)}
              className="hover:text-[#02F199] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Add this Script component right after the opening <footer> tag */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
    </footer>
  );
};

export default Footer;

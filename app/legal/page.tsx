"use client";
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Legal document content
const legalDocuments = {
  terms: {
    title: "Website Terms of Use",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Introduction",
        text: 'Rivals, a trading name of Rivals Gaming Ltd (Company No. 16249665), registered at 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ ("we," "us," or "our"). By accessing or using Rivals, you agree to these Terms of Service ("Terms"). If you do not agree, please refrain from using our services.',
      },
      {
        title: "1. Eligibility",
        text: "1.1. You must be at least 18 years old to use Rivals.\n\n1.2. If you are under 18 but at least 13, you may use Rivals only if your parent or legal guardian creates an account on your behalf and agrees to these Terms.\n\n1.3. Users under 13 are not permitted to access Rivals.",
      },
      {
        title: "2. Accounts",
        text: "2.1. Each individual is allowed one account. Creating multiple accounts may result in termination.\n\n2.2. Users are responsible for maintaining the security of their accounts.\n\n2.3. In the future, account verification may require ID checks to confirm your identity.",
      },
      // Additional sections...
    ],
  },
  conditions: {
    title: "Rivals Terms & Conditions",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Introduction",
        text: "These Terms and Conditions govern your use of the Rivals platform and services. By registering for and using Rivals, you accept and agree to be bound by these Terms and Conditions.",
      },
      {
        title: "1. Service Description",
        text: "1.1. Rivals provides a platform for skill-based gaming competitions.\n\n1.2. Users can participate in matches, tournaments and other competitive formats.\n\n1.3. Rivals is not gambling – outcomes are primarily determined by player skill.",
      },
      // Additional sections...
    ],
  },
  dataProtection: {
    title: "Data Protection",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Data Protection Notice",
        text: "Rivals Gaming Ltd is committed to protecting and respecting your privacy. This Data Protection Notice explains how we collect, use, and safeguard your personal information.",
      },
      {
        title: "1. Data Controller",
        text: "1.1. Rivals Gaming Ltd (Company No. 16249665) is the data controller responsible for your personal data.\n\n1.2. We are registered with the Information Commissioner's Office (ICO) in the United Kingdom.",
      },
      // Additional sections...
    ],
  },
  privacy: {
    title: "Privacy Policy",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Introduction",
        text: "This Privacy Policy explains how Rivals Gaming Ltd collects, uses, and protects your personal information when you use our platform. We are committed to ensuring the privacy and security of your data.",
      },
      {
        title: "1. Information We Collect",
        text: "1.1. Account Information: Name, email address, date of birth, and other details provided during registration.\n\n1.2. Financial Information: Payment details, transaction history, and withdrawal information.\n\n1.3. Gameplay Data: Game statistics, match history, and interaction with other users.\n\n1.4. Technical Data: IP address, device information, browser type, and operating system.",
      },
      // Additional sections...
    ],
  },
  cookies: {
    title: "Cookie Policy",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Introduction",
        text: "This Cookie Policy explains how Rivals Gaming Ltd uses cookies and similar technologies on our website and platform.",
      },
      {
        title: "1. What Are Cookies",
        text: "1.1. Cookies are small text files that are stored on your device when you visit a website.\n\n1.2. They help the website recognize your device and remember certain information about your visit.",
      },
      // Additional sections...
    ],
  },
  acceptableUse: {
    title: "Acceptable Use Policy",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Introduction",
        text: "This Acceptable Use Policy outlines the rules governing how you may use the Rivals platform and services.",
      },
      {
        title: "1. Prohibited Activities",
        text: "1.1. Harassment or bullying of other users.\n\n1.2. Cheating or exploiting game mechanics.\n\n1.3. Creating multiple accounts to gain unfair advantages.",
      },
      // Additional sections...
    ],
  },
  skillGaming: {
    title: "Legality of Skill Gaming",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Introduction",
        text: "This document provides information about the legal status of skill-based gaming competitions on the Rivals platform.",
      },
      {
        title: "1. Skill vs. Chance",
        text: "1.1. Rivals provides competitions where the outcome is primarily determined by player skill, not chance.\n\n1.2. Games that require physical or mental skill differentiate our platform from traditional gambling services.",
      },
      // Additional sections...
    ],
  },
  companies: {
    title: "Rivals Companies",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Corporate Structure",
        text: "Information about the Rivals corporate structure, subsidiaries, and registered entities.",
      },
      {
        title: "1. Main Operating Entity",
        text: "1.1. Rivals Gaming Ltd\n\n1.2. Company Registration: 16249665\n\n1.3. Registered Address: 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ",
      },
      // Additional sections...
    ],
  },
};

const LegalPage = () => {
  // Default to terms if no slug is provided
  const [activeDocument, setActiveDocument] = useState("terms");

  // Extract the slug from the URL path on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const segments = path.split("/");
      const lastSegment = segments[segments.length - 1];

      // Check if the lastSegment is a valid document key
      if (lastSegment && Object.keys(legalDocuments).includes(lastSegment)) {
        setActiveDocument(lastSegment);
      }
    }
  }, []);

  // Menu items for sidebar and dropdown
  const menuItems = [
    { id: "terms", label: "Website Terms of Use", path: "/legal/terms" },
    {
      id: "conditions",
      label: "Rivals Terms & Conditions",
      path: "/legal/conditions",
    },
    {
      id: "dataProtection",
      label: "Data Protection",
      path: "/legal/dataProtection",
    },
    { id: "privacy", label: "Privacy Policy", path: "/legal/privacy" },
    { id: "cookies", label: "Cookie Policy", path: "/legal/cookies" },
    {
      id: "acceptableUse",
      label: "Acceptable Use",
      path: "/legal/acceptableUse",
    },
    {
      id: "skillGaming",
      label: "Legality of Skill Gaming",
      path: "/legal/skillGaming",
    },
    { id: "companies", label: "Rivals Companies", path: "/legal/companies" },
  ];

  // Animation setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".legal-hero", { opacity: 0, y: 50, duration: 1 });
      gsap.from(".legal-sidebar", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: 0.3,
      });
      gsap.from(".legal-content", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, [activeDocument]);

  // Get the current document data
  const currentDoc =
    legalDocuments[activeDocument as keyof typeof legalDocuments] ||
    legalDocuments.terms;

  // Handle document change without router dependency
  const handleDocChange = (docId: string) => {
    setActiveDocument(docId);

    // Navigate using window.location for client-side navigation
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `/legal/${docId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          height: "100vh",
          width: "100vw",
          background: `linear-gradient(
            90deg,
            rgba(255,255,255,0.1) 1px,
            transparent 1px 45px
          )
          50% 50% / 45px 45px,
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px 45px)
          50% 50% / 45px 45px`,
          mask: "linear-gradient(-20deg, transparent 50%, black)",
          zIndex: 0,
        }}
      ></div>

      <div className="w-full min-h-screen flex flex-col bg-transparent relative z-10">
        <Navbar />

        {/* Header Section */}
        <div className="legal-hero pt-14 md:pt-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            <span className="text-[#02F199]">RIVALS</span> LEGAL
          </h1>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12">
            This section outlines the legal documents governing the use of
            Rivals, including terms, policies, and company registrations. By
            using our platform, you agree to the terms detailed here.
          </p>

          {/* Mobile dropdown */}
          <div className="md:hidden w-full mb-6">
            <select
              className="w-full p-3 bg-[#121212]/40 border border-white/20 text-white rounded-lg"
              value={activeDocument}
              onChange={(e) => handleDocChange(e.target.value)}
            >
              {menuItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content Area with Sidebar */}
        <div className="flex-grow pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar - Desktop Only */}
            <div className="legal-sidebar hidden md:block md:w-64 lg:w-72 flex-shrink-0">
              <div className="bg-[#121212]/30 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl sticky top-24">
                <div className="p-4 border-b border-white/10">
                  <h2 className="font-bold text-xl text-white">
                    Legal Documents
                  </h2>
                </div>
                <nav className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleDocChange(item.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors mb-1 ${
                        activeDocument === item.id
                          ? "bg-[#02F199]/20 text-[#02F199] font-medium"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Panel */}
            <div className="legal-content flex-grow">
              <div className="bg-[#121212]/30 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl p-6 md:p-8">
                {currentDoc ? (
                  <article>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {currentDoc.title}
                    </h2>
                    <p className="text-[#02F199] mb-6">
                      Effective Date: {currentDoc.effectiveDate}
                    </p>

                    <div className="space-y-8">
                      {currentDoc.content.map((section, index) => (
                        <section key={index}>
                          <h3 className="text-xl font-semibold text-white mb-4">
                            {section.title}
                          </h3>
                          <div className="text-gray-300 whitespace-pre-wrap">
                            {section.text.split("\n").map((line, i) => (
                              <p key={i} className="mb-2">
                                {line}
                              </p>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </article>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-300">
                      This content is coming soon. We are currently updating our
                      legal documents.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalPage;

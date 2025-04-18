"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

interface RegistrationScreenProps {
  email: string;
  firstName: string;
  lastName: string;
  onEmailChange: (email: string) => void;
  onFirstNameChange: (firstName: string) => void;
  onLastNameChange: (lastName: string) => void;
  onContinue: (preferredConsole: string) => void;
  onBack?: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  email,
  firstName,
  lastName,
  onEmailChange,
  onFirstNameChange,
  onLastNameChange,
  onContinue,
  onBack,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [preferredConsole, setPreferredConsole] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // If onBack is not provided, default to navigating to home
  const handleBack = onBack || (() => router.push("/"));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(".reg-title, .reg-subtitle, .reg-form, .reg-back", {
      opacity: 0,
      y: 20,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.to(".reg-back", {
      opacity: 1,
      y: 0,
      duration: 0.4,
    }).to(".reg-title, .reg-subtitle, .reg-form", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim()) {
      setError("Please enter your first name");
      return;
    }

    if (!lastName.trim()) {
      setError("Please enter your last name");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!preferredConsole) {
      setError("Please select your preferred console");
      return;
    }

    // Pass the selected console to the parent component
    onContinue(preferredConsole);
  };

  return (
    <div className="h-full w-full px-12 flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto relative" ref={containerRef}>
        <h2 className="reg-title text-3xl md:text-5xl font-bold mb-4 text-center">
          Join the Waitlist
        </h2>
        <p className="reg-subtitle text-gray-300 mb-8 text-center">
          Be the first to know when we launch
        </p>

        <form onSubmit={handleSubmit} className="reg-form space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-[#02F199]"
                value={firstName}
                onChange={(e) => onFirstNameChange(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-[#02F199]"
                value={lastName}
                onChange={(e) => onLastNameChange(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-[#02F199]"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              value={preferredConsole}
              onChange={(e) => setPreferredConsole(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-[#02F199] text-white"
              style={{ backgroundColor: "#0F2841" }}
              required
            >
              <option
                value=""
                disabled
                style={{ backgroundColor: "#0A1928", color: "white" }}
              >
                Preferred Console
              </option>
              <option
                value="PC"
                style={{ backgroundColor: "#0A1928", color: "white" }}
              >
                PC
              </option>
              <option
                value="PS"
                style={{ backgroundColor: "#0A1928", color: "white" }}
              >
                PlayStation
              </option>
              <option
                value="XBOX"
                style={{ backgroundColor: "#0A1928", color: "white" }}
              >
                Xbox
              </option>
              <option
                value="Other"
                style={{ backgroundColor: "#0A1928", color: "white" }}
              >
                Other
              </option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="w-full flex flex-row justify-between align-bottom">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="w-1/5 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            >
              Home
            </button>
            <button
              type="submit"
              className="reg-back w-4/5 ml-4 py-2 bg-[#02F199] text-[#0c412e] font-semibold rounded-lg hover:bg-[#02F199]/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationScreen;

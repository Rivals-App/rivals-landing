/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface BirthdayScreenProps {
  birthday: string;
  onBirthdayChange: (birthday: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const BirthdayScreen: React.FC<BirthdayScreenProps> = ({
  birthday,
  onBirthdayChange,
  onContinue,
  onBack,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(".bday-title, .bday-subtitle, .bday-form, .bday-back", {
      opacity: 0,
      y: 20,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.to(".bday-back", {
      opacity: 1,
      y: 0,
      duration: 0.4,
    }).to(".bday-title, .bday-subtitle, .bday-form", {
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

    if (!month || !year) {
      setError("Please select both month and year.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(parseInt(year), parseInt(month) - 1);

    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    const isOver18 =
      age > 18 ||
      (age === 18 && currentDate.getMonth() >= selectedDate.getMonth());

    if (!isOver18) {
      setError("You must be at least 18 years old to register.");
      return;
    }

    setError("");
    const formattedDate = `${year}-${month.padStart(2, "0")}-01`;
    onBirthdayChange(formattedDate);
    onContinue();
  };

  return (
    <div className="h-full w-full px-12 flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto relative" ref={containerRef}>
        <h2 className="bday-title text-3xl md:text-5xl font-bold mb-4 text-center">
          One More Step
        </h2>
        <p className="bday-subtitle text-gray-300 mb-8 text-center">
          Please enter your birth month and year
        </p>

        <form onSubmit={handleSubmit} className="bday-form space-y-4">
          <div className="relative">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-[#02F199] text-white appearance-none"
              required
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2302F199' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '35px'
              }}
            >
              <option value="" disabled className="bg-black text-white">
                Select Month
              </option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((monthName, index) => (
                <option key={index} value={(index + 1).toString()} className="bg-black text-white">
                  {monthName}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="Enter Year"
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-[#02F199]"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min={1900}
              max={new Date().getFullYear()}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="w-full flex flex-row justify-between align-bottom">
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="bday-back w-1/3 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              Go back
            </button>
            <button
              type="submit"
              className="w-2/3 ml-4 py-2 bg-[#02F199] text-[#0c412e] font-semibold rounded-lg hover:bg-[#02F199]/90 transition-colors"
            >
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BirthdayScreen;

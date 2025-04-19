/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
<<<<<<< HEAD
=======

>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
interface ConfirmationScreenProps {
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    preferredConsole: string;
    position: number;
    referralCode: string;
    referrals: number;
    referralsNeeded: number;
  };
  onBack: () => void;
  onGoToAbout?: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  userData,
  onBack,
  onGoToAbout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(
      ".conf-title, .conf-subtitle, .conf-icon, .conf-back, .referral-section",
      {
        opacity: 0,
        y: 20,
      }
    );

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.to(".conf-back", {
      opacity: 1,
      y: 0,
      duration: 0.4,
    })
      .to(".conf-title, .conf-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      })
      .to(
        ".conf-icon",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .to(
        ".referral-section",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="h-full w-full px-4 md:px-12 flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto relative" ref={containerRef}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
<<<<<<< HEAD
=======
            width={80}
            height={80}
>>>>>>> 8f26c83f8856a2c467766dad8f41296032c8d780
            src="/static/svgs/Asset-2.svg"
            alt="logo"
            width={80}
            height={80}
            className="form-logo"
            draggable={false}
          />
        </div>

        <h2 className="conf-title text-3xl font-bold mb-6 text-center">
          You're All Set!
        </h2>

        <div className="conf-subtitle text-gray-300 mb-8 text-center">
          <p className="mb-2">
            Thanks for joining our waitlist, {userData.firstName}!
          </p>
          <p className="mb-4">
            Your position in line:{" "}
            <span className="text-[#02F199] font-bold">
              #{userData.position}
            </span>
          </p>
          <p>
            We'll notify you at{" "}
            <span className="font-medium">{userData.email}</span> when we
            launch! In the meantime feel free to try our{" "}
            <a
              href="https://getrivals.com/authentication"
              target="_blank"
              className="text-[#02F199] border-b border-[#02F199]"
            >
              demo
            </a>{" "}
            or go back to our{" "}
            <a
              onClick={onGoToAbout || onBack}
              className="text-[#02F199] border-b border-[#02F199] bg-transparent cursor-pointer"
            >
              main page
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;

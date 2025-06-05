/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { gsap, Power2 } from "gsap";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import RegistrationScreen from "../components/onboarding/RegistrationScreen";
import BirthdayScreen from "../components/onboarding/BirthdayScreen";
import ConfirmationScreen from "../components/onboarding/ConfirmationScreen";


const JoinUsPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    preferredConsole: "",
    birthday: "",
    referralCode: "",
    registrationSuccess: false,
    position: 0,
    referrals: 0,
    referralsNeeded: 0,
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const goToNextStep = () => {
    const currentStepEl = `.step-${currentStep}`;
    const nextStepEl = `.step-${currentStep + 1}`;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep((prev) => prev + 1);
      },
    });

    // Animate current step out
    tl.to(currentStepEl, {
      opacity: 0,
      x: -30,
      duration: 0.4,
      ease: "power2.in",
      force3D: true,
      onComplete: () => {
        gsap.set(currentStepEl, { display: "none" });
      },
    });

    tl.add(() => {
      gsap.set(nextStepEl, { display: "block", opacity: 0, x: 30, force3D: true });
    });

    // Animate next step in
    tl.to(nextStepEl, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      force3D: true,
    });
  };

  const goToPreviousStep = () => {
    if (currentStep <= 1) return;

    const currentStepEl = `.step-${currentStep}`;
    const prevStepEl = `.step-${currentStep - 1}`;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep((prev) => prev - 1);
      },
    });

    // Animate current step out (to the right)
    tl.to(currentStepEl, {
      opacity: 0,
      x: 30,
      duration: 0.4,
      ease: "power2.in",
      force3D: true,
      onComplete: () => {
        gsap.set(currentStepEl, { display: "none" });
      },
    });

    // Set up previous step and animate it in (from the left)
    tl.add(() => {
      gsap.set(prevStepEl, { display: "block", opacity: 0, x: -30, force3D: true });
    });

    // Animate previous step in
    tl.to(prevStepEl, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      force3D: true,
    });
  };

  const goToHomeSection = () => {
    router.push("/");
  };

  const handleFirstNameChange = (firstName: string) => {
    setUserInfo((prev) => ({ ...prev, firstName }));
  };

  const handleLastNameChange = (lastName: string) => {
    setUserInfo((prev) => ({ ...prev, lastName }));
  };

  const handleEmailChange = (email: string) => {
    setUserInfo((prev) => ({ ...prev, email }));
  };

  const handleEmailContinue = (preferredConsole: string) => {
    setUserInfo((prev) => ({ ...prev, preferredConsole }));
    goToNextStep();
  };

  const handleBirthdayChange = (birthday: string) => {
    setUserInfo((prev) => ({ ...prev, birthday }));
  };

  const handleBirthdayContinue = async () => {
    setIsLoading(true);

    try {
      // STEP 1: Check if email already exists
      console.log("Checking if email exists:", userInfo.email);
      const checkResponse = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userInfo.email }),
      });

      console.log("Check email response status:", checkResponse.status);
      const checkData = await checkResponse.json();
      console.log("Check email response data:", checkData);

      // IMMEDIATELY HANDLE DUPLICATE EMAIL (409 Conflict)
      if (checkResponse.status === 409) {
        console.error("Email already exists:", checkResponse.status, checkData);
        setUserInfo((prev) => ({
          ...prev,
          error: checkData.error || "This email is already registered."
        }));
        setIsLoading(false);
        return; // STOP HERE - DO NOT PROCEED
      }

      // For any other non-200 response
      if (!checkResponse.ok) {
        console.error("Other API error:", checkResponse.status, checkData);
        throw new Error(checkData.error || "An error occurred");
      }

      // If email doesn't exist, proceed with registration
      console.log("Email check passed, registering user");
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          preferredConsole: userInfo.preferredConsole,
          birthday: userInfo.birthday,
          referredBy: userInfo.referralCode,
        }),
      });

      console.log("Registration response status:", response.status);
      const data = await response.json();
      console.log("Registration response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Registration successful
      setUserInfo((prev) => ({
        ...prev,
        registrationSuccess: true,
        position: data.data.position,
        referrals: data.data.referrals,
        referralsNeeded: data.data.referralsNeeded,
        referralCode: data.data.referral_code,
      }));

      console.log("Registration successful, proceeding to next step");
      goToNextStep(); // Go to confirmation screen
    } catch (error) {
      console.error("Registration error:", error);
      setUserInfo((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial animation setup
    gsap.set(".step-1, .step-2, .step-3", {
      opacity: 0,
      x: 30,
      display: "none",
      force3D: true,
    });
    gsap.set(".step-1", { opacity: 1, x: 0, display: "block", force3D: true });
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

      {/* Navbar */}
      <Navbar goToHomeSection={goToHomeSection} currentStep={currentStep} />

      <div className="w-full min-h-screen flex flex-col items-center bg-transparent relative z-10 pt-16">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#02F199]"></div>
          </div>
        )}

        {/* Error Message */}
        {userInfo.error && (
          <div className="fixed bottom-4 left-0 right-0 mx-auto w-max bg-red-500 text-white px-4 py-2 rounded-lg z-50">
            {userInfo.error}
            <button
              onClick={() => setUserInfo((prev) => ({ ...prev, error: "" }))}
              className="ml-3 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Step 1: Registration Screen */}
        <div className="step-1 w-full h-full pt-4 pb-20">
          <RegistrationScreen
            firstName={userInfo.firstName}
            lastName={userInfo.lastName}
            email={userInfo.email}
            onFirstNameChange={handleFirstNameChange}
            onLastNameChange={handleLastNameChange}
            onEmailChange={handleEmailChange}
            onContinue={handleEmailContinue}
            onBack={goToHomeSection}
          />
        </div>

        {/* Step 2: Birthday Screen */}
        <div className="step-2 w-full h-full pt-4 pb-20">
          <BirthdayScreen
            birthday={userInfo.birthday}
            onBirthdayChange={handleBirthdayChange}
            onContinue={handleBirthdayContinue}
            onBack={goToPreviousStep}
          />
        </div>

        {/* Step 3: Confirmation Screen */}
        <div className="step-3 w-full h-full pt-4 pb-20">
          <ConfirmationScreen
            userData={userInfo}
            onBack={goToPreviousStep}
            onGoToAbout={goToHomeSection}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;

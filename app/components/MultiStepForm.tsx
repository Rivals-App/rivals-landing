/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import WelcomeScreen from "./onboarding/WelcomeSection";
import AboutSection from "./onboarding/AboutSection";
import RegistrationScreen from "./onboarding/RegistrationScreen";
import BirthdayScreen from "./onboarding/BirthdayScreen";
import ConfirmationScreen from "./onboarding/ConfirmationScreen";
import BlogSection from "./onboarding/BlogSection"; // Fixed import path

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    email: "",
    birthday: "",
  });

  console.log("Current step:", currentStep);

  // Transition to next step with direct GSAP animation
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
      onComplete: () => {
        gsap.set(currentStepEl, { display: "none" });
      },
    });

    // Set up next step and animate it in
    tl.add(() => {
      gsap.set(nextStepEl, { display: "block", opacity: 0, x: 30 });
    });

    // Animate next step in
    tl.to(nextStepEl, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Go back to previous step with animation
  const goToPreviousStep = () => {
    if (currentStep === 0) return; // Can't go back from first step

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
      onComplete: () => {
        gsap.set(currentStepEl, { display: "none" });
      },
    });

    // Set up previous step and animate it in (from the left)
    tl.add(() => {
      gsap.set(prevStepEl, { display: "block", opacity: 0, x: -30 });
    });

    // Animate previous step in
    tl.to(prevStepEl, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Go directly to About section (step 1) with animation
  const goToAboutSection = () => {
    console.log("Going to About section");

    if (currentStep === 1) return; // Already in About section

    const currentStepEl = `.step-${currentStep}`;
    const aboutStepEl = ".step-1";

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep(1); // Set to About section (step 1)
      },
    });

    // Animate current step out
    tl.to(currentStepEl, {
      opacity: 0,
      x: 30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(currentStepEl, { display: "none" });
      },
    });

    // Set up About step and animate it in
    tl.add(() => {
      gsap.set(aboutStepEl, { display: "block", opacity: 0, x: -30 });
    });

    // Animate About step in
    tl.to(aboutStepEl, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Go directly to Blog section (step 5) with animation
  const goToBlogSection = () => {
    console.log("Going to Blog section");

    if (currentStep === 5) return; // Already in Blog section

    const currentStepEl = `.step-${currentStep}`;
    const blogStepEl = ".step-5";

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep(5); // Set to Blog section (step 5)
      },
    });

    // Animate current step out
    tl.to(currentStepEl, {
      opacity: 0,
      x: 30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(currentStepEl, { display: "none" });
      },
    });

    // Set up Blog step and animate it in
    tl.add(() => {
      gsap.set(blogStepEl, { display: "block", opacity: 0, x: -30 });
    });

    // Animate Blog step in
    tl.to(blogStepEl, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Go directly to Email step (step 2) with animation
  const goToEmailStep = () => {
    console.log("Going to Email step");

    if (currentStep === 2) return; // Already in Email section

    const currentStepEl = `.step-${currentStep}`;
    const emailStepEl = ".step-2";

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep(2); // Set to Email section (step 2)
      },
    });

    // Animate current step out
    tl.to(currentStepEl, {
      opacity: 0,
      x: -30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(currentStepEl, { display: "none" });
      },
    });

    // Set up Email step and animate it in
    tl.add(() => {
      gsap.set(emailStepEl, { display: "block", opacity: 0, x: 30 });
    });

    // Animate Email step in
    tl.to(emailStepEl, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Handle email update
  const handleEmailChange = (email: string) => {
    setUserInfo((prev) => ({ ...prev, email }));
  };

  // Handle birthday update
  const handleBirthdayChange = (birthday: string) => {
    setUserInfo((prev) => ({ ...prev, birthday }));
  };

  // Set initial visibility
  useEffect(() => {
    // Show only the first step initially, hide others
    gsap.set(".step-0", { opacity: 1, display: "block" });
    gsap.set(".step-1, .step-2, .step-3, .step-4, .step-5", {
      opacity: 0,
      x: 30,
      display: "none",
    });
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center relative">
      {/* Step 0: Welcome Screen */}
      <div className="step-0 w-full h-screen flex flex-col items-center justify-center">
        <WelcomeScreen onProceed={goToNextStep} />
      </div>

      {/* Step 1: About Rivals Section */}
      <div className="step-1 w-full h-screen flex flex-col">
        <AboutSection
          onContinue={goToNextStep}
          onBack={goToPreviousStep}
          goToEmailStep={goToEmailStep}
          goToBlogSection={goToBlogSection}
        />
      </div>

      {/* Step 2: Email collection */}
      <div className="step-2 w-full h-screen">
        <RegistrationScreen
          email={userInfo.email}
          onEmailChange={handleEmailChange}
          onContinue={goToNextStep}
          onBack={goToPreviousStep}
        />
      </div>

      {/* Step 3: Birthday collection */}
      <div className="step-3 w-full h-screen">
        <BirthdayScreen
          birthday={userInfo.birthday}
          onBirthdayChange={handleBirthdayChange}
          onContinue={goToNextStep}
          onBack={goToPreviousStep}
        />
      </div>

      {/* Step 4: Confirmation */}
      <div className="step-4 w-full h-screen">
        <ConfirmationScreen
          onBack={goToPreviousStep}
          onGoToAbout={goToAboutSection}
        />
      </div>

      {/* Step 5: Blog section */}
      <div className="step-5 w-full min-h-screen flex flex-col">
        <BlogSection
          onBack={goToAboutSection}
          goToAboutSection={goToAboutSection}
          goToEmailStep={goToEmailStep}
          goToBlogSection={goToBlogSection}
        />
      </div>
    </div>
  );
};

export default MultiStepForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const setupHeroAnimations = () => {
  gsap.set(".hero-image, .hero-description, .hero-button", {
    opacity: 0,
    y: 30,
  });

  const tl = gsap.timeline();

  tl.to(".hero-description", {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: "power3.out",
  })
    .to(
      ".hero-button",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .to(
      ".hero-image",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );

  return tl;
};

export const setupFeatureHeaderAnimation = (
  featureTitleRef: RefObject<HTMLDivElement>
) => {
  if (!featureTitleRef.current) return;

  // Ensure the header is always visible and on top
  gsap.set(featureTitleRef.current, {
    position: "relative",
    opacity: 1,
    visibility: "visible",
    zIndex: 100,
  });

  // Animate the header on scroll
  gsap.from(featureTitleRef.current, {
    scrollTrigger: {
      trigger: featureTitleRef.current,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out",
  });
};

export const setupFeatureAnimations = (
  featureSectionRef: RefObject<HTMLDivElement>
) => {
  if (featureSectionRef.current) {
    // Make sure headers are visible initially
    gsap.set(".feature-title, .feature-subtitle", {
      opacity: 1,
      y: 0,
    });

    // Then animate them with scroll trigger
    gsap.from(".feature-title", {
      scrollTrigger: {
        trigger: featureSectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".feature-subtitle", {
      scrollTrigger: {
        trigger: featureSectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
    });
  }
};

export const setupFeatureCardsAnimations = (
  featureSectionRef: RefObject<HTMLDivElement>
) => {
  if (!featureSectionRef.current) return null;

  // Find just the card container element
  const cardContainer =
    featureSectionRef.current.querySelector(".card-container");
  if (!cardContainer) {
    console.warn("Card container not found in feature section");
    return null;
  }

  // Clear existing ScrollTriggers for this section to prevent conflicts
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.trigger === cardContainer ||
      trigger.vars.trigger === featureSectionRef.current
    ) {
      trigger.kill();
    }
  });

  const featureCards = gsap.utils.toArray<HTMLElement>(".feature-card");

  if (featureCards.length === 0) {
    console.warn("No feature cards found with class 'feature-card'");
    return null;
  }

  // Reset all animations and set initial states
  gsap.set(featureCards, {
    clearProps: "all",
    opacity: 0,
    scale: 0.9,
    y: 30,
  });

  // Make first card visible
  gsap.set(featureCards[0], {
    opacity: 1,
    scale: 1,
    y: 0,
  });

  // SIMPLIFIED APPROACH: Fixed scroll distance per card
  const cardDuration = 0.5; // Each card takes 50% of viewport height to transition
  const totalScrollDistance =
    featureCards.length * window.innerHeight * cardDuration;

  // Create the timeline with improved ScrollTrigger
  // CRITICAL CHANGE: Pin only the card container, not the entire section
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardContainer, // Pin the card container, not the whole section
      start: "top 30%",
      end: `+=${totalScrollDistance}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      markers: false, // Set to true for debugging
      anticipatePin: 1,
      onLeave: (self) => {
        // Critical: Force unpin when leaving so scrolling continues
        self.disable();
        // Make sure the last card is visible
        gsap.to(featureCards[featureCards.length - 1], {
          opacity: 1,
          scale: 1,
          y: 0,
          overwrite: true,
        });
        // Refresh ScrollTrigger after a short delay to make sure it takes effect
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      },
      onEnterBack: (self) => {
        // Re-enable when scrolling back up
        self.enable();
        ScrollTrigger.refresh();
      },
    },
  });

  // Evenly space out the animations across the timeline
  featureCards.forEach((card, index) => {
    // Skip the first card as it's already visible
    if (index === 0) return;

    const position = (index - 1) / (featureCards.length - 1);

    // Hide previous card
    tl.to(
      featureCards[index - 1],
      {
        opacity: 0,
        scale: 0.9,
        y: -30,
        duration: 0.2,
        ease: "power2.in",
      },
      position
    );

    // Show current card
    tl.to(
      card,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      position + 0.1 // Slight delay for better transition
    );
  });

  // Add an empty tween at the end to ensure the timeline completes
  tl.to({}, { duration: 0.1 });

  // Force a refresh of ScrollTrigger to ensure everything is correctly calculated
  requestAnimationFrame(() => {
    ScrollTrigger.refresh(true);
  });

  return tl;
};

export const setupTournamentsAnimations = (
  tournamentsSectionRef: RefObject<HTMLDivElement>
) => {
  if (tournamentsSectionRef.current) {
    gsap.from(".tournament-text", {
      scrollTrigger: {
        trigger: tournamentsSectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".tournament-image", {
      scrollTrigger: {
        trigger: tournamentsSectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".tournament-list li", {
      scrollTrigger: {
        trigger: ".tournament-list",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -20,
      stagger: 0.15,
      duration: 0.5,
      ease: "power3.out",
    });
  }
};

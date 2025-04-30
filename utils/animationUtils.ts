import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

interface StaggerOptions {
  y?: number;
  opacity?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: ScrollTrigger.StaticVars;
}

interface TypeTextOptions {
  duration?: number;
  delay?: number;
  ease?: string;
}

interface ScrollToOptions {
  duration?: number;
  offset?: number;
  onComplete?: () => void;
}

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  markers?: boolean;
  trigger?: string;
}

interface TransitionOptions {
  duration?: number;
  onComplete?: () => void;
}

/**
 * Animation utilities for smooth page transitions and effects
 */
export const animationUtils = {
  /**
   * Initialize page animations
   */
  initAnimations: (): void => {
    // Set defaults
    gsap.defaults({
      ease: "power2.out",
      duration: 0.8,
      overwrite: "auto", // Prevent conflicting animations
    });
    
    // Default force3D to true for better GPU acceleration
    gsap.config({
      force3D: true,
    });
  },

  /**
   * Create a staggered entrance animation for multiple elements
   * @param {string} selector - CSS selector for elements to animate
   * @param {StaggerOptions} options - Animation options
   */
  staggerElements: (
    selector: string,
    options: StaggerOptions = {}
  ): gsap.core.Timeline => {
    const defaults: StaggerOptions = {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0,
      scrollTrigger: undefined,
    };

    const settings = { ...defaults, ...options };

    // Create the animation
    const tl = gsap.timeline();
    tl.from(selector, settings);
    return tl;
  },

  /**
   * Create a typing text effect
   * @param {string} selector - CSS selector for element to animate
   * @param {string} text - Text to type
   * @param {TypeTextOptions} options - Animation options
   */
  typeText: (
    selector: string,
    text: string,
    options: TypeTextOptions = {}
  ): gsap.core.Tween => {
    const defaults: TypeTextOptions = {
      duration: 1.5,
      delay: 0,
      ease: "none",
    };

    const settings = { ...defaults, ...options };

    // Create the animation
    return gsap.to(selector, {
      duration: settings.duration,
      text: text,
      ease: settings.ease,
      delay: settings.delay,
    });
  },

  /**
   * Create a parallax scrolling effect
   * @param {string} selector - CSS selector for elements to animate
   * @param {number} speed - Parallax speed (0-1)
   */
  createParallax: (selector: string, speed: number = 0.5): void => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      gsap.to(element, {
        y: `${speed * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement || element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // Add a small delay for smoother parallax
          invalidateOnRefresh: true, // Recalculate on window resize
        },
        willChange: "transform", // Hint to browser for optimization
      });
    });
  },

  /**
   * Create smooth scroll-to animation
   * @param {string} target - CSS selector to scroll to
   * @param {ScrollToOptions} options - Animation options
   */
  scrollTo: (
    target: string,
    options: ScrollToOptions = {}
  ): gsap.core.Tween | void => {
    const defaults: ScrollToOptions = {
      duration: 1,
      offset: 0,
      onComplete: undefined,
    };

    const settings = { ...defaults, ...options };

    // Get target element position
    const element = document.querySelector(target);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = rect.top + scrollTop + (settings.offset || 0);

    // Create the animation
    return gsap.to(window, {
      duration: settings.duration,
      scrollTo: targetPosition,
      ease: "power2.inOut",
      onComplete: settings.onComplete,
    });
  },

  /**
   * Create a reveal animation when scrolling
   * @param {string} selector - CSS selector for elements to animate
   * @param {ScrollRevealOptions} options - Animation options
   */
  createScrollReveal: (
    selector: string,
    options: ScrollRevealOptions = {}
  ): gsap.core.Tween => {
    const defaults: ScrollRevealOptions = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      start: "top 80%",
      markers: false,
    };

    const settings = { ...defaults, ...options };

    // Create the animation with optimized properties
    return gsap.from(selector, {
      y: settings.y,
      opacity: settings.opacity,
      duration: settings.duration,
      stagger: settings.stagger,
      willChange: "transform, opacity", // Hint to browser for optimization
      scrollTrigger: {
        trigger: options.trigger || selector,
        start: settings.start,
        markers: settings.markers,
        toggleActions: "play none none reverse", // Optimize playback behavior
        fastScrollEnd: true, // Optimize for fast scrolling
      },
      onComplete: () => {
        // Clean up properties after animation completes
        gsap.set(selector, { clearProps: "willChange" });
      }
    });
  },

  /**
   * Create a fancy entrance for the page loader
   * @param {() => void} onComplete - Callback when animation completes
   */
  createLoaderAnimation: (onComplete?: () => void): gsap.core.Timeline => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Logo reveal animation
    tl.from(".loader-logo", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    // Text typing animation
    tl.from(".loader-text", {
      opacity: 0,
      duration: 0.4,
    });

    tl.to(".loader-text", {
      duration: 1.2,
      text: "GameZone",
      ease: "none",
    });

    // Progress bar animation
    tl.to(
      ".loader-progress",
      {
        width: "100%",
        duration: 1.8,
        ease: "power1.inOut",
      },
      "-=0.8"
    );

    // Fade out loader
    tl.to(".loader-container", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.8,
    });

    return tl;
  },

  /**
   * Create smooth section transitions
   * @param {string} currentSelector - Current section selector
   * @param {string} nextSelector - Next section selector
   * @param {TransitionOptions} options - Animation options
   */
  transitionBetweenSections: (
    currentSelector: string,
    nextSelector: string,
    options: TransitionOptions = {}
  ): gsap.core.Timeline => {
    const defaults: TransitionOptions = {
      duration: 0.5,
      onComplete: undefined,
    };

    const settings = { ...defaults, ...options };

    const tl = gsap.timeline({
      onComplete: settings.onComplete,
    });

    // Animate current section out
    tl.to(currentSelector, {
      opacity: 0,
      y: -30,
      duration: settings.duration,
    });

    // Animate next section in
    tl.fromTo(
      nextSelector,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: settings.duration },
      "-=0.1"
    );

    return tl;
  },
};

export default animationUtils;

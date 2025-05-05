/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export default function DeviceTransition() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [interactionStarted, setInteractionStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTarget = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const initialScrollOffset = useRef<number>(0);
  const lastScrollPosition = useRef<number>(0);
  const bodyScrollLockApplied = useRef<boolean>(false);
  const touchTimer = useRef<NodeJS.Timeout | null>(null);

  // Amount of scroll needed to complete the animation (in pixels)
  const [scrollThreshold, setScrollThreshold] = useState(600);
  const [scrollTriggerThreshold, setScrollTriggerThreshold] = useState(50); // Reduced trigger threshold

  // Store scroll position when body is locked
  const scrollPosition = useRef<number>(0);

  // Smoothly animate scroll progress
  const animateProgress = useCallback(() => {
    // Calculate the current progress value, ensuring it's bounded between 0 and 1
    const currentProgress = Math.min(
      Math.max(scrollTarget.current / scrollThreshold, 0),
      1
    );

    // Update scroll progress state
    setScrollProgress(currentProgress);

    // Only continue the animation loop if not complete
    if (!animationComplete) {
      animationFrameId.current = requestAnimationFrame(animateProgress);
    }
  }, [scrollThreshold, animationComplete]);

  // Helper function for mobile scroll behavior
  const enableMobileInteraction = useCallback(() => {
    if (interactionStarted || animationComplete) return;

    // Start interaction after delay to prevent accidental activation
    touchTimer.current = setTimeout(() => {
      setInteractionStarted(true);

      // Lock window at current position but allow our custom handler to work
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
      scrollPosition.current = window.scrollY;

      // Start animation
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(animateProgress);
      }

      bodyScrollLockApplied.current = true;
    }, 100);
  }, [interactionStarted, animationComplete, animateProgress]);

  // Clean up touch interaction
  const disableMobileInteraction = useCallback(() => {
    if (touchTimer.current) {
      clearTimeout(touchTimer.current);
      touchTimer.current = null;
    }

    if (bodyScrollLockApplied.current) {
      // Restore scrolling
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";

      // Restore scroll position
      window.scrollTo(0, scrollPosition.current);
      bodyScrollLockApplied.current = false;
    }
  }, []);

  // Function to update animation progress based on input
  const updateProgress = useCallback(
    (newTarget: number) => {
      // If animation is complete, do nothing
      if (animationComplete) return;

      // If interaction hasn't started and we passed the threshold, start it
      if (!interactionStarted && Math.abs(newTarget) > scrollTriggerThreshold) {
        enableMobileInteraction();
      }

      // Only update progress if interaction has started
      if (interactionStarted) {
        // Calculate progress (0 to 1)
        scrollTarget.current = Math.min(
          Math.max(Math.abs(newTarget), 0),
          scrollThreshold
        );

        // If we've reached the threshold, complete the animation
        if (scrollTarget.current >= scrollThreshold) {
          finishAnimation();
        }
      }
    },
    [
      animationComplete,
      scrollThreshold,
      scrollTriggerThreshold,
      interactionStarted,
      enableMobileInteraction,
    ]
  );

  // Handle animation completion
  const finishAnimation = useCallback(() => {
    if (animationComplete) return;

    setAnimationComplete(true);

    // Dispatch event to notify parent component
    if (containerRef.current) {
      try {
        const event = new CustomEvent("animationComplete", {
          bubbles: true,
          detail: { timestamp: Date.now() },
        });
        containerRef.current.dispatchEvent(event);
      } catch (err) {
        console.error("Failed to dispatch animation complete event:", err);
      }
    }

    // Clean up
    disableMobileInteraction();

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    // Remove event listeners
    cleanup();
  }, [animationComplete, disableMobileInteraction]);

  // Wheel event handler
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (animationComplete) return;

      // Prevent default scrolling
      e.preventDefault();

      // Update animation based on wheel delta
      const wheelMultiplier = 1.5;
      const newTarget = lastScrollPosition.current + e.deltaY * wheelMultiplier;
      lastScrollPosition.current = newTarget;

      updateProgress(newTarget);
    },
    [animationComplete, updateProgress]
  );

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (animationComplete || interactionStarted) return;

    // For initial scroll detection only
    const scrollY = window.scrollY - initialScrollOffset.current;
    updateProgress(scrollY);
  }, [animationComplete, interactionStarted, updateProgress]);

  // Handle touch events
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const totalTouchDelta = useRef<number>(0);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (animationComplete) return;

      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      totalTouchDelta.current = 0;

      // Don't prevent default here to allow normal scrolling until interaction starts
    },
    [animationComplete]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (animationComplete || touchStartY.current === null) return;

      // Calculate touch delta with increased sensitivity for mobile
      const currentY = e.touches[0].clientY;
      const touchDelta = touchStartY.current - currentY;
      touchStartY.current = currentY;

      // Accumulate total delta for this gesture
      totalTouchDelta.current += touchDelta;

      // Update animation progress (positive delta = scroll down = move animation forward)
      const touchMultiplier = 3.5; // Increased sensitivity
      const newTarget =
        lastScrollPosition.current + touchDelta * touchMultiplier;
      lastScrollPosition.current = newTarget;

      updateProgress(newTarget);

      // Prevent default scrolling once interaction has started
      if (interactionStarted) {
        e.preventDefault();
      }
    },
    [animationComplete, interactionStarted, updateProgress]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (animationComplete || touchStartY.current === null) return;

      // Check if this was a fast swipe gesture
      const touchDuration = Date.now() - touchStartTime.current;
      const absTotal = Math.abs(totalTouchDelta.current);

      // Fast swipe detection (quick gesture with significant movement)
      if (touchDuration < 300 && absTotal > 100) {
        // Boost the animation progress based on swipe velocity
        const velocityBoost = (absTotal / touchDuration) * 500;
        const newTarget = lastScrollPosition.current + velocityBoost;
        lastScrollPosition.current = newTarget;

        updateProgress(newTarget);
      }

      // Reset touch tracking
      touchStartY.current = null;
    },
    [animationComplete, updateProgress]
  );

  // Event cleanup function - defined after event handlers to avoid reference issues
  const cleanup = useCallback(() => {
    try {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
    } catch (err) {
      console.error("Error removing event listeners:", err);
    }
  }, [
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleScroll,
  ]);

  // Initialize and clean up
  useEffect(() => {
    setIsMounted(true);

    // Force scroll to top on mount
    window.scrollTo(0, 0);
    initialScrollOffset.current = 0;

    // Set up thresholds based on device
    const isMobile = window.innerWidth <= 768;
    setScrollThreshold(window.innerHeight * (isMobile ? 0.6 : 0.8)); // Lower threshold on mobile
    setScrollTriggerThreshold(window.innerHeight * (isMobile ? 0.05 : 0.1)); // Easier to trigger on mobile

    // Handle window resize
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setScrollThreshold(window.innerHeight * (isMobile ? 0.6 : 0.8));
      setScrollTriggerThreshold(window.innerHeight * (isMobile ? 0.05 : 0.1));
    };

    window.addEventListener("resize", handleResize);

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animateProgress);

    // Add event listeners with proper options for mobile compatibility
    // TypeScript-compatible event listener registration
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      cleanup();
      disableMobileInteraction();

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [
    animateProgress,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleScroll,
    cleanup,
    disableMobileInteraction,
  ]);

  // Device style calculations
  const iphoneStyles = {
    opacity: Math.max(0, 1 - scrollProgress * 2), // Fade out at 50% scroll
    transform: `
      perspective(1200px)
      rotateY(${Math.min(scrollProgress * 360, 360)}deg)
      scale(${1 - scrollProgress * 0.3})
    `,
    transition: "transform 0.05s linear, opacity 0.05s linear",
    willChange: "transform, opacity",
  };

  const macbookStyles = {
    opacity: Math.min(1, (scrollProgress - 0.4) * 2), // Start fading in at 40% scroll
    transform: `
      perspective(1200px)
      rotateY(${Math.min(360 + (scrollProgress - 0.5) * 180, 360)}deg)
      scale(${0.9 + scrollProgress * 0.2})
    `,
    transition: "transform 0.05s linear, opacity 0.05s linear",
    willChange: "transform, opacity",
  };

  // Show loading state until mounted
  if (!isMounted) {
    return (
      <div className="w-full h-[550px] md:h-[600px] flex items-center justify-center">
        <div className="w-12 h-12 border-t-4 border-[#02F199] border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[550px] md:h-[600px] relative overflow-hidden"
    >
      {/* iPhone with spin animation */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 transform-gpu"
        style={iphoneStyles}
      >
        <div className="relative w-[200px] h-[400px] md:w-[250px] md:h-[500px]">
          <Image
            src="/static/media/Iphone.png"
            alt="iPhone 15 Pro"
            fill
            sizes="200px"
            priority
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* MacBook with spin animation */}
      <div
        className="absolute inset-0 flex items-center justify-center z-0 transform-gpu"
        style={macbookStyles}
      >
        <div className="relative w-[600px] h-[450px]">
          <Image
            src="/static/media/DesktopHomeMockup.png"
            alt="MacBook Pro"
            fill
            sizes="600px"
            priority
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Touch/scroll indicator with different messages for mobile/desktop */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 z-20">
        {!animationComplete && (
          <>
            <span className="text-sm text-white mb-1 hidden md:block">
              Scroll to reveal
            </span>
            <span className="text-sm text-white mb-1 block md:hidden">
              Swipe up to continue
            </span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div
                className="w-1.5 h-1.5 bg-white rounded-full mt-1 animate-bounce"
                style={{
                  animationDuration: "1.5s",
                  transition: "transform 0.2s ease-out",
                  transform: `translateY(${scrollProgress * 6}px)`,
                }}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

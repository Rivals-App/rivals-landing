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

  // Amount of scroll needed to complete the animation (in pixels)
  // Using a responsive threshold based on device type
  const [scrollThreshold, setScrollThreshold] = useState(600);

  // Minimum scroll required before animation begins (prevents accidental triggering)
  const [scrollTriggerThreshold, setScrollTriggerThreshold] = useState(100);

  // Smoothly animate scroll progress
  const animateProgress = useCallback(() => {
    // Calculate the current progress value, ensuring it's bounded between 0 and 1
    const currentProgress = Math.min(Math.max(scrollTarget.current / scrollThreshold, 0), 1);

    // Update scroll progress state
    setScrollProgress(currentProgress);

    // Only continue the animation loop if not complete
    if (!animationComplete) {
      animationFrameId.current = requestAnimationFrame(animateProgress);
    }
  }, [scrollThreshold, animationComplete]);

  // Function to update animation progress based on scroll value
  const updateProgress = useCallback(
    (newTarget: number) => {
      // Only start animation after passing the trigger threshold
      if (!interactionStarted && newTarget > scrollTriggerThreshold) {
        setInteractionStarted(true);
        // Start animation loop once interaction begins
        if (!animationFrameId.current) {
          animationFrameId.current = requestAnimationFrame(animateProgress);
        }
      }

      // If interaction hasn't started, don't update progress
      if (!interactionStarted && newTarget <= scrollTriggerThreshold) {
        return;
      }

      // Calculate normalized progress (0 to 1), but offset by the trigger threshold
      scrollTarget.current = Math.min(
        Math.max(newTarget - scrollTriggerThreshold, 0),
        scrollThreshold
      );

      // If animation has completed, trigger completion logic
      if (scrollTarget.current >= scrollThreshold && !animationComplete) {
        // Set state in next tick to avoid state updates during render
        setTimeout(() => {
          setAnimationComplete(true);
          
          // Dispatch event to notify parent component
          if (containerRef.current) {
            try {
              const event = new CustomEvent("animationComplete", {
                bubbles: true, // Make sure event bubbles up
                detail: { timestamp: Date.now() } // Add data that might be useful
              });
              containerRef.current.dispatchEvent(event);
              console.log("Animation complete event dispatched");
            } catch (err) {
              console.error("Failed to dispatch animation complete event:", err);
            }
          }
          
          // Re-enable normal scrolling behavior
          document.body.style.overflow = "";
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.width = "";
          
          // Cancel animation frame
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
          
          // Remove the event listeners
          try {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("scroll", handleScroll);
          } catch (err) {
            console.error("Error removing event listeners:", err);
          }
        }, 0);
      }
    },
    [
      animationComplete,
      scrollThreshold,
      scrollTriggerThreshold,
      interactionStarted,
      animateProgress,
    ]
  );

  // Handle wheel events (desktop)
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (animationComplete) return;

      try {
        e.preventDefault();
      } catch (err) {
        // Some browsers might not allow preventDefault
        console.warn("Could not prevent default wheel behavior:", err);
      }

      // Update scroll target based on wheel delta with multiplier for better responsiveness
      // Using a multiplier helps ensure the animation feels responsive
      const wheelMultiplier = 1.2;
      const newTarget = lastScrollPosition.current + (e.deltaY * wheelMultiplier);
      lastScrollPosition.current = newTarget;

      // Update animation progress
      updateProgress(newTarget);
    },
    [animationComplete, updateProgress]
  );

  // Handle scroll events (for initial implementation compatibility)
  const handleScroll = useCallback(() => {
    if (animationComplete) return;

    // Calculate the difference between current scroll and initial offset
    const scrollY = window.scrollY - initialScrollOffset.current;
    lastScrollPosition.current = scrollY;

    // Update animation progress using scroll position
    updateProgress(scrollY);

    // Prevent actual page scrolling while animation is in progress
    // But only if the interaction has started to avoid blocking initial scroll
    if (!animationComplete && interactionStarted) {
      // Use requestAnimationFrame to smooth out the scroll resetting
      requestAnimationFrame(() => {
        window.scrollTo({
          top: initialScrollOffset.current,
          behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent visible jumping
        });
      });
    }
  }, [animationComplete, updateProgress, interactionStarted]);

  // Handle touch events (mobile)
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (animationComplete) return;
      touchStartY.current = e.touches[0].clientY;
    },
    [animationComplete]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (animationComplete || touchStartY.current === null) return;

      // Calculate touch delta (multiplier increased for better touch responsiveness)
      const touchMultiplier = 2.5; // Increased from 1.8 for more sensitive touch
      const touchDelta =
        (touchStartY.current - e.touches[0].clientY) * touchMultiplier;
      touchStartY.current = e.touches[0].clientY;

      // Update scroll target based on touch movement
      const newTarget = lastScrollPosition.current + touchDelta;
      lastScrollPosition.current = newTarget;

      // Update animation progress
      updateProgress(newTarget);

      // Prevent default behavior only if animation has started
      if (interactionStarted) {
        try {
          e.preventDefault();
        } catch (err) {
          // Some browsers might not allow preventDefault
          console.warn("Could not prevent default touch behavior:", err);
        }
      }
    },
    [animationComplete, updateProgress, interactionStarted]
  );

  // Initialize and clean up event listeners
  useEffect(() => {
    setIsMounted(true);

    // Store initial scroll position to use as reference
    initialScrollOffset.current = window.scrollY;

    // Set threshold based on window height once component is mounted
    const isMobile = window.innerWidth <= 768;

    // Adjust thresholds based on device type
    setScrollThreshold(window.innerHeight * (isMobile ? 1.2 : 0.8));
    setScrollTriggerThreshold(window.innerHeight * (isMobile ? 0.15 : 0.1));

    // Update threshold on resize for responsive behavior
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setScrollThreshold(window.innerHeight * (isMobile ? 1.2 : 0.8));
      setScrollTriggerThreshold(window.innerHeight * (isMobile ? 0.15 : 0.1));
    };

    window.addEventListener("resize", handleResize);

    // Start animation frame loop immediately for smoother response
    if (!animationComplete && !animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animateProgress);
    }

    // Delay adding event listeners to ensure proper initialization
    const addEventListenersTimeout = setTimeout(() => {
      if (!animationComplete) {
        try {
          // Add event listeners with consistent passive options
          window.addEventListener("wheel", handleWheel, { passive: false });
          window.addEventListener("touchstart", handleTouchStart, { passive: false });
          window.addEventListener("touchmove", handleTouchMove, { passive: false });
          window.addEventListener("scroll", handleScroll);

          // Only prevent scroll after interaction has started
          if (interactionStarted) {
            document.body.style.overflow = "hidden";
          }
        } catch (err) {
          console.error("Error setting up event listeners:", err);
        }
      }
    }, 100);

    return () => {
      // Clean up event listeners and styles on unmount
      clearTimeout(addEventListenersTimeout);
      
      try {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      } catch (err) {
        console.error("Error removing event listeners:", err);
      }

      // Reset body styles
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Cancel any pending animation frames
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [
    animationComplete,
    handleWheel,
    handleTouchMove,
    handleTouchStart,
    handleScroll,
    interactionStarted,
    animateProgress,
  ]);

  // Calculate styles based on scroll progress for proper spinning animation
  const iphoneStyles = {
    opacity: Math.max(0, 1 - scrollProgress * 2), // Fade out at 50% scroll
    transform: `
      perspective(1200px)
      rotateY(${Math.min(scrollProgress * 360, 360)}deg)
      scale(${1 - scrollProgress * 0.3})
    `,
    transition: "transform 0.05s linear, opacity 0.05s linear",
    willChange: "transform, opacity", // Hint to browser for optimization
  };

  // Calculate styles for MacBook with animation that stops at full rotation
  const macbookStyles = {
    opacity: Math.min(1, (scrollProgress - 0.4) * 2), // Start fading in at 40% scroll
    transform: `
      perspective(1200px)
      rotateY(${Math.min(360 + (scrollProgress - 0.5) * 180, 360)}deg)
      scale(${0.9 + scrollProgress * 0.2})
    `,
    transition: "transform 0.05s linear, opacity 0.05s linear",
    willChange: "transform, opacity", // Hint to browser for optimization
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
      {/* iPhone with spin animation that stops */}
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

      {/* MacBook with spin animation that stops */}
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

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 z-20">
        {!animationComplete && (
          <>
            <span className="text-sm text-white mb-1 hidden md:block">
              Scroll to reveal
            </span>
            <span className="text-sm text-white mb-1 block md:hidden">
              Scroll down to reveal
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
      </div> */}

      {/* Debugging indicator - comment out in production */}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm z-50">
          Progress: {Math.round(scrollProgress * 100)}%
          <br />
          Started: {interactionStarted ? "Yes" : "No"}
          <br />
          Target: {Math.round(scrollTarget.current)}
          <br />
          Threshold: {Math.round(scrollThreshold)}
          <br />
          Animation Frame: {animationFrameId.current ? "Active" : "Inactive"}
        </div>
      )} */}
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextCycleProps {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
  interval?: number; // Time in seconds to show each word
  transitionDuration?: number; // Duration of transition animations in seconds
}

const AnimatedTextCycle: React.FC<AnimatedTextCycleProps> = ({
  words,
  className = "",
  style = {},
  interval = 2, // Reduced default interval
  transitionDuration = 0.3, // New prop for transition duration
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const previousIndex = useRef<number | null>(null);

  useEffect(() => {
    if (!textRef.current || words.length === 0) return;

    // Set initial text
    gsap.set(textRef.current, {
      text: words[0],
      opacity: 1,
      y: 0,
    });

    // Create repeating animation
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.3, // Reduced repeat delay
    });

    tl.to(
      {},
      {
        duration: interval,
        onComplete: function () {
          // This function will be called after each interval
          cycleText();
        },
      }
    );

    // Function to cycle through the words
    function cycleText() {
      // First, animate current text out
      gsap.to(textRef.current, {
        y: -20,
        opacity: 0,
        duration: transitionDuration, // Use customizable transition duration
        ease: "power2.in", // Clean exit animation
        onComplete: function () {
          // Select a random index that is not the same as the previous index
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * words.length);
          } while (nextIndex === previousIndex.current);

          previousIndex.current = nextIndex;

          // Set the new text while it's invisible
          if (textRef.current) {
            textRef.current.textContent = words[nextIndex];
          }

          // Animate the new text in with a spring effect
          gsap.fromTo(
            textRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: transitionDuration, // Use customizable transition duration
              ease: "back.out(1.1)", // Add spring effect
            }
          );
        },
      });
    }

    // Clean up
    return () => {
      tl.kill();
    };
  }, [words, interval, transitionDuration]);

  return <span ref={textRef} className={className} style={style}></span>;
};

export default AnimatedTextCycle;

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextCycleProps {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
  interval?: number; // Time in seconds to show each word
}

const AnimatedTextCycle: React.FC<AnimatedTextCycleProps> = ({
  words,
  className = "",
  style = {},
  interval = 3,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const currentIndex = useRef(0);

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
      repeatDelay: 0.5,
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
        duration: 0.5,
        ease: "power2.in",
        onComplete: function () {
          // Update to next index
          currentIndex.current = (currentIndex.current + 1) % words.length;

          // Set the new text while it's invisible
          if (textRef.current) {
            textRef.current.textContent = words[currentIndex.current];
          }

          // Animate the new text in
          gsap.fromTo(
            textRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    }

    // Clean up
    return () => {
      tl.kill();
    };
  }, [words, interval]);

  return <span ref={textRef} className={className} style={style}></span>;
};

export default AnimatedTextCycle;

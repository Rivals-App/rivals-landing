import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextCycleProps {
  words: string[];
  currentIndex?: number; // New prop for shared index
  className?: string;
  style?: React.CSSProperties;
  transitionDuration?: number; // Duration of transition animations in seconds
}

const AnimatedTextCycle: React.FC<AnimatedTextCycleProps> = ({
  words,
  currentIndex = 0, // Default to 0 if not provided
  className = "",
  style = {},
  transitionDuration = 0.3, // New prop for transition duration
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || words.length === 0) return;

    // Animate text change
    gsap.to(textRef.current, {
      y: -20,
      opacity: 0,
      duration: transitionDuration,
      ease: "power2.in",
      onComplete: () => {
        if (textRef.current) {
          textRef.current.textContent = words[currentIndex];
        }
        gsap.fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: transitionDuration, ease: "back.out(1.1)" }
        );
      },
    });
  }, [currentIndex, words, transitionDuration]);

  return <span ref={textRef} className={className} style={style}></span>;
};

export default AnimatedTextCycle;

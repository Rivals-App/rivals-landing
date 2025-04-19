"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";

interface MaskedBackgroundProps {
  logoPath: string;
  primaryColor?: [number, number, number]; // RGB values
  backgroundColor?: string;
  logoSize?: string; // Size as percentage or pixel value
}

const MaskedBackgroundComponent: React.FC<MaskedBackgroundProps> = ({
  logoPath = "/static/svgs/logo.svg",
  primaryColor = [2, 241, 153], // Your green color [#02F199]
  backgroundColor = "#0A1928", // Dark blue background
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const animationInitialized = useRef<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Dynamic logo size based on device - 100% for mobile, 40% for desktop
  const dynamicLogoSize = isMobile ? "100%" : "40%";

  // Radial gradient blobs config
  const blobConfig = useMemo(
    () => ({
      count: isMobile ? 4 : 6,
      colors: [
        [primaryColor[0], primaryColor[1], primaryColor[2], 0.6],
        [primaryColor[0], primaryColor[1], primaryColor[2], 0.4],
      ],
      minSize: isMobile ? 50 : 25, // Increased for mobile
      maxSize: isMobile ? 70 : 35, // Increased for mobile
      animationDuration: {
        min: 15,
        max: 25,
      },
    }),
    [isMobile, primaryColor]
  );

  // Handle window resize only when needed
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      if (isMobile !== newIsMobile) {
        setIsMobile(newIsMobile);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // Initialize animations only once or when blobConfig changes significantly
  useEffect(() => {
    if (!maskRef.current || animationInitialized.current) return;

    // Set up animation
    initializeAnimations();

    // Mark as initialized
    animationInitialized.current = true;

    // Clean up function
    return () => {
      // We'll leave animations running and just clean up when component unmounts
      animationInitialized.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only re-initialize when blobConfig changes significantly
  useEffect(() => {
    if (!maskRef.current || !animationInitialized.current) return;

    // Re-initialize animations when blobConfig changes
    initializeAnimations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blobConfig.count, blobConfig.minSize, blobConfig.maxSize]);

  // Extract animation initialization to a separate function
  const initializeAnimations = () => {
    if (!maskRef.current) return;

    const maskElement = maskRef.current;

    // Clear existing content only once
    if (maskElement.children.length === 0) {
      maskElement.innerHTML = "";

      // Generate keyframes styles once and add them to head
      const stylesHTML = Array(blobConfig.count)
        .fill(0)
        .map((_, i) => {
          const scale1 = 0.8 + Math.random() * 0.4;
          const scale2 = 0.8 + Math.random() * 0.4;

          return `
            @keyframes blob-move-${i} {
              0% { 
                top: -10%; 
                transform: translate(-50%, -50%) scale(${scale1});
              }
              100% { 
                top: 110%; 
                transform: translate(-50%, -50%) scale(${scale2});
              }
            }
          `;
        })
        .join("");

      const styleElement = document.createElement("style");
      styleElement.id = "masked-bg-animations";
      styleElement.innerHTML = stylesHTML;

      // Remove existing animation styles if they exist
      const existingStyle = document.getElementById("masked-bg-animations");
      if (existingStyle) {
        existingStyle.remove();
      }

      document.head.appendChild(styleElement);

      // Generate animated blob elements
      for (let i = 0; i < blobConfig.count; i++) {
        const blob = document.createElement("div");
        const size =
          Math.random() * (blobConfig.maxSize - blobConfig.minSize) +
          blobConfig.minSize;
        const colorIndex = i % blobConfig.colors.length;
        const [r, g, b, a] = blobConfig.colors[colorIndex];

        blob.style.position = "absolute";
        blob.style.width = `${size}%`;
        blob.style.paddingBottom = `${size}%`;
        blob.style.borderRadius = "50%";
        blob.style.background = `radial-gradient(circle, rgba(${r},${g},${b},${a}) 0%, rgba(${r},${g},${b},0) 70%)`;

        // Start position - horizontally distributed
        const leftPos = Math.random() * 80 + 10; // 10-90% from left

        blob.style.left = `${leftPos}%`;
        blob.style.transform = "translate(-50%, -50%)";

        // Animation - top to bottom movement
        const duration =
          Math.random() *
            (blobConfig.animationDuration.max -
              blobConfig.animationDuration.min) +
          blobConfig.animationDuration.min;

        blob.style.animation = `blob-move-${i} ${duration}s linear infinite`;

        // Add some delay to stagger animations
        blob.style.animationDelay = `${Math.random() * 5}s`;

        maskElement.appendChild(blob);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        overflow: "hidden",
        backgroundColor: backgroundColor,
      }}
    >
      {/* Logo Mask Container - Now using dynamicLogoSize based on device */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: dynamicLogoSize, // Use dynamic size based on device
          aspectRatio: "1/1",
        }}
      >
        <div
          ref={maskRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            maskImage: `url(${logoPath})`,
            maskSize: "contain",
            maskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url(${logoPath})`,
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
const MemoizedComponent = React.memo(MaskedBackgroundComponent);

const MaskedBackground = dynamic(() => Promise.resolve(MemoizedComponent), {
  ssr: false,
});

export default MaskedBackground;

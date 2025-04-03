// app/ClientLayout.tsx
"use client";
import { useState, useEffect } from "react";
import PageLoader from "./components/PageLoader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    // Check if the app has already been loaded in this session
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("initialLoadComplete");
      if (hasLoaded === "true") {
        setInitialLoadComplete(true);
      }
    }
  }, []);

  const handleLoadComplete = () => {
    setInitialLoadComplete(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("initialLoadComplete", "true");
    }
  };

  return (
    <>
      {!initialLoadComplete && (
        <PageLoader onLoadComplete={handleLoadComplete} />
      )}
      <div style={{ display: initialLoadComplete ? "block" : "none" }}>
        {children}
      </div>
    </>
  );
}

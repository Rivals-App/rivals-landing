/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation"; // Add this import
import Navbar from "../components/Navbar";
import blogPosts from "./data/blog.data";
import Footer from "../components/Footer";
import Image from "next/image";

// Register GSAP plugins on client side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogPage() {
  const router = useRouter(); // Add router
  const containerRef = useRef<HTMLDivElement>(null);
  const blogContainerRef = useRef<HTMLDivElement>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Mark page as loaded after a brief delay to ensure DOM is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Initial load animations
  useEffect(() => {
    if (!isPageLoaded) return;

    const container = containerRef.current;
    if (!container) return;

    // Set initial states for blog posts only
    gsap.set(".blog-post", {
      opacity: 0,
      y: 30,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate all blog posts simultaneously
    tl.to(".blog-post", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, [isPageLoaded]);

  // Function to navigate to blog post using slug
  const handleOpenPost = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#0F2841] flex flex-col text-white">
      {/* Main content */}
      <div
        className="w-full min-h-screen flex flex-col bg-transparent"
        ref={containerRef}
      >
        <Navbar />

        <div className="flex-grow flex flex-col items-start pt-16 md:pt-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
          {/* Blog Header */}
          <div className="blog-header w-full max-w-6xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              RIVALS <span className="text-[#02F199]">BLOG</span>
            </h1>
          </div>
        </div>

        {/* Blog posts listing */}
        <div className="w-full pb-16 px-14" ref={blogContainerRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="blog-post bg-[#121212]/20 border border-white/10 rounded-2xl overflow-hidden shadow-xl cursor-pointer transform hover:scale-[1.01] transition-all duration-300"
                onClick={() => handleOpenPost(post.slug)}
              >
                <div className="h-60 w-full overflow-hidden border-b border-white/10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <div className="px-3 py-1 rounded-md bg-[#151515] text-sm text-gray-300">
                      {post.readTime}
                    </div>
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-md bg-[#02F199]/20 text-[#02F199] text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 text-lg mb-6">{post.excerpt}</p>
                  <div className="flex items-center text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>By {post.author}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-[#02F199] hover:underline inline-flex items-center">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

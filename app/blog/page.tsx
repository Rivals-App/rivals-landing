/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import PerlinNoiseSketch from "../components/PerlinNoise";
import blogPosts from "./data/blog.data";
import Footer from "../components/Footer";

// Register GSAP plugins on client side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blogContainerRef = useRef<HTMLDivElement>(null);
  const postDetailRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
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

  // Function to handle smooth transition to blog post detail
  const handleOpenPost = (postId: string) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const blogContainer = blogContainerRef.current;
    if (!blogContainer) {
      setSelectedPost(postId);
      setIsAnimating(false);
      return;
    }

    // Store the scroll position to restore it later
    const scrollPosition = window.scrollY;

    // Fade out blog listing
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedPost(postId);
        // Scroll to top for post detail view
        window.scrollTo(0, 0);
        setIsAnimating(false);
      },
    });

    tl.to(blogContainer, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Function to handle smooth transition back to blog listing
  const handleClosePost = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const postDetail = postDetailRef.current;
    if (!postDetail) {
      setSelectedPost(null);
      setIsAnimating(false);
      return;
    }

    // Fade out post detail
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedPost(null);
        setIsAnimating(false);
      },
    });

    tl.to(postDetail, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Effect to animate post details when a post is selected
  useEffect(() => {
    if (selectedPost && postDetailRef.current) {
      const tl = gsap.timeline();

      gsap.set(postDetailRef.current, { opacity: 0, y: 100 });

      // Animate the container first
      tl.to(postDetailRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Then animate the internal content with a stagger
      tl.fromTo(
        ".post-detail-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  }, [selectedPost]);

  // Effect to animate blog listing when returning from a post
  useEffect(() => {
    if (!selectedPost && blogContainerRef.current) {
      const tl = gsap.timeline();

      gsap.set(blogContainerRef.current, { opacity: 0, y: 50 });

      tl.to(blogContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [selectedPost]);

  return (
    <div className="min-h-screen bg-[#0F2841] flex flex-col text-white">
      {/* Main content */}
      <div
        className="w-full min-h-screen flex flex-col bg-transparent"
        ref={containerRef}
      >
        <Navbar />

        <div className="flex-grow flex flex-col items-start pt-20 md:pt-18 px-4 md:px-8 max-w-7xl mx-auto w-full">
          {/* Blog Header */}
          <div className="blog-header w-full max-w-6xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              RIVALS <span className="text-[#02F199]">BLOG</span>
            </h1>
          </div>
        </div>

        {/* Blog posts or post detail */}
        {!selectedPost ? (
          <div className="w-full pb-16 px-14" ref={blogContainerRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="blog-post bg-[#121212]/20 border border-white/10 rounded-2xl overflow-hidden shadow-xl cursor-pointer transform hover:scale-[1.01] transition-all duration-300"
                  onClick={() => handleOpenPost(post.id)}
                >
                  <div className="h-60 w-full overflow-hidden border-b border-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
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
        ) : (
          <div className="w-full max-w-7xl pb-16 mx-auto" ref={postDetailRef}>
            <button
              onClick={handleClosePost}
              className="post-detail-content mb-6 text-[#02F199] flex items-center hover:underline"
              disabled={isAnimating}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to blog
            </button>

            {/* Get the selected blog post data */}
            {(() => {
              const post = blogPosts.find((p) => p.id === selectedPost);
              if (!post) return null;

              return (
                <div className="bg-[#121212]/80 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                  <div className="h-64 md:h-96 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="post-detail-content flex items-center gap-3 mb-4 flex-wrap">
                      <div className="px-3 py-1 rounded-md bg-[#151515] text-sm text-gray-300">
                        {post.readTime}
                      </div>
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-md bg-[#02F199]/20 text-[#02F199] text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h1 className="post-detail-content text-3xl md:text-4xl font-bold text-white mb-4">
                      {post.title}
                    </h1>
                    <div className="post-detail-content flex items-center text-gray-400 mb-8">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>By {post.author}</span>
                    </div>
                    <div
                      className="post-detail-content prose prose-invert max-w-none text-gray-300"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

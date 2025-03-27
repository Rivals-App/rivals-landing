/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sample blog posts data
const blogPosts = [
  {
    id: "1",
    title: "The Future of Competitive Gaming",
    excerpt:
      "How blockchain technology is revolutionizing the competitive gaming industry.",
    date: "March 15, 2025",
    author: "Alex Johnson",
    image: "/static/imgs/Card1.png", // Using existing images
    content:
      "The competitive gaming landscape is evolving at a rapid pace. With the integration of blockchain technology, players can now enjoy true ownership of in-game assets, verifiable results, and transparent reward systems. This article explores how RIVALS is leading this revolution and what it means for gamers worldwide.",
    tags: ["Gaming", "Blockchain", "Esports"],
  },
  {
    id: "2",
    title: "How to Build a Winning Tournament Strategy",
    excerpt:
      "Expert tips for dominating in RIVALS tournaments and maximizing your rewards.",
    date: "February 28, 2025",
    author: "Sarah Kim",
    image: "/static/imgs/Card2.png",
    content:
      "Winning in RIVALS tournaments requires more than just gaming skills. This comprehensive guide breaks down effective strategies for tournament preparation, in-game decision making, and managing your stake to maximize your potential rewards.",
    tags: ["Strategy", "Tournaments", "Tips"],
  },
  {
    id: "3",
    title: "Behind the Scenes: How RIVALS Validates Scores",
    excerpt: "An inside look at our proprietary score validation technology.",
    date: "January 22, 2025",
    author: "Michael Chen",
    image: "/static/imgs/Card3.png",
    content:
      "Score validation is the backbone of fair gameplay on RIVALS. This technical deep dive explains our anti-cheat systems, real-time verification process, and how we ensure every match result is accurate and tamper-proof.",
    tags: ["Technology", "Anti-cheat", "Fairness"],
  },
];

interface BlogSectionProps {
  onBack?: () => void;
  goToAboutSection?: () => void;
  goToEmailStep?: () => void;
  goToBlogSection?: () => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  onBack,
  goToAboutSection,
  goToEmailStep,
  goToBlogSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on search term
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(".blog-header, .blog-search, .blog-posts, .blog-post", {
      opacity: 0,
      y: 30,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate elements sequentially
    tl.to(".blog-header", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        ".blog-search",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        ".blog-posts",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

    // Set up scroll triggers
    ScrollTrigger.batch(".blog-post", {
      interval: 0.1,
      batchMax: 3,
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
        });
      },
      start: "top bottom-=100px",
    });

    return () => {
      // Clean up all scroll triggers when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  // Effect to animate post details when a post is selected
  useEffect(() => {
    if (selectedPost) {
      gsap.set(".post-detail-content", { opacity: 0, y: 30 });
      gsap.to(".post-detail-content", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });
    }
  }, [selectedPost]);

  // Get the current post details if a post is selected
  const currentPost = selectedPost
    ? blogPosts.find((post) => post.id === selectedPost)
    : null;

  return (
    <div
      className="w-full min-h-screen flex flex-col bg-[#121212]"
      ref={containerRef}
    >
      {/* Navbar - Pass all navigation functions */}
      <Navbar
        goToEmailStep={goToEmailStep}
        goToBlogSection={goToBlogSection}
        goToAboutSection={goToAboutSection}
      />

      <div className="flex-grow flex flex-col items-center justify-start pt-24 md:pt-32 px-4 md:px-8">
        {/* Blog Header */}
        <div className="blog-header w-full max-w-6xl mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            RIVALS <span className="text-[#02F199]">BLOG</span>
          </h1>
          <p className="text-gray-300 text-center mt-4 max-w-3xl mx-auto">
            Latest news, strategy guides, and insights on competitive gaming
            from the RIVALS team
          </p>
        </div>

        {/* Blog Search */}
        {!selectedPost && (
          <div className="blog-search w-full max-w-3xl mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#1e1e1e] text-white border border-[#333] focus:border-[#02F199] focus:outline-none transition-colors"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Blog posts or single post */}
        {!selectedPost ? (
          <div className="blog-posts w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="blog-post bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                  onClick={() => setSelectedPost(post.id)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image || "/static/imgs/Card1.png"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium py-1 px-2 rounded-full bg-[#02F199]/20 text-[#02F199]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{post.date}</span>
                      <span className="text-[#02F199]">Read more →</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-400 text-lg">
                  No posts found matching your search.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-4 py-2 bg-[#02F199] text-[#0c1622] rounded-full font-medium"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          // Single post view
          <div className="w-full max-w-4xl pb-16">
            <button
              onClick={() => setSelectedPost(null)}
              className="mb-6 text-[#02F199] flex items-center hover:underline"
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
              Back to all posts
            </button>

            {currentPost && (
              <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl">
                <div className="h-64 md:h-80 overflow-hidden">
                  <img
                    src={currentPost.image || "/static/imgs/Card1.png"}
                    alt={currentPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="post-detail-content flex flex-wrap gap-2 mb-4">
                    {currentPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium py-1 px-2 rounded-full bg-[#02F199]/20 text-[#02F199]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="post-detail-content text-3xl md:text-4xl font-bold text-white mb-4">
                    {currentPost.title}
                  </h1>
                  <div className="post-detail-content flex items-center text-gray-400 mb-8">
                    <span>{currentPost.date}</span>
                    <span className="mx-2">•</span>
                    <span>By {currentPost.author}</span>
                  </div>
                  <div className="post-detail-content prose prose-invert max-w-none text-gray-300">
                    <p className="text-lg leading-relaxed">
                      {currentPost.content}
                    </p>
                    {/* For a real blog, you would render the full content here */}
                    <p className="mt-6 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
                      aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam
                      auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
                      nisl, eget ultricies nisl nisl eget nisl.
                    </p>
                    <p className="mt-6 leading-relaxed">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo. Nemo
                      enim ipsam voluptatem quia voluptas sit aspernatur aut
                      odit aut fugit, sed quia consequuntur magni dolores eos
                      qui ratione voluptatem sequi nesciunt. Neque porro
                      quisquam est, qui dolorem ipsum quia dolor sit amet,
                      consectetur, adipisci velit, sed quia non numquam eius
                      modi tempora incidunt ut labore et dolore magnam aliquam
                      quaerat voluptatem.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;

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

const blogPost = {
  id: "1",
  title: "Introduction to RIVALS: Revolutionizing Gamer Earnings",
  excerpt:
    "An inside look at how RIVALS is changing the competitive gaming landscape.",
  date: "March 15, 2025",
  author: "Joshua Jones",
  image: "/static/media/Blog1.jpeg",
  content: `
    <div class="blog-post-content" style="font-family: sans-serif; line-height: 1.6; color: #FFFFFF;">
      <h2 style="margin-bottom: 0.8em; font-size: 30px;">Introduction to RIVALS</h2>
      <p style="margin-bottom: 1.5em;">
        The gaming industry has evolved beyond simple entertainment. Today, gamers seek platforms that offer both competitive excitement and financial rewards. <strong>RIVALS</strong> is at the forefront of this transformation, providing an innovative ecosystem where players can monetize their skills through <strong>peer-to-peer matches, real-time score validation, and skill-based tournaments</strong>. Unlike traditional esports models that require sponsorships or extensive social media followings, RIVALS enables players of all levels to <strong>earn money directly from their gameplay.</strong>
      </p>

      <h2 style="margin-bottom: 0.8em; font-size: 30px;">How RIVALS is Changing the Game</h2>
      <p style="margin-bottom: 1.5em;">
        RIVALS is not just another esports platform. It offers unique features that set it apart from conventional gaming ecosystems. Here's how it is revolutionizing gamer earnings:
      </p>

      <h3 style="margin-bottom: 0.8em; font-size: 24px;">1. Peer-to-Peer Competitions</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em; list-style-type: disc;">
        <li style="margin-bottom: 0.5em;">Players can engage in <strong>1v1 matches</strong> or <strong>team-based competitions</strong>, staking real money against their opponents.</li>
        <li style="margin-bottom: 0.5em;">Users can <strong>challenge their friends</strong> for bragging rights or <strong>matchmake against other RIVALS players</strong> in fair, skill-based competitions.</li>
        <li style="margin-bottom: 0.5em;">The platform ensures transparent and <strong>instant payouts</strong> with real-time score validation, preventing disputes and enhancing trust.</li>
      </ul>

      <h3 style="margin-bottom: 0.8em; font-size: 24px;">2. Skill-Based Tournaments</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em; list-style-type: disc;">
        <li style="margin-bottom: 0.5em;">RIVALS hosts <strong>tournaments for all skill levels</strong>, allowing casual and competitive players to participate.</li>
        <li style="margin-bottom: 0.5em;">Gamers can <strong>enter solo 1v1 tournaments</strong> or, in <strong>team-based competitions,</strong> join with their squad or sign up as a <strong>free agent</strong> to be matched with teammates.</li>
        <li style="margin-bottom: 0.5em;">Prize pools are distributed based on <strong>performance rather than popularity</strong>, giving everyone a fair shot at earning.</li>
      </ul>

      <h3 style="margin-bottom: 0.8em; font-size: 24px;">3. Fair Matchmaking & Ranking System</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em; list-style-type: disc;">
        <li style="margin-bottom: 0.5em;">Unlike traditional betting systems, RIVALS ensures <strong>fair competition</strong> by matching players with similar skill levels.</li>
        <li style="margin-bottom: 0.5em;">The <strong>ranking system</strong> tracks performance and adjusts matchmaking accordingly, creating an even playing field.</li>
        <li style="margin-bottom: 0.5em;">This prevents experienced players from dominating lower-skilled competitors, making every match competitive and rewarding.</li>
      </ul>

      <h2 style="margin-bottom: 0.8em; font-size: 30px;">The Advantages of RIVALS Over Traditional Esports Platforms</h2>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em; list-style-type: disc;">
        <li style="margin-bottom: 0.5em;"><strong>No Need for Sponsorships or Streaming</strong>: Unlike Twitch or YouTube gaming, where earnings rely on views and ad revenue, RIVALS allows <strong>direct earnings from playing.</strong></li>
        <li style="margin-bottom: 0.5em;"><strong>Instant & Secure Payouts</strong>: With built-in real-time score validation, winnings are processed <strong>instantly</strong> without lengthy withdrawal periods.</li>
        <li style="margin-bottom: 0.5em;"><strong>Play Anytime, Anywhere</strong>: Whether playing for fun or aiming to earn consistently, RIVALS offers <strong>flexible competition options</strong> that fit all schedules.</li>
      </ul>

      <h2 style="margin-bottom: 0.8em; font-size: 30px;">Why Gamers Should Join RIVALS Today</h2>
      <p style="margin-bottom: 1.5em;">
        If you're looking for a <strong>fair, competitive, and rewarding</strong> way to monetize your gaming skills, RIVALS is the ultimate platform. Whether you enjoy friendly matches with friends, high-stakes tournaments, or simply testing your skills against others, RIVALS provides a <strong>secure and engaging</strong> way to turn your passion into profit.
      </p>

      <p style="margin-bottom: 1.5em; font-weight: bold; font-size: 20px; text-align: center;">
        Ready to revolutionize your gaming experience? Sign up on RIVALS today and start earning from your playtime!
      </p>
    </div>
  `,
  tags: ["Gaming", "Esports", "RIVALS"],
  readTime: "5 MIN",
};

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
  const blogContainerRef = useRef<HTMLDivElement>(null);
  const postDetailRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initial load animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial states
    gsap.set(".blog-header, .blog-post", {
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
    }).to(
      ".blog-post",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Function to handle smooth transition to blog post detail
  const handleOpenPost = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const blogContainer = blogContainerRef.current;
    if (!blogContainer) {
      setSelectedPost(blogPost.id);
      setIsAnimating(false);
      return;
    }

    // Store the scroll position to restore it later
    const scrollPosition = window.scrollY;

    // Fade out blog listing
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedPost(blogPost.id);
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
    <div
      className="w-full min-h-screen flex flex-col bg-transparent"
      ref={containerRef}
    >
      <Navbar
        goToEmailStep={goToEmailStep}
        goToBlogSection={goToBlogSection}
        goToAboutSection={goToAboutSection}
      />

      <div className="flex-grow flex flex-col items-start pt-20 md:pt-18 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Blog Header - Moved to the left */}
        <div className="blog-header w-full max-w-6xl mb-8">
           <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
             RIVALS <span className="text-[#02F199]">BLOG</span>
          </h1>
        </div>

        {/* Blog post or post detail */}
        {!selectedPost ? (
          <div className="w-full pb-16" ref={blogContainerRef}>
            <div
              className="blog-post bg-[#121212]/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:shadow-[0_0_30px_rgba(2,241,153,0.1)] transform hover:scale-[1.01] transition-all duration-300"
              onClick={handleOpenPost}
            >
              <div className="h-60 w-full overflow-hidden border-b border-white/10">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 rounded-md bg-[#151515] text-sm text-gray-300">
                    {blogPost.readTime}
                  </div>
                  {blogPost.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-md bg-[#02F199]/20 text-[#02F199] text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {blogPost.title}
                </h2>
                <p className="text-gray-300 text-lg mb-6">{blogPost.excerpt}</p>
                <div className="flex items-center text-gray-400 mb-3">
                  <span>{blogPost.date}</span>
                  <span className="mx-2">•</span>
                  <span>By {blogPost.author}</span>
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
          </div>
        ) : (
          // Single post detail view with animations
          <div className="w-full max-w-4xl pb-16 mx-auto" ref={postDetailRef}>
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

            <div className="bg-[#121212]/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
              <div className="h-64 md:h-96 overflow-hidden">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="post-detail-content flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 rounded-md bg-[#151515] text-sm text-gray-300">
                    {blogPost.readTime}
                  </div>
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-md bg-[#02F199]/20 text-[#02F199] text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="post-detail-content text-3xl md:text-4xl font-bold text-white mb-4">
                  {blogPost.title}
                </h1>
                <div className="post-detail-content flex items-center text-gray-400 mb-8">
                  <span>{blogPost.date}</span>
                  <span className="mx-2">•</span>
                  <span>By {blogPost.author}</span>
                </div>
                <div
                  className="post-detail-content prose prose-invert max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;

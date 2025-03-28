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
    title: "Unlocking Earnings with RIVALS Gaming",
    excerpt:
      "How Casual Gamers Can Monetize Their Playtime and Compete for Real Rewards",
    date: "March 15, 2025",
    author: "Joshua Jones",
    image: "/static/media/Card1.png", // Using existing images
    content: `
      <div class="blog-post-content" style="font-family: sans-serif; line-height: 1.6; color: #FFFFFF;">
        <h1 style="margin-bottom: 0.5em; font-size: 30px;">The Rise of Gaming as a Source of Income</h1>
        <p style="margin-bottom: 1.5em;">
          Gaming is no longer just a hobby. What was once seen as mere entertainment has evolved into a thriving industry where players can turn their skills into income. While professional esports players and streamers dominate the headlines, casual gamers also have lucrative opportunities to monetize their playtime. Thanks to platforms like RIVALS, gamers of all levels can now engage in skill-based competitions and earn real money without the need for sponsorships or large audiences.
        </p>

        <h2 style="margin-bottom: 0.5em; font-size: 30px;">How Casual Gamers Can Earn Money</h2>
        <p style="margin-bottom: 1.5em;">
          Casual gamers can monetize their playtime in various ways, but many traditional options require extensive effort. Streaming on platforms like Twitch or YouTube demands a significant following, and content creation involves hours of editing. However, RIVALS simplifies the process by allowing gamers to stake money in peer-to-peer competitions, offering immediate earning potential based on skill rather than popularity.
        </p>

        <h3 style="margin-bottom: 0.5em; font-size: 30px;">1. Peer-to-Peer Competitions</h3>
        <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
          <li>RIVALS enables casual gamers to compete in 1v1 or team-based matchups, where players stake a fixed amount against each other.</li>
          <li>Players can challenge their friends for friendly wagers or matchmake against other RIVALS players to test their skills and earn real money.</li>
          <li>The platform's real-time score validation ensures fair play, eliminating disputes and guaranteeing swift payouts.</li>
        </ul>

        <h3 style="margin-bottom: 0.5em; font-size: 30px;">2. Tournaments with Cash Prizes</h3>
        <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
          <li>Unlike traditional gaming competitions that require invites or professional status, RIVALS hosts open tournaments for all skill levels.</li>
          <li>Players can enter and win prize pools based on their performance, making it accessible for casual gamers looking to test their skills.</li>
          <li>If it's a 1v1 tournament, simply join and compete. If it's a team-based tournament, you can either join with your friends as a team or sign up as a free agent to be matched with other players looking for teammates.</li>
        </ul>

        <h3 style="margin-bottom: 0.5em; font-size: 30px;">3. Skill-Based Matchmaking for Fair Play</h3>
        <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
          <li>Many gamers hesitate to stake money due to fears of facing high-ranked players. RIVALS’ ranking system ensures balanced matchmaking, so competitors face opponents of similar skill levels.</li>
          <li>This creates a fair ecosystem where earnings are based on skill rather than being at the mercy of more experienced players.</li>
        </ul>

        <h2 style="margin-bottom: 0.5em; font-size: 30px;">Common Mistakes to Avoid When Monetizing Gameplay</h2>
        <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
          <li><strong>Ignoring Skill Progression:</strong> Many players jump into competitions without improving their skills, leading to losses. Practicing in casual matches before staking money can increase win rates.</li>
          <li><strong>Overlooking Game Selection:</strong> Not every game is equally lucrative. Picking games with an active competitive scene on RIVALS maximizes earning potential.</li>
          <li><strong>Poor Bankroll Management:</strong> Placing high stakes without a strategy can lead to quick losses. Smart players manage their stakes based on skill level and experience.</li>
        </ul>

        <h2 style="margin-bottom: 0.5em; font-size: 30px;">Why RIVALS is the Best Platform for Casual Gamers</h2>
        <p style="margin-bottom: 1.5em;">
          Traditional esports platforms cater mainly to professional players, leaving casual gamers with few earning options. RIVALS changes the game by providing secure, skill-based earnings without the need for sponsorships, social media presence, or elite gaming skills. With instant payouts, fair matchmaking, and various tournament options, RIVALS makes it easy for casual gamers to profit from their passion.
        </p>

        <h2 style="margin-bottom: 0.5em; font-size: 30px;">Ready to Turn Your Playtime into Profit?</h2>
        <p style="margin-bottom: 1.5em;">
          If you’ve ever wondered how to make money from gaming without streaming or grinding for sponsors, RIVALS offers the perfect solution. Sign up today, compete in skill-based matches, and start earning from your gameplay!
        </p>
      </div>
    `,
    tags: ["Gaming", "Money", "Esports"],
  },
  {
    id: "2",
    title: "From Casual to Pro: Developing Skills to Increase Gaming Income",
    excerpt:
      "Expert tips for dominating in RIVALS and maximizing your rewards.",
    date: "February 28, 2025",
    author: "Joshua Jones",
    image: "/static/media/Card2.png",
    content: `
    <div class="blog-post-content" style="font-family: sans-serif; line-height: 1.6; color: #FFFFFF;">
      <h1 style="margin-bottom: 0.5em; font-size: 30px;">
        Elevating Your Game to Earn More
      </h1>
      <p style="margin-bottom: 1.5em;">
        Gaming has evolved from a pastime into a viable source of income, but success requires more than just talent. Whether you’re looking to dominate peer-to-peer matches, excel in RIVALS tournaments, or climb the rankings, skill development is key to maximizing your earnings. By honing your abilities and leveraging the features of RIVALS, you can turn your gaming time into a profitable venture.
      </p>

      <h2 style="margin-bottom: 0.5em; font-size: 30px;">
        Essential Skills for Competitive Earnings
      </h2>
      <p style="margin-bottom: 1.5em;">
        If you’re serious about boosting your income, mastering these core skills will give you an edge over the competition:
      </p>

      <h3 style="margin-bottom: 0.5em; font-size: 30px;">1. In-Depth Game Knowledge</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li>Understanding the latest meta strategies, character builds, and game mechanics can separate you from the average player.</li>
        <li>Stay updated by following patch notes, watching top-tier players, and engaging in community discussions.</li>
      </ul>

      <h3 style="margin-bottom: 0.5em; font-size: 30px;">2. Advanced Decision-Making &amp; Strategy</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li>Whether in 1v1 matchups or team-based play, making quick, smart decisions is crucial.</li>
        <li>Study professional gameplay, review your own replays, and develop strategies tailored to different opponents.</li>
      </ul>

      <h3 style="margin-bottom: 0.5em; font-size: 30px;">3. Improving Mechanical Skill</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li>Refining aim, reaction time, and movement can be the difference between victory and defeat.</li>
        <li>Use aim trainers, practice in controlled settings, and focus on muscle memory.</li>
      </ul>

      <h3 style="margin-bottom: 0.5em; font-size: 30px;">4. Team Coordination &amp; Communication</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li>Team-based tournaments require strong teamwork. Whether you join with friends or as a free agent, clear and concise communication is vital.</li>
        <li>Develop synergy with teammates, use effective callouts, and learn rotations and positioning for competitive play.</li>
      </ul>

      <h3 style="margin-bottom: 0.5em; font-size: 30px;">5. Mental Resilience &amp; Adaptability</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li>Losses are inevitable, but learning from them is what separates pros from casuals.</li>
        <li>Analyze mistakes, adjust strategies, and stay mentally strong during tough matches.</li>
      </ul>

      <h2 style="margin-bottom: 0.5em; font-size: 30px;">
        Monetizing Your Skills on RIVALS
      </h2>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li>1v1 Peer-to-Peer Matches: Face off against other players or challenge friends in fair, skill-based competitions.</li>
        <li>Team-Based Tournaments: Join as a team with friends or enter as a free agent in larger competitions.</li>
        <li>Skill-Based Matchmaking: Compete against players of similar skill levels for balanced and competitive earnings.</li>
      </ul>

      <h2 style="margin-bottom: 0.5em; font-size: 30px;">
        Mistakes to Avoid on Your Journey
      </h2>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em;">
        <li>Neglecting Game Fundamentals: Fancy plays won’t help if you don’t have a strong grasp of the basics.</li>
        <li>Not Adapting to Game Updates: Staying stagnant while the game evolves can make you fall behind.</li>
        <li>Poor Bankroll Management: Bet strategically and only stake what aligns with your confidence level.</li>
      </ul>

      <h2 style="margin-bottom: 0.5em; font-size: 30px;">
        Ready to Level Up Your Earnings?
      </h2>
      <p style="margin-bottom: 1.5em;">
        The journey from casual to pro takes time and dedication, but the rewards are worth it. Sign up on RIVALS today, put your skills to the test, and start earning from every game you play!
      </p>
    </div>
    `,
    tags: ["Strategy", "Tournaments", "Tips"],
  },
  {
    id: "3",
    title: "Introduction to RIVALS: Revolutionizing Gamer Earnings",
    excerpt: "An inside look at how RIVALS is changing gaming.",
    date: "January 22, 2025",
    author: "Joshua Jones",
    image: "/static/media/Card3.png",
    content:
      `
    <div class="blog-post-content" style="font-family: sans-serif; line-height: 1.6; color: #FFFFFF;">
      <h2 style="margin-bottom: 0.5em; font-size: 30px;">Introduction to RIVALS</h2>
      <p style="margin-bottom: 1.5em; ">
        The gaming industry has evolved beyond simple entertainment. Today, gamers seek platforms that offer both competitive excitement and financial rewards. RIVALS is at the forefront of this transformation, providing an innovative ecosystem where players can monetize their skills through peer-to-peer matches, real-time score validation, and skill-based tournaments. Unlike traditional esports models that require sponsorships or extensive social media followings, RIVALS enables players of all levels to earn money directly from their gameplay.
      </p>

      <h2 style="margin-bottom: 0.5em; font-size: 30px;">How RIVALS is Changing the Game</h2>
      <p style="margin-bottom: 1.5em; ">
        RIVALS is not just another esports platform. It offers unique features that set it apart from conventional gaming ecosystems. Here’s how it is revolutionizing gamer earnings:
      </p>

      <h3 style="margin-bottom: 0.5em; font-size: 30px;">1. Peer-to-Peer Competitions</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em; ">
        <li>Players can engage in 1v1 matches or team-based competitions, staking real money against their opponents.</li>
        <li>Users can challenge their friends for bragging rights or matchmake against other RIVALS players in fair, skill-based competitions.</li>
        <li>The platform ensures transparent and instant payouts with real-time score validation, preventing disputes and enhancing trust.</li>
      </ul>

      <h3 style="margin-bottom: 0.5em; font-size: 30px;">2. Skill-Based Tournaments</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em; ">
        <li>RIVALS hosts tournaments for all skill levels, allowing casual and competitive players to participate.</li>
        <li>Gamers can enter solo 1v1 tournaments or, in team-based competitions, join with their squad or sign up as a free agent to be matched with teammates.</li>
        <li>Prize pools are distributed based on performance rather than popularity, giving everyone a fair shot at earning.</li>
      </ul>

      <h3 style="margin-bottom: 0.5em; font-size: 30px;">3. Fair Matchmaking &amp; Ranking System</h3>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em; ">
        <li>Unlike traditional betting systems, RIVALS ensures fair competition by matching players with similar skill levels.</li>
        <li>The ranking system tracks performance and adjusts matchmaking accordingly, creating an even playing field.</li>
        <li>This prevents experienced players from dominating lower-skilled competitors, making every match competitive and rewarding.</li>
      </ul>

      <h2 style="margin-bottom: 0.5em; font-size: 30px;">
        The Advantages of RIVALS Over Traditional Esports Platforms
      </h2>
      <ul style="margin-bottom: 1.5em; padding-left: 1.5em; ">
        <li>No Need for Sponsorships or Streaming: Unlike Twitch or YouTube gaming, where earnings rely on views and ad revenue, RIVALS allows direct earnings from playing.</li>
        <li>Instant &amp; Secure Payouts: With built-in real-time score validation, winnings are processed instantly without lengthy withdrawal periods.</li>
        <li>Play Anytime, Anywhere: Whether playing for fun or aiming to earn consistently, RIVALS offers flexible competition options that fit all schedules.</li>
      </ul>

      <h2 style="margin-bottom: 0.5em; font-size: 30px;">Why Gamers Should Join RIVALS Today</h2>
      <p style="margin-bottom: 1.5em; ">
        If you're looking for a fair, competitive, and rewarding way to monetize your gaming skills, RIVALS is the ultimate platform. Whether you enjoy friendly matches with friends, high-stakes tournaments, or simply testing your skills against others, RIVALS provides a secure and engaging way to turn your passion into profit.
      </p>

      <h2 style="margin-bottom: 0.5em; font-size: 30px;">
        Ready to Revolutionize Your Gaming Experience?
      </h2>
      <p style="margin-bottom: 1.5em; ">
        Sign up on RIVALS today and start earning from your playtime!
      </p>
    </div>
 `,
    tags: ["Technology", "Gaming", "RIVALS"],
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
                      src={post.image || "/static/media/Card1.png"}
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
                    src={currentPost.image || "/static/media/Card1.png"}
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
                  <div
                    className="post-detail-content prose prose-invert max-w-none text-gray-300"
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                  />
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

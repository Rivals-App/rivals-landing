/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import blogPosts from "../data/blog.data";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function ClientBlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const postDetailRef = useRef<HTMLDivElement>(null);

  // Directly access the resolved slug from params
  const { slug } = params;

  // Find the blog post by slug
  const post = blogPosts.find((p) => p.slug === slug);

  // Log for debugging in case post isn't found
  React.useEffect(() => {
    if (!post) {
      console.error(`Post not found: ${slug}`);
      console.log("Available posts:", blogPosts.map((p) => p.slug));
    }
  }, [post, slug]);

  // If the post still doesn't exist at render time, show error UI
  if (!post) {
    return (
      <div className="min-h-screen bg-[#0F2841] flex flex-col text-white">
        <div className="w-full min-h-screen flex flex-col bg-transparent">
          <Navbar />
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="max-w-xl mx-auto text-center px-4">
              <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
              <p className="text-gray-300 mb-8">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => router.push("/blog")}
                className="px-6 py-2 bg-[#02F199] text-[#0c412e] font-semibold rounded-lg hover:bg-opacity-80"
              >
                Back to Blog
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // GSAP animation for the blog post content.
  useEffect(() => {
    if (postDetailRef.current) {
      const tl = gsap.timeline();
      gsap.set(".post-detail-content", { opacity: 0, y: 30 });
      tl.to(".post-detail-content", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, []);

  const handleBackToBlog = () => {
    router.push("/blog");
  };

  return (
    <div className="min-h-screen bg-[#0F2841] flex flex-col text-white">
      <div className="w-full min-h-screen flex flex-col bg-transparent">
        <Navbar />
        <div className="flex-grow flex flex-col items-start pt-16 md:pt-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="w-full max-w-7xl pb-16 mx-auto" ref={postDetailRef}>
            <button
              onClick={handleBackToBlog}
              className="post-detail-content mb-6 text-[#02F199] flex items-center hover:underline"
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

            <div className="bg-[#121212]/80 border border-white/10 rounded-xl overflow-hidden shadow-xl">
              <div className="h-64 md:h-96 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1024}
                  height={384}
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

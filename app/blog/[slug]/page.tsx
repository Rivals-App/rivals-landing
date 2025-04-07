import type { Metadata } from "next";
import { notFound } from "next/navigation";
import blogPosts from "../data/blog.data";
import ClientBlogPostPage from "./ClientBlogPostPage";

// Pre-generate all blog post paths
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata dynamically based on the blog post.
// Here, we await the params to ensure we have the resolved slug.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  return {
    title: `${post.title} – Rivals Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", ") + ", Rivals, gaming, esports",
    alternates: {
      canonical: `https://www.rivalsapp.com/blog/${post.slug}`,
    },
    authors: [{ name: post.author }],
    publisher: "Rivals Gaming Ltd",
    robots: {
      index: true,
      follow: true,
    },
  };
}

// The page component is async so we can await params.
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  console.log("Current slug:", resolvedParams.slug);
  console.log("Available posts:", blogPosts.map((p) => p.slug));
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) {
    notFound();
  }
  return <ClientBlogPostPage params={resolvedParams} />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Rivals – The Future of Competitive Gaming",
  description:
    "Meet the team behind Rivals, the leading skill gaming platform. Our story, vision, and mission to make competitive gaming rewarding for everyone.",
  keywords: [
    "about rivals",
    "esports startup",
    "competitive gaming platform",
    "skill gaming founders",
    "gaming fintech",
    "rivals gaming team",
    "raj sandhu",
  ],
  alternates: {
    canonical: "https://www.rivalsapp.com/about-rivals",
  },
  authors: [{ name: "Rivals" }],
  publisher: "Rivals Gaming Ltd",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

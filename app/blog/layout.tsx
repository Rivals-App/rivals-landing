import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rivals Blog – Esports, Staking, and Gaming Insights",
  description:
    "Read expert articles and updates on competitive gaming, staking, crypto rewards, and the future of skill-based esports.",
  keywords: [
    "gaming blog",
    "esports insights",
    "skill gaming news",
    "crypto gaming articles",
    "staking strategy",
    "monetise gaming skills",
    "p2p wagering blog",
  ],
  alternates: {
    canonical: "https://www.rivalsapp.com/blog",
  },
  authors: [{ name: "Rivals" }],
  publisher: "Rivals Gaming Ltd",
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

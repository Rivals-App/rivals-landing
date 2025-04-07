import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal – Rivals Terms, Privacy & Cookies",
  description:
    "Read Rivals’ terms of use, privacy policy, and cookie policy. Stay informed on how we protect your data and ensure a fair gaming experience.",
  keywords: [
    "Rivals terms",
    "gaming privacy",
    "esports legal",
    "staking policy",
    "cookie settings",
    "rivals platform rules",
  ],
  alternates: {
    canonical: "https://www.rivalsapp.com/legal",
  },
  authors: [{ name: "Rivals" }],
  publisher: "Rivals Gaming Ltd",
  robots: {
    index: true,
    follow: true,
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

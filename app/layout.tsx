// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rivals – Stake. Play. Get Paid.",
  description:
    "Rivals is a skill-based gaming platform where players wager on themselves and earn real money. Play 1v1, team matches, arcade games, or tournaments. Built for true competitors.",
  keywords: [
    "skill gaming",
    "stake and win",
    "earn money gaming",
    "esports staking",
    "crypto games",
    "p2p gaming",
    "play for money",
    "competitive gaming",
    "Dota 2 wagering",
    "arcade for cash",
  ],
  alternates: {
    canonical: "https://www.rivalsapp.com/",
  },
  authors: [{ name: "Rivals" }],
  publisher: "Rivals Gaming Ltd",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

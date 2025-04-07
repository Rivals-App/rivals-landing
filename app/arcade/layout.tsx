import type { Metadata } from "next";

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
    canonical: "https://www.rivalsapp.com/arcade",
  },
  authors: [{ name: "Rivals" }],
  publisher: "Rivals Gaming Ltd",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ArcadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

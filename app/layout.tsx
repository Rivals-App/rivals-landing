import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { WithContext, Organization, WebSite } from "schema-dts";

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

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: "Rivals – Competitive Skill-Based Gaming Platform | Stake. Play. Win.",
  description:
    "Rivals is a skill-based gaming platform where players compete and earn real money through 1v1 matches, tournaments, and team competitions.",
  keywords: [
    "skill gaming",
    "stake and win",
    "earn money gaming",
    "esports staking",
    "crypto games",
    "p2p gaming",
    "play for money",
    "competitive gaming",
    "gaming tournaments",
    "esports platform",
    "win real rewards",
    "arcade gaming",
    "Dota 2 wagering",
    "team matches",
    "1v1 gaming",
    "skill-based rewards",
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
  openGraph: {
    type: "website",
    url: "https://www.rivalsapp.com/",
    title: "Rivals – Competitive Skill-Based Gaming Platform | Stake. Play. Win.",
    description: "Compete in skill-based games and earn real money. Join tournaments, play 1v1 or team matches, and win rewards based on your skill.",
    siteName: "Rivals",
    images: [
      {
        url: "https://www.rivalsapp.com/static/media/Logo1.png",
        width: 1200,
        height: 630,
        alt: "Rivals Gaming Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivals – Competitive Skill-Based Gaming Platform",
    description: "Compete in skill-based games and earn real money. Join tournaments, play 1v1 or team matches, and win rewards based on your skill.",
    images: ["https://www.rivalsapp.com/static/media/Logo1.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define organization schema
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rivals",
    "url": "https://www.rivalsapp.com/",
    "logo": "https://www.rivalsapp.com/static/media/Logo1.png",
    "description": "Rivals is a skill-based gaming platform where players wager on themselves and earn real money."
  };

  // Define website schema
  const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rivals",
    "url": "https://www.rivalsapp.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.rivalsapp.com/search?q={search_term_string}"
      }
    }
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body
        className={`${satoshi.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        {/* Replace G-XXXXXXXXXX with your actual Google Analytics ID */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}

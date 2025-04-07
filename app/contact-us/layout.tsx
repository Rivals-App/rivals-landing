import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Rivals – Partnerships, Support & Press",
  description:
    "Get in touch with Rivals Gaming Ltd for support, influencer partnerships, press enquiries, or business opportunities.",
  keywords: [
    "contact rivals",
    "gaming support",
    "esports partnerships",
    "stake to win help",
    "gaming enquiries",
    "contact Raj Sandhu",
    "rivals email",
  ],
  alternates: {
    canonical: "https://www.rivalsapp.com/contact-us",
  },
  authors: [{ name: "Rivals" }],
  publisher: "Rivals Gaming Ltd",
  robots: {
    index: true,
    follow: true,
  },
};
  
  export default function ContactLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div>{children}</div>;
  }
  
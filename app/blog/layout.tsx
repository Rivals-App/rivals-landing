export const metadata = {
  title: "Rivals Blog | News & Updates",
  description:
    "Stay updated with the latest articles about competitive gaming, skill-based competitions, and monetizing your gameplay with RIVALS.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

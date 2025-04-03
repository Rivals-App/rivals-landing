export const metadata = {
  title: "Rivals Arcade",
  description:
    "Compete and win in skill-based arcade games on the Rivals platform",
};

export default function ArcadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

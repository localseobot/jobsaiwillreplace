import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is Your Job Safe from AI? Find Out in 2 Minutes",
  description:
    "Goldman Sachs says 300 million jobs face AI disruption. Take the free 2-minute assessment to see exactly how exposed your career is — and what to do about it.",
  alternates: { canonical: "https://jobsaiwillreplace.com/start" },
  openGraph: {
    title: "Is Your Job Safe from AI? Find Out in 2 Minutes",
    description:
      "Free 2-minute assessment. See exactly how exposed your career is to AI — and the specific steps to stay ahead.",
    url: "https://jobsaiwillreplace.com/start",
    type: "website",
  },
  robots: {
    index: false, // Paid traffic landing page — don't compete with organic pages
    follow: true,
  },
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

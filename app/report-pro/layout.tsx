import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Proof Career Plan — Full Report & Action Plan",
  description:
    "Your complete AI career risk breakdown with task-by-task analysis, personalized skill roadmap, AI tools, salary insights, and 30/90-day action plans.",
  robots: { index: false, follow: true },
};

export default function ReportProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

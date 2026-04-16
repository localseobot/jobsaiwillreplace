import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your AI Risk Report — Personalized Career Analysis",
  description:
    "See your AI replacement risk score, timeline estimate, and which tasks in your role are most vulnerable to automation.",
  robots: { index: false, follow: true },
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

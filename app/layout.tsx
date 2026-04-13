import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jobs AI Will Replace | Will AI Take Your Job?",
  description:
    "Find out how likely AI is to replace your job. Take our free assessment and get a personalized AI impact report with timeline predictions and actionable insights.",
  keywords: [
    "AI job replacement",
    "will AI take my job",
    "AI automation risk",
    "future of work",
    "AI career impact",
  ],
  openGraph: {
    title: "Jobs AI Will Replace | Will AI Take Your Job?",
    description:
      "Find out how likely AI is to replace your job. Get your personalized AI impact report.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

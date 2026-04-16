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
  title: "Is Your Job Safe From AI? | Free AI Career Risk Assessment",
  description:
    "Find out how vulnerable your job is to AI automation. Get your free risk score and a personalized plan to future-proof your career.",
  keywords: [
    "AI job replacement",
    "will AI take my job",
    "AI automation risk",
    "future of work",
    "AI career impact",
  ],
  openGraph: {
    title: "Is Your Job Safe From AI? | Free Career Risk Assessment",
    description:
      "Find out how vulnerable your job is to AI. Get your free risk score and a plan to stay ahead.",
    type: "website",
    url: "https://jobsaiwillreplace.com",
    images: [
      {
        url: "https://jobsaiwillreplace.com/api/og",
        width: 1200,
        height: 630,
        alt: "Jobs AI Will Replace - AI Career Impact Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is Your Job Safe From AI?",
    description:
      "Free AI career risk assessment. Get your score and a personalized plan to future-proof your career.",
    images: ["https://jobsaiwillreplace.com/api/og"],
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

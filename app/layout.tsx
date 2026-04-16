import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jobs AI Will Replace — AI Career Risk Tracker",
  description:
    "Track which jobs AI is replacing. Get your free risk score and a personalized plan to future-proof your career.",
  keywords: [
    "AI job replacement",
    "will AI take my job",
    "AI automation risk",
    "future of work",
    "AI career impact",
    "jobs AI will replace",
  ],
  openGraph: {
    title: "Jobs AI Will Replace — AI Career Risk Tracker",
    description:
      "Track which jobs AI is replacing. Get your free risk score and a plan to stay ahead.",
    type: "website",
    url: "https://jobsaiwillreplace.com",
    images: [
      {
        url: "https://jobsaiwillreplace.com/api/og",
        width: 1200,
        height: 630,
        alt: "Jobs AI Will Replace - AI Career Impact Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs AI Will Replace",
    description:
      "Track which jobs AI is replacing. Free risk assessment and personalized career plan.",
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
      className={`${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

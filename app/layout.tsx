import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://jobsaiwillreplace.com"),
  title: {
    default: "Jobs AI Will Replace — Free AI Career Risk Assessment",
    template: "%s — Jobs AI Will Replace",
  },
  description:
    "Will AI take your job? Get a free AI risk score in 2 minutes. See which tasks are most exposed and get a personalized plan to future-proof your career.",
  keywords: [
    "AI job replacement",
    "will AI take my job",
    "AI automation risk",
    "future of work",
    "AI career impact",
    "jobs AI will replace",
    "AI job displacement",
    "career risk assessment",
    "AI replacing jobs",
    "future proof career",
  ],
  authors: [{ name: "Jobs AI Will Replace" }],
  creator: "Jobs AI Will Replace",
  publisher: "Jobs AI Will Replace",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jobsaiwillreplace.com",
  },
  openGraph: {
    title: "Jobs AI Will Replace — Free AI Career Risk Assessment",
    description:
      "Will AI take your job? Get a free AI risk score in 2 minutes. See which tasks are most exposed and get a personalized career plan.",
    type: "website",
    url: "https://jobsaiwillreplace.com",
    siteName: "Jobs AI Will Replace",
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Jobs AI Will Replace — Free AI Career Risk Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs AI Will Replace — Free AI Career Risk Assessment",
    description:
      "Will AI take your job? Get a free risk score in 2 minutes. Personalized career plan included.",
    images: ["/api/og"],
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TPYM9FXJD1"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TPYM9FXJD1');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Jobs AI Will Replace",
                  url: "https://jobsaiwillreplace.com",
                  description:
                    "Track which jobs AI is replacing. Get a free AI risk score and a personalized plan to future-proof your career.",
                },
                {
                  "@type": "Organization",
                  name: "Jobs AI Will Replace",
                  url: "https://jobsaiwillreplace.com",
                  logo: "https://jobsaiwillreplace.com/logo.png",
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

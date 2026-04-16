import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getJobBySlug, getAllJobSlugs } from "@/lib/jobs";

export async function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return {};
  return {
    title: job.title,
    description: job.description,
    keywords: job.keywords,
    alternates: {
      canonical: `https://jobsaiwillreplace.com/jobs/${slug}`,
    },
    openGraph: {
      title: `${job.title} — Jobs AI Will Replace`,
      description: job.description,
      type: "article",
      url: `https://jobsaiwillreplace.com/jobs/${slug}`,
      siteName: "Jobs AI Will Replace",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: job.title,
      description: job.description,
      images: ["/api/og"],
    },
  };
}

function riskColor(score: number) {
  if (score < 30) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (score <= 60) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-brand-red bg-red-50 border-red-200";
}

function riskLabel(level: string) {
  return level
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: job.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: job.summary,
        },
      },
      {
        "@type": "Question",
        name: `What can AI already do in this field?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: job.whatAiCanDo.join(". "),
        },
      },
      {
        "@type": "Question",
        name: `What can't AI do yet in this role?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: job.whatAiCantDo.join(". "),
        },
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: job.title,
    description: job.description,
    author: {
      "@type": "Organization",
      name: "Jobs AI Will Replace",
      url: "https://jobsaiwillreplace.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Jobs AI Will Replace",
      url: "https://jobsaiwillreplace.com",
      logo: {
        "@type": "ImageObject",
        url: "https://jobsaiwillreplace.com/logo.png",
      },
    },
    mainEntityOfPage: `https://jobsaiwillreplace.com/jobs/${slug}`,
    image: "https://jobsaiwillreplace.com/api/og",
    keywords: job.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <main className="flex-1 py-12">
        <article className="max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <Link
              href="/jobs"
              className="text-brand-gray text-sm hover:text-brand-black transition-colors"
            >
              &larr; Back to All Jobs
            </Link>
          </div>

          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-black tracking-tight leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-semibold ${riskColor(
                  job.riskScore
                )}`}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                  }}
                >
                  {job.riskScore}%
                </span>{" "}
                AI Risk &mdash; {riskLabel(job.riskLevel)}
              </span>
              <span className="text-brand-gray text-sm">
                Timeline: <strong className="text-brand-black">{job.timeline}</strong>
              </span>
            </div>

            <p className="text-brand-gray text-lg mt-6 leading-relaxed">
              {job.summary}
            </p>

            <div className="section-divider mt-8" />
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black tracking-tight mb-4">
              What AI Can Already Do
            </h2>
            <ul className="space-y-2 text-brand-gray">
              {job.whatAiCanDo.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand-red mt-1 shrink-0">&#9632;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black tracking-tight mb-4">
              What AI Can&apos;t Do Yet
            </h2>
            <ul className="space-y-2 text-brand-gray">
              {job.whatAiCantDo.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1 shrink-0">&#9632;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black tracking-tight mb-4">
              Future Outlook
            </h2>
            <p className="text-brand-gray leading-relaxed">{job.futureOutlook}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black tracking-tight mb-4">
              How to Adapt
            </h2>
            <ul className="space-y-2 text-brand-gray">
              {job.howToAdapt.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand-black mt-1 shrink-0">&#9656;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="section-divider mt-12 mb-10" />

          <div className="bg-brand-bg p-8 rounded-lg border border-brand-border text-center">
            <h3 className="text-xl font-bold text-brand-black mb-3">
              Find out your personal AI risk score
            </h3>
            <p className="text-brand-gray mb-6">
              Take our free 2-minute assessment and get a personalized breakdown
              of how AI will impact your specific role.
            </p>
            <Link href="/survey" className="btn-primary">
              Take the Free Assessment
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

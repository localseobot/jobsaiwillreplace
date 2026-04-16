import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllJobs } from "@/lib/jobs";

export const metadata = {
  title: "Will AI Replace Your Job? — Job-by-Job Analysis",
  description:
    "Which jobs will AI replace? Browse our job-by-job analysis of AI automation risk, with risk scores, timelines, and adaptation strategies for every role.",
  alternates: {
    canonical: "https://jobsaiwillreplace.com/jobs",
  },
  openGraph: {
    title: "Will AI Replace Your Job? — Job-by-Job Analysis",
    description:
      "Which jobs will AI replace? Browse our job-by-job analysis of AI automation risk, with risk scores, timelines, and adaptation strategies for every role.",
    url: "https://jobsaiwillreplace.com/jobs",
  },
};

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

export default function JobsPage() {
  const jobs = getAllJobs();

  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-brand-black tracking-tight">
              Will AI Replace Your Job?
            </h1>
            <p className="text-brand-gray mt-4 max-w-xl mx-auto">
              Job-by-job analysis of AI automation risk. Find your role, see the
              risk score, and learn how to stay ahead.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="block p-6 rounded-lg border border-brand-border bg-white hover:border-brand-red/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${riskColor(
                      job.riskScore
                    )}`}
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                    }}
                  >
                    {job.riskScore}% Risk
                  </span>
                  <span className="text-brand-light-gray text-xs">
                    {job.timeline}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-brand-black group-hover:text-brand-red transition-colors">
                  {job.title}
                </h2>
                <p className="text-brand-gray text-sm mt-1">
                  {riskLabel(job.riskLevel)} Risk
                </p>
              </Link>
            ))}
          </div>

          {jobs.length === 0 && (
            <p className="text-center text-brand-gray mt-8">
              Job analyses coming soon. Check back shortly.
            </p>
          )}

          <div className="mt-16 text-center">
            <Link href="/survey" className="btn-primary">
              Check Your AI Risk Score — Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

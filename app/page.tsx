import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-transparent" />
          <div className="max-w-6xl mx-auto px-4 pt-24 pb-20 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium">
                Free AI Job Impact Assessment
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                Will AI{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Replace
                </span>{" "}
                Your Job?
              </h1>
              <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Take our 2-minute assessment and get an AI-powered report on how
                automation will impact your career — with a timeline, risk
                score, and actionable insights.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/survey"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 animate-pulse-glow"
                >
                  Find Out Now — It&apos;s Free
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
              <p className="mt-4 text-zinc-500 text-sm">
                No signup required. Get your report in under 60 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-16">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Take the Quiz",
                  desc: "Answer 7 quick questions about your job, tasks, and industry.",
                },
                {
                  step: "02",
                  title: "AI Analyzes Your Role",
                  desc: "Our AI cross-references your answers with current automation trends and capabilities.",
                },
                {
                  step: "03",
                  title: "Get Your Report",
                  desc: "Receive a personalized risk score, timeline, and recommendations instantly.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-5xl font-bold text-white/5">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              What You Get — Completely Free
            </h2>
            <p className="text-center text-zinc-400 mb-16 max-w-xl mx-auto">
              A comprehensive AI career impact report, no strings attached.
            </p>
            <div className="max-w-2xl mx-auto p-8 rounded-2xl border-2 border-red-500/50 bg-red-500/5 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full uppercase">
                100% Free
              </div>
              <div className="text-sm font-medium text-red-400 uppercase tracking-wider">
                Full Report
              </div>
              <div className="mt-2 text-4xl font-bold text-white">
                $0
              </div>
              <ul className="mt-8 space-y-4">
                {[
                  "AI replacement risk score & timeline",
                  "Task-by-task automation analysis",
                  "Personalized learning roadmap",
                  "AI tools for your specific role",
                  "Video courses & resources",
                  "Career future-proofing strategies",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/survey"
                className="mt-8 block text-center py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
              >
                Get Your Free Report
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Don&apos;t Get Left Behind
            </h2>
            <p className="mt-4 text-zinc-400 text-lg">
              AI is transforming every industry. Understanding your risk is the
              first step to staying ahead.
            </p>
            <Link
              href="/survey"
              className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Check Your Job Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

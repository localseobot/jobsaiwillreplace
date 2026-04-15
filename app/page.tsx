import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            How vulnerable is your career to AI?
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Upload your resume or answer 7 quick questions to get a data-driven
            assessment of your role&apos;s automation risk, a personalized timeline,
            and a clear action plan.
          </p>
          <div className="mt-8">
            <Link
              href="/survey"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white text-base font-medium px-7 py-3.5 rounded-lg transition-colors"
            >
              Start Free Assessment
            </Link>
          </div>
          <p className="mt-3 text-gray-400 text-sm">
            No account required. Upload your resume or answer manually.
          </p>
        </section>

        {/* How it works */}
        <section className="border-t border-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-center mb-10">
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload resume or answer 7 questions",
                  desc: "Upload your resume for instant AI analysis, or answer a short survey.",
                },
                {
                  step: "2",
                  title: "We analyze your role",
                  desc: "Cross-referencing your profile against current AI capabilities and trends.",
                },
                {
                  step: "3",
                  title: "Get your report",
                  desc: "Risk score, task-by-task breakdown, learning roadmap, and recommended tools.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <div className="text-sm font-semibold text-gray-300 mb-2">{item.step}.</div>
                  <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="border-t border-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-center mb-10">
              Your report includes
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 max-w-xl mx-auto">
              {[
                "Automation risk score (0-100)",
                "Task-by-task vulnerability analysis",
                "Industry trend assessment",
                "Personalized learning roadmap",
                "Recommended AI tools for your role",
                "Career future-proofing strategies",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-1 h-1 rounded-full bg-gray-300 mt-2.5 shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-100 py-16">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Understanding your risk is step one.
            </h2>
            <p className="mt-3 text-gray-500">
              The job market is shifting fast. Find out where you stand.
            </p>
            <Link
              href="/survey"
              className="mt-6 inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-7 py-3.5 rounded-lg transition-colors"
            >
              Take the Assessment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

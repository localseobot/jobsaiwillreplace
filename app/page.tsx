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
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
            Free AI Career Assessment
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Is your job safe from AI?
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Find out how vulnerable your role really is — and get a clear plan
            to stay ahead. Upload your resume or answer a few quick questions.
          </p>
          <div className="mt-8">
            <Link
              href="/survey"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white text-base font-medium px-8 py-4 rounded-lg transition-colors"
            >
              Find Out Your Risk — Free
            </Link>
          </div>
          <p className="mt-3 text-gray-400 text-sm">
            Takes 2 minutes. No account needed.
          </p>
        </section>

        {/* Pain points */}
        <section className="border-t border-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-3">
              AI is changing the job market fast.
            </h2>
            <p className="text-center text-gray-500 max-w-xl mx-auto mb-12">
              Most people have no idea how exposed their role is. We help you find out — and tell you exactly what to do about it.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "How at risk is my job?",
                  desc: "Get a clear score showing how likely AI is to impact your specific role and tasks.",
                },
                {
                  title: "What gets automated first?",
                  desc: "See which of your daily tasks are most vulnerable — and which ones still need a human.",
                },
                {
                  title: "What should I do now?",
                  desc: "Don't just learn your risk. Get a personalized action plan with skills to learn and tools to master.",
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border border-gray-200 bg-white">
                  <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-gray-100 py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-center mb-10">
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Share your background",
                  desc: "Upload your resume, paste your LinkedIn, or answer 7 quick questions about your role.",
                },
                {
                  step: "2",
                  title: "Get your risk score",
                  desc: "Our AI analyzes your role against current automation capabilities and industry trends.",
                },
                {
                  step: "3",
                  title: "Unlock your action plan",
                  desc: "See your full breakdown and get a personalized plan to future-proof your career.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold mb-3">{item.step}</div>
                  <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get (free vs paid) */}
        <section className="border-t border-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-10">
              Free assessment, premium action plan
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-gray-200">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Free</div>
                <ul className="space-y-3">
                  {[
                    "AI risk score (0–100)",
                    "Timeline estimate",
                    "Impact summary",
                    "Top tasks at risk",
                    "Tasks that protect you",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl border-2 border-gray-900 relative">
                <div className="absolute -top-3 left-6 px-3 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
                <div className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">AI-Proof Career Plan</div>
                <ul className="space-y-3">
                  {[
                    "Everything in Free",
                    "Task-by-task risk breakdown",
                    "Personalized skill roadmap",
                    "AI tools for your role",
                    "Safer career pivots",
                    "30 & 90-day action plans",
                    "Salary & opportunity insights",
                    "Downloadable PDF report",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-gray-900 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 text-sm text-gray-500">
                  One-time payment — <span className="text-gray-900 font-bold text-lg">$9</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof / stats */}
        <section className="border-t border-gray-100 py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { stat: "300M", label: "jobs at risk from AI globally" },
                { stat: "40%", label: "of all roles impacted in the next decade" },
                { stat: "25-50%", label: "higher earnings for workers who adapt" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-2xl font-bold text-gray-900">{item.stat}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-gray-100 py-16">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Don&apos;t wait to find out the hard way.
            </h2>
            <p className="mt-3 text-gray-500">
              The job market is shifting fast. Find out where you stand — and what to do about it.
            </p>
            <Link
              href="/survey"
              className="mt-6 inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-lg transition-colors"
            >
              Start My Free Assessment
            </Link>
            <p className="mt-3 text-gray-400 text-sm">
              2 minutes. No sign-up required.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

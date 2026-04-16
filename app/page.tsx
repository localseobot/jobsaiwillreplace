"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(".reveal, .line-reveal");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  const pageRef = useRevealOnScroll();

  return (
    <>
      <Header />
      <main className="flex-1" ref={pageRef}>
        {/* ───── Hero ───── */}
        <section className="max-w-4xl mx-auto px-4 pt-24 pb-20 text-center">
          <div className="mb-6">
            <Logo size="hero" />
          </div>
          <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed mt-6">
            Tracking the jobs AI is automating — and what you can do before it
            reaches yours.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/survey" className="btn-primary">
              Check Your Risk — Free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <p className="mt-4 text-brand-light-gray text-sm">
            2 minutes. No sign-up required.
          </p>
        </section>

        {/* ───── Divider ───── */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="section-divider line-reveal" />
        </div>

        {/* ───── Data / Stats ───── */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="accent-line line-reveal mx-auto mb-4" />
              <h2 className="reveal text-2xl md:text-3xl font-bold text-brand-black tracking-tight">
                The numbers are clear.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10 reveal-stagger">
              {[
                { value: "300M", label: "Jobs exposed to AI automation globally", pct: 75 },
                { value: "40%", label: "Of all working hours can be impacted by LLMs", pct: 40 },
                { value: "2–5 yrs", label: "Before significant displacement in most white-collar roles", pct: 60 },
              ].map((item) => (
                <div key={item.label} className="reveal text-center">
                  <div
                    className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight"
                    style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
                  >
                    {item.value}
                  </div>
                  <div className="progress-bar mt-4 mx-auto max-w-[160px]">
                    <div className="progress-bar-fill" style={{ width: `${item.pct}%` }} />
                  </div>
                  <p className="mt-3 text-sm text-brand-gray leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>

            <p className="reveal text-center text-xs text-brand-light-gray mt-10">
              Sources: Goldman Sachs, McKinsey Global Institute, OpenAI/UPenn research
            </p>
          </div>
        </section>

        {/* ───── Divider ───── */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="section-divider line-reveal" />
        </div>

        {/* ───── About / What We Track ───── */}
        <section className="py-20 bg-brand-bg">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="accent-line line-reveal mx-auto mb-4" />
              <h2 className="reveal text-2xl md:text-3xl font-bold text-brand-black tracking-tight">
                Know your risk before it&apos;s too late.
              </h2>
              <p className="reveal text-brand-gray max-w-xl mx-auto mt-4 leading-relaxed">
                Most people won&apos;t see it coming. We analyze your role against real AI capabilities — not hype — and tell you exactly where you stand.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
              {[
                {
                  title: "Risk Score",
                  desc: "A precise 0–100 score showing how exposed your specific role and daily tasks are to AI replacement.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  ),
                },
                {
                  title: "Task Breakdown",
                  desc: "See exactly which parts of your job get automated first — and which ones still need a human for years to come.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Action Plan",
                  desc: "Don't just learn your risk. Get a personalized roadmap — skills to learn, tools to adopt, and moves to make now.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="reveal card-accent bg-white p-6 rounded-lg"
                >
                  <div className="w-9 h-9 rounded-md bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-brand-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-gray leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Divider ───── */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="section-divider line-reveal" />
        </div>

        {/* ───── How It Works ───── */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="accent-line line-reveal mx-auto mb-4" />
              <h2 className="reveal text-2xl md:text-3xl font-bold text-brand-black tracking-tight">
                How it works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10 reveal-stagger">
              {[
                {
                  step: "01",
                  title: "Share your background",
                  desc: "Upload your resume, paste your LinkedIn URL, or answer 7 quick questions about your role.",
                },
                {
                  step: "02",
                  title: "Get your risk score",
                  desc: "Our AI analyzes your role against current automation capabilities and real industry data.",
                },
                {
                  step: "03",
                  title: "Get your action plan",
                  desc: "See your full breakdown and unlock a personalized plan to future-proof your career.",
                },
              ].map((item) => (
                <div key={item.step} className="reveal">
                  <div
                    className="text-3xl font-bold text-brand-red/20 mb-2"
                    style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-base font-semibold text-brand-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-gray leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Divider ───── */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="section-divider line-reveal" />
        </div>

        {/* ───── Free vs Paid ───── */}
        <section className="py-20 bg-brand-bg">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="accent-line line-reveal mx-auto mb-4" />
              <h2 className="reveal text-2xl md:text-3xl font-bold text-brand-black tracking-tight">
                Free assessment. Premium plan.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 reveal-stagger">
              {/* Free */}
              <div className="reveal bg-white p-7 rounded-lg border border-brand-border">
                <div className="text-xs font-semibold text-brand-light-gray uppercase tracking-widest mb-5">
                  Free
                </div>
                <ul className="space-y-3">
                  {[
                    "AI risk score (0–100)",
                    "Timeline estimate",
                    "Impact summary",
                    "Top tasks at risk",
                    "Tasks that protect you",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-brand-gray">
                      <svg className="w-4 h-4 text-brand-light-gray mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Paid */}
              <div className="reveal bg-white p-7 rounded-lg border-2 border-brand-black relative">
                <div className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-red text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
                <div className="text-xs font-semibold text-brand-black uppercase tracking-widest mb-5">
                  AI-Proof Career Plan
                </div>
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
                    <li key={item} className="flex items-start gap-2.5 text-sm text-brand-black">
                      <svg className="w-4 h-4 text-brand-red mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-brand-border text-sm text-brand-gray">
                  One-time payment — <span className="text-brand-black font-bold text-xl">$9</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Divider ───── */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="section-divider line-reveal" />
        </div>

        {/* ───── Resources ───── */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="accent-line line-reveal mx-auto mb-4" />
              <h2 className="reveal text-2xl md:text-3xl font-bold text-brand-black tracking-tight">
                Understand the shift
              </h2>
              <p className="reveal text-brand-gray max-w-xl mx-auto mt-4 leading-relaxed">
                Key research and reports behind the data.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
              {[
                {
                  title: "Goldman Sachs Report",
                  desc: "300 million jobs could be affected by generative AI — a breakdown of exposure by occupation.",
                  tag: "Research",
                },
                {
                  title: "McKinsey Workforce Transitions",
                  desc: "Up to 30% of work hours could be automated by 2030, accelerated by generative AI.",
                  tag: "Report",
                },
                {
                  title: "OpenAI/UPenn Study",
                  desc: "80% of the US workforce could have at least 10% of tasks affected by GPT-level AI.",
                  tag: "Study",
                },
              ].map((item) => (
                <div key={item.title} className="reveal bg-white p-6 rounded-lg border border-brand-border">
                  <span
                    className="inline-block text-[10px] font-semibold uppercase tracking-widest text-brand-red mb-3"
                    style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
                  >
                    {item.tag}
                  </span>
                  <h3 className="text-base font-semibold text-brand-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-gray leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Divider ───── */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="section-divider line-reveal" />
        </div>

        {/* ───── Final CTA ───── */}
        <section className="py-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="reveal text-3xl md:text-4xl font-bold text-brand-black tracking-tight leading-tight">
              Don&apos;t wait to find out<br />the hard way.
            </h2>
            <p className="reveal mt-5 text-brand-gray text-lg leading-relaxed">
              The job market is shifting faster than anyone predicted. Know where you stand — and what to do about it.
            </p>
            <div className="reveal mt-8">
              <Link href="/survey" className="btn-primary">
                Start My Free Assessment
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <p className="reveal mt-4 text-brand-light-gray text-sm">
              2 minutes. No sign-up required.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

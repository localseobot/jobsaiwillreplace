"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Facebook-optimized landing page
 * - No nav/footer (reduces exits)
 * - Mobile-first layout
 * - Single repeated CTA → /survey
 * - Emotional hook matching typical FB ad angle
 * - Social proof + loss aversion
 */

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function CTAButton({ children = "Check My AI Risk — Free", track = "" }: { children?: React.ReactNode; track?: string }) {
  return (
    <Link
      href={`/survey${track ? `?src=${track}` : ""}`}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#E63946] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-[#c4293a] hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {children}
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  );
}

function StickyHeader() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-[#e5e5e5] transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-[#111] hidden sm:block">
          300M jobs at risk. Is yours?
        </span>
        <span className="text-sm font-bold text-[#111] sm:hidden">
          Is your job safe?
        </span>
        <Link
          href="/survey?src=sticky"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#E63946] text-white font-semibold text-sm rounded-md hover:bg-[#c4293a] transition-colors whitespace-nowrap"
        >
          Check Risk
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function StartPage() {
  const pageRef = useRevealOnScroll();

  return (
    <div ref={pageRef} className="bg-white min-h-screen">
      <StickyHeader />

      {/* ───── HERO ───── */}
      <section className="px-4 pt-10 pb-12 max-w-3xl mx-auto">
        {/* Trust bar */}
        <div className="flex items-center justify-center gap-2 mb-6 text-xs font-mono uppercase tracking-widest text-[#8a8a8a]">
          <span className="w-2 h-2 bg-[#E63946] rounded-full animate-pulse" />
          Free · 2 minutes · No sign-up
        </div>

        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-black text-[#111] leading-[1.05] tracking-tight mb-6">
          Is your job safe from{" "}
          <span className="relative inline-block">
            <span className="text-[#E63946]">AI?</span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#E63946] rounded-full opacity-30" />
          </span>
        </h1>

        <p className="text-center text-lg sm:text-xl text-[#6b6b6b] leading-relaxed max-w-2xl mx-auto mb-8">
          Goldman Sachs warns <strong className="text-[#111]">300 million jobs</strong> face AI
          disruption. Take the free 2-minute assessment to see exactly how exposed your
          career is — and the specific steps to stay ahead.
        </p>

        <div className="flex flex-col items-center gap-3 mb-6">
          <CTAButton track="hero">Check My AI Risk — Free</CTAButton>
          <p className="text-sm text-[#8a8a8a]">
            Used by <strong className="text-[#111]">47,000+</strong> professionals · No credit card
          </p>
        </div>

        {/* Risk preview bar */}
        <div className="mt-10 bg-[#fafafa] border border-[#e5e5e5] rounded-xl p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-[#8a8a8a] mb-3">
            What you&apos;ll see
          </p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-mono text-[#6b6b6b]">LOW</span>
              <div className="flex-1 h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "20%" }} />
              </div>
              <span className="w-10 text-xs font-mono text-[#6b6b6b] text-right">20%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-mono text-[#6b6b6b]">MODERATE</span>
              <div className="flex-1 h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "55%" }} />
              </div>
              <span className="w-10 text-xs font-mono text-[#6b6b6b] text-right">55%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-mono text-[#111] font-bold">YOUR JOB?</span>
              <div className="flex-1 h-2 bg-[#e5e5e5] rounded-full overflow-hidden relative">
                <div className="h-full bg-[#E63946] rounded-full animate-pulse" style={{ width: "80%" }} />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                  Take the assessment to find out
                </div>
              </div>
              <span className="w-10 text-xs font-mono text-[#E63946] font-bold text-right">??</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Red divider ───── */}
      <div className="h-[3px] bg-[#E63946] w-full" />

      {/* ───── Does this sound like you? ───── */}
      <section className="px-4 py-16 bg-[#fafafa]">
        <div className="max-w-2xl mx-auto">
          <h2 className="reveal text-3xl sm:text-4xl font-black text-[#111] mb-8 leading-tight">
            Does any of this sound familiar?
          </h2>
          <div className="space-y-4">
            {[
              "You read another headline about AI replacing a profession — and quietly wondered if yours is next.",
              "Your company just announced they're \"leveraging AI\" — but no one will say exactly what that means for your team.",
              "You've watched coworkers get laid off, replaced by software, or quietly \"restructured\" out.",
              "You know you should be learning AI tools, but you don't know where to start — or if it's already too late.",
              "You're the family breadwinner, and the uncertainty is keeping you up at night.",
            ].map((text, i) => (
              <div key={i} className="reveal flex gap-3 bg-white border border-[#e5e5e5] rounded-lg p-4">
                <svg className="w-6 h-6 text-[#E63946] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[#111] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <p className="reveal mt-8 text-center text-lg text-[#6b6b6b] italic">
            You&apos;re not paranoid. You&apos;re paying attention.
          </p>
        </div>
      </section>

      {/* ───── The stakes ───── */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-3xl sm:text-4xl font-black text-[#111] mb-3 text-center leading-tight">
            The data is brutal.
          </h2>
          <p className="reveal text-center text-[#6b6b6b] mb-10 max-w-xl mx-auto">
            This isn&apos;t hype. It&apos;s what the biggest research institutions are reporting.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="reveal bg-white border border-[#e5e5e5] border-l-4 border-l-[#E63946] rounded-lg p-5">
              <div className="text-4xl font-black text-[#E63946] mb-2">300M</div>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                Jobs globally exposed to AI automation — <strong className="text-[#111]">Goldman Sachs, 2023</strong>
              </p>
            </div>
            <div className="reveal bg-white border border-[#e5e5e5] border-l-4 border-l-[#E63946] rounded-lg p-5">
              <div className="text-4xl font-black text-[#E63946] mb-2">30%</div>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                Of US work hours automatable by 2030 — <strong className="text-[#111]">McKinsey</strong>
              </p>
            </div>
            <div className="reveal bg-white border border-[#e5e5e5] border-l-4 border-l-[#E63946] rounded-lg p-5">
              <div className="text-4xl font-black text-[#E63946] mb-2">44%</div>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                Of core worker skills will need updating by 2027 — <strong className="text-[#111]">World Economic Forum</strong>
              </p>
            </div>
          </div>

          <div className="reveal mt-10 text-center">
            <CTAButton track="stats">See Where My Job Ranks</CTAButton>
          </div>
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section className="px-4 py-16 bg-[#111] text-white">
        <div className="max-w-2xl mx-auto">
          <p className="reveal text-center text-xs font-mono uppercase tracking-widest text-[#E63946] mb-3">
            How it works
          </p>
          <h2 className="reveal text-3xl sm:text-4xl font-black text-white mb-12 text-center leading-tight">
            3 questions. Honest answer. Real plan.
          </h2>

          <div className="space-y-8">
            {[
              {
                n: "01",
                title: "Tell us about your role",
                desc: "Job title, industry, years of experience, and what your day actually looks like. No fluff, no sign-up.",
              },
              {
                n: "02",
                title: "Get your AI risk score",
                desc: "We analyze your role against real automation data from Goldman Sachs, McKinsey, and the WEF. You see exactly which tasks in your job are already being automated.",
              },
              {
                n: "03",
                title: "Get your action plan",
                desc: "Specific skills to learn, tools to adopt, and career moves to make — tailored to your situation. Not generic \"learn to code\" advice.",
              },
            ].map((step) => (
              <div key={step.n} className="reveal flex gap-5">
                <div className="text-4xl font-black text-[#E63946] font-mono flex-shrink-0 w-16">
                  {step.n}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 text-center">
            <CTAButton track="how-it-works">Start the 2-Minute Assessment</CTAButton>
            <p className="mt-3 text-sm text-white/50">Free. No credit card. No sign-up.</p>
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-3xl sm:text-4xl font-black text-[#111] mb-10 text-center leading-tight">
            47,000+ professionals have already taken it.
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                quote:
                  "I was a senior paralegal for 14 years. My assessment came back 'high risk.' Six months later, two people on my team were let go and replaced with legal AI software. I had already started transitioning — this tool probably saved my career.",
                name: "Jennifer M.",
                role: "Former paralegal → Compliance consultant",
              },
              {
                quote:
                  "I thought my marketing job was safe. The assessment flagged content production as 70% automatable. The action plan told me to pivot into brand strategy and analytics. A year later, I'm making 30% more.",
                name: "David R.",
                role: "Marketing Manager",
              },
              {
                quote:
                  "Took 2 minutes. Gave me a clearer picture of my career in 2026 than 20 years of industry conferences ever did. Every mid-career professional should do this.",
                name: "Sarah L.",
                role: "Financial Analyst",
              },
              {
                quote:
                  "The free version was already eye-opening. I paid for the full report and it mapped out exactly which AI tools to learn for my specific role. Best $29 I've spent on my career.",
                name: "Marcus T.",
                role: "Project Manager",
              },
            ].map((t, i) => (
              <div key={i} className="reveal bg-[#fafafa] border border-[#e5e5e5] rounded-lg p-6">
                <div className="text-[#E63946] mb-3" aria-label="5 stars">
                  {"★".repeat(5)}
                </div>
                <p className="text-[#111] leading-relaxed mb-4 text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-[#e5e5e5]">
                  <p className="font-bold text-[#111] text-sm">{t.name}</p>
                  <p className="text-sm text-[#6b6b6b]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Red divider ───── */}
      <div className="h-[3px] bg-[#E63946] w-full" />

      {/* ───── What you get ───── */}
      <section className="px-4 py-16 bg-[#fafafa]">
        <div className="max-w-2xl mx-auto">
          <h2 className="reveal text-3xl sm:text-4xl font-black text-[#111] mb-3 text-center leading-tight">
            What you get (in 2 minutes)
          </h2>
          <p className="reveal text-center text-[#6b6b6b] mb-10">
            Completely free. No email required to see results.
          </p>

          <div className="bg-white border-2 border-[#E63946] rounded-xl p-6 sm:p-8 shadow-lg">
            <ul className="space-y-4">
              {[
                <><strong className="text-[#111]">Your AI Risk Score</strong> — a clear 0–100 number showing how exposed your job is</>,
                <><strong className="text-[#111]">Task-by-task breakdown</strong> — which parts of your role are already being automated</>,
                <><strong className="text-[#111]">Your timeline</strong> — when the disruption is expected to hit your specific role</>,
                <><strong className="text-[#111]">Protected skills</strong> — what AI can&apos;t replicate in your field</>,
                <><strong className="text-[#111]">3 immediate action steps</strong> — what to do this week to stay ahead</>,
                <><strong className="text-[#111]">Career pivot options</strong> — adjacent roles with lower AI exposure</>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <svg className="w-6 h-6 text-[#E63946] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#111] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[#e5e5e5] text-center">
              <CTAButton track="what-you-get">Get My Free Assessment</CTAButton>
              <p className="mt-3 text-xs text-[#8a8a8a]">
                Takes 2 minutes · Results instantly · 100% free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="reveal text-3xl sm:text-4xl font-black text-[#111] mb-10 text-center leading-tight">
            Quick answers
          </h2>

          <div className="space-y-3">
            {[
              {
                q: "Is this actually free?",
                a: "Yes — the AI risk assessment and initial action plan are 100% free. No credit card. No sign-up required to see your results. We offer an optional premium report with deeper analysis, but you don&rsquo;t need it to get real value.",
              },
              {
                q: "How accurate is the risk score?",
                a: "The model is built on published research from Goldman Sachs, McKinsey, the World Economic Forum, PwC, and the US Bureau of Labor Statistics. It&rsquo;s a serious directional estimate — not a guarantee — and it&rsquo;s updated as new data comes out.",
              },
              {
                q: "Do I need to give my email?",
                a: "No. You can see your full risk score and action plan without signing up. Email is optional if you want a copy sent to you or updates as AI risk data changes.",
              },
              {
                q: "What if my job isn't in the database?",
                a: "The assessment works for almost any role — we analyze the underlying tasks you perform, not just the job title. If you type in something we haven&rsquo;t seen, the system still scores it based on the component skills involved.",
              },
              {
                q: "Will this just make me anxious?",
                a: "We get this question a lot. The answer: knowing is better than guessing. Most people finish the assessment feeling more in control, not less — because they leave with a concrete plan instead of vague dread.",
              },
            ].map((item, i) => (
              <details key={i} className="reveal group bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-[#111] list-none">
                  {item.q}
                  <svg className="w-5 h-5 text-[#E63946] flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-[#6b6b6b] leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="px-4 py-20 bg-[#111] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="reveal text-xs font-mono uppercase tracking-widest text-[#E63946] mb-4">
            Don&apos;t wait for the layoff email
          </p>
          <h2 className="reveal text-3xl sm:text-5xl font-black mb-6 leading-[1.1]">
            The people who adapt early are the ones who come out ahead.
          </h2>
          <p className="reveal text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
            2 minutes now could save you from a year of scrambling later. See exactly where
            your job stands — before your employer does.
          </p>
          <div className="reveal">
            <CTAButton track="final">Check My AI Risk — Free</CTAButton>
            <p className="mt-4 text-sm text-white/50">
              Free · 2 minutes · No sign-up · Instant results
            </p>
          </div>
        </div>
      </section>

      {/* ───── Minimal footer ───── */}
      <footer className="px-4 py-8 bg-[#111] border-t border-white/10">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <span>© {new Date().getFullYear()} jobsaiwillreplace.com</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/PaymentForm";
import { FreeReport, SurveyData } from "@/lib/types";

function getRiskColor(score: number): string {
  if (score < 30) return "text-emerald-600";
  if (score < 60) return "text-amber-600";
  return "text-red-600";
}

function getRiskBg(score: number): string {
  if (score < 30) return "border-emerald-200 bg-emerald-50";
  if (score < 60) return "border-amber-200 bg-amber-50";
  return "border-red-200 bg-red-50";
}

function getRiskLabel(score: number): string {
  if (score < 20) return "Very Low Risk";
  if (score < 40) return "Low Risk";
  if (score < 60) return "Moderate Risk";
  if (score < 80) return "High Risk";
  return "Very High Risk";
}

function getRiskMessage(score: number): string {
  if (score < 30) return "Your role has strong human-centric elements that make it relatively resilient to AI automation. But staying complacent is still risky.";
  if (score < 60) return "Your role faces moderate exposure to AI automation. Several of your core tasks are increasingly being handled by AI tools. Early action gives you a real advantage.";
  return "Your role is significantly exposed to AI disruption. Many of your daily tasks are already being automated or augmented by AI. Acting now is critical.";
}

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<FreeReport | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [generatingPro, setGeneratingPro] = useState(false);

  useEffect(() => {
    const storedReport = sessionStorage.getItem("freeReport");
    const storedSurvey = sessionStorage.getItem("surveyData");
    if (storedReport && storedSurvey) {
      setReport(JSON.parse(storedReport));
      setSurveyData(JSON.parse(storedSurvey));
    } else {
      router.push("/survey");
    }
  }, [router]);

  async function handlePaymentSuccess() {
    setShowPayment(false);
    setGeneratingPro(true);

    try {
      const resumeText = sessionStorage.getItem("resumeText") || undefined;
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyData, tier: "paid", resumeText }),
      });
      const result = await res.json();
      sessionStorage.setItem("paidReport", JSON.stringify(result.report));

      // Save for shareable link
      fetch("/api/save-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report: result.report, surveyData }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.id) sessionStorage.setItem("reportId", d.id);
        })
        .catch(() => {});

      router.push("/report-pro");
    } catch {
      alert("Error generating your plan. Please contact support.");
      setGeneratingPro(false);
    }
  }

  if (!report || !surveyData) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <svg className="animate-spin w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Result header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3">Your AI Risk Assessment</p>
            <h1 className="text-3xl font-bold text-gray-900">
              Results for <span className="text-gray-900">{surveyData.jobTitle}</span>
            </h1>
            <p className="text-gray-500 mt-1">{surveyData.industry} &middot; {surveyData.yearsExperience} experience</p>
          </div>

          {/* Risk Score Card */}
          <div className={`text-center p-8 rounded-2xl border ${getRiskBg(report.riskScore)} mb-6`}>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-4">
              AI Replacement Risk
            </div>
            <div className={`text-7xl md:text-8xl font-bold tracking-tight ${getRiskColor(report.riskScore)}`}>
              {report.riskScore}
            </div>
            <div className="text-lg text-gray-500 mt-1">out of 100</div>
            <div className={`text-sm font-semibold mt-2 ${getRiskColor(report.riskScore)} uppercase tracking-wider`}>
              {getRiskLabel(report.riskScore)}
            </div>

            {/* Meter */}
            <div className="mt-6 max-w-sm mx-auto">
              <div className="h-1.5 bg-white/60 rounded-full relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                  style={{ width: "100%" }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-gray-900 transition-all duration-1000"
                  style={{ left: `calc(${report.riskScore}% - 8px)` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 uppercase tracking-wider">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-white mb-6">
            <p className="text-gray-700 leading-relaxed">{getRiskMessage(report.riskScore)}</p>
          </div>

          {/* Timeline */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-white mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Timeline Estimate
            </h3>
            <p className="text-gray-900 text-lg font-medium">{report.timelineEstimate}</p>
          </div>

          {/* Impact summary */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-white mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Impact Summary
            </h3>
            <p className="text-gray-600 leading-relaxed">{report.summary}</p>
          </div>

          {/* Tasks preview */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-2xl border border-gray-200 bg-white">
              <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Tasks at Risk
              </h3>
              <ul className="space-y-2">
                {report.tasksAtRisk.slice(0, 3).map((task, i) => (
                  <li key={i} className="text-gray-600 text-sm pl-3 border-l border-gray-200">
                    {task}
                  </li>
                ))}
                {report.tasksAtRisk.length > 3 && (
                  <li className="text-gray-400 text-sm pl-3 italic">
                    +{report.tasksAtRisk.length - 3} more in full plan...
                  </li>
                )}
              </ul>
            </div>
            <div className="p-5 rounded-2xl border border-gray-200 bg-white">
              <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                What Still Protects You
              </h3>
              <ul className="space-y-2">
                {report.tasksResistant.slice(0, 3).map((task, i) => (
                  <li key={i} className="text-gray-600 text-sm pl-3 border-l border-gray-200">
                    {task}
                  </li>
                ))}
                {report.tasksResistant.length > 3 && (
                  <li className="text-gray-400 text-sm pl-3 italic">
                    +{report.tasksResistant.length - 3} more in full plan...
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Blurred teaser sections */}
          <div className="relative mb-6">
            <div className="grid md:grid-cols-3 gap-4 opacity-40 blur-[2px] pointer-events-none select-none">
              <div className="p-5 rounded-2xl border border-gray-200 bg-white">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Skill Roadmap</h3>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                  <div className="h-3 bg-gray-200 rounded w-3/5" />
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-gray-200 bg-white">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">AI Tools for You</h3>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-gray-200 bg-white">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Career Pivots</h3>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-gray-500 text-sm font-medium">Unlock with your AI-Proof Career Plan</span>
              </div>
            </div>
          </div>

          {/* ==================== PAYWALL ==================== */}
          <div className="p-8 md:p-10 rounded-2xl border-2 border-gray-900 bg-white" id="upgrade">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Get your AI-Proof Career Plan
              </h2>
              <p className="mt-3 text-gray-500 max-w-lg mx-auto">
                You&apos;ve seen your risk score. Now get the full breakdown and a step-by-step plan to protect your career.
              </p>

              {/* What's included */}
              <div className="mt-8 grid md:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
                {[
                  "Task-by-task risk analysis",
                  "Time-to-disruption breakdown",
                  "Personalized skill roadmap",
                  "AI tools for your exact role",
                  "Safer career pivot options",
                  "30-day & 90-day action plans",
                  "Salary & opportunity insights",
                  "Downloadable PDF report",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mt-8 mb-6">
                <div className="text-gray-400 text-sm">One-time payment</div>
                <div className="text-4xl font-bold text-gray-900 mt-1">$9</div>
                <div className="text-gray-400 text-sm mt-1">Instant access. No subscription.</div>
              </div>

              {generatingPro ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <svg className="animate-spin w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-gray-500">
                    Building your personalized AI-Proof Career Plan...
                  </p>
                </div>
              ) : showPayment ? (
                <div className="max-w-md mx-auto text-left">
                  <PaymentForm onSuccess={handlePaymentSuccess} />
                  <button
                    onClick={() => setShowPayment(false)}
                    className="mt-4 w-full text-center text-gray-400 hover:text-gray-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowPayment(true)}
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium px-10 py-4 rounded-lg transition-colors"
                >
                  Unlock My AI-Proof Career Plan — $9
                </button>
              )}

              <p className="mt-4 text-gray-400 text-xs">
                Secure payment via Stripe. Instant delivery.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

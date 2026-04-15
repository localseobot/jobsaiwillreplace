"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import PaymentForm from "@/components/PaymentForm";
import { FreeReport, SurveyData } from "@/lib/types";

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
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyData, tier: "paid" }),
      });
      const result = await res.json();
      sessionStorage.setItem("paidReport", JSON.stringify(result.report));
      router.push("/report-pro");
    } catch {
      alert("Error generating pro report. Please contact support.");
    } finally {
      setGeneratingPro(false);
    }
  }

  if (!report) {
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
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Your AI Impact Report
            </h1>
            <p className="text-gray-500 mt-2">
              Based on your responses as a{" "}
              <span className="text-gray-900 font-medium">
                {surveyData?.jobTitle}
              </span>
            </p>
          </div>

          <ReportCard report={report} />

          {/* Upgrade CTA */}
          <div className="mt-12 p-8 rounded-2xl border-2 border-gray-200 bg-gray-50">
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full uppercase mb-4">
                Unlock Full Report
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Get Your Complete AI Career Strategy
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                Upgrade to the Pro Report for a task-by-task analysis,
                personalized learning roadmap, AI tool recommendations, and
                career future-proofing strategies.
              </p>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm max-w-lg mx-auto">
                {[
                  "Task-by-task analysis",
                  "Learning roadmap",
                  "AI tool recommendations",
                  "Video resources",
                  "Career strategies",
                  "Actionable insights",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-gray-600"
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
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              {generatingPro ? (
                <div className="mt-8 flex flex-col items-center gap-3">
                  <svg className="animate-spin w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-gray-500">
                    Generating your comprehensive Pro Report...
                  </p>
                </div>
              ) : showPayment ? (
                <div className="mt-8 max-w-md mx-auto text-left">
                  <PaymentForm onSuccess={handlePaymentSuccess} />
                </div>
              ) : (
                <button
                  onClick={() => setShowPayment(true)}
                  className="mt-8 inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium px-8 py-4 rounded-lg transition-colors"
                >
                  Upgrade for $19
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

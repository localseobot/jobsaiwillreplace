"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import { PaidReport, SurveyData } from "@/lib/types";

export default function SharedReportPage() {
  const params = useParams();
  const [report, setReport] = useState<PaidReport | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      try {
        const res = await fetch(`/api/get-report?id=${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setReport(data.report);
        setSurveyData(data.surveyData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) loadReport();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <svg className="animate-spin w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !report || !surveyData) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Report Not Found</h1>
            <p className="text-zinc-400 mb-8">This report link may have expired or doesn&apos;t exist.</p>
            <Link
              href="/survey"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Take the Assessment
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Shared report banner */}
          <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
            <p className="text-blue-400 text-sm">
              You&apos;re viewing a shared AI Career Impact Report for{" "}
              <span className="text-white font-medium">{surveyData.jobTitle}</span>
            </p>
            <Link
              href="/survey"
              className="inline-block mt-2 text-sm text-red-400 hover:text-red-300 underline"
            >
              Get your own free assessment
            </Link>
          </div>

          <ReportCard report={report} />

          {/* CTA */}
          <div className="mt-12 text-center p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-2xl font-bold text-white mb-3">
              Want to see your own AI risk score?
            </h2>
            <p className="text-zinc-400 mb-6">
              Take the free 2-minute assessment and get a personalized report with your risk score, timeline, and action plan.
            </p>
            <Link
              href="/survey"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Take the Assessment — Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

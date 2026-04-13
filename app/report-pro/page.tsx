"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import { PaidReport, SurveyData } from "@/lib/types";

export default function ProReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<PaidReport | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  useEffect(() => {
    const storedReport = sessionStorage.getItem("paidReport");
    const storedSurvey = sessionStorage.getItem("surveyData");
    if (storedReport && storedSurvey) {
      setReport(JSON.parse(storedReport));
      setSurveyData(JSON.parse(storedSurvey));
    } else {
      router.push("/survey");
    }
  }, [router]);

  if (!report) {
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

  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase mb-4">
              Pro Report
            </div>
            <h1 className="text-3xl font-bold text-white">
              Your Complete AI Career Strategy
            </h1>
            <p className="text-zinc-400 mt-2">
              Personalized report for{" "}
              <span className="text-white font-medium">
                {surveyData?.jobTitle}
              </span>{" "}
              in {surveyData?.industry}
            </p>
          </div>

          {/* Base report card */}
          <ReportCard report={report} />

          {/* Task-by-task analysis */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Task-by-Task Analysis
            </h2>
            <div className="space-y-4">
              {report.taskAnalysis?.map((task, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{task.task}</h3>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      task.automationRisk >= 70 ? "bg-red-500/20 text-red-400" :
                      task.automationRisk >= 40 ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-green-500/20 text-green-400"
                    }`}>
                      {task.automationRisk}% risk
                    </span>
                  </div>
                  <p className="text-zinc-400">{task.explanation}</p>
                  {task.toolsAvailable?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {task.toolsAvailable.map((tool, j) => (
                        <span key={j} className="text-xs px-2 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/10">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Learning Roadmap */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Your Learning Roadmap
            </h2>
            <div className="space-y-4">
              {report.learningRoadmap?.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-zinc-400 mt-1">{item.description}</p>
                    <span className="text-sm text-blue-400 mt-2 inline-block">{item.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Tools for Your Role
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {report.aiTools?.map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {tool.name}
                    <svg className="w-4 h-4 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </h3>
                  <p className="text-zinc-400 mt-2 text-sm">{tool.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Video Resources */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recommended Videos & Courses
            </h2>
            <div className="space-y-4">
              {report.videoResources?.map((video, i) => (
                <a
                  key={i}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                    {video.title}
                    <svg className="w-4 h-4 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </h3>
                  <p className="text-zinc-400 mt-2 text-sm">{video.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Future-proofing Strategies */}
          <section className="mt-12 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Career Future-Proofing Strategies
            </h2>
            <div className="space-y-3">
              {report.futureProofStrategies?.map((strategy, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-zinc-300">{strategy}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

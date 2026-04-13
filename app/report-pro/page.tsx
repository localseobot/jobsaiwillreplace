"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import ShareCard from "@/components/ShareCard";
import DownloadReport from "@/components/DownloadReport";
import { PaidReport, SurveyData } from "@/lib/types";

function TrendBadge({ direction }: { direction: string }) {
  const config: Record<string, { label: string; color: string }> = {
    rapidly_automating: { label: "Rapidly Automating", color: "bg-red-500/20 text-red-400" },
    moderately_automating: { label: "Moderately Automating", color: "bg-orange-500/20 text-orange-400" },
    slowly_automating: { label: "Slowly Automating", color: "bg-yellow-500/20 text-yellow-400" },
    stable: { label: "Stable", color: "bg-green-500/20 text-green-400" },
  };
  const c = config[direction] || config.stable;
  return <span className={`text-sm font-medium px-3 py-1 rounded-full ${c.color}`}>{c.label}</span>;
}

function ImpactBadge({ level }: { level: string }) {
  const config: Record<string, { color: string }> = {
    minimal: { color: "bg-green-500/20 text-green-400 border-green-500/30" },
    moderate: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    significant: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    transformative: { color: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const c = config[level] || config.moderate;
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${c.color} capitalize`}>{level}</span>;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const config: Record<string, { color: string }> = {
    easy: { color: "bg-green-500/20 text-green-400" },
    medium: { color: "bg-yellow-500/20 text-yellow-400" },
    advanced: { color: "bg-red-500/20 text-red-400" },
  };
  const c = config[difficulty] || config.medium;
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.color} capitalize`}>{difficulty}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const config: Record<string, { color: string }> = {
    critical: { color: "bg-red-500/20 text-red-400 border-red-500/30" },
    high: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    medium: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  };
  const c = config[priority] || config.medium;
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${c.color} capitalize`}>{priority}</span>;
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        {icon}
        {title}
      </h2>
      {subtitle && <p className="text-zinc-400 mt-1 ml-9">{subtitle}</p>}
    </div>
  );
}

export default function ProReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<PaidReport | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const reportContentRef = useRef<HTMLDivElement>(null);

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
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase mb-4">
              Full AI Impact Report
            </div>
            <h1 className="text-4xl font-bold text-white">
              Your AI Career Strategy Report
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">
              Personalized analysis for{" "}
              <span className="text-white font-medium">{surveyData?.jobTitle}</span>{" "}
              in <span className="text-white font-medium">{surveyData?.industry}</span>
            </p>
          </div>

          {/* Share & Download Bar */}
          <div className="mb-10 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white font-semibold text-lg">Share Your Results</h3>
                <p className="text-zinc-400 text-sm mt-1">Download your branded score card or the full report as a PDF.</p>
              </div>
              <DownloadReport reportRef={reportContentRef} jobTitle={surveyData?.jobTitle || "report"} />
            </div>
          </div>

          {/* Shareable Social Card */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share on Social Media
            </h3>
            <ShareCard
              riskScore={report.riskScore}
              jobTitle={surveyData?.jobTitle || ""}
              timelineEstimate={report.timelineEstimate}
            />
          </div>

          {/* Report content wrapper for PDF export */}
          <div ref={reportContentRef}>

          {/* Risk Score & Core Info */}
          <ReportCard report={report} />

          {/* Immediate Actions - placed early for urgency */}
          {report.immediateActions && report.immediateActions.length > 0 && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                title="Do This Now"
                subtitle="Immediate actions you should take this week"
              />
              <div className="space-y-3">
                {report.immediateActions.map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold shrink-0 text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold">{item.action}</h3>
                        <span className="text-xs text-zinc-500 shrink-0 ml-2">{item.timeToComplete}</span>
                      </div>
                      <p className="text-zinc-400 text-sm mt-1">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Industry Outlook */}
          {report.industryOutlook && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
                title="Industry Outlook"
                subtitle={`How AI is reshaping ${surveyData?.industry}`}
              />
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-4">
                  <TrendBadge direction={report.industryOutlook.trendDirection} />
                </div>
                <p className="text-zinc-300 leading-relaxed">{report.industryOutlook.currentState}</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">Key Drivers</h4>
                    <ul className="space-y-2">
                      {report.industryOutlook.keyDrivers?.map((driver, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                          <span className="text-cyan-400 mt-0.5">-</span>
                          {driver}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">Companies Leading Change</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.industryOutlook.notableCompanies?.map((company, i) => (
                        <span key={i} className="text-sm px-3 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">{company}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* AI Timeline Phases */}
          {report.timelinePhases && report.timelinePhases.length > 0 && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                title="AI Impact Timeline"
                subtitle="How automation will affect your role over the next decade"
              />
              <div className="relative">
                <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-500 via-yellow-500 to-red-500 opacity-30" />
                <div className="space-y-4">
                  {report.timelinePhases.map((phase, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold z-10 ${
                        i === 0 ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                        i === 1 ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                        i === 2 ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" :
                        "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-white font-semibold">{phase.phase}</h3>
                          <span className="text-xs text-zinc-500">{phase.timeframe}</span>
                          <ImpactBadge level={phase.impactLevel} />
                        </div>
                        <p className="text-zinc-400 mt-2 text-sm leading-relaxed">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Task-by-task analysis */}
          {report.taskAnalysis && report.taskAnalysis.length > 0 && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                title="Task-by-Task Analysis"
                subtitle="Automation risk for each of your core responsibilities"
              />
              <div className="space-y-4">
                {report.taskAnalysis.map((task, i) => (
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
                    {/* Risk bar */}
                    <div className="h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          task.automationRisk >= 70 ? "bg-red-500" :
                          task.automationRisk >= 40 ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${task.automationRisk}%` }}
                      />
                    </div>
                    <p className="text-zinc-400 text-sm">{task.explanation}</p>
                    {task.currentAICapability && (
                      <p className="text-zinc-500 text-sm mt-2 italic">Current AI capability: {task.currentAICapability}</p>
                    )}
                    {task.toolsAvailable && task.toolsAvailable.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {task.toolsAvailable.map((tool, j) => (
                          <span key={j} className="text-xs px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Automation Playbook */}
          {report.automationPlaybook && report.automationPlaybook.length > 0 && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                title="Automation Playbook"
                subtitle="Tasks you can start automating today to save time"
              />
              <div className="space-y-4">
                {report.automationPlaybook.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{item.task}</h3>
                      <div className="flex items-center gap-2">
                        <DifficultyBadge difficulty={item.difficulty} />
                        <span className="text-xs text-emerald-400 font-medium">Save {item.timeSaved}</span>
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{item.howToAutomate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Salary Impact */}
          {report.salaryImpact && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                title="Salary & Career Impact"
              />
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-2">Current Outlook</h4>
                  <p className="text-zinc-300 leading-relaxed">{report.salaryImpact.currentOutlook}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-2">Projected Change</h4>
                  <p className="text-zinc-300 leading-relaxed">{report.salaryImpact.projectedChange}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">High-Value Skills to Develop</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.salaryImpact.highValueSkills?.map((skill, i) => (
                        <span key={i} className="text-sm px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">Emerging Roles in Your Field</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.salaryImpact.emergingRoles?.map((role, i) => (
                        <span key={i} className="text-sm px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">{role}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Learning Roadmap */}
          {report.learningRoadmap && report.learningRoadmap.length > 0 && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                title="Your Learning Roadmap"
                subtitle="Skills to learn, ordered by priority"
              />
              <div className="space-y-4">
                {report.learningRoadmap.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0 text-sm">
                        {i + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-white flex-1">{item.title}</h3>
                      <PriorityBadge priority={item.priority} />
                      <span className="text-xs text-zinc-500">{item.timeframe}</span>
                    </div>
                    <p className="text-zinc-400 text-sm ml-11">{item.description}</p>
                    {item.resources && item.resources.length > 0 && (
                      <div className="mt-3 ml-11 flex flex-wrap gap-2">
                        {item.resources.map((res, j) => (
                          <span key={j} className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">{res}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI Tools */}
          {report.aiTools && report.aiTools.length > 0 && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                title="AI Tools for Your Role"
                subtitle="Tools you can start using today"
              />
              <div className="grid md:grid-cols-2 gap-4">
                {report.aiTools.map((tool, i) => (
                  <a
                    key={i}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                        {tool.name}
                        <svg className="w-3.5 h-3.5 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      {tool.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-zinc-500">{tool.category}</span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm">{tool.description}</p>
                    {tool.pricing && (
                      <p className="text-zinc-500 text-xs mt-2">{tool.pricing}</p>
                    )}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Video Resources */}
          {report.videoResources && report.videoResources.length > 0 && (
            <section className="mt-12">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                title="Recommended Courses & Videos"
              />
              <div className="space-y-3">
                {report.videoResources.map((video, i) => (
                  <a
                    key={i}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold group-hover:text-red-400 transition-colors">
                        {video.title}
                        <svg className="w-3.5 h-3.5 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        {video.platform && <span className="text-xs text-zinc-500">{video.platform}</span>}
                        {video.duration && <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-zinc-400">{video.duration}</span>}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-1">{video.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Future-proofing Strategies */}
          {report.futureProofStrategies && report.futureProofStrategies.length > 0 && (
            <section className="mt-12 mb-8">
              <SectionHeader
                icon={<svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                title="Career Future-Proofing Strategies"
              />
              <div className="space-y-4">
                {report.futureProofStrategies.map((item, i) => {
                  const strategy = typeof item === "string" ? { strategy: item, explanation: "", actionSteps: [] } : item;
                  return (
                    <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{strategy.strategy}</h3>
                          {strategy.explanation && (
                            <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{strategy.explanation}</p>
                          )}
                          {strategy.actionSteps && strategy.actionSteps.length > 0 && (
                            <ul className="mt-3 space-y-1.5">
                              {strategy.actionSteps.map((step, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {step}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          </div>{/* End reportContentRef wrapper */}
        </div>
      </main>
      <Footer />
    </>
  );
}

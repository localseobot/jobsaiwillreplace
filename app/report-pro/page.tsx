"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import ShareCard from "@/components/ShareCard";
import DownloadReport from "@/components/DownloadReport";
import { PaidReport, SurveyData } from "@/lib/types";

function TrendBadge({ direction }: { direction: string }) {
  const config: Record<string, { label: string; color: string }> = {
    rapidly_automating: { label: "Rapidly Automating", color: "bg-red-50 text-red-700 border-red-200" },
    moderately_automating: { label: "Moderately Automating", color: "bg-amber-50 text-amber-700 border-amber-200" },
    slowly_automating: { label: "Slowly Automating", color: "bg-gray-50 text-gray-600 border-gray-200" },
    stable: { label: "Stable", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  };
  const c = config[direction] || config.stable;
  return <span className={`text-xs font-medium px-3 py-1 rounded border ${c.color}`}>{c.label}</span>;
}

function ImpactBadge({ level }: { level: string }) {
  return <span className="text-xs font-medium px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600 capitalize">{level}</span>;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return <span className="text-xs font-medium px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600 capitalize">{difficulty}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    critical: "text-red-700 bg-red-50 border-red-200",
    high: "text-amber-700 bg-amber-50 border-amber-200",
    medium: "text-gray-600 bg-gray-50 border-gray-200",
  };
  return <span className={`text-xs font-medium px-2 py-0.5 rounded border capitalize ${colors[priority] || colors.medium}`}>{priority}</span>;
}

function SectionHeader({ title, subtitle }: { icon?: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>}
      <div className="mt-3 h-px bg-gray-200" />
    </div>
  );
}

interface Benchmarks {
  totalAssessments: number;
  percentile: number;
  avgAll: number | null;
  avgIndustry: { score: number; count: number } | null;
  avgJob: { score: number; count: number } | null;
}

function BenchmarkSection({ benchmarks, riskScore }: { benchmarks: Benchmarks; riskScore: number }) {
  if (benchmarks.totalAssessments < 5) return null;

  return (
    <section className="mt-12">
      <SectionHeader
        title="How You Compare"
        subtitle={`Based on ${benchmarks.totalAssessments.toLocaleString()} assessments`}
      />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-gray-200 bg-white text-center">
          <div className="text-3xl font-bold text-gray-900">{benchmarks.percentile}%</div>
          <div className="text-gray-500 text-sm mt-1">
            of people scored <span className="text-gray-900 font-medium">higher risk</span> than you
          </div>
        </div>
        {benchmarks.avgAll !== null && (
          <div className="p-5 rounded-2xl border border-gray-200 bg-white text-center">
            <div className="text-3xl font-bold text-gray-900">{benchmarks.avgAll}</div>
            <div className="text-gray-500 text-sm mt-1">Average score across all roles</div>
            <div className={`text-xs mt-2 font-medium ${riskScore < benchmarks.avgAll ? "text-emerald-600" : "text-red-600"}`}>
              You are {Math.abs(riskScore - benchmarks.avgAll)} pts {riskScore < benchmarks.avgAll ? "below" : "above"} avg
            </div>
          </div>
        )}
        {benchmarks.avgIndustry && (
          <div className="p-5 rounded-2xl border border-gray-200 bg-white text-center">
            <div className="text-3xl font-bold text-gray-900">{benchmarks.avgIndustry.score}</div>
            <div className="text-gray-500 text-sm mt-1">Industry average ({benchmarks.avgIndustry.count} assessments)</div>
            <div className={`text-xs mt-2 font-medium ${riskScore < benchmarks.avgIndustry.score ? "text-emerald-600" : "text-red-600"}`}>
              You are {Math.abs(riskScore - benchmarks.avgIndustry.score)} pts {riskScore < benchmarks.avgIndustry.score ? "below" : "above"} avg
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<PaidReport | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [benchmarks, setBenchmarks] = useState<Benchmarks | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const storedReport = sessionStorage.getItem("paidReport");
    const storedSurvey = sessionStorage.getItem("surveyData");
    if (storedReport && storedSurvey) {
      setReport(JSON.parse(storedReport));
      setSurveyData(JSON.parse(storedSurvey));
      const storedId = sessionStorage.getItem("reportId");
      if (storedId) setReportId(storedId);
    } else {
      router.push("/survey");
    }
  }, [router]);

  useEffect(() => {
    if (!report || !surveyData) return;
    fetch(
      `/api/benchmarks?score=${report.riskScore}&jobTitle=${encodeURIComponent(surveyData.jobTitle)}&industry=${encodeURIComponent(surveyData.industry)}`
    )
      .then((r) => r.json())
      .then((d) => { if (!d.error) setBenchmarks(d); })
      .catch(() => {});
  }, [report, surveyData]);

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
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded border border-gray-200 uppercase tracking-widest mb-4">
              Career Impact Assessment
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Your AI Career Strategy Report
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Personalized analysis for{" "}
              <span className="text-gray-900 font-medium">{surveyData?.jobTitle}</span>{" "}
              in <span className="text-gray-900 font-medium">{surveyData?.industry}</span>
            </p>
          </div>

          {/* Share & Download Bar */}
          <div className="mb-10 p-6 rounded-2xl border border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-gray-900 font-semibold text-lg">Download Your Report</h3>
                <p className="text-gray-500 text-sm mt-1">Get your full AI Career Impact Assessment as a professional PDF.</p>
              </div>
              <div className="flex items-center gap-3">
                <DownloadReport report={report} surveyData={surveyData!} />
                {reportId && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://jobsaiwillreplace.com/r/${reportId}`);
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2500);
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {linkCopied ? "Link Copied!" : "Copy Link"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Social Media Sharing */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Share Your Results
            </h3>
            <ShareCard report={report} surveyData={surveyData!} reportId={reportId} />
          </div>

          {/* Risk Score & Core Info */}
          <ReportCard report={report} />

          {/* Benchmarks */}
          {benchmarks && <BenchmarkSection benchmarks={benchmarks} riskScore={report.riskScore} />}

          {/* Immediate Actions */}
          {report.immediateActions && report.immediateActions.length > 0 && (
            <section className="mt-12">
              <SectionHeader
                title="Do This Now"
                subtitle="Immediate actions you should take this week"
              />
              <div className="space-y-3">
                {report.immediateActions.map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-gray-200 bg-white flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold shrink-0 text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-gray-900 font-semibold">{item.action}</h3>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{item.timeToComplete}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{item.why}</p>
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
                title="Industry Outlook"
                subtitle={`How AI is reshaping ${surveyData?.industry}`}
              />
              <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <TrendBadge direction={report.industryOutlook.trendDirection} />
                </div>
                <p className="text-gray-600 leading-relaxed">{report.industryOutlook.currentState}</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Key Drivers</h4>
                    <ul className="space-y-2">
                      {report.industryOutlook.keyDrivers?.map((driver, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                          <span className="text-gray-300 mt-0.5">-</span>
                          {driver}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Companies Leading Change</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.industryOutlook.notableCompanies?.map((company, i) => (
                        <span key={i} className="text-sm px-3 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-200">{company}</span>
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
                title="AI Impact Timeline"
                subtitle="How automation will affect your role over the next decade"
              />
              <div className="relative">
                <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gray-200" />
                <div className="space-y-4">
                  {report.timelinePhases.map((phase, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold z-10 ${
                        i === 0 ? "bg-white text-gray-600 border-2 border-emerald-300" :
                        i === 1 ? "bg-white text-gray-600 border-2 border-amber-300" :
                        "bg-white text-gray-600 border-2 border-gray-200"
                      }`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 p-5 rounded-2xl border border-gray-200 bg-white">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-gray-900 font-semibold">{phase.phase}</h3>
                          <span className="text-xs text-gray-400">{phase.timeframe}</span>
                          <ImpactBadge level={phase.impactLevel} />
                        </div>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed">{phase.description}</p>
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
                title="Task-by-Task Analysis"
                subtitle="Automation risk for each of your core responsibilities"
              />
              <div className="space-y-4">
                {report.taskAnalysis.map((task, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{task.task}</h3>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        task.automationRisk >= 70 ? "bg-red-50 text-red-700" :
                        task.automationRisk >= 40 ? "bg-amber-50 text-amber-700" :
                        "bg-emerald-50 text-emerald-700"
                      }`}>
                        {task.automationRisk}% risk
                      </span>
                    </div>
                    {/* Risk bar */}
                    <div className="h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          task.automationRisk >= 70 ? "bg-red-500" :
                          task.automationRisk >= 40 ? "bg-amber-500" :
                          "bg-emerald-500"
                        }`}
                        style={{ width: `${task.automationRisk}%` }}
                      />
                    </div>
                    <p className="text-gray-500 text-sm">{task.explanation}</p>
                    {task.currentAICapability && (
                      <p className="text-gray-400 text-sm mt-2 italic">Current AI capability: {task.currentAICapability}</p>
                    )}
                    {task.toolsAvailable && task.toolsAvailable.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {task.toolsAvailable.map((tool, j) => (
                          <span key={j} className="text-xs px-2 py-1 rounded-md bg-gray-50 text-gray-600 border border-gray-200">
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
                title="Automation Playbook"
                subtitle="Tasks you can start automating today to save time"
              />
              <div className="space-y-4">
                {report.automationPlaybook.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900 font-semibold">{item.task}</h3>
                      <div className="flex items-center gap-2">
                        <DifficultyBadge difficulty={item.difficulty} />
                        <span className="text-xs text-gray-400 font-medium">Save {item.timeSaved}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.howToAutomate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Salary Impact */}
          {report.salaryImpact && (
            <section className="mt-12">
              <SectionHeader
                title="Salary & Career Impact"
              />
              <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Current Outlook</h4>
                  <p className="text-gray-600 leading-relaxed">{report.salaryImpact.currentOutlook}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Projected Change</h4>
                  <p className="text-gray-600 leading-relaxed">{report.salaryImpact.projectedChange}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">High-Value Skills to Develop</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.salaryImpact.highValueSkills?.map((skill, i) => (
                        <span key={i} className="text-sm px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Emerging Roles in Your Field</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.salaryImpact.emergingRoles?.map((role, i) => (
                        <span key={i} className="text-sm px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 border border-gray-200">{role}</span>
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
                title="Your Learning Roadmap"
                subtitle="Skills to learn, ordered by priority"
              />
              <div className="space-y-4">
                {report.learningRoadmap.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold shrink-0 text-sm">
                        {i + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">{item.title}</h3>
                      <PriorityBadge priority={item.priority} />
                      <span className="text-xs text-gray-400">{item.timeframe}</span>
                    </div>
                    <p className="text-gray-500 text-sm ml-11">{item.description}</p>
                    {item.resources && item.resources.length > 0 && (
                      <div className="mt-3 ml-11 flex flex-wrap gap-2">
                        {item.resources.map((res, j) => (
                          <span key={j} className="text-xs px-2 py-1 rounded-md bg-gray-50 text-gray-600 border border-gray-200">{res}</span>
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
                    className="p-5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900 font-semibold group-hover:text-gray-700 transition-colors">
                        {tool.name}
                        <svg className="w-3.5 h-3.5 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      {tool.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-200">{tool.category}</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{tool.description}</p>
                    {tool.pricing && (
                      <p className="text-gray-400 text-xs mt-2">{tool.pricing}</p>
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
                title="Recommended Courses & Videos"
              />
              <div className="space-y-3">
                {report.videoResources.map((video, i) => (
                  <a
                    key={i}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-900 font-semibold group-hover:text-gray-700 transition-colors">
                        {video.title}
                        <svg className="w-3.5 h-3.5 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        {video.platform && <span className="text-xs text-gray-400">{video.platform}</span>}
                        {video.duration && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200">{video.duration}</span>}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{video.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Future-proofing Strategies */}
          {report.futureProofStrategies && report.futureProofStrategies.length > 0 && (
            <section className="mt-12 mb-8">
              <SectionHeader
                title="Career Future-Proofing Strategies"
              />
              <div className="space-y-4">
                {report.futureProofStrategies.map((item, i) => {
                  const strategy = typeof item === "string" ? { strategy: item, explanation: "", actionSteps: [] } : item;
                  return (
                    <div key={i} className="p-6 rounded-2xl border border-gray-200 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-900 font-semibold">{strategy.strategy}</h3>
                          {strategy.explanation && (
                            <p className="text-gray-500 text-sm mt-1 leading-relaxed">{strategy.explanation}</p>
                          )}
                          {strategy.actionSteps && strategy.actionSteps.length > 0 && (
                            <ul className="mt-3 space-y-1.5">
                              {strategy.actionSteps.map((step, j) => (
                                <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                                  <span className="text-gray-300 mt-0.5">-</span>
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
        </div>
      </main>
      <Footer />
    </>
  );
}

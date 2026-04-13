"use client";

import { FreeReport } from "@/lib/types";

function getRiskColor(score: number): string {
  if (score < 30) return "text-green-400";
  if (score < 60) return "text-yellow-400";
  return "text-red-400";
}

function getRiskLabel(score: number): string {
  if (score < 20) return "Very Low Risk";
  if (score < 40) return "Low Risk";
  if (score < 60) return "Moderate Risk";
  if (score < 80) return "High Risk";
  return "Very High Risk";
}

export default function ReportCard({ report }: { report: FreeReport }) {
  return (
    <div className="space-y-8">
      {/* Risk Score */}
      <div className="text-center p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="text-sm text-zinc-400 uppercase tracking-wider mb-4">
          AI Replacement Risk Score
        </div>
        <div
          className={`text-8xl font-bold ${getRiskColor(report.riskScore)}`}
        >
          {report.riskScore}
        </div>
        <div className="text-xl text-zinc-300 mt-2">out of 100</div>
        <div className={`text-lg font-medium mt-2 ${getRiskColor(report.riskScore)}`}>
          {getRiskLabel(report.riskScore)}
        </div>

        {/* Visual meter */}
        <div className="mt-6 h-4 risk-gradient rounded-full relative max-w-md mx-auto">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-zinc-800 transition-all duration-1000"
            style={{ left: `calc(${report.riskScore}% - 12px)` }}
          />
        </div>
        <div className="flex justify-between text-xs text-zinc-500 mt-2 max-w-md mx-auto">
          <span>Safe</span>
          <span>Moderate</span>
          <span>High Risk</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Timeline Estimate
        </h3>
        <p className="mt-3 text-zinc-300 text-lg">{report.timelineEstimate}</p>
      </div>

      {/* Summary */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <h3 className="text-lg font-semibold text-white">Impact Summary</h3>
        <p className="mt-3 text-zinc-300 leading-relaxed">{report.summary}</p>
      </div>

      {/* Tasks at risk */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
          <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Tasks at Risk
          </h3>
          <ul className="mt-3 space-y-2">
            {report.tasksAtRisk.map((task, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-300">
                <span className="text-red-400 mt-1">-</span>
                {task}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
          <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Tasks Resistant to AI
          </h3>
          <ul className="mt-3 space-y-2">
            {report.tasksResistant.map((task, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-300">
                <span className="text-green-400 mt-1">+</span>
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

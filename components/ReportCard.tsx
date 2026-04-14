"use client";

import { FreeReport } from "@/lib/types";

function getRiskColor(score: number): string {
  if (score < 30) return "text-emerald-500";
  if (score < 60) return "text-amber-500";
  return "text-red-500";
}

function getRiskBg(score: number): string {
  if (score < 30) return "border-emerald-500/15 bg-emerald-500/[0.03]";
  if (score < 60) return "border-amber-500/15 bg-amber-500/[0.03]";
  return "border-red-500/15 bg-red-500/[0.03]";
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
    <div className="space-y-6">
      {/* Risk Score */}
      <div className={`text-center p-8 rounded-2xl border ${getRiskBg(report.riskScore)}`}>
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-4">
          AI Replacement Risk Score
        </div>
        <div className={`text-7xl md:text-8xl font-bold tracking-tight ${getRiskColor(report.riskScore)}`}>
          {report.riskScore}
        </div>
        <div className="text-lg text-zinc-500 mt-1">out of 100</div>
        <div className={`text-sm font-semibold mt-2 ${getRiskColor(report.riskScore)} uppercase tracking-wider`}>
          {getRiskLabel(report.riskScore)}
        </div>

        {/* Minimal meter */}
        <div className="mt-6 max-w-sm mx-auto">
          <div className="h-1.5 bg-zinc-800 rounded-full relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-600 via-amber-500 to-red-600 transition-all duration-1000"
              style={{ width: "100%" }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-zinc-900 transition-all duration-1000"
              style={{ left: `calc(${report.riskScore}% - 8px)` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-zinc-600 mt-1.5 uppercase tracking-wider">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
          Timeline Estimate
        </h3>
        <p className="mt-2 text-zinc-200 text-lg">{report.timelineEstimate}</p>
      </div>

      {/* Summary */}
      <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
          Impact Summary
        </h3>
        <p className="mt-2 text-zinc-300 leading-relaxed">{report.summary}</p>
      </div>

      {/* Tasks at risk */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
          <h3 className="text-sm font-semibold text-red-400/80 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Tasks at Risk
          </h3>
          <ul className="mt-3 space-y-2">
            {report.tasksAtRisk.map((task, i) => (
              <li key={i} className="text-zinc-300 text-sm pl-3 border-l border-zinc-700">
                {task}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
          <h3 className="text-sm font-semibold text-emerald-400/80 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Resistant to AI
          </h3>
          <ul className="mt-3 space-y-2">
            {report.tasksResistant.map((task, i) => (
              <li key={i} className="text-zinc-300 text-sm pl-3 border-l border-zinc-700">
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

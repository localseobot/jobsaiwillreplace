"use client";

import { FreeReport } from "@/lib/types";

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

export default function ReportCard({ report }: { report: FreeReport }) {
  return (
    <div className="space-y-6">
      {/* Risk Score */}
      <div className={`text-center p-8 rounded-2xl border ${getRiskBg(report.riskScore)}`}>
        <div className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-4">
          AI Replacement Risk Score
        </div>
        <div className={`text-7xl md:text-8xl font-bold tracking-tight ${getRiskColor(report.riskScore)}`}>
          {report.riskScore}
        </div>
        <div className="text-lg text-gray-500 mt-1">out of 100</div>
        <div className={`text-sm font-semibold mt-2 ${getRiskColor(report.riskScore)} uppercase tracking-wider`}>
          {getRiskLabel(report.riskScore)}
        </div>

        {/* Minimal meter */}
        <div className="mt-6 max-w-sm mx-auto">
          <div className="h-1.5 bg-gray-200 rounded-full relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-1000"
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

      {/* Timeline */}
      <div className="p-5 rounded-2xl border border-gray-200 bg-white">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Timeline Estimate
        </h3>
        <p className="mt-2 text-gray-900 text-lg">{report.timelineEstimate}</p>
      </div>

      {/* Summary */}
      <div className="p-5 rounded-2xl border border-gray-200 bg-white">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Impact Summary
        </h3>
        <p className="mt-2 text-gray-600 leading-relaxed">{report.summary}</p>
      </div>

      {/* Tasks at risk */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-gray-200 bg-white">
          <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Tasks at Risk
          </h3>
          <ul className="mt-3 space-y-2">
            {report.tasksAtRisk.map((task, i) => (
              <li key={i} className="text-gray-600 text-sm pl-3 border-l border-gray-200">
                {task}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl border border-gray-200 bg-white">
          <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Resistant to AI
          </h3>
          <ul className="mt-3 space-y-2">
            {report.tasksResistant.map((task, i) => (
              <li key={i} className="text-gray-600 text-sm pl-3 border-l border-gray-200">
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

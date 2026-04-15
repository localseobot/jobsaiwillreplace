"use client";

import { useState } from "react";
import { PaidReport, SurveyData } from "@/lib/types";

function getRiskLabel(score: number): string {
  if (score < 20) return "Very Low Risk";
  if (score < 40) return "Low Risk";
  if (score < 60) return "Moderate Risk";
  if (score < 80) return "High Risk";
  return "Very High Risk";
}

function getPositiveFraming(score: number): string {
  if (score < 30) return "My role is well-positioned for the AI era";
  if (score < 60) return "I'm taking proactive steps to adapt and thrive alongside AI";
  return "I'm staying ahead of AI disruption with a clear action plan";
}

function getTopActions(report: PaidReport): string {
  const actions: string[] = [];
  if (report.immediateActions?.[0]) actions.push(report.immediateActions[0].action);
  if (report.learningRoadmap?.[0]) actions.push(`learning ${report.learningRoadmap[0].title}`);
  if (report.automationPlaybook?.[0]) actions.push(`automating ${report.automationPlaybook[0].task.toLowerCase()}`);
  return actions.slice(0, 2).join(" and ");
}

export default function ShareCard({
  report,
  surveyData,
  reportId,
}: {
  report: PaidReport;
  surveyData: SurveyData;
  reportId?: string | null;
}) {
  const [copiedLink, setCopiedLink] = useState(false);

  const siteUrl = reportId
    ? `https://jobsaiwillreplace.com/r/${reportId}`
    : "https://jobsaiwillreplace.com";
  const riskLabel = getRiskLabel(report.riskScore);
  const positiveFrame = getPositiveFraming(report.riskScore);
  const topActions = getTopActions(report);

  const linkedInText = `I just completed my AI Career Impact Assessment and scored ${report.riskScore}/100 (${riskLabel}) as a ${surveyData.jobTitle} in ${surveyData.industry}.\n\n${positiveFrame}${topActions ? ` — including ${topActions}` : ""}.\n\nThe future of work is changing. Are you prepared?\n\nGet your free AI career assessment →`;
  const twitterText = `Just got my AI Career Impact Score: ${report.riskScore}/100 as a ${surveyData.jobTitle}. ${positiveFrame}.\n\nGet your free assessment →`;
  const facebookQuote = `I scored ${report.riskScore}/100 on my AI Career Impact Assessment as a ${surveyData.jobTitle}. ${positiveFrame}. Find out your score!`;

  function shareLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}&summary=${encodeURIComponent(linkedInText)}`;
    window.open(url, "_blank", "width=600,height=600");
  }

  function shareTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(siteUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  }

  function shareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(facebookQuote)}`;
    window.open(url, "_blank", "width=600,height=400");
  }

  function copyShareLink() {
    const text = `${linkedInText}\n\n${siteUrl}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  }

  const scoreColor =
    report.riskScore < 30
      ? "text-emerald-600"
      : report.riskScore < 60
      ? "text-amber-600"
      : "text-red-600";

  const scoreBg =
    report.riskScore < 30
      ? "bg-emerald-50 border-emerald-200"
      : report.riskScore < 60
      ? "bg-amber-50 border-amber-200"
      : "bg-red-50 border-red-200";

  return (
    <div className="space-y-5">
      {/* Preview of what will be shared */}
      <div className={`p-5 rounded-2xl border ${scoreBg}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`text-4xl font-bold ${scoreColor}`}>
            {report.riskScore}<span className="text-lg text-gray-400">/100</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-medium">{positiveFrame}</p>
            {topActions && (
              <p className="text-gray-500 text-sm mt-1">
                Next steps: {topActions}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Social Media Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={shareLinkedIn}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </button>

        <button
          onClick={shareTwitter}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Twitter / X
        </button>

        <button
          onClick={shareFacebook}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>

        <button
          onClick={copyShareLink}
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {copiedLink ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            )}
          </svg>
          {copiedLink ? "Copied!" : "Copy Text"}
        </button>
      </div>

      <p className="text-gray-400 text-xs text-center">
        Share your results with your network — show them you&apos;re prepared for the AI revolution.
      </p>
    </div>
  );
}

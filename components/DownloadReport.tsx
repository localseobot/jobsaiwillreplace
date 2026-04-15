"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { PaidReport, SurveyData } from "@/lib/types";

function getRiskLabel(score: number): string {
  if (score < 20) return "Very Low Risk";
  if (score < 40) return "Low Risk";
  if (score < 60) return "Moderate Risk";
  if (score < 80) return "High Risk";
  return "Very High Risk";
}

function getRiskHex(score: number): [number, number, number] {
  if (score < 30) return [22, 163, 74];
  if (score < 60) return [202, 138, 4];
  return [220, 38, 38];
}

export default function DownloadReport({
  report,
  surveyData,
}: {
  report: PaidReport;
  surveyData: SurveyData;
}) {
  const [generating, setGenerating] = useState(false);

  function handleDownloadPDF() {
    setGenerating(true);
    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210;
      const margin = 20;
      const contentW = W - margin * 2;
      let y = 0;

      const black: [number, number, number] = [26, 26, 26];
      const darkGray: [number, number, number] = [75, 85, 99];
      const midGray: [number, number, number] = [107, 114, 128];
      const lightGray: [number, number, number] = [156, 163, 175];
      const accent: [number, number, number] = [26, 26, 26];
      const white: [number, number, number] = [255, 255, 255];

      // --- COVER PAGE ---
      // Thin accent bar
      doc.setFillColor(...accent);
      doc.rect(0, 0, W, 4, "F");

      // Logo area
      y = 30;
      doc.setFontSize(14);
      doc.setTextColor(...black);
      doc.setFont("helvetica", "bold");
      doc.text("JobsAIWillReplace.", margin, y);

      // Date
      doc.setFontSize(9);
      doc.setTextColor(...midGray);
      doc.setFont("helvetica", "normal");
      doc.text(`Report Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, W - margin, y, { align: "right" });

      // Divider
      y = 44;
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.3);
      doc.line(margin, y, W - margin, y);

      // Title block
      y = 66;
      doc.setFontSize(28);
      doc.setTextColor(...black);
      doc.setFont("helvetica", "bold");
      doc.text("AI Career Impact", margin, y);
      y += 12;
      doc.text("Assessment Report", margin, y);

      // Subtitle
      y += 14;
      doc.setFontSize(12);
      doc.setTextColor(...darkGray);
      doc.setFont("helvetica", "normal");
      doc.text(`Prepared for: ${surveyData.jobTitle}`, margin, y);
      y += 7;
      doc.text(`Industry: ${surveyData.industry}`, margin, y);
      y += 7;
      doc.text(`Experience: ${surveyData.yearsExperience}`, margin, y);

      // Score box
      y += 20;
      const riskColor = getRiskHex(report.riskScore);
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(margin, y, contentW, 50, 3, 3, "F");
      doc.setDrawColor(229, 231, 235);
      doc.roundedRect(margin, y, contentW, 50, 3, 3, "S");

      // Score number
      doc.setFontSize(48);
      doc.setTextColor(...riskColor);
      doc.setFont("helvetica", "bold");
      doc.text(String(report.riskScore), margin + 20, y + 33);

      // Score label
      doc.setFontSize(10);
      doc.setTextColor(...midGray);
      doc.setFont("helvetica", "normal");
      doc.text("/ 100", margin + 42, y + 33);

      doc.setFontSize(16);
      doc.setTextColor(...riskColor);
      doc.setFont("helvetica", "bold");
      doc.text(getRiskLabel(report.riskScore), margin + 65, y + 22);

      doc.setFontSize(10);
      doc.setTextColor(...darkGray);
      doc.setFont("helvetica", "normal");
      doc.text(`Timeline: ${report.timelineEstimate}`, margin + 65, y + 33);

      // Risk bar
      const barY = y + 42;
      const barW = contentW - 10;
      doc.setFillColor(229, 231, 235);
      doc.roundedRect(margin + 5, barY, barW, 3, 1.5, 1.5, "F");
      doc.setFillColor(...riskColor);
      doc.roundedRect(margin + 5, barY, barW * (report.riskScore / 100), 3, 1.5, 1.5, "F");

      // Confidential footer
      y = 265;
      doc.setDrawColor(229, 231, 235);
      doc.line(margin, y, W - margin, y);
      y += 6;
      doc.setFontSize(8);
      doc.setTextColor(...lightGray);
      doc.text("CONFIDENTIAL — Prepared by JobsAIWillReplace.com", margin, y);
      doc.text("Page 1", W - margin, y, { align: "right" });

      // Bottom accent bar
      doc.setFillColor(...accent);
      doc.rect(0, 293, W, 4, "F");

      // --- Helper functions ---
      let pageNum = 1;

      function newPage() {
        doc.addPage();
        pageNum++;
        doc.setFillColor(...accent);
        doc.rect(0, 0, W, 2, "F");
        doc.setFontSize(8);
        doc.setTextColor(...lightGray);
        doc.setFont("helvetica", "normal");
        doc.text("AI Career Impact Assessment — " + surveyData.jobTitle, margin, 12);
        doc.text("JobsAIWillReplace.com", W - margin, 12, { align: "right" });
        doc.setDrawColor(229, 231, 235);
        doc.line(margin, 15, W - margin, 15);
        doc.setFillColor(...accent);
        doc.rect(0, 293, W, 4, "F");
        doc.setFontSize(8);
        doc.setTextColor(...lightGray);
        doc.text("CONFIDENTIAL", margin, 290);
        doc.text(`Page ${pageNum}`, W - margin, 290, { align: "right" });
        return 22;
      }

      function checkPage(needed: number): number {
        if (y + needed > 280) {
          y = newPage();
        }
        return y;
      }

      function sectionTitle(title: string) {
        y = checkPage(16);
        doc.setFontSize(14);
        doc.setTextColor(...black);
        doc.setFont("helvetica", "bold");
        doc.text(title.toUpperCase(), margin, y);
        y += 2;
        doc.setDrawColor(...accent);
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + 40, y);
        y += 8;
      }

      function bodyText(text: string, bold = false) {
        y = checkPage(8);
        doc.setFontSize(10);
        doc.setTextColor(...darkGray);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        const lines = doc.splitTextToSize(text, contentW);
        doc.text(lines, margin, y);
        y += lines.length * 5;
      }

      function bulletPoint(text: string, indent = 0) {
        y = checkPage(8);
        const x = margin + 3 + indent;
        doc.setFontSize(9);
        doc.setTextColor(...darkGray);
        doc.setFont("helvetica", "normal");
        doc.setFillColor(...midGray);
        doc.circle(x, y - 1, 0.8, "F");
        const lines = doc.splitTextToSize(text, contentW - 8 - indent);
        doc.text(lines, x + 4, y);
        y += lines.length * 4.5 + 1;
      }

      function labelValue(label: string, value: string) {
        y = checkPage(8);
        doc.setFontSize(9);
        doc.setTextColor(...midGray);
        doc.setFont("helvetica", "bold");
        doc.text(label + ":", margin + 3, y);
        doc.setTextColor(...darkGray);
        doc.setFont("helvetica", "normal");
        const labelW = doc.getTextWidth(label + ": ");
        const valLines = doc.splitTextToSize(value, contentW - labelW - 6);
        doc.text(valLines, margin + 3 + labelW, y);
        y += valLines.length * 4.5 + 1;
      }

      // --- PAGE 2: Executive Summary + Industry Outlook ---
      y = newPage();

      sectionTitle("Executive Summary");
      bodyText(report.summary);
      y += 6;

      if (report.industryOutlook) {
        sectionTitle("Industry Outlook");
        bodyText(report.industryOutlook.currentState);
        y += 3;
        if (report.industryOutlook.keyDrivers?.length) {
          bodyText("Key Drivers:", true);
          for (const driver of report.industryOutlook.keyDrivers) {
            bulletPoint(driver);
          }
        }
        y += 3;
        if (report.industryOutlook.notableCompanies?.length) {
          labelValue("Companies Leading Change", report.industryOutlook.notableCompanies.join(", "));
        }
      }

      // --- Timeline ---
      if (report.timelinePhases?.length) {
        y += 4;
        sectionTitle("AI Impact Timeline");
        for (const phase of report.timelinePhases) {
          y = checkPage(18);
          doc.setFontSize(11);
          doc.setTextColor(...black);
          doc.setFont("helvetica", "bold");
          doc.text(phase.phase, margin + 3, y);
          doc.setFontSize(9);
          doc.setTextColor(...midGray);
          doc.setFont("helvetica", "normal");
          doc.text(`(${phase.timeframe}) — ${phase.impactLevel.toUpperCase()} impact`, margin + 3 + doc.getTextWidth(phase.phase + "  "), y);
          y += 5;
          const desc = doc.splitTextToSize(phase.description, contentW - 6);
          doc.setTextColor(...darkGray);
          doc.text(desc, margin + 3, y);
          y += desc.length * 4.5 + 4;
        }
      }

      // --- Task Analysis ---
      if (report.taskAnalysis?.length) {
        y += 4;
        sectionTitle("Task-by-Task Analysis");
        for (const task of report.taskAnalysis) {
          y = checkPage(22);
          doc.setFontSize(10);
          doc.setTextColor(...black);
          doc.setFont("helvetica", "bold");
          doc.text(task.task, margin + 3, y);
          const taskRiskColor = getRiskHex(task.automationRisk);
          doc.setTextColor(...taskRiskColor);
          doc.text(`${task.automationRisk}% risk`, W - margin, y, { align: "right" });
          y += 2;
          doc.setFillColor(229, 231, 235);
          doc.roundedRect(margin + 3, y, contentW - 6, 2, 1, 1, "F");
          doc.setFillColor(...taskRiskColor);
          doc.roundedRect(margin + 3, y, (contentW - 6) * (task.automationRisk / 100), 2, 1, 1, "F");
          y += 5;
          doc.setFontSize(9);
          doc.setTextColor(...darkGray);
          doc.setFont("helvetica", "normal");
          const expLines = doc.splitTextToSize(task.explanation, contentW - 6);
          doc.text(expLines, margin + 3, y);
          y += expLines.length * 4.5;
          if (task.toolsAvailable?.length) {
            labelValue("Tools", task.toolsAvailable.join(", "));
          }
          y += 3;
        }
      }

      // --- Salary Impact ---
      if (report.salaryImpact) {
        y += 4;
        sectionTitle("Salary & Career Impact");
        bodyText(report.salaryImpact.currentOutlook);
        y += 2;
        bodyText(report.salaryImpact.projectedChange);
        y += 3;
        if (report.salaryImpact.highValueSkills?.length) {
          bodyText("High-Value Skills to Develop:", true);
          for (const skill of report.salaryImpact.highValueSkills) {
            bulletPoint(skill);
          }
        }
        if (report.salaryImpact.emergingRoles?.length) {
          y += 2;
          bodyText("Emerging Roles in Your Field:", true);
          for (const role of report.salaryImpact.emergingRoles) {
            bulletPoint(role);
          }
        }
      }

      // --- Automation Playbook ---
      if (report.automationPlaybook?.length) {
        y += 4;
        sectionTitle("Automation Playbook");
        for (const item of report.automationPlaybook) {
          y = checkPage(16);
          doc.setFontSize(10);
          doc.setTextColor(...black);
          doc.setFont("helvetica", "bold");
          doc.text(item.task, margin + 3, y);
          doc.setFontSize(8);
          doc.setTextColor(...midGray);
          doc.setFont("helvetica", "normal");
          doc.text(`${item.difficulty.toUpperCase()} | Save ${item.timeSaved}`, W - margin, y, { align: "right" });
          y += 5;
          doc.setFontSize(9);
          doc.setTextColor(...darkGray);
          const howLines = doc.splitTextToSize(item.howToAutomate, contentW - 6);
          doc.text(howLines, margin + 3, y);
          y += howLines.length * 4.5 + 4;
        }
      }

      // --- Learning Roadmap ---
      if (report.learningRoadmap?.length) {
        y += 4;
        sectionTitle("Learning Roadmap");
        for (let i = 0; i < report.learningRoadmap.length; i++) {
          const item = report.learningRoadmap[i];
          y = checkPage(18);
          doc.setFontSize(10);
          doc.setTextColor(...black);
          doc.setFont("helvetica", "bold");
          doc.text(`${i + 1}. ${item.title}`, margin + 3, y);
          doc.setFontSize(8);
          doc.setTextColor(...midGray);
          doc.text(`${(item.priority || "medium").toUpperCase()} | ${item.timeframe}`, W - margin, y, { align: "right" });
          y += 5;
          doc.setFontSize(9);
          doc.setTextColor(...darkGray);
          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(item.description, contentW - 6);
          doc.text(descLines, margin + 3, y);
          y += descLines.length * 4.5;
          if (item.resources?.length) {
            for (const res of item.resources) {
              bulletPoint(res, 4);
            }
          }
          y += 3;
        }
      }

      // --- AI Tools ---
      if (report.aiTools?.length) {
        y += 4;
        sectionTitle("Recommended AI Tools");
        for (const tool of report.aiTools) {
          y = checkPage(16);
          doc.setFontSize(10);
          doc.setTextColor(...black);
          doc.setFont("helvetica", "bold");
          doc.text(tool.name, margin + 3, y);
          if (tool.pricing) {
            doc.setFontSize(8);
            doc.setTextColor(...midGray);
            doc.setFont("helvetica", "normal");
            doc.text(tool.pricing, W - margin, y, { align: "right" });
          }
          y += 5;
          doc.setFontSize(9);
          doc.setTextColor(...darkGray);
          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(tool.description, contentW - 6);
          doc.text(descLines, margin + 3, y);
          y += descLines.length * 4.5;
          if (tool.url) {
            doc.setTextColor(...accent);
            doc.textWithLink(tool.url, margin + 3, y, { url: tool.url });
            y += 5;
          }
          y += 2;
        }
      }

      // --- Video Resources ---
      if (report.videoResources?.length) {
        y += 4;
        sectionTitle("Recommended Courses & Videos");
        for (const video of report.videoResources) {
          y = checkPage(14);
          doc.setFontSize(10);
          doc.setTextColor(...black);
          doc.setFont("helvetica", "bold");
          doc.text(video.title, margin + 3, y);
          if (video.platform || video.duration) {
            doc.setFontSize(8);
            doc.setTextColor(...midGray);
            doc.setFont("helvetica", "normal");
            doc.text([video.platform, video.duration].filter(Boolean).join(" | "), W - margin, y, { align: "right" });
          }
          y += 5;
          doc.setFontSize(9);
          doc.setTextColor(...darkGray);
          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(video.description, contentW - 6);
          doc.text(descLines, margin + 3, y);
          y += descLines.length * 4.5;
          if (video.url) {
            doc.setTextColor(...accent);
            doc.textWithLink(video.url, margin + 3, y, { url: video.url });
            y += 5;
          }
          y += 2;
        }
      }

      // --- Future-Proofing Strategies ---
      if (report.futureProofStrategies?.length) {
        y += 4;
        sectionTitle("Career Future-Proofing Strategies");
        for (let i = 0; i < report.futureProofStrategies.length; i++) {
          const item = report.futureProofStrategies[i];
          const strategy = typeof item === "string" ? { strategy: item, explanation: "", actionSteps: [] } : item;
          y = checkPage(16);
          doc.setFontSize(10);
          doc.setTextColor(...black);
          doc.setFont("helvetica", "bold");
          doc.text(`${i + 1}. ${strategy.strategy}`, margin + 3, y);
          y += 5;
          if (strategy.explanation) {
            doc.setFontSize(9);
            doc.setTextColor(...darkGray);
            doc.setFont("helvetica", "normal");
            const expLines = doc.splitTextToSize(strategy.explanation, contentW - 6);
            doc.text(expLines, margin + 3, y);
            y += expLines.length * 4.5;
          }
          if (strategy.actionSteps?.length) {
            for (const step of strategy.actionSteps) {
              bulletPoint(step, 4);
            }
          }
          y += 3;
        }
      }

      // --- Immediate Actions ---
      if (report.immediateActions?.length) {
        y += 4;
        sectionTitle("Immediate Actions");
        for (const item of report.immediateActions) {
          y = checkPage(12);
          doc.setFontSize(10);
          doc.setTextColor(...black);
          doc.setFont("helvetica", "bold");
          doc.text(item.action, margin + 3, y);
          doc.setFontSize(8);
          doc.setTextColor(...midGray);
          doc.text(item.timeToComplete, W - margin, y, { align: "right" });
          y += 5;
          doc.setFontSize(9);
          doc.setTextColor(...darkGray);
          doc.setFont("helvetica", "normal");
          const whyLines = doc.splitTextToSize(item.why, contentW - 6);
          doc.text(whyLines, margin + 3, y);
          y += whyLines.length * 4.5 + 3;
        }
      }

      // --- Disclaimer ---
      y = checkPage(30);
      y += 10;
      doc.setDrawColor(229, 231, 235);
      doc.line(margin, y, W - margin, y);
      y += 8;
      doc.setFontSize(8);
      doc.setTextColor(...lightGray);
      doc.setFont("helvetica", "italic");
      const disclaimer = "This report was generated by AI based on self-reported survey data and publicly available information about industry trends. It is intended for informational purposes only and should not be considered professional career advice. Individual circumstances vary and actual outcomes may differ from projections. For personalized career guidance, please consult a qualified career counselor.";
      const discLines = doc.splitTextToSize(disclaimer, contentW);
      doc.text(discLines, margin, y);
      y += discLines.length * 3.5 + 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...midGray);
      doc.text("jobsaiwillreplace.com", W / 2, y, { align: "center" });

      doc.save(`AI-Career-Report-${surveyData.jobTitle.replace(/\s+/g, "-")}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <button
      onClick={handleDownloadPDF}
      disabled={generating}
      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium transition-colors disabled:opacity-50"
    >
      {generating ? (
        <>
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Full Report (PDF)
        </>
      )}
    </button>
  );
}

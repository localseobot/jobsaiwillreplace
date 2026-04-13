"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

function getRiskColor(score: number): string {
  if (score < 30) return "#4ade80";
  if (score < 60) return "#facc15";
  return "#f87171";
}

function getRiskLabel(score: number): string {
  if (score < 20) return "Very Low Risk";
  if (score < 40) return "Low Risk";
  if (score < 60) return "Moderate Risk";
  if (score < 80) return "High Risk";
  return "Very High Risk";
}

export default function ShareCard({
  riskScore,
  jobTitle,
  timelineEstimate,
}: {
  riskScore: number;
  jobTitle: string;
  timelineEstimate: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generateImage(): Promise<HTMLCanvasElement | null> {
    if (!cardRef.current) return null;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#0a0a0a",
      scale: 2,
      useCORS: true,
      logging: false,
    });
    return canvas;
  }

  async function handleDownloadImage() {
    setGenerating(true);
    try {
      const canvas = await generateImage();
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = `ai-risk-score-${jobTitle.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setGenerating(false);
    }
  }

  async function handleCopyImage() {
    setGenerating(true);
    try {
      const canvas = await generateImage();
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }, "image/png");
    } catch {
      // Fallback: download instead
      handleDownloadImage();
    } finally {
      setGenerating(false);
    }
  }

  const riskColor = getRiskColor(riskScore);

  return (
    <div>
      {/* The card to be captured */}
      <div
        ref={cardRef}
        style={{
          width: 600,
          padding: 48,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${riskColor}15 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="16" width="40" height="26" rx="3" stroke="#ef4444" strokeWidth="2.5" fill="none" />
              <path d="M16 16V12C16 9.79086 17.7909 8 20 8H28C30.2091 8 32 9.79086 32 12V16" stroke="#ef4444" strokeWidth="2.5" fill="none" />
              <path d="M24 22V34" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M19 30L24 35L29 30" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", color: "#71717a", textTransform: "uppercase" as const }}>
                Jobs
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                AI WILL REPLACE<span style={{ color: "#ef4444" }}>.</span>
              </div>
            </div>
          </div>

          {/* Score */}
          <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", color: "#71717a", textTransform: "uppercase" as const, marginBottom: 12 }}>
              AI Replacement Risk Score
            </div>
            <div style={{ fontSize: 96, fontWeight: 800, color: riskColor, lineHeight: 1 }}>
              {riskScore}
            </div>
            <div style={{ fontSize: 18, color: "#a1a1aa", marginTop: 4 }}>
              out of 100
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: riskColor, marginTop: 8 }}>
              {getRiskLabel(riskScore)}
            </div>

            {/* Risk bar */}
            <div style={{ margin: "20px auto 0", maxWidth: 400, height: 8, borderRadius: 4, background: "linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%)", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: `calc(${riskScore}% - 8px)`,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#ffffff",
                  border: "3px solid #18181b",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>

          {/* Job title */}
          <div style={{ textAlign: "center" as const, marginBottom: 16 }}>
            <div style={{ fontSize: 16, color: "#a1a1aa" }}>Results for</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", marginTop: 4 }}>
              {jobTitle}
            </div>
          </div>

          {/* Timeline */}
          <div style={{
            textAlign: "center" as const,
            padding: "12px 20px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 14,
            color: "#a1a1aa",
          }}>
            Timeline: {timelineEstimate}
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center" as const, marginTop: 32, fontSize: 13, color: "#52525b" }}>
            jobsaiwillreplace.com — Find out your AI risk score
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDownloadImage}
          disabled={generating}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Image
        </button>
        <button
          onClick={handleCopyImage}
          disabled={generating}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
}

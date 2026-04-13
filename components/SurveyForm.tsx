"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { SurveyData } from "@/lib/types";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance & Banking",
  "Education",
  "Retail & E-commerce",
  "Manufacturing",
  "Legal",
  "Marketing & Advertising",
  "Media & Entertainment",
  "Real Estate",
  "Transportation & Logistics",
  "Construction",
  "Government",
  "Hospitality & Food Service",
  "Agriculture",
  "Energy & Utilities",
  "Other",
];

const TASKS = [
  "Data Entry",
  "Writing & Content Creation",
  "Data Analysis",
  "Customer Service",
  "Creative Design",
  "Physical Labor",
  "Management & Leadership",
  "Software Development",
  "Sales & Negotiation",
  "Research",
  "Teaching & Training",
  "Accounting & Bookkeeping",
  "Administrative Tasks",
  "Strategic Planning",
  "Hands-on Skilled Trade",
];

const EDUCATION_LEVELS = [
  "High School",
  "Some College",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "Trade/Vocational",
  "Self-taught/Bootcamp",
];

export default function SurveyForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SurveyData>({
    jobTitle: "",
    industry: "",
    yearsExperience: "",
    primaryTasks: [],
    repetitivePercent: 50,
    usesAI: "",
    educationLevel: "",
  });

  // Email state
  const [email, setEmail] = useState("");

  // Resume upload state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeError, setResumeError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 9; // 7 questions + email + resume
  const progress = ((step + 1) / totalSteps) * 100;

  function update(field: keyof SurveyData, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleTask(task: string) {
    setData((prev) => ({
      ...prev,
      primaryTasks: prev.primaryTasks.includes(task)
        ? prev.primaryTasks.filter((t) => t !== task)
        : [...prev.primaryTasks, task],
    }));
  }

  async function handleResumeUpload(file: File) {
    setResumeFile(file);
    setResumeUploading(true);
    setResumeError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to parse resume");
      }

      setResumeText(result.text);
    } catch (err) {
      setResumeError(err instanceof Error ? err.message : "Failed to parse resume");
      setResumeFile(null);
      setResumeText("");
    } finally {
      setResumeUploading(false);
    }
  }

  function removeResume() {
    setResumeFile(null);
    setResumeText("");
    setResumeError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return data.jobTitle.trim().length > 0;
      case 1:
        return data.industry.length > 0;
      case 2:
        return data.yearsExperience.length > 0;
      case 3:
        return data.primaryTasks.length > 0;
      case 4:
        return true;
      case 5:
        return data.usesAI.length > 0;
      case 6:
        return data.educationLevel.length > 0;
      case 7:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Valid email
      case 8:
        return !resumeUploading; // Always can proceed (resume is optional)
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      // Save to database first (non-blocking — don't fail if DB is down)
      fetch("/api/save-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          surveyData: data,
          resumeText: resumeText || null,
        }),
      }).catch(() => {}); // Fire and forget

      // Generate report
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyData: data,
          tier: "paid",
          resumeText: resumeText || undefined,
        }),
      });
      const result = await res.json();
      sessionStorage.setItem("surveyData", JSON.stringify(data));
      sessionStorage.setItem("paidReport", JSON.stringify(result.report));
      router.push("/report-pro");
    } catch {
      alert("Something went wrong generating your report. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function next() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-zinc-500 mb-2">
          <span>
            {step < 7 ? `Question ${step + 1} of 7` : step === 7 ? "Almost there!" : "Bonus: Resume Upload"}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="animate-fade-in" key={step}>
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              What is your job title?
            </h2>
            <p className="text-zinc-400 mb-6">
              Be as specific as possible for the most accurate results.
            </p>
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => update("jobTitle", e.target.value)}
              placeholder="e.g. Marketing Manager, Software Engineer, Accountant"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-lg"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && canProceed() && next()}
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              What industry do you work in?
            </h2>
            <p className="text-zinc-400 mb-6">
              Select the industry that best matches your role.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => update("industry", ind)}
                  className={`px-4 py-3 rounded-xl border text-left transition-all ${
                    data.industry === ind
                      ? "border-red-500 bg-red-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              How many years of experience do you have?
            </h2>
            <p className="text-zinc-400 mb-6">In your current role or field.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Less than 1 year",
                "1-3 years",
                "3-5 years",
                "5-10 years",
                "10-20 years",
                "20+ years",
              ].map((exp) => (
                <button
                  key={exp}
                  onClick={() => update("yearsExperience", exp)}
                  className={`px-4 py-3 rounded-xl border text-left transition-all ${
                    data.yearsExperience === exp
                      ? "border-red-500 bg-red-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              What are your primary tasks?
            </h2>
            <p className="text-zinc-400 mb-6">
              Select all that apply to your daily work.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TASKS.map((task) => (
                <button
                  key={task}
                  onClick={() => toggleTask(task)}
                  className={`px-4 py-3 rounded-xl border text-left transition-all ${
                    data.primaryTasks.includes(task)
                      ? "border-red-500 bg-red-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {data.primaryTasks.includes(task) ? "- " : "+ "}
                  {task}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              How much of your job involves repetitive tasks?
            </h2>
            <p className="text-zinc-400 mb-6">
              Tasks that follow a predictable pattern or process.
            </p>
            <div className="mt-8">
              <input
                type="range"
                min="0"
                max="100"
                value={data.repetitivePercent}
                onChange={(e) =>
                  update("repetitivePercent", parseInt(e.target.value))
                }
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-red-500"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${data.repetitivePercent}%, #333 ${data.repetitivePercent}%, #333 100%)`,
                }}
              />
              <div className="flex justify-between mt-4 text-zinc-400">
                <span>0% - Mostly unique tasks</span>
                <span className="text-2xl font-bold text-white">
                  {data.repetitivePercent}%
                </span>
                <span>100% - Highly repetitive</span>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Do you currently use AI tools at work?
            </h2>
            <p className="text-zinc-400 mb-6">
              ChatGPT, Copilot, Jasper, or any other AI-powered tools.
            </p>
            <div className="grid gap-3">
              {[
                {
                  value: "yes",
                  label: "Yes, regularly",
                  desc: "I use AI tools daily or weekly",
                },
                {
                  value: "sometimes",
                  label: "Sometimes",
                  desc: "I've tried them but don't use them consistently",
                },
                {
                  value: "no",
                  label: "No, not yet",
                  desc: "I haven't used AI tools for work",
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("usesAI", opt.value)}
                  className={`px-6 py-4 rounded-xl border text-left transition-all ${
                    data.usesAI === opt.value
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div className="text-white font-medium">{opt.label}</div>
                  <div className="text-zinc-400 text-sm mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              What is your education level?
            </h2>
            <p className="text-zinc-400 mb-6">
              Your highest level of education completed.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {EDUCATION_LEVELS.map((edu) => (
                <button
                  key={edu}
                  onClick={() => update("educationLevel", edu)}
                  className={`px-4 py-3 rounded-xl border text-left transition-all ${
                    data.educationLevel === edu
                      ? "border-red-500 bg-red-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {edu}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Where should we send your report?
            </h2>
            <p className="text-zinc-400 mb-6">
              Enter your email to receive your personalized AI impact report.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-lg"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && canProceed() && next()}
            />
            <p className="mt-4 text-zinc-500 text-sm">
              We&apos;ll never spam you. Your email is only used to deliver your report.
            </p>
          </div>
        )}

        {step === 8 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Upload your resume for a more personalized report
            </h2>
            <p className="text-zinc-400 mb-6">
              Optional — your resume helps us analyze your specific skills and experience for more accurate predictions.
            </p>

            {!resumeFile ? (
              <label
                className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.02] hover:border-red-500/50 hover:bg-white/[0.04] transition-all cursor-pointer"
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files[0];
                  if (file) handleResumeUpload(file);
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleResumeUpload(file);
                  }}
                />
                <svg className="w-12 h-12 text-zinc-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-zinc-400 text-lg">
                  Drop your resume here or <span className="text-red-400 underline">browse</span>
                </span>
                <span className="text-zinc-500 text-sm mt-2">PDF or TXT (max 5MB)</span>
              </label>
            ) : (
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                {resumeUploading ? (
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-zinc-300">Parsing your resume...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-white font-medium">{resumeFile.name}</div>
                        <div className="text-zinc-500 text-sm">
                          {(resumeFile.size / 1024).toFixed(0)} KB — parsed successfully
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removeResume}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}

            {resumeError && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {resumeError}
              </div>
            )}

            <p className="mt-4 text-zinc-500 text-sm text-center">
              Your resume is processed securely and never stored. You can skip this step.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className={`px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all ${step === 0 ? "invisible" : ""}`}
        >
          Back
        </button>
        <div className="flex gap-3">
          {step === 8 && !resumeFile && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
            >
              Skip
            </button>
          )}
          <button
            onClick={next}
            disabled={!canProceed() || loading}
            className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Analyzing...
              </>
            ) : step === totalSteps - 1 ? (
              "Generate My Report"
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

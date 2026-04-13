"use client";

import { useState } from "react";
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

  const totalSteps = 7;
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
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyData: data, tier: "paid" }),
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
            Question {step + 1} of {totalSteps}
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
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className={`px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all ${step === 0 ? "invisible" : ""}`}
        >
          Back
        </button>
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
  );
}

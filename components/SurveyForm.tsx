"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SurveyData } from "@/lib/types";

const LOADING_FACTS = [
  { text: "40% of all jobs will be impacted by AI in the next decade.", source: "IMF Global Report" },
  { text: "Workers who learn AI tools earn 25-50% more than those who don't.", source: "Harvard Business Review" },
  { text: "Prompt engineering didn't exist 3 years ago. Now it pays $150K+.", source: "Business Insider" },
  { text: "Adaptability is the #1 skill employers look for in the AI era.", source: "World Economic Forum" },
  { text: "Companies using AI see 35% higher productivity on average.", source: "McKinsey & Co" },
  { text: "Empathy, creativity, and complex judgment are most AI-resistant.", source: "Oxford Economics" },
  { text: "ChatGPT reached 100M users faster than any product in history.", source: "Reuters" },
  { text: "AI literacy demand is growing 4x faster than any other skill.", source: "LinkedIn Workforce Report" },
  { text: "65% of children today will work in jobs that don't yet exist.", source: "World Economic Forum" },
  { text: "AI could automate 300 million full-time jobs worldwide.", source: "Goldman Sachs" },
];

const LOADING_STAGES = [
  { text: "Scanning your industry for AI disruption patterns" },
  { text: "Mapping your tasks against current AI capabilities" },
  { text: "Calculating your personalized risk factors" },
  { text: "Researching AI tools relevant to your role" },
  { text: "Building your career defense strategy" },
  { text: "Compiling your personalized report" },
];

function LoadingScreen({ jobTitle }: { jobTitle: string }) {
  const [factIndex, setFactIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [factKey, setFactKey] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const factTimer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % LOADING_FACTS.length);
      setFactKey((prev) => prev + 1);
    }, 5000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) return prev + 1.5;
        if (prev < 60) return prev + 0.8;
        if (prev < 85) return prev + 0.4;
        if (prev < 95) return prev + 0.1;
        return prev;
      });
    }, 200);

    const stageTimer = setInterval(() => {
      setStage((prev) => Math.min(prev + 1, LOADING_STAGES.length - 1));
    }, 4500);

    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearInterval(factTimer);
      clearInterval(progressTimer);
      clearInterval(stageTimer);
      clearInterval(dotsTimer);
    };
  }, []);

  const fact = LOADING_FACTS[factIndex];
  const currentStage = LOADING_STAGES[stage];

  return (
    <div className="w-full max-w-2xl mx-auto text-center py-6">

      {/* Spinner */}
      <div className="relative w-16 h-16 mx-auto mb-8">
        <svg className="animate-spin w-16 h-16 text-gray-300" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Analyzing <span className="text-gray-900 font-bold">{jobTitle}</span>
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Our AI is crunching the data — this is worth the wait
      </p>

      {/* Stage indicator */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-gray-600 font-medium text-sm">
            {currentStage.text}{dots}
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gray-900 transition-all duration-500"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>

        {/* Stage dots */}
        <div className="flex justify-between mt-3 px-1">
          {LOADING_STAGES.map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i <= stage
                    ? "bg-gray-900"
                    : "bg-gray-200"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fact card */}
      <div className="max-w-lg mx-auto mt-8">
        <div
          key={factKey}
          className="p-5 rounded-lg bg-gray-50 border border-gray-200 animate-slide-up-fade"
        >
          <p className="text-gray-700 text-sm leading-relaxed font-medium">
            {fact.text}
          </p>
          <p className="text-gray-400 text-xs mt-2 italic">— {fact.source}</p>
        </div>
      </div>

      {/* Bottom checklist */}
      <div className="mt-8 max-w-sm mx-auto">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Your report will include</div>
        <div className="space-y-2 text-left">
          {[
            { text: "Risk score & timeline", done: progress > 20 },
            { text: "Task-by-task analysis", done: progress > 35 },
            { text: "AI tools for your role", done: progress > 50 },
            { text: "Learning roadmap", done: progress > 65 },
            { text: "Career defense strategy", done: progress > 80 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm">
              {item.done ? (
                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
                </div>
              )}
              <span className={item.done ? "text-gray-700" : "text-gray-400"}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-gray-400 text-xs">
        Generating in-depth analysis — usually takes 15-30 seconds
      </p>
    </div>
  );
}

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
  const [generationError, setGenerationError] = useState(false);
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

      if (!res.ok) {
        throw new Error("Report generation failed");
      }

      const result = await res.json();
      sessionStorage.setItem("surveyData", JSON.stringify(data));
      sessionStorage.setItem("paidReport", JSON.stringify(result.report));

      // Save report to DB for shareable link (non-blocking)
      fetch("/api/save-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report: result.report, surveyData: data }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.id) sessionStorage.setItem("reportId", d.id);
        })
        .catch(() => {});

      router.push("/report-pro");
    } catch {
      setLoading(false);
      setGenerationError(true);
    }
  }

  function next() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  }

  // Error state with retry
  if (generationError) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Our AI engine hit a snag while generating your report. This usually resolves quickly.
        </p>
        <button
          onClick={() => {
            setGenerationError(false);
            handleSubmit();
          }}
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
        <p className="mt-4 text-gray-400 text-sm">
          If the problem persists, try refreshing the page.
        </p>
      </div>
    );
  }

  // Loading state with animated tips
  if (loading) {
    return <LoadingScreen jobTitle={data.jobTitle} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>
            {step < 7 ? `Question ${step + 1} of 7` : step === 7 ? "Almost there!" : "Bonus: Resume Upload"}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="animate-fade-in" key={step}>
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What is your job title?
            </h2>
            <p className="text-gray-500 mb-6">
              Be as specific as possible for the most accurate results.
            </p>
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => update("jobTitle", e.target.value)}
              placeholder="e.g. Marketing Manager, Software Engineer, Accountant"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-lg"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && canProceed() && next()}
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What industry do you work in?
            </h2>
            <p className="text-gray-500 mb-6">
              Select the industry that best matches your role.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => update("industry", ind)}
                  className={`px-4 py-3 rounded-lg border text-left transition-all ${
                    data.industry === ind
                      ? "border-gray-900 bg-gray-50 text-gray-900"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How many years of experience do you have?
            </h2>
            <p className="text-gray-500 mb-6">In your current role or field.</p>
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
                  className={`px-4 py-3 rounded-lg border text-left transition-all ${
                    data.yearsExperience === exp
                      ? "border-gray-900 bg-gray-50 text-gray-900"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What are your primary tasks?
            </h2>
            <p className="text-gray-500 mb-6">
              Select all that apply to your daily work.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TASKS.map((task) => (
                <button
                  key={task}
                  onClick={() => toggleTask(task)}
                  className={`px-4 py-3 rounded-lg border text-left transition-all ${
                    data.primaryTasks.includes(task)
                      ? "border-gray-900 bg-gray-50 text-gray-900"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How much of your job involves repetitive tasks?
            </h2>
            <p className="text-gray-500 mb-6">
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
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-gray-900"
                style={{
                  background: `linear-gradient(to right, #111827 0%, #111827 ${data.repetitivePercent}%, #e5e7eb ${data.repetitivePercent}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between mt-4 text-gray-500">
                <span>0% - Mostly unique tasks</span>
                <span className="text-2xl font-bold text-gray-900">
                  {data.repetitivePercent}%
                </span>
                <span>100% - Highly repetitive</span>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Do you currently use AI tools at work?
            </h2>
            <p className="text-gray-500 mb-6">
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
                  className={`px-6 py-4 rounded-lg border text-left transition-all ${
                    data.usesAI === opt.value
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-gray-900 font-medium">{opt.label}</div>
                  <div className="text-gray-500 text-sm mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What is your education level?
            </h2>
            <p className="text-gray-500 mb-6">
              Your highest level of education completed.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {EDUCATION_LEVELS.map((edu) => (
                <button
                  key={edu}
                  onClick={() => update("educationLevel", edu)}
                  className={`px-4 py-3 rounded-lg border text-left transition-all ${
                    data.educationLevel === edu
                      ? "border-gray-900 bg-gray-50 text-gray-900"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Where should we send your report?
            </h2>
            <p className="text-gray-500 mb-6">
              Enter your email to receive your personalized AI impact report.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-lg"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && canProceed() && next()}
            />
            <p className="mt-4 text-gray-400 text-sm">
              We&apos;ll never spam you. Your email is only used to deliver your report.
            </p>
          </div>
        )}

        {step === 8 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload your resume for a more personalized report
            </h2>
            <p className="text-gray-500 mb-6">
              Optional — your resume helps us analyze your specific skills and experience for more accurate predictions.
            </p>

            {!resumeFile ? (
              <label
                className="flex flex-col items-center justify-center w-full h-48 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-all cursor-pointer"
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
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-gray-600 text-lg">
                  Drop your resume here or <span className="text-gray-900 underline">browse</span>
                </span>
                <span className="text-gray-400 text-sm mt-2">PDF or TXT (max 5MB)</span>
              </label>
            ) : (
              <div className="p-6 rounded-lg border border-gray-200 bg-gray-50">
                {resumeUploading ? (
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-gray-600">Parsing your resume...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-gray-900 font-medium">{resumeFile.name}</div>
                        <div className="text-gray-400 text-sm">
                          {(resumeFile.size / 1024).toFixed(0)} KB — parsed successfully
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removeResume}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
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
              <div className="mt-4 p-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 text-sm">
                {resumeError}
              </div>
            )}

            <p className="mt-4 text-gray-400 text-sm text-center">
              Your resume is processed securely and never stored. You can skip this step.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className={`px-6 py-3 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all ${step === 0 ? "invisible" : ""}`}
        >
          Back
        </button>
        <div className="flex gap-3">
          {step === 8 && !resumeFile && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
            >
              Skip
            </button>
          )}
          <button
            onClick={next}
            disabled={!canProceed() || loading}
            className="px-8 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

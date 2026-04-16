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
  // step -1 = choose method, 0-6 = survey questions, 7 = email, 8 = resume (optional at end)
  const [step, setStep] = useState(-1);
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
  const [resumeAnalyzing, setResumeAnalyzing] = useState(false);
  const [resumeError, setResumeError] = useState<string>("");
  const [autoFilled, setAutoFilled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const upfrontFileInputRef = useRef<HTMLInputElement>(null);

  // LinkedIn state
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const [linkedinError, setLinkedinError] = useState("");

  const totalSteps = 9; // method choice + 7 questions + email
  const progress = step <= -1 ? 0 : ((step + 1) / totalSteps) * 100;

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

  // Parse the resume file to get raw text
  async function parseResumeFile(file: File): Promise<string> {
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
    return result.text;
  }

  // Analyze resume text with AI to extract survey answers
  async function analyzeResumeWithAI(text: string): Promise<SurveyData> {
    const res = await fetch("/api/analyze-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText: text }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || "Failed to analyze resume");
    }
    return result.surveyData;
  }

  // Upfront resume upload: parse + analyze + auto-fill + skip to email
  async function handleUpfrontResumeUpload(file: File) {
    setResumeFile(file);
    setResumeUploading(true);
    setResumeAnalyzing(false);
    setResumeError("");

    try {
      // Step 1: Parse the file
      const text = await parseResumeFile(file);
      setResumeText(text);
      setResumeUploading(false);

      // Step 2: Analyze with AI
      setResumeAnalyzing(true);
      const surveyData = await analyzeResumeWithAI(text);

      // Step 3: Auto-fill all fields
      setData(surveyData);
      setAutoFilled(true);
      setResumeAnalyzing(false);

      // Skip to review step (show pre-filled summary before email)
      setStep(7);
    } catch (err) {
      setResumeError(err instanceof Error ? err.message : "Failed to process resume");
      setResumeFile(null);
      setResumeText("");
      setResumeUploading(false);
      setResumeAnalyzing(false);
    }
  }

  // End-of-survey resume upload (just parses, doesn't analyze)
  async function handleResumeUpload(file: File) {
    setResumeFile(file);
    setResumeUploading(true);
    setResumeError("");

    try {
      const text = await parseResumeFile(file);
      setResumeText(text);
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
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (upfrontFileInputRef.current) upfrontFileInputRef.current.value = "";
  }

  // LinkedIn analysis
  async function handleLinkedInSubmit() {
    if (!linkedinUrl.trim()) return;

    setLinkedinLoading(true);
    setLinkedinError("");

    try {
      const res = await fetch("/api/analyze-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Couldn't analyze that profile. Try uploading your resume instead.");
      }

      setData(result.surveyData);
      setAutoFilled(true);
      setStep(7);
    } catch (err) {
      setLinkedinError(err instanceof Error ? err.message : "Couldn't analyze that profile. Try uploading your resume instead.");
    } finally {
      setLinkedinLoading(false);
    }
  }

  function canProceed(): boolean {
    switch (step) {
      case -1:
        return true;
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
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      case 8:
        return !resumeUploading;
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      // Save to database (non-blocking)
      fetch("/api/save-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          surveyData: data,
          resumeText: resumeText || null,
        }),
      }).catch(() => {});

      // Generate FREE report first (user must pay to unlock full report)
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyData: data,
          tier: "free",
          resumeText: resumeText || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Report generation failed");
      }

      const result = await res.json();
      sessionStorage.setItem("surveyData", JSON.stringify(data));
      sessionStorage.setItem("freeReport", JSON.stringify(result.report));
      if (resumeText) sessionStorage.setItem("resumeText", resumeText);

      router.push("/report");
    } catch {
      setLoading(false);
      setGenerationError(true);
    }
  }

  function next() {
    if (step === 7 && !autoFilled) {
      // After email, go to optional resume upload step
      setStep(8);
    } else if (step === 7 && autoFilled) {
      // If auto-filled from resume, skip the end resume step and submit
      handleSubmit();
    } else if (step < 8) {
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

  // Loading state
  if (loading) {
    return <LoadingScreen jobTitle={data.jobTitle} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar — hide on method choice step */}
      {step >= 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>
              {step < 7
                ? `Question ${step + 1} of 7`
                : step === 7
                ? "Almost there!"
                : "Bonus: Resume Upload"}
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
      )}

      {/* Steps */}
      <div className="animate-fade-in" key={step}>

        {/* Step -1: Choose method */}
        {step === -1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How would you like to get started?
            </h2>
            <p className="text-gray-500 mb-8">
              Connect your LinkedIn, upload your resume, or answer a few quick questions.
            </p>

            <div className="grid gap-4">
              {/* LinkedIn Option */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-900 font-semibold">Paste Your LinkedIn Profile</span>
                    <p className="text-gray-500 text-sm">Fastest way — we&apos;ll analyze your profile instantly</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => { setLinkedinUrl(e.target.value); setLinkedinError(""); }}
                    placeholder="linkedin.com/in/yourname"
                    className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                    onKeyDown={(e) => e.key === "Enter" && linkedinUrl.trim() && handleLinkedInSubmit()}
                  />
                  <button
                    onClick={handleLinkedInSubmit}
                    disabled={!linkedinUrl.trim() || linkedinLoading}
                    className="px-5 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
                  >
                    {linkedinLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      "Analyze"
                    )}
                  </button>
                </div>

                {linkedinError && (
                  <p className="mt-2 text-red-600 text-sm">{linkedinError}</p>
                )}
              </div>

              {/* Upload Resume Option */}
              <label
                className={`relative flex flex-col items-center p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                  resumeUploading || resumeAnalyzing
                    ? "border-gray-300 bg-gray-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files[0];
                  if (file) handleUpfrontResumeUpload(file);
                }}
              >
                <input
                  ref={upfrontFileInputRef}
                  type="file"
                  accept=".pdf,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpfrontResumeUpload(file);
                  }}
                />

                {resumeUploading || resumeAnalyzing ? (
                  <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-gray-600 font-medium">
                      {resumeUploading ? "Parsing your resume..." : "AI is analyzing your experience..."}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {resumeUploading ? "Extracting text from your file" : "Identifying your role, skills, and industry"}
                    </span>
                  </div>
                ) : (
                  <>
                    <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-gray-900 font-semibold text-lg">Upload Your Resume</span>
                    <span className="text-gray-500 text-sm mt-1">
                      Drop your file here or <span className="text-gray-900 underline">browse</span>
                    </span>
                    <span className="text-gray-400 text-xs mt-2">PDF or TXT (max 5MB)</span>
                  </>
                )}
              </label>

              {resumeError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {resumeError}. You can try again or answer manually below.
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-400 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Manual Option */}
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-4 p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-900 font-semibold">Answer 7 Questions</span>
                  <p className="text-gray-500 text-sm mt-0.5">Takes about 2 minutes — no resume needed</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

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
            {/* If auto-filled, show a summary of what was detected */}
            {autoFilled && (
              <div className="mb-8 p-5 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-900 font-semibold">Resume analyzed successfully</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Job Title</span>
                    <p className="text-gray-900 font-medium">{data.jobTitle}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Industry</span>
                    <p className="text-gray-900 font-medium">{data.industry}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Experience</span>
                    <p className="text-gray-900 font-medium">{data.yearsExperience}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Education</span>
                    <p className="text-gray-900 font-medium">{data.educationLevel}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Primary Tasks</span>
                    <p className="text-gray-900 font-medium">{data.primaryTasks.join(", ")}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAutoFilled(false);
                    setStep(0);
                  }}
                  className="mt-3 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Edit answers manually
                </button>
              </div>
            )}

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

      {/* Navigation — hide on method choice step */}
      {step >= 0 && (
        <div className="flex justify-between mt-10">
          <button
            onClick={() => setStep(Math.max(autoFilled ? -1 : 0, step - 1))}
            className={`px-6 py-3 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all ${step === 0 && !autoFilled ? "invisible" : ""}`}
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
              ) : step === 7 && autoFilled ? (
                "Generate My Report"
              ) : step === 8 ? (
                "Generate My Report"
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

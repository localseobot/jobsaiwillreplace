import fs from "fs";
import path from "path";

export interface JobPage {
  slug: string;
  title: string;
  description: string;
  riskLevel: "low" | "moderate" | "high" | "very-high";
  riskScore: number;
  timeline: string;
  summary: string;
  whatAiCanDo: string[];
  whatAiCantDo: string[];
  futureOutlook: string;
  howToAdapt: string[];
  keywords: string[];
}

const JOBS_DIR = path.join(process.cwd(), "content", "jobs");

export function getAllJobs(): JobPage[] {
  if (!fs.existsSync(JOBS_DIR)) return [];
  const files = fs.readdirSync(JOBS_DIR).filter((f) => f.endsWith(".json"));
  const jobs = files.map((file) => {
    const raw = fs.readFileSync(path.join(JOBS_DIR, file), "utf-8");
    return JSON.parse(raw) as JobPage;
  });
  return jobs.sort((a, b) => b.riskScore - a.riskScore);
}

export function getJobBySlug(slug: string): JobPage | null {
  const filePath = path.join(JOBS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as JobPage;
}

export function getAllJobSlugs(): string[] {
  if (!fs.existsSync(JOBS_DIR)) return [];
  return fs
    .readdirSync(JOBS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

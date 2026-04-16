import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance & Banking", "Education",
  "Retail & E-commerce", "Manufacturing", "Legal", "Marketing & Advertising",
  "Media & Entertainment", "Real Estate", "Transportation & Logistics",
  "Construction", "Government", "Hospitality & Food Service", "Agriculture",
  "Energy & Utilities", "Other",
];

const TASKS = [
  "Data Entry", "Writing & Content Creation", "Data Analysis",
  "Customer Service", "Creative Design", "Physical Labor",
  "Management & Leadership", "Software Development", "Sales & Negotiation",
  "Research", "Teaching & Training", "Accounting & Bookkeeping",
  "Administrative Tasks", "Strategic Planning", "Hands-on Skilled Trade",
];

const EDUCATION_LEVELS = [
  "High School", "Some College", "Associate Degree", "Bachelor's Degree",
  "Master's Degree", "Doctoral Degree", "Trade/Vocational", "Self-taught/Bootcamp",
];

const PROMPT = `You are an expert career profile analyst. Given LinkedIn profile information, carefully analyze every detail to extract precise data for a career assessment survey.

ANALYSIS INSTRUCTIONS:

1. JOB TITLE: Extract their exact current position from the headline. LinkedIn headlines follow patterns like "Job Title at Company" or "Job Title | Company". Use the specific title, not a generalized version.

2. INDUSTRY: Determine from the company they work at, their headline, and the domain language in their summary. Match to the closest option.

3. YEARS OF EXPERIENCE: If dates are available, calculate precisely. If only a headline is available, infer from seniority indicators:
   - "Junior", "Associate", entry-level language → "1-3 years"
   - "Senior", "Lead" → "5-10 years"
   - "Director", "VP", "Head of" → "10-20 years"
   - "C-suite", "Founder" with established company → "10-20 years" or "20+ years"

4. PRIMARY TASKS: Infer from their job title and any description available. Map to 3-6 task categories that realistically match their daily work.

5. REPETITIVE PERCENT: Estimate based on role type. Creative/strategic roles = lower. Process/operations roles = higher.

6. AI TOOL USAGE: Look for ANY mention of AI, ML, automation, ChatGPT, Copilot, data science, machine learning, prompt engineering, or AI-adjacent tools in their headline or summary.
   - Explicit AI/ML mentions → "yes"
   - Tech/data roles without explicit AI mention → "sometimes"
   - Non-tech roles with no AI signals → "no"

7. EDUCATION: Extract if mentioned in the profile data. If not available, make a reasonable inference based on their career level and industry.

Return ONLY valid JSON matching this exact structure:
{
  "jobTitle": "<their exact current job title>",
  "industry": "<one of: ${INDUSTRIES.join(", ")}>",
  "yearsExperience": "<one of: Less than 1 year, 1-3 years, 3-5 years, 5-10 years, 10-20 years, 20+ years>",
  "primaryTasks": [<select 3-6 from: ${TASKS.map(t => `"${t}"`).join(", ")}>],
  "repetitivePercent": <number 0-100>,
  "usesAI": "<one of: yes, sometimes, no>",
  "educationLevel": "<one of: ${EDUCATION_LEVELS.join(", ")}>"
}

Every field should be evidence-based where possible. Only infer when data isn't directly available.`;

function normalizeLinkedInUrl(input: string): string | null {
  let url = input.trim();
  if (!url.startsWith("http")) {
    if (url.startsWith("linkedin.com") || url.startsWith("www.linkedin.com")) {
      url = "https://" + url;
    } else if (url.startsWith("in/")) {
      url = "https://www.linkedin.com/" + url;
    } else {
      url = "https://www.linkedin.com/in/" + url;
    }
  }

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("linkedin.com")) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

async function fetchLinkedInProfile(url: string): Promise<string> {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlKey) {
    throw new Error("FIRECRAWL_API_KEY not configured");
  }

  const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${firecrawlKey}`,
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      onlyMainContent: true,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    console.error("Firecrawl error:", res.status, errBody);
    throw new Error("SCRAPE_FAILED");
  }

  const data = await res.json();

  if (!data.success || !data.data) {
    throw new Error("NO_DATA");
  }

  const parts: string[] = [];

  // Use metadata for structured info
  if (data.data.metadata?.title) parts.push(data.data.metadata.title);
  if (data.data.metadata?.description) parts.push(data.data.metadata.description);

  // Use markdown for full profile content
  if (data.data.markdown) parts.push(data.data.markdown);

  if (parts.length === 0) {
    throw new Error("NO_DATA");
  }

  return parts.join("\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const { linkedinUrl } = (await req.json()) as {
      linkedinUrl?: string;
    };

    if (!linkedinUrl) {
      return NextResponse.json(
        { error: "Please provide a LinkedIn URL" },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeLinkedInUrl(linkedinUrl);
    if (!normalizedUrl) {
      return NextResponse.json(
        { error: "Invalid LinkedIn URL. Please enter a valid LinkedIn profile link." },
        { status: 400 }
      );
    }

    let profileText = "";
    try {
      profileText = await fetchLinkedInProfile(normalizedUrl);
    } catch {
      return NextResponse.json(
        { error: "Couldn't read your LinkedIn profile. Try uploading your resume instead." },
        { status: 422 }
      );
    }

    if (profileText.trim().length < 10) {
      return NextResponse.json(
        { error: "Not enough profile information found. Try uploading your resume instead." },
        { status: 422 }
      );
    }

    // Use OpenAI to extract survey data
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: PROMPT },
        { role: "user", content: profileText.slice(0, 5000) },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Failed to analyze profile" },
        { status: 500 }
      );
    }

    const jsonStr = content.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    const surveyData = JSON.parse(jsonStr);

    // Validate fields
    if (!INDUSTRIES.includes(surveyData.industry)) surveyData.industry = "Other";
    surveyData.primaryTasks = surveyData.primaryTasks.filter((t: string) => TASKS.includes(t));
    if (surveyData.primaryTasks.length === 0) surveyData.primaryTasks = ["Administrative Tasks"];
    if (!EDUCATION_LEVELS.includes(surveyData.educationLevel)) surveyData.educationLevel = "Bachelor's Degree";
    if (!["yes", "sometimes", "no"].includes(surveyData.usesAI)) surveyData.usesAI = "sometimes";

    return NextResponse.json({ surveyData });
  } catch (error) {
    console.error("LinkedIn analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze profile. Please try the manual survey instead." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

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

const PROMPT = `You are a resume analyzer. Given the resume text below, extract the information needed to fill out a career assessment survey.

Return ONLY valid JSON matching this exact structure:
{
  "jobTitle": "<their most recent or current job title, be specific>",
  "industry": "<one of: ${INDUSTRIES.join(", ")}>",
  "yearsExperience": "<one of: Less than 1 year, 1-3 years, 3-5 years, 5-10 years, 10-20 years, 20+ years>",
  "primaryTasks": [<select all that apply from this list: ${TASKS.map(t => `"${t}"`).join(", ")}> — pick 3-6 that best match their resume],
  "repetitivePercent": <number 0-100, estimate what percentage of their work is repetitive/routine based on their role>,
  "usesAI": "<one of: yes, sometimes, no — infer from resume content, tools mentioned, etc. Default to 'sometimes' if unclear>",
  "educationLevel": "<one of: ${EDUCATION_LEVELS.join(", ")}>"
}

RULES:
- jobTitle must be their most recent/current position title
- industry must be EXACTLY one of the listed options
- yearsExperience should be estimated from work history dates
- primaryTasks must only contain items from the provided list
- Be as accurate as possible based on the resume content
- If something cannot be determined, make your best educated guess`;

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = (await req.json()) as { resumeText: string };

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short to analyze" },
        { status: 400 }
      );
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: PROMPT },
        { role: "user", content: resumeText.slice(0, 5000) },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Failed to analyze resume" },
        { status: 500 }
      );
    }

    // Parse JSON from response (handle markdown code blocks)
    const jsonStr = content.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    const surveyData = JSON.parse(jsonStr);

    // Validate the fields match our options
    if (!INDUSTRIES.includes(surveyData.industry)) {
      surveyData.industry = "Other";
    }
    surveyData.primaryTasks = surveyData.primaryTasks.filter((t: string) =>
      TASKS.includes(t)
    );
    if (surveyData.primaryTasks.length === 0) {
      surveyData.primaryTasks = ["Administrative Tasks"];
    }
    if (!EDUCATION_LEVELS.includes(surveyData.educationLevel)) {
      surveyData.educationLevel = "Bachelor's Degree";
    }
    if (!["yes", "sometimes", "no"].includes(surveyData.usesAI)) {
      surveyData.usesAI = "sometimes";
    }

    return NextResponse.json({ surveyData });
  } catch (error) {
    console.error("Resume analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume. Please fill out the survey manually." },
      { status: 500 }
    );
  }
}

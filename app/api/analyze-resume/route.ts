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

const PROMPT = `You are an expert resume analyst conducting a thorough review. Read every single line of the resume carefully — job titles, bullet points, tools listed, certifications, education, dates, and skills sections. Extract precise information for a career assessment survey.

ANALYSIS INSTRUCTIONS — read the resume methodically:

1. JOB TITLE: Find their MOST RECENT or CURRENT position. Use the exact title from the resume, not a generalized version. If they list "Senior Data Analyst II at Acme Corp", return "Senior Data Analyst II", not just "Data Analyst".

2. INDUSTRY: Determine from the companies they've worked at, the domain language in their bullet points, and any industry-specific tools or certifications mentioned.

3. YEARS OF EXPERIENCE: Calculate precisely from employment dates. Add up total professional experience across all listed positions. If they started their first role in 2018 and it's now 2025, that's ~7 years = "5-10 years". Be precise — don't guess.

4. PRIMARY TASKS: Read EVERY bullet point across ALL positions. Map their actual daily responsibilities to the task categories. For example:
   - "Built dashboards in Tableau" → Data Analysis
   - "Wrote blog posts and social copy" → Writing & Content Creation
   - "Managed a team of 5 engineers" → Management & Leadership
   - "Developed REST APIs in Python" → Software Development
   - "Handled inbound customer inquiries" → Customer Service
   Pick 3-6 that genuinely match their work.

5. REPETITIVE PERCENT: Assess based on the nature of their role. A warehouse worker doing the same picking process = 80%+. A creative director doing varied campaigns = 20-30%. A bookkeeper doing recurring monthly closes = 60-70%. Think carefully.

6. AI TOOL USAGE: Search the resume carefully for ANY mention of:
   - AI/ML tools: ChatGPT, GPT, Claude, Copilot, Midjourney, DALL-E, Stable Diffusion, Jasper, Copy.ai, Grammarly AI, Notion AI
   - ML/AI frameworks: TensorFlow, PyTorch, scikit-learn, Hugging Face, LangChain, OpenAI API
   - AI-adjacent tools: automated workflows with Zapier/Make, predictive analytics, NLP, computer vision
   - Keywords: "artificial intelligence", "machine learning", "AI-powered", "prompt engineering", "automation"
   - If ANY AI tool is explicitly mentioned → "yes"
   - If they work in tech or data science but don't explicitly mention AI tools → "sometimes"
   - If there's zero indication of AI tool usage and they're in a non-tech field → "no"

7. EDUCATION: Look for the Education section. Find the HIGHEST degree earned:
   - PhD, Doctorate, JD, MD → "Doctoral Degree"
   - MBA, MS, MA, M.Eng → "Master's Degree"
   - BS, BA, B.Eng, BFA → "Bachelor's Degree"
   - AS, AA → "Associate Degree"
   - Coding bootcamp, self-taught portfolio → "Self-taught/Bootcamp"
   - Trade school, vocational certificate → "Trade/Vocational"
   - If education section is missing, infer from career level and field

Return ONLY valid JSON matching this exact structure:
{
  "jobTitle": "<their most recent/current exact job title>",
  "industry": "<one of: ${INDUSTRIES.join(", ")}>",
  "yearsExperience": "<one of: Less than 1 year, 1-3 years, 3-5 years, 5-10 years, 10-20 years, 20+ years>",
  "primaryTasks": [<select 3-6 from: ${TASKS.map(t => `"${t}"`).join(", ")}>],
  "repetitivePercent": <number 0-100>,
  "usesAI": "<one of: yes, sometimes, no>",
  "educationLevel": "<one of: ${EDUCATION_LEVELS.join(", ")}>"
}

CRITICAL: Every field must be evidence-based from the resume text. Do not default or guess when the information is clearly stated in the resume.`;

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
        { role: "user", content: `Here is the full resume text to analyze:\n\n${resumeText.slice(0, 8000)}` },
      ],
      temperature: 0.2,
      max_tokens: 800,
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

import { NextRequest, NextResponse } from "next/server";
import { getOpenAI, FREE_REPORT_PROMPT, PAID_REPORT_PROMPT } from "@/lib/openai";
import { SurveyData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { surveyData, tier, resumeText } = (await req.json()) as {
      surveyData: SurveyData;
      tier: "free" | "paid";
      resumeText?: string;
    };

    const prompt = tier === "paid" ? PAID_REPORT_PROMPT : FREE_REPORT_PROMPT;

    let surveyContext = `
Job Title: ${surveyData.jobTitle}
Industry: ${surveyData.industry}
Years of Experience: ${surveyData.yearsExperience}
Primary Tasks: ${surveyData.primaryTasks.join(", ")}
Repetitive Task Percentage: ${surveyData.repetitivePercent}%
Currently Uses AI: ${surveyData.usesAI}
Education Level: ${surveyData.educationLevel}
`;

    if (resumeText) {
      surveyContext += `\n--- RESUME CONTENT ---\n${resumeText}\n--- END RESUME ---\n\nUse the resume details above to provide more specific and personalized analysis. Reference their actual skills, experience, and job history in your recommendations.`;
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: `Here is the survey data for analysis:\n${surveyContext}`,
        },
      ],
      temperature: 0.7,
      max_tokens: tier === "paid" ? 16000 : 1000,
    });

    const content = completion.choices[0]?.message?.content || "";

    // Parse the JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const report = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, surveyData, resumeText } = await req.json();

    if (!email || !surveyData) {
      return NextResponse.json(
        { error: "Email and survey data are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data, error } = await supabase.from("submissions").insert({
      email,
      job_title: surveyData.jobTitle,
      industry: surveyData.industry,
      years_experience: surveyData.yearsExperience,
      primary_tasks: surveyData.primaryTasks,
      repetitive_percent: surveyData.repetitivePercent,
      uses_ai: surveyData.usesAI,
      education_level: surveyData.educationLevel,
      resume_text: resumeText || null,
    }).select("id").single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Save submission error:", error);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { report, surveyData } = await req.json();

    if (!report || !surveyData) {
      return NextResponse.json(
        { error: "Report and survey data are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("reports")
      .insert({
        job_title: surveyData.jobTitle,
        industry: surveyData.industry,
        risk_score: report.riskScore,
        report_data: report,
        survey_data: surveyData,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save report" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Save report error:", error);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}

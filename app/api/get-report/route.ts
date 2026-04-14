import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Report ID required" }, { status: 400 });
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("reports")
      .select("id, job_title, industry, risk_score, report_data, survey_data, created_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: data.id,
      report: data.report_data,
      surveyData: data.survey_data,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("Get report error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve report" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const jobTitle = req.nextUrl.searchParams.get("jobTitle");
    const industry = req.nextUrl.searchParams.get("industry");
    const currentScore = Number(req.nextUrl.searchParams.get("score") || 0);

    const supabase = getSupabase();

    // Get all scores for percentile calculation
    const { data: allScores } = await supabase
      .from("reports")
      .select("risk_score");

    // Get scores for same industry
    const { data: industryScores } = await supabase
      .from("reports")
      .select("risk_score")
      .eq("industry", industry);

    // Get scores for similar job titles (fuzzy match via ilike)
    const { data: jobScores } = await supabase
      .from("reports")
      .select("risk_score")
      .ilike("job_title", `%${jobTitle}%`);

    const totalAssessments = allScores?.length || 0;

    // Calculate percentile — what % scored higher (more at risk)
    const scoresBelow = allScores?.filter(
      (s) => s.risk_score > currentScore
    ).length || 0;
    const percentile =
      totalAssessments > 0
        ? Math.round((scoresBelow / totalAssessments) * 100)
        : 50;

    // Average scores
    const avgAll =
      totalAssessments > 0
        ? Math.round(
            (allScores?.reduce((sum, s) => sum + s.risk_score, 0) || 0) /
              totalAssessments
          )
        : null;

    const avgIndustry =
      industryScores && industryScores.length > 2
        ? Math.round(
            industryScores.reduce((sum, s) => sum + s.risk_score, 0) /
              industryScores.length
          )
        : null;

    const avgJob =
      jobScores && jobScores.length > 2
        ? Math.round(
            jobScores.reduce((sum, s) => sum + s.risk_score, 0) /
              jobScores.length
          )
        : null;

    return NextResponse.json({
      totalAssessments,
      percentile,
      avgAll,
      avgIndustry: avgIndustry
        ? { score: avgIndustry, count: industryScores!.length }
        : null,
      avgJob: avgJob
        ? { score: avgJob, count: jobScores!.length }
        : null,
    });
  } catch (error) {
    console.error("Benchmarks error:", error);
    return NextResponse.json(
      { error: "Failed to get benchmarks" },
      { status: 500 }
    );
  }
}

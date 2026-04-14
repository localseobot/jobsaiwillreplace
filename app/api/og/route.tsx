import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const score = searchParams.get("score");
  const job = searchParams.get("job");

  const hasScore = score !== null && job !== null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Red accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #dc2626, #f97316)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            padding: "60px",
          }}
        >
          {/* Logo area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: hasScore ? "30px" : "40px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                color: "#71717a",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              JOBS
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#ffffff",
                display: "flex",
              }}
            >
              AI WILL REPLACE
              <span style={{ color: "#ef4444" }}>.</span>
            </div>
          </div>

          {hasScore ? (
            // Personalized OG for shared reports
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  color: "#a1a1aa",
                  marginBottom: "16px",
                  display: "flex",
                }}
              >
                AI Career Impact Score for {job}
              </div>
              <div
                style={{
                  fontSize: "140px",
                  fontWeight: 800,
                  color:
                    Number(score) < 30
                      ? "#4ade80"
                      : Number(score) < 60
                      ? "#facc15"
                      : "#f87171",
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                {score}
              </div>
              <div
                style={{
                  fontSize: "24px",
                  color: "#71717a",
                  marginTop: "8px",
                  display: "flex",
                }}
              >
                out of 100
              </div>
            </div>
          ) : (
            // Default OG
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: 800,
                  color: "#ffffff",
                  textAlign: "center",
                  lineHeight: 1.1,
                  display: "flex",
                }}
              >
                Will AI Replace Your Job?
              </div>
              <div
                style={{
                  fontSize: "22px",
                  color: "#a1a1aa",
                  textAlign: "center",
                  marginTop: "20px",
                  maxWidth: "700px",
                  display: "flex",
                }}
              >
                Free AI-powered career impact assessment with personalized insights
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "30px",
            fontSize: "16px",
            color: "#52525b",
          }}
        >
          jobsaiwillreplace.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

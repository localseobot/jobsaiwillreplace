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
          background: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#1a1a1a",
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
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: hasScore ? "30px" : "40px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#1a1a1a",
                display: "flex",
              }}
            >
              JobsAIWillReplace
              <span style={{ color: "#dc2626" }}>.</span>
            </div>
          </div>

          {hasScore ? (
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
                  color: "#6b7280",
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
                      ? "#16a34a"
                      : Number(score) < 60
                      ? "#ca8a04"
                      : "#dc2626",
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                {score}
              </div>
              <div
                style={{
                  fontSize: "24px",
                  color: "#9ca3af",
                  marginTop: "8px",
                  display: "flex",
                }}
              >
                out of 100
              </div>
            </div>
          ) : (
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
                  color: "#1a1a1a",
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
                  color: "#6b7280",
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
            color: "#9ca3af",
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

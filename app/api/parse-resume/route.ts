import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let text = "";

    if (file.name.toLowerCase().endsWith(".pdf")) {
      // Dynamic import to avoid Turbopack bundling issues
      const pdf = (await import("pdf-parse")).default;
      const data = await pdf(buffer);
      text = data.text;
    } else if (
      file.name.toLowerCase().endsWith(".txt") ||
      file.name.toLowerCase().endsWith(".md")
    ) {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or TXT file." },
        { status: 400 }
      );
    }

    // Trim to reasonable length for the AI prompt
    const trimmedText = text.slice(0, 5000);

    return NextResponse.json({ text: trimmedText });
  } catch (error) {
    console.error("Resume parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}

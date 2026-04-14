import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();

    let text = "";

    if (file.name.toLowerCase().endsWith(".pdf")) {
      // Dynamic import to avoid bundling issues in serverless
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

      // Disable worker — not available in serverless
      pdfjsLib.GlobalWorkerOptions.workerSrc = "";

      const uint8Array = new Uint8Array(bytes);
      const doc = await pdfjsLib.getDocument({
        data: uint8Array,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      }).promise;

      const pages: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items
          .filter((item): item is { str: string } & typeof item => "str" in item)
          .map((item) => (item as unknown as { str: string }).str);
        pages.push(strings.join(" "));
      }
      text = pages.join("\n\n");
    } else if (
      file.name.toLowerCase().endsWith(".txt") ||
      file.name.toLowerCase().endsWith(".md")
    ) {
      const buffer = Buffer.from(bytes);
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or TXT file." },
        { status: 400 }
      );
    }

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from this file. Try a different format." },
        { status: 400 }
      );
    }

    // Trim to reasonable length for the AI prompt
    const trimmedText = text.slice(0, 5000);

    return NextResponse.json({ text: trimmedText });
  } catch (error) {
    console.error("Resume parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse resume. Try uploading a .txt file instead." },
      { status: 500 }
    );
  }
}

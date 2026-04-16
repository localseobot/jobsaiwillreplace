import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "AI Job Replacement FAQ — Common Questions Answered",
  description:
    "Will AI take my job? Get authoritative answers to the most common questions about AI job displacement, at-risk careers, and how to future-proof your career.",
  alternates: {
    canonical: "https://jobsaiwillreplace.com/faq",
  },
  openGraph: {
    title: "AI Job Replacement FAQ — Common Questions Answered",
    description:
      "Will AI take my job? Get authoritative answers about AI job displacement, at-risk careers, and career strategy.",
    url: "https://jobsaiwillreplace.com/faq",
  },
};

const faqData = [
  {
    section: "General",
    questions: [
      {
        q: "Will AI take my job?",
        a: "It depends on your role. AI is most likely to automate repetitive, rules-based tasks rather than entire jobs. According to a 2023 OpenAI and University of Pennsylvania study, roughly 80% of the U.S. workforce will have at least 10% of their tasks affected by large language models. The key factor is how much of your work involves routine pattern recognition versus creative problem-solving, empathy, and physical dexterity.",
      },
      {
        q: "How many jobs will AI replace by 2030?",
        a: "Goldman Sachs estimates that AI could automate the equivalent of 300 million full-time jobs globally by 2030. McKinsey Global Institute projects that 400 to 800 million workers may need to transition to new occupations by 2030 due to automation broadly. However, these figures represent task displacement rather than total job elimination, and new roles are expected to emerge alongside the disruption.",
      },
      {
        q: "Which jobs are most at risk from AI?",
        a: "Roles with the highest automation risk include data entry clerks, telemarketers, bookkeepers, paralegals, and routine customer service agents. The OpenAI/UPenn study found that jobs relying heavily on text generation, classification, and data analysis face the greatest near-term exposure. In general, white-collar roles involving predictable, information-processing tasks are more vulnerable than many people assume.",
      },
      {
        q: "Which jobs are safe from AI?",
        a: "Jobs requiring complex physical manipulation, genuine human empathy, and unpredictable problem-solving remain difficult for AI to replicate. Skilled trades like electricians, plumbers, and HVAC technicians have low automation risk due to the dexterity and situational judgment required. Healthcare roles involving direct patient care, social work, and creative leadership positions are also considered relatively safe for the foreseeable future.",
      },
      {
        q: "How fast is AI replacing jobs?",
        a: "AI adoption is accelerating faster than previous technology waves. ChatGPT reached 100 million users within two months of launch, and enterprise AI adoption doubled between 2023 and 2025 according to McKinsey surveys. While full job displacement takes years due to regulatory, organizational, and infrastructure barriers, the pace of task-level automation is already measurable across industries like finance, legal, and customer service.",
      },
      {
        q: "Is AI job displacement really happening now?",
        a: "Yes, AI-driven workforce reductions are already underway. Companies including IBM, BT Group, and Klarna have publicly announced plans to reduce headcount through AI automation. A 2024 Challenger, Gray & Christmas report noted that AI was cited as a reason for layoffs for the first time. However, the current phase is primarily task augmentation and efficiency gains rather than wholesale job elimination.",
      },
    ],
  },
  {
    section: "Specific Roles",
    questions: [
      {
        q: "Will AI replace accountants?",
        a: "AI is already automating many core accounting tasks including bookkeeping, tax preparation, and financial reconciliation. Tools like automated audit platforms can process transactions in minutes that previously took days. However, accountants who shift toward advisory, strategic planning, and complex compliance work will remain in demand, as those tasks require judgment that AI cannot reliably provide.",
      },
      {
        q: "Will AI replace lawyers?",
        a: "AI is transforming legal work, particularly in document review, contract analysis, and legal research where it can reduce billable hours by 60-70%. The OpenAI/UPenn study ranked legal services among the most exposed professions. That said, courtroom advocacy, client counseling, negotiation, and nuanced legal strategy still require human judgment, meaning lawyers who adapt will thrive while those doing purely procedural work face displacement.",
      },
      {
        q: "Will AI replace software developers?",
        a: "AI coding assistants like GitHub Copilot and Claude can now generate functional code, fix bugs, and automate boilerplate tasks, boosting developer productivity by 30-50% in studies. This means fewer developers may be needed for routine programming work. However, senior-level skills like system architecture, complex debugging, product thinking, and cross-team collaboration remain firmly human and are becoming more valuable, not less.",
      },
      {
        q: "Will AI replace teachers?",
        a: "AI will augment teaching rather than replace teachers. Adaptive learning platforms can personalize instruction and automate grading, freeing teachers to focus on mentorship, social-emotional development, and critical thinking. The deeply human elements of teaching, including inspiring students, managing classroom dynamics, and providing pastoral care, are areas where AI falls short. Education is one of the lower-risk professions for full displacement.",
      },
      {
        q: "Will AI replace doctors?",
        a: "AI is proving highly capable in diagnostics, medical imaging analysis, and treatment protocol recommendations, sometimes outperforming physicians in narrow tasks. Radiology and pathology face the most significant AI integration. However, the practice of medicine involves patient trust, physical examination, ethical decision-making, and empathetic communication that AI cannot replicate. Doctors who leverage AI as a diagnostic tool will likely deliver better outcomes, not be replaced by it.",
      },
      {
        q: "Will AI replace graphic designers?",
        a: "Generative AI tools like Midjourney and DALL-E have dramatically disrupted the graphic design field, particularly for stock imagery, social media assets, and basic layout work. Freelance designers handling routine visual production are seeing significant pricing pressure and reduced demand. However, brand strategy, creative direction, UX design, and complex multi-channel campaigns still require human creativity, cultural awareness, and client collaboration.",
      },
      {
        q: "Will AI replace customer service workers?",
        a: "Customer service is one of the most directly impacted sectors. AI chatbots now handle up to 80% of routine customer inquiries at companies like Klarna, which replaced 700 customer service agents with AI in 2024. Roles involving scripted responses and basic troubleshooting face near-term displacement. However, complex complaint resolution, high-value client relationships, and emotionally sensitive situations still require human agents.",
      },
      {
        q: "Will AI replace writers and journalists?",
        a: "AI can already produce competent news summaries, product descriptions, and formulaic content at scale. Outlets like CNET and BuzzFeed have experimented with AI-generated articles. However, investigative journalism, opinion writing, narrative storytelling, and content requiring original reporting, source relationships, and editorial judgment remain human strengths. Writers who use AI as a research and drafting tool rather than competing against it will be best positioned.",
      },
      {
        q: "Will AI replace truck drivers?",
        a: "Autonomous trucking is progressing but faces significant regulatory, infrastructure, and technical hurdles that will delay full deployment for years. Companies like Waymo and Aurora are testing autonomous long-haul routes, and the long-haul highway segment is closest to automation. However, last-mile delivery, loading and unloading, and driving in complex urban environments remain challenging for autonomous systems. Full replacement is likely a decade or more away.",
      },
    ],
  },
  {
    section: "Career Strategy",
    questions: [
      {
        q: "How can I future-proof my career against AI?",
        a: "Focus on developing skills that complement AI rather than compete with it. This means strengthening capabilities in critical thinking, creative problem-solving, leadership, and emotional intelligence. Learn to use AI tools proficiently in your field, as workers who leverage AI will outperform those who ignore it. Additionally, pursue roles that involve managing ambiguity, building relationships, and making judgment calls in complex situations.",
      },
      {
        q: "What skills should I learn to stay relevant?",
        a: "The most valuable skills in an AI-driven economy include AI literacy and prompt engineering, data analysis and interpretation, strategic communication, and complex project management. Technical workers should focus on AI/ML oversight and system design rather than routine coding. Across all fields, the ability to evaluate AI outputs critically, understand their limitations, and apply human judgment to AI-generated recommendations is becoming essential.",
      },
      {
        q: "Should I be worried about AI taking my job?",
        a: "Rather than worry, take action. Assess which parts of your current role are most automatable and begin developing skills in areas that AI handles poorly. Workers who proactively adapt typically transition successfully, while those who ignore the shift are caught off guard. Taking an honest inventory of your AI exposure risk now gives you time to pivot before displacement occurs.",
      },
      {
        q: "How do I know if my job is at risk from AI?",
        a: "Evaluate your daily tasks against three criteria: how routine and predictable they are, how much they rely on processing information versus physical or interpersonal work, and whether AI tools already exist that can perform them. If more than 50% of your tasks are rule-based and information-heavy, your role faces significant near-term disruption. Our free AI risk assessment survey can give you a personalized breakdown in under two minutes.",
      },
      {
        q: "What new jobs is AI creating?",
        a: "AI is generating entirely new roles including AI prompt engineers, machine learning operations (MLOps) specialists, AI ethics and governance officers, AI trainers and data annotators, and AI integration consultants. The World Economic Forum estimates that AI will create 97 million new jobs by 2025, many in fields that did not exist five years ago. Roles focused on managing, auditing, and improving AI systems are among the fastest-growing job categories globally.",
      },
    ],
  },
];

// Flatten all Q&A pairs for JSON-LD
const allQuestions = faqData.flatMap((section) => section.questions);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQuestions.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          {/* Page Header */}
          <div className="text-center mb-14">
            <div className="accent-line mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-brand-black tracking-tight">
              AI Job Replacement FAQ
            </h1>
            <p className="text-brand-gray mt-4 max-w-2xl mx-auto">
              Authoritative answers to the most common questions about AI
              automation, job displacement, and how to protect your career.
            </p>
          </div>

          {/* FAQ Sections */}
          {faqData.map((section, sectionIdx) => (
            <section key={section.section} className={sectionIdx > 0 ? "mt-14" : ""}>
              <div className="section-divider mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-brand-black">
                  {section.section}
                </h2>
              </div>

              <div className="space-y-6">
                {section.questions.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-lg border border-brand-border bg-white overflow-hidden"
                  >
                    <summary className="cursor-pointer px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-brand-bg transition-colors">
                      <h3 className="font-bold text-brand-black text-base md:text-lg leading-snug">
                        {item.q}
                      </h3>
                      <span className="text-brand-gray text-xl leading-none mt-0.5 shrink-0 group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-brand-gray text-sm md:text-base leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          {/* CTA */}
          <div className="mt-16 text-center border border-brand-border rounded-lg p-8 md:p-12 bg-brand-bg">
            <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
              Find Out Your Personal AI Risk Score
            </h2>
            <p className="text-brand-gray mb-6 max-w-lg mx-auto">
              Answer 7 quick questions about your job and get a personalized AI
              displacement risk assessment. Free, no sign-up required.
            </p>
            <Link href="/survey" className="btn-primary inline-block">
              Take the Free Assessment
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

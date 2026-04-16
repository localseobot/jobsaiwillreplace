import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "AI Job Displacement Blog — Research, Analysis & Career Strategies",
  description:
    "The latest insights on AI job displacement, career survival strategies, and which industries face the biggest disruption. Stay ahead of the AI revolution.",
  alternates: {
    canonical: "https://jobsaiwillreplace.com/blog",
  },
  openGraph: {
    title: "AI Job Displacement Blog — Research, Analysis & Career Strategies",
    description:
      "The latest insights on AI job displacement, career survival strategies, and which industries face the biggest disruption.",
    url: "https://jobsaiwillreplace.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-brand-black tracking-tight">
              The AI Job Report
            </h1>
            <p className="text-brand-gray mt-4 max-w-xl mx-auto">
              Research, analysis, and hard truths about AI&apos;s impact on the
              workforce.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 rounded-lg border border-brand-border bg-white hover:border-brand-red/30 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-widest ${
                      post.category === "fear"
                        ? "text-brand-red"
                        : "text-emerald-600"
                    }`}
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                    }}
                  >
                    {post.category === "fear"
                      ? "AI Disruption"
                      : "Opportunity"}
                  </span>
                  <span className="text-brand-light-gray text-xs">
                    {post.readTime}
                  </span>
                  <span className="text-brand-light-gray text-xs">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-brand-black group-hover:text-brand-red transition-colors">
                  {post.title}
                </h2>
                <p className="text-brand-gray text-sm mt-2 leading-relaxed">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/survey" className="btn-primary">
              Check Your AI Risk Score — Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

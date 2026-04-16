import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://jobsaiwillreplace.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://jobsaiwillreplace.com/blog/${slug}`,
      siteName: "Jobs AI Will Replace",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/api/og"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Jobs AI Will Replace",
      url: "https://jobsaiwillreplace.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Jobs AI Will Replace",
      url: "https://jobsaiwillreplace.com",
      logo: {
        "@type": "ImageObject",
        url: "https://jobsaiwillreplace.com/logo.png",
      },
    },
    mainEntityOfPage: `https://jobsaiwillreplace.com/blog/${slug}`,
    image: "https://jobsaiwillreplace.com/api/og",
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 py-12">
        <article className="max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-brand-gray text-sm hover:text-brand-black transition-colors"
            >
              &larr; Back to Blog
            </Link>
          </div>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
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
                {post.category === "fear" ? "AI Disruption" : "Opportunity"}
              </span>
              <span className="text-brand-light-gray text-xs">
                {post.readTime}
              </span>
              <span className="text-brand-light-gray text-xs">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-black tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-brand-gray text-lg mt-4 leading-relaxed">
              {post.description}
            </p>
            <div className="section-divider mt-8" />
          </header>

          <div
            className="prose prose-lg max-w-none
              prose-headings:text-brand-black prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-brand-gray prose-p:leading-relaxed prose-p:mb-5
              prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline
              prose-strong:text-brand-black
              prose-ul:text-brand-gray prose-ol:text-brand-gray
              prose-li:mb-2
              prose-blockquote:border-brand-red prose-blockquote:text-brand-gray prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="section-divider mt-12 mb-10" />

          <div className="bg-brand-bg p-8 rounded-lg border border-brand-border text-center">
            <h3 className="text-xl font-bold text-brand-black mb-3">
              How safe is your job from AI?
            </h3>
            <p className="text-brand-gray mb-6">
              Get your free AI risk score and find out exactly where you stand.
            </p>
            <Link href="/survey" className="btn-primary">
              Take the Free Assessment
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

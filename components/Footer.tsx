import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border py-10 mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h3 className="text-sm font-semibold text-brand-black mb-1">
            Stay ahead of the AI shift
          </h3>
          <p className="text-xs text-brand-gray mb-4">
            Get weekly insights on AI job displacement — no spam.
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-brand-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-light-gray text-xs">
            &copy; {new Date().getFullYear()} jobsaiwillreplace.com
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/survey" className="text-xs text-brand-gray hover:text-brand-black transition-colors">
              Assessment
            </Link>
            <Link href="/blog" className="text-xs text-brand-gray hover:text-brand-black transition-colors">
              Blog
            </Link>
            <Link href="/faq" className="text-xs text-brand-gray hover:text-brand-black transition-colors">
              FAQ
            </Link>
            <a href="mailto:hello@jobsaiwillreplace.com" className="text-xs text-brand-gray hover:text-brand-black transition-colors">
              Contact
            </a>
          </nav>
        </div>
        <p className="mt-4 text-center text-brand-light-gray text-[11px]">
          Predictions are estimates based on current AI capabilities and trends. This is not career advice.
        </p>
      </div>
    </footer>
  );
}

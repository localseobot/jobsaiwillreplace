import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border py-10 mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-light-gray text-xs">
            &copy; {new Date().getFullYear()} jobsaiwillreplace.com
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/survey" className="text-xs text-brand-gray hover:text-brand-black transition-colors">
              Assessment
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

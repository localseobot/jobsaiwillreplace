"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-brand-border bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/blog")
                ? "text-brand-black nav-active"
                : "text-brand-gray hover:text-brand-black"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/survey"
            className={`text-sm font-medium transition-colors ${
              pathname === "/survey"
                ? "text-brand-black nav-active"
                : "text-brand-gray hover:text-brand-black"
            }`}
          >
            Take the Assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}

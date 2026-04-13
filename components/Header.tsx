"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo variant="dark" size="default" />
        </Link>
        <Link
          href="/survey"
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Take the Quiz
        </Link>
      </div>
    </header>
  );
}

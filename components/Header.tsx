"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <Link
          href="/survey"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Take the Assessment
        </Link>
      </div>
    </header>
  );
}

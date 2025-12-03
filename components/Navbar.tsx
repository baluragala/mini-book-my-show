"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-rose-500/30 transition-shadow">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </div>
            <span className="font-display text-xl font-bold bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
              Mini BookMyShow
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-rose-400 ${
                pathname === "/" ? "text-rose-400" : "text-zinc-400"
              }`}
            >
              Movies
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-zinc-400 hover:text-rose-400 transition-colors"
            >
              Coming Soon
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}


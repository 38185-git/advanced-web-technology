import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Course Catalog",
  description: "A course catalog built with Next.js App Router",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-4">
            <Link href="/" className="rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-blue-700">Home</Link>
            <Link href="/courses" className="rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-blue-700">Courses</Link>
            <Link href="/about" className="rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-blue-700">About</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}

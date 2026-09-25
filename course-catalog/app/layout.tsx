import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Index — Course Catalog",
  description: "A course catalog built with Next.js App Router",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen">
        <header className="border-b border-stone-300 dark:border-stone-700">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5">
            <Link href="/" className="text-lg font-black tracking-tight">INDEX<span className="text-index">.</span></Link>
            <div className="flex gap-1 text-sm font-medium sm:gap-2">
              <Link href="/" className="px-3 py-2 hover:bg-index">Home</Link>
              <Link href="/courses" className="px-3 py-2 hover:bg-index">Courses</Link>
              <Link href="/about" className="px-3 py-2 hover:bg-index">About</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-5 py-16 sm:py-24">{children}</main>
      </body>
    </html>
  );
}

import Link from "next/link";

export default function HomePage() {
  return (
    <section className="max-w-2xl">
      <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-stone-500">Advanced Web Technologies · 2026</p>
      <h1 className="text-6xl font-black leading-none tracking-[-0.06em] sm:text-8xl">Course<br />Index<span className="text-index">.</span></h1>
      <p className="mt-8 max-w-md text-lg leading-7 text-stone-600">A concise catalog of the courses shaping our semester.</p>
      <Link href="/courses" className="mt-10 inline-block border-b-2 border-stone-900 pb-1 font-bold hover:border-index">Browse all courses →</Link>
    </section>
  );
}

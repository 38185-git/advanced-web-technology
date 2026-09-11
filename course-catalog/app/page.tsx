import Link from "next/link";

export default function HomePage() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Advanced Web Technologies</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Course Catalog</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Welcome to the catalog. Browse the courses and open any course to learn more about it.</p>
      <Link href="/courses" className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">Explore courses</Link>
    </section>
  );
}

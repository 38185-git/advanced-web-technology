import Link from "next/link";

export default function CourseNotFound() {
  return (
    <section className="max-w-2xl border-t border-stone-900 pt-6">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500">404</p>
      <h1 className="mt-5 text-4xl font-black">Course not found.</h1>
      <p className="mt-4 text-stone-600">The requested course does not exist in the catalog.</p>
      <Link href="/courses" className="mt-8 inline-block border-b-2 border-stone-900 pb-1 font-bold hover:border-index">← Back to courses</Link>
    </section>
  );
}

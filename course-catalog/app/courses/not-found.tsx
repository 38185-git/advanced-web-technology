import Link from "next/link";

export default function CourseNotFound() {
  return (
    <section className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
      <h1 className="text-3xl font-bold">Course not found</h1>
      <p className="mt-3 text-slate-600">The requested course does not exist in the catalog.</p>
      <Link href="/courses" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Back to courses</Link>
    </section>
  );
}

import LikeButton from "@/components/LikeButton";
import { getCourse, getCourses } from "@/lib/courses";
import { notFound } from "next/navigation";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ id: course.id }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Course details</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{course.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{course.description}</p>
      <div className="mt-8 flex items-center gap-5">
        <span className="rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-700">{course.credits} credits</span>
        <LikeButton initialLikes={course.likes} />
      </div>
    </article>
  );
}

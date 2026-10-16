import LikeButton from "@/components/LikeButton";
import EnrollForm from "@/components/EnrollForm";
import { getCourse } from "@/lib/courses";
import { notFound } from "next/navigation";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <article className="max-w-2xl border-t border-stone-900 pt-6">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500">Course details · {course.credits} credits</p>
      <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">{course.title}</h1>
      <p className="mt-8 text-lg leading-8 text-stone-600">{course.description}</p>
      <div className="mt-10">
        <LikeButton courseId={course.id} initialLikes={course.likes} />
      </div>
      <EnrollForm courseId={course.id} />
    </article>
  );
}

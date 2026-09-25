import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <section>
      <div className="flex items-end justify-between border-b border-stone-900 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500">Semester catalog</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Courses</h1>
        </div>
        <span className="text-sm text-stone-500">{courses.length} total</span>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} id={course.id} title={course.title} description={course.description} credits={course.credits} likes={course.likes} />
        ))}
      </div>
    </section>
  );
}

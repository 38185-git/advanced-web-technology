import Link from "next/link";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  credits: number;
  likes: number;
};

export default function CourseCard({ id, title, description, credits, likes }: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="group block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md hover:ring-blue-300">
      <h2 className="text-xl font-bold group-hover:text-blue-700">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
      <div className="mt-5 flex items-center justify-between text-sm font-medium text-slate-500">
        <span>{credits} credits</span>
        <span aria-label={`${likes} likes`}>❤ {likes}</span>
      </div>
    </Link>
  );
}

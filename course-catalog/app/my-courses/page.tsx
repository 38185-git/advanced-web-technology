import { gql } from "@/lib/graphql";
import { verifySession } from "@/lib/dal";
import { readToken } from "@/lib/session";

const MY_COURSES = `
  query MyCourses($id: ID!) {
    student(id: $id) {
      name
      enrollments { id course { title credits level } }
    }
  }
`;

type MyCourses = {
  student: {
    name: string;
    enrollments: { id: string; course: { title: string; credits: number; level: string } }[];
  } | null;
};

export default async function MyCoursesPage() {
  const user = await verifySession();
  if (user.studentId === null) {
    return <main className="mx-auto max-w-2xl p-6"><h1 className="text-2xl font-bold">This account has no student profile.</h1></main>;
  }
  const token = await readToken();
  const { student } = await gql<MyCourses>(MY_COURSES, { id: String(user.studentId) }, token);
  if (student === null) throw new Error("Student not found");

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">My courses: {student.name}</h1>
      <ul className="mt-4 list-disc pl-6">
        {student.enrollments.map(({ id, course }) => (
          <li key={id}>
            {course.title} — {course.credits} credits, level: {course.level}
          </li>
        ))}
      </ul>
    </main>
  );
}

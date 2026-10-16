"use client";

import useSWR from "swr";
import { useState } from "react";
import type { Course } from "@/lib/courses";

const fetcher = async (url: string): Promise<Course[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load courses (${response.status})`);
  return response.json();
};

export default function ElectiveFilter() {
  const [electivesOnly, setElectivesOnly] = useState(false);
  const endpoint = `/api/courses${electivesOnly ? "?is_elective=true" : ""}`;
  const { data, error, isLoading } = useSWR<Course[]>(endpoint, fetcher);

  if (isLoading) return <p>Loading courses…</p>;
  if (error) return <p role="alert">Failed to load courses</p>;

  return (
    <div>
      <label className="flex items-center gap-3 font-bold">
        <input type="checkbox" checked={electivesOnly} onChange={(event) => setElectivesOnly(event.target.checked)} />
        Electives only
      </label>
      <ul className="mt-8 space-y-4">
        {data?.map((course) => <li key={course.id} className="border-b pb-4"><b>{course.title}</b><span className="ml-3 text-sm text-stone-500">{course.isElective ? "elective" : "required"}</span></li>)}
      </ul>
    </div>
  );
}

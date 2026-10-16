"use client";

import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EnrollForm({ courseId }: { courseId: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, studentName: name }),
      });
      const body = await response.json();
      if (!response.ok) {
        const detail = Array.isArray(body.detail) ? body.detail[0]?.msg : body.detail;
        throw new Error(detail || "The server rejected the data");
      }
      setMessage(`Enrollment number: ${body.id}`);
      setName("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The server rejected the data");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 max-w-md space-y-4 border-t pt-6">
      <h2 className="text-xl font-black">Enroll in this course</h2>
      <label className="block text-sm font-bold" htmlFor="student-name">Student name</label>
      <input id="student-name" value={name} onChange={(event) => setName(event.target.value)} className="w-full border px-3 py-2" required />
      <button disabled={pending} className="border px-4 py-2 font-bold" type="submit">Enroll</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

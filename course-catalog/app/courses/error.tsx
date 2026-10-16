"use client";

export default function CoursesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section role="alert"><h1 className="text-4xl font-black">Unable to load courses.</h1><button className="mt-8 border px-4 py-2 font-bold" onClick={() => reset()}>Try again</button></section>;
}

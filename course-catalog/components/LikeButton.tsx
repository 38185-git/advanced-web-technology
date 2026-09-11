"use client";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <button type="button" onClick={() => setLikes((currentLikes) => currentLikes + 1)} className="rounded-xl bg-rose-50 px-4 py-2 font-semibold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-100" aria-label={`Like this course. Current likes: ${likes}`}>
      ❤ {likes}
    </button>
  );
}

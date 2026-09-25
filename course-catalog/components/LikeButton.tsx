"use client";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <button type="button" onClick={() => setLikes((currentLikes) => currentLikes + 1)} className="border border-stone-900 px-4 py-2 font-bold hover:bg-amber-300" aria-label={`Like this course. Current likes: ${likes}`}>
      ♥ Like · {likes}
    </button>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <Button type="button" variant="index" onClick={() => setLikes((currentLikes) => currentLikes + 1)} className="rounded-none font-bold" aria-label={`Like this course. Current likes: ${likes}`}>
      ♥ Like · {likes}
    </Button>
  );
}

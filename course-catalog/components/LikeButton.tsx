"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type LikeButtonProps = {
  courseId: string;
  initialLikes: number;
};

export default function LikeButton({ courseId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [pending, setPending] = useState(false);

  async function like() {
    if (!API_URL || pending) return;
    setPending(true);
    try {
      const response = await fetch(`${API_URL}/courses/${courseId}/like`, { method: "POST" });
      if (!response.ok) throw new Error("Like request failed");
      const course = await response.json();
      setLikes(course.likes);
    } finally {
      setPending(false);
    }
  }

  return (
    <Button type="button" variant="index" onClick={like} disabled={pending} className="rounded-none font-bold" aria-label={`Like this course. Current likes: ${likes}`}>
      ♥ Like · {likes}
    </Button>
  );
}

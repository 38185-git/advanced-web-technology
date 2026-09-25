import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  credits: number;
  likes: number;
};

export default function CourseCard({ id, title, description, credits, likes }: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="group block h-full">
      <Card className="h-full rounded-none bg-transparent py-0 shadow-none transition hover:border-blue-300 hover:shadow-md dark:border-stone-700 dark:hover:border-index">
        <CardHeader className="border-b py-5">
          <CardTitle className="text-lg leading-snug group-hover:underline">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-5 pb-5">
          <p className="flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
          <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
            <span>{credits} credits</span>
            <Button variant="ghost" size="sm" aria-label={`${likes} likes`}>♥ {likes}</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

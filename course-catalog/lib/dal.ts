import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { API_URL } from "@/lib/api";
import { readToken } from "@/lib/session";

export type CurrentUser = {
  id: number;
  email: string;
  role: string;
  studentId: number | null;
};

export const verifySession = cache(async (): Promise<CurrentUser> => {
  const token = await readToken();
  if (!token) redirect("/login");
  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (response.status === 401) redirect("/login");
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
});

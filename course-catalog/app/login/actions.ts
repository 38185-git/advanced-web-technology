"use server";

import { redirect } from "next/navigation";
import { API_URL } from "@/lib/api";
import { saveToken } from "@/lib/session";

export type LoginState = { error?: string; email?: string } | undefined;

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Invalid e-mail or password", email };
  let response: Response;
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: new URLSearchParams({ username: email, password }),
      cache: "no-store",
    });
  } catch {
    return { error: "Login is temporarily unavailable. Please try again.", email };
  }
  if (response.status === 401 || response.status === 422) {
    return { error: "Invalid e-mail or password", email };
  }
  if (!response.ok) {
    return { error: "Login is temporarily unavailable. Please try again.", email };
  }
  const { access_token } = await response.json();
  await saveToken(access_token, 15 * 60);
  redirect("/account");
}

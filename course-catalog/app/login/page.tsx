"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <section className="mx-auto max-w-sm">
      <h1 className="text-3xl font-bold">Log in</h1>
      <form action={action} className="mt-6 flex flex-col gap-3">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="username"
          required defaultValue={state?.email} className="rounded border p-3" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password"
          autoComplete="current-password" required className="rounded border p-3" />
        {state?.error && <p role="alert" className="text-red-600 dark:text-red-400">{state.error}</p>}
        <button disabled={pending} className="mt-2 rounded bg-blue-700 p-3 text-white disabled:opacity-60">
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>
    </section>
  );
}

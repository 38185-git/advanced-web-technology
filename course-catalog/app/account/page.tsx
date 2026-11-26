import { verifySession } from "@/lib/dal";
import { logout } from "./actions";

export default async function AccountPage() {
  const user = await verifySession();
  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Account</h1>
      <p className="mt-3">{user.email} · role: {user.role}</p>
      <form action={logout} className="mt-6">
        <button className="rounded border px-4 py-2">Log out</button>
      </form>
    </section>
  );
}

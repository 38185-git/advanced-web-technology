export const API_URL = process.env.API_URL ?? "http://localhost:8000";

export async function getJson<T>(path: string, headers?: HeadersInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { headers, cache: "no-store" });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

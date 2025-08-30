function currentApiBase(): string {
  const s = localStorage.getItem("apiBase");
  const e = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  return s || e || "http://localhost:8000";
}
function makeUrl(p: string) {
  return `${currentApiBase()}${p}`;
}
async function apiFetch<T = any>(p: string, init?: RequestInit): Promise<T> {
  const u = makeUrl(p);
  const r = await fetch(u, { credentials: "include", ...(init || {}) });
  const t = await r.text();
  let d: any;
  try {
    d = JSON.parse(t);
  } catch {}
  if (!r.ok) {
    const m = d?.detail ?? d?.message ?? r.statusText;
    throw new Error(typeof m === "string" ? m : String(m));
  }
  return (d ?? t) as T;
}
import type { StateOut, MoveIn } from "../types";
export async function getState(): Promise<StateOut> {
  return apiFetch<StateOut>("/state");
}
export async function postMove(body: MoveIn): Promise<StateOut> {
  return apiFetch<StateOut>("/move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

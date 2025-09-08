const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function readSid(): string | null {
  const v = localStorage.getItem("pb_sid");
  return v && UUID_RE.test(v) ? v : null;
}
function writeSid(v: string | null) {
  if (v && UUID_RE.test(v)) localStorage.setItem("pb_sid", v);
}

function currentApiBase(): string {
  const s = localStorage.getItem("apiBase");
  const e = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  return e || s || "http://localhost:8000";
}
function makeUrl(p: string) {
  return `${currentApiBase()}${p}`;
}
export async function apiFetch<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = makeUrl(path);
  const headers = new Headers(init?.headers || {});
  const sid = readSid();
  if (sid) headers.set("X-Session-ID", sid);

  const res = await fetch(url, {
    credentials: "include", // cookie backup if available
    ...init,
    headers,
  });

  // server echoes the chosen session id; persist it locally
  const echoed = res.headers.get("X-Session-ID");
  if (echoed) writeSid(echoed);

  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {}
  if (!res.ok) {
    const msg = data?.detail ?? data?.message ?? res.statusText;
    throw new Error(typeof msg === "string" ? msg : String(msg));
  }
  return (data ?? text) as T;
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

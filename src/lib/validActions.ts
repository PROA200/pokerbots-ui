import type { RaiseBounds, ValidActionsTuple } from "../types";
export function parseValidActions(v: ValidActionsTuple) {
  if (!v) return { actions: [], bounds: null as RaiseBounds | null };
  const [arr, b] = v as any;
  const actions = Array.isArray(arr) ? arr.map(String) : [];
  const ok =
    Array.isArray(b) &&
    b.length === 2 &&
    b.every((x: any) => typeof x === "number")
      ? (b as [number, number])
      : null;
  return { actions, bounds: ok };
}

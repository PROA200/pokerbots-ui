export type RaiseBounds = [number, number];
export type ValidActionsTuple = [string[], RaiseBounds] | null;

export type StateOut = {
  state: any;
  valid_actions: ValidActionsTuple;
  status: string;            // 'active' | 'terminated'
  net_winnings: number;
  games_played: number;
};

export type MoveIn = { action: string; amount?: number };

export function parseValidActions(v: ValidActionsTuple): {
  actions: string[];
  bounds: RaiseBounds | null;
} {
  if (!v) return { actions: [], bounds: null };
  const [arr, bounds] = v as any;
  const actions = Array.isArray(arr) ? arr.map(String) : [];
  const okBounds = Array.isArray(bounds) && bounds.length === 2 && bounds.every((x) => typeof x === 'number')
    ? (bounds as [number, number])
    : null;
  return { actions, bounds: okBounds };
}

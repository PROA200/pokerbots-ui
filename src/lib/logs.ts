export type LogLike = {
  [k: string]: any;
  log_type?: string;
  type?: string;
  visible_to?: number | null;
};
function isLogLine(v: any): v is LogLike {
  return !!(
    v &&
    typeof v === "object" &&
    (typeof v.log_type === "string" || v.type === "LogLine")
  );
}
export function extractVisibleLogs(root: any, botIdx: number) {
  const out: LogLike[] = [];
  const seen = new Set<any>();
  function walk(n: any) {
    if (n == null || typeof n !== "object" || seen.has(n)) return;
    seen.add(n);
    if (isLogLine(n)) {
      const vis = (n as any).visible_to;
      if (vis == null || vis === 1 - botIdx ) out.push(n);
    }
    if (Array.isArray(n)) {
      for (const it of n) walk(it);
      return;
    }
    const keys = Object.keys(n);
    const ord = [
      ...keys.filter((k) => k === "previous_state"),
      ...keys.filter((k) => k === "new_logs"),
      ...keys.filter((k) => k !== "previous_state" && k !== "new_logs"),
    ];
    for (const k of ord) walk((n as any)[k]);
  }
  walk(root);
  return out;
}
export function deriveFromLogs(state: any) {
  const botIdx = state?.bot_idx ?? 0;
  const logs = extractVisibleLogs(state, botIdx);
  let lastStreet: any = state?.street ?? undefined;
  const bounties: {
    me?: string;
    opp?: string;
    meHit?: boolean;
    oppHit?: boolean;
  } = {};
  let gameNet: number | undefined = undefined;
  for (const l of logs) {
    const t = (l as any).log_type || (l as any).type;
    if (t === "board" && l.street && l.street !== lastStreet) {
      lastStreet = l.street;
    }
    if (t === "bounty" && typeof l.player === "number") {
      const card = Array.isArray(l.cards)
        ? l.cards.join(" ")
        : String(l.cards ?? "");
      if (l.player === 1 - botIdx) bounties.me = card;
      else bounties.opp = card;
    }
    if (t === "bounty_hit" && typeof l.player === "number") {
      if (l.player === 1 - botIdx) bounties.meHit = true;
      else bounties.oppHit = true;
    }
    if (t === "reward" && typeof l.player === "number" && l.player === 1 - botIdx) {
      gameNet = Number(l.amount ?? 0) || 0;
    }
  }
  return { bounties, gameNet };
}

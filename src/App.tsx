import React from "react";
import { theme } from "./theme";
import { useInter } from "./lib/useInter";
import { parseValidActions } from "./lib/validActions";
import type { StateOut } from "./types";
import { getState, postMove } from "./api/client";
import { TopBar } from "./components/TopBar";
import { TableArea } from "./components/Table/TableArea";
import { ActionStrip } from "./components/Actions/ActionStrip";
import { TerminalStats } from "./components/TerminalStats";
import { LogsPanel } from "./components/Logs/LogsPanel";
import { Panel } from "./components/ui";

export default function App() {
  useInter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [stateOut, setStateOut] = React.useState<StateOut | null>(null);
  const { actions, bounds } = parseValidActions(
    stateOut?.valid_actions ?? null,
  );
  const [amount, setAmount] = React.useState("");

  async function wrap(fn: () => Promise<StateOut>) {
    setLoading(true);
    setError(null);
    try {
      const data = await fn();
      setStateOut(data);
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    wrap(getState);
  }, []);


  const net = stateOut?.net_winnings ?? 0;
  const games = stateOut?.games_played ?? 0;

  const safeState: any = stateOut?.state ?? {"pips": [1, 2], "type": "RoundState", "hands": [["5d", "Th"], ["6s", "7s"]], "board5": ["8s", "3h", "Qh", "Jh", "4h"], "button": 0, "stacks": [399, 398], "street": 0, "bot_idx": 0, "version": 1, "bounties": ["6", "8"], "new_logs": [{"type": "LogLine", "cards": null, "action": null, "amount": 1, "player": 0, "street": null, "version": 1, "log_type": "blind", "visible_to": null}, {"type": "LogLine", "cards": null, "action": null, "amount": 2, "player": 1, "street": null, "version": 1, "log_type": "blind", "visible_to": null}, {"type": "LogLine", "cards": ["5d", "Th"], "action": null, "amount": null, "player": 0, "street": null, "version": 1, "log_type": "deal", "visible_to": 0}, {"type": "LogLine", "cards": ["6s", "9h"], "action": null, "amount": null, "player": 1, "street": null, "version": 1, "log_type": "deal", "visible_to": 1}, {"type": "LogLine", "cards": "6", "action": null, "amount": null, "player": 0, "street": null, "version": 1, "log_type": "bounty", "visible_to": 0}, {"type": "LogLine", "cards": "8", "action": null, "amount": null, "player": 1, "street": null, "version": 1, "log_type": "bounty", "visible_to": 1}, {"type": "LogLine", "cards": null, "action": "folds", "amount": null, "player": 0, "street": null, "version": 1, "log_type": "action", "visible_to": null}, {"type": "LogLine", "cards": "6", "action": null, "amount": null, "player": 0, "street": null, "version": 1, "log_type": "bounty", "visible_to": null}, {"type": "LogLine", "cards": "8", "action": null, "amount": null, "player": 1, "street": null, "version": 1, "log_type": "bounty", "visible_to": null}, {"type": "LogLine", "cards": null, "action": null, "amount": null, "player": null, "street": null, "version": 1, "log_type": "loading"}], "previous_state": null};
  const isTerminal = safeState?.type === "TerminalState";
  console.log(safeState);

  return (
    <div
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        color: theme.ink,
        background: theme.bg,
        minHeight: "100dvh",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        <TopBar />

        {error && (
          <Panel style={{ marginTop: 12, borderColor: "#ef4444", background: "#fef2f2" }}>
            <div style={{ color: "#b91c1c", fontSize: 14 }}>{error}</div>
          </Panel>
        )}

        <div className="grid2" style={{ display: "grid", gap: 16, marginTop: 16, gridTemplateColumns: "1.4fr 1fr" }}>
          <div style={{ display: "grid", gap: 16 }}>
            <TableArea state_={safeState} net={net} games={games} isTerminal={!!isTerminal} />

            <ActionStrip
              actions={actions}
              bounds={bounds}
              disabled={loading}
              amount={amount}
              setAmount={setAmount}
              onSubmit={(action: any, amt: any) =>
                wrap(() => postMove({ action, ...(amt !== undefined ? { amount: amt } : {}) }))
              }
              onNext={() => wrap(getState)}
            />

            <div style={{ color: theme.sub, fontSize: 13, marginTop: 12 }}>
              Cards from{" "}
              <a
                href="https://commons.wikimedia.org/wiki/Category:SVG_English_pattern_playing_cards"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikimedia Commons
              </a>, engine adapted from{" "}
              <a href="https://github.com/mitpokerbots/engine-2025" target="_blank" rel="noopener noreferrer">
                official
              </a>, bot by Elliott Liu and Jordan Lefkowitz.

            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Logs can handle empty state just fine */}
            <LogsPanel state={safeState} />

            {/* ✅ render only when terminal AND we actually have state */}
            {isTerminal && stateOut?.state && <TerminalStats state={stateOut.state} />}
          </div>
        </div>

        <style>{`@media (max-width: 900px){ .grid2{ grid-template-columns:1fr !important; } }`}</style>
      </div>
    </div>
  );
}

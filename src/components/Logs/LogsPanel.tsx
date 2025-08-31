import React from "react";
import { Panel } from "../ui";
import { extractVisibleLogs } from "../../lib/logs";
import {type LogLike} from "../../lib/logs";
import { theme } from "../../theme";

const cardToAscii = (card: string) => {
  const value = card.slice(0, -1);
  const suit = card.slice(-1);
  let asciiSuit = "";
  let color = "";
  switch (suit) {
    case "c":
      asciiSuit = "♣";
      color = "black";
      break;
    case "d":
      asciiSuit = "♦";
      color = "red";
      break;
    case "h":
      asciiSuit = "♥";
      color = "red";
      break;
    case "s":
      asciiSuit = "♠";
      color = "black";
      break;
    default:
      asciiSuit = suit;
      color = "black";
  }
  return `<span style="color: ${color}">${value}${asciiSuit}</span>`;
};

function fmtLog(l: LogLike): string {
  const t = l.log_type || l.type;
  switch (t) {
    case "blind":
      return `Player ${l.player} posts blind ${l.amount}`;
    case "deal":
      return `Player ${l.player} dealt ${Array.isArray(l.cards) ? l.cards.map(cardToAscii).join(" ") : l.cards}`;
    case "shows_deal":
      return `Player ${l.player} shows ${Array.isArray(l.cards) ? l.cards.map(cardToAscii).join(" ") : l.cards}`;
    case "action":
      return `Player ${l.player} ${l.action}${l.amount != null ? " " + l.amount : ""}`;
    case "board":
      return `${l.street || "Board"}: ${(l.cards || []).map(cardToAscii).join(" ")}`;
    case "stack":
      return `Stack: Player ${l.player}: ${l.amount}`;
    case "reward":
      return `Player ${l.player} change: ${l.amount}`;
    case "bounty":
      return `Player ${l.player} assigned bounty ${l.cards}`;
    case "bounty_hit":
      return `Player ${l.player} hits bounty!`;
    case "loading":
      return "Loading...";
    default:
      return JSON.stringify(l);
  }
}
export function LogsPanel({ state }: { state: any }) {
  const logs = React.useMemo(() => extractVisibleLogs(state, state?.bot_idx), [state]);
  return (
    <Panel style={{ maxHeight: 460, overflow: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Logs</h3>
        <span style={{ color: theme.sub, fontSize: 13 }}>{logs.length} lines</span>
      </div>
      {!logs?.length ? (
        <div style={{ color: theme.sub, fontSize: 14 }}>No logs yet.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
          {logs.map((l, i) => (
            <li
              key={i}
              style={{ fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif", fontSize: 14 }}
              dangerouslySetInnerHTML={{ __html: fmtLog(l) }}
            />
          ))}
        </ul>
      )}
    </Panel>
  );
}

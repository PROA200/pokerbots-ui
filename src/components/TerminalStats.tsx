import { Panel } from "./ui";
import { deriveFromLogs } from "../lib/logs";
export function TerminalStats({ state }: { state: any }) {
  const { bounties, gameNet } = deriveFromLogs(state);
  return (
<Panel style={{ backgroundColor: gameNet !== undefined && gameNet >= 0 ? "lightgreen" : "lightcoral" }}>
      <div style={{ display: "grid", gap: 6, fontSize: 18 }}>
        <div>
          your bounty card:{" "}
          <b>
            {bounties.me ?? "—"}
            {bounties.meHit ? " (hit!)" : ""}
          </b>
        </div>
        <div>
          bot's bounty card:{" "}
          <b>
            {bounties.opp ?? "—"}
            {bounties.oppHit ? " (hit!)" : ""}
          </b>
        </div>
        <div>
          this game:{" "}
          <b>
            {gameNet !== undefined
              ? `${gameNet >= 0 ? "+" : ""}${gameNet}`
              : "—"}
          </b>
        </div>
      </div>
    </Panel>
  );
}

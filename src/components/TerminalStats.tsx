import { Panel, Small } from "./ui";
import { deriveFromLogs } from "../lib/logs";
export function TerminalStats({ state }: { state: any }) {
  const { bounties, gameNet } = deriveFromLogs(state);
  return (
    <Panel>
      <div style={{ display: "grid", gap: 6 }}>
        <div>
          <Small>your bounty card:</Small>{" "}
          <b>
            {bounties.me ?? "—"}
            {bounties.meHit ? " (hit!)" : ""}
          </b>
        </div>
        <div>
          <Small>bot's bounty card:</Small>{" "}
          <b>
            {bounties.opp ?? "—"}
            {bounties.oppHit ? " (hit!)" : ""}
          </b>
        </div>
        <div>
          <Small>this game:</Small>{" "}
          <b>{gameNet !== undefined ? `${gameNet}` : "—"}</b>
        </div>
      </div>
    </Panel>
  );
}

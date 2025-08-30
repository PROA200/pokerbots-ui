import { theme } from "../../theme";
import { Board } from "./Board";
import { PlayerBar } from "./PlayerBar";
import { RoundPipsRail } from "./RoundPipsRail";

export function TableArea({
  state_,
  net,
  games,
  isTerminal,
}: {
  state_: any;
  net: number;
  games: number;
  isTerminal: boolean;
}) {
  console.log(state_.previous_state);
  let state = state_; // Declare 'state' once and assign based on 'isTerminal'
  if (isTerminal) {
    state = state_?.previous_state;
  }
  console.log(state);
  const board5: string[] = Array.isArray(state?.board5) ? state.board5 : [];
  const street = state?.street;
  const stacks: Record<number, number> = Object(state?.stacks ?? {});
  const hands: string[][] = Array.isArray(state?.hands) ? state.hands : [];
  const botIdx = state?.bot_idx ?? 0;
  const myBounty = state?.bounties[1 - botIdx] ?? "";
  const oppBounty = state?.bounties[botIdx] ?? "";
  const pips = state?.pips ?? [0, 0];
  const roundPot = pips?.reduce((a: number, b: number) => a + b, 0);
  return (
    <div
      style={{
        border: `1px solid ${theme.greenBorder}`,
        background: theme.greenBg,
        borderRadius: 16,
        padding: 16,
        display: "grid",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "baseline",
        }}
      >
        <div
          style={{ color: theme.sub, fontSize: 13, display: "flex", gap: 16 }}
        >
          <span>
            net winnings: <b style={{ color: theme.ink }}>{net}</b>
          </span>
          <span>
            games played: <b style={{ color: theme.ink }}>{games}</b>
          </span>
        </div>
        <span style={{ color: theme.sub, fontSize: 13 }}>
          {street ? String(street) : ""}
        </span>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <PlayerBar
          label={`Opponent`}
          stack={stacks[botIdx]}
          cards={hands[botIdx]}
          reveal={isTerminal}
          placeholderCards={2}
          bounty={oppBounty}
        />
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}
      >
        <Board cards={board5.slice(0, street)} />
        <RoundPipsRail
          top={pips[botIdx] ?? 0}
          mid={800 - stacks[0] - stacks[1] - roundPot}
          bot={pips[1 - botIdx] ?? 0}
        />
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <PlayerBar
          label={`You`}
          stack={stacks[1 - botIdx]}
          cards={hands[1 - botIdx]}
          reveal={true}
          bounty={myBounty}
        />
      </div>
    </div>
  );
}

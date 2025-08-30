import React from "react";
import { Panel, ActionButton, Pill, TextInput } from "../ui";
import type { RaiseBounds } from "../../types";

export type ActionStripProps = {
  actions: string[];
  bounds: RaiseBounds | null;
  disabled?: boolean;
  amount: string;
  setAmount: (s: string) => void;
  onSubmit: (action: string, amt?: number) => void;
  onNext: () => void;
};

function ActionStripImpl({
  actions,
  bounds,
  disabled,
  amount,
  setAmount,
  onSubmit,
  onNext,
}: ActionStripProps) {
  const can = (a: string) => actions.includes(a);

  const send = (a: string) => {
    const parsed = amount !== "" ? parseInt(String(amount), 10) : undefined;
    onSubmit(a, parsed);
  };

  return (
    <Panel>
      <div style={{ display: "grid", gap: 12 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 8,
          }}
        >
          <ActionButton
            disabled={disabled || !can("check")}
            onClick={() => send("check")}
          >
            check
          </ActionButton>
          <ActionButton
            disabled={disabled || !can("call")}
            onClick={() => send("call")}
          >
            call
          </ActionButton>
          <ActionButton
            disabled={disabled || !can("fold")}
            onClick={() => send("fold")}
          >
            fold
          </ActionButton>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: 8,
          }}
        >
          <TextInput
            value={amount}
            onChange={setAmount}
            placeholder={
              bounds
                ? `enter amount (${bounds[0]} - ${bounds[1]})`
                : "enter amount"
            }
          />
          <Pill onClick={() => bounds && setAmount(String(bounds[0]))}>
            min
          </Pill>
          <Pill onClick={() => bounds && setAmount(String(bounds[1]))}>
            max
          </Pill>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: 8,
          }}
        >
          <ActionButton
            disabled={disabled || !can("raise")}
            onClick={() => send("raise")}
          >
            raise
          </ActionButton>
          <ActionButton disabled={disabled} onClick={onNext}>
            next game
          </ActionButton>
        </div>
      </div>
    </Panel>
  );
}

// Export both ways so either `import { ActionStrip }` or `import ActionStrip` works.
export const ActionStrip = ActionStripImpl;
export default ActionStripImpl;

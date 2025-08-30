import { theme } from "../../theme";
import { Card } from "../Cards/Card";
import { CARD_SIZES } from "../../constants";

export function Board({ cards }: { cards: string[] }) {
  const slots = [0, 1, 2, 3, 4].map((i) => cards[i]);
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: 8,
        border: `1px solid ${theme.greenBorder}`,
        background: theme.greenBg,
        borderRadius: 12,
        justifyContent: "center",
      }}
    >
      {slots.map((c, i) =>
        c ? (
          <Card key={i} code={c} size={CARD_SIZES.board} />
        ) : (
          <div key={i} style={{ width: CARD_SIZES.board * CARD_SIZES.aspect, height: CARD_SIZES.board }} />
        ),
      )}
    </div>
  );
}

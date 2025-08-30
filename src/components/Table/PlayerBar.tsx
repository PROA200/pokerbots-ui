import { theme } from "../../theme";
import { Card } from "../Cards/Card";
import { CARD_SIZES } from "../../constants";
export function PlayerBar({
  label,
  stack,
  cards,
  reveal,
  placeholderCards,
  bounty,
}: {
  label: string;
  stack?: number;
  cards?: string[];
  reveal?: boolean;
  placeholderCards?: number;
  bounty?: string;
}) {
  const showCards = reveal && cards && cards.length > 0;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gridTemplateAreas: `"label bounty stack" "cards cards cards"`,
        alignItems: "center",
        gap: 12,
        minWidth: 0, // allow the middle column to shrink instead of wrapping
      }}
    >
      <div style={{ gridArea: "label", fontWeight: 700 }}>{label}</div>

      <div
        style={{
          gridArea: "bounty",
          color: theme.sub,
          justifySelf: "center",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        bounty: {reveal ? (bounty ?? "-") : "-"}
      </div>

      <div
        style={{
          gridArea: "stack",
          color: theme.sub,
          justifySelf: "end",
          whiteSpace: "nowrap",
        }}
      >
        stack: {stack ?? "-"}
      </div>

      <div
        style={{
          gridArea: "cards",
          display: "flex",
          gap: 6,
          marginTop: 6,
          justifyContent: "center",
        }}
      >
        {showCards
          ? cards!.map((c, i) => <Card key={i} code={c} size={CARD_SIZES.hole} />)
          : Array.from({ length: placeholderCards ?? 0 }).map((_, i) => (
              <Card key={i} code="Ah" size={CARD_SIZES.hole} placeholder />
            ))}
      </div>
    </div>
  );
}

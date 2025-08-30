import { theme } from "../../theme";
function Badge({ value }: { value: number }) {
  return (
    <div
      style={{
        border: `1px solid ${theme.line}`,
        borderRadius: 12,
        padding: "6px 10px",
        background: theme.panel,
        fontWeight: 700,
        textAlign: "center",
        minWidth: 36,
      }}
    >
      {value}
    </div>
  );
}
export function RoundPipsRail({
  top,
  mid,
  bot,
}: {
  top: number;
  mid: number;
  bot: number;
}) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Badge value={top} />
      <Badge value={mid} />
      <Badge value={bot} />
    </div>
  );
}

/// <reference types="vite/client" />
import { CARD_SIZES } from "../../constants";
const deck = import.meta.glob("../../assets/english_cards/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;
function cardSrc(code: string) {
  const key = `../../assets/english_cards/${code}.svg`;
  return deck[key];
}
export function Card({
  code,
  size = CARD_SIZES.board,
  placeholder = false,
}: {
  code: string;
  size?: number;
  placeholder?: boolean;
}) {
  const src = cardSrc(code);
  if (!src)
    return (
      <div
        style={{
          width: size * 0.7,
          height: size,
          border: "1px dashed #ccc",
          borderRadius: 8,
        }}
      />
    );
  if (placeholder) {
    const ph = cardSrc("Ah") || src;
    return (
      <img
        src={ph}
        alt="blank"
        style={{
          width: size * 0.7,
          height: size,
          objectFit: "contain",
          display: "block",
          filter: "grayscale(1) saturate(0) brightness(0.95) opacity(0.65)",
        }}
      />
    );
  }
  return (
    <img
      src={src}
      alt={code}
      style={{
        width: size * 0.7,
        height: size,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

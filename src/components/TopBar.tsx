import { H1 } from "./ui";
export function TopBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 4,
        paddingBottom: 4,
        gap: 4,
      }}
    >
      <H1>can you beat our pokerbot?</H1>
      
      <h3>hold'em, except if you win while seeing your bounty card, you win 1.5x + 10</h3>
    </div>
  );
}

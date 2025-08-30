export type RaiseBounds = [number, number];
export type ValidActionsTuple = [string[], RaiseBounds] | null;
export type MoveIn = { action: string; amount?: number };
export type StateOut = {
  state: any;
  valid_actions: ValidActionsTuple;
  status: string;
  net_winnings: number;
  games_played: number;
};

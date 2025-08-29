import React from 'react';
import { Board } from './Board';
import { PlayerBar } from './PlayerBar';
import { extractVisibleLogs } from './LogPanel';

// Derive a simple view model from logs visible to player 0
function deriveView(state: any) {
  const logs = extractVisibleLogs(state);
  const vm = { board: [] as string[], stacks: {} as Record<number, number>, hands: {} as Record<number, string[]>, street: undefined as undefined | string };
  for (const l of logs) {
    const t = l.log_type || l.type;
    if (t === 'board') { vm.board = Array.isArray(l.cards) ? l.cards : []; vm.street = l.street; }
    if (t === 'stack') { vm.stacks[l.player] = l.amount; }
    if (t === 'deal' || t === 'shows_deal') {
      if (Array.isArray(l.cards)) vm.hands[l.player] = l.cards;
    }
  }
  return vm;
}

export function GameView({ state, mySeat = 0 }: { state: any; mySeat?: number }) {
  const vm = React.useMemo(() => deriveView(state), [state]);
  return (
    <div style={wrap}>
      <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', marginBottom: 8 }}>Street: {vm.street ?? '-'}</div>
      <Board cards={vm.board} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginTop: 8 }}>
        <PlayerBar seat={1 - mySeat} stack={vm.stacks[1 - mySeat]} cards={vm.hands[1 - mySeat]} />
        <PlayerBar seat={mySeat} stack={vm.stacks[mySeat]} cards={vm.hands[mySeat]} />
      </div>
    </div>
  );
}

const wrap: React.CSSProperties = { background: '#fff', border: '2px solid #000', padding: 12 };

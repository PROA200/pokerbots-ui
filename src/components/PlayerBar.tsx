import React from 'react';
import { Card } from './Card';

export function PlayerBar({ seat, stack, cards }: { seat: number; stack?: number; cards?: string[] }) {
  return (
    <div style={{ border: '2px solid #000', padding: 8, display: 'flex', alignItems: 'center', gap: 12, background: '#fff' }}>
      <div style={{ fontWeight: 700, fontFamily: 'Helvetica, Arial, sans-serif' }}>P{seat}</div>
      <div style={{ color: '#111', fontFamily: 'Helvetica, Arial, sans-serif' }}>stack: {stack ?? '-'}</div>
      <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
        {(cards ?? []).map((c, i) => <Card key={i} code={c} size={72} />)}
      </div>
    </div>
  );
}

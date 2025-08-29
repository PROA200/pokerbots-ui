import React from 'react';
import { Card } from './Card';

export function Board({ cards }: { cards: string[] }) {
  const slots = [0,1,2,3,4].map(i => cards[i]);
  return (
    <div style={{ display: 'flex', gap: 8, padding: 8, border: '2px solid #000', background: '#fff' }}>
      {slots.map((c, i) => c ? <Card key={i} code={c} size={80} /> : <div key={i} style={{ width: 56, height: 80, border: 'none' }} />)}
    </div>
  );
}

import React from 'react';

// Load every svg in english_cards
const deck = import.meta.glob('../assets/english_cards/*.svg', { eager: true, import: 'default' }) as Record<string, string>;

function cardSrc(code: string): string | undefined {
  const key = `../assets/english_cards/${code.toLowerCase()}.svg`;
  return deck[key];
}

export function Card({ code, size = 128 }: { code: string; size?: number }) {
  const src = cardSrc(code);
  if (!src) return <div style={{ width: size * 0.7, height: size, border: '0px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12 }}>{code}</div>;
  return <img src={src} alt={code} style={{ width: size * 0.7, height: size, objectFit: 'contain', display: 'block', border: '0px solid #000' }} />;
}

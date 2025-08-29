import React from 'react';

export function JsonCard({ title, value }: { title: string; value: any }) {
  return (
    <div style={card}>
      <h3 style={heading}>{title}</h3>
      <pre style={pre}>{pretty(value)}</pre>
    </div>
  );
}

function pretty(v: any) {
  try { return JSON.stringify(v, null, 2); } catch { return String(v); }
}

const card: React.CSSProperties = { background: '#fff', border: '2px solid #000', borderRadius: 12, padding: 16 };
const heading: React.CSSProperties = { margin: 0, fontSize: 16, fontWeight: 700 };
const pre: React.CSSProperties = { background: '#000', color: '#fff', borderRadius: 10, padding: 12, overflow: 'auto', fontSize: 13, lineHeight: 1.35, maxHeight: 320 };

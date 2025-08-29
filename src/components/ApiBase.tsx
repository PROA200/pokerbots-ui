import React from 'react';
import { currentApiBase, saveApiBase, useProxy } from '../api/client';

export function ApiBase() {
  const proxy = useProxy();
  const [base, setBase] = React.useState(() => currentApiBase());

  React.useEffect(() => { saveApiBase(base); }, [base]);

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <label style={label}>API Base</label>
        {proxy && <span style={{ fontSize: 12, color: '#000' }}>(proxy on — using <code>/api</code>)</span>}
      </div>
      <input
        style={input}
        disabled={proxy}
        value={base}
        onChange={(e) => setBase(e.target.value)}
        placeholder="http://localhost:8000"
      />
    </div>
  );
}

const card: React.CSSProperties = { background: '#fff', border: '2px solid #000', borderRadius: 0, padding: 16 };
const label: React.CSSProperties = { fontSize: 14, color: '#000', marginRight: 8 };
const input: React.CSSProperties = { padding: '8px 10px', borderRadius: 0, border: '1px solid #000', outline: 'none', fontSize: 14, width: '90%' };

import React from 'react';
import { ApiBase } from './components/ApiBase';
import { ActionForm } from './components/ActionForm';
import { JsonCard } from './components/JsonCard';
import { currentApiBase, makeUrl, useProxy } from './api/client';
import { getState, postMove } from './hooks/usePokerApi';
import { parseValidActions } from './types';
import type { StateOut } from './types';
import { LogPanel } from './components/LogPanel';
import { GameView } from './components/GameView';

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [stateOut, setStateOut] = React.useState<StateOut | null>(null);
  const [lastReq, setLastReq] = React.useState<any>(null);
  const [lastRes, setLastRes] = React.useState<any>(null);

  const { actions, bounds } = parseValidActions(stateOut?.valid_actions ?? null);

  async function wrapCall(path: string, init: any, fn: () => Promise<StateOut>) {
    setLoading(true); setError(null);
    setLastReq({ url: makeShownUrl(path), init: { credentials: 'include', ...(init || {}) } });
    try {
      const data = await fn();
      setLastRes(data);
      setStateOut(data);
    } catch (e: any) {
      setError(e?.message || String(e));
      setLastRes({ error: e?.message || String(e) });
    } finally {
      setLoading(false);
    }
  }

  function makeShownUrl(path: string) {
    const proxy = useProxy();
    const base = proxy ? '' : currentApiBase();
    const prefix = proxy ? '/api' : '';
    return `${base}${prefix}${path}` || path;
  }

  React.useEffect(() => { (async () => { await wrapCall('/state', {}, getState); })(); }, []);

  return (
      <div style={page}>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Pokerbots Demo Tester</h1>
            <p style={{ marginTop: 4, color: '#000' }}>Hit your FastAPI endpoints, see raw JSON, and send cookies automatically.</p>

            <ApiBase />

            <div style={grid3}>
        {/* Left: table */}
        <GameView state={stateOut?.state} mySeat={0} />

        {/* Middle: existing controls */}
        <ActionForm
          actions={actions}
          bounds={bounds}
          disabled={loading}
          onSubmit={(action, amount) => {
            const parsedAmount = amount !== undefined ? parseInt(String(amount), 10) : undefined;
            return wrapCall(
              '/move',
              {
                method: 'POST',
                body: JSON.stringify({
                  action,
                  ...(parsedAmount !== undefined ? { amount: parsedAmount } : {}),
                }),
                headers: { 'Content-Type': 'application/json' },
              },
              () => postMove({
                action,
                ...(parsedAmount !== undefined ? { amount: parsedAmount } : {}),
              })
            );
          }}
          // NEW:
          onNext={() => wrapCall('/state', {}, getState)}
        />

          {/* Right: formatted logs (filtered to visible_to ∈ {null,0}) */}
          <LogPanel state={stateOut?.state} />
        </div>

        <JsonCard title="Game state JSON" value={stateOut?.state ?? {}} />

        <div style={grid2}>
          <JsonCard title="Last Request" value={lastReq} />
          <JsonCard title="Last Response" value={lastRes} />
        </div>

      <footer style={{ color: '#888', fontSize: 12, marginTop: 24 }}>
        For Option B (direct): set <code>ALLOWED_ORIGINS=http://localhost:5173</code> and <code>COOKIE_SECURE=false</code> on the backend.
      </footer>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', margin: '6px 0' }}>
      <div style={{ color: '#000' }}>{label}</div>
      <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>{value}</div>
    </div>
  );
}

const page: React.CSSProperties = { fontFamily: 'Helvetica, Arial, sans-serif', padding: 24, maxWidth: 1200, margin: '0 auto' };
const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 };
const grid3: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16, paddingBottom: 16 };
const card: React.CSSProperties = { background: '#fff', border: '2px solid #e5e7eb', borderRadius: 12, padding: 16 };
const title: React.CSSProperties = { margin: 0, fontSize: 16, fontWeight: 700 };
const btn: React.CSSProperties = { padding: '8px 12px', borderRadius: 10, border: '2px solid #111827', background: '#111827', color: 'white', fontSize: 14, cursor: 'pointer' };
const errorBox: React.CSSProperties = { marginTop: 12, padding: 10, borderRadius: 10, background: '#FEF2F2', color: '#000', border: '1px solid #FECACA' };

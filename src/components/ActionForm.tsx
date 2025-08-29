import React from 'react';

export function ActionForm(
    { actions, bounds, onSubmit, onNext, disabled }:
    { actions: string[]; bounds: [number, number] | null; onSubmit: (a: string, amt?: number) => void; onNext: () => void; disabled?: boolean }
    ) {
    const [action, setAction] = React.useState<string>(() => actions[0] || '');
    const [amount, setAmount] = React.useState<string>('');

    React.useEffect(() => {
        if (!actions.includes(action)) setAction(actions[0] || '');
    }, [actions]);

    return (
        <div style={wrap /* or card, depending on your file */}>
        <h3 style={h3 /* or title */}>Controls</h3>
  
      <div style={row}>
        <label style={label}>Action</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <select style={input} value={action} onChange={(e) => setAction(e.target.value)}>
            {actions.length ? actions.map(a => <option key={a} value={a}>{a}</option>) : <option value="">(none)</option>}
          </select>
          <input style={{ ...input, width: 140 }} placeholder="or type" value={action} onChange={(e) => setAction(e.target.value)} />
        </div>
      </div>

      <div style={row}>
        <label style={label}>Amount</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input style={{ ...input, width: 140 }} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={bounds ? `${bounds[0]}..${bounds[1]}` : '(optional)'} />
          {bounds && <small>min {bounds[0]} / max {bounds[1]}</small>}
        </div>
      </div>

    <div style={{ display: 'flex', gap: 8, justifyContent: 'center'}}>
      <button style={btn} disabled={disabled || !action} onClick={() => {
        const parsedAmount = amount !== '' ? parseInt(String(amount), 10) : undefined;
        onSubmit(action, parsedAmount);
      }}>Submit</button>

      <button
          style={btn}
          disabled={disabled}
          onClick={onNext}
        >
          Next game
        </button>
    </div>
  </div>
  );
}

const wrap: React.CSSProperties = { background: '#fff', border: '2px solid #000', padding: 16, fontFamily: 'Helvetica, Arial, sans-serif' };
const h3: React.CSSProperties = { margin: 0, fontSize: 16, fontWeight: 700 };
const input: React.CSSProperties = { padding: '6px 8px', border: '2px solid #000', outline: 'none', fontSize: 14 };
const btn: React.CSSProperties = { marginTop: 12, padding: '8px 12px', border: '2px solid #000', background: '#000', color: '#fff', fontSize: 14, cursor: 'pointer' };
const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '100px 1fr', gap: 8, alignItems: 'center', marginTop: 10 };
const label: React.CSSProperties = { fontSize: 14 };

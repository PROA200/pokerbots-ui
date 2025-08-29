import React from 'react';

export type LogLike = { [k: string]: any; log_type?: string; type?: string; visible_to?: number | null };

// Treat anything with log_type (string) OR type==='LogLine' as a log object
export function isLogLine(v: any): v is LogLike {
  return !!(v && typeof v === 'object' && (typeof (v as any).log_type === 'string' || (v as any).type === 'LogLine'));
}

// Recursively extract logs that are visible to the client (visible_to is null/undefined or 0)
// Chronology: dive into previous_state first (older), then new_logs (newer), then other fields
export function extractVisibleLogs(root: any): LogLike[] {
  const out: LogLike[] = [];
  const seen = new Set<any>();

  const include = (node: LogLike) => node.visible_to == null || node.visible_to === 0;

  function walk(node: any) {
    if (node == null || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);

    if (isLogLine(node)) { // terminal: log
      if (include(node)) out.push(node);
      return;
    }

    if (Array.isArray(node)) { // arrays are oldest -> newest
      for (const item of node) walk(item);
      return;
    }

    // object: visit chain first to maintain global oldest->newest
    if ('previous_state' in node) walk((node as any).previous_state);
    if ('new_logs' in node) walk((node as any).new_logs);

    for (const [k, v] of Object.entries(node)) {
      if (k === 'previous_state' || k === 'new_logs') continue;
      walk(v);
    }
  }

  walk(root);
  return out;
}

const cardToAscii = (card: string) => {
    const value = card.slice(0, -1);
    const suit = card.slice(-1);
    let asciiSuit = '';
    let color = '';
    switch (suit) {
      case 'c': asciiSuit = '♣'; color = 'black'; break;
      case 'd': asciiSuit = '♦'; color = 'red'; break;
      case 'h': asciiSuit = '♥'; color = 'red'; break;
      case 's': asciiSuit = '♠'; color = 'black'; break;
      default: asciiSuit = suit; color = 'black';
    }
    return `<span style="color: ${color}">${value}${asciiSuit}</span>`;
};
  
  
  function fmt(l: LogLike): string {
    const t = l.log_type || l.type;
    switch (t) {
      case 'blind': return `Player ${l.player} posts blind ${l.amount}`;
      case 'deal': return `Player ${l.player} dealt ${Array.isArray(l.cards) ? l.cards.map(cardToAscii).join(' ') : l.cards}`;
      case 'shows_deal': return `Player ${l.player} shows ${Array.isArray(l.cards) ? l.cards.map(cardToAscii).join(' ') : l.cards}`;
      case 'action': return `Player ${l.player} ${l.action}${l.amount != null ? ' ' + l.amount : ''}`;
      case 'board': return `${l.street || 'Board'}: ${(l.cards || []).map(cardToAscii).join(' ')}`;
      case 'stack': return `Stack: Player ${l.player}: ${l.amount}`;
      case 'reward': return `Player ${l.player} change: ${l.amount}`;
      case 'bounty': return `Player ${l.player} assigned bounty ${l.cards}`;
      case 'bounty_hit': return `Player ${l.player} hits bounty!`;
      default: return JSON.stringify(l);
    }
  }

export function LogPanel({ state }: { state: any }) {
  const logs = React.useMemo(() => extractVisibleLogs(state), [state]);
  return (
    <div style={card}>
      <h3 style={title}>Logs</h3>
      {!logs?.length ? (
        <div style={{ color: '#000', fontFamily: 'Helvetica, Arial, sans-serif' }}>No visible logs.</div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 16, listStyle: 'disc' }}>
          {logs.map((l, i) => (
            <li
              key={i}
              style={{ margin: '0px 0', fontFamily: 'Helvetica, Arial, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: fmt(l) }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const card = { background: '#fff', border: '2px solid #000', padding: 16 } as React.CSSProperties;
const title = { margin: 0, fontSize: 16, fontWeight: 700 } as React.CSSProperties;

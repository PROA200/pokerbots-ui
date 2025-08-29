import { apiFetch } from '../api/client';
import type { MoveIn, StateOut } from '../types';

export async function getState(): Promise<StateOut> {
  return apiFetch<StateOut>('/state');
}

export async function postMove(body: MoveIn): Promise<StateOut> {
  return apiFetch<StateOut>('/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

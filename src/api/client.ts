export function useProxy(): boolean {
    return String(import.meta.env.VITE_USE_PROXY || 'false') === 'true';
  }
  
  export function currentApiBase(): string {
    const stored = localStorage.getItem('apiBase');
    const envBase = (import.meta as any).env?.VITE_API_BASE as string | undefined;
    return stored || envBase || 'http://localhost:8000';
  }
  
  export function saveApiBase(url: string) {
    localStorage.setItem('apiBase', url);
  }
  
  export function makeUrl(path: string): string {
    const proxy = useProxy();
    const base = proxy ? '' : currentApiBase();
    const prefix = proxy ? '/api' : '';
    return `${base}${prefix}${path}`;
  }
  
  export async function apiFetch<T = any>(path: string, init?: RequestInit): Promise<T> {
    const url = makeUrl(path);
    const res = await fetch(url, { credentials: 'include', ...(init || {}) });
    const text = await res.text();
    let data: any;
    try { data = JSON.parse(text); } catch { /* non-JSON */ }
    if (!res.ok) {
      const msg = data?.detail ?? data?.message ?? res.statusText;
      throw new Error(typeof msg === 'string' ? msg : String(msg));
    }
    return (data ?? text) as T;
  }

export interface Idea { text: string; done: boolean; }
export type IdeasResponse = Record<string, Idea[]>;
export type HistoryResponse = HistoryEntry[];
export interface HistoryEntry { letter: string; idea: string; date: string; done: boolean; }

const BASE = 'https://fun.api.kewan.dev';

function withAuth(opts: RequestInit = {}) {
  const pw = localStorage.getItem('sitePassword');
  return {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      'x-site-password': pw ?? '',
      ...(opts.headers || {})
    }
  };
}

export const fetchIdeas = (): Promise<IdeasResponse> => fetch(`${BASE}/ideas`, withAuth()).then(r => r.json());
export const addIdea = (l: string, text: string) =>
  fetch(`${BASE}/ideas/${l}`, withAuth({
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
  })).then(r => r.json());

export const deleteIdea = (l: string, idx: number) =>
  fetch(`${BASE}/ideas/${l}/${idx}`, withAuth({ method: 'DELETE' })).then(r => r.json());
export const toggleIdea = (l: string, idx: number) =>
  fetch(`${BASE}/ideas/${l}/${idx}/toggle`, withAuth({ method: 'PUT' })).then(r => r.json());

export const fetchHistory = (): Promise<HistoryResponse> =>
  fetch(`${BASE}/history`, withAuth()).then(r => r.json());

// export const addHistory = (entry: Omit<HistoryEntry, 'done'>) =>
//   fetch(`${BASE}/history`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) }).then(r => r.json());

export const addHistory = (entry: Omit<HistoryEntry, 'done'>) =>
  fetch(`${BASE}/history`, withAuth({
    method: 'POST', body: JSON.stringify(entry)
  })).then(r => r.json());

export const toggleHistory = (idx: number) =>
  fetch(`${BASE}/history/${idx}/toggle`, withAuth({ method: 'PUT' })).then(r => r.json());

export const deleteHistoryItem = (idx: number) =>
  fetch(`${BASE}/history/${idx}`, withAuth({ method: 'DELETE' })).then(r => r.json());

export const clearHistory = () =>
  fetch(`${BASE}/history`, withAuth({ method: 'DELETE' })).then(r => r.json());

export const login = (password: string) =>
  fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  }).then(r => r.ok);
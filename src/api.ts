export interface Idea { text: string; done: boolean; }
export type IdeasResponse = Record<string, Idea[]>;
export type HistoryResponse = HistoryEntry[];
export interface HistoryEntry { letter: string; idea: string; date: string; done: boolean; }

const BASE = 'https://fun.api.kewan.dev';

export const fetchIdeas = (): Promise<IdeasResponse> => fetch(`${BASE}/ideas`).then(r => r.json());
export const addIdea = (letter: string, text: string) =>
  fetch(`${BASE}/ideas/${letter}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }).then(r => r.json());
export const deleteIdea = (letter: string, idx: number) =>
  fetch(`${BASE}/ideas/${letter}/${idx}`, { method: 'DELETE' }).then(r => r.json());
export const toggleIdea = (letter: string, idx: number) =>
  fetch(`${BASE}/ideas/${letter}/${idx}/toggle`, { method: 'PUT' }).then(r => r.json());

export const fetchHistory = (): Promise<HistoryResponse> => fetch(`${BASE}/history`).then(r => r.json());
export const addHistory = (entry: Omit<HistoryEntry, 'done'>) =>
  fetch(`${BASE}/history`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) }).then(r => r.json());
export const toggleHistory = (idx: number) =>
  fetch(`${BASE}/history/${idx}/toggle`, { method: 'PUT' }).then(r => r.json());
export const deleteHistoryItem = (idx: number) =>
  fetch(`${BASE}/history/${idx}`, { method: 'DELETE' }).then(r => r.json());
export const clearHistory = () =>
  fetch(`${BASE}/history`, { method: 'DELETE' }).then(r => r.json());
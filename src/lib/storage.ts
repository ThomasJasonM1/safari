/**
 * Every per-person choice on this site — spotted animals, packed items, saved
 * documents — lives in this browser's localStorage and nowhere else. There is no
 * account and no server, so two people opening the same URL keep separate lists.
 */

const PREFIX = 'safari:';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    // Private browsing, disabled storage, or corrupt JSON — fall back rather
    // than taking the whole page down over a checkbox.
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — the UI stays usable, it just won't persist */
  }
}

/** A set of string ids persisted as a JSON array. */
export function readSet(key: string): Set<string> {
  return new Set(read<string[]>(key, []));
}

export function writeSet(key: string, value: Set<string>): void {
  write(key, [...value]);
}

export function clearKey(key: string): void {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* nothing to do */
  }
}

export const KEYS = {
  spotted: 'spotted',
  packing: 'packing',
  documents: 'documents',
} as const;

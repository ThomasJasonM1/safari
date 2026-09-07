/**
 * Storage for the Documents page.
 *
 * Two kinds of document live side by side:
 *
 *  - Bundled — shipped with the site (the TMAC itinerary and packing list).
 *    Served straight out of `docs/`, identical for everyone, not deletable.
 *  - Personal — added by whoever is using this browser. The file bytes go into
 *    IndexedDB, because a passport scan or a signed invoice is far larger than
 *    the ~5 MB localStorage ceiling. Nothing is ever uploaded anywhere.
 */

const DB_NAME = 'safari-documents';
const DB_VERSION = 1;
const STORE = 'files';

export interface PersonalDoc {
  id: string;
  name: string;
  type: string;
  size: number;
  addedAt: string;
  blob: Blob;
}

export type DocMeta = Omit<PersonalDoc, 'blob'>;

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('Could not open document storage'));
  });
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return open().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode);
        const req = run(t.objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error ?? new Error('Document storage error'));
        t.oncomplete = () => db.close();
      })
  );
}

export async function listPersonalDocs(): Promise<DocMeta[]> {
  const all = await tx<PersonalDoc[]>('readonly', (s) => s.getAll() as IDBRequest<PersonalDoc[]>);
  return all
    .map(({ blob: _blob, ...meta }) => meta)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}

export async function addPersonalDoc(file: File): Promise<DocMeta> {
  const doc: PersonalDoc = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: file.name,
    type: file.type || 'application/octet-stream',
    size: file.size,
    addedAt: new Date().toISOString(),
    blob: file,
  };
  await tx('readwrite', (s) => s.put(doc));
  const { blob: _blob, ...meta } = doc;
  return meta;
}

export async function deletePersonalDoc(id: string): Promise<void> {
  await tx('readwrite', (s) => s.delete(id));
}

/**
 * Returns an object URL for a stored file. The caller owns the URL and must
 * revoke it when finished, or the blob is pinned in memory for the session.
 */
export async function personalDocUrl(id: string): Promise<string> {
  const doc = await tx<PersonalDoc | undefined>('readonly', (s) => s.get(id) as IDBRequest<PersonalDoc | undefined>);
  if (!doc) throw new Error('That document is no longer stored in this browser.');
  return URL.createObjectURL(doc.blob);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso;
  }
}

import { useEffect, useRef, useState } from 'react';
import { BUNDLED_DOCS } from '../data/bundledDocs';
import {
  addPersonalDoc,
  deletePersonalDoc,
  formatBytes,
  formatDate,
  listPersonalDocs,
  personalDocUrl,
  type DocMeta,
} from '../lib/documents';

/** Bundled PDFs are served from the site itself, next to index.html. */
const docHref = (file: string) => `${import.meta.env.BASE_URL}docs/${encodeURIComponent(file)}`;

function iconFor(type: string): string {
  if (type === 'application/pdf') return '📕';
  if (type.startsWith('image/')) return '🖼';
  return '📄';
}

export default function DocumentsPage() {
  const [personal, setPersonal] = useState<DocMeta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listPersonalDocs()
      .then(setPersonal)
      .catch(() => setError('This browser will not let the site store files, so added documents will not persist.'));
  }, []);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length === 0) return;
    try {
      for (const f of files) await addPersonalDoc(f);
      setPersonal(await listPersonalDocs());
      setError(null);
    } catch {
      setError('Could not save that file in this browser.');
    }
  };

  const onOpen = async (doc: DocMeta) => {
    try {
      const url = await personalDocUrl(doc.id);
      window.open(url, '_blank', 'noopener');
      // Give the new tab a moment to take the blob before releasing it.
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      setError('That document is no longer stored in this browser.');
    }
  };

  const onDelete = async (doc: DocMeta) => {
    if (!window.confirm(`Remove "${doc.name}" from this browser?`)) return;
    await deletePersonalDoc(doc.id);
    setPersonal(await listPersonalDocs());
  };

  return (
    <>
      <div className="notice">
        <span aria-hidden="true">🔒</span>
        <span>
          The trip documents below ship with the site. Anything you add yourself is stored in this browser only — never
          uploaded, and not visible to anyone else in the party.
        </span>
      </div>

      <h2 style={{ fontSize: 15, margin: '4px 0 8px' }}>Trip documents</h2>

      {BUNDLED_DOCS.map((d) => (
        <div className="doc-row" key={d.id}>
          <span className="doc-icon" aria-hidden="true">
            📕
          </span>
          <div className="doc-info">
            <div className="nm">{d.name}</div>
            {d.description && <div className="ds">{d.description}</div>}
            <div className="mt">PDF · {formatBytes(d.size)}</div>
          </div>
          <div className="doc-actions">
            <a className="icon-btn" href={docHref(d.file)} target="_blank" rel="noreferrer noopener" title="Open">
              ↗
            </a>
            <a className="icon-btn" href={docHref(d.file)} download title="Download">
              ⤓
            </a>
          </div>
        </div>
      ))}

      <h2 style={{ fontSize: 15, margin: '22px 0 8px' }}>My documents</h2>

      {error && (
        <div className="notice" style={{ color: 'var(--danger)' }}>
          <span aria-hidden="true">!</span>
          <span>{error}</span>
        </div>
      )}

      {personal.length === 0 && (
        <div className="empty">
          <p style={{ fontWeight: 700, marginBottom: 4 }}>Nothing added yet</p>
          <p className="small" style={{ margin: 0 }}>
            Add a passport scan, visa, travel insurance certificate, vaccination record — or the TMAC invoice, which is
            deliberately not shipped with the site because it carries bank details.
          </p>
        </div>
      )}

      {personal.map((d) => (
        <div className="doc-row" key={d.id}>
          <span className="doc-icon" aria-hidden="true">
            {iconFor(d.type)}
          </span>
          <div className="doc-info">
            <div className="nm">{d.name}</div>
            <div className="mt">
              {formatBytes(d.size)} · added {formatDate(d.addedAt)}
            </div>
          </div>
          <div className="doc-actions">
            <button className="icon-btn" onClick={() => onOpen(d)} title="Open">
              ↗
            </button>
            <button className="icon-btn danger" onClick={() => onDelete(d)} title="Remove">
              🗑
            </button>
          </div>
        </div>
      ))}

      <input
        ref={fileInput}
        type="file"
        multiple
        accept="application/pdf,image/*"
        onChange={onPick}
        style={{ display: 'none' }}
      />
      <button className="btn block" style={{ marginTop: 12 }} onClick={() => fileInput.current?.click()}>
        + Add a document
      </button>
    </>
  );
}

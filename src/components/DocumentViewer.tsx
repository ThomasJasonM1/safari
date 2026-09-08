import { useEffect, useRef } from 'react';

export interface ViewerDoc {
  name: string;
  url: string;
  type: string;
}

/**
 * In-app document viewer.
 *
 * Replaces two separate broken paths:
 *
 *  - Bundled PDFs opened via `<a target="_blank">`. Inside an installed PWA
 *    that hands the file to an in-app browser view with no address bar and no
 *    close button, so the only way back out was to kill the app.
 *  - Personal files opened via `window.open(objectUrl)`. The call happened
 *    after an `await`, so it had lost the user-gesture context and mobile
 *    browsers blocked it outright — nothing appeared at all. Photos taken with
 *    the camera hit this every time.
 *
 * Both now render here, inside the page, with an unmistakable close button.
 */
export default function DocumentViewer({ doc, onClose }: { doc: ViewerDoc; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isImage = doc.type.startsWith('image/');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    // Stop the page behind the overlay from scrolling under the reader's finger.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="viewer-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={doc.name}>
      <div className="viewer" onClick={(e) => e.stopPropagation()}>
        <header className="viewer-bar">
          <span className="viewer-name" title={doc.name}>
            {doc.name}
          </span>
          <a
            className="icon-btn"
            href={doc.url}
            download={doc.name}
            title="Save a copy"
            aria-label="Save a copy"
            onClick={(e) => e.stopPropagation()}
          >
            ⤓
          </a>
          <button ref={closeRef} className="icon-btn viewer-x" onClick={onClose} aria-label="Close document">
            ✕
          </button>
        </header>

        <div className="viewer-body">
          {isImage ? (
            <img src={doc.url} alt={doc.name} />
          ) : (
            <iframe src={doc.url} title={doc.name} />
          )}
        </div>

        {!isImage && (
          // iOS renders PDFs in an iframe unreliably — often only the first page,
          // sometimes a blank frame. There is no way to feature-detect that, so
          // the escape hatch is always offered rather than shown conditionally.
          <footer className="viewer-foot">
            Not displaying properly?{' '}
            <a href={doc.url} target="_blank" rel="noreferrer noopener">
              Open it in a new tab
            </a>
          </footer>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * Two small pieces of feedback that matter more than usual on this trip:
 *
 *  1. A one-time confirmation that the whole site — photos and PDFs included —
 *     is now cached. Someone leaving wifi at Kings Camp needs to know whether
 *     the download actually finished before they lose signal.
 *  2. A quiet marker while the browser is offline, so a stale page is not
 *     mistaken for a live one.
 */
export default function OfflineStatus() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW({
    onRegisterError(error) {
      console.error('Service worker registration failed', error);
    },
  });

  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  // Let the confirmation clear itself; nobody needs to dismiss a success message.
  useEffect(() => {
    if (!offlineReady) return;
    const t = window.setTimeout(() => setOfflineReady(false), 8000);
    return () => window.clearTimeout(t);
  }, [offlineReady, setOfflineReady]);

  if (!offlineReady && online) return null;

  return (
    <div className={online ? 'sw-toast ready' : 'sw-toast offline'} role="status">
      {online ? (
        <>
          <span aria-hidden="true">✓</span>
          <span>Saved for offline use — the whole guide works without a signal now.</span>
          <button className="sw-close" onClick={() => setOfflineReady(false)} aria-label="Dismiss">
            ✕
          </button>
        </>
      ) : (
        <>
          <span aria-hidden="true">◍</span>
          <span>Offline — showing the saved copy.</span>
        </>
      )}
    </div>
  );
}

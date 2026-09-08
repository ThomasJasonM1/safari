import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * The one-time "everything is cached" confirmation.
 *
 * It matters operationally: someone leaving wifi at Kings Camp needs to know
 * the 9 MB download actually finished before they lose signal.
 *
 * The *offline* indicator deliberately lives elsewhere, in the header
 * (`OfflineBadge`). It used to be a second state of this floating toast, which
 * sat over the bottom of the page for as long as the signal was gone and
 * covered the "Add a document" button — with no way to dismiss it, adding a
 * document offline became impossible. A status that can persist indefinitely
 * has no business floating over the content.
 */
export default function OfflineStatus() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW({
    onRegisterError(error) {
      console.error('Service worker registration failed', error);
    },
  });

  // Clear itself; nobody needs to dismiss a success message.
  useEffect(() => {
    if (!offlineReady) return;
    const t = window.setTimeout(() => setOfflineReady(false), 8000);
    return () => window.clearTimeout(t);
  }, [offlineReady, setOfflineReady]);

  if (!offlineReady) return null;

  return (
    <div className="sw-toast ready" role="status">
      <span aria-hidden="true">✓</span>
      <span>Saved for offline use. The whole guide works without a signal now.</span>
      <button className="sw-close" onClick={() => setOfflineReady(false)} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}

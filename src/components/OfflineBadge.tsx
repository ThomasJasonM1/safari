import { useOnline } from '../lib/useOnline';

/**
 * Persistent "no signal" marker, shown in the header rather than over the page.
 *
 * Being offline can last for days at Mana Pools, so this has to be somewhere it
 * can sit indefinitely without covering a button or needing to be dismissed.
 */
export default function OfflineBadge() {
  const online = useOnline();
  if (online) return null;

  return (
    <span className="offline-badge" role="status" title="No signal. Showing the saved copy.">
      <span aria-hidden="true">◍</span> Offline
    </span>
  );
}

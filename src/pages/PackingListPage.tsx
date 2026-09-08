import { useEffect, useMemo, useState } from 'react';
import { PACKING_LIST } from '../data/packingList';
import { KEYS, readSet, writeSet, clearKey } from '../lib/storage';
import { colors } from '../theme/colors';

export default function PackingListPage() {
  const [packed, setPacked] = useState<Set<string>>(() => readSet(KEYS.packing));

  const total = useMemo(() => PACKING_LIST.reduce((n, c) => n + c.items.length, 0), []);
  const done = packed.size;

  // Persist as an effect, not inside the updater: React may run an updater more
  // than once per commit, and a write from a discarded run must not be what lands.
  useEffect(() => {
    writeSet(KEYS.packing, packed);
  }, [packed]);

  // Functional update so two ticks in the same frame cannot clobber each other.
  const toggle = (itemId: string) => {
    setPacked((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const reset = () => {
    if (!window.confirm('Clear every tick on the packing list?')) return;
    setPacked(new Set());
    clearKey(KEYS.packing);
  };

  return (
    <>
      <div className="section">
        <h3>Progress</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontWeight: 700 }}>
          <span>
            {done} of {total} packed
          </span>
          <span style={{ color: colors.success }}>{Math.round((done / total) * 100)}%</span>
        </div>
        <div className="progress">
          <span style={{ width: `${(done / total) * 100}%` }} />
        </div>
        <p className="small muted" style={{ margin: '10px 0 0' }}>
          Saved in this browser only. See the TMAC packing list in the Docs tab for the operator&rsquo;s own guidance,
          especially the soft-bag rule for the light aircraft. Confirm the exact weight allowance with TMAC before you
          pack.
        </p>
      </div>

      {PACKING_LIST.map((cat) => {
        const catDone = cat.items.filter((i) => packed.has(i.id)).length;
        return (
          <div className="section" key={cat.id}>
            <div className="group-head" style={{ margin: '0 0 6px' }}>
              <h2 style={{ fontSize: 15 }}>
                {cat.icon} {cat.title}
              </h2>
              <span className="count">
                {catDone}/{cat.items.length}
              </span>
            </div>
            {cat.items.map((item) => {
              const on = packed.has(item.id);
              return (
                <button
                  key={item.id}
                  className={on ? 'check-row on' : 'check-row'}
                  onClick={() => toggle(item.id)}
                  aria-pressed={on}
                >
                  <span className="box" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <span className="label">{item.label}</span>
                    {item.notes && <span className="note">{item.notes}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        );
      })}

      <button className="btn ghost block" onClick={reset}>
        Reset packing list
      </button>
    </>
  );
}

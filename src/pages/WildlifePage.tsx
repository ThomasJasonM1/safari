import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ANIMALS, type Animal } from '../data/wildlife';
import { DESTINATIONS } from '../data/destinations';
import { wildlifeImage } from '../lib/images';
import { accentFor, colors } from '../theme/colors';
import { KEYS, readSet, writeSet } from '../lib/storage';

/** One tick is scoped to a destination, so spotting a lion in the Timbavati
 *  does not silently tick the lion off at Mana Pools too. */
const tickId = (destId: string, animalId: string) => `${destId}:${animalId}`;

export default function WildlifePage() {
  const [query, setQuery] = useState('');
  const [spotted, setSpotted] = useState<Set<string>>(() => readSet(KEYS.spotted));

  // Persist as an effect, not inside the updater: React may run an updater more
  // than once per commit, and a write from a discarded run must not be what lands.
  useEffect(() => {
    writeSet(KEYS.spotted, spotted);
  }, [spotted]);

  // Functional update so two ticks in the same frame cannot clobber each other.
  const toggle = (destId: string, animalId: string) => {
    const id = tickId(destId, animalId);
    setSpotted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (a: Animal) =>
      !q ||
      a.commonName.toLowerCase().includes(q) ||
      a.scientificName.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q);

    return DESTINATIONS.map((d) => ({
      id: d.id,
      name: d.name,
      animals: ANIMALS.filter((a) => a.destinations.includes(d.id) && match(a)),
    })).filter((g) => g.animals.length > 0);
  }, [query]);

  const total = ANIMALS.length;

  return (
    <>
      <input
        className="search"
        type="search"
        placeholder={`Search ${total} species…`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="notice">
        <span aria-hidden="true">✓</span>
        <span>
          Tick a species when you spot it. Ticks are saved in this browser only. Everyone in the party keeps their own
          list.
        </span>
      </div>

      {groups.length === 0 && <p className="empty">No species match “{query}”.</p>}

      {groups.map((g) => {
        const seen = g.animals.filter((a) => spotted.has(tickId(g.id, a.id))).length;
        const accent = accentFor(g.id);
        const done = seen === g.animals.length;
        return (
          <section key={g.id}>
            <div className="group-head">
              <h2 style={{ color: accent }}>{g.name}</h2>
              <span className="count" style={done ? { color: colors.success, fontWeight: 800 } : undefined}>
                {done && '🎉 '}
                {seen} / {g.animals.length} spotted
              </span>
            </div>
            <div className="progress" style={{ marginBottom: 10 }}>
              <span style={{ width: `${(seen / g.animals.length) * 100}%` }} />
            </div>

            {g.animals.map((a) => {
              const on = spotted.has(tickId(g.id, a.id));
              return (
                <div className="animal-row" key={a.id}>
                  <Link to={`/wildlife/${a.id}`}>
                    <img src={wildlifeImage(a.image)} alt={a.commonName} loading="lazy" />
                    <div className="info">
                      <p className="cn">{a.commonName}</p>
                      <p className="sn">{a.scientificName}</p>
                      <span
                        className="badge"
                        style={{ background: colors.conservation[a.conservationStatus] }}
                      >
                        {a.conservationLabel}
                      </span>
                    </div>
                  </Link>
                  <button
                    className={on ? 'tick on' : 'tick'}
                    onClick={() => toggle(g.id, a.id)}
                    aria-pressed={on}
                    aria-label={`Mark ${a.commonName} as spotted at ${g.name}`}
                  >
                    {on ? '✓' : '○'}
                  </button>
                </div>
              );
            })}
          </section>
        );
      })}
    </>
  );
}

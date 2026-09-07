import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { ANIMALS } from '../data/wildlife';
import { destinationImage } from '../lib/images';
import { accentFor } from '../theme/colors';

const TABS = ['Overview', 'History', 'Landscape', 'Tips', 'Phrases'] as const;
type Tab = (typeof TABS)[number];

/** Splits the double-newline-separated body text into paragraphs. */
function Prose({ text }: { text: string }) {
  return (
    <div className="prose">
      {text.split('\n\n').map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default function DestinationDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState<Tab>('Overview');
  const dest = DESTINATIONS.find((d) => d.id === id);

  if (!dest) return <p className="empty">That destination guide does not exist.</p>;

  const accent = accentFor(dest.id);
  const species = ANIMALS.filter((a) => a.destinations.includes(dest.id));

  return (
    <>
      {destinationImage(dest.image) && (
        <img className="animal-hero" src={destinationImage(dest.image)} alt={dest.name} />
      )}

      <div className="detail-header" style={{ background: accent }}>
        <div className="eyebrow">
          {dest.dates} · {dest.nights} night{dest.nights === 1 ? '' : 's'}
        </div>
        <h2>{dest.name}</h2>
        <p className="where">
          {dest.region}, {dest.country} · {dest.hotel}
        </p>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <button key={t} className={t === tab ? 'active' : undefined} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <>
          <div className="section">
            <h3>{dest.tagline}</h3>
            <Prose text={dest.overview} />
          </div>
          <div className="section">
            <h3>Highlights</h3>
            <ul className="bullets">
              {dest.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
          <div className="tip" style={{ borderLeftColor: accent }}>
            <div className="label" style={{ color: accent }}>
              Insider Tip
            </div>
            <div>{dest.insiderTip}</div>
          </div>
          <Link className="btn block" to="/wildlife" style={{ background: accent }}>
            🦁&nbsp; {species.length} species recorded here
          </Link>
        </>
      )}

      {tab === 'History' && (
        <div className="section">
          <h3>History</h3>
          <Prose text={dest.history} />
        </div>
      )}

      {tab === 'Landscape' && (
        <div className="section">
          <h3>Landscape &amp; Ecology</h3>
          <Prose text={dest.landscape} />
        </div>
      )}

      {tab === 'Tips' && (
        <>
          {dest.practicalTips.map((t, i) => (
            <div className="section" key={i}>
              <h3>
                {t.icon} {t.title}
              </h3>
              <p style={{ margin: 0 }}>{t.body}</p>
            </div>
          ))}
        </>
      )}

      {tab === 'Phrases' && (
        <div className="section">
          <h3>Useful Local Phrases</h3>
          {dest.localPhrases.map((p, i) => (
            <div className="phrase" key={i}>
              <div className="lang">{p.language}</div>
              <div className="txt">{p.phrase}</div>
              <div className="pron">{p.pronunciation}</div>
              <div className="mean">{p.meaning}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

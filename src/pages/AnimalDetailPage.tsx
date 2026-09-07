import { Link, useParams } from 'react-router-dom';
import { ANIMALS } from '../data/wildlife';
import { DESTINATIONS } from '../data/destinations';
import { wildlifeImage } from '../lib/images';
import { accentFor, colors } from '../theme/colors';
import credits from '../data/imageCredits.json';

type Credit = { source: string; artist: string; license: string; url: string };
const CREDITS = credits as Record<string, Credit | undefined>;

export default function AnimalDetailPage() {
  const { id } = useParams();
  const animal = ANIMALS.find((a) => a.id === id);

  if (!animal) return <p className="empty">No profile for that species.</p>;

  const places = DESTINATIONS.filter((d) => animal.destinations.includes(d.id));
  const credit = CREDITS[animal.image.replace(/\.jpg$/, '')];

  return (
    <>
      <img className="animal-hero" src={wildlifeImage(animal.image)} alt={animal.commonName} />

      <div className="section">
        <h3 style={{ marginBottom: 4 }}>{animal.scientificName}</h3>
        <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>{animal.commonName}</h2>
        <span className="badge" style={{ background: colors.conservation[animal.conservationStatus] }}>
          {animal.conservationLabel}
        </span>
        <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {places.map((p) => (
            <Link
              key={p.id}
              to={`/destinations/${p.id}`}
              className="badge"
              style={{ background: accentFor(p.id), textDecoration: 'none' }}
            >
              {p.name}
            </Link>
          ))}
        </div>
        {credit && (
          <p className="credit">
            Photo: {credit.artist} · {credit.license} ·{' '}
            <a href={credit.url} target="_blank" rel="noreferrer noopener">
              {credit.source}
            </a>
          </p>
        )}
      </div>

      <div className="section">
        <h3>About</h3>
        <p style={{ margin: 0 }}>{animal.description}</p>
      </div>

      <div className="section">
        <h3>Habitat</h3>
        <p style={{ margin: 0 }}>{animal.habitat}</p>
      </div>

      <div className="tip">
        <div className="label" style={{ color: colors.primary }}>
          Where to look on this trip
        </div>
        <div>{animal.bestSpotting}</div>
      </div>

      <div className="section">
        <h3>Field Notes</h3>
        <ul className="fact-list">
          {animal.facts.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

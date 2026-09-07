import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { destinationImage } from '../lib/images';
import { accentFor } from '../theme/colors';

export default function DestinationsPage() {
  return (
    <>
      <p className="page-intro">
        Four places, eleven days. Each guide covers the background, the landscape, practical tips for September and a
        handful of local phrases worth knowing.
      </p>

      {DESTINATIONS.map((d) => (
        <Link key={d.id} className="card dest-card" to={`/destinations/${d.id}`}>
          {destinationImage(d.image) && <img src={destinationImage(d.image)} alt={d.name} loading="lazy" />}
          <div className="card-body">
            <div className="day-top">
              <h3>{d.name}</h3>
              <span className="badge" style={{ background: accentFor(d.id), marginLeft: 'auto' }}>
                {d.dates}
              </span>
            </div>
            <div className="small muted">
              {d.region}, {d.country} · {d.nights} night{d.nights === 1 ? '' : 's'} · {d.hotel}
            </div>
            <p className="tagline">{d.tagline}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

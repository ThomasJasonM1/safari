import { Link } from 'react-router-dom';
import { TRAVELER_GROUPS } from '../data/personalFlights';

export default function FlightsPage() {
  return (
    <>
      <p className="page-intro">
        Personal flights for each couple. The shared charter and regional legs are on the day pages in the Trip tab.
      </p>

      {TRAVELER_GROUPS.map((g) => {
        const first = g.outbound[0];
        const last = g.return[g.return.length - 1];
        return (
          <Link key={g.id} className="card trav-card" to={`/flights/${g.id}`}>
            <span className="avatar" style={{ background: g.color }}>
              {g.initials}
            </span>
            <span>
              <span className="nm">{g.names}</span>
              <br />
              <span className="rt">
                {first?.fromCode} → {last?.toCode} · {g.outbound.length + g.return.length} legs
              </span>
            </span>
            <span className="arrow" aria-hidden="true">
              ›
            </span>
          </Link>
        );
      })}
    </>
  );
}

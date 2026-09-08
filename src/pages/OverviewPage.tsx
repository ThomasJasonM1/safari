import { Link } from 'react-router-dom';
import { ITINERARY, OPERATOR, type DayEntry } from '../data/itinerary';
import { accentFor, colors } from '../theme/colors';

const DEST_LABEL: Record<string, string> = {
  capeTown: 'Cape Town',
  timbavati: 'Timbavati',
  victoriaFalls: 'Victoria Falls',
  manaPools: 'Mana Pools',
  transit: 'In Transit',
};

function DayCard({ day, index }: { day: DayEntry; index: number }) {
  const accent = accentFor(day.destination);
  return (
    <Link className="card day-card" to={`/day/${index}`}>
      <span className="day-rail" style={{ background: accent }} />
      <div className="day-main">
        <div className="day-top">
          <span className="day-num" style={{ color: accent }}>
            {day.label ?? `Day ${day.dayNum}`}
          </span>
          <span className="day-date">{day.dateShort}</span>
          <span className="badge" style={{ background: accent, marginLeft: 'auto' }}>
            {DEST_LABEL[day.destination] ?? day.destination}
          </span>
        </div>
        <h3>{day.headline}</h3>
        <p className="day-meta">{day.location}</p>
        <div className="day-chips">
          {day.hotel && <span className="chip">🛏 {day.hotel}</span>}
          {day.flights && day.flights.length > 0 && (
            <span className="chip">
              ✈️ {day.flights.length} flight{day.flights.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function OverviewPage() {
  return (
    <>
      <div className="section" style={{ borderLeft: `4px solid ${colors.destinations.timbavati}` }}>
        <h3>South Africa &amp; Zimbabwe · September 2026</h3>
        <p style={{ margin: 0 }}>
          Cape Town, the Timbavati, Victoria Falls and Mana Pools. Eleven days for six travellers, arranged by{' '}
          {OPERATOR}.
        </p>
        <p className="small muted" style={{ margin: '8px 0 0' }}>
          Tap any day for flights, accommodation, activities and the phone numbers that matter that day.
        </p>
      </div>

      {ITINERARY.map((day, i) => (
        <DayCard key={`${day.date}-${day.label ?? day.dayNum}`} day={day} index={i} />
      ))}
    </>
  );
}

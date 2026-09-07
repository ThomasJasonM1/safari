import { useParams } from 'react-router-dom';
import { ITINERARY, SUPPLIERS, type DayEntry } from '../data/itinerary';
import { accentFor } from '../theme/colors';
import FlightCard from '../components/FlightCard';

const HOTEL_SUPPLIER: Record<string, string> = {
  capeTown: 'Commodore Hotel',
  timbavati: 'Kings Camp',
  victoriaFalls: 'Palm River Hotel',
  manaPools: 'Wilderness Ruckomechi',
};

/**
 * Narrows the supplier list to the numbers that are actually useful on this day:
 * the emergency line and the operator always, plus wherever you are sleeping and
 * whoever is flying you somewhere.
 */
function getDayContacts(day: DayEntry) {
  const names = new Set<string>(['Wilderness Emergency (After Hours)', 'TMAC (Operator)']);
  if (HOTEL_SUPPLIER[day.destination]) names.add(HOTEL_SUPPLIER[day.destination]);
  if (day.destination === 'capeTown') names.add('Wilderness Touring Cape Town');
  if (day.flights?.length && day.destination !== 'transit') {
    names.add('Colossal Aviapartner');
    for (const f of day.flights) {
      const carrier = f.carrier.toLowerCase();
      if (carrier.includes('federal air')) names.add('Federal Air');
      if (carrier.includes('wilderness air')) names.add('Wilderness Air Zimbabwe');
    }
  }
  return SUPPLIERS.filter((s) => names.has(s.name));
}

export default function DayDetailPage() {
  const { index } = useParams();
  const day = ITINERARY[Number(index)];

  if (!day) return <p className="empty">That day is not in the itinerary.</p>;

  const accent = accentFor(day.destination);
  const contacts = getDayContacts(day);

  return (
    <>
      <div className="detail-header" style={{ background: accent }}>
        <div className="eyebrow">
          {day.label ?? `Day ${day.dayNum}`} · {day.dateShort}
        </div>
        <h2>{day.headline}</h2>
        <p className="where">{day.location}</p>
      </div>

      {day.hotel && (
        <div className="section">
          <h3>Accommodation</h3>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{day.hotel}</div>
          {day.meals && (
            <p className="small muted" style={{ margin: '5px 0 0' }}>
              {day.meals}
            </p>
          )}
        </div>
      )}

      {day.flights && day.flights.length > 0 && (
        <div className="section">
          <h3>Flights &amp; Transfers</h3>
          {day.flights.map((f, i) => (
            <FlightCard key={`${f.flightNumber}-${i}`} flight={f} />
          ))}
        </div>
      )}

      <div className="section">
        <h3>Day Activities</h3>
        <ul className="bullets">
          {day.activities.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>

      {day.insiderTip && (
        <div className="tip" style={{ borderLeftColor: accent }}>
          <div className="label" style={{ color: accent }}>
            Insider Tip
          </div>
          <div>{day.insiderTip}</div>
        </div>
      )}

      {day.notes && day.notes.length > 0 && (
        <div className="section">
          <h3>Important Notes</h3>
          <ul className="bullets">
            {day.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="section">
        <h3>Key Contacts Today</h3>
        {contacts.map((c) => (
          <a
            key={c.name}
            className="contact"
            href={c.phone.startsWith('+') ? `tel:${c.phone.replace(/\s/g, '')}` : undefined}
          >
            <span className="name">{c.name}</span>
            <span className="num">{c.phone}</span>
          </a>
        ))}
      </div>
    </>
  );
}

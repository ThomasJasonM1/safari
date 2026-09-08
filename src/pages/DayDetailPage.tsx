import { useParams } from 'react-router-dom';
import { ITINERARY, SUPPLIERS, type DayEntry } from '../data/itinerary';
import { airlinesFor, airportsFor, type Contact } from '../data/contacts';
import { accentFor } from '../theme/colors';
import FlightCard from '../components/FlightCard';

const HOTEL_SUPPLIER: Record<string, string> = {
  capeTown: 'Commodore Hotel',
  timbavati: 'Kings Camp',
  victoriaFalls: 'Palm River Hotel',
  manaPools: 'Wilderness Ruckomechi',
};

/** Airports where Colossal Aviapartner actually meets the party. */
const COLOSSAL_AIRPORTS = ['CPT', 'JNB'];

interface ContactGroup {
  title: string;
  items: Contact[];
}

const supplier = (name: string): Contact | undefined => SUPPLIERS.find((s) => s.name === name);

/**
 * Builds the day's contact list from what the day actually contains.
 *
 * The previous version keyed almost everything off `destination`, which left the
 * travel days close to useless: the four pre-trip days are `transit`, so they
 * showed a South African emergency line and nothing else while the traveller was
 * standing in San Francisco or Dulles. Departure day was worse, with seven
 * flights across five airlines and not one airline number among them.
 *
 * Airlines and airports are now derived from `day.flights`, so a day shows the
 * desks for the aircraft it actually involves.
 */
function getDayContacts(day: DayEntry): ContactGroup[] {
  const flights = day.flights ?? [];
  const carriers = flights.map((f) => f.carrier);
  const codes = flights.flatMap((f) => [f.fromCode, f.toCode]);

  const always = [supplier('Wilderness Emergency (After Hours)'), supplier('TMAC (Operator)')];

  const onTheGround: (Contact | undefined)[] = [];
  const lodge = HOTEL_SUPPLIER[day.destination];
  if (lodge) {
    const entry = supplier(lodge);
    // On departure day `hotel` is empty because nobody sleeps there, but the
    // party was still at the camp that morning and it is the number to call
    // about anything left behind. Keep it, relabelled honestly.
    if (entry) onTheGround.push(day.hotel ? entry : { ...entry, detail: 'Where you stayed last night' });
  }
  if (day.destination === 'capeTown') onTheGround.push(supplier('Wilderness Touring Cape Town'));
  // Colossal used to appear on every flight day, including bush charters they
  // have nothing to do with. They work the two big South African airports.
  if (codes.some((c) => COLOSSAL_AIRPORTS.includes(c))) {
    onTheGround.push(supplier('Colossal Aviapartner'));
  }

  const groups: ContactGroup[] = [
    { title: 'Emergency & operator', items: always.filter(Boolean) as Contact[] },
    { title: 'On the ground', items: onTheGround.filter(Boolean) as Contact[] },
    { title: 'Airlines flying today', items: airlinesFor(carriers) },
    { title: 'Airports today', items: airportsFor(codes) },
  ];
  return groups.filter((g) => g.items.length > 0);
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

      {contacts.map((group) => (
        <div className="section" key={group.title}>
          <h3>{group.title}</h3>
          {group.items.map((c) => {
            const tel = c.phone?.startsWith('+') ? `tel:${c.phone.replace(/\s/g, '')}` : undefined;
            return (
              <div className="contact" key={c.name}>
                <span className="contact-main">
                  <span className="name">{c.name}</span>
                  {c.detail && <span className="contact-detail">{c.detail}</span>}
                </span>
                <span className="contact-links">
                  {c.phone &&
                    (tel ? (
                      <a className="num" href={tel}>
                        {c.phone}
                      </a>
                    ) : (
                      <span className="num">{c.phone}</span>
                    ))}
                  {c.url && (
                    <a className="contact-site" href={c.url} target="_blank" rel="noreferrer noopener">
                      Website ↗
                    </a>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

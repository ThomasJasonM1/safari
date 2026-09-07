interface FlightLike {
  flightNumber: string;
  carrier: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  depart: string;
  arrive: string;
  date?: string;
  type?: 'commercial' | 'charter';
  note?: string;
}

export default function FlightCard({ flight }: { flight: FlightLike }) {
  const charter = flight.type === 'charter';
  return (
    <div className={charter ? 'flight charter' : 'flight'}>
      <div className="flight-head">
        <span aria-hidden="true">{charter ? '🛩' : '✈️'}</span>
        <span className="flight-no">{flight.flightNumber}</span>
        <span className="flight-carrier">{flight.carrier}</span>
        {flight.date && <span className="flight-carrier">· {flight.date}</span>}
      </div>

      <div className="flight-route">
        <div className="flight-end">
          <div className="flight-time">{flight.depart}</div>
          <div className="flight-code">{flight.fromCode}</div>
          <div className="flight-airport">{flight.from}</div>
        </div>
        <div className="flight-arrow" aria-hidden="true">
          ──▶
        </div>
        <div className="flight-end to">
          <div className="flight-time">{flight.arrive}</div>
          <div className="flight-code">{flight.toCode}</div>
          <div className="flight-airport">{flight.to}</div>
        </div>
      </div>

      {flight.note && <p className="flight-note">{flight.note}</p>}
    </div>
  );
}

import { useParams } from 'react-router-dom';
import { TRAVELER_GROUPS } from '../data/personalFlights';
import FlightCard from '../components/FlightCard';

export default function FlightDetailPage() {
  const { id } = useParams();
  const group = TRAVELER_GROUPS.find((g) => g.id === id);

  if (!group) return <p className="empty">No flights recorded for that traveller.</p>;

  return (
    <>
      <div className="detail-header" style={{ background: group.color }}>
        <div className="eyebrow">Personal Flights</div>
        <h2>{group.names}</h2>
        <p className="where">
          {group.outbound.length} outbound · {group.return.length} return
        </p>
      </div>

      <div className="section">
        <h3>Outbound</h3>
        {group.outbound.map((f, i) => (
          <FlightCard key={`out-${i}`} flight={f} />
        ))}
      </div>

      <div className="section">
        <h3>Return</h3>
        {group.return.map((f, i) => (
          <FlightCard key={`ret-${i}`} flight={f} />
        ))}
      </div>
    </>
  );
}

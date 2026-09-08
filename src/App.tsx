import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { BOOKING_REFERENCE } from './data/itinerary';
import OverviewPage from './pages/OverviewPage';
import DayDetailPage from './pages/DayDetailPage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import WildlifePage from './pages/WildlifePage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import DocumentsPage from './pages/DocumentsPage';
import FlightsPage from './pages/FlightsPage';
import FlightDetailPage from './pages/FlightDetailPage';
import PackingListPage from './pages/PackingListPage';
import OfflineStatus from './components/OfflineStatus';
import OfflineBadge from './components/OfflineBadge';

const TABS = [
  { to: '/', icon: '🗓', label: 'Trip' },
  { to: '/destinations', icon: '🌍', label: 'Places' },
  { to: '/wildlife', icon: '🦁', label: 'Wildlife' },
  { to: '/documents', icon: '📄', label: 'Docs' },
];

/** Page title and whether a back button belongs in the header, keyed by route. */
function headerFor(pathname: string): { title: string; sub?: string; back: boolean } {
  if (pathname === '/') return { title: 'Ryan Safari', sub: BOOKING_REFERENCE, back: false };
  if (pathname.startsWith('/day/')) return { title: 'Day Detail', back: true };
  if (pathname === '/destinations') return { title: 'Destinations', back: false };
  if (pathname.startsWith('/destinations/')) return { title: 'Destination Guide', back: true };
  if (pathname === '/wildlife') return { title: 'Wildlife', sub: "Field guide & spotter's checklist", back: false };
  if (pathname.startsWith('/wildlife/')) return { title: 'Species Profile', back: true };
  if (pathname === '/documents') return { title: 'My Documents', back: false };
  if (pathname === '/flights') return { title: 'Our Flights', back: true };
  if (pathname.startsWith('/flights/')) return { title: 'Flight Detail', back: true };
  if (pathname === '/packing') return { title: 'Packing List', back: true };
  return { title: 'Ryan Safari', back: true };
}

function Menu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <div className="menu-wrap" ref={wrap}>
      <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="More pages">
        ☰
      </button>
      {open && (
        <nav className="menu-pop" onClick={() => setOpen(false)}>
          <Link to="/flights">✈️&nbsp;&nbsp;Our Flights</Link>
          <Link to="/packing">🎒&nbsp;&nbsp;Packing List</Link>
        </nav>
      )}
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { title, sub, back } = headerFor(pathname);

  // Every route change starts at the top, the way tapping into a detail screen did.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          {back && (
            <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
              ‹ Back
            </button>
          )}
          <h1>
            {title}
            {sub && <span className="sub">{sub}</span>}
          </h1>
          <OfflineBadge />
          <Menu />
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/day/:index" element={<DayDetailPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:id" element={<DestinationDetailPage />} />
          <Route path="/wildlife" element={<WildlifePage />} />
          <Route path="/wildlife/:id" element={<AnimalDetailPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/flights/:id" element={<FlightDetailPage />} />
          <Route path="/packing" element={<PackingListPage />} />
          <Route path="*" element={<OverviewPage />} />
        </Routes>
      </main>

      <OfflineStatus />

      <nav className="tabbar">
        <div className="tabbar-inner">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <span className="ico" aria-hidden="true">
                {t.icon}
              </span>
              {t.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

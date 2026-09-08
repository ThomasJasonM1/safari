/**
 * Airline and airport contacts, looked up from a day's actual flights.
 *
 * Every phone number here was taken from the airline's own website, not from a
 * search result. Searching for "<airline> customer service number" surfaces a
 * lot of SEO-spam pages carrying numbers that route to scam call centres, and a
 * wrong number in a travel app is worse than no number: someone stranded at a
 * gate will read out a booking reference to whoever answers. Where a number
 * could not be sourced from the airline's own domain, the entry carries only
 * the official contact URL.
 *
 * The URLs also earn their place beyond that. A US toll-free number is useless
 * from Johannesburg, and the airline's contact page lists the right number for
 * wherever the caller actually is.
 */

export interface Contact {
  name: string;
  phone?: string;
  /** Official contact page. Always on the airline's or airport's own domain. */
  url?: string;
  /** Short qualifier: which desk this is, or which country the number serves. */
  detail?: string;
}

interface AirlineEntry {
  /** Lower-case fragments tested against a flight's `carrier` string. */
  match: string[];
  contact: Contact;
}

export const AIRLINES: AirlineEntry[] = [
  {
    // Also catches "American Airlines (operated by BA 286)": the ticket is
    // American's, so American is who reissues it.
    match: ['american airlines'],
    contact: {
      name: 'American Airlines',
      phone: '+1 800 433 7300',
      detail: 'Reservations, US & Canada, 24 hrs',
      url: 'https://www.aa.com/i18n/customer-service/contact-american/american-customer-service.html',
    },
  },
  {
    // "operated by BA" catches the codeshares. British Airways is who is
    // actually at the gate, even when the ticket says AA.
    match: ['british airways', 'operated by ba'],
    contact: {
      name: 'British Airways',
      phone: '+1 800 247 9297',
      detail: 'US line, daily 07:00 to 01:00 ET',
      url: 'https://www.britishairways.com/content/en/us/information/help-and-contacts/contact-us',
    },
  },
  {
    match: ['turkish'],
    contact: {
      name: 'Turkish Airlines',
      phone: '+1 800 874 8875',
      detail: 'US call centre, 24/7',
      url: 'https://www.turkishairlines.com/en-int/any-questions/get-in-touch/',
    },
  },
  {
    match: ['airlink'],
    contact: {
      name: 'Airlink',
      phone: '+27 11 451 7300',
      detail: 'Reservations, select option 1',
      url: 'https://www.flyairlink.com/need-help/branch-contacts',
    },
  },
  {
    match: ['fastjet'],
    contact: {
      name: 'Fastjet',
      detail: 'Number not published on their site, use the contact page',
      url: 'https://www.fastjet.com/contact-us',
    },
  },
  {
    match: ['federal air'],
    contact: {
      name: 'Federal Air',
      phone: '+27 11 395 9000',
      detail: 'Charter operations',
    },
  },
  {
    match: ['wilderness air'],
    contact: {
      name: 'Wilderness Air Zimbabwe',
      phone: '+263 213 284 3371',
      detail: 'Charter operations',
    },
  },
];

/**
 * Airports keyed by IATA code. Websites rather than switchboards: an airport
 * switchboard rarely helps a passenger, whereas the site carries live
 * departures, terminal maps and transfer information.
 *
 * Bush airstrips (Kings Camp, Ruckomechi) are deliberately absent. There is
 * nothing to call; the charter operator above is the contact.
 */
export const AIRPORTS: Record<string, Contact> = {
  SFO: { name: 'San Francisco International', url: 'https://www.flysfo.com' },
  DFW: { name: 'Dallas Fort Worth International', url: 'https://www.dfwairport.com' },
  IAD: { name: 'Washington Dulles International', url: 'https://www.flydulles.com' },
  CDG: { name: 'Paris Charles de Gaulle', url: 'https://www.parisaeroport.fr/en' },
  LHR: { name: 'London Heathrow', url: 'https://www.heathrow.com' },
  IST: { name: 'Istanbul Airport', url: 'https://www.istairport.com/en' },
  CPT: { name: 'Cape Town International', url: 'https://www.airports.co.za/airports/cape-town-international' },
  JNB: { name: 'OR Tambo International', url: 'https://www.airports.co.za/airports/or-tambo-international' },
  MQP: { name: 'Kruger Mpumalanga International', url: 'https://www.kmiairport.co.za' },
};

/** All airline desks relevant to a set of flight carrier strings. */
export function airlinesFor(carriers: string[]): Contact[] {
  const out: Contact[] = [];
  for (const entry of AIRLINES) {
    const hit = carriers.some((c) => entry.match.some((m) => c.toLowerCase().includes(m)));
    if (hit) out.push(entry.contact);
  }
  return out;
}

/** All known airports touched by a set of IATA codes, in the order given. */
export function airportsFor(codes: string[]): Contact[] {
  const seen = new Set<string>();
  const out: Contact[] = [];
  for (const code of codes) {
    const airport = AIRPORTS[code];
    if (airport && !seen.has(code)) {
      seen.add(code);
      out.push({ ...airport, detail: code });
    }
  }
  return out;
}

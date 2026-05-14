export interface PersonalFlight {
  flightNumber: string;
  carrier: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  date: string;
  depart: string;
  arrive: string;
  note?: string;
}

export interface TravelerGroup {
  id: string;
  names: string;
  initials: string;
  color: string;
  outbound: PersonalFlight[];
  return: PersonalFlight[];
}

export const TRAVELER_GROUPS: TravelerGroup[] = [
  {
    id: 'tim-sally',
    names: 'Tim & Sally',
    initials: 'T&S',
    color: '#3B6E8C',
    outbound: [
      {
        flightNumber: 'AA 6791',
        carrier: 'American Airlines',
        from: 'London Heathrow',
        fromCode: 'LHR',
        to: 'Cape Town International',
        toCode: 'CPT',
        date: 'Sun 14 Sep',
        depart: 'TBC',
        arrive: '11:00',
        note: 'Early arrival — Sep 14. Early check-in at Commodore Hotel requested.',
      },
    ],
    return: [
      {
        flightNumber: 'AA 7105',
        carrier: 'American Airlines',
        from: 'OR Tambo International',
        fromCode: 'JNB',
        to: 'London Heathrow',
        toCode: 'LHR',
        date: 'Fri 25 Sep',
        depart: '21:15',
        arrive: '07:30 (26 Sep)',
        note: 'Check in by 18:15. Shared with Jason & Greg.',
      },
    ],
  },
  {
    id: 'jason-greg',
    names: 'Jason & Greg',
    initials: 'J&G',
    color: '#C4862A',
    outbound: [
      {
        flightNumber: 'AA 48',
        carrier: 'American Airlines',
        from: 'Dallas Fort Worth',
        fromCode: 'DFW',
        to: 'Paris Charles de Gaulle',
        toCode: 'CDG',
        date: 'Fri 11 Sep',
        depart: '15:05',
        arrive: '07:45 (12 Sep)',
        note: '2-night Paris layover before London connection.',
      },
      {
        flightNumber: 'BA 309',
        carrier: 'British Airways',
        from: 'Paris Charles de Gaulle',
        fromCode: 'CDG',
        to: 'London Heathrow',
        toCode: 'LHR',
        date: 'Sun 14 Sep',
        depart: '18:20',
        arrive: '18:35',
        note: 'Short hop to connect with BA 059 at LHR.',
      },
      {
        flightNumber: 'BA 059',
        carrier: 'British Airways',
        from: 'London Heathrow',
        fromCode: 'LHR',
        to: 'Cape Town International',
        toCode: 'CPT',
        date: 'Sun 14 Sep',
        depart: '22:30',
        arrive: '11:00 (15 Sep)',
        note: 'Overnight flight — arrives Cape Town Sep 15 at 11:00.',
      },
    ],
    return: [
      {
        flightNumber: 'AA 7105',
        carrier: 'American Airlines',
        from: 'OR Tambo International',
        fromCode: 'JNB',
        to: 'London Heathrow',
        toCode: 'LHR',
        date: 'Fri 25 Sep',
        depart: '21:15',
        arrive: '07:30 (26 Sep)',
        note: 'Check in by 18:15. Shared with Tim & Sally.',
      },
      {
        flightNumber: 'AA 21',
        carrier: 'American Airlines',
        from: 'London Heathrow',
        fromCode: 'LHR',
        to: 'Dallas Fort Worth',
        toCode: 'DFW',
        date: 'Sat 26 Sep',
        depart: '11:00',
        arrive: '15:10',
      },
    ],
  },
  {
    id: 'jon-stefanie',
    names: 'Jon & Stefanie',
    initials: 'J&S',
    color: '#2A7C6F',
    outbound: [
      {
        flightNumber: 'TBC',
        carrier: 'United Airlines',
        from: 'Washington Dulles',
        fromCode: 'IAD',
        to: 'Cape Town International',
        toCode: 'CPT',
        date: 'Mon 15 Sep',
        depart: 'TBC',
        arrive: '15:20',
        note: 'Flight number TBC. Colossal Aviapartner meet & greet on arrival.',
      },
    ],
    return: [
      {
        flightNumber: 'TBC',
        carrier: 'Turkish Airlines',
        from: 'OR Tambo International',
        fromCode: 'JNB',
        to: 'Washington Dulles',
        toCode: 'IAD',
        date: 'Fri 25 Sep',
        depart: '18:00',
        arrive: 'TBC',
        note: 'Flight number TBC. Check in by 15:00.',
      },
    ],
  },
];

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
        flightNumber: 'AA 6997',
        carrier: 'American Airlines (operated by BA 286)',
        from: 'San Francisco International',
        fromCode: 'SFO',
        to: 'London Heathrow',
        toCode: 'LHR',
        date: 'Sat 12 Sep',
        depart: '19:30',
        arrive: '13:55 +1',
        note: 'Overnight transatlantic, landing Heathrow early afternoon on Sun 13 Sep. Sold by American, flown by British Airways, so the gate screens will say BA 286.',
      },
      {
        flightNumber: 'AA 6791',
        carrier: 'American Airlines (operated by BA 059)',
        from: 'London Heathrow',
        fromCode: 'LHR',
        to: 'Cape Town International',
        toCode: 'CPT',
        date: 'Sun 13 Sep',
        depart: '22:30',
        arrive: '11:00 +1',
        note: 'About 8.5 hours at Heathrow first. This is the same nightly BA 059 that Jason & Greg take, just a day earlier. Lands Cape Town 11:00 on Mon 14 Sep, a day ahead of everyone else.',
      },
    ],
    return: [
      {
        flightNumber: 'AA 7105',
        carrier: 'American Airlines (operated by BA 54)',
        from: 'OR Tambo International',
        fromCode: 'JNB',
        to: 'London Heathrow',
        toCode: 'LHR',
        date: 'Fri 25 Sep',
        depart: '21:15',
        arrive: '07:30 +1',
        note: 'Check in by 18:15. Shared with Jason & Greg. Arrives Heathrow Terminal 5.',
      },
      {
        flightNumber: 'AA 6996',
        carrier: 'American Airlines (operated by BA 285)',
        from: 'London Heathrow',
        fromCode: 'LHR',
        to: 'San Francisco International',
        toCode: 'SFO',
        date: 'Sat 26 Sep',
        depart: '10:45',
        arrive: '13:50',
        note: 'A 3 hr 15 min connection at Heathrow. Jason & Greg are in the same terminal waiting on their 11:00 to Dallas, so there is time for breakfast together before everyone scatters.',
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
        date: 'Mon 14 Sep',
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
        date: 'Mon 14 Sep',
        depart: '22:30',
        arrive: '11:00 (15 Sep)',
        note: 'Overnight flight: arrives Cape Town Sep 15 at 11:00.',
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
        flightNumber: 'TK 8',
        carrier: 'Turkish Airlines',
        from: 'Washington Dulles',
        fromCode: 'IAD',
        to: 'Istanbul Airport',
        toCode: 'IST',
        date: 'Sun 13 Sep',
        depart: '21:15',
        arrive: '15:20 +1',
        note: 'Overnight transatlantic. Lands Istanbul mid-afternoon on Mon 14 Sep.',
      },
      {
        flightNumber: 'TK 38',
        carrier: 'Turkish Airlines',
        from: 'Istanbul Airport',
        fromCode: 'IST',
        to: 'OR Tambo International',
        toCode: 'JNB',
        date: 'Tue 15 Sep',
        depart: '01:40',
        arrive: '10:30',
        note: 'After about 10 hours in Istanbul, overnight. The aircraft carries on to Maputo, so listen for the Johannesburg call rather than the final destination.',
      },
      {
        flightNumber: 'TK 8685',
        carrier: 'Airlink (Turkish codeshare)',
        from: 'OR Tambo International',
        fromCode: 'JNB',
        to: 'Cape Town International',
        toCode: 'CPT',
        date: 'Tue 15 Sep',
        depart: 'TBC',
        arrive: '15:20',
        note: 'Operated by Airlink under a Turkish number, so airport screens may show the Airlink 4Z number instead. Colossal Aviapartner meet & greet on arrival.',
      },
    ],
    return: [
      {
        flightNumber: 'TK 43',
        carrier: 'Turkish Airlines',
        from: 'OR Tambo International',
        fromCode: 'JNB',
        to: 'Istanbul Airport',
        toCode: 'IST',
        date: 'Fri 25 Sep',
        depart: '18:00',
        arrive: '04:45 +1',
        note: 'Starts in Durban, so it arrives in Johannesburg already carrying passengers. Tight turn from Harare: 4Z 105 lands JNB at 15:15, leaving 2 hrs 45 min.',
      },
      {
        flightNumber: 'TK 187',
        carrier: 'Turkish Airlines',
        from: 'Istanbul Airport',
        fromCode: 'IST',
        to: 'Washington Dulles',
        toCode: 'IAD',
        date: 'Sat 26 Sep',
        depart: '07:40',
        arrive: '11:35',
        note: 'A 2 hr 55 min connection in Istanbul. Home by late morning on Sat 26 Sep.',
      },
    ],
  },
];

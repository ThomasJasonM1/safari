import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { ITINERARY, Flight, SUPPLIERS, DayEntry } from '../data/itinerary';
import { OverviewStackParamList } from '../navigation/TabNavigator';

type Route = RouteProp<OverviewStackParamList, 'DayDetail'>;

const HOTEL_SUPPLIER: Record<string, string> = {
  capeTown: 'Commodore Hotel',
  timbavati: 'Kings Camp',
  victoriaFalls: 'Palm River Hotel',
  manaPools: 'Wilderness Ruckomechi',
};

function getDayContacts(day: DayEntry) {
  const names = new Set<string>();
  names.add('Wilderness Emergency (After Hours)');
  names.add('TMAC (Operator)');
  if (HOTEL_SUPPLIER[day.destination]) names.add(HOTEL_SUPPLIER[day.destination]);
  if (day.destination === 'capeTown') names.add('Wilderness Touring Cape Town');
  if (day.flights && day.flights.length > 0 && day.destination !== 'transit') {
    names.add('Colossal Aviapartner');
    day.flights.forEach((f) => {
      if (f.carrier.toLowerCase().includes('federal air')) names.add('Federal Air');
      if (f.carrier.toLowerCase().includes('wilderness air')) names.add('Wilderness Air Zimbabwe');
    });
  }
  return SUPPLIERS.filter((s) => names.has(s.name));
}

const DEST_COLORS: Record<string, string> = {
  capeTown: colors.destinations.capeTown,
  timbavati: colors.destinations.timbavati,
  victoriaFalls: colors.destinations.victoriaFalls,
  manaPools: colors.destinations.manaPools,
  transit: colors.textMuted,
};

function FlightCard({ flight }: { flight: Flight }) {
  const isCharter = flight.type === 'charter';
  return (
    <View style={[styles.flightCard, isCharter && styles.flightCardCharter]}>
      <View style={styles.flightHeader}>
        <Ionicons name={isCharter ? 'airplane' : 'airplane-outline'} size={16} color={isCharter ? colors.destinations.timbavati : colors.primary} />
        <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
        <Text style={styles.flightCarrier}>{flight.carrier}</Text>
      </View>
      <View style={styles.flightRoute}>
        <View style={styles.flightEndpoint}>
          <Text style={styles.flightTime}>{flight.depart}</Text>
          <Text style={styles.flightCode}>{flight.fromCode}</Text>
          <Text style={styles.flightAirport} numberOfLines={2}>{flight.from}</Text>
        </View>
        <View style={styles.flightArrow}>
          <View style={styles.flightLine} />
          <Ionicons name="arrow-forward" size={14} color={colors.textMuted} />
        </View>
        <View style={[styles.flightEndpoint, { alignItems: 'flex-end' }]}>
          <Text style={styles.flightTime}>{flight.arrive}</Text>
          <Text style={styles.flightCode}>{flight.toCode}</Text>
          <Text style={[styles.flightAirport, { textAlign: 'right' }]} numberOfLines={2}>{flight.to}</Text>
        </View>
      </View>
      {flight.note && (
        <View style={styles.flightNote}>
          <Ionicons name="information-circle-outline" size={13} color={colors.textMuted} />
          <Text style={styles.flightNoteText}>{flight.note}</Text>
        </View>
      )}
    </View>
  );
}

export default function DayDetailScreen() {
  const route = useRoute<Route>();
  const day = ITINERARY[route.params.dayIndex];
  const accentColor = DEST_COLORS[day.destination] ?? colors.primary;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: accentColor }]}>
        <Text style={styles.dayLabel}>Day {day.dayNum}  ·  {day.dateShort}</Text>
        <Text style={styles.headline}>{day.headline}</Text>
        <Text style={styles.location}>{day.location}</Text>
      </View>

      {/* Hotel */}
      {day.hotel ? (
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Ionicons name="bed-outline" size={18} color={accentColor} />
            <Text style={styles.sectionTitle}>Accommodation</Text>
          </View>
          <Text style={styles.hotelName}>{day.hotel}</Text>
          {day.meals && <Text style={styles.meals}>{day.meals}</Text>}
        </View>
      ) : null}

      {/* Flights */}
      {day.flights && day.flights.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Ionicons name="airplane-outline" size={18} color={accentColor} />
            <Text style={styles.sectionTitle}>Flights & Transfers</Text>
          </View>
          {day.flights.map((f, i) => <FlightCard key={i} flight={f} />)}
        </View>
      )}

      {/* Activities */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Ionicons name="list-outline" size={18} color={accentColor} />
          <Text style={styles.sectionTitle}>Day Activities</Text>
        </View>
        {day.activities.map((a, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityDot, { backgroundColor: accentColor }]} />
            <Text style={styles.activityText}>{a}</Text>
          </View>
        ))}
      </View>

      {/* Insider tip */}
      {day.insiderTip && (
        <View style={[styles.tipBox, { borderLeftColor: accentColor }]}>
          <Text style={[styles.tipLabel, { color: accentColor }]}>Insider Tip</Text>
          <Text style={styles.tipText}>{day.insiderTip}</Text>
        </View>
      )}

      {/* Notes */}
      {day.notes && day.notes.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Ionicons name="alert-circle-outline" size={18} color={colors.textMuted} />
            <Text style={styles.sectionTitle}>Important Notes</Text>
          </View>
          {day.notes.map((n, i) => (
            <Text key={i} style={styles.noteText}>• {n}</Text>
          ))}
        </View>
      )}

      {/* Key contacts — filtered to this day's location and flights */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Ionicons name="call-outline" size={18} color={accentColor} />
          <Text style={styles.sectionTitle}>Key Contacts</Text>
        </View>
        {getDayContacts(day).map((s, i) => (
          <TouchableOpacity
            key={i}
            style={styles.contactRow}
            onPress={() => Linking.openURL(`tel:${s.phone.replace(/\s/g, '')}`)}
          >
            <Text style={styles.contactName}>{s.name}</Text>
            <Text style={styles.contactPhone}>{s.phone}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 32 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  dayLabel: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: '600', marginBottom: 4 },
  headline: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 4 },
  location: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  hotelName: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 4 },
  meals: { fontSize: 13, color: colors.textMuted },
  activityRow: { flexDirection: 'row', marginBottom: 8, gap: 10 },
  activityDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, flexShrink: 0 },
  activityText: { fontSize: 14, color: colors.text, lineHeight: 20, flex: 1 },
  tipBox: {
    backgroundColor: colors.surface,
    borderLeftWidth: 4,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
  },
  tipLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  tipText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  noteText: { fontSize: 13, color: colors.textMuted, marginBottom: 4, lineHeight: 18 },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactName: { fontSize: 13, color: colors.text, fontWeight: '500', flex: 1 },
  contactPhone: { fontSize: 13, color: colors.destinations.capeTown, fontWeight: '600' },
  flightCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  flightCardCharter: { borderColor: colors.destinations.timbavati + '44' },
  flightHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  flightNumber: { fontSize: 14, fontWeight: '700', color: colors.text },
  flightCarrier: { fontSize: 12, color: colors.textMuted },
  flightRoute: { flexDirection: 'row', alignItems: 'center' },
  flightEndpoint: { flex: 1 },
  flightTime: { fontSize: 20, fontWeight: '800', color: colors.text },
  flightCode: { fontSize: 13, fontWeight: '700', color: colors.textMuted, marginTop: 2 },
  flightAirport: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  flightArrow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
  flightLine: { flex: 1, height: 1, backgroundColor: colors.border },
  flightNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 5, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border },
  flightNoteText: { fontSize: 11, color: colors.textMuted, flex: 1, lineHeight: 16 },
});

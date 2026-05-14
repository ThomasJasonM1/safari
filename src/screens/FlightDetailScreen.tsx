import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { TRAVELER_GROUPS, PersonalFlight } from '../data/personalFlights';
import { OverviewStackParamList } from '../navigation/TabNavigator';
import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Route = RouteProp<OverviewStackParamList, 'FlightDetail'>;
type Nav = NativeStackNavigationProp<OverviewStackParamList, 'FlightDetail'>;

function FlightCard({ flight, accent }: { flight: PersonalFlight; accent: string }) {
  return (
    <View style={[styles.flightCard, { borderLeftColor: accent }]}>
      <View style={styles.flightTop}>
        <View style={styles.flightNumberRow}>
          <Ionicons name="airplane-outline" size={14} color={accent} />
          <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
          <Text style={styles.flightCarrier}>{flight.carrier}</Text>
        </View>
        <Text style={styles.flightDate}>{flight.date}</Text>
      </View>

      <View style={styles.flightRoute}>
        <View style={styles.endpoint}>
          <Text style={styles.time}>{flight.depart}</Text>
          <Text style={styles.code}>{flight.fromCode}</Text>
          <Text style={styles.airport} numberOfLines={2}>{flight.from}</Text>
        </View>
        <View style={styles.arrow}>
          <View style={styles.line} />
          <Ionicons name="arrow-forward" size={14} color={colors.textMuted} />
        </View>
        <View style={[styles.endpoint, { alignItems: 'flex-end' }]}>
          <Text style={styles.time}>{flight.arrive}</Text>
          <Text style={styles.code}>{flight.toCode}</Text>
          <Text style={[styles.airport, { textAlign: 'right' }]} numberOfLines={2}>{flight.to}</Text>
        </View>
      </View>

      {flight.note && (
        <View style={styles.noteRow}>
          <Ionicons name="information-circle-outline" size={13} color={colors.textMuted} />
          <Text style={styles.noteText}>{flight.note}</Text>
        </View>
      )}
    </View>
  );
}

export default function FlightDetailScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const group = TRAVELER_GROUPS.find((g) => g.id === route.params.groupId)!;

  useEffect(() => {
    navigation.setOptions({ title: group.names });
  }, [navigation, group]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Outbound */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="airplane-outline" size={16} color={group.color} />
          <Text style={[styles.sectionTitle, { color: group.color }]}>Outbound</Text>
          <Text style={styles.sectionSub}>To Cape Town</Text>
        </View>
        {group.outbound.map((f, i) => (
          <FlightCard key={i} flight={f} accent={group.color} />
        ))}
      </View>

      {/* Return */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons
            name="airplane-outline"
            size={16}
            color={colors.textMuted}
            style={{ transform: [{ scaleX: -1 }] }}
          />
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Return</Text>
          <Text style={styles.sectionSub}>Home from Johannesburg</Text>
        </View>
        {group.return.map((f, i) => (
          <FlightCard key={i} flight={f} accent={colors.textMuted} />
        ))}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: { fontSize: 15, fontWeight: '800' },
  sectionSub: { fontSize: 12, color: colors.textMuted, marginLeft: 2 },

  flightCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 3,
    padding: 14,
    marginBottom: 10,
  },
  flightTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  flightNumberRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  flightNumber: { fontSize: 14, fontWeight: '700', color: colors.text },
  flightCarrier: { fontSize: 12, color: colors.textMuted },
  flightDate: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },

  flightRoute: { flexDirection: 'row', alignItems: 'center' },
  endpoint: { flex: 1 },
  time: { fontSize: 22, fontWeight: '800', color: colors.text },
  code: { fontSize: 13, fontWeight: '700', color: colors.textMuted, marginTop: 2 },
  airport: { fontSize: 11, color: colors.textMuted, marginTop: 2, lineHeight: 15 },
  arrow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
  line: { flex: 1, height: 1, backgroundColor: colors.border },

  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  noteText: { flex: 1, fontSize: 11, color: colors.textMuted, lineHeight: 16 },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { DayEntry } from '../data/itinerary';

const DEST_COLORS: Record<string, string> = {
  capeTown: colors.destinations.capeTown,
  timbavati: colors.destinations.timbavati,
  victoriaFalls: colors.destinations.victoriaFalls,
  manaPools: colors.destinations.manaPools,
  transit: colors.textMuted,
};

const DEST_LABELS: Record<string, string> = {
  capeTown: 'Cape Town',
  timbavati: 'Timbavati',
  victoriaFalls: 'Victoria Falls',
  manaPools: 'Mana Pools',
  transit: 'In Transit',
};

interface Props {
  day: DayEntry;
  onPress: () => void;
}

export default function DayCard({ day, onPress }: Props) {
  const accentColor = DEST_COLORS[day.destination] ?? colors.primary;
  const hasFlight = (day.flights?.length ?? 0) > 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.accent, { backgroundColor: accentColor }]} />
      <View style={styles.body}>
        <View style={styles.header}>
          <View>
            <Text style={styles.dayNum}>{day.label ?? `Day ${day.dayNum}`}</Text>
            <Text style={styles.date}>{day.dateShort}</Text>
          </View>
          <View style={[styles.destBadge, { backgroundColor: accentColor + '22' }]}>
            <Text style={[styles.destLabel, { color: accentColor }]}>{DEST_LABELS[day.destination]}</Text>
          </View>
        </View>
        <Text style={styles.headline}>{day.headline}</Text>
        <Text style={styles.hotel} numberOfLines={1}>{day.hotel || 'In transit'}</Text>
        <View style={styles.footer}>
          {hasFlight && (
            <View style={styles.badge}>
              <Ionicons name="airplane-outline" size={12} color={colors.textMuted} />
              <Text style={styles.badgeText}> Flight day</Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={18} color={colors.textLight} style={styles.chevron} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  accent: {
    width: 5,
  },
  body: {
    flex: 1,
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  dayNum: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 1,
  },
  destBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  destLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  headline: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 3,
  },
  hotel: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  badgeText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  chevron: {
    marginLeft: 'auto',
  },
});

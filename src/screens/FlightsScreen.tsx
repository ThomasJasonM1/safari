import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { TRAVELER_GROUPS } from '../data/personalFlights';
import { OverviewStackParamList } from '../navigation/TabNavigator';

type Nav = NativeStackNavigationProp<OverviewStackParamList, 'FlightsList'>;

export default function FlightsScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.intro}>
        Personal flights for each couple — tap a card to see the full itinerary
        divided by outbound and return legs.
      </Text>

      {TRAVELER_GROUPS.map((group) => (
        <TouchableOpacity
          key={group.id}
          style={[styles.card, { borderLeftColor: group.color }]}
          onPress={() => navigation.navigate('FlightDetail', { groupId: group.id })}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.avatar, { backgroundColor: group.color }]}>
              <Text style={styles.avatarText}>{group.initials}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{group.names}</Text>
              <Text style={styles.cardSub}>
                {group.outbound.length} outbound · {group.return.length} return
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
          </View>

          {/* Mini flight summary */}
          <View style={styles.summaryRow}>
            <Ionicons name="airplane-outline" size={13} color={group.color} style={{ marginTop: 1 }} />
            <Text style={styles.summaryText} numberOfLines={1}>
              {group.outbound.map((f) => f.fromCode).join(' → ')} →{' '}
              {group.outbound[group.outbound.length - 1]?.toCode}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="airplane-outline" size={13} color={colors.textMuted} style={{ marginTop: 1, transform: [{ scaleX: -1 }] }} />
            <Text style={styles.summaryText} numberOfLines={1}>
              {group.return.map((f) => f.fromCode).join(' → ')} →{' '}
              {group.return[group.return.length - 1]?.toCode}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  intro: { fontSize: 14, color: colors.textMuted, lineHeight: 20, marginBottom: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    padding: 14,
    marginBottom: 12,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 12, fontWeight: '800', color: '#fff' },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardSub: { fontSize: 12, color: colors.textMuted, marginTop: 1 },
  summaryRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 4 },
  summaryText: { flex: 1, fontSize: 12, color: colors.textMuted },
});

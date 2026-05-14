import React from 'react';
import {
  View, Text, ScrollView, Image, StyleSheet,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { ANIMALS, ConservationStatus } from '../data/wildlife';
import { WildlifeStackParamList } from '../navigation/TabNavigator';

type Route = RouteProp<WildlifeStackParamList, 'AnimalDetail'>;

const STATUS_COLORS: Record<ConservationStatus, string> = {
  LC: colors.conservation.lc,
  NT: colors.conservation.nt,
  VU: colors.conservation.vu,
  EN: colors.conservation.en,
  CR: colors.conservation.cr,
};

const STATUS_BG: Record<ConservationStatus, string> = {
  LC: colors.conservation.lc + '18',
  NT: colors.conservation.nt + '18',
  VU: colors.conservation.vu + '18',
  EN: colors.conservation.en + '18',
  CR: colors.conservation.cr + '18',
};

const DEST_LABELS: Record<string, string> = {
  capeTown: 'Cape Town',
  timbavati: 'Timbavati / Kruger',
  victoriaFalls: 'Victoria Falls',
  manaPools: 'Mana Pools',
};

export default function AnimalDetailScreen() {
  const route = useRoute<Route>();
  const animal = ANIMALS.find((a) => a.id === route.params.animalId)!;
  const statusColor = STATUS_COLORS[animal.conservationStatus];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Photo */}
      <Image source={animal.image} style={styles.photo} resizeMode="cover" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.commonName}>{animal.commonName}</Text>
        <Text style={styles.sciName}>{animal.scientificName}</Text>
        <View style={[styles.statusPill, { backgroundColor: STATUS_BG[animal.conservationStatus] }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {animal.conservationStatus}  —  {animal.conservationLabel}
          </Text>
        </View>
        <View style={styles.destRow}>
          {animal.destinations.map((d) => (
            <View key={d} style={styles.destTag}>
              <Text style={styles.destTagText}>{DEST_LABELS[d]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bodyText}>{animal.description}</Text>
      </View>

      {/* Habitat */}
      <View style={styles.section}>
        <View style={styles.infoRow}>
          <Ionicons name="leaf-outline" size={16} color={colors.success} />
          <Text style={styles.infoLabel}>Habitat</Text>
        </View>
        <Text style={styles.bodyText}>{animal.habitat}</Text>
      </View>

      {/* Best spotting */}
      <View style={[styles.spotBox]}>
        <View style={styles.infoRow}>
          <Ionicons name="eye-outline" size={16} color={colors.destinations.timbavati} />
          <Text style={[styles.infoLabel, { color: colors.destinations.timbavati }]}>Best Spotting On This Trip</Text>
        </View>
        <Text style={styles.bodyText}>{animal.bestSpotting}</Text>
      </View>

      {/* Facts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Did You Know?</Text>
        {animal.facts.map((fact, i) => (
          <View key={i} style={styles.factRow}>
            <Text style={styles.factNum}>{i + 1}</Text>
            <Text style={styles.factText}>{fact}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 32 },
  photo: { width: '100%', height: 280 },
  header: {
    backgroundColor: colors.surface,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  commonName: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 2 },
  sciName: { fontSize: 15, color: colors.textMuted, fontStyle: 'italic', marginBottom: 10 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    gap: 6,
  },
  statusDot: { width: 7, height: 7, borderRadius: 3.5 },
  statusText: { fontSize: 12, fontWeight: '700' },
  destRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  destTag: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  destTagText: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
  },
  spotBox: {
    backgroundColor: colors.destinations.timbavati + '0D',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.destinations.timbavati + '33',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  infoLabel: { fontSize: 13, fontWeight: '700', color: colors.text },
  bodyText: { fontSize: 14, color: colors.text, lineHeight: 22 },
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  factNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
    flexShrink: 0,
  },
  factText: { fontSize: 14, color: colors.text, lineHeight: 20, flex: 1 },
});

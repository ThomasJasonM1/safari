import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, TextInput, SectionList, StyleSheet, TouchableOpacity,
  Modal, Animated, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { ANIMALS, Animal, ConservationStatus } from '../data/wildlife';
import { WildlifeStackParamList } from '../navigation/TabNavigator';

type Nav = NativeStackNavigationProp<WildlifeStackParamList, 'WildlifeList'>;

const DESTINATION_ORDER = ['capeTown', 'timbavati', 'victoriaFalls', 'manaPools'] as const;

const DESTINATION_LABELS: Record<string, string> = {
  capeTown: 'Cape Town, South Africa',
  timbavati: 'Timbavati / Kruger, South Africa',
  victoriaFalls: 'Victoria Falls, Zimbabwe',
  manaPools: 'Mana Pools, Zimbabwe',
};

const DESTINATION_SHORT: Record<string, string> = {
  capeTown: 'Cape Town',
  timbavati: 'Timbavati',
  victoriaFalls: 'Vic Falls',
  manaPools: 'Mana Pools',
};

const DEST_COLORS: Record<string, string> = {
  capeTown: colors.destinations.capeTown,
  timbavati: colors.destinations.timbavati,
  victoriaFalls: colors.destinations.victoriaFalls,
  manaPools: colors.destinations.manaPools,
};

const STATUS_COLORS: Record<ConservationStatus, string> = {
  LC: colors.conservation.lc,
  NT: colors.conservation.nt,
  VU: colors.conservation.vu,
  EN: colors.conservation.en,
  CR: colors.conservation.cr,
};

function storageKey(destId: string, animalId: string) {
  return `checklist_${destId}_${animalId}`;
}

// Pre-compute all checklist keys and per-destination animal lists once
const ANIMALS_BY_DEST: Record<string, Animal[]> = {};
DESTINATION_ORDER.forEach((destId) => {
  ANIMALS_BY_DEST[destId] = ANIMALS.filter((a) => a.destinations.includes(destId));
});

const ALL_KEYS = DESTINATION_ORDER.flatMap((destId) =>
  ANIMALS_BY_DEST[destId].map((a) => storageKey(destId, a.id))
);

// ─── Row component ────────────────────────────────────────────────────────────

function WildlifeRow({
  animal,
  destId,
  checked,
  onPress,
  onToggle,
}: {
  animal: Animal;
  destId: string;
  checked: boolean;
  onPress: () => void;
  onToggle: () => void;
}) {
  const accentColor = DEST_COLORS[destId];
  const statusColor = STATUS_COLORS[animal.conservationStatus];
  return (
    <View style={[styles.row, checked && styles.rowChecked]}>
      <TouchableOpacity style={styles.rowMain} onPress={onPress} activeOpacity={0.8}>
        <Image source={animal.image} style={styles.rowImage} resizeMode="cover" />
        <View style={styles.rowInfo}>
          <Text style={[styles.rowName, checked && styles.rowNameChecked]} numberOfLines={1}>
            {animal.commonName}
          </Text>
          <Text style={styles.rowSci} numberOfLines={1}>{animal.scientificName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {animal.conservationStatus}  {animal.conservationLabel}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.checkboxWrap}
        onPress={onToggle}
        hitSlop={{ top: 12, bottom: 12, left: 8, right: 12 }}
      >
        <View style={[styles.checkbox, checked && { backgroundColor: accentColor, borderColor: accentColor }]}>
          {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
        </View>
      </TouchableOpacity>
    </View>
  );
}

// ─── Section header with progress bar ────────────────────────────────────────

function DestSectionHeader({
  destId,
  shownCount,
  checkedCount,
  totalCount,
}: {
  destId: string;
  shownCount: number;
  checkedCount: number;
  totalCount: number;
}) {
  const accentColor = DEST_COLORS[destId];
  const pct = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;
  return (
    <View style={[styles.sectionHeader, { borderLeftColor: accentColor }]}>
      <View style={styles.sectionRow}>
        <View style={[styles.sectionDot, { backgroundColor: accentColor }]} />
        <View style={styles.sectionTextCol}>
          <Text style={styles.sectionTitle}>{DESTINATION_LABELS[destId]}</Text>
          <Text style={styles.sectionCount}>
            {shownCount === totalCount
              ? `${totalCount} species`
              : `${shownCount} shown · ${totalCount} total`}
          </Text>
        </View>
        <View style={styles.sectionProgress}>
          <Text style={[styles.sectionProgressNum, { color: accentColor }]}>{checkedCount}</Text>
          <Text style={styles.sectionProgressDenom}>/{totalCount} spotted</Text>
        </View>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: accentColor }]} />
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function WildlifeScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [celebrationDest, setCelebrationDest] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AsyncStorage.multiGet(ALL_KEYS)
      .then((pairs) => {
        const state: Record<string, boolean> = {};
        pairs.forEach(([key, value]) => { state[key] = value === 'true'; });
        setChecked(state);
      })
      .catch(() => {});
  }, []);

  const toggle = useCallback(
    async (destId: string, animalId: string) => {
      const key = storageKey(destId, animalId);
      const newValue = !checked[key];
      const newChecked = { ...checked, [key]: newValue };
      setChecked(newChecked);
      await AsyncStorage.setItem(key, newValue ? 'true' : 'false');

      if (newValue) {
        const destAnimals = ANIMALS_BY_DEST[destId];
        const allDone = destAnimals.every((a) => newChecked[storageKey(destId, a.id)]);
        if (allDone && destAnimals.length > 0) {
          triggerCelebration(destId);
        }
      }
    },
    [checked]
  );

  const triggerCelebration = (destId: string) => {
    setCelebrationDest(destId);
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
    setTimeout(() => {
      Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        setCelebrationDest(null);
      });
    }, 3000);
  };

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DESTINATION_ORDER.map((destId) => {
      const data = ANIMALS.filter(
        (a) =>
          a.destinations.includes(destId) &&
          (q === '' ||
            a.commonName.toLowerCase().includes(q) ||
            a.scientificName.toLowerCase().includes(q))
      );
      return { title: destId, data };
    }).filter((s) => s.data.length > 0);
  }, [query]);

  const totalVisible = sections.reduce((acc, s) => acc + s.data.length, 0);
  const totalCheckedAll = ALL_KEYS.filter((k) => checked[k]).length;

  const celebDest = celebrationDest ?? 'capeTown';
  const celebAnimals = ANIMALS_BY_DEST[celebDest];

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.headerArea}>
        <Text style={styles.title}>Wildlife Guide</Text>
        <Text style={styles.subtitle}>
          {totalVisible} species shown  ·  {totalCheckedAll} / {ALL_KEYS.length} spotted
        </Text>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="rgba(255,255,255,0.6)" />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search animals…"
            placeholderTextColor="rgba(255,255,255,0.45)"
            clearButtonMode="while-editing"
          />
        </View>
        <Text style={styles.hint}>Tap a row to read about an animal · tap ○ to mark it spotted</Text>
      </View>

      {/* ── List ── */}
      <SectionList
        sections={sections}
        keyExtractor={(item, i) => `${item.id}-${i}`}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) => {
          const destId = section.title;
          const all = ANIMALS_BY_DEST[destId] ?? [];
          const numChecked = all.filter((a) => checked[storageKey(destId, a.id)]).length;
          return (
            <DestSectionHeader
              destId={destId}
              shownCount={section.data.length}
              checkedCount={numChecked}
              totalCount={all.length}
            />
          );
        }}
        renderItem={({ item, section }) => (
          <WildlifeRow
            animal={item}
            destId={section.title}
            checked={!!checked[storageKey(section.title, item.id)]}
            onPress={() => navigation.navigate('AnimalDetail', { animalId: item.id })}
            onToggle={() => toggle(section.title, item.id)}
          />
        )}
        ListFooterComponent={<View style={{ height: 32 }} />}
      />

      {/* ── Celebration modal ── */}
      <Modal visible={celebrationDest !== null} transparent animationType="fade">
        <View style={styles.celebBg}>
          <Animated.View style={[styles.celebBox, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.celebEmoji}>🏆</Text>
            <Text style={styles.celebTitle}>All Spotted!</Text>
            <Text style={styles.celebBody}>
              You spotted all {celebAnimals?.length} species{'\n'}
              in {DESTINATION_SHORT[celebDest]}!
            </Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Header
  headerArea: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 2 },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 8,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#fff' },
  hint: { fontSize: 11, color: 'rgba(255,255,255,0.45)', textAlign: 'center' },

  // Section header
  sectionHeader: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    borderLeftWidth: 4,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 10 },
  sectionDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  sectionTextCol: { flex: 1 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.text },
  sectionCount: { fontSize: 11, color: colors.textMuted, marginTop: 1 },
  sectionProgress: { flexDirection: 'row', alignItems: 'baseline' },
  sectionProgressNum: { fontSize: 16, fontWeight: '800' },
  sectionProgressDenom: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  progressTrack: { height: 4, backgroundColor: colors.border, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },

  // Animal row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  rowChecked: { opacity: 0.65 },
  rowMain: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  rowImage: { width: 80, height: 72 },
  rowInfo: { flex: 1, padding: 10, justifyContent: 'center' },
  rowName: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 2 },
  rowNameChecked: { color: colors.textMuted },
  rowSci: { fontSize: 11, color: colors.textMuted, fontStyle: 'italic', marginBottom: 5 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: '700' },
  checkboxWrap: { paddingHorizontal: 14, alignSelf: 'stretch', justifyContent: 'center' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Celebration
  celebBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  celebBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  celebEmoji: { fontSize: 56, marginBottom: 12 },
  celebTitle: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 8 },
  celebBody: { fontSize: 16, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
});

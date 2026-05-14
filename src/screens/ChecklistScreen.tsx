import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { ANIMALS, Animal } from '../data/wildlife';
import { DestinationId } from '../data/itinerary';

const DESTINATIONS: { id: DestinationId; label: string; short: string }[] = [
  { id: 'capeTown', label: 'Cape Town', short: 'CPT' },
  { id: 'timbavati', label: 'Timbavati', short: 'TIM' },
  { id: 'victoriaFalls', label: 'Vic Falls', short: 'VFA' },
  { id: 'manaPools', label: 'Mana Pools', short: 'MAN' },
];

const DEST_COLORS: Record<string, string> = {
  capeTown: colors.destinations.capeTown,
  timbavati: colors.destinations.timbavati,
  victoriaFalls: colors.destinations.victoriaFalls,
  manaPools: colors.destinations.manaPools,
};

function storageKey(destId: string, animalId: string) {
  return `checklist_${destId}_${animalId}`;
}

function ChecklistItem({
  animal,
  checked,
  onToggle,
}: {
  animal: Animal;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onToggle} activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
      </View>
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, checked && styles.itemNameChecked]}>{animal.commonName}</Text>
        <Text style={styles.itemSci}>{animal.scientificName}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ChecklistScreen() {
  const [activeDest, setActiveDest] = useState<DestinationId>('capeTown');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  const destAnimals = ANIMALS.filter((a) => a.destinations.includes(activeDest));
  const accentColor = DEST_COLORS[activeDest];

  useEffect(() => {
    loadChecked();
  }, [activeDest]);

  const loadChecked = useCallback(async () => {
    try {
      const keys = destAnimals.map((a) => storageKey(activeDest, a.id));
      const pairs = await AsyncStorage.multiGet(keys);
      const state: Record<string, boolean> = {};
      pairs.forEach(([key, value]) => {
        state[key] = value === 'true';
      });
      setChecked(state);
    } catch (e) {
      // silently ignore storage errors
    }
  }, [activeDest, destAnimals]);

  const toggle = useCallback(async (animalId: string) => {
    const key = storageKey(activeDest, animalId);
    const newValue = !checked[key];
    const newChecked = { ...checked, [key]: newValue };
    setChecked(newChecked);
    await AsyncStorage.setItem(key, newValue ? 'true' : 'false');

    // Check completion
    const total = destAnimals.length;
    const nowChecked = Object.values(newChecked).filter(Boolean).length;
    if (nowChecked === total && total > 0 && newValue) {
      triggerCelebration();
    }
  }, [activeDest, checked, destAnimals]);

  const triggerCelebration = () => {
    setShowCelebration(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
    setTimeout(() => {
      Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        setShowCelebration(false);
      });
    }, 3000);
  };

  const totalChecked = destAnimals.filter((a) => checked[storageKey(activeDest, a.id)]).length;
  const total = destAnimals.length;
  const progressPct = total > 0 ? (totalChecked / total) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Destination tabs */}
      <View style={styles.destTabs}>
        {DESTINATIONS.map((d) => {
          const animals = ANIMALS.filter((a) => a.destinations.includes(d.id));
          const dChecked = animals.filter((a) => checked[storageKey(d.id, a.id)]).length;
          const isActive = d.id === activeDest;
          return (
            <TouchableOpacity
              key={d.id}
              style={[styles.destTab, isActive && { borderBottomColor: DEST_COLORS[d.id], borderBottomWidth: 3 }]}
              onPress={() => setActiveDest(d.id)}
            >
              <Text style={[styles.destTabLabel, isActive && { color: DEST_COLORS[d.id] }]}>{d.short}</Text>
              <Text style={styles.destTabCount}>{dChecked}/{animals.length}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Progress bar */}
      <View style={styles.progressArea}>
        <View style={styles.progressRow}>
          <Text style={[styles.progressLabel, { color: accentColor }]}>
            {DESTINATIONS.find((d) => d.id === activeDest)?.label}
          </Text>
          <Text style={styles.progressCount}>{totalChecked} / {total} spotted</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` as any, backgroundColor: accentColor }]} />
        </View>
      </View>

      {/* List */}
      <FlatList
        data={destAnimals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChecklistItem
            animal={item}
            checked={!!checked[storageKey(activeDest, item.id)]}
            onToggle={() => toggle(item.id)}
          />
        )}
        ListFooterComponent={<View style={{ height: 24 }} />}
        contentContainerStyle={styles.list}
      />

      {/* Celebration modal */}
      <Modal visible={showCelebration} transparent animationType="fade">
        <View style={styles.celebrationBg}>
          <Animated.View style={[styles.celebrationBox, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.celebrationEmoji}>🏆</Text>
            <Text style={styles.celebrationTitle}>Complete!</Text>
            <Text style={styles.celebrationBody}>
              You spotted all {total} animals{'\n'}in {DESTINATIONS.find((d) => d.id === activeDest)?.label}!
            </Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  destTabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  destTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  destTabLabel: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' },
  destTabCount: { fontSize: 11, color: colors.textLight, marginTop: 2 },
  progressArea: {
    backgroundColor: colors.surface,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 15, fontWeight: '700' },
  progressCount: { fontSize: 14, color: colors.textMuted, fontWeight: '600' },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  list: { paddingTop: 8 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 3,
    borderRadius: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '600', color: colors.text },
  itemNameChecked: { color: colors.textMuted, textDecorationLine: 'line-through' },
  itemSci: { fontSize: 12, color: colors.textLight, fontStyle: 'italic', marginTop: 1 },
  celebrationBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebrationBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  celebrationEmoji: { fontSize: 56, marginBottom: 12 },
  celebrationTitle: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 8 },
  celebrationBody: { fontSize: 16, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
});

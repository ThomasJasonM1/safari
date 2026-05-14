import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, SectionList, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { PACKING_LIST } from '../data/packingList';

const ALL_KEYS = PACKING_LIST.flatMap((cat) =>
  cat.items.map((item) => `packing_${item.id}`)
);

export default function PackingListScreen() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    AsyncStorage.multiGet(ALL_KEYS).then((pairs) => {
      const state: Record<string, boolean> = {};
      pairs.forEach(([key, val]) => { state[key] = val === 'true'; });
      setChecked(state);
    }).catch(() => {});
  }, []);

  const toggle = useCallback(async (itemId: string) => {
    const key = `packing_${itemId}`;
    const newVal = !checked[key];
    setChecked((prev) => ({ ...prev, [key]: newVal }));
    await AsyncStorage.setItem(key, newVal ? 'true' : 'false');
  }, [checked]);

  const resetAll = () => {
    Alert.alert(
      'Reset Packing List',
      'Clear all ticked items?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            const cleared: Record<string, boolean> = {};
            ALL_KEYS.forEach((k) => { cleared[k] = false; });
            setChecked(cleared);
            await AsyncStorage.multiSet(ALL_KEYS.map((k) => [k, 'false']));
          },
        },
      ]
    );
  };

  const totalItems = ALL_KEYS.length;
  const totalChecked = ALL_KEYS.filter((k) => checked[k]).length;
  const pct = totalItems > 0 ? (totalChecked / totalItems) * 100 : 0;

  const sections = PACKING_LIST.map((cat) => ({ ...cat, data: cat.items }));

  return (
    <View style={styles.container}>
      {/* Overall progress header */}
      <View style={styles.headerArea}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Packing Checklist</Text>
            <Text style={styles.headerSub}>{totalChecked} of {totalItems} items packed</Text>
          </View>
          <TouchableOpacity onPress={resetAll} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Ionicons name="refresh-outline" size={22} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct}%` as any }]} />
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) => {
          const catChecked = section.items.filter((i) => checked[`packing_${i.id}`]).length;
          const allDone = catChecked === section.items.length;
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>{section.icon}</Text>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={[styles.sectionCount, allDone && styles.sectionCountDone]}>
                {catChecked}/{section.items.length}
              </Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          const isChecked = !!checked[`packing_${item.id}`];
          return (
            <TouchableOpacity
              style={[styles.item, isChecked && styles.itemChecked]}
              onPress={() => toggle(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <Ionicons name="checkmark" size={13} color="#fff" />}
              </View>
              <View style={styles.itemContent}>
                <Text style={[styles.itemLabel, isChecked && styles.itemLabelChecked]}>
                  {item.label}
                </Text>
                {item.notes && !isChecked && (
                  <Text style={styles.itemNotes}>{item.notes}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  headerArea: {
    backgroundColor: colors.primary,
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  progressTrack: { height: 5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.tabBarActive, borderRadius: 3 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  sectionIcon: { fontSize: 16 },
  sectionTitle: { flex: 1, fontSize: 13, fontWeight: '700', color: colors.text },
  sectionCount: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  sectionCountDone: { color: colors.success },

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  itemChecked: { opacity: 0.55 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: colors.success, borderColor: colors.success },
  itemContent: { flex: 1 },
  itemLabel: { fontSize: 14, color: colors.text, lineHeight: 20 },
  itemLabelChecked: { textDecorationLine: 'line-through', color: colors.textMuted },
  itemNotes: { fontSize: 11, color: colors.textMuted, lineHeight: 16, marginTop: 3 },
});

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { ITINERARY, BOOKING_REFERENCE, OPERATOR } from '../data/itinerary';
import DayCard from '../components/DayCard';
import { OverviewStackParamList } from '../navigation/TabNavigator';

type Nav = NativeStackNavigationProp<OverviewStackParamList, 'Overview'>;

const MENU_ITEMS = [
  { id: 'flights',  label: 'Our Flights',   icon: 'airplane-outline'   as const },
  { id: 'packing',  label: 'Packing List',  icon: 'bag-outline'        as const },
];

export default function OverviewScreen() {
  const navigation = useNavigation<Nav>();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setMenuOpen(true)}
          style={{ marginRight: 16 }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="menu-outline" size={26} color={colors.white} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleMenu = (id: string) => {
    setMenuOpen(false);
    if (id === 'packing') navigation.navigate('PackingList');
    if (id === 'flights') navigation.navigate('FlightsList');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ITINERARY}
        keyExtractor={(item) => `${item.date}-${item.label ?? item.dayNum}`}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Safari Journal</Text>
            <Text style={styles.subtitle}>South Africa & Zimbabwe</Text>
            <Text style={styles.dates}>14 – 25 September 2026  ·  6 Adults</Text>
            <View style={styles.refRow}>
              <Text style={styles.refLabel}>Ref: </Text>
              <Text style={styles.refValue}>{BOOKING_REFERENCE}</Text>
            </View>
            <Text style={styles.operator}>{OPERATOR}</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <DayCard
            day={item}
            onPress={() => navigation.navigate('DayDetail', { dayIndex: index })}
          />
        )}
        ListFooterComponent={<View style={{ height: 24 }} />}
        contentContainerStyle={styles.list}
      />

      {/* Hamburger menu dropdown */}
      <Modal visible={menuOpen} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setMenuOpen(false)} activeOpacity={1}>
          <View style={styles.dropdown}>
            {MENU_ITEMS.map((item, i) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, i < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
                onPress={() => handleMenu(item.id)}
                activeOpacity={0.7}
              >
                <Ionicons name={item.icon} size={18} color={colors.primary} />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={15} color={colors.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingTop: 0 },

  header: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: { fontSize: 28, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  subtitle: { fontSize: 16, color: colors.tabBarActive, fontWeight: '600', marginTop: 2 },
  dates: { fontSize: 14, color: '#D4C4A8', marginTop: 8 },
  refRow: { flexDirection: 'row', marginTop: 10 },
  refLabel: { fontSize: 12, color: '#A89878' },
  refValue: { fontSize: 12, color: '#D4C4A8', fontWeight: '600' },
  operator: { fontSize: 11, color: '#A89878', marginTop: 3 },

  // Menu
  overlay: { flex: 1 },
  dropdown: {
    position: 'absolute',
    top: 52,
    right: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
});

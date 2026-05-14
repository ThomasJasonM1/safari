import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Animal, ConservationStatus } from '../data/wildlife';

const STATUS_COLORS: Record<ConservationStatus, string> = {
  LC: colors.conservation.lc,
  NT: colors.conservation.nt,
  VU: colors.conservation.vu,
  EN: colors.conservation.en,
  CR: colors.conservation.cr,
};

interface Props {
  animal: Animal;
  onPress: () => void;
}

export default function AnimalCard({ animal, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={animal.image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.commonName}>{animal.commonName}</Text>
        <Text style={styles.sciName}>{animal.scientificName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[animal.conservationStatus] + '22' }]}>
          <Text style={[styles.statusText, { color: STATUS_COLORS[animal.conservationStatus] }]}>
            {animal.conservationStatus}  {animal.conservationLabel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 90,
    height: 80,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  commonName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  sciName: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
});

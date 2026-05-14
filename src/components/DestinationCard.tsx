import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Destination } from '../data/destinations';

const DEST_COLORS: Record<string, string> = {
  capeTown: colors.destinations.capeTown,
  timbavati: colors.destinations.timbavati,
  victoriaFalls: colors.destinations.victoriaFalls,
  manaPools: colors.destinations.manaPools,
};

interface Props {
  destination: Destination;
  onPress: () => void;
}

export default function DestinationCard({ destination, onPress }: Props) {
  const accentColor = DEST_COLORS[destination.id] ?? colors.primary;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <ImageBackground source={destination.image} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <View style={styles.meta}>
            <Text style={styles.country}>{destination.country}  ·  {destination.dates}</Text>
            <Text style={styles.nights}>{destination.nights} nights</Text>
          </View>
          <Text style={styles.name}>{destination.name}</Text>
          <Text style={styles.tagline} numberOfLines={2}>{destination.tagline}</Text>
          <View style={styles.footer}>
            <Ionicons name="bed-outline" size={13} color="rgba(255,255,255,0.75)" />
            <Text style={styles.hotel} numberOfLines={1}>{destination.hotel}</Text>
          </View>
        </View>
        <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
    height: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 14,
  },
  overlay: {
    backgroundColor: 'rgba(20,15,8,0.55)',
    padding: 16,
    paddingBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  country: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nights: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hotel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    flex: 1,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
});

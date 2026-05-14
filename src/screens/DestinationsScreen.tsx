import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import { DestinationsStackParamList } from '../navigation/TabNavigator';

type Nav = NativeStackNavigationProp<DestinationsStackParamList, 'DestinationsList'>;

export default function DestinationsScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Destinations</Text>
        <Text style={styles.subtitle}>4 incredible locations · 10 nights</Text>
      </View>
      {DESTINATIONS.map((d) => (
        <DestinationCard
          key={d.id}
          destination={d}
          onPress={() => navigation.navigate('DestinationDetail', { destinationId: d.id })}
        />
      ))}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 16 },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: { fontSize: 26, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
});

import React, { useState } from 'react';
import {
  View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { DESTINATIONS } from '../data/destinations';
import { DestinationsStackParamList } from '../navigation/TabNavigator';

type Route = RouteProp<DestinationsStackParamList, 'DestinationDetail'>;

const DEST_COLORS: Record<string, string> = {
  capeTown: colors.destinations.capeTown,
  timbavati: colors.destinations.timbavati,
  victoriaFalls: colors.destinations.victoriaFalls,
  manaPools: colors.destinations.manaPools,
};

type TabId = 'overview' | 'history' | 'landscape' | 'tips' | 'phrases';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'history', label: 'History' },
  { id: 'landscape', label: 'Landscape' },
  { id: 'tips', label: 'Tips' },
  { id: 'phrases', label: 'Phrases' },
];

export default function DestinationDetailScreen() {
  const route = useRoute<Route>();
  const destination = DESTINATIONS.find((d) => d.id === route.params.destinationId)!;
  const accentColor = DEST_COLORS[destination.id] ?? colors.primary;
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <View style={styles.container}>
      {/* Hero image */}
      <ImageBackground source={destination.image} style={styles.hero}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroCountry}>{destination.country}  ·  {destination.dates}  ·  {destination.nights} nights</Text>
          <Text style={styles.heroName}>{destination.name}</Text>
          <Text style={styles.heroTagline}>{destination.tagline}</Text>
        </View>
        <View style={[styles.heroAccent, { backgroundColor: accentColor }]} />
      </ImageBackground>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, activeTab === tab.id && { color: accentColor }]}>
              {tab.label}
            </Text>
            {activeTab === tab.id && <View style={[styles.tabIndicator, { backgroundColor: accentColor }]} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'overview' && (
          <>
            <Text style={styles.hotelLabel}>
              <Ionicons name="bed-outline" size={14} color={colors.textMuted} /> {destination.hotel}
            </Text>
            <Text style={styles.bodyText}>{destination.overview}</Text>
            <Text style={styles.sectionTitle}>Highlights</Text>
            {destination.highlights.map((h, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={[styles.bullet, { backgroundColor: accentColor }]} />
                <Text style={styles.bulletText}>{h}</Text>
              </View>
            ))}
            <View style={[styles.tipBox, { borderLeftColor: accentColor }]}>
              <Text style={[styles.tipLabel, { color: accentColor }]}>Insider Tip</Text>
              <Text style={styles.tipText}>{destination.insiderTip}</Text>
            </View>
          </>
        )}

        {activeTab === 'history' && (
          <>
            <Text style={styles.sectionTitle}>History & Culture</Text>
            <Text style={styles.bodyText}>{destination.history}</Text>
          </>
        )}

        {activeTab === 'landscape' && (
          <>
            <Text style={styles.sectionTitle}>The Landscape</Text>
            <Text style={styles.bodyText}>{destination.landscape}</Text>
          </>
        )}

        {activeTab === 'tips' && (
          <>
            <Text style={styles.sectionTitle}>Practical Tips — September Travel</Text>
            {destination.practicalTips.map((tip, i) => (
              <View key={i} style={styles.tipCard}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipBody}>{tip.body}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === 'phrases' && (
          <>
            <Text style={styles.sectionTitle}>Useful Local Phrases</Text>
            <Text style={styles.phrasesIntro}>
              A few words in the local language go a long way — locals appreciate the effort enormously.
            </Text>
            {destination.localPhrases.map((p, i) => (
              <View key={i} style={styles.phraseCard}>
                <Text style={[styles.phraseLang, { color: accentColor }]}>{p.language}</Text>
                <Text style={styles.phraseWord}>{p.phrase}</Text>
                <Text style={styles.phrasePronun}>/{p.pronunciation}/</Text>
                <Text style={styles.phraseMeaning}>{p.meaning}</Text>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { height: 220, justifyContent: 'flex-end' },
  heroOverlay: {
    backgroundColor: 'rgba(20,15,8,0.52)',
    padding: 16,
    paddingBottom: 14,
  },
  heroAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 4 },
  heroCountry: { fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  heroName: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  heroTagline: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, position: 'relative' },
  tabActive: {},
  tabLabel: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  tabIndicator: { position: 'absolute', bottom: 0, left: 8, right: 8, height: 2, borderRadius: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  hotelLabel: { fontSize: 13, color: colors.textMuted, marginBottom: 12 },
  bodyText: { fontSize: 15, color: colors.text, lineHeight: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 8, marginBottom: 12 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 8, flexShrink: 0 },
  bulletText: { fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },
  tipBox: {
    backgroundColor: colors.surfaceAlt,
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 14,
    marginTop: 16,
  },
  tipLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  tipText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipIcon: { fontSize: 22, marginTop: 2 },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 4 },
  tipBody: { fontSize: 13, color: colors.textMuted, lineHeight: 19 },
  phrasesIntro: { fontSize: 14, color: colors.textMuted, marginBottom: 16, lineHeight: 20 },
  phraseCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  phraseLang: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  phraseWord: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 2 },
  phrasePronun: { fontSize: 13, color: colors.textMuted, fontStyle: 'italic', marginBottom: 4 },
  phraseMeaning: { fontSize: 14, color: colors.text },
});

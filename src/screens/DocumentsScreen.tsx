import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Linking, Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Bundled documents that are pre-loaded for all users on first launch
const BUNDLED_DOCS: { id: string; name: string; asset: number }[] = [
  {
    id: 'itinerary-bundled',
    name: 'Safari Itinerary — Ryan Party Sep 2026.pdf',
    asset: require('../../assets/documents/safari-itinerary.pdf'),
  },
];

const STORAGE_KEY = 'safari_documents_v1';
const DOC_DIR = FileSystem.documentDirectory + 'safari_docs/';

interface StoredDoc {
  id: string;
  name: string;
  uri: string;
  size: number;
  mimeType: string;
  dateAdded: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso;
  }
}

function mimeIcon(mimeType: string): keyof typeof Ionicons.glyphMap {
  if (mimeType === 'application/pdf') return 'document-text-outline';
  if (mimeType.startsWith('image/')) return 'image-outline';
  return 'document-outline';
}

export default function DocumentsScreen() {
  const [docs, setDocs] = useState<StoredDoc[]>([]);

  useEffect(() => {
    ensureDir().then(() => {
      loadDocs().then((existing) => preloadBundledDocs(existing ?? []));
    });
  }, []);

  const ensureDir = async () => {
    const info = await FileSystem.getInfoAsync(DOC_DIR);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(DOC_DIR, { intermediates: true });
    }
  };

  const loadDocs = async (): Promise<StoredDoc[]> => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed: StoredDoc[] = raw ? JSON.parse(raw) : [];
      setDocs(parsed);
      return parsed;
    } catch {
      setDocs([]);
      return [];
    }
  };

  const preloadBundledDocs = async (existing: StoredDoc[]) => {
    const existingIds = new Set(existing.map((d) => d.id));
    const toAdd: StoredDoc[] = [];

    for (const bundled of BUNDLED_DOCS) {
      if (existingIds.has(bundled.id)) continue;
      try {
        const asset = Asset.fromModule(bundled.asset);
        await asset.downloadAsync();
        if (!asset.localUri) continue;
        const destUri = DOC_DIR + bundled.name;
        await FileSystem.copyAsync({ from: asset.localUri, to: destUri });
        const info = await FileSystem.getInfoAsync(destUri);
        toAdd.push({
          id: bundled.id,
          name: bundled.name,
          uri: destUri,
          size: (info as any).size ?? 0,
          mimeType: 'application/pdf',
          dateAdded: new Date().toISOString(),
        });
      } catch {}
    }

    if (toAdd.length > 0) {
      const merged = [...toAdd, ...existing];
      setDocs(merged);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
  };

  const saveDocs = async (newDocs: StoredDoc[]) => {
    setDocs(newDocs);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDocs));
  };

  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      await ensureDir();
      const destUri = DOC_DIR + asset.name;
      await FileSystem.copyAsync({ from: asset.uri, to: destUri });

      const newDoc: StoredDoc = {
        id: Date.now().toString(),
        name: asset.name,
        uri: destUri,
        size: asset.size ?? 0,
        mimeType: asset.mimeType ?? 'application/octet-stream',
        dateAdded: new Date().toISOString(),
      };
      await saveDocs([newDoc, ...docs]);
    } catch (e: any) {
      Alert.alert('Error', 'Could not import document. Please try again.');
    }
  }, [docs]);

  const openDoc = useCallback(async (doc: StoredDoc) => {
    try {
      const supported = await Linking.canOpenURL(doc.uri);
      if (supported) {
        await Linking.openURL(doc.uri);
      } else {
        Alert.alert('Cannot Open', 'No app installed to open this file type.');
      }
    } catch {
      Alert.alert('Error', 'Could not open document.');
    }
  }, []);

  const deleteDoc = useCallback((doc: StoredDoc) => {
    Alert.alert(
      'Delete Document',
      `Remove "${doc.name}" from this device?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(doc.uri, { idempotent: true });
            } catch {}
            await saveDocs(docs.filter((d) => d.id !== doc.id));
          },
        },
      ]
    );
  }, [docs]);

  return (
    <View style={styles.container}>
      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Ionicons name="lock-closed-outline" size={16} color={colors.textMuted} />
        <Text style={styles.disclaimerText}>
          Documents are stored only on this device. Nothing is uploaded or shared anywhere.
        </Text>
      </View>

      {/* Add button */}
      <TouchableOpacity style={styles.addButton} onPress={pickDocument} activeOpacity={0.8}>
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Document</Text>
      </TouchableOpacity>

      {/* Examples hint */}
      {docs.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="folder-open-outline" size={56} color={colors.border} />
          <Text style={styles.emptyTitle}>No Documents Yet</Text>
          <Text style={styles.emptyBody}>
            Add PDFs or photos of your passport, visa, travel insurance, flight confirmation, or vaccination records.
          </Text>
        </View>
      )}

      {/* Document list */}
      <FlatList
        data={docs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.docRow} onPress={() => openDoc(item)} activeOpacity={0.75}>
            <View style={styles.docIcon}>
              <Ionicons name={mimeIcon(item.mimeType)} size={28} color={colors.primary} />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.docMeta}>
                {formatBytes(item.size)}  ·  Added {formatDate(item.dateAdded)}
              </Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteDoc(item)} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 32 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    margin: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disclaimerText: { flex: 1, fontSize: 13, color: colors.textMuted, lineHeight: 18 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    paddingVertical: 13,
    gap: 8,
  },
  addButtonText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.textMuted, marginTop: 16, marginBottom: 8 },
  emptyBody: { fontSize: 14, color: colors.textLight, textAlign: 'center', lineHeight: 21 },
  list: { paddingHorizontal: 16 },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  docIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: { flex: 1 },
  docName: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 3 },
  docMeta: { fontSize: 12, color: colors.textMuted },
  deleteBtn: { padding: 4 },
});

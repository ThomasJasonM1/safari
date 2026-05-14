# Safari Journal — Claude Code Context

## Project Summary

A fully offline React Native (Expo SDK 54, managed workflow) travel companion app for the **Ryan Party** South Africa & Zimbabwe safari, **September 15–25, 2026**. Booking ref: Ryan x 6 — 927743. Operator: The Malcolm Ainscough Collection (TMAC).

Six adults. Zero connectivity required after install. No backend, no login, no server.

**Five tabs:**
| Tab | Screen(s) | Description |
|-----|-----------|-------------|
| Trip | Overview + Day Detail | Day-by-day itinerary, flight cards, hotel info, supplier tap-to-call |
| Destinations | Guide + Detail | Cape Town, Timbavati, Victoria Falls, Mana Pools — history, tips, phrases |
| Wildlife | Field Guide + Detail | 27 species, searchable by name, grouped by destination |
| Checklist | Spotter's Checklist | Per-destination checklist with AsyncStorage persistence + completion celebration |
| Documents | My Documents | Per-device document vault (passport, visa, insurance, etc.) |

---

## ⚠️ Image Status — Action Required

All 31 image slots are filled, but **~14 wildlife images and ~2 destination images are placeholder copies** (one real download `cp`'d to fill missing slots). They show the wrong subject.

**To check which images are placeholders** (duplicates share identical file sizes):
```bash
for f in assets/images/wildlife/*.jpg; do stat -f"%z %N" "$f"; done | sort -n
for f in assets/images/destinations/*.jpg; do stat -f"%z %N" "$f"; done | sort -n
```
Files with identical sizes are copies of each other — at least one is a placeholder.

**To re-download all images** with fresh URLs:
```bash
npm run download-images
```

The script at `scripts/download-images.js` skips files that already exist and are >1 KB, so you must first remove the placeholders you want replaced, then re-run. Or delete all wildlife images and re-run:
```bash
rm assets/images/wildlife/*.jpg && npm run download-images
```

> **Note:** The current Unsplash URLs in `download-images.js` have a ~50% 404 rate. Before re-downloading, update the `WILDLIFE_IMAGES` array in that file with working photo URLs (Unsplash direct image URLs, Wikimedia Commons, or any publicly accessible JPEG link).

---

## Important Commands

```bash
# Start the dev server (scan QR code with Expo Go on iOS/Android)
npm start

# Download and cache all wildlife + destination images (run once at setup)
npm run download-images

# TypeScript check (no output = all clear)
npx tsc --noEmit

# Expo health check (should show 17/17 checks passed)
npx expo-doctor

# iOS simulator (requires Xcode)
npm run ios

# Android emulator (requires Android Studio)
npm run android
```

### EAS Production Builds
```bash
# Install EAS CLI (one-time)
npm install -g eas-cli && eas login

# iOS build (requires Apple Developer account — $99/year)
eas build --platform ios --profile production

# Android build (requires Google Play Console — $25 one-time)
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## Technical Decisions

### Expo SDK 54 (not 52)
Upgraded from SDK 52 → 54 because iOS Expo Go only supports the latest SDK. Peer dep conflict with `@types/react` required `--legacy-peer-deps` during install and pinning `@types/react` to `~19.1.10` in `package.json`.

### `expo-file-system/legacy` import
`expo-file-system` v19 (SDK 54) replaced its entire API with a class-based system (`File`, `Directory`, `Paths`). The old procedural API (`documentDirectory`, `copyAsync`, `deleteAsync`, etc.) still works but must be imported from `expo-file-system/legacy` — importing from `expo-file-system` directly causes TypeScript errors and runtime throws. See `src/screens/DocumentsScreen.tsx`.

### Fully offline — no runtime network calls
- All text content in `.ts` data files, imported at build time
- All images use `require()` so Expo bundles them via `assetBundlePatterns: ["**/*"]`
- AsyncStorage for mutable state (checklist ticks, document metadata)
- `expo-file-system` copies uploaded documents into the app's local document directory
- Zero `fetch()` calls anywhere in the app

### Multi-destination animals
Animals like hippo, crocodile, wild dog, and elephant appear at multiple destinations. Each `Animal` has a `destinations: DestinationId[]` array. The wildlife `SectionList` and checklist both filter with `a.destinations.includes(destId)`. Checklist keys are namespaced: `checklist_${destId}_${animalId}`.

### No custom fonts
Using system defaults (San Francisco on iOS, Roboto on Android) to avoid font loading complexity and ensure full offline reliability. `expo-font` is installed only as a peer dependency of `@expo/vector-icons`.

### Navigation structure
Three stacks (Overview, Destinations, Wildlife) inside a bottom tab navigator. Checklist and Documents are leaf screens with no sub-navigation, so they use `headerShown: true` directly on the tab screen rather than a wrapping stack.

### Image download script (not runtime fetching)
Images are downloaded once at dev time by `scripts/download-images.js`, committed to the repo, and bundled into the app binary. The script follows HTTP redirects but is intentionally simple (no `sharp` compression in the current version — images are fetched at Unsplash's pre-compressed sizes via query params).

---

## Key Files

| File | Purpose |
|------|---------|
| `src/data/itinerary.ts` | All 11 days, 7 flights, 4 hotels, 10 supplier contacts from PDF |
| `src/data/destinations.ts` | 4 destination guides (overview, history, tips, phrases, insider tip) |
| `src/data/wildlife.ts` | 27 animal profiles with conservation status, facts, trip-specific spotting tips |
| `src/navigation/TabNavigator.tsx` | Bottom tab + 3 stack navigators |
| `src/theme/colors.ts` | Earthy safari palette + per-destination accent colors + conservation status colors |
| `scripts/download-images.js` | One-time image download script — update URLs here if images are broken |
| `app.json` | Bundle ID `com.safariguide.ryanparty`, SDK config, asset patterns |

---

## Bundle IDs

| Platform | ID |
|----------|----|
| iOS | `com.safariguide.ryanparty` |
| Android | `com.safariguide.ryanparty` |

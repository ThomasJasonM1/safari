# Safari Journal — Claude Code Context

## Project Summary

A fully offline React Native (Expo SDK 54, managed workflow) travel companion app for the **Ryan Party** South Africa & Zimbabwe safari, **September 14–25, 2026** (Tim & Sally arrive Sep 14; main group Sep 15). Booking ref: Ryan x 6 — 927743. Operator: The Malcolm Ainscough Collection (TMAC).

Six adults across three couples. Zero connectivity required after install. No backend, no login, no server.

**Four tabs + hamburger menu:**
| Tab | Screen(s) | Description |
|-----|-----------|-------------|
| Trip | Overview → Day Detail | Day-by-day itinerary with flight cards, hotel info, per-day filtered contacts |
| Destinations | Guide → Detail | Cape Town, Timbavati, Victoria Falls, Mana Pools — Overview, History, Landscape, Tips, Phrases |
| Wildlife | Field Guide + Spotter's Checklist | 38 species, searchable, grouped by destination, inline checkbox spotter's checklist |
| Docs | My Documents | Per-device vault — TMAC itinerary PDF pre-bundled, user can add more |
| ☰ Menu | Flights → Detail, Packing List | Hamburger button in Trip header — personal flights per couple + 79-item packing checklist |

---

## The Six Travellers

| Couple | Origin | Outbound | Return |
|--------|--------|----------|--------|
| Tim & Sally | London (LHR) | AA 6791 LHR→CPT, arrives **Sep 14 11:00** (early) | AA 7105 JNB→LHR, Sep 25 21:15 |
| Jason & Greg | Dallas (DFW) | AA 48 DFW→CDG Sep 11; BA 309 CDG→LHR Sep 14; BA 059 LHR→CPT Sep 14 22:30, arrives Sep 15 11:00 | AA 7105 JNB→LHR Sep 25 21:15, then AA 21 LHR→DFW Sep 26 11:00 |
| Jon & Stefanie | Washington (IAD) | United IAD→CPT, arrives **Sep 15 15:20** (flight # TBC) | Turkish Airlines JNB→IAD, Sep 25 18:00 (flight # TBC) |

Tim & Sally + Jason & Greg share AA 7105 on the return. Jon & Stefanie's flight numbers are TBC — update `src/data/personalFlights.ts` when confirmed.

---

## Trip Itinerary at a Glance

| Date | Day | Entry label | Location | Hotel |
|------|-----|-------------|----------|-------|
| Sep 11 | Pre-Trip | Jason & Greg depart DFW | Dallas → Paris | — |
| Sep 12–13 | Paris Layover | Jason & Greg in Paris | Paris, France | — |
| Sep 14 | Early Arrival | Tim & Sally arrive CPT | Cape Town | Commodore Hotel |
| Sep 14 | London Connection | Jason & Greg CDG→LHR→CPT | In transit | — |
| Sep 15 | Day 1 | Arrive Cape Town | Cape Town | Commodore Hotel |
| Sep 16 | Day 2 | Cape Peninsula Discovery | Cape Town | Commodore Hotel |
| Sep 17 | Day 3 | Cape Winelands & Table Mountain | Cape Town | Commodore Hotel |
| Sep 18 | Day 4 | Fly to Kruger — Begin Safari | Timbavati | Kings Camp |
| Sep 19 | Day 5 | Full Day Safari — Timbavati | Timbavati | Kings Camp |
| Sep 20 | Day 6 | Full Day Safari — Timbavati | Timbavati | Kings Camp |
| Sep 21 | Day 7 | Fly to Victoria Falls | Victoria Falls | Palm River Hotel |
| Sep 22 | Day 8 | Victoria Falls Activities | Mana Pools | Wilderness Ruckomechi |
| Sep 23 | Day 9 | Full Day Mana Pools Safari | Mana Pools | Wilderness Ruckomechi |
| Sep 24 | Day 10 | Last Full Day at Mana Pools | Mana Pools | Wilderness Ruckomechi |
| Sep 25 | Day 11 | Depart for Home | Departing | — |

Charter flights (Federal Air, Wilderness Air Zimbabwe) are embedded in the relevant day entries.

---

## Important Commands

```bash
# Start the dev server (scan QR code with Expo Go on iOS/Android)
npm start

# TypeScript check (no output = all clear)
npx tsc --noEmit

# Expo health check
npx expo-doctor

# iOS simulator (requires Xcode)
npm run ios

# Android emulator (requires Android Studio)
npm run android

# Re-download wildlife/destination images (if any are missing or broken)
npm run download-images
```

### EAS Production Builds
```bash
npm install -g eas-cli && eas login
eas build --platform ios --profile production
eas build --platform android --profile production
eas submit --platform ios
eas submit --platform android
```

---

## Technical Decisions

### Expo SDK 54
Upgraded from SDK 52 → 54 so iOS Expo Go works. Required `--legacy-peer-deps` and pinning `@types/react` to `~19.1.10`.

### `expo-file-system/legacy` import
SDK 54 moved the procedural FileSystem API (`documentDirectory`, `copyAsync`, `deleteAsync`) to `expo-file-system/legacy`. Importing from `expo-file-system` directly causes TS errors and runtime throws.

### Combined Wildlife + Checklist
The old separate Checklist tab was merged into the Wildlife screen. A `SectionList` row now has two tap zones: left/centre navigates to `AnimalDetailScreen`, right side toggles the spotter's checkbox. The same `checklist_${destId}_${animalId}` AsyncStorage key format is used, so any data from the old Checklist tab is preserved. A celebration modal fires when all species in a destination are checked off.

### Per-day filtered contacts
`DayDetailScreen` computes which contacts are relevant using `getDayContacts(day)`:
- Always: Wilderness Emergency (After Hours) + TMAC
- By destination: the current hotel's number
- Cape Town days: Wilderness Touring Cape Town
- Any flight day (non-transit): Colossal Aviapartner, Federal Air, Wilderness Air Zimbabwe (as applicable)
- Transit days (`destination === 'transit'`): no safari contacts shown

### `transit` destination type
Pre-trip days (Paris layover, London connection) use `destination: 'transit'`. This renders a grey "In Transit" badge in the day card, suppresses lodge contacts, and uses `colors.textMuted` as the accent colour in the detail screen.

### `label` field on DayEntry
`DayEntry` has an optional `label?: string` field. When set, `DayCard` shows it instead of `"Day X"`. Used for: Early Arrival, London Connection, Pre-Trip, Paris Layover. Allows multiple entries on the same calendar date (two Sep 14 cards) without ambiguity.

### FlatList key uniqueness
`OverviewScreen` uses `keyExtractor={(item) => \`${item.date}-${item.label ?? item.dayNum}\`` }` so the two Sep 14 entries get distinct keys.

### Hamburger menu
`OverviewScreen` sets a `headerRight` button via `navigation.setOptions` in a `useEffect`. Tapping it shows a `Modal` dropdown positioned top-right with two items: Our Flights and Packing List. Both navigate within the `OverviewStack` (no separate tab needed).

### Navigation — no duplicate screen names
Stack root screens are named `DestinationsList` and `WildlifeList` (not `Destinations`/`Wildlife`) to avoid React Navigation's "same name nested" warning that appeared when stack and tab shared a name.

### New Architecture enabled
`app.json` has `"newArchEnabled": true`. The old `false` value caused a warning in Expo Go.

### Pre-bundled TMAC PDF
`assets/documents/safari-itinerary.pdf` is the real TMAC booking document (1 MB). `DocumentsScreen` loads it on first launch using `expo-asset` + `Asset.fromModule()` → copies to the app's local document directory so it appears in every device's Docs vault without the user doing anything. The `BUNDLED_DOCS` constant in `DocumentsScreen.tsx` controls which files are pre-loaded.

### Wildlife images — iNaturalist source
The 11 insect/spider/bug images (cape-rain-spider, table-mountain-scorpion, cape-baboon-spider, dung-beetle, giant-millipede, golden-orb-spider, mound-termite, mopane-worm, african-mantis, tsetse-fly, goliath-beetle) were sourced from iNaturalist open data (research-grade observations, CC-licensed) after Unsplash returned 404s for all insect queries. URLs are in `scripts/download-images.js`.

### Fully offline — zero runtime network calls
- All text in `.ts` data files, bundled at build time
- All images via `require()` → `assetBundlePatterns: ["**/*"]`
- AsyncStorage for checklist ticks, packing list ticks, and document metadata
- `expo-file-system/legacy` copies user-uploaded documents to the local app directory
- No `fetch()` anywhere in the app

---

## Key Files

| File | Purpose |
|------|---------|
| `src/data/itinerary.ts` | Full 15-entry itinerary (pre-trip + 11 safari days), flights, hotels, contacts |
| `src/data/destinations.ts` | 4 destination guides — Overview, History, Landscape, Tips (9 each), Phrases (10–13 each) |
| `src/data/wildlife.ts` | 38 animal profiles (27 mammals/birds + 11 insects/spiders) with conservation status, facts, spotting tips |
| `src/data/personalFlights.ts` | Personal flight itineraries per couple (Tim & Sally, Jason & Greg, Jon & Stefanie) |
| `src/data/packingList.ts` | 79-item packing checklist across 8 categories |
| `src/navigation/TabNavigator.tsx` | 4-tab navigator + OverviewStack (Overview, DayDetail, PackingList, FlightsList, FlightDetail) |
| `src/screens/OverviewScreen.tsx` | Trip list with hamburger menu (setOptions headerRight) |
| `src/screens/DayDetailScreen.tsx` | Day detail with per-day filtered contacts via getDayContacts() |
| `src/screens/WildlifeScreen.tsx` | Combined field guide + spotter's checklist (SectionList, AsyncStorage, celebration modal) |
| `src/screens/FlightsScreen.tsx` | Three couple cards linking to FlightDetailScreen |
| `src/screens/FlightDetailScreen.tsx` | Outbound + return flight cards per couple |
| `src/screens/PackingListScreen.tsx` | 79-item checklist with per-category progress, reset button |
| `src/screens/DocumentsScreen.tsx` | Document vault with BUNDLED_DOCS auto-load on first launch |
| `src/screens/DestinationDetailScreen.tsx` | 5-tab destination guide (Overview, History, Landscape, Tips, Phrases) |
| `src/theme/colors.ts` | Earthy palette + per-destination accents + conservation status colours |
| `assets/documents/safari-itinerary.pdf` | Real TMAC booking document (1 MB) — pre-bundled for all users |
| `scripts/download-images.js` | One-time image download script — update URLs here if images are broken |
| `app.json` | Bundle ID `com.safariguide.ryanparty`, newArchEnabled true, assetBundlePatterns |

---

## Wildlife — 38 Species

**Cape Town (5):** African Penguin, Cape Fur Seal, Southern Right Whale, Chacma Baboon, Rock Hyrax (Dassie)

**Timbavati / Kruger (16 + insects):** Lion, White Lion, Leopard, African Elephant, White Rhino, Cape Buffalo, Cheetah, African Wild Dog, Giraffe, Plains Zebra, Hippo, Nile Crocodile, Spotted Hyena, Warthog, Impala, Greater Kudu + Cape Baboon Spider, Dung Beetle, Giant Millipede, Golden Orb-Weaver Spider, African Mantis

**Victoria Falls (6):** Hippo, Nile Crocodile, Nile Monitor, African Fish Eagle + Giant Millipede, Golden Orb-Weaver Spider, African Mantis

**Mana Pools (13):** African Elephant, Lion, Leopard, African Wild Dog, Hippo, Nile Crocodile, Nile Monitor, Nyala, Waterbuck, Eland, Saddle-billed Stork, African Fish Eagle + Dung Beetle, Giant Millipede, Golden Orb-Weaver Spider, Mound Termite, Mopane Worm, Tsetse Fly, Goliath Beetle

**Cape Town insects (3):** Cape Rain Spider, Table Mountain Scorpion, Cape Baboon Spider

---

## Items Still TBC

- Jon & Stefanie's United Airlines flight number (IAD → CPT, Sep 15)
- Jon & Stefanie's Turkish Airlines flight number (JNB → IAD, Sep 25)
- Tim & Sally's AA 6791 departure time from LHR

Update `src/data/personalFlights.ts` and the corresponding `flights` arrays in `src/data/itinerary.ts` when these are confirmed.

---

## Bundle IDs

| Platform | ID |
|----------|----|
| iOS | `com.safariguide.ryanparty` |
| Android | `com.safariguide.ryanparty` |

# Safari Journal

A fully offline React Native (Expo) travel companion app for the Ryan Party's South Africa & Zimbabwe safari, September 15–25, 2026.

**Booking Reference:** Ryan x 6 — 927743  
**Operator:** The Malcolm Ainscough Collection (TMAC)

---

## Features

| Tab | Screen | Description |
|-----|--------|-------------|
| Trip | Overview + Day Detail | Day-by-day itinerary with flight cards, hotel details, activities, and supplier contacts |
| Destinations | Guide + Detail | Full guides for Cape Town, Timbavati, Victoria Falls & Mana Pools — with history, practical tips, and local phrases |
| Wildlife | Field Guide + Detail | 27 species across 4 destinations — searchable, with photos, conservation status, and trip-specific spotting tips |
| Checklist | Spotter's Checklist | Per-destination animal checklist with AsyncStorage persistence and completion celebration |
| Documents | My Documents | Upload, view, and delete local documents (passport, visa, insurance, etc.) — stored only on this device |

**100% offline** — all content is hardcoded, all images are bundled, zero network calls at runtime.

---

## Running Locally with Expo Go

### Prerequisites

- Node.js 18+
- Expo Go app on your iOS or Android device ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Download and compress wildlife images (run once)
npm run download-images

# 3. Start the development server
npm start
```

Scan the QR code with your device's camera (iOS) or the Expo Go app (Android).

### Testing Offline Mode

After the app loads once in Expo Go, enable airplane mode — the app will continue to work fully offline. All content and images are bundled.

---

## Building for Production with EAS

### Prerequisites

1. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```bash
   eas login
   ```

3. Configure EAS for this project:
   ```bash
   eas build:configure
   ```

### iOS Build (requires Apple Developer account — $99/year)

```bash
# Build for TestFlight / App Store
eas build --platform ios --profile production
```

This produces a `.ipa` file that you submit via EAS or Apple Transporter.

### Android Build (requires Google Play Console account — $25 one-time)

```bash
# Build for Google Play
eas build --platform android --profile production
```

This produces an `.aab` file for Google Play submission.

### Local preview build (no store submission)

```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

---

## Submitting to App Store and Google Play

### Apple App Store

1. Run the iOS production EAS build (above).
2. In App Store Connect, create a new app with bundle ID `com.safariguide.ryanparty`.
3. Fill in app name, description, screenshots, and privacy URL.
4. Upload the `.ipa` via EAS Submit or Apple Transporter.
5. Submit for review — Apple reviews typically take 24–48 hours.

```bash
# EAS can also handle submission automatically:
eas submit --platform ios
```

### Google Play

1. Run the Android production EAS build (above).
2. In the Google Play Console, create a new app.
3. Fill in store listing details, screenshots, and privacy policy.
4. Upload the `.aab` to the Internal Testing track first, then promote.

```bash
eas submit --platform android
```

---

## Project Structure

```
safari/
├── App.tsx                     # Root entry point
├── app.json                    # Expo config (bundle ID, icons, splash)
├── assets/
│   └── images/
│       ├── destinations/       # Cape Town, Timbavati, Victoria Falls, Mana Pools
│       └── wildlife/           # All 27 species photos
├── scripts/
│   └── download-images.js     # One-time image download script
└── src/
    ├── data/
    │   ├── itinerary.ts        # All 11 days + flights from the PDF
    │   ├── destinations.ts     # 4 destination guides
    │   └── wildlife.ts         # 27 animal profiles
    ├── navigation/
    │   └── TabNavigator.tsx    # Bottom tab + stack navigators
    ├── screens/                # 8 screens
    ├── components/             # Reusable card components
    └── theme/
        └── colors.ts           # Earthy safari palette
```

---

## Key Contacts (from itinerary)

| Supplier | Phone |
|----------|-------|
| Commodore Hotel | +27 11 806 6888 |
| Kings Camp | +27 13 751 1621 |
| Palm River Hotel | +263 83 28 44737 |
| Wilderness Ruckomechi | +27 11 257 5000 |
| Wilderness Emergency (After Hours) | +27 82 576 9173 |
| Federal Air | +27 11 395 9000 |
| Wilderness Air Zimbabwe | +263 213 284 3371 |

---

## License

MIT — for personal use by the Ryan Party, September 2026.

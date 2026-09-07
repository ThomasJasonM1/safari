# Safari Journal — Claude Code Context

## Project Summary

A **static website** (Vite + React + TypeScript) for the **Ryan Party** South Africa & Zimbabwe safari, **September 14–25, 2026** (Tim & Sally arrive Sep 14; main group Sep 15). Booking ref: Ryan x 6 — 927743. Operator: The Malcolm Ainscough Collection (TMAC).

Six adults across three couples. No backend, no login, no server, no analytics. Every per-person action — spotter's ticks, packing ticks, saved documents — is stored in that browser and nowhere else.

> **This was a React Native / Expo app until September 2026.** It was converted to a plain static site; all Expo, React Native and EAS code was removed. If you find advice referring to `expo`, `AsyncStorage`, `expo-file-system`, `app.json`, tab navigators or EAS builds, it is stale — see git history at `bb7bbc2` and earlier.

**Four tabs + hamburger menu:**

| Tab | Route | Description |
|-----|-------|-------------|
| Trip | `/` → `/day/:index` | 15 itinerary entries with flight cards, hotel info, per-day filtered contacts |
| Places | `/destinations` → `/destinations/:id` | Cape Town, Timbavati, Victoria Falls, Mana Pools — Overview, History, Landscape, Tips, Phrases |
| Wildlife | `/wildlife` → `/wildlife/:id` | 50 species, searchable, grouped by destination, inline spotter's checkbox |
| Docs | `/documents` | Bundled trip PDFs + per-browser personal documents |
| ☰ Menu | `/flights`, `/flights/:id`, `/packing` | Per-couple flights + 73-item packing checklist |

---

## Important Commands

```bash
npm install
npm run dev        # vite dev server on :5173
npm run build      # typecheck + static build to dist/
npm run build:private   # same, but also bundles docs-private/ — see below
npm run preview    # serve the built dist/
npm run typecheck  # tsc --noEmit

node scripts/fetch-wikimedia-images.mjs [--force]  # (re)fetch species photos
node scripts/compress-images.mjs                   # downscale/re-encode in place
```

---

## Technical Decisions

### Vite, relative base, HashRouter
`vite.config.ts` sets `base: './'` and `src/main.tsx` uses `HashRouter`. Together these mean the built `dist/` runs from any subpath — GitHub Pages project site, S3 prefix, subfolder — with no server-side rewrite rules for deep links. Do not switch to `BrowserRouter` without also committing to a host that can rewrite deep links to `index.html`.

It still needs an HTTP server. Vite emits `<script type="module" crossorigin>`, which browsers refuse to load over `file://`, so `dist/index.html` opened directly off disk renders an empty page. Use `npm run preview` or any static server.

### Storage split — localStorage vs IndexedDB
- `src/lib/storage.ts` — small JSON sets in `localStorage` under a `safari:` prefix (`safari:spotted`, `safari:packing`). Every read/write is try/caught so private browsing or full storage degrades to "does not persist" rather than a crash.
- `src/lib/documents.ts` — user-added files in **IndexedDB**, because a passport scan or signed invoice blows straight past the ~5 MB localStorage ceiling. Blobs are stored directly; `personalDocUrl()` hands back an object URL the caller must revoke.

### Checklists persist in an effect, not in the state updater
Both `WildlifePage` and `PackingListPage` use a functional `setState` updater plus a separate `useEffect` that writes to storage. Writing inside the updater loses ticks: React may invoke an updater more than once per commit, and two taps in the same frame reading the same snapshot clobber each other. This was a real observed bug — three rapid ticks persisted as two.

### Spotter's tick ids are scoped per destination
`` `${destId}:${animalId}` ``. Ticking a lion in the Timbavati must not silently tick the lion off at Mana Pools.

### Images resolved by filename, not `import`
Data files store a bare filename (`image: 'lion.jpg'`). `src/lib/images.ts` turns the folder into a filename → hashed-URL map with `import.meta.glob(..., { eager: true, query: '?url' })`. Keeps the data files plain and diffable; nothing is fetched at runtime.

### Two-tier document bundling
`scripts/build-docs.mjs` runs as `prebuild`/`predev`. It copies PDFs into `public/docs/` and generates `src/data/bundledDocs.ts` (both gitignored).

| Folder | Committed | `npm run build` | `npm run build:private` |
|--------|-----------|-----------------|--------------------------|
| `docs-bundled/` | yes | yes | yes |
| `docs-private/` | **no** | **no** | yes |

**The TMAC invoice lives in `docs-private/` and must not be committed or shipped in a public build** — it carries the full bank account number, IBAN and SWIFT code. The intended route for travellers who need it is the Documents page's *Add a document* button, which keeps it in their own browser.

### Wildlife images come from Wikipedia/Wikimedia, not Unsplash
`scripts/fetch-wikimedia-images.mjs` pulls each photo from the species' own Wikipedia article and records photographer + licence in `src/data/imageCredits.json`, displayed on each species page. Where the lead image is the wrong subspecies or region (helmeted guineafowl, cheetah, cape fur seal, mopane worm, dung beetle, mound termite, goliath beetle) the map holds an explicit `{ commonsFile, title }` instead.

The earlier Unsplash keyword-search approach produced confidently wrong images — a white rabbit as "baboon", a stock photo of hands on a tablet as "nyala", a leopard as "cheetah", a welder as "crocodile", King penguins as "African penguin". **Do not re-source images by keyword search.** Wikimedia rate-limits anonymous bursts; the script backs off and retries, and a `--force` run may need a second pass.

### Per-day filtered contacts
`DayDetailPage.getDayContacts(day)`:
- Always: Wilderness Emergency (After Hours) + TMAC
- The current destination's hotel
- Cape Town days: Wilderness Touring Cape Town
- Any flight day that is not `transit`: Colossal Aviapartner, plus Federal Air / Wilderness Air Zimbabwe by carrier match

### `transit` destination and the `label` field
Pre-trip days (Paris layover, London connection) use `destination: 'transit'`, which renders a grey badge and suppresses lodge contacts. `DayEntry.label` overrides the "Day X" display so two entries can share Sep 14 unambiguously.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/data/itinerary.ts` | 15-entry itinerary, flights, hotels, `SUPPLIERS`, booking ref |
| `src/data/destinations.ts` | 4 destination guides |
| `src/data/wildlife.ts` | 50 species profiles |
| `src/data/personalFlights.ts` | Per-couple flight itineraries |
| `src/data/packingList.ts` | 73 items across 8 categories |
| `src/data/imageCredits.json` | Generated — photographer/licence per image |
| `src/data/bundledDocs.ts` | **Generated** by `scripts/build-docs.mjs`, gitignored |
| `src/lib/storage.ts` | localStorage helpers |
| `src/lib/documents.ts` | IndexedDB document vault |
| `src/lib/images.ts` | filename → bundled URL resolver |
| `src/App.tsx` | Routes, top bar, hamburger, bottom tab bar |
| `src/index.css` | The whole stylesheet |
| `src/theme/colors.ts` | Palette, per-destination accents, `accentFor()` |
| `scripts/build-docs.mjs` | Two-tier PDF bundling |
| `scripts/fetch-wikimedia-images.mjs` | Species photo sourcing + attribution |
| `scripts/compress-images.mjs` | In-place downscale/re-encode |

---

## Wildlife — 50 species

Species are tagged with every destination they genuinely occur at, so totals overlap.

**Cape Town (14):** African Penguin, Cape Fur Seal, Southern Right Whale, Chacma Baboon, Rock Hyrax, Common Eland, Common Ostrich, Bontebok, Cape Sugarbird, African Oystercatcher, Helmeted Guineafowl, Cape Rain Spider, Table Mountain Scorpion, Cape Baboon Spider

**Timbavati (30):** Lion, White Lion, Leopard, Elephant, White Rhino, Cape Buffalo, Cheetah, Wild Dog, Southern Giraffe, Plains Zebra, Hippo, Nile Crocodile, Nile Monitor, Spotted Hyena, Warthog, Impala, Greater Kudu, Chacma Baboon, Vervet Monkey, Banded Mongoose, Blue Wildebeest, Common Ostrich, Lilac-breasted Roller, Southern Ground Hornbill, Helmeted Guineafowl + Dung Beetle, Giant Millipede, Golden Orb-Web Spider, Mound Termite, African Mantis

**Victoria Falls (25):** Elephant, Cape Buffalo, Southern Giraffe, Plains Zebra, Hippo, Nile Crocodile, Nile Monitor, Warthog, Impala, Greater Kudu, Waterbuck, Bushbuck, Chacma Baboon, Vervet Monkey, Banded Mongoose, African Fish Eagle, Lilac-breasted Roller, Southern Carmine Bee-eater, Helmeted Guineafowl + Dung Beetle, Giant Millipede, Golden Orb-Web Spider, Mound Termite, Mopane Worm, African Mantis

**Mana Pools (33):** Lion, Leopard, Elephant, Cape Buffalo, Wild Dog, Spotted Hyena, Hippo, Nile Crocodile, Nile Monitor, Warthog, Impala, Greater Kudu, Nyala, Waterbuck, Bushbuck, Common Eland, Plains Zebra, Chacma Baboon, Vervet Monkey, Banded Mongoose, Saddle-billed Stork, African Fish Eagle, Lilac-breasted Roller, Southern Carmine Bee-eater, Helmeted Guineafowl + Dung Beetle, Giant Millipede, Golden Orb-Web Spider, Mound Termite, Mopane Worm, African Mantis, Tsetse Fly, Southern Goliath Beetle

### Deliberate absences — do not "fix" these
- **Southern giraffe is not tagged to Mana Pools.** Giraffe are genuinely absent from the Zambezi valley floor.
- **Cheetah, white rhino and blue wildebeest are Timbavati-only.** None of the three occur at Ruckomechi.
- **Plains zebra is tagged to Mana Pools with an explicit caveat** that it is uncommon on the Ruckomechi floodplain.
- **Tsetse fly is Mana Pools only** — that is where it actually bites.

### Taxonomy and status notes
- African penguin is **CR**, uplisted by IUCN/BirdLife in October 2024. Not EN.
- Cape buffalo is **NT** (IUCN 2019). Not LC.
- Giraffe is **Southern Giraffe / _Giraffa giraffa_** following the IUCN four-species split of August 2025.
- The goliath beetle here is **_Goliathus albosignatus_** (~4–5 cm, southern Africa). _G. goliatus_ — the 11 cm one in most guidebooks — is West/Central African and does not occur on this itinerary.
- The mound builder is **_Macrotermes natalensis_**, not the West African _M. bellicosus_.
- Dung beetle genus is **_Pachylomera_**, not _Pachylomerus_.
- Fish eagle is **_Icthyophaga vocifer_**, moved from _Haliaeetus_.

---

## Items Still TBC

- Jon & Stefanie's United flight number (IAD → CPT, Sep 15)
- Jon & Stefanie's Turkish Airlines flight number (JNB → IAD, Sep 25)
- Tim & Sally's AA 6791 departure time from LHR
- **Charter baggage allowance.** The packing list used to assert 7 kg. TMAC's packing PDF says "usually 40 lb per person" and defers to the itinerary; the itinerary defers to an *Important Travel Information* document not in hand. The packing item now says to confirm with TMAC rather than stating a number — do not put a figure back without a source.

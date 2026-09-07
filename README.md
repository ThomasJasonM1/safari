# Safari Journal

A static website for the Ryan Party's South Africa & Zimbabwe safari, **14–25 September 2026**.

**Booking reference:** Ryan x 6 — 927743
**Operator:** The Malcolm Ainscough Collection (TMAC)

No backend, no accounts, no analytics. Everything a person does on the site — ticking off a species, packing an item, saving a document — is stored in that person's own browser and goes nowhere else.

---

## Pages

| Tab | Page | What's on it |
|-----|------|--------------|
| Trip | Overview → Day Detail | 15 itinerary entries with flights, hotels, activities and the phone numbers relevant to that day |
| Places | Destinations → Guide | Cape Town, Timbavati, Victoria Falls, Mana Pools — overview, history, landscape, tips, local phrases |
| Wildlife | Field guide + spotter's checklist | 50 species, searchable, grouped by destination, with a tick box per species per place |
| Docs | My Documents | The bundled trip PDFs, plus anything you add yourself |
| ☰ | Our Flights, Packing List | Per-couple flight itineraries and a 73-item packing checklist |

---

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Building

```bash
npm run build
```

Writes a self-contained static site to `dist/`. It uses relative asset paths and hash-based routing, so it works unchanged from a subdirectory — a GitHub Pages project site, an S3 prefix, a folder on an existing domain — with no server-side rewrites for deep links.

It does need to be served over HTTP, not opened straight off disk: Vite emits an ES module script, and browsers refuse to load those over `file://`. Any static server will do (`npm run preview`, `npx serve dist`, `python -m http.server`).

```bash
npm run preview   # serve the built dist/ locally
npm run typecheck # tsc --noEmit
```

---

## Documents, and the one that is deliberately missing

`scripts/build-docs.mjs` runs before every build. It copies PDFs into `public/docs/` and generates `src/data/bundledDocs.ts`, which the Documents page reads.

| Folder | Committed? | In `npm run build`? |
|--------|-----------|---------------------|
| `docs-bundled/` | yes | yes |
| `docs-private/` | **no** (gitignored) | **no** — only in `npm run build:private` |

`docs-bundled/` holds the TMAC itinerary and the TMAC recommended packing list.

**The TMAC invoice is not in this repo and is not in a normal build.** It contains the full bank account number, IBAN and SWIFT code, which should not sit on a publicly reachable URL. Two ways to get at it:

- **Per person, no rebuild:** open the site, go to Docs, and use *Add a document*. The file is stored in that browser's IndexedDB and never leaves the device. This is the intended route.
- **Private deployment only:** drop the PDF into `docs-private/` and run `npm run build:private`. Only do this if the resulting `dist/` is going somewhere that is not publicly reachable.

Anything a traveller adds through *Add a document* lives in IndexedDB — large files are fine, and nothing is uploaded.

---

## Wildlife images

`scripts/fetch-wikimedia-images.mjs` pulls each species photo from that species' own Wikipedia article (or, where the lead image is the wrong subspecies or region, a named Commons file), and records photographer and licence in `src/data/imageCredits.json`. The credit is displayed on each species page.

This replaced an earlier Unsplash keyword-search approach, which had produced a number of confidently wrong images — a white rabbit filed as "baboon", a stock photo of someone holding a tablet filed as "nyala", a leopard filed as "cheetah".

```bash
node scripts/fetch-wikimedia-images.mjs           # fill in anything missing
node scripts/fetch-wikimedia-images.mjs --force   # re-download everything
node scripts/compress-images.mjs                  # downscale + re-encode in place
```

Wikimedia rate-limits anonymous bursts, so the script backs off and retries; a full `--force` run takes a few minutes and may need a second pass.

---

## Still to be confirmed

- Jon & Stefanie's United flight number (IAD → CPT, Sep 15)
- Jon & Stefanie's Turkish Airlines flight number (JNB → IAD, Sep 25)
- Tim & Sally's AA 6791 departure time from LHR
- **Charter baggage allowance.** The packing list previously asserted a 7 kg limit. TMAC's own packing document says "usually 40 lb per person" and defers to the itinerary; the itinerary defers to a separate *Important Travel Information* document that is not in hand. Confirm with TMAC before packing.

Update `src/data/personalFlights.ts` and the matching `flights` arrays in `src/data/itinerary.ts` once the flight numbers are known.

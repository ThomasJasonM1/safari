# Ryan Safari

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

Writes a self-contained static site to `dist/`. Hash-based routing means deep links work with no server-side rewrite rules.

It must be served over HTTP(S), not opened off disk — Vite emits an ES module script and a service worker, and browsers allow neither over `file://`. Any static server will do (`npm run preview`, `npx serve dist`).

The build assumes it is served from the **root of a domain**, which is what Cloudflare Pages and a custom domain give you. To deploy under a subdirectory instead (a GitHub Pages *project* site, say), pass the path — trailing slash included:

```bash
BASE_PATH=/safari/ npm run build
```

### Deploying to Cloudflare

Cloudflare put Pages into maintenance mode, so this deploys as a **Worker with static assets**. `wrangler.jsonc` holds the config; there is no Worker script, so Cloudflare just serves `dist/`.

| Cloudflare build setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Version command | leave empty |

Locally:

```bash
npx wrangler deploy
```

```bash
npx wrangler dev
```

A service worker needs a concrete scope, so this has to be a real path rather than a relative `./` base. On Windows use PowerShell (`$env:BASE_PATH='/safari/'; npm run build`) — Git Bash rewrites a leading-slash value into a Windows path before Node ever sees it.

```bash
npm run preview   # serve the built dist/ locally
npm run typecheck # tsc --noEmit
```

---

## Offline

The site is a PWA. On the first visit it precaches **everything** — the app, all 54 photos and both trip PDFs, about 9 MB — and a green "Saved for offline use" banner confirms when that has finished. After that it works with no signal at all, which is the point: Kings Camp and Ruckomechi have little to no connectivity, and Mana Pools effectively none.

- **Online:** the browser checks for a new build on load, downloads it in the background, and swaps to it. No cache-clearing, no "hard refresh" instructions for anyone.
- **Offline:** everything is served from the cache, and a grey "Offline — showing the saved copy" marker appears so a stale page isn't mistaken for a live one.

Tell everyone to **open the site once on hotel wifi before flying**, and wait for the green banner. That is the whole ritual. On a phone, *Add to Home Screen* gives it an icon and a full-screen window; it works either way.

### Cache headers

`public/_headers` is read by Cloudflare (Workers static assets, and Pages). `index.html`, `sw.js`, `manifest.webmanifest` and the bundled PDFs are set to `no-cache` (revalidate every time) so a change pushed before departure is picked up on the next open; hashed files under `/assets/` are cached for a year, since a changed file gets a different URL.

Short TTLs there cost nothing offline — when there is no signal the worker serves from Cache Storage and never consults `Cache-Control` at all.

Two things that stay online-only by nature: `tel:` links need signal to actually dial, and a document someone adds to the Docs page lives only in that person's browser.

The service worker is disabled in `npm run dev` — an auto-updating worker in front of a Vite dev server is a good way to spend an afternoon debugging stale modules.

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
node scripts/make-icons.mjs                       # regenerate the PWA icon set
```

Wikimedia rate-limits anonymous bursts, so the script backs off and retries; a full `--force` run takes a few minutes and may need a second pass.

---

## Still to be confirmed

- Jon & Stefanie's United flight number (IAD → CPT, Sep 15)
- Jon & Stefanie's Turkish Airlines flight number (JNB → IAD, Sep 25)
- Tim & Sally's AA 6791 departure time from LHR
- **Charter baggage allowance.** The packing list previously asserted a 7 kg limit. TMAC's own packing document says "usually 40 lb per person" and defers to the itinerary; the itinerary defers to a separate *Important Travel Information* document that is not in hand. Confirm with TMAC before packing.

Update `src/data/personalFlights.ts` and the matching `flights` arrays in `src/data/itinerary.ts` once the flight numbers are known.

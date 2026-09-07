#!/usr/bin/env node
/**
 * Fetches species images from Wikipedia/Wikimedia Commons.
 *
 * Unsplash was the original source, but its search returns "something that looks
 * like an antelope" rather than a verified species. For newly added species we
 * pull the lead image from the species' own Wikipedia article instead, which is
 * curated and correctly identified, and record the CC attribution alongside it.
 *
 * Usage: node scripts/fetch-wikimedia-images.mjs
 */
import { writeFileSync, existsSync, mkdirSync, statSync, readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'src', 'assets', 'images', 'wildlife');
const CREDITS = join(root, 'src', 'data', 'imageCredits.json');
const UA = 'SafariJournal/2.0 (private family trip site; contact via repo owner)';

/** local image id -> English Wikipedia article title, or an explicit Commons file. */
const SPECIES = {
  // ── Cape Town ──
  'african-penguin': 'African penguin',
  // These articles have no usable lead image, so name the Commons file directly.
  'cape-fur-seal': { commonsFile: '129 Cape fur seal bull walking at Pelican point Photo by Giles Laurent.jpg', title: 'Brown fur seal' },
  'southern-right-whale': 'Southern right whale',
  'baboon': 'Chacma baboon',
  'dassie': 'Rock hyrax',
  'bontebok': 'Bontebok',
  'cape-sugarbird': 'Cape sugarbird',
  'african-black-oystercatcher': 'African oystercatcher',
  'common-ostrich': 'Common ostrich',

  // ── Big game ──
  'lion': 'Lion',
  'white-lion': 'White lion',
  'leopard': 'African leopard',
  'elephant': 'African bush elephant',
  'white-rhino': 'White rhinoceros',
  'buffalo': 'African buffalo',
  'cheetah': { commonsFile: 'Cheetah (Acinonyx jubatus) female.jpg', title: 'Southern African cheetah' },
  'wild-dog': 'African wild dog',
  'giraffe': 'Southern giraffe',
  'zebra': 'Plains zebra',
  'hippo': 'Hippopotamus',
  'crocodile': 'Nile crocodile',
  'hyena': 'Spotted hyena',
  'warthog': 'Common warthog',

  // ── Antelope & plains game ──
  'impala': 'Impala',
  'kudu': 'Greater kudu',
  'nyala': 'Nyala',
  'waterbuck': 'Waterbuck',
  'eland': 'Common eland',
  'bushbuck': 'Cape bushbuck',
  'blue-wildebeest': 'Blue wildebeest',

  // ── Smaller mammals ──
  'vervet-monkey': 'Vervet monkey',
  'banded-mongoose': 'Banded mongoose',

  // ── Birds & reptiles ──
  'african-fish-eagle': 'African fish eagle',
  'saddle-billed-stork': 'Saddle-billed stork',
  'lilac-breasted-roller': 'Lilac-breasted roller',
  'southern-ground-hornbill': 'Southern ground hornbill',
  'southern-carmine-bee-eater': 'Southern carmine bee-eater',
  'nile-monitor': 'Nile monitor',
  // Wikipedia's lead image is the East African reichenowi subspecies; use a
  // Kruger bird instead, which is what the group will actually see.
  'helmeted-guineafowl': { commonsFile: 'Numida meleagris -Kruger National Park, South Africa-8a.jpg', title: 'Helmeted guineafowl' },

  // ── Invertebrates ──
  'cape-rain-spider': 'Palystes superciliosus',
  'table-mountain-scorpion': 'Uroplectes',
  'cape-baboon-spider': 'Harpactira',
  // Species-article lead images here are museum plates or schematics; use a
  // live field photo of the right species instead.
  'dung-beetle': { commonsFile: 'Flattenened giant dung beetle (Pachylomera femoralis).jpg', title: 'Pachylomera femoralis' },
  'giant-millipede': 'Archispirostreptus gigas',
  'golden-orb-spider': 'Trichonephila senegalensis',
  'mound-termite': { commonsFile: 'Macrotermes natalensis 192187025.jpg', title: 'Macrotermes natalensis' },
  'mopane-worm': { commonsFile: 'Mopane worm on mopane tree.jpg', title: 'Mopane worm' },
  'african-mantis': 'Sphodromantis',
  'tsetse-fly': 'Tsetse fly',
  'goliath-beetle': { commonsFile: 'Goliathus albosignatus.JPG', title: 'Goliathus albosignatus' },
};

/** Re-download even if the file already exists: node scripts/fetch-wikimedia-images.mjs --force */
const FORCE = process.argv.includes('--force');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wikimedia rate-limits anonymous bursts, so back off and retry rather than
// dropping half the species on the floor.
const get = async (url, attempt = 1) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (r.status === 429 && attempt <= 5) {
    await sleep(2000 * attempt);
    return get(url, attempt + 1);
  }
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} for ${url}`);
  return r;
};

const strip = (html) =>
  (html ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

async function commonsFile(file, title) {
  const meta =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2' +
    '&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900' +
    `&titles=${encodeURIComponent('File:' + file)}`;
  const m = await (await get(meta)).json();
  const info = m.query?.pages?.[0]?.imageinfo?.[0];
  if (!info) throw new Error(`no commons info: ${file}`);
  const em = info.extmetadata ?? {};
  return {
    url: info.thumburl ?? info.url,
    file,
    title,
    artist: strip(em.Artist?.value) || 'Unknown',
    license: strip(em.LicenseShortName?.value) || 'See Commons',
    descriptionUrl: info.descriptionurl,
  };
}

async function leadImage(title) {
  const api =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2' +
    `&prop=pageimages&piprop=original|name&pithumbsize=900&titles=${encodeURIComponent(title)}`;
  const data = await (await get(api)).json();
  const page = data.query?.pages?.[0];
  if (!page || page.missing) throw new Error(`no wikipedia page: ${title}`);
  const file = page.pageimage;
  if (!file) throw new Error(`no lead image: ${title}`);

  const meta =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2' +
    '&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900' +
    `&titles=${encodeURIComponent('File:' + file)}`;
  const m = await (await get(meta)).json();
  const info = m.query?.pages?.[0]?.imageinfo?.[0];
  if (!info) throw new Error(`no commons info: ${file}`);
  const em = info.extmetadata ?? {};
  return {
    url: info.thumburl ?? info.url,
    file,
    artist: strip(em.Artist?.value) || 'Unknown',
    license: strip(em.LicenseShortName?.value) || 'See Commons',
    descriptionUrl: info.descriptionurl,
  };
}

mkdirSync(OUT, { recursive: true });
const credits = existsSync(CREDITS) ? JSON.parse(readFileSync(CREDITS, 'utf8')) : {};

for (const [id, title] of Object.entries(SPECIES)) {
  const dest = join(OUT, `${id}.jpg`);
  if (!FORCE && existsSync(dest) && statSync(dest).size > 1000 && credits[id]) {
    console.log(`  = ${id}.jpg (already present)`);
    continue;
  }
  try {
    const spec = typeof title === 'string' ? { title } : title;
    const img = spec.commonsFile
      ? await commonsFile(spec.commonsFile, spec.title)
      : await leadImage(spec.title);
    const buf = Buffer.from(await (await get(img.url)).arrayBuffer());
    writeFileSync(dest, buf);
    credits[id] = {
      source: 'Wikimedia Commons',
      title: spec.title,
      file: img.file,
      artist: img.artist,
      license: img.license,
      url: img.descriptionUrl,
    };
    await sleep(1200);
    console.log(`  + ${id}.jpg  (${(buf.length / 1024).toFixed(0)} KB)  ${img.license} — ${img.artist.slice(0, 40)}`);
  } catch (e) {
    console.error(`  ! ${id}: ${e.message}`);
  }
}

writeFileSync(CREDITS, JSON.stringify(credits, null, 2) + '\n');
console.log(`\nCredits written to src/data/imageCredits.json`);

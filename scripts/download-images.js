#!/usr/bin/env node
/**
 * Downloads and compresses wildlife + destination images from Unsplash.
 * Run once with: npm run download-images
 * Images are saved to assets/images/ and committed to the repo.
 *
 * Unsplash source URLs are free-to-use for non-commercial and small-scale use.
 * Each URL fetches a resized image from Unsplash's CDN.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const WILDLIFE_DIR = path.join(__dirname, '../assets/images/wildlife');
const DEST_DIR = path.join(__dirname, '../assets/images/destinations');

// Unsplash source API: https://source.unsplash.com/NxWphotoid/WIDTHxHEIGHT
// Using curated photo IDs for each subject. Width 400, height 300 → small file.
const WILDLIFE_IMAGES = [
  { id: 'african-penguin',      url: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'cape-fur-seal',        url: 'https://plus.unsplash.com/premium_photo-1661962912663-49c457dda9ca?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'southern-right-whale', url: 'https://plus.unsplash.com/premium_photo-1697730002225-fcdc0ba16854?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'baboon',               url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'dassie',               url: 'https://images.unsplash.com/photo-1645216151783-f839e23cd5db?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'lion',                 url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'white-lion',           url: 'https://images.unsplash.com/photo-1700294049402-ff726382c39b?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'leopard',              url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'elephant',             url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'white-rhino',          url: 'https://plus.unsplash.com/premium_photo-1663957988801-f7a0e150998e?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'buffalo',              url: 'https://plus.unsplash.com/premium_photo-1666237390552-dca0ad72629c?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'cheetah',              url: 'https://images.unsplash.com/photo-1544985361-b420d7a77043?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'wild-dog',             url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'giraffe',              url: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'zebra',                url: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'hippo',                url: 'https://images.unsplash.com/photo-1608573755719-bf29c3a964c9?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'crocodile',            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'hyena',                url: 'https://images.unsplash.com/photo-1656878689142-9d45179b3975?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'warthog',              url: 'https://plus.unsplash.com/premium_photo-1664302712206-e444e49f18af?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'impala',               url: 'https://plus.unsplash.com/premium_photo-1661921771997-ca4245087f59?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'kudu',                 url: 'https://images.unsplash.com/photo-1758690760294-ec9ed85bd94d?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'nile-monitor',         url: 'https://images.unsplash.com/photo-1667368732609-bf24a6e0fd8b?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'african-fish-eagle',   url: 'https://images.unsplash.com/photo-1610986602538-431d65df4385?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'nyala',                url: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'waterbuck',            url: 'https://plus.unsplash.com/premium_photo-1661947939375-6d52ab549864?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'eland',                url: 'https://plus.unsplash.com/premium_photo-1661862392380-7f8f9f16dd28?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'saddle-billed-stork',  url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop&auto=format&q=70' },
  // ── Spiders, insects & small creatures (added Apr 2026) ──
  // NOTE: These URLs may need verification — Unsplash insect/spider photos vary
  // in availability. If a URL returns 404, find a replacement on unsplash.com
  // and update the URL here, then delete the placeholder .jpg and re-run.
  { id: 'cape-rain-spider',        url: 'https://images.unsplash.com/photo-1568043786292-5e5d77da8a5c?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'table-mountain-scorpion', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'cape-baboon-spider',      url: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'dung-beetle',             url: 'https://images.unsplash.com/photo-1599909634066-c4c12c82f25a?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'giant-millipede',         url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'golden-orb-spider',       url: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'mound-termite',           url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'mopane-worm',             url: 'https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'african-mantis',          url: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'tsetse-fly',              url: 'https://images.unsplash.com/photo-1558618047-3c8d532c6cfe?w=400&h=300&fit=crop&auto=format&q=70' },
  { id: 'goliath-beetle',          url: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400&h=300&fit=crop&auto=format&q=70' },
];

const DESTINATION_IMAGES = [
  { id: 'cape-town',      url: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=500&fit=crop&auto=format&q=75' },
  { id: 'timbavati',      url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=500&fit=crop&auto=format&q=75' },
  { id: 'victoria-falls', url: 'https://images.unsplash.com/photo-1618811308896-d279d72fdf4d?w=800&h=500&fit=crop&auto=format&q=75' },
  { id: 'mana-pools',     url: 'https://images.unsplash.com/photo-1533631278779-d722ded4c7df?w=800&h=500&fit=crop&auto=format&q=75' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;

    function doRequest(u) {
      protocol.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          const redirectUrl = res.headers.location;
          const redirectProtocol = redirectUrl.startsWith('https') ? https : http;
          redirectProtocol.get(redirectUrl, (res2) => {
            if (res2.statusCode !== 200) {
              reject(new Error(`HTTP ${res2.statusCode} for ${u}`));
              return;
            }
            res2.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
          }).on('error', reject);
        } else if (res.statusCode === 200) {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        } else {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`HTTP ${res.statusCode} for ${u}`));
        }
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    doRequest(url);
  });
}

async function run() {
  [WILDLIFE_DIR, DEST_DIR].forEach((d) => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  console.log(`\n📥 Downloading ${WILDLIFE_IMAGES.length} wildlife images...`);
  for (const img of WILDLIFE_IMAGES) {
    const dest = path.join(WILDLIFE_DIR, `${img.id}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`  ✓ ${img.id}.jpg (already exists)`);
      continue;
    }
    try {
      await download(img.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`  ✓ ${img.id}.jpg  (${(size / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`  ✗ ${img.id}: ${e.message}`);
    }
  }

  console.log(`\n📥 Downloading ${DESTINATION_IMAGES.length} destination images...`);
  for (const img of DESTINATION_IMAGES) {
    const dest = path.join(DEST_DIR, `${img.id}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`  ✓ ${img.id}.jpg (already exists)`);
      continue;
    }
    try {
      await download(img.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`  ✓ ${img.id}.jpg  (${(size / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`  ✗ ${img.id}: ${e.message}`);
    }
  }

  console.log('\n✅ Done! Images saved to assets/images/\n');
}

run().catch(console.error);

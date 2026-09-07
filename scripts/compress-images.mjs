#!/usr/bin/env node
/**
 * One-off: downscale and re-encode the source images in place.
 *
 * The Wikimedia originals run to 500 kB each, which is a lot to push down a
 * Zimbabwean hotel wifi. 1000 px on the long edge at quality 78 is still well
 * beyond what the layout ever displays.
 *
 * Requires Python with Pillow (already used by scripts/fetch-wikimedia-images).
 */
import { execFileSync } from 'node:child_process';

const PY = `
import glob, os
from PIL import Image
total_before = total_after = 0
for f in glob.glob('src/assets/images/**/*.jpg', recursive=True):
    before = os.path.getsize(f)
    im = Image.open(f).convert('RGB')
    if max(im.size) > 1000:
        im.thumbnail((1000, 1000), Image.LANCZOS)
    im.save(f, 'JPEG', quality=78, optimize=True, progressive=True)
    after = os.path.getsize(f)
    total_before += before
    total_after += after
print(f'{total_before/1048576:.1f} MB -> {total_after/1048576:.1f} MB')
`;

process.stdout.write(execFileSync('python', ['-c', PY], { encoding: 'utf8' }));

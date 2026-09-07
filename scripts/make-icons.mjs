#!/usr/bin/env node
/**
 * Generates the PWA icon set into public/.
 *
 * A flat-topped acacia against a low sun. Everyone on this trip is pinning the
 * site to a home screen, so it is drawn at 2048 px and downscaled for clean
 * edges, and kept deliberately simple — fine branchwork turns to mush at 48 px.
 *
 * Requires Python with Pillow (same dependency as the image scripts).
 */
import { execFileSync } from 'node:child_process';

const PY = String.raw`
from PIL import Image, ImageDraw, ImageFilter

SS = 2048                  # supersample; downscaled at the end
DARK    = (34, 27, 17)
SKY_TOP = (46, 36, 24)
SKY_MID = (150, 82, 34)
SKY_LOW = (222, 146, 48)
SUN     = (247, 201, 92)

img = Image.new('RGB', (SS, SS), SKY_TOP)
d = ImageDraw.Draw(img)
horizon = int(SS * 0.845)

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

# Sky: dark overhead, hot at the horizon.
for y in range(horizon):
    t = y / horizon
    c = lerp(SKY_TOP, SKY_MID, t / 0.62) if t < 0.62 else lerp(SKY_MID, SKY_LOW, (t - 0.62) / 0.38)
    d.line([(0, y), (SS, y)], fill=c)

# Sun, with a soft atmospheric halo bled into the sky behind it.
cx, sun_cy, r = SS // 2, int(SS * 0.60), int(SS * 0.255)
halo = Image.new('RGB', (SS, SS), (0, 0, 0))
ImageDraw.Draw(halo).ellipse(
    [cx - int(r * 1.7), sun_cy - int(r * 1.7), cx + int(r * 1.7), sun_cy + int(r * 1.7)],
    fill=(120, 70, 26))
halo = halo.filter(ImageFilter.GaussianBlur(SS // 22))
img = Image.composite(
    Image.blend(img, Image.new('RGB', (SS, SS), SUN), 0.22), img,
    halo.convert('L').point(lambda v: min(255, v * 3)))
d = ImageDraw.Draw(img)
d.ellipse([cx - r, sun_cy - r, cx + r, sun_cy + r], fill=SUN)
d.rectangle([0, horizon, SS, SS], fill=DARK)

# Acacia: irregular flat crown from overlapping blobs, then a leaning trunk
# forking into a fan of four branches.
canopy_y = int(SS * 0.36)

def blob(ox, oy, w, h):
    d.ellipse([cx + ox - w, canopy_y + oy - h, cx + ox + w, canopy_y + oy + h], fill=DARK)

blob(0,                int(SS * 0.012), int(SS * 0.315), int(SS * 0.042))
blob(-int(SS * 0.13), -int(SS * 0.014), int(SS * 0.150), int(SS * 0.040))
blob( int(SS * 0.15), -int(SS * 0.008), int(SS * 0.140), int(SS * 0.036))
blob(-int(SS * 0.04), -int(SS * 0.040), int(SS * 0.135), int(SS * 0.038))
blob( int(SS * 0.06), -int(SS * 0.034), int(SS * 0.110), int(SS * 0.032))

base_w, top_w, fork, lean = int(SS * 0.026), int(SS * 0.011), int(SS * 0.60), int(SS * 0.012)
d.polygon([(cx - base_w, horizon), (cx + base_w, horizon),
           (cx + lean + top_w, fork), (cx + lean - top_w, fork)], fill=DARK)
for dx, dy, w in [(-int(SS * 0.235), int(SS * 0.045), 0.0130),
                  (-int(SS * 0.115), int(SS * 0.015), 0.0150),
                  ( int(SS * 0.055), int(SS * 0.010), 0.0150),
                  ( int(SS * 0.215), int(SS * 0.040), 0.0125)]:
    d.line([(cx + lean, fork), (cx + dx, canopy_y + dy)], fill=DARK, width=int(SS * w))

for size, name in [(192, 'pwa-192.png'), (512, 'pwa-512.png'),
                   (180, 'apple-touch-icon.png'), (48, 'favicon.png')]:
    img.resize((size, size), Image.LANCZOS).save('public/' + name)

# Maskable: inset so Android's circle/squircle crop cannot clip the tree.
#
# The margin is filled by replicating the inset image's edge pixels, not by a
# blurred copy underneath — the scene is a horizontal gradient over a solid
# ground band, so stretching its edge rows and columns extends it seamlessly.
# A blurred backdrop leaves a visible doubled horizon.
PAD = int(SS * 0.13)
inner_size = SS - PAD * 2
inner = img.resize((inner_size, inner_size), Image.LANCZOS)

m = Image.new('RGB', (SS, SS))
m.paste(inner, (PAD, PAD))
# Sides first, from the inset's outermost columns.
m.paste(inner.crop((0, 0, 1, inner_size)).resize((PAD, inner_size)), (0, PAD))
m.paste(inner.crop((inner_size - 1, 0, inner_size, inner_size)).resize((PAD, inner_size)), (SS - PAD, PAD))
# Then top and bottom, from the now full-width band.
band = m.crop((0, PAD, SS, SS - PAD))
m.paste(band.crop((0, 0, SS, 1)).resize((SS, PAD)), (0, 0))
m.paste(band.crop((0, band.height - 1, SS, band.height)).resize((SS, PAD)), (0, SS - PAD))

m.resize((512, 512), Image.LANCZOS).save('public/pwa-maskable-512.png')

print('wrote pwa-192, pwa-512, pwa-maskable-512, apple-touch-icon, favicon into public/')
`;

process.stdout.write(execFileSync('python', ['-c', PY], { encoding: 'utf8' }));

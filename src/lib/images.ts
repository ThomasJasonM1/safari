/**
 * Resolves the `image` filename stored on each animal / destination record to a
 * hashed URL emitted by the bundler.
 *
 * The data files deliberately store a bare filename rather than an import so the
 * content stays plain, diffable data. Vite's glob import turns the whole folder
 * into a filename -> URL map at build time, so nothing is fetched at runtime.
 */
const wildlife = import.meta.glob('../assets/images/wildlife/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const destinations = import.meta.glob('../assets/images/destinations/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function index(mod: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, url] of Object.entries(mod)) {
    out[path.slice(path.lastIndexOf('/') + 1)] = url;
  }
  return out;
}

const WILDLIFE = index(wildlife);
const DESTINATIONS = index(destinations);

export function wildlifeImage(file: string): string | undefined {
  return WILDLIFE[file];
}

export function destinationImage(file: string): string | undefined {
  return DESTINATIONS[file];
}

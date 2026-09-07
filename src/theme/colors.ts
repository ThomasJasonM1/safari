export const colors = {
  background: '#FAF6F1',
  surface: '#FFFFFF',
  surfaceAlt: '#F4EDE4',
  text: '#2C2416',
  textMuted: '#8B7355',
  textLight: '#B8A898',
  primary: '#5C4A2A',
  border: '#E8DDD0',
  bar: '#2C2416',
  barActive: '#C4862A',
  success: '#4A7C59',
  danger: '#C0392B',
  white: '#FFFFFF',

  destinations: {
    capeTown: '#3B6E8C',
    timbavati: '#C4862A',
    victoriaFalls: '#2A7C6F',
    manaPools: '#3A5C2A',
  },

  conservation: {
    LC: '#4A7C59',
    NT: '#7D6B2A',
    VU: '#C4862A',
    EN: '#C05A20',
    CR: '#C0392B',
  },
} as const;

export type DestinationKey = keyof typeof colors.destinations;

/** Accent colour for a destination id, including the `transit` pseudo-destination. */
export function accentFor(destination: string): string {
  return (colors.destinations as Record<string, string>)[destination] ?? colors.textMuted;
}

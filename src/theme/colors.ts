export const colors = {
  background: '#FAF6F1',
  surface: '#FFFFFF',
  surfaceAlt: '#F4EDE4',
  text: '#2C2416',
  textMuted: '#8B7355',
  textLight: '#B8A898',
  primary: '#5C4A2A',
  border: '#E8DDD0',
  tabBar: '#2C2416',
  tabBarActive: '#C4862A',
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
    lc: '#4A7C59',   // Least Concern
    nt: '#7D6B2A',   // Near Threatened
    vu: '#C4862A',   // Vulnerable
    en: '#C05A20',   // Endangered
    cr: '#C0392B',   // Critically Endangered
  },
} as const;

export type DestinationKey = keyof typeof colors.destinations;

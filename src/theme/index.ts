export const Colors = {
  // Primary palette
  background: '#080D1E',
  surface: '#0F1630',
  surfaceLight: '#162040',
  card: '#111827',

  // Accents
  gold: '#FFD700',
  goldDim: '#C9A800',
  teal: '#00C8AA',
  tealDim: '#00A08A',
  purple: '#7C3AED',
  purpleDim: '#5B21B6',
  red: '#EF4444',
  green: '#22C55E',
  orange: '#F97316',

  // Text
  textPrimary: '#F0F4FF',
  textSecondary: '#8A9CC8',
  textMuted: '#4A5680',

  // Border / glass
  border: 'rgba(255,255,255,0.08)',
  glass: 'rgba(255,255,255,0.05)',

  // Gradients
  gradientPrimary: ['#080D1E', '#0F1A3A'],
  gradientGold: ['#FFD700', '#C9A800'],
  gradientTeal: ['#00C8AA', '#006B5B'],
  gradientPurple: ['#7C3AED', '#4C1D95'],
};

export const Typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 30,
    '3xl': 38,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

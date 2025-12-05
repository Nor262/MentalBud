/**
 * Mental Health App Design System - Earthy Coffee Theme
 * Matches "Freud UI Kit" Figma Community Version
 */

import { Platform } from 'react-native';

const palette = {
  // Bases
  background: '#1F1410', // Deep Coffee
  surface: '#2C211B', // Mocha
  surfaceHighlight: '#44352D',

  // Accents
  primary: '#8CAD65', // Sage Green (Freud Score/Healthy)
  primaryGradient: ['#8CAD65', '#A5C978'],
  secondary: '#FF8C60', // Burnt Orange (Mood)
  secondaryGradient: ['#FF8C60', '#FFA985'],
  accent: '#7D5BA6', // Deep Purple (Sleep)

  // New specific colors from screenshots
  moodSad: '#FF8C60',
  moodHappy: '#E6C84C', // Gold/Yellow
  moodNeutral: '#8D7B6F',
  moodDepressed: '#6A5ACD',

  // Text
  text: '#FFFFFF',
  textSecondary: '#AB9C94', // Light Beige/Grey
  textMuted: '#6E5C54',

  // Borders
  border: '#44352D',
};

export const Colors = {
  light: {
    // Forcing Dark Mode visual style even in 'light' scheme
    ...palette,
    tint: palette.primary,
    icon: palette.textSecondary,
    tabIconDefault: palette.textMuted,
    tabIconSelected: palette.primary,
  },
  dark: {
    ...palette,
    tint: palette.primary,
    icon: palette.textSecondary,
    tabIconDefault: palette.textMuted,
    tabIconSelected: palette.primary,
  },
};

export const Spacing = {
  xs: 6,
  s: 10,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const Layout = {
  radius: {
    s: 12,
    m: 20,
    l: 30, // Main Card Radius
    xl: 40, // Button Radius
    pill: 100,
  }
};

export const Typography = {
  heading: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }), // Or a rounded typeface if available
  body: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
};

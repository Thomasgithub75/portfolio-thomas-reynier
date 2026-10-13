import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';

// Astryx theme for the portfolio — colors and radius inspired by starkfuture.com:
// monochrome black/white surfaces, a single orange highlight, pill-shaped actions.
// Token values are [light, dark] pairs.

export const brand = {
  orange: '#F15A24',
  black: '#000000',
  ink: '#0A0A0A',
  graphite: '#1E1E1E',
  charcoal: '#242424',
  steel: '#424242',
  slate: '#4A4A4A',
  silver: '#D7D7D7',
  fog: '#ECECEC',
  white: '#FFFFFF',
};

const FONT_FALLBACKS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const portfolioTheme = defineTheme({
  name: 'portfolio',
  extends: neutralTheme,

  // Outfit is already loaded by the site (styles/global.css)
  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: { family: 'Outfit', fallbacks: FONT_FALLBACKS },
    heading: { family: 'Outfit', fallbacks: FONT_FALLBACKS },
    code: { family: 'ui-monospace', fallbacks: '"SF Mono", Monaco, Consolas, monospace' },
  },

  tokens: {
    // Surfaces
    '--color-background-body': [brand.fog, brand.black],
    '--color-background-surface': [brand.white, brand.graphite],
    '--color-background-card': [brand.white, brand.graphite],
    '--color-background-popover': [brand.white, brand.charcoal],
    '--color-background-muted': [brand.fog, brand.charcoal],
    '--color-background-inverted': [brand.black, brand.white],

    // Primary actions stay monochrome, like Stark's CTAs
    '--color-accent': [brand.black, brand.white],
    '--color-on-accent': [brand.white, brand.black],
    '--color-accent-muted': [brand.fog, brand.charcoal],

    // Text
    '--color-text-primary': [brand.ink, '#FFFFFFE0'],
    '--color-text-secondary': [brand.slate, '#FFFFFFA3'],
    '--color-text-disabled': ['#00000066', '#FFFFFF66'],
    // Orange highlight — darkened in light mode to keep a 4.5:1 contrast on white
    '--color-text-accent': ['#C2410C', '#FF7A45'],

    // Icons
    '--color-icon-primary': [brand.ink, '#FFFFFFE0'],
    '--color-icon-secondary': [brand.slate, '#FFFFFFA3'],
    '--color-icon-accent': brand.orange,

    // Borders
    '--color-border': [brand.silver, '#FFFFFF29'],
    '--color-border-emphasized': ['#BDBDBD', brand.steel],

    // Focus ring
    '--focus-outline-color': brand.orange,

    // Radius: 8px elements, 16px containers, pill actions
    '--radius-inner': '4px',
    '--radius-element': '8px',
    '--radius-container': '16px',
    '--radius-page': '28px',
  },

  components: {
    button: {
      base: { borderRadius: '9999px', fontWeight: '600', letterSpacing: '0.025em' },
    },
    badge: {
      base: { borderRadius: '9999px' },
    },
  },
});

import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';

// Astryx theme for the portfolio — same palette as the current site (styles/global.css):
// white / black surfaces, indigo → electric violet accent, brand gradient on primary actions.
// Token values are [light, dark] pairs.

export const brand = {
  violet: '#4F46E5',       // --p500 (light)
  violetDark: '#8D4AFF',   // --p500 (dark)
  violetSoft: '#A873FF',   // --p600 (dark) — accent text on black
  ink: '#1A2540',          // --text (light)
  muted: '#5B6A8A',        // --muted (light)
  border: '#E5E7EB',       // --border (light)
  borderStrong: '#D1D5DB', // --border-strong (light)
  black: '#000000',
  graphite: '#1E1E1E',     // --surface (dark)
  charcoal: '#242424',
  steel: '#424242',
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
    '--color-background-body': [brand.white, brand.black],
    '--color-background-surface': [brand.white, brand.graphite],
    '--color-background-card': [brand.white, brand.graphite],
    '--color-background-popover': [brand.white, brand.charcoal],
    // Teinte violette des sections mises en avant (--p50)
    '--color-background-muted': ['#EEF2FF', 'rgba(141,74,255,.14)'],
    '--color-background-inverted': [brand.ink, brand.white],

    // Accent violet (le dégradé de marque est appliqué aux boutons primary, plus bas)
    '--color-accent': [brand.violet, brand.violetDark],
    '--color-on-accent': brand.white,
    '--color-accent-muted': ['#EEF2FF', 'rgba(141,74,255,.22)'],

    // Text
    '--color-text-primary': [brand.ink, '#FFFFFFE0'],
    '--color-text-secondary': [brand.muted, '#FFFFFFA3'],
    '--color-text-disabled': ['#1A254066', '#FFFFFF66'],
    '--color-text-accent': [brand.violet, brand.violetSoft],

    // Icons
    '--color-icon-primary': [brand.ink, '#FFFFFFE0'],
    '--color-icon-secondary': [brand.muted, '#FFFFFFA3'],
    '--color-icon-accent': [brand.violet, brand.violetSoft],

    // Borders
    '--color-border': [brand.border, '#FFFFFF29'],
    '--color-border-emphasized': [brand.borderStrong, brand.steel],

    // Badges : tags projet (--blue-light / --badge-fg) et catégories d'outils (--tag-design / dev / pm)
    '--color-background-blue': ['#EEF2FF', 'rgba(141,74,255,.14)'],
    '--color-text-blue': [brand.violet, '#C9A8FF'],
    '--color-background-purple': ['#EEEDFE', 'rgba(141,74,255,.18)'],
    '--color-text-purple': ['#534AB7', '#C9A8FF'],
    '--color-background-teal': ['#E1F5EE', 'rgba(45,212,160,.16)'],
    '--color-text-teal': ['#0F6E56', '#7EEAC4'],
    '--color-background-orange': ['#FAEEDA', 'rgba(245,158,11,.18)'],
    '--color-text-orange': ['#854F0B', '#FBBF72'],

    // Focus ring
    '--focus-outline-color': [brand.violet, brand.violetDark],

    // Radius: 8px elements (boutons), 12px cartes, comme le site
    '--radius-inner': '4px',
    '--radius-element': '8px',
    '--radius-container': '12px',
    '--radius-page': '28px',
  },

  components: {
    button: {
      base: { fontWeight: '600' },
      // Dégradé de marque du site (--brand-gradient, défini par thème dans global.css)
      'variant:primary': { backgroundImage: 'var(--brand-gradient)', borderColor: 'transparent', color: brand.white },
      // Bouton secondaire teinté violet, comme le site (--btn2-*)
      'variant:secondary': { backgroundColor: 'var(--btn2-bg)', borderColor: 'var(--btn2-border)', color: 'var(--btn2-fg)' },
    },
    badge: {
      base: { borderRadius: '9999px' },
    },
    // Titres aux tailles du site : h1 du hero et h2 de section (global.css)
    heading: {
      'type:display-1': { fontSize: 'clamp(30px,8vw,56px)', fontWeight: '700', lineHeight: '1.08', letterSpacing: '-0.03em' },
      'type:display-3': { fontSize: 'clamp(24px,3.5vw,32px)', fontWeight: '600', lineHeight: '1.2', letterSpacing: '-0.025em' },
    },
  },
});

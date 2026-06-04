import { createTheme } from '@mui/material/styles';

// ── Palette Primary (brand scale 50–900) ─────────────────────────────────────
const primary = {
  50:  '#EEF3FD',
  100: '#D7E5FB',
  200: '#9DB8F2',
  300: '#6191E9',
  400: '#3B70E1',
  500: '#1956DB',
  600: '#1141A8',
  700: '#0C2E7A',
  800: '#061F52',
  900: '#030F2D',
};

// ── Palette Gray (scale 50–900) ───────────────────────────────────────────────
const gray = {
  50:  '#F6F8FB',
  100: '#EBF0F8',
  200: '#C7D2E8',
  300: '#A0AFCF',
  400: '#8B9BB8',
  500: '#5B6A8A',
  600: '#405070',
  700: '#3A4864',
  800: '#1E2E4A',
  900: '#1A2540',
};

// ── Tokens sémantiques → mappés sur les scales ───────────────────────────────
const tokens = {
  // Primary brand
  blue:       primary[500],
  blueMid:    primary[400],
  blueLight:  primary[50],
  blueDeep:   primary[600],
  blueDarker: primary[700],
  blueBorder: primary[200],
  bgBlue:     primary[100],

  // Scales complètes
  primary,
  gray,

  // Texte & neutres → mappés sur gray
  text:       gray[900],   // #1A2540
  muted:      gray[500],   // #5B6A8A
  border:     '#E5E7EB',
  borderSoft: '#E5E9F5',

  bg:         '#FFFFFF',
  bgSoft:     '#F9FAFB',
  bgPanel:    '#F4F8FE',

  green:      '#22C55E',
  amber:      '#F59E0B',

  tagDesignBg:  '#EEEDFE',
  tagDesignFg:  '#534AB7',
  tagDevBg:     '#E1F5EE',
  tagDevFg:     '#0F6E56',
  tagPmBg:      '#FAEEDA',
  tagPmFg:      '#854F0B',
};

const theme = createTheme({
  palette: {
    primary: {
      main:        tokens.blue,
      light:       tokens.blueLight,
      dark:        tokens.blueDarker,
      contrastText: '#ffffff',
    },
    text: {
      primary:   tokens.text,
      secondary: tokens.muted,
    },
    background: {
      default: tokens.bg,
      paper:   tokens.bgSoft,
    },
    divider: tokens.border,
  },

  typography: {
    fontFamily: "'Outfit', sans-serif",
    h1: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h2: { fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2 },
    h3: { fontWeight: 600, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.015em' },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.55 },
    caption: { fontSize: '0.75rem', letterSpacing: '0.06em' },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
      `,
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          borderRadius: 7,
          fontSize: '0.9375rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
        },
      },
    },
  },

  // tokens bruts accessibles partout via theme.designTokens
  designTokens: tokens,
});

export default theme;
export { tokens };

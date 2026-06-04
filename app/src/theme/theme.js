import { createTheme } from '@mui/material/styles';

// ── Tokens extraits du site actuel ────────────────────────────────────────────
const tokens = {
  blue:       '#1A56DB',
  blueMid:    '#3B82F6',
  blueLight:  '#EEF4FF',
  blueDeep:   '#175CD3',
  blueDarker: '#0C447C',
  blueBorder: '#B5D4F4',

  text:       '#111827',
  muted:      '#6B7280',
  border:     '#E5E7EB',
  borderSoft: '#E5E9F5',

  bg:         '#FFFFFF',
  bgSoft:     '#F9FAFB',
  bgPanel:    '#F4F8FE',
  bgBlue:     '#E8EFFD',

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

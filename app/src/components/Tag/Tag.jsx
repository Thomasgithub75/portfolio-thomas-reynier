/**
 * @component Tag
 * @usage Étiquette de compétence, catégorie ou filtre. Peut être cliquable (clickable=true).
 *
 * Cas d'usage typiques :
 *   - Listes de compétences dans une page (non cliquable)
 *   - Filtres de contenu : trier des projets, choisir un ton dans un formulaire (clickable + isActive)
 *   - Labels colorés dans une card ou un header de case study
 *
 * Variantes de couleur :
 *   "primary"   — bleu plein (compétence forte, filtre sélectionné)
 *   "secondary" — bleu clair (compétence standard, filtre neutre)
 *   "design"    — violet clair (compétences design)
 *   "dev"       — orange clair (compétences techniques / dev)
 *   "pm"        — vert clair (compétences produit / PM)
 *   "langNatif" — bleu plein (langue native)
 *   "langPro"   — bleu clair (langue professionnelle)
 *
 * Pour un filtre actif/inactif : utiliser clickable=true + isActive + isDimmed.
 */
import Box from '@mui/material/Box';
import { tokens } from '../../theme/theme';

// Palette de couleurs par catégorie
const categoryStyles = {
  primary: {
    bg:         tokens.blue,
    color:      '#ffffff',
    border:     tokens.blue,
    hoverBg:    tokens.blueDeep,
    activeBg:   tokens.blueDeep,
    activeColor:'#ffffff',
    activeBorder: tokens.blue,
  },
  secondary: {
    bg:         tokens.bgBlue,
    color:      tokens.blueDeep,
    border:     tokens.blueBorder,
    hoverBg:    tokens.blueBorder,
    hoverColor: tokens.blueDarker,
    activeBg:   tokens.bgBlue,
    activeColor: tokens.blueDeep,
    activeBorder:tokens.blue,
  },
  design: {
    bg:    tokens.tagDesignBg,
    color: tokens.tagDesignFg,
    border: tokens.tagDesignBg,
  },
  dev: {
    bg:    tokens.tagDevBg,
    color: tokens.tagDevFg,
    border: tokens.tagDevBg,
  },
  pm: {
    bg:    tokens.tagPmBg,
    color: tokens.tagPmFg,
    border: tokens.tagPmBg,
  },
  langNatif: {
    bg:     tokens.blue,
    color:  '#fff',
    border: tokens.blue,
  },
  langPro: {
    bg:     tokens.bgBlue,
    color:  tokens.blueDeep,
    border: tokens.blueBorder,
  },
};

/**
 * Tag
 * category : "primary" | "secondary" | "design" | "dev" | "pm" | "langNatif" | "langPro"
 * clickable : true/false — si true, se comporte comme un bouton avec état actif
 * isActive  : état actif contrôlé de l'extérieur
 * isDimmed  : opacité réduite (filtre actif ailleurs)
 * onClick   : handler
 */
export default function Tag({
  children,
  category = 'secondary',
  clickable = false,
  isActive = false,
  isDimmed = false,
  onClick,
  icon,
  sx = {},
}) {
  const s = categoryStyles[category] ?? categoryStyles.secondary;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    px: '8px',
    py: '3px',
    borderRadius: '6px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    border: `1.5px solid ${s.border ?? s.bg}`,
    backgroundColor: s.bg,
    color: s.color,
    userSelect: 'none',
    opacity: isDimmed ? 0.3 : 1,
    transition: 'background 0.15s, color 0.15s, opacity 0.15s, transform 0.1s, border-color 0.15s',
  };

  if (!clickable) {
    return (
      <Box component="span" sx={{ ...base, cursor: 'default', ...sx }}>
        {icon && <span style={{ fontSize: 12 }}>{icon}</span>}
        {children}
      </Box>
    );
  }

  // État actif
  const activeOverride = isActive
    ? {
        backgroundColor: s.activeBg ?? s.bg,
        color: s.activeColor ?? s.color,
        border: `2px solid ${s.activeBorder ?? s.border ?? s.bg}`,
        outline: 'none',
      }
    : {};

  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        ...base,
        cursor: 'pointer',
        background: 'none',
        fontFamily: "'Outfit', sans-serif",
        '&:hover': {
          backgroundColor: s.hoverBg ?? s.bg,
          color: s.hoverColor ?? s.color,
        },
        '&:active': {
          transform: 'scale(0.97)',
        },
        '&:focus-visible': {
          outline: `2px solid ${tokens.blue}`,
          outlineOffset: 2,
        },
        ...activeOverride,
        ...sx,
      }}
    >
      {icon && <span style={{ fontSize: 12 }}>{icon}</span>}
      {children}
    </Box>
  );
}

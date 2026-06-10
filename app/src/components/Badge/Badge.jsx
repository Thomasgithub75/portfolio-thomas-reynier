/**
 * @component Badge
 * @usage Étiquette compacte (pill) pour labelliser un type, un rôle ou un statut. Non interactif.
 *
 * Quand utiliser Badge vs Tag :
 *   Badge  — info statique, non cliquable (ex : "Projet perso", "Lead Designer", type de case study).
 *   Tag    — info cliquable ou filtre interactif (ex : compétences, catégories de contenu).
 *
 * Variantes :
 *   "default" — bleu clair, usage générique (rôle, label neutre)
 *   "case"    — bleu foncé, pour identifier un type de case study ou de mission
 *   "side"    — violet, pour projets side / perso
 *   "perso"   — vert, pour projets personnels
 */
import Box from '@mui/material/Box';
import { tokens } from '../../theme/theme';

// Palette par variant
const variantStyles = {
  default: {
    background: tokens.bgBlue,
    color: tokens.blue,
  },
  case: {
    background: tokens.bgBlue,
    color: tokens.blueDeep,
  },
  side: {
    background: tokens.tagPmBg,
    color: tokens.tagPmFg,
  },
  perso: {
    background: '#EAF3DE',
    color: '#3B6D11',
  },
};

/**
 * Badge — pill compact pour labelliser (rôle, type de projet, etc.)
 * variant: "default" | "case" | "side" | "perso"
 */
export default function Badge({ children, variant = 'default', sx = {} }) {
  const styles = variantStyles[variant] ?? variantStyles.default;

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        px: '6px',
        py: '2px',
        borderRadius: '9999px',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        cursor: 'default',
        ...styles,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

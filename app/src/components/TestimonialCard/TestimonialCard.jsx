import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import { tokens } from '../../theme/theme';

const LinkedInIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/**
 * TestimonialCard — Option D
 *
 * featured : true  → pleine largeur, layout interne 2 colonnes
 * featured : false → carte compacte, layout vertical
 *
 * Props :
 *   quote       — texte complet
 *   keyQuote    — phrase clé (bold, mise en avant)
 *   name        — prénom + nom
 *   role        — poste · entreprise
 *   avatar      — chemin image
 *   stars       — 1-5 (défaut 5)
 *   companyLogo — chemin logo entreprise
 *   linkedinUrl — URL profil LinkedIn
 *   featured    — booléen (défaut false)
 */
export default function TestimonialCard({
  quote,
  keyQuote,
  name,
  role,
  avatar,
  stars = 5,
  companyLogo,
  linkedinUrl,
  featured = false,
}) {
  const avatarSize = featured ? 44 : 38;

  const cardSx = {
    background: '#fff',
    border: `1px solid ${tokens.border}`,
    borderRadius: '14px',
    p: featured ? '32px' : '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    transition: 'box-shadow 0.2s',
    height: '100%',
    '&:hover': {
      boxShadow: '0 6px 28px rgba(26,86,219,0.09)',
    },
  };

  // Auteur — partagé entre les deux variantes
  const Author = (
    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        {avatar && (
          <Box
            component="img"
            src={avatar}
            alt={name}
            sx={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: '50%',
              objectFit: 'cover',
              border: `2px solid ${tokens.border}`,
              flexShrink: 0,
            }}
          />
        )}
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: tokens.text, lineHeight: 1.2 }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: '11px', color: tokens.muted, fontWeight: 300, mt: '2px' }}>
            {role}
          </Typography>
        </Box>
      </Stack>

      {linkedinUrl && (
        <Box
          component="a"
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#0A66C2',
            background: '#EBF3FB',
            border: '1px solid #C0DCF5',
            borderRadius: '20px',
            px: '10px',
            py: '4px',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'opacity 0.15s',
            fontFamily: "'Outfit', sans-serif",
            '&:hover': { opacity: 0.8 },
          }}
        >
          <LinkedInIcon />
          LinkedIn
        </Box>
      )}
    </Stack>
  );

  // ── Carte featured — pleine largeur, 2 colonnes internes ──
  if (featured) {
    return (
      <Box sx={cardSx}>
        {/* Colonne gauche + droite */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          alignItems: 'start',
        }}>
          {/* Gauche : étoiles, logo, phrase clé, auteur */}
          <Stack gap={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={0.25}>
                {Array.from({ length: stars }).map((_, i) => (
                  <StarIcon key={i} sx={{ fontSize: 15, color: tokens.amber }} />
                ))}
              </Stack>
              {companyLogo && (
                <Box component="img" src={companyLogo} alt="" sx={{ height: '22px', width: 'auto', objectFit: 'contain', opacity: 0.85 }} />
              )}
            </Stack>

            <Typography sx={{
              fontSize: '17px',
              fontWeight: 700,
              color: tokens.text,
              lineHeight: 1.45,
              letterSpacing: '-0.015em',
            }}>
              « {keyQuote} »
            </Typography>

            <Box sx={{ borderTop: `1px solid ${tokens.border}` }} />
            {Author}
          </Stack>

          {/* Droite : citation complète */}
          <Box sx={{
            borderLeft: `3px solid rgba(26,86,219,0.15)`,
            pl: 3,
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}>
            <Typography sx={{
              fontSize: '14px',
              color: tokens.muted,
              lineHeight: 1.75,
              fontWeight: 300,
              fontStyle: 'italic',
            }}>
              {quote}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // ── Carte compacte — layout vertical ──
  return (
    <Box sx={cardSx}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={0.25}>
          {Array.from({ length: stars }).map((_, i) => (
            <StarIcon key={i} sx={{ fontSize: 14, color: tokens.amber }} />
          ))}
        </Stack>
        {companyLogo && (
          <Box component="img" src={companyLogo} alt="" sx={{ height: '20px', width: 'auto', objectFit: 'contain', opacity: 0.85 }} />
        )}
      </Stack>

      <Typography sx={{
        fontSize: '15px',
        fontWeight: 700,
        color: tokens.text,
        lineHeight: 1.45,
        letterSpacing: '-0.01em',
      }}>
        « {keyQuote} »
      </Typography>

      <Typography sx={{
        fontSize: '13px',
        color: tokens.muted,
        lineHeight: 1.75,
        fontWeight: 300,
        fontStyle: 'italic',
        flex: 1,
      }}>
        {quote}
      </Typography>

      <Box sx={{ borderTop: `1px solid ${tokens.border}` }} />
      {Author}
    </Box>
  );
}

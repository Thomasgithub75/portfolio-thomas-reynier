/**
 * @component TestimonialCard
 * @usage Card de preuve sociale avec citation, auteur, étoiles et logo entreprise.
 *
 * Cas d'usage :
 *   - Section témoignages sur la Home
 *   - Section sociale proof sur une page de cas d'usage ou de landing
 *
 * Variantes :
 *   featured=false (défaut) — card compacte en colonne, pour une grille de témoignages
 *   featured=true           — card large 2 colonnes (keyQuote + citation complète), à utiliser seule ou en hero testimonial
 *
 * Props clés :
 *   keyQuote     — phrase courte mise en avant en gras (accroche du témoignage)
 *   quote        — citation complète en italique
 *   companyLogo  — logo de l'entreprise (path image)
 *   avatar       — photo de l'auteur (path image)
 *   linkedinUrl  — affiche un badge LinkedIn cliquable si fourni
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import { tokens } from '../../theme/theme';

const LinkedInLogo = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2" style={{ flexShrink: 0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Badge LinkedIn — identique au proposals HTML
const LinkedInBadge = ({ href }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1,
      color: '#0A66C2',
      background: '#EBF3FB',
      border: '1px solid #C0DCF5',
      borderRadius: '20px',
      px: '10px',
      py: '5px',
      textDecoration: 'none',
      flexShrink: 0,
      fontFamily: "'Outfit', sans-serif",
      whiteSpace: 'nowrap',
      transition: 'opacity 0.15s',
      '&:hover': { opacity: 0.8 },
    }}
  >
    <LinkedInLogo />
    LinkedIn
  </Box>
);

// Bloc auteur — partagé entre les deux variantes
const AuthorRow = ({ avatar, name, role, avatarSize, linkedinUrl }) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
    <Stack direction="row" alignItems="center" gap="10px">
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
            flexShrink: 0,
            border: `2px solid ${tokens.border}`,
          }}
        />
      )}
      <Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: tokens.text, lineHeight: 1.2 }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: '11px', color: tokens.muted, fontWeight: 300, mt: '2px', lineHeight: 1.3 }}>
          {role}
        </Typography>
      </Box>
    </Stack>
    {linkedinUrl && <LinkedInBadge href={linkedinUrl} />}
  </Stack>
);

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
  const Stars = () => (
    <Stack direction="row" gap="2px">
      {Array.from({ length: stars }).map((_, i) => (
        <StarIcon key={i} sx={{ fontSize: featured ? 16 : 14, color: tokens.amber }} />
      ))}
    </Stack>
  );

  const Logo = ({ size = 22 }) => companyLogo ? (
    <Box
      component="img"
      src={companyLogo}
      alt=""
      sx={{ height: `${size}px`, width: 'auto', objectFit: 'contain', opacity: 0.85, flexShrink: 0 }}
    />
  ) : null;

  const cardBase = {
    background: '#fff',
    border: `1px solid ${tokens.border}`,
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',         // identique proposals
  };

  // ── Featured — pleine largeur, 2 colonnes internes ──
  if (featured) {
    return (
      <Box sx={{ ...cardBase, p: '32px' }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          alignItems: 'start',
        }}>
          {/* Gauche */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stars />
              <Logo size={24} />
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

            <AuthorRow avatar={avatar} name={name} role={role} avatarSize={44} linkedinUrl={linkedinUrl} />
          </Box>

          {/* Droite */}
          <Box sx={{
            borderLeft: '3px solid rgba(25,86,219,0.2)',
            pl: '20px',
            display: 'flex',
            alignItems: 'center',
            minHeight: '100%',
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

  // ── Compact — layout vertical ──
  return (
    <Box sx={{ ...cardBase, p: '24px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stars />
        <Logo size={20} />
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

      <AuthorRow avatar={avatar} name={name} role={role} avatarSize={38} linkedinUrl={linkedinUrl} />
    </Box>
  );
}

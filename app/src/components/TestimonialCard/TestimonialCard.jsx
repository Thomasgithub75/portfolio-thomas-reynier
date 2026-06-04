import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { tokens } from '../../theme/theme';

/**
 * TestimonialCard
 *
 * featured : true  → grande carte (colonne gauche)
 * featured : false → carte compacte (colonne droite empilée)
 *
 * Props :
 *   quote       — texte complet de la recommandation
 *   keyQuote    — phrase clé mise en avant
 *   name        — prénom + nom
 *   role        — poste · entreprise
 *   avatar      — chemin image (ou null pour initiales)
 *   stars       — 1-5 (défaut 5)
 *   project     — label badge projet (ex : "Pepyte")
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
  project,
  linkedinUrl,
  featured = false,
}) {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <Box
      sx={{
        border: `1px solid ${tokens.border}`,
        borderRadius: '14px',
        p: featured ? '36px' : '24px',
        background: tokens.bg,
        display: 'flex',
        flexDirection: 'column',
        gap: featured ? 2.5 : 2,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: tokens.blueBorder,
          boxShadow: '0 4px 24px rgba(26,86,219,0.08)',
        },
        // Guillemet décoratif
        '&::before': {
          content: '"“"',
          position: 'absolute',
          top: '-10px',
          right: '24px',
          fontSize: '120px',
          lineHeight: 1,
          color: tokens.blue,
          opacity: 0.06,
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          pointerEvents: 'none',
        },
      }}
    >
      {/* En-tête : étoiles + badge projet */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={0.25}>
          {Array.from({ length: stars }).map((_, i) => (
            <StarIcon key={i} sx={{ fontSize: 16, color: tokens.amber }} />
          ))}
        </Stack>
        {project && (
          <Box sx={{
            fontSize: '11px',
            fontWeight: 600,
            color: tokens.blue,
            background: tokens.blueLight,
            border: `1px solid ${tokens.blueBorder}`,
            borderRadius: '20px',
            px: 1.25,
            py: '2px',
            fontFamily: "'Outfit', sans-serif",
          }}>
            {project}
          </Box>
        )}
      </Stack>

      {/* Phrase clé mise en avant */}
      {keyQuote && (
        <Typography sx={{
          fontSize: featured ? '17px' : '14px',
          fontWeight: 600,
          color: tokens.text,
          lineHeight: 1.45,
          letterSpacing: '-0.01em',
          fontStyle: 'italic',
        }}>
          « {keyQuote} »
        </Typography>
      )}

      {/* Séparateur */}
      <Box sx={{ borderTop: `1px solid ${tokens.border}` }} />

      {/* Citation complète */}
      <Typography sx={{
        fontSize: featured ? '15px' : '13px',
        color: tokens.muted,
        lineHeight: 1.75,
        fontWeight: 300,
        flex: 1,
      }}>
        {quote}
      </Typography>

      {/* Auteur */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 2, borderTop: `1px solid ${tokens.border}`, mt: 'auto' }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {/* Avatar */}
          {avatar ? (
            <Box
              component="img"
              src={avatar}
              alt={name}
              sx={{
                width: featured ? 44 : 36,
                height: featured ? 44 : 36,
                borderRadius: '50%',
                objectFit: 'cover',
                border: `2px solid ${tokens.border}`,
                flexShrink: 0,
              }}
            />
          ) : (
            <Box sx={{
              width: featured ? 44 : 36,
              height: featured ? 44 : 36,
              borderRadius: '50%',
              background: tokens.blueLight,
              border: `2px solid ${tokens.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: featured ? '14px' : '12px',
              fontWeight: 600,
              color: tokens.blue,
              flexShrink: 0,
            }}>
              {initials}
            </Box>
          )}
          <Box>
            <Typography sx={{
              fontSize: featured ? '14px' : '13px',
              fontWeight: 600,
              color: tokens.text,
              lineHeight: 1.2,
            }}>
              {name}
            </Typography>
            <Typography sx={{
              fontSize: featured ? '13px' : '11px',
              color: tokens.muted,
              fontWeight: 300,
              lineHeight: 1.3,
              mt: '2px',
            }}>
              {role}
            </Typography>
          </Box>
        </Stack>

        {/* Lien LinkedIn */}
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
              fontSize: '12px',
              color: tokens.blue,
              textDecoration: 'none',
              fontWeight: 500,
              fontFamily: "'Outfit', sans-serif",
              opacity: 0.75,
              transition: 'opacity 0.15s',
              '&:hover': { opacity: 1 },
              flexShrink: 0,
            }}
          >
            LinkedIn
            <OpenInNewIcon sx={{ fontSize: 12 }} />
          </Box>
        )}
      </Stack>
    </Box>
  );
}

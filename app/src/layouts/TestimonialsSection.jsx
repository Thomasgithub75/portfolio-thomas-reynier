import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TestimonialCard from '../components/TestimonialCard/TestimonialCard';
import { tokens } from '../theme/theme';

const TESTIMONIALS = [
  {
    featured: true,
    project: 'Pepyte',
    stars: 5,
    keyQuote: 'Une augmentation importante de la satisfaction des utilisateurs et de l\'efficacité des processus de recrutement.',
    quote: '« Thomas a grandement amélioré notre plateforme de recrutement. Il a su comprendre les besoins des utilisateurs. Il a également collaboré efficacement avec notre équipe de développement. Nous avons obtenu une augmentation importante de la satisfaction des utilisateurs clients et de l\'efficacité des processus de recrutement. »',
    name: 'Alexis Vaysse',
    role: 'Co-CEO & Co-Founder · Pepyte',
    avatar: '/images/avatar-alexis.png',
    linkedinUrl: 'https://www.linkedin.com/in/thomas-reynier-product-design/',
  },
  {
    featured: false,
    project: 'Pepyte',
    stars: 5,
    keyQuote: 'Une capacité de travail impressionnante à une positivité contagieuse.',
    quote: '« Thomas est un Product Designer motivé, combinant une capacité de travail impressionnante à une positivité contagieuse. Son dévouement et son optimisme inspirent toute l\'équipe, rendant chaque projet non seulement réalisable, mais aussi agréable. Fortement recommandé ! »',
    name: 'Antoine Girard',
    role: 'Co-CEO & Co-Founder · Pepyte',
    avatar: '/images/avatar-antoine.png',
    linkedinUrl: 'https://www.linkedin.com/in/thomas-reynier-product-design/',
  },
  {
    featured: false,
    project: 'Weborama',
    stars: 5,
    keyQuote: 'Faire de l\'IA un véritable allié stratégique.',
    quote: '« En tant que Product Designer, Thomas a su faire de l\'IA un véritable allié stratégique, l\'intégrant avec maîtrise dans ses méthodes de conception pour créer des produits plus intelligents, optimiser les parcours utilisateurs et renforcer durablement la performance des produits Weborama. »',
    name: 'Donia Ben Ghorbal',
    role: 'Lead Product Designer · Weborama',
    avatar: '/images/avatar-donia.png',
    linkedinUrl: 'https://www.linkedin.com/in/thomas-reynier-product-design/',
  },
];

export default function TestimonialsSection() {
  const featured = TESTIMONIALS.find(t => t.featured);
  const compact  = TESTIMONIALS.filter(t => !t.featured);

  return (
    <Box component="section" id="recommandations" sx={{ py: '80px' }}>
      <Box sx={{ maxWidth: '960px', mx: 'auto', px: '2rem' }}>

        {/* En-tête */}
        <Typography variant="caption" sx={{
          display: 'block',
          color: tokens.blue,
          textTransform: 'uppercase',
          fontWeight: 500,
          letterSpacing: '0.08em',
          mb: 1,
        }}>
          Recommandations
        </Typography>
        <Typography variant="h2" sx={{ mb: 5 }}>
          Mes collaborations
        </Typography>

        {/* Grille asymétrique */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 320px' },
          gap: 2,
          alignItems: 'start',
        }}>
          {/* Carte featured — gauche */}
          {featured && (
            <TestimonialCard {...featured} />
          )}

          {/* 2 cartes compactes — droite */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {compact.map(t => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Box>
        </Box>

      </Box>
    </Box>
  );
}

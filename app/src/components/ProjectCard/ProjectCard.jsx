import { Link as RouterLink } from 'react-router-dom';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import LockOutlined from '@mui/icons-material/LockOutlined';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { trackEvent } from '../../utils/analytics';
import './ProjectCard.css';

// Carte d'étude de cas (accueil, « Autres projets »). Carte entière cliquable ; au survol :
// bordure accent, ombre, légère montée, zoom de l'illustration, flèche qui glisse.
// project : { href, thumb, logo, role, roleVariant, duration | date, name, desc, tags }
export default function ProjectCard({ project, locked }) {
  return (
    <RouterLink to={project.href} className="ax-project-link" onClick={() => trackEvent.caseStudyOpen(project.name)}>
      <Card padding={0} variant={locked ? 'muted' : 'default'} height="100%">
        <div className="ax-thumb">
          {locked
            ? <VStack gap={1} hAlign="center"><LockOutlined /><Text type="label" color="secondary">Code requis</Text></VStack>
            : <img src={project.thumb} alt="" loading="lazy" />}
        </div>
        <VStack gap={3} padding={5}>
          <HStack gap={2} vAlign="center" hAlign="between">
            <HStack gap={2} vAlign="center">
              <img className="ax-logo-sm" src={project.logo} alt="" />
              <Badge label={project.role} variant={locked ? 'neutral' : project.roleVariant} />
            </HStack>
            <Text type="supporting">{locked ? project.date : project.duration}</Text>
          </HStack>
          <Heading level={3}>{project.name}</Heading>
          <Text color="secondary">{project.desc}</Text>
          <HStack gap={1} wrap="wrap">
            {project.tags.map(tag => <Badge key={tag} label={tag} variant="blue" />)}
          </HStack>
          <span className="ax-project-cta">
            <Text weight="medium" color="accent">{locked ? 'Entrer le code' : 'Voir le projet'}</Text>
            <ArrowForward className="ax-project-arrow" sx={{ fontSize: 16 }} />
          </span>
        </VStack>
      </Card>
    </RouterLink>
  );
}

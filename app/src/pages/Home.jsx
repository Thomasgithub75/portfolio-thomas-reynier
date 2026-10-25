import { useEffect, useState } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { ToggleButton } from '@astryxdesign/core/ToggleButton';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Blockquote } from '@astryxdesign/core/Blockquote';
import { Divider } from '@astryxdesign/core/Divider';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import RouteOutlined from '@mui/icons-material/RouteOutlined';
import LayersOutlined from '@mui/icons-material/LayersOutlined';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MailOutlined from '@mui/icons-material/MailOutlined';
import LinkedIn from '@mui/icons-material/LinkedIn';
import AstryxPage from '../layouts/AstryxPage';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import StreamingText from '../components/StreamingText/StreamingText';
import { trackEvent } from '../utils/analytics';
import {
  HERO_SEGMENTS, HERO_TYPOS, HERO_POINTS, HERO_STATS, PROJECTS, LOCKED_PROJECT, MATCHING_STEPS,
  MATCHING_PREVIEW, SKILL_PROJECTS, CORE_SKILLS, SEC_SKILLS, TOOLS, TESTIMONIALS, CONTACT,
} from '../data/home';
import './Home.css';

// Page d'accueil construite avec le design system Astryx (thème « portfolio », theme/astryxTheme.js).
// Restent en code maison : la Navbar (verre + menu mobile), l'effet de frappe du sous-titre,
// la pastille « À l'écoute » et la mise en page du hero, qui tient sur un écran de téléphone.
// L'ancienne version MUI est gardée dans pages/HomeClassic.jsx.

const POINT_ICONS = [RouteOutlined, LayersOutlined, AutoAwesomeOutlined];
const TOOL_VARIANTS = { design: 'purple', dev: 'teal', pm: 'orange' };

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Arrivée depuis une autre page sur /#ancre
    const hash = window.location.hash.replace('#', '');
    if (hash) setTimeout(() => scrollTo(hash), 100);
  }, []);

  return (
    <AstryxPage>
      <main>
        <Hero />
        <Projects />
        <Matching />
        <Expertises />
        <Testimonials />
        <Contact />
      </main>
    </AstryxPage>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
// Classes home-hero / hero-* de global.css gardées telles quelles : ce sont elles qui
// font tenir le hero sur un écran de téléphone (petit avatar, ordre des blocs).

function Hero() {
  return (
    <section id="hero" className="home-hero ax-hero-bg">
      <div className="container">
        <div className="home-hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow-row">
              <div className="hero-avatar-mobile" aria-hidden="true">
                <img src="/images/profile-cutout.png" alt="" />
              </div>
              <div>
                <p className="ax-eyebrow"><span className="ax-eyebrow-line" />Thomas Reynier</p>
                <p className="hero-status-mobile"><span className="hero-status-dot" />À l'écoute · Freelance &amp; CDI</p>
              </div>
            </div>
            <div className="ax-hero-title">
              <Heading level={1} type="display-1">
                Product Designer <span className="text-brand-gradient">IA</span>
              </Heading>
            </div>
            <StreamingText
              variant="type"
              segments={HERO_SEGMENTS}
              typos={HERO_TYPOS}
              style={{ fontSize: 'clamp(16px,4.4vw,20px)', fontWeight: 600, color: 'var(--color-text-accent)', letterSpacing: '-0.01em', marginBottom: 28 }}
            />
            <p className="ax-hero-intro">
              La recherche oriente mes décisions, le Design System structure mes livrables, l'IA accélère la livraison.
            </p>
            <div className="hero-points">
              {HERO_POINTS.map((point, i) => {
                const PointIcon = POINT_ICONS[i];
                return (
                  <div key={point.label} className="hero-point">
                    <div className="hero-point-icon"><PointIcon sx={{ fontSize: 18 }} /></div>
                    <p className="hero-point-text">
                      <Text weight="medium">{point.label}</Text> <Text color="secondary">— {point.desc}</Text>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="hero-stats">
              {HERO_STATS.map(stat => {
                const hasPlus = stat.num.startsWith('+');
                return (
                  <div key={stat.label} className="hero-stat">
                    <span className="hero-stat-num">
                      {hasPlus && <Text type="inherit" color="primary">+</Text>}
                      <Text type="inherit" color="accent">{hasPlus ? stat.num.slice(1) : stat.num}</Text>
                    </span>
                    <Text type="supporting" display="block">{stat.label}</Text>
                  </div>
                );
              })}
            </div>
            <div className="hero-ctas">
              <Button label="Voir mes projets" variant="primary" size="lg" icon={<GridViewOutlined sx={{ fontSize: 16 }} />} onClick={() => scrollTo('projets')} />
              <Button
                label="LinkedIn"
                variant="secondary"
                size="lg"
                href={CONTACT.linkedin}
                target="_blank"
                icon={<LinkedIn sx={{ fontSize: 16 }} />}
                onClick={() => trackEvent.linkedinClick('hero')}
              />
            </div>
          </div>
          <div className="home-hero-image">
            <div className="ax-photo">
              <img src="/images/profile-cutout.png" alt="Thomas Reynier" />
            </div>
            <div className="ax-status-pill">
              <span className="ax-status-dot" aria-hidden="true" />
              À l'écoute
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projets ───────────────────────────────────────────────────────────────────

function SectionTitle({ eyebrow, title, intro }) {
  return (
    <VStack gap={2}>
      <p className="section-label">{eyebrow}</p>
      <Heading level={2} type="display-3">{title}</Heading>
      {intro && <Text color="secondary">{intro}</Text>}
    </VStack>
  );
}

function Projects() {
  return (
    <section id="projets" className="ax-container ax-section">
      <VStack gap={6}>
        <SectionTitle eyebrow="Études de cas" title="Mes derniers projets" />
        <Grid columns={{ minWidth: 260, max: 3 }} gap={4}>
          {PROJECTS.map(p => <ProjectCard key={p.name} project={p} />)}
          <ProjectCard project={LOCKED_PROJECT} locked />
        </Grid>
      </VStack>
    </section>
  );
}

// ── Matching IA ───────────────────────────────────────────────────────────────

function Matching() {
  return (
    <Section variant="muted">
      <div id="fonctionnalite-ia" className="ax-container ax-section ax-matching">
        <VStack gap={5}>
          <HStack gap={2} vAlign="center">
            <Badge label="Matching IA" variant="purple" icon={<AutoAwesomeOutlined sx={{ fontSize: 14 }} />} />
            <Text type="supporting">Exclusif</Text>
          </HStack>
          <Heading level={2} type="display-3">Testez notre compatibilité.</Heading>
          <VStack gap={3}>
            {MATCHING_STEPS.map((step, i) => (
              <HStack key={step} gap={3} vAlign="center">
                <span className="ax-step-num">{String(i + 1).padStart(2, '0')}</span>
                <Text>{step}</Text>
              </HStack>
            ))}
          </VStack>
          <HStack>
            <Button label="Tester le matching IA" variant="primary" href="/fonctionnalite-ia" icon={<AutoAwesomeOutlined sx={{ fontSize: 16 }} />} />
          </HStack>
        </VStack>
        <div className="ax-matching-preview" aria-hidden="true">
          <Card padding={0} elevation="med">
            <HStack gap={3} vAlign="center" padding={4}>
              <span className="ax-preview-icon"><HomeOutlined sx={{ fontSize: 16 }} /></span>
              <VStack gap={1}>
                <Text type="supporting">Votre entreprise</Text>
                <span className="ax-skeleton" style={{ width: 80 }} />
              </VStack>
              <Text color="secondary">×</Text>
              <img className="ax-preview-photo" src="/images/profile-thumb.jpg" alt="" />
            </HStack>
            <Divider />
            <VStack gap={0.5} padding={4}>
              <Text type="supporting">{MATCHING_PREVIEW.length + 1} points de compatibilité</Text>
              <Text weight="bold">Analyse de compatibilité</Text>
            </VStack>
            {MATCHING_PREVIEW.map(row => (
              <div key={row.label}>
                <Divider />
                <VStack gap={1.5} padding={4}>
                  <HStack gap={2} vAlign="center">
                    <img className="ax-preview-logo" src={row.logo} alt="" />
                    <Text weight="semibold" size="sm">{row.label}</Text>
                  </HStack>
                  <span className="ax-skeleton" />
                  <span className="ax-skeleton" style={{ width: row.w }} />
                </VStack>
              </div>
            ))}
            <div className="ax-preview-cta">
              <SearchOutlined sx={{ fontSize: 14 }} />
              <Text type="label" color="accent">Votre résultat personnalisé vous attend</Text>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

// ── Expertises ────────────────────────────────────────────────────────────────

function Expertises() {
  const [active, setActive] = useState([]);
  const toggle = skill => setActive(prev => (prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]));
  const seen = new Set();
  const projects = active.flatMap(s => SKILL_PROJECTS[s] || []).filter(p => !seen.has(p.name) && seen.add(p.name));

  return (
    <section id="competences" className="ax-container ax-section">
      <VStack gap={6}>
        <SectionTitle eyebrow="Expertise" title="Mes expertises" intro="Sélectionnez une compétence pour voir les projets associés." />
        <div className="ax-exp-grid">
          <VStack gap={5}>
            <VStack gap={2}>
              <Text type="label" color="secondary">Compétences</Text>
              <HStack gap={1} wrap="wrap">
                {[...CORE_SKILLS, ...SEC_SKILLS].map(skill => (
                  <ToggleButton
                    key={skill}
                    label={skill}
                    size="sm"
                    isPressed={active.includes(skill)}
                    onPressedChange={() => toggle(skill)}
                  >
                    {CORE_SKILLS.includes(skill) ? <Text weight="semibold">{skill}</Text> : skill}
                  </ToggleButton>
                ))}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text type="label" color="secondary">Outils</Text>
              <HStack gap={1} wrap="wrap">
                {TOOLS.map(t => <Badge key={t.name} label={t.name} variant={TOOL_VARIANTS[t.cat]} />)}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text type="label" color="secondary">Langues</Text>
              <HStack gap={1} wrap="wrap">
                <Badge label="Français — Natif" variant="blue" />
                <Badge label="Anglais — Professionnel" variant="blue" />
              </HStack>
            </VStack>
          </VStack>
          <Card padding={4} variant={active.length ? 'default' : 'transparent'}>
            {active.length === 0 ? (
              <Text type="supporting">Sélectionner une compétence pour voir les projets associés</Text>
            ) : (
              <VStack gap={3}>
                <VStack gap={0.5}>
                  <Text type="label" color="accent">Projets associés</Text>
                  <Heading level={3}>{active.length === 1 ? active[0] : `${active.length} compétences`}</Heading>
                </VStack>
                <Divider />
                {projects.map(p => (
                  <HStack key={p.name} gap={3} vAlign="center">
                    <img className="ax-logo-md" src={p.logo} alt="" />
                    <VStack gap={0}>
                      {p.locked
                        ? <Text weight="medium" color="secondary">{p.name}</Text>
                        : <Link href={p.url} isStandalone weight="medium">{p.name}</Link>}
                      <Text type="supporting" maxLines={1}>{p.desc}</Text>
                    </VStack>
                    {p.locked && <Badge label="En entretien" icon={<LockOutlined sx={{ fontSize: 12 }} />} />}
                  </HStack>
                ))}
                <Text type="supporting">{projects.length} projet{projects.length > 1 ? 's' : ''} trouvé{projects.length > 1 ? 's' : ''}</Text>
              </VStack>
            )}
          </Card>
        </div>
      </VStack>
    </section>
  );
}

// ── Témoignages ───────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section id="recommandations" className="ax-container ax-section">
      <VStack gap={6}>
        <SectionTitle eyebrow="Références" title="Témoignages de mes collaborateurs" />
        <Grid columns={{ minWidth: 300, max: 2 }} gap={4}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className={t.featured ? 'ax-featured' : undefined}>
              <Card padding={6} height="100%">
                <VStack gap={4}>
                  <HStack hAlign="between" vAlign="center">
                    <Text color="accent" aria-label="5 étoiles">★★★★★</Text>
                    <img className="ax-logo-sm" src={t.logo} alt={t.company} />
                  </HStack>
                  <Heading level={3}>{t.keyquote}</Heading>
                  <Blockquote>{t.quote}</Blockquote>
                  <HStack gap={3} vAlign="center" hAlign="between">
                    <HStack gap={2} vAlign="center">
                      <Avatar src={t.avatar} name={t.name} size="md" tooltip={false} />
                      <VStack gap={0}>
                        <Text weight="semibold">{t.name}</Text>
                        <Text type="supporting">{t.role}</Text>
                      </VStack>
                    </HStack>
                    <Link href={t.li} isExternalLink isStandalone>LinkedIn</Link>
                  </HStack>
                </VStack>
              </Card>
            </div>
          ))}
        </Grid>
      </VStack>
    </section>
  );
}

// ── Contact & footer ──────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section variant="muted">
      <div id="contact" className="ax-container ax-section ax-contact">
        <VStack gap={4} hAlign="center">
          <SectionTitle eyebrow="Contact" title="Travaillons ensemble" />
          <Text color="secondary" justify="center">
            Disponible pour des missions freelance, des opportunités CDI ou des collaborations ponctuelles à Paris.
          </Text>
          <HStack gap={2} wrap="wrap" hAlign="center">
            <Button
              label={CONTACT.email}
              variant="primary"
              size="lg"
              href={CONTACT.mailto}
              target="_blank"
              icon={<MailOutlined sx={{ fontSize: 16 }} />}
              onClick={() => trackEvent.contactClick('contact_section')}
            />
            <Button
              label="LinkedIn"
              variant="secondary"
              size="lg"
              href={CONTACT.linkedin}
              target="_blank"
              icon={<LinkedIn sx={{ fontSize: 16 }} />}
              onClick={() => trackEvent.linkedinClick('contact_section')}
            />
          </HStack>
        </VStack>
      </div>
    </Section>
  );
}

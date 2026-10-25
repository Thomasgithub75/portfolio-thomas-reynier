import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Divider } from '@astryxdesign/core/Divider';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { TextArea } from '@astryxdesign/core/TextArea';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import MailOutlined from '@mui/icons-material/MailOutlined';
import PrintOutlined from '@mui/icons-material/PrintOutlined';
import AstryxPage from '../layouts/AstryxPage';
import { COMPETENCIES } from '../data/competencies';
import { CONTACT } from '../data/home';
import './JobMatcher.css';

function RouterAnchor({ href, ...props }) {
  return <RouterLink to={href} {...props} />;
}

/* ── Company logo ────────────────────────────────────────────────────────── */
function CompanyLogo({ domaine, entreprise }) {
  const [failed, setFailed] = useState(false);
  const initials = (entreprise || '?').slice(0, 2).toUpperCase();
  if (!domaine || failed) return <span className="jm-logo jm-logo--initials">{initials}</span>;
  return <img className="jm-logo" src={`https://logo.clearbit.com/${domaine}`} alt={entreprise} onError={() => setFailed(true)} />;
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
// Impression (export PDF) : les éléments .no-print, la Navbar et le footer sont masqués (JobMatcher.css)
export default function JobMatcher() {
  const [offre, setOffre]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [results, setResults] = useState(null);
  const [meta, setMeta]     = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  async function handleAnalyse(e) {
    if (e?.preventDefault) e.preventDefault();
    if (offre.trim().length < 50) { setError(true); return; }
    setError(false);
    setLoading(true);
    setResults(null);
    setMeta(null);
    try {
      const res = await fetch('/api/match-competencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offre }),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setMeta({ entreprise: data.entreprise, poste: data.poste, domaine: data.domaine });
      const matched = (data.matched || [])
        .map(id => COMPETENCIES.find(c => c.id === id))
        .filter(Boolean);
      setResults(matched);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    } catch {
      setError('server');
    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const errorStatus = error === true
    ? { type: 'error', message: 'Collez une offre complète pour démarrer le matching.' }
    : error === 'server'
      ? { type: 'error', message: 'Une erreur est survenue. Réessayez dans quelques secondes.' }
      : undefined;

  return (
    <AstryxPage>
      <div className="jm-page">
        {/* ── En-tête — masqué à l'impression ─────────────────────────── */}
        <div className="jm-header no-print">
          <div className="container">
            <VStack gap={4}>
              <Link as={RouterAnchor} href="/" color="secondary" isStandalone>
                <HStack gap={1} vAlign="center"><ArrowBack sx={{ fontSize: 14 }} />Retour</HStack>
              </Link>
              <HStack><Badge label="Matching IA" variant="purple" icon={<AutoAwesomeOutlined sx={{ fontSize: 14 }} />} /></HStack>
              <Heading level={1} type="display-2">Testez notre compatibilité.</Heading>
              <p className="jm-intro">
                Collez votre offre d'emploi. En quelques secondes, vous saurez quelles compétences je peux prouver — et avec quels projets concrets. Résultat exportable en PDF.
              </p>
            </VStack>
          </div>
        </div>

        {/* ── Formulaire — masqué à l'impression ──────────────────────── */}
        <div className="container no-print jm-form">
          <form onSubmit={handleAnalyse}>
            <VStack gap={4}>
              <TextArea
                label="Votre offre d'emploi"
                value={offre}
                onChange={value => { setOffre(value); setError(false); }}
                placeholder="Collez l'offre complète ici — titre du poste, missions, compétences recherchées..."
                rows={10}
                status={errorStatus}
                statusVariant="detached"
              />
              <HStack>
                <Button
                  type="submit"
                  label={loading ? 'Analyse en cours…' : "Lancer l'analyse"}
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  isDisabled={offre.trim().length < 10}
                  icon={<AutoAwesomeOutlined sx={{ fontSize: 16 }} />}
                />
              </HStack>
            </VStack>
          </form>
        </div>

        {/* ── Résultats — visibles à l'écran ET dans le PDF ──────────── */}
        {results && (
          <div ref={resultsRef} className="container jm-results">
            <VStack gap={5}>
              <div className="no-print"><Divider /></div>

              {/* Entreprise × Thomas */}
              <Card padding={6}>
                <div className="jm-match">
                  <HStack gap={3} vAlign="center">
                    <CompanyLogo domaine={meta?.domaine} entreprise={meta?.entreprise} />
                    <VStack gap={0.5}>
                      <Text type="label" color="secondary">Entreprise</Text>
                      <Text size="lg" weight="bold">{meta?.entreprise || '—'}</Text>
                      {meta?.poste && <Text type="supporting">{meta.poste}</Text>}
                    </VStack>
                  </HStack>
                  <span className="jm-times">×</span>
                  <HStack gap={3} vAlign="center">
                    <img className="jm-avatar" src="/images/profile-thumb.jpg" alt="Thomas Reynier" />
                    <VStack gap={0.5}>
                      <Text type="label" color="secondary">Candidat</Text>
                      <Text size="lg" weight="bold">Thomas Reynier</Text>
                      <Text type="supporting">Product Designer IA · Paris</Text>
                    </VStack>
                  </HStack>
                </div>
              </Card>

              {/* Titre + export PDF */}
              <HStack hAlign="between" vAlign="center" wrap="wrap" gap={3}>
                <VStack gap={0.5}>
                  <Text type="supporting">{results.length} point{results.length > 1 ? 's' : ''} de compatibilité · {today}</Text>
                  <Heading level={2}>Analyse de compatibilité</Heading>
                </VStack>
                <div className="no-print">
                  <Button label="Exporter en PDF" variant="ghost" size="sm" icon={<PrintOutlined sx={{ fontSize: 16 }} />} onClick={() => window.print()} />
                </div>
              </HStack>

              {/* Compétences */}
              <VStack gap={4}>
                {results.map((comp, idx) => (
                  <div key={comp.id} className="jm-card">
                    <Card padding={0}>
                      <HStack gap={3} vAlign="center" padding={4}>
                        <span className="jm-num">{idx + 1}</span>
                        <Text weight="bold">{comp.label}</Text>
                      </HStack>
                      {comp.projects.map(proj => (
                        <div key={proj.name} className={`jm-proof${proj.locked ? ' is-locked' : ''}`}>
                          <Divider />
                          <VStack gap={2} padding={5}>
                            <HStack gap={2} vAlign="center" hAlign="between" wrap="wrap">
                              <HStack gap={2} vAlign="center">
                                <img className="jm-proj-logo" src={proj.logo} alt="" />
                                <Text weight="bold" size="sm">{proj.name}</Text>
                              </HStack>
                              <span className="no-print">
                                {proj.locked
                                  ? <Badge label="En entretien" icon={<LockOutlined sx={{ fontSize: 12 }} />} />
                                  : (
                                    <Link href={proj.url} target="_blank" isStandalone size="sm" weight="semibold">
                                      <HStack gap={1} vAlign="center">Voir la preuve complète<ArrowForward sx={{ fontSize: 12 }} /></HStack>
                                    </Link>
                                  )}
                              </span>
                            </HStack>
                            <p className={`jm-proof-text${proj.locked ? ' is-faded' : ''}`}>{proj.proof}</p>
                            {proj.locked && (
                              <div className="jm-locked-banner">
                                <HStack gap={2} vAlign="start">
                                  <LockOutlined sx={{ fontSize: 14 }} />
                                  <Text size="sm" color="accent">Cette étude de cas se présente uniquement en entretien — c'est précisément l'occasion d'en parler.</Text>
                                </HStack>
                                <span className="no-print">
                                  <Button label="Planifier un échange" variant="secondary" size="sm" href={CONTACT.mailto} target="_blank" icon={<MailOutlined sx={{ fontSize: 14 }} />} />
                                </span>
                              </div>
                            )}
                            <p className="print-url">
                              {proj.locked ? 'Présentée en entretien — thomas-reynier.fr' : `thomas-reynier.fr${proj.url}`}
                            </p>
                          </VStack>
                        </div>
                      ))}
                    </Card>
                  </div>
                ))}
              </VStack>

              {/* CTA contact — masqué à l'impression */}
              <div className="jm-cta no-print">
                <VStack gap={1}>
                  <Text weight="bold">La suite se passe en entretien</Text>
                  <Text type="supporting">Je présente chaque point de compatibilité en détail lors d'un entretien vidéo. Prenons 30 minutes.</Text>
                </VStack>
                <Button label="Planifier un échange" variant="primary" href={CONTACT.mailto} target="_blank" icon={<MailOutlined sx={{ fontSize: 16 }} />} />
              </div>
            </VStack>
          </div>
        )}
      </div>
    </AstryxPage>
  );
}

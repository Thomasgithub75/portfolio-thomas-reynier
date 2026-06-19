import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Button from '../components/Button/Button';
import { COMPETENCIES } from '../data/competencies';

/* ── Print CSS ──────────────────────────────────────────────────────────────
   Approche simple : on masque les éléments non-imprimables via .no-print,
   le reste coule naturellement sur la page A4. Pas de position:fixed.
─────────────────────────────────────────────────────────────────────────── */
const PRINT_STYLE = `
@media print {
  @page { size: A4; margin: 15mm 18mm; }
  .no-print { display: none !important; }
  .nav      { display: none !important; }
  .footer   { display: none !important; }
  body, .jm-bg { background: #fff !important; }
  .jm-card  { box-shadow: none !important; border: 1px solid #E5E7EB !important; }
}
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

function injectPrintStyle() {
  if (document.getElementById('jm-print-style')) return;
  const s = document.createElement('style');
  s.id = 'jm-print-style';
  s.textContent = PRINT_STYLE;
  document.head.appendChild(s);
}

/* ── Company logo ────────────────────────────────────────────────────────── */
function CompanyLogo({ domaine, entreprise }) {
  const [failed, setFailed] = useState(false);
  const initials = (entreprise || '?').slice(0, 2).toUpperCase();
  if (!domaine || failed) {
    return (
      <div style={{
        width: 52, height: 52, borderRadius: 12, flexShrink: 0,
        background: 'var(--text)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 17, fontWeight: 800, color: '#fff',
        letterSpacing: '-.02em',
      }}>{initials}</div>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${domaine}`}
      alt={entreprise}
      onError={() => setFailed(true)}
      style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'contain', background: 'var(--bg)', border: '1px solid var(--border)', flexShrink: 0 }}
    />
  );
}

/* ── Spinner icon ────────────────────────────────────────────────────────── */
const SpinnerIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

const BoltIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
  </svg>
);

const PrintIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function JobMatcher() {
  const [offre, setOffre]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [results, setResults] = useState(null);
  const [meta, setMeta]     = useState(null);
  const resultsRef = useRef(null);
  const isMobile   = useMediaQuery('(max-width:768px)');

  useEffect(() => { injectPrintStyle(); }, []);

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

  return (
    <>
      <Navbar/>
      <div className="jm-bg" style={{ minHeight: '100vh', background: 'var(--bg-soft)' }}>

        {/* ── Page header — masqué à l'impression ──────────────────────── */}
        <div className="no-print" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: isMobile ? '24px 20px 28px' : '36px 0 40px' }}>
          <div className="container">
            <Link className="back-link" to="/">
              <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Retour
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)', background: 'var(--blue-light)', padding: '3px 10px', borderRadius: 20 }}>Matching IA</span>
            </div>
            <h1 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: 10 }}>
              Testez notre compatibilité.
            </h1>
            <p style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 300, maxWidth: 520, lineHeight: 1.65 }}>
              Collez votre offre d'emploi. En quelques secondes, vous saurez quelles compétences je peux prouver — et avec quels projets concrets. Résultat exportable en PDF.
            </p>
          </div>
        </div>

        {/* ── Formulaire — masqué à l'impression ───────────────────────── */}
        <div className="container no-print" style={{ paddingTop: 36, paddingBottom: 12 }}>
          <form onSubmit={handleAnalyse}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: 8 }}>
              Votre offre d'emploi
            </label>
            <textarea
              value={offre}
              onChange={e => { setOffre(e.target.value); setError(false); }}
              placeholder="Collez l'offre complète ici — titre du poste, missions, compétences recherchées..."
              rows={isMobile ? 8 : 10}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '14px 16px', borderRadius: 10, fontSize: 14,
                border: error === true ? '1.5px solid #EF4444' : '1.5px solid var(--border)',
                background: 'var(--bg)', fontFamily: 'inherit', lineHeight: 1.6,
                resize: 'vertical', outline: 'none', color: 'var(--text)',
                transition: 'border-color .15s',
              }}
            />
            {error === true && (
              <p style={{ fontSize: 12, color: '#EF4444', marginTop: 6 }}>
                Collez une offre complète pour démarrer le matching.
              </p>
            )}
            {error === 'server' && (
              <p style={{ fontSize: 12, color: '#EF4444', marginTop: 6 }}>
                Une erreur est survenue. Réessayez dans quelques secondes.
              </p>
            )}
            <div style={{ marginTop: 14 }}>
              <Button
                variant="primary"
                disabled={loading}
                onClick={handleAnalyse}
                startIcon={loading ? <SpinnerIcon/> : <BoltIcon/>}
                sx={{ width: isMobile ? '100%' : 'auto' }}
              >
                {loading ? 'Analyse en cours…' : 'Lancer l\'analyse'}
              </Button>
            </div>
          </form>
        </div>

        {/* ── Résultats — visibles à l'écran ET dans le PDF ───────────── */}
        {results && (
          <div ref={resultsRef} style={{ paddingBottom: 60 }}>
            <div className="container">
              <hr className="no-print" style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '28px 0' }}/>

              {/* Carte entreprise × Thomas ─────────────────────────────── */}
              <div className="jm-card" style={{
                background: 'var(--bg)', borderRadius: 14, border: '1px solid var(--border)',
                padding: isMobile ? '20px 16px' : '24px 28px',
                display: 'flex', alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 20 : 0,
                marginBottom: 20,
              }}>
                {/* Entreprise */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                  <CompanyLogo domaine={meta?.domaine} entreprise={meta?.entreprise}/>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 3 }}>Entreprise</p>
                    <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.02em' }}>{meta?.entreprise || '—'}</p>
                    {meta?.poste && <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2, fontWeight: 400 }}>{meta.poste}</p>}
                  </div>
                </div>

                {/* × */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '100%' : 72, flexShrink: 0 }}>
                  {isMobile
                    ? <div style={{ width: '100%', height: 1, background: 'var(--border)', position: 'relative' }}>
                        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'var(--bg-soft)', padding: '0 10px', fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>×</span>
                      </div>
                    : <span style={{ fontSize: 22, color: 'var(--border)', fontWeight: 300 }}>×</span>
                  }
                </div>

                {/* Thomas */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
                  <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 3 }}>Candidat</p>
                    <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.02em' }}>Thomas Reynier</p>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>Product Designer IA · Paris</p>
                  </div>
                  <img
                    src="/images/profile.png"
                    alt="Thomas Reynier"
                    style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0, order: isMobile ? 0 : 1 }}
                  />
                </div>
              </div>

              {/* Titre + bouton PDF ───────────────────────────────────── */}
              <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 12, marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>
                    {results.length} point{results.length > 1 ? 's' : ''} de compatibilité · {today}
                  </p>
                  <h2 style={{ fontSize: isMobile ? 19 : 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-.02em' }}>
                    Notre compatibilité
                  </h2>
                </div>
                <div className="no-print">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.print()}
                    startIcon={<PrintIcon/>}
                  >
                    Exporter en PDF
                  </Button>
                </div>
              </div>

              {/* Cards compétences ────────────────────────────────────── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {results.map((comp, idx) => (
                  <div
                    key={comp.id}
                    className="jm-card"
                    style={{ background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden', pageBreakInside: 'avoid' }}
                  >
                    {/* En-tête compétence */}
                    <div style={{ padding: isMobile ? '12px 16px' : '14px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-soft)' }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--blue)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</span>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{comp.label}</p>
                    </div>

                    {/* Projets */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {comp.projects.map((proj, pIdx) => (
                        <div
                          key={proj.name}
                          style={{
                            padding: isMobile ? '16px' : '18px 24px',
                            borderBottom: pIdx < comp.projects.length - 1 ? '1px solid var(--border)' : 'none',
                            display: 'flex', flexDirection: 'column', gap: 8,
                            background: proj.locked ? 'var(--bg-soft)' : 'var(--bg)',
                          }}
                        >
                          {/* Ligne projet */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <img src={proj.logo} alt={proj.name} style={{ width: 18, height: 18, objectFit: 'contain', borderRadius: 4, flexShrink: 0 }}/>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{proj.name}</span>
                            {proj.locked ? (
                              <span className="no-print" style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: 'var(--muted)', background: 'var(--bg-soft)', border: '1px solid var(--border)', padding: '3px 9px', borderRadius: 20, flexShrink: 0 }}>
                                <LockIcon/>En entretien
                              </span>
                            ) : (
                              <a className="no-print" href={proj.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                                Voir la preuve complète
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                              </a>
                            )}
                          </div>

                          {/* Preuve */}
                          {proj.locked ? (
                            <>
                              <div style={{ position: 'relative' }}>
                                <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.7, fontWeight: 300, WebkitMaskImage: 'linear-gradient(to bottom, black 35%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 35%, transparent 100%)', userSelect: 'none' }}>
                                  {proj.proof}
                                </p>
                              </div>
                              {/* Bannière entretien */}
                              <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 10, background: 'var(--blue-light)', border: '1px solid var(--blue-border)', borderRadius: 9, padding: '12px 14px', marginTop: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                                  <LockIcon/>
                                  <p style={{ fontSize: 12.5, color: 'var(--blue-deep)', lineHeight: 1.55, fontWeight: 400 }}>
                                    Cette étude de cas se présente uniquement en entretien — c'est précisément l'occasion d'en parler.
                                  </p>
                                </div>
                                <a
                                  href="https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="no-print"
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--blue)', background: 'var(--bg)', border: '1.5px solid var(--blue-border)', borderRadius: 7, padding: '6px 12px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
                                >
                                  <MailIcon/>
                                  Planifier un échange
                                </a>
                              </div>
                            </>
                          ) : (
                            <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.7, fontWeight: 300 }}>{proj.proof}</p>
                          )}

                          {/* URL PDF only */}
                          <p style={{ display: 'none', fontSize: 10, color: 'var(--muted)' }} className="print-url">
                            {proj.locked ? 'Présentée en entretien — thomas-reynier.fr' : `thomas-reynier.fr${proj.url}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA contact — masqué à l'impression ─────────────────── */}
              <div className="no-print" style={{ marginTop: 28, padding: '24px', background: 'var(--blue-light)', borderRadius: 12, border: '1px solid var(--blue-border)', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>La suite se passe en entretien</p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300 }}>Je présente chaque point de compatibilité en détail lors d'un entretien vidéo. Prenons 30 minutes.</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  href="https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com"
                  startIcon={<MailIcon/>}
                  sx={{ width: isMobile ? '100%' : 'auto', justifyContent: 'center', flexShrink: 0 }}
                >
                  Planifier un échange
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

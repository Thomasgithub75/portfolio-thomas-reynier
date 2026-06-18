import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import { COMPETENCIES } from '../data/competencies';

function CompanyLogo({ domaine, entreprise }) {
  const [failed, setFailed] = useState(false);
  const initials = (entreprise || '?').slice(0, 2).toUpperCase();
  if (!domaine || failed) {
    return (
      <div style={{
        width: 52, height: 52, borderRadius: 12, flexShrink: 0,
        background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-.02em',
      }}>{initials}</div>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${domaine}`}
      alt={entreprise}
      onError={() => setFailed(true)}
      style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'contain', background: '#fff', border: '1px solid var(--border)', flexShrink: 0 }}
    />
  );
}

const PRINT_STYLE = `
@media print {
  @page { size: A4; margin: 18mm 20mm; }
  body > * { visibility: hidden !important; }
  .jm-print-area, .jm-print-area * { visibility: visible !important; }
  .jm-print-area {
    position: fixed !important;
    top: 0 !important; left: 0 !important;
    width: 100% !important;
    padding: 0 !important;
  }
  .no-print { display: none !important; }
}
`;

function injectPrintStyle() {
  if (document.getElementById('jm-print-style')) return;
  const s = document.createElement('style');
  s.id = 'jm-print-style';
  s.textContent = PRINT_STYLE;
  document.head.appendChild(s);
}

export default function JobMatcher() {
  const [offre, setOffre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const resultsRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:768px)');

  const [meta, setMeta] = useState(null); // { entreprise, poste, domaine }

  async function handleAnalyse(e) {
    e.preventDefault();
    if (offre.trim().length < 50) { setError("Collez une offre d'emploi complète pour lancer l'analyse."); return; }
    setError('');
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
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      setError("Une erreur est survenue. Réessayez dans quelques secondes.");
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    injectPrintStyle();
    window.print();
  }

  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <Navbar/>
      <div style={{ minHeight: '100vh', background: 'var(--bg-soft, #F8F9FB)' }}>

        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: isMobile ? '24px 20px 28px' : '36px 0 40px' }}>
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

        {/* Input */}
        <div className="container no-print" style={{ paddingTop: 36, paddingBottom: 12 }}>
          <form onSubmit={handleAnalyse}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: 8 }}>
              Votre offre d'emploi
            </label>
            <textarea
              value={offre}
              onChange={e => { setOffre(e.target.value); setError(''); }}
              placeholder="Collez l'offre complète ici — titre du poste, missions, compétences recherchées..."
              rows={isMobile ? 8 : 10}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '14px 16px', borderRadius: 10, fontSize: 14,
                border: error ? '1.5px solid #EF4444' : '1.5px solid var(--border)',
                background: '#fff', fontFamily: 'inherit', lineHeight: 1.6,
                resize: 'vertical', outline: 'none', color: 'var(--text)',
              }}
            />
            {error && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 6 }}>Collez une offre complète pour démarrer le matching.</p>}
            <div style={{ marginTop: 12 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: loading ? '#6B7280' : '#111827', color: '#fff',
                  fontSize: 14, fontWeight: 600, padding: '11px 22px', borderRadius: 9,
                  border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  width: isMobile ? '100%' : 'auto', justifyContent: 'center',
                  transition: 'background .15s',
                }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Matching en cours…
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    Lancer le matching
                  </>
                )}
              </button>
            </div>
          </form>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* Results */}
        {results && (
          <div ref={resultsRef} style={{ paddingBottom: 60 }}>
            <div className="container">
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '28px 0' }}/>

              {/* Header — affiché à l'écran ET dans le PDF */}
              <div className="jm-print-area" style={{ marginBottom: 28 }}>

                {/* Carte entreprise × Thomas */}
                <div style={{
                  background: '#fff', borderRadius: 14, border: '1px solid var(--border)',
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

                  {/* Séparateur × */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: isMobile ? '100%' : 72, flexShrink: 0,
                  }}>
                    {isMobile
                      ? <div style={{ width: '100%', height: 1, background: 'var(--border)', position: 'relative' }}>
                          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#F8F9FB', padding: '0 10px', fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>×</span>
                        </div>
                      : <span style={{ fontSize: 22, color: '#D1D5DB', fontWeight: 300 }}>×</span>
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
                      style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0, order: isMobile ? 0 : 1 }}
                    />
                  </div>
                </div>

                {/* Titre + actions */}
                <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 12 }}>
                  <div>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>{results.length} point{results.length > 1 ? 's' : ''} de compatibilité · {today}</p>
                    <h2 style={{ fontSize: isMobile ? 19 : 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-.02em' }}>Notre compatibilité</h2>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="no-print"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      background: '#fff', color: 'var(--text)',
                      fontSize: 13, fontWeight: 600, padding: '9px 16px', borderRadius: 8,
                      border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                      <rect x="6" y="14" width="12" height="8"/>
                    </svg>
                    Exporter en PDF
                  </button>
                </div>
              </div>

              {/* Competency cards */}
              <div className="jm-print-area" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {results.map((comp, idx) => (
                  <div
                    key={comp.id}
                    style={{
                      background: '#fff', borderRadius: 12, border: '1px solid var(--border)',
                      overflow: 'hidden', pageBreakInside: 'avoid',
                    }}
                  >
                    {/* Competency header */}
                    <div style={{ padding: isMobile ? '14px 16px' : '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: '#FAFAFA' }}>
                      <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--blue)', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</span>
                      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{comp.label}</p>
                    </div>

                    {/* Projects */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {comp.projects.map((proj, pIdx) => (
                        <div
                          key={proj.name}
                          style={{
                            padding: isMobile ? '16px' : '20px 24px',
                            borderBottom: pIdx < comp.projects.length - 1 ? '1px solid var(--border)' : 'none',
                            display: 'flex', flexDirection: 'column', gap: 10,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <img src={proj.logo} alt={proj.name} style={{ width: 20, height: 20, objectFit: 'contain', borderRadius: 4, flexShrink: 0 }}/>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{proj.name}</span>
                            <Link
                              to={proj.url}
                              className="no-print"
                              style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}
                            >
                              Voir la preuve complète
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>
                          </div>
                          <p style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.7, fontWeight: 300 }}>{proj.proof}</p>
                          {/* Print URL */}
                          <p style={{ display: 'none', fontSize: 10, color: '#9CA3AF' }} className="print-url">
                            thomas-reynier.fr{proj.url}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="no-print" style={{ marginTop: 32, padding: '24px', background: 'var(--blue-light, #EFF6FF)', borderRadius: 12, border: '1px solid var(--blue)', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>La suite se passe en entretien</p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300 }}>Je présente chaque point de compatibilité en détail lors d'un entretien vidéo. Prenons 30 minutes.</p>
                </div>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com"
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#111827', color: '#fff', fontSize: 13, fontWeight: 600,
                    padding: '10px 18px', borderRadius: 8, textDecoration: 'none',
                    whiteSpace: 'nowrap', flexShrink: 0,
                    width: isMobile ? '100%' : 'auto', justifyContent: 'center', boxSizing: 'border-box',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  Planifier un échange
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

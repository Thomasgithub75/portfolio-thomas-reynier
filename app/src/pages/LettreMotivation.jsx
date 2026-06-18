import { useState, useRef, useCallback, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Button from '../components/Button/Button';
import FormField from '../components/FormField/FormField';
import Toggle from '../components/Toggle/Toggle';
import Tag from '../components/Tag/Tag';
import { tokens } from '../theme/theme';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StopIcon from '@mui/icons-material/Stop';

// ── Auth ──────────────────────────────────────────────────────────────────────
const PASSWORD = import.meta.env.VITE_LETTER_PASSWORD || 'thomas2026';

// ── Ton options ───────────────────────────────────────────────────────────────
const TONS = [
  { id: 'equilibre', label: 'Équilibré' },
  { id: 'formel',    label: 'Formel' },
  { id: 'concis',    label: 'Concis' },
  { id: 'engage',    label: 'Engagé' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function frenchDate() {
  return new Date().toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function parseLetter(text) {
  const kpiMatch = text.match(/\[KPI_START\]([\s\S]*?)\[KPI_END\]/);
  const kpiContent = kpiMatch ? kpiMatch[1].trim() : null;
  const bodyText = text.replace(/\[KPI_START\][\s\S]*?\[KPI_END\]/, '[KPI_BLOCK]');
  const paragraphs = bodyText.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  return { paragraphs, kpiContent };
}

function renderInline(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ fontWeight: 600 }}>{part}</strong> : part
  );
}

function buildHtmlFromSegments(segs) {
  return segs.map(seg => {
    if (seg.type === 'kpi') {
      const html = seg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return `<div class="lm-kpi"><span class="lm-kpi-icon">◆</span><span>${html}</span></div>`;
    }
    const html = seg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return `<p class="lm-p">${html}</p>`;
  }).join('');
}

// ── Print styles injected once ────────────────────────────────────────────────
const PRINT_STYLE = `
@media print {
  @page { size: A4; margin: 0; }
  body > * { visibility: hidden !important; }
  .lm-print-area, .lm-print-area * { visibility: visible !important; }
  .lm-print-area {
    position: fixed !important;
    top: 0 !important; left: 0 !important;
    width: 210mm !important;
    padding: 20mm 22mm !important;
    background: #fff !important;
    box-shadow: none !important;
    border: none !important;
  }
  .lm-print-textarea { display: none !important; }
  .lm-print-body { display: block !important; }
  .lm-p {
    font-size: 12pt !important;
    line-height: 1.8 !important;
    color: #1A2540 !important;
    margin-bottom: 10pt !important;
  }
  .lm-kpi {
    display: flex !important;
    gap: 10pt !important;
    border-left: 3px solid #1956DB !important;
    background: #EEF3FD !important;
    padding: 10pt 14pt !important;
    margin: 12pt 0 !important;
    font-size: 11pt !important;
    color: #1956DB !important;
    border-radius: 6pt !important;
  }
  .lm-kpi-icon {
    font-weight: 700 !important;
    flex-shrink: 0 !important;
  }
}
`;

// ── Sub-components ─────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }) {

  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    if (pwd === PASSWORD) { onUnlock(); }
    else { setError(true); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div style={{
      minHeight: '100vh', background: tokens.bgSoft,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff', border: `1px solid ${tokens.border}`,
        borderRadius: 14, padding: '40px 48px', width: 380,
        textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,.06)',
      }}>
        <div style={{ fontSize: 28, marginBottom: 16 }}>🔒</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: tokens.text, marginBottom: 6 }}>Accès privé</div>
        <div style={{ fontSize: 13, color: tokens.muted, fontWeight: 300, marginBottom: 28 }}>
          Cette page est réservée à Thomas.
        </div>
        <input
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Mot de passe"
          autoFocus
          style={{
            width: '100%', padding: '11px 14px',
            border: `1px solid ${error ? '#EF4444' : tokens.border}`,
            borderRadius: 8, fontSize: 14, fontFamily: 'Outfit, sans-serif',
            marginBottom: 12, outline: 'none', textAlign: 'center',
            transition: 'border-color .15s',
          }}
        />
        {error && <div style={{ fontSize: 12, color: '#EF4444', marginBottom: 12 }}>Mot de passe incorrect</div>}
        <Button variant="primary" onClick={submit} sx={{ width: '100%' }}>
          Accéder
        </Button>
      </div>
    </div>
  );
}

function StreamingBody({ text }) {
  const { paragraphs, kpiContent } = parseLetter(text);
  return (
    <div>
      {paragraphs.map((p, i) => {
        if (p === '[KPI_BLOCK]' && kpiContent) {
          return (
            <div key={i} className="lm-kpi" style={{
              background: tokens.primary[50], border: `1px solid ${tokens.primary[100]}`,
              borderLeft: `3px solid ${tokens.primary[400]}`,
              borderRadius: 8, padding: '12px 16px', margin: '14px 0',
              fontSize: 12.5, color: tokens.primary[600], lineHeight: 1.7,
              display: 'flex', gap: 10,
            }}>
              <span style={{ color: tokens.primary[400], fontWeight: 700, flexShrink: 0 }}>◆</span>
              <span>{renderInline(kpiContent)}</span>
            </div>
          );
        }
        return (
          <p key={i} className="lm-p" style={{
            fontSize: 13, color: tokens.gray[600], lineHeight: 1.8,
            fontWeight: 300, marginBottom: 13,
          }}>
            {renderInline(p)}
          </p>
        );
      })}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function LettreMotivation() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem('lm_auth') === '1');

  const handleUnlock = () => {
    localStorage.setItem('lm_auth', '1');
    setUnlocked(true);
  };

  if (!unlocked) return <PasswordGate onUnlock={handleUnlock} />;
  return <LettreApp />;
}

function LettreApp() {
  const isMobile = useMediaQuery('(max-width:768px)');

  // Form
  const [entreprise, setEntreprise] = useState('');
  const [poste, setPoste] = useState('');
  const [offre, setOffre] = useState('');
  const [contexteOn, setContexteOn] = useState(false);
  const [contexte, setContexte] = useState('');
  const [ton, setTon] = useState('equilibre');

  // Generation
  const [status, setStatus] = useState('idle'); // idle | generating | done | error
  const [errorMsg, setErrorMsg] = useState('');
  const [letterText, setLetterText] = useState('');
  const letterAccumRef = useRef(''); // source de vérité pour le texte accumulé (sync)
  const [segments, setSegments] = useState([]); // paragraphes édités indépendamment
  const abortRef = useRef(null);

  // Print
  const printBodyRef = useRef(null);

  // Copy
  const [copied, setCopied] = useState(false);

  // Inject print styles once
  useEffect(() => {
    const el = document.createElement('style');
    el.innerHTML = PRINT_STYLE;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  // Segments : parse quand done, reset quand idle
  useEffect(() => {
    if (status === 'done') {
      const { paragraphs, kpiContent } = parseLetter(letterAccumRef.current);
      setSegments(paragraphs.map(p => {
        if (p === '[KPI_BLOCK]') {
          return { type: 'kpi', text: (kpiContent || '').replace(/\*\*/g, '') };
        }
        return { type: 'paragraph', text: p.replace(/\*\*/g, '') };
      }));
    }
    if (status === 'idle') {
      letterAccumRef.current = '';
      setSegments([]);
    }
  }, [status]);

  // Generate
  const generate = useCallback(async () => {
    if (!offre.trim() || offre.trim().length < 50) return;
    setStatus('generating');
    setLetterText('');
    letterAccumRef.current = '';
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offre, ton, entreprise, poste, contexte: contexteOn ? contexte : '' }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error('Erreur API');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') { setStatus('done'); continue; }
          let parsed;
          try { parsed = JSON.parse(raw); } catch { continue; }
          if (parsed.error) throw new Error(parsed.error); // remonte au catch externe
          if (parsed.text) {
            letterAccumRef.current += parsed.text;
            setLetterText(letterAccumRef.current);
          }
        }
      }
      setStatus('done');
    } catch (err) {
      if (err.name !== 'AbortError') {
        setErrorMsg(err.message || 'Erreur inconnue');
        setStatus('error');
        console.error('[LettreMotivation] Erreur génération:', err.message);
      }
    }
  }, [offre, ton, entreprise, poste, contexte, contexteOn]);

  const handleStop = () => { abortRef.current?.abort(); setStatus('idle'); };

  const updateSegment = (index, newText) => {
    setSegments(prev => prev.map((seg, i) => i === index ? { ...seg, text: newText } : seg));
  };

  const handleCopy = () => {
    const text = segments.map(seg => seg.text).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePdf = () => {
    if (printBodyRef.current) {
      printBodyRef.current.innerHTML = buildHtmlFromSegments(segments);
    }
    window.print();
  };

  const handleRegen = () => {
    setStatus('idle');
    setTimeout(generate, 50);
  };

  const canGenerate = offre.trim().length >= 50;

  // ── Shared styles ──────────────────────────────────────────────────────────
  const card = {
    background: '#fff',
    border: `1px solid ${tokens.border}`,
    borderRadius: 12,
    overflow: 'hidden',
  };
  const cardHeader = {
    padding: isMobile ? '12px 16px' : '14px 20px',
    borderBottom: `1px solid ${tokens.border}`,
    display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
    justifyContent: 'space-between', gap: 8,
    flexWrap: isMobile ? 'wrap' : 'nowrap',
  };
  const cardTitle = { fontSize: 13, fontWeight: 600, color: tokens.text };
  const cardSub = { fontSize: 11.5, fontWeight: 300, marginTop: 1 };

  const statusColor = {
    idle: tokens.muted,
    generating: tokens.primary[500],
    done: '#22C55E',
    error: '#EF4444',
  };
  const statusLabel = {
    idle: 'En attente',
    generating: 'Rédaction en cours…',
    done: 'Prête',
    error: 'Erreur',
  };

  return (
    <div style={{ minHeight: '100vh', background: tokens.bgSoft, display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Page header */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '24px 16px 16px' : '32px 32px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: tokens.primary[500], letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Outil personnel
          </div>
          <h1 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, color: tokens.text, letterSpacing: '-.03em', marginBottom: 6 }}>
            Lettre de motivation
          </h1>
          <p style={{ fontSize: 13, color: tokens.muted, fontWeight: 300 }}>
            Colle une offre d'emploi et génère une lettre personnalisée depuis ton profil.
          </p>
        </div>

        {/* Two-column grid */}
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: isMobile ? '0 16px 48px' : '0 32px 64px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '340px 1fr',
          gap: 16,
          alignItems: 'start',
        }}>

          {/* ── LEFT CARD ── */}
          <div style={card}>
            <div style={cardHeader}>
              <div>
                <div style={cardTitle}>Offre d'emploi</div>
                <div style={{ ...cardSub, color: tokens.muted }}>Colle le texte complet de l'offre</div>
              </div>
            </div>
            <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>

              <FormField label="Entreprise" placeholder="Ex : Weborama" value={entreprise} onChange={e => setEntreprise(e.target.value)} />
              <FormField label="Poste" placeholder="Ex : Product Designer IA" value={poste} onChange={e => setPoste(e.target.value)} />
              <FormField type="textarea" label="Texte de l'offre" placeholder="Colle ici le texte complet de l'offre d'emploi…" value={offre} onChange={e => setOffre(e.target.value)} rows={7} />

              {/* Divider */}
              <div style={{ borderTop: `1px solid ${tokens.border}`, margin: '2px 0' }} />

              {/* Contexte toggle */}
              <Toggle checked={contexteOn} onChange={setContexteOn} label="Contexte complémentaire" />
              {contexteOn && (
                <FormField
                  type="textarea"
                  placeholder="Info trouvée sur leur site, angle à mettre en avant…"
                  value={contexte}
                  onChange={e => setContexte(e.target.value)}
                  rows={3}
                />
              )}

              {/* Divider */}
              <div style={{ borderTop: `1px solid ${tokens.border}`, margin: '2px 0' }} />

              {/* Ton */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: tokens.muted, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>Ton</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {TONS.map(t => (
                    <Tag
                      key={t.id}
                      category="secondary"
                      clickable
                      isActive={ton === t.id}
                      onClick={() => setTon(t.id)}
                    >
                      {t.label}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              {status === 'generating' ? (
                <Button
                  variant="secondary"
                  onClick={handleStop}
                  startIcon={<StopIcon sx={{ fontSize: 15 }} />}
                  sx={{ width: '100%' }}
                >
                  Arrêter
                </Button>
              ) : status === 'done' ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRegen}
                  startIcon={<RefreshIcon sx={{ fontSize: 13 }} />}
                  sx={{ width: '100%' }}
                >
                  Regénérer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={generate}
                  disabled={!canGenerate}
                  startIcon={<AutoAwesomeIcon sx={{ fontSize: 15 }} />}
                  sx={{ width: '100%' }}
                >
                  Générer la lettre
                </Button>
              )}
              {!canGenerate && offre.length > 0 && (
                <div style={{ fontSize: 11, color: tokens.muted, textAlign: 'center', marginTop: -6 }}>
                  Offre trop courte — colle l'offre complète
                </div>
              )}

            </div>
          </div>

          {/* ── RIGHT CARD ── */}
          <div style={card}>
            <div style={cardHeader}>
              <div>
                <div style={cardTitle}>Lettre générée</div>
                <div style={{ ...cardSub, color: statusColor[status] }}>{statusLabel[status]}</div>
              </div>
              {status === 'done' && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <Button variant="secondary" size="sm" onClick={handleCopy}
                    startIcon={copied ? <CheckIcon sx={{ fontSize: 13, color: '#22C55E' }} /> : <ContentCopyIcon sx={{ fontSize: 13 }} />}>
                    {copied ? 'Copié !' : 'Copier'}
                  </Button>
                  <Button variant="primary" size="sm" onClick={handlePdf}
                    startIcon={<FileDownloadIcon sx={{ fontSize: 13 }} />}>
                    PDF A4
                  </Button>
                </div>
              )}
            </div>

            {/* Card body */}
            <div style={{ padding: 20, background: tokens.bgPanel }}>

              {/* Empty state */}
              {status === 'idle' && (
                <div style={{
                  minHeight: 400, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 10,
                  color: tokens.muted,
                }}>
                  <AutoAwesomeIcon sx={{ fontSize: 32, color: tokens.gray[300] }} />
                  <div style={{ fontSize: 13, fontWeight: 300 }}>Colle une offre et clique sur Générer</div>
                </div>
              )}

              {/* Error state */}
              {status === 'error' && (
                <div style={{ textAlign: 'center', padding: 40, color: '#EF4444', fontSize: 13 }}>
                  {errorMsg || 'Une erreur est survenue. Vérifie ta connexion et réessaie.'}
                </div>
              )}

              {/* A4 Document */}
              {(status === 'generating' || status === 'done') && (
                <div>

                  {/* A4 sheet */}
                  <div className="lm-print-area" style={{
                    background: '#fff',
                    border: `1px solid ${tokens.border}`,
                    boxShadow: '0 2px 16px rgba(26,37,64,.07), 0 8px 32px rgba(26,37,64,.04)',
                    borderRadius: 3,
                    padding: isMobile ? '28px 20px' : '48px 52px',
                  }}>

                    {/* Sender */}
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: tokens.text, letterSpacing: '-.01em', marginBottom: 2 }}>
                        Thomas Reynier
                      </div>
                      <div style={{ fontSize: 11.5, color: tokens.muted, fontWeight: 300, lineHeight: 1.9 }}>
                        reynier.design@gmail.com &nbsp;·&nbsp; 06 26 53 21 29<br />
                        linkedin.com/in/thomas-reynier-product-design &nbsp;·&nbsp; Paris
                      </div>
                    </div>

                    {/* Date + recipient */}
                    <div style={{ fontSize: 12, color: tokens.gray[400], fontWeight: 300, marginBottom: 6 }}>
                      Paris, le {frenchDate()}
                    </div>
                    {(entreprise || poste) && (
                      <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 10.5, color: tokens.gray[300], textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 500, marginBottom: 2 }}>
                          À l'attention de
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: tokens.text, letterSpacing: '-.01em' }}>
                          {[entreprise, poste].filter(Boolean).join(' — ')}
                        </div>
                      </div>
                    )}

                    {/* Streaming body (non-editable) */}
                    {status === 'generating' && (
                      <StreamingBody text={letterText} />
                    )}

                    {/* Editable body — un FormField par paragraphe */}
                    {status === 'done' && segments.length > 0 && (
                      <>
                        <div className="lm-print-textarea" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {segments.map((seg, i) =>
                            seg.type === 'kpi' ? (
                              <div key={i} style={{
                                background: tokens.primary[50],
                                border: `1px solid ${tokens.primary[100]}`,
                                borderLeft: `3px solid ${tokens.primary[400]}`,
                                borderRadius: 8,
                                padding: '4px 8px 4px 12px',
                                display: 'flex',
                                gap: 8,
                                alignItems: 'flex-start',
                              }}>
                                <span style={{
                                  color: tokens.primary[400], fontWeight: 700,
                                  flexShrink: 0, paddingTop: 10, fontSize: 12,
                                }}>◆</span>
                                <FormField
                                  type="textarea"
                                  value={seg.text}
                                  onChange={e => updateSegment(i, e.target.value)}
                                  rows={3}
                                  sx={{
                                    background: 'transparent',
                                    fontSize: '12.5px',
                                    color: tokens.primary[600],
                                    fontWeight: 500,
                                    lineHeight: '1.7',
                                  }}
                                />
                              </div>
                            ) : (
                              <FormField
                                key={i}
                                type="textarea"
                                value={seg.text}
                                onChange={e => updateSegment(i, e.target.value)}
                                rows={4}
                                sx={{
                                  fontSize: '13px',
                                  color: tokens.gray[600],
                                  fontWeight: 300,
                                  lineHeight: '1.8',
                                }}
                              />
                            )
                          )}
                        </div>
                        <div ref={printBodyRef} className="lm-print-body" />
                      </>
                    )}

                    {/* Signature */}
                    <div style={{ fontSize: 13, fontWeight: 600, color: tokens.text, letterSpacing: '-.01em', marginTop: 28 }}>
                      Thomas Reynier
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Print body styles — hidden in screen, shown during print via PRINT_STYLE */}
      <style>{`
        .lm-print-body { display: none; }
        .lm-p {
          font-size: 13px;
          color: ${tokens.gray[600]};
          line-height: 1.8;
          font-weight: 300;
          margin-bottom: 13px;
        }
        .lm-kpi {
          background: ${tokens.primary[50]};
          border: 1px solid ${tokens.primary[100]};
          border-left: 3px solid ${tokens.primary[400]};
          border-radius: 8px;
          padding: 12px 16px;
          margin: 14px 0;
          font-size: 12.5px;
          color: ${tokens.primary[600]};
          line-height: 1.7;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .lm-kpi-icon {
          color: ${tokens.primary[400]};
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
      `}</style>
    </div>
  );
}

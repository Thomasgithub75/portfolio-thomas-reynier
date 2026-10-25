import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Divider } from '@astryxdesign/core/Divider';
import { Heading } from '@astryxdesign/core/Heading';
import { Switch } from '@astryxdesign/core/Switch';
import { Text } from '@astryxdesign/core/Text';
import { TextArea } from '@astryxdesign/core/TextArea';
import { TextInput } from '@astryxdesign/core/TextInput';
import { ToggleButton, ToggleButtonGroup } from '@astryxdesign/core/ToggleButton';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StopIcon from '@mui/icons-material/Stop';
import AstryxPage from '../layouts/AstryxPage';
import AccessGate from '../components/AccessGate/AccessGate';
import './LettreMotivation.css';

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
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
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

// ── Lettre en cours de rédaction (non éditable) ──────────────────────────────
function StreamingBody({ text }) {
  const { paragraphs, kpiContent } = parseLetter(text);
  return (
    <div>
      {paragraphs.map((p, i) => (
        p === '[KPI_BLOCK]' && kpiContent
          ? <div key={i} className="lm-kpi"><span className="lm-kpi-icon">◆</span><span>{renderInline(kpiContent)}</span></div>
          : <p key={i} className="lm-p">{renderInline(p)}</p>
      ))}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function LettreMotivation() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem('lm_auth') === '1');

  if (!unlocked) {
    return (
      <AccessGate
        title="Accès privé"
        description="Cette page est réservée à Thomas."
        placeholder="Mot de passe"
        errorMessage="Mot de passe incorrect"
        check={pwd => pwd === PASSWORD}
        onUnlock={() => { localStorage.setItem('lm_auth', '1'); setUnlocked(true); }}
      />
    );
  }
  return <LettreApp />;
}

const STATUS = {
  idle: { label: 'En attente', className: '' },
  generating: { label: 'Rédaction en cours…', className: 'is-generating' },
  done: { label: 'Prête', className: 'is-done' },
  error: { label: 'Erreur', className: 'is-error' },
};

function LettreApp() {
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

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <AstryxPage>
      <main className="lm-page">
        {/* En-tête */}
        <div className="lm-container lm-head">
          <VStack gap={1}>
            <p className="section-label">Outil personnel</p>
            <Heading level={1} type="display-3">Lettre de motivation</Heading>
            <Text color="secondary">Colle une offre d'emploi et génère une lettre personnalisée depuis ton profil.</Text>
          </VStack>
        </div>

        <div className="lm-container lm-grid">
          {/* ── Offre ── */}
          <Card padding={0}>
            <VStack gap={0.5} padding={4}>
              <Text weight="semibold">Offre d'emploi</Text>
              <Text type="supporting">Colle le texte complet de l'offre</Text>
            </VStack>
            <Divider />
            <VStack gap={4} padding={5}>
              <TextInput label="Entreprise" placeholder="Ex : Weborama" value={entreprise} onChange={setEntreprise} width="100%" />
              <TextInput label="Poste" placeholder="Ex : Product Designer IA" value={poste} onChange={setPoste} width="100%" />
              <TextArea
                label="Texte de l'offre"
                placeholder="Colle ici le texte complet de l'offre d'emploi…"
                value={offre}
                onChange={setOffre}
                rows={7}
                status={!canGenerate && offre.length > 0 ? { type: 'warning', message: "Offre trop courte — colle l'offre complète" } : undefined}
                statusVariant="detached"
              />
              <Divider />
              <Switch label="Contexte complémentaire" value={contexteOn} onChange={setContexteOn} />
              {contexteOn && (
                <TextArea
                  label="Contexte complémentaire"
                  isLabelHidden
                  placeholder="Info trouvée sur leur site, angle à mettre en avant…"
                  value={contexte}
                  onChange={setContexte}
                  rows={3}
                />
              )}
              <Divider />
              <VStack gap={2}>
                <Text type="label" color="secondary">Ton</Text>
                <ToggleButtonGroup label="Ton de la lettre" value={ton} onChange={v => v && setTon(v)} size="sm">
                  {TONS.map(t => <ToggleButton key={t.id} value={t.id} label={t.label} />)}
                </ToggleButtonGroup>
              </VStack>
              {status === 'generating' ? (
                <Button label="Arrêter" variant="secondary" width="100%" icon={<StopIcon sx={{ fontSize: 16 }} />} onClick={handleStop} />
              ) : status === 'done' ? (
                <Button label="Regénérer" variant="ghost" width="100%" icon={<RefreshIcon sx={{ fontSize: 16 }} />} onClick={handleRegen} />
              ) : (
                <Button label="Générer la lettre" variant="primary" width="100%" isDisabled={!canGenerate} icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />} onClick={generate} />
              )}
            </VStack>
          </Card>

          {/* ── Lettre ── */}
          <Card padding={0}>
            <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2} padding={4}>
              <VStack gap={0.5}>
                <Text weight="semibold">Lettre générée</Text>
                <span className={`lm-status ${STATUS[status].className}`}>{STATUS[status].label}</span>
              </VStack>
              {status === 'done' && (
                <HStack gap={2}>
                  <Button label={copied ? 'Copié !' : 'Copier'} variant="secondary" size="sm" icon={copied ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />} onClick={handleCopy} />
                  <Button label="PDF A4" variant="primary" size="sm" icon={<FileDownloadIcon sx={{ fontSize: 14 }} />} onClick={handlePdf} />
                </HStack>
              )}
            </HStack>
            <Divider />
            <div className="lm-panel">
              {status === 'idle' && (
                <div className="lm-empty">
                  <AutoAwesomeIcon sx={{ fontSize: 32 }} />
                  <Text type="supporting">Colle une offre et clique sur Générer</Text>
                </div>
              )}

              {status === 'error' && (
                <div className="lm-error">{errorMsg || 'Une erreur est survenue. Vérifie ta connexion et réessaie.'}</div>
              )}

              {/* Feuille A4 : reste blanche (document) quel que soit le mode */}
              {(status === 'generating' || status === 'done') && (
                <div className="lm-print-area lm-sheet">
                  <div className="lm-sender">
                    <div className="lm-sender-name">Thomas Reynier</div>
                    <div className="lm-sender-info">
                      reynier.design@gmail.com &nbsp;·&nbsp; 06 26 53 21 29<br />
                      linkedin.com/in/thomas-reynier-product-design &nbsp;·&nbsp; Paris
                    </div>
                  </div>
                  <div className="lm-date">Paris, le {frenchDate()}</div>
                  {(entreprise || poste) && (
                    <div className="lm-recipient">
                      <div className="lm-recipient-label">À l'attention de</div>
                      <div className="lm-recipient-name">{[entreprise, poste].filter(Boolean).join(' — ')}</div>
                    </div>
                  )}

                  {status === 'generating' && <StreamingBody text={letterText} />}

                  {/* Corps éditable — un champ par paragraphe */}
                  {status === 'done' && segments.length > 0 && (
                    <>
                      <div className="lm-print-textarea">
                        {segments.map((seg, i) =>
                          seg.type === 'kpi' ? (
                            <div key={i} className="lm-kpi lm-kpi--edit">
                              <span className="lm-kpi-icon">◆</span>
                              <textarea className="lm-edit lm-edit--kpi" value={seg.text} rows={3} onChange={e => updateSegment(i, e.target.value)} aria-label="Bloc chiffres clés" />
                            </div>
                          ) : (
                            <textarea key={i} className="lm-edit" value={seg.text} rows={4} onChange={e => updateSegment(i, e.target.value)} aria-label={`Paragraphe ${i + 1}`} />
                          )
                        )}
                      </div>
                      <div ref={printBodyRef} className="lm-print-body" />
                    </>
                  )}

                  <div className="lm-signature">Thomas Reynier</div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </AstryxPage>
  );
}

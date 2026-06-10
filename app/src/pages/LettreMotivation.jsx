import { useState, useRef, useCallback } from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

const PASSWORD = import.meta.env.VITE_LETTER_PASSWORD || 'thomas2026';

const TONS = [
  { id: 'equilibre', label: 'Équilibré', desc: 'Professionnel et direct' },
  { id: 'formel', label: 'Formel', desc: 'Structuré et soutenu' },
  { id: 'concis', label: 'Concis', desc: '3 paragraphes max' },
  { id: 'enthousiaste', label: 'Engagé', desc: 'Direct et impliqué' },
];

function parseLetter(text) {
  const kpiMatch = text.match(/\[KPI_START\]([\s\S]*?)\[KPI_END\]/);
  const kpiContent = kpiMatch ? kpiMatch[1].trim() : null;
  const bodyText = text.replace(/\[KPI_START\][\s\S]*?\[KPI_END\]/, '[KPI_BLOCK]');

  const paragraphs = bodyText.split(/\n\n+/).map(p => p.trim()).filter(Boolean);

  return { paragraphs, kpiContent };
}

function renderText(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ fontWeight: 600, color: 'var(--text)' }}>{part}</strong> : part
  );
}

export default function LettreMotivation() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem('lm_auth') === '1');
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState(false);

  const [offre, setOffre] = useState('');
  const [ton, setTon] = useState('equilibre');
  const [status, setStatus] = useState('idle'); // idle | generating | done | error
  const [letterText, setLetterText] = useState('');
  const [copied, setCopied] = useState(false);
  const abortRef = useRef(null);

  const handleUnlock = () => {
    if (pwd === PASSWORD) {
      localStorage.setItem('lm_auth', '1');
      setUnlocked(true);
    } else {
      setPwdError(true);
      setTimeout(() => setPwdError(false), 2000);
    }
  };

  const generate = useCallback(async () => {
    if (!offre.trim() || offre.trim().length < 50) return;

    setStatus('generating');
    setLetterText('');
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offre, ton }),
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
          try {
            const { text, error } = JSON.parse(raw);
            if (error) throw new Error(error);
            if (text) setLetterText(prev => prev + text);
          } catch {}
        }
      }

      setStatus('done');
    } catch (err) {
      if (err.name !== 'AbortError') setStatus('error');
    }
  }, [offre, ton]);

  const handleCopy = () => {
    const { paragraphs, kpiContent } = parseLetter(letterText);
    let plain = paragraphs
      .map(p => p === '[KPI_BLOCK]' ? kpiContent : p)
      .join('\n\n')
      .replace(/\*\*(.*?)\*\*/g, '$1');
    navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePdf = () => window.print();

  const handleRegen = () => { setStatus('idle'); setLetterText(''); generate(); };

  if (!unlocked) return <PasswordGate pwd={pwd} setPwd={setPwd} error={pwdError} onSubmit={handleUnlock} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-soft)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '48px 0 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--p500)', display: 'block', marginBottom: 8 }}>Outil personnel</span>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--text)', marginBottom: 8 }}>Lettre de motivation</h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>Colle une offre d'emploi et génère une lettre personnalisée depuis ton profil.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

            {/* Formulaire */}
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Offre d'emploi</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Colle le texte complet de l'offre</div>
              </div>
              <div style={{ padding: 24 }}>
                <textarea
                  value={offre}
                  onChange={e => setOffre(e.target.value)}
                  placeholder="Colle ici le texte de l'offre d'emploi — titre du poste, missions, profil recherché, stack, entreprise..."
                  style={{
                    width: '100%', minHeight: 260, padding: '12px 14px', border: '1px solid var(--border)',
                    borderRadius: 8, fontSize: 13, fontFamily: 'inherit', color: 'var(--text)',
                    background: 'var(--bg-soft)', resize: 'vertical', lineHeight: 1.6, outline: 'none',
                    transition: 'border-color .15s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--p400)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />

                {/* Ton */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>Ton</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {TONS.map(t => (
                      <button key={t.id} onClick={() => setTon(t.id)} style={{
                        padding: '9px 10px', borderRadius: 7, border: '1px solid',
                        borderColor: ton === t.id ? 'var(--p400)' : 'var(--border)',
                        background: ton === t.id ? 'var(--p50)' : '#fff',
                        cursor: 'pointer', textAlign: 'left', transition: 'all .15s',
                      }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: ton === t.id ? 'var(--p600)' : 'var(--text)', marginBottom: 2 }}>{t.label}</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 300 }}>{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bouton */}
                <button
                  onClick={generate}
                  disabled={status === 'generating' || offre.trim().length < 50}
                  style={{
                    marginTop: 20, width: '100%', padding: '12px 0', borderRadius: 8, border: 'none',
                    background: status === 'generating' ? 'var(--p300)' : offre.trim().length < 50 ? 'var(--g100)' : 'var(--p500)',
                    color: offre.trim().length < 50 ? 'var(--muted)' : '#fff',
                    fontSize: 14, fontWeight: 600, cursor: offre.trim().length < 50 ? 'default' : 'pointer',
                    transition: 'background .15s', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {status === 'generating' ? (
                    <><Spinner /> Génération en cours…</>
                  ) : 'Générer la lettre'}
                </button>
                {offre.trim().length < 50 && offre.length > 0 && (
                  <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 8 }}>Offre trop courte — colle l'offre complète</div>
                )}
              </div>
            </div>

            {/* Output */}
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Lettre générée</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {status === 'idle' && 'En attente'}
                    {status === 'generating' && <span style={{ color: 'var(--p500)' }}>Rédaction en cours…</span>}
                    {status === 'done' && <span style={{ color: '#22C55E' }}>Prête</span>}
                    {status === 'error' && <span style={{ color: '#EF4444' }}>Erreur</span>}
                  </div>
                </div>
                {(status === 'done' || status === 'generating') && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    {status === 'done' && (
                      <>
                        <ActionBtn onClick={handleCopy} icon="📋">{copied ? 'Copié !' : 'Copier'}</ActionBtn>
                        <ActionBtn onClick={handlePdf} icon="⬇︎">PDF</ActionBtn>
                        <ActionBtn onClick={handleRegen} icon="↺">Relancer</ActionBtn>
                      </>
                    )}
                    {status === 'generating' && (
                      <ActionBtn onClick={() => { abortRef.current?.abort(); setStatus('idle'); }} icon="✕">Arrêter</ActionBtn>
                    )}
                  </div>
                )}
              </div>

              <div style={{ padding: 24, minHeight: 400 }} id="letter-output">
                {status === 'idle' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 360, gap: 12, color: 'var(--muted)' }}>
                    <div style={{ fontSize: 32 }}>✉️</div>
                    <div style={{ fontSize: 13, fontWeight: 400 }}>Colle une offre et clique sur Générer</div>
                  </div>
                )}

                {status === 'error' && (
                  <div style={{ textAlign: 'center', padding: 40, color: '#EF4444', fontSize: 13 }}>
                    Une erreur est survenue. Vérifie ta connexion et réessaie.
                  </div>
                )}

                {(status === 'generating' || status === 'done') && letterText && (
                  <LetterBody text={letterText} />
                )}
              </div>

              {/* Ton selector for regen */}
              {status === 'done' && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>Relancer avec un autre ton</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {TONS.map(t => (
                      <button key={t.id} onClick={() => { setTon(t.id); setTimeout(generate, 50); }} style={{
                        padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border)',
                        background: ton === t.id ? 'var(--p50)' : '#fff', cursor: 'pointer',
                        fontSize: 12, fontWeight: 500, color: ton === t.id ? 'var(--p600)' : 'var(--muted)',
                        fontFamily: 'inherit',
                      }}>{t.label}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LetterBody({ text }) {
  const { paragraphs, kpiContent } = parseLetter(text);

  return (
    <div style={{ fontSize: 13.5, lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
      {paragraphs.map((p, i) => {
        if (p === '[KPI_BLOCK]' && kpiContent) {
          return (
            <div key={i} style={{
              background: 'var(--p50)', border: '1px solid var(--p100)', borderRadius: 8,
              padding: '12px 16px', margin: '16px 0', display: 'flex', gap: 10,
            }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>◆</span>
              <div style={{ fontSize: 12.5, color: 'var(--p600)', lineHeight: 1.65 }}>{renderText(kpiContent)}</div>
            </div>
          );
        }
        return <p key={i} style={{ marginBottom: 14 }}>{renderText(p)}</p>;
      })}
    </div>
  );
}

function PasswordGate({ pwd, setPwd, error, onSubmit }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '40px 48px', width: 380, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>🔒</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Accès privé</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300, marginBottom: 28 }}>Cette page est réservée à Thomas.</div>
        <input
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          placeholder="Mot de passe"
          style={{
            width: '100%', padding: '11px 14px', border: `1px solid ${error ? '#EF4444' : 'var(--border)'}`,
            borderRadius: 8, fontSize: 14, fontFamily: 'inherit', marginBottom: 12, outline: 'none',
            transition: 'border-color .15s', textAlign: 'center',
          }}
          autoFocus
        />
        {error && <div style={{ fontSize: 12, color: '#EF4444', marginBottom: 12 }}>Mot de passe incorrect</div>}
        <button onClick={onSubmit} style={{
          width: '100%', padding: '11px 0', background: 'var(--p500)', color: '#fff',
          border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}>Accéder</button>
      </div>
    </div>
  );
}

function ActionBtn({ onClick, icon, children }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border)',
      background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 500,
      color: 'var(--muted)', fontFamily: 'inherit', transition: 'border-color .15s',
    }}>
      <span>{icon}</span>{children}
    </button>
  );
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  );
}

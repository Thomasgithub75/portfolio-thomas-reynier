import { useState, useEffect, useRef } from 'react';
import CaseLayout, { IllustrationItem, CaseCta, OtherProjects } from '../layouts/CaseLayout';
import { Link } from 'react-router-dom';

const TOC = [
  { id: 'contexte', label: 'Contexte' },
  { id: 'probleme', label: '01 · Le problème' },
  { id: 'iterations', label: '02 · Les tentatives' },
  { id: 'pivot', label: "03 · L'insight décisif" },
  { id: 'logique', label: '04 · Comment ça marche' },
  { id: 'decisions', label: '05 · Les arbitrages' },
  { id: 'resultats', label: '06 · Avant / Après' },
  { id: 'apprentissages', label: "Ce que j'en retiens" },
];

function CaseGate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (code === 'thomas2026') {
      sessionStorage.setItem('pepyte_sig_access', 'true');
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 420);
      setTimeout(() => setError(false), 2200);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <style>{`@keyframes shake-gate{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
      {/* Blurred background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/pepyte-sig-apres.jpg)', backgroundSize: 'cover', backgroundPosition: 'top', filter: 'blur(16px) brightness(.35)', transform: 'scale(1.05)', pointerEvents: 'none' }}/>
      <Link to="/" style={{ position: 'absolute', top: 24, left: 24, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,.7)', textDecoration: 'none', fontWeight: 500, zIndex: 1 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Retour
      </Link>
      <div
        style={{
          position: 'relative', zIndex: 1,
          background: '#fff', borderRadius: 18, padding: '44px 40px', width: '100%', maxWidth: 400,
          boxShadow: '0 32px 100px rgba(0,0,0,.3)',
          animation: shake ? 'shake-gate .4s ease' : 'none',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
            <img src="/images/logo-pepyte.svg" alt="Pepyte" style={{ height: 18 }}/>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>·</span>
            <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>Mon nouveau process IA</span>
          </div>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Étude de cas protégée</p>
          <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65 }}>
            Cette étude de cas est présentée uniquement lors d'un entretien en direct. Entrez le code pour y accéder.
          </p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            ref={inputRef}
            type="password"
            value={code}
            onChange={e => { setCode(e.target.value); setError(false); }}
            placeholder="Code d'accès"
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 9, fontSize: 15,
              border: error ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
              outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
              background: error ? '#FEF2F2' : '#fff',
              transition: 'border-color .15s, background .15s',
            }}
          />
          {error && <p style={{ fontSize: 12, color: '#EF4444', margin: 0 }}>Code incorrect. Contactez Thomas pour obtenir l'accès.</p>}
          <button
            type="submit"
            style={{ width: '100%', padding: '12px', borderRadius: 9, fontSize: 14, fontWeight: 600, background: '#111827', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}
          >
            Accéder à l'étude de cas
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginTop: 18 }}>
          Pas encore de code ?{' '}
          <a href="https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com" target="_blank" rel="noopener" style={{ color: '#1956DB', textDecoration: 'none', fontWeight: 500 }}>
            Contactez Thomas
          </a>
        </p>
      </div>
    </div>
  );
}

export default function CasePepyteSignature() {
  const [unlocked, setUnlocked] = useState(
    sessionStorage.getItem('pepyte_sig_access') === 'true'
  );
  if (!unlocked) return <CaseGate onUnlock={() => setUnlocked(true)} />;

  return (
    <CaseLayout title="Pepyte : Mon nouveau process IA" tocItems={TOC}>
      <div className="case-header">
        <div className="container">
          <Link className="back-link" to="/#projets">
            <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour aux projets
          </Link>
          <div className="header-tags">
            {['Product Design','Prototypage','Logique métier','SaaS B2B'].map(t => (
              <span key={t} className="htag tag tag--display">{t}</span>
            ))}
          </div>
          <div className="case-title-row">
            <img className="case-logo" src="/images/logo-pepyte.svg" alt="Pepyte"/>
            <h1 className="case-h1">Mon nouveau process IA</h1>
          </div>
          <p className="meta-row">Product Designer · Pepyte · HR tech SaaS · Figma · Prototypes HTML</p>
          <p className="reading-time">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Lecture · ~5 min
          </p>
          <p className="case-intro">
            Les headhunters de Pepyte passaient du temps sur les mauvaises offres, non par manque de méthode, mais parce que leur dashboard ne répondait pas à la bonne question. J'ai conçu un signal unique, calculé automatiquement, pour qu'ils sachent en un coup d'œil où agir.
          </p>
          <div className="stats-row">
            <div className="stat"><div className="stat-val">8–12</div><div className="stat-label">offres actives pilotées en parallèle par recruteur</div></div>
            <div className="stat"><div className="stat-val">0</div><div className="stat-label">calcul mental, une décision sans effort</div></div>
            <div className="stat"><div className="stat-val">0</div><div className="stat-label">mise à jour manuelle, priorité recalculée en temps réel</div></div>
            <div className="stat"><div className="stat-val">0</div><div className="stat-label">offre urgente noyée dans le volume</div></div>
          </div>
        </div>
      </div>

      <div className="container">

        <div className="case-section no-border" id="contexte">
          <p className="sec-label sec-label-plain">Contexte</p>
          <div className="sec-body">
            <p>Pepyte est une plateforme SaaS B2B de recrutement dédiée aux headhunters, des recruteurs indépendants qui gèrent en parallèle plusieurs offres actives pour le compte de startups et scaleups. Chaque offre a son propre pipeline de candidats, à des stades d'avancement différents.</p>
            <p>Le dashboard est leur outil de pilotage quotidien. C'est là que commence chaque journée : quelle offre ouvrir en premier, où mettre l'énergie, quoi relancer. La feature que j'ai conçue touche directement à cette décision.</p>

            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/pepyte-sig-avant.jpg" caption="Avant : nombre de candidats + priorité symbolique"/>
              <IllustrationItem src="/images/pepyte-sig-apres.jpg" caption="Après : priorité calculée automatiquement + % de signer"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="probleme">
          <div className="sec-label"><span className="sec-label-num">01</span><span className="sec-label-step">Le problème</span></div>
          <div className="sec-body">
            <h2>Deux colonnes. Aucune réponse à la vraie question.</h2>
            <p>Le dashboard affichait pour chaque offre un <strong>nombre de candidats en process</strong> et une <strong>priorité saisie à la main</strong> par le recruteur, matérialisée par des flèches symboliques (↑↑ ━ ↓↓).</p>
            <p><strong>Le nombre de candidats était trompeur.</strong> Douze candidats en début de pipeline représentent moins d'urgence réelle que deux candidats en phase de proposition finale. Un chiffre élevé donnait une fausse impression de progression et orientait l'attention là où il n'y avait pas d'urgence.</p>
            <p><strong>La priorité manuelle n'était jamais maintenue à jour.</strong> Elle dépendait de variables qui changent en permanence : un candidat qui avance, un autre qui se désiste, une offre qui se réchauffe ou refroidit. En pratique, personne ne la remettait à jour.</p>
            <p><strong>Résultat :</strong> des recruteurs qui passaient du temps sur des offres "pleines" pendant qu'une offre avec deux candidats en proposition attendait un débrief urgent. La vraie question n'était pas <em>combien de candidats</em> : c'était <em>quelle chance de signer</em>.</p>

            <div className="illustrations-grid" style={{marginTop:32}}>
              <IllustrationItem src="/images/pepyte-sig-avant.jpg" caption="L'état initial : nombre de candidats + flèches de priorité symboliques"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="iterations">
          <div className="sec-label"><span className="sec-label-num">02</span><span className="sec-label-step">Les tentatives</span></div>
          <div className="sec-body">
            <h2>Idéation et itération</h2>
            <p>Chaque prototype HTML est généré avec <strong>Claude dans VS Code</strong>, testable directement dans un navigateur. L'avantage : manipulable et comparable en quelques secondes. Pivoter ne coûte rien.</p>

            <div style={{background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:12,padding:'20px 24px',marginTop:20,marginBottom:4}}>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:'#9CA3AF',marginBottom:16}}>Méthode de prototypage</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr auto 1fr auto 1fr auto 1fr',gap:0,alignItems:'flex-start'}}>

                <div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    <div style={{width:32,height:32,borderRadius:8,background:'#24292E',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.1.82-.26.82-.57v-2.23c-3.02.56-3.8-.73-4.04-1.41-.13-.35-.72-1.41-1.23-1.7-.42-.22-1.02-.78-.01-.79.94-.01 1.62.87 1.84 1.23 1.08 1.82 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.46-1.34-5.46-5.93 0-1.3.47-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.63-5.48 5.93.44.38.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12.02 12.02 0 0 0 24 12C24 5.37 18.63 0 12 0z"/></svg>
                    </div>
                    <span style={{fontSize:12,fontWeight:600,color:'#111827'}}>GitHub</span>
                  </div>
                  <p style={{fontSize:11.5,color:'#6B7280',lineHeight:1.6,margin:0}}>Knowledge base : études, entretiens, contexte produit, DS, skills UX & writing</p>
                </div>

                <div style={{display:'flex',alignItems:'flex-start',padding:'8px 10px',paddingTop:8,color:'#D1D5DB',fontSize:18,flexShrink:0}}>→</div>

                <div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    <img src="/images/icon-claude.svg" alt="Claude" style={{width:32,height:32,borderRadius:8,objectFit:'cover'}}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:'#111827',lineHeight:1.2}}>Claude</div>
                      <div style={{fontSize:10,color:'#6B7280',lineHeight:1.2}}>VS Code</div>
                    </div>
                  </div>
                  <p style={{fontSize:11.5,color:'#6B7280',lineHeight:1.6,margin:0}}>Objectif exposé → itérations en conversation</p>
                </div>

                <div style={{display:'flex',alignItems:'flex-start',padding:'8px 10px',paddingTop:8,color:'#D1D5DB',fontSize:18,flexShrink:0}}>→</div>

                <div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    <div style={{width:32,height:32,borderRadius:8,background:'#EEF3FD',border:'1px solid #BFDBFE',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1956DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                    </div>
                    <span style={{fontSize:12,fontWeight:600,color:'#111827'}}>HTML</span>
                  </div>
                  <p style={{fontSize:11.5,color:'#6B7280',lineHeight:1.6,margin:0}}>Propositions testables dans le navigateur, chacune documentée</p>
                </div>

                <div style={{display:'flex',alignItems:'flex-start',padding:'8px 10px',paddingTop:8,color:'#D1D5DB',fontSize:18,flexShrink:0}}>→</div>

                <div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    <img src="/images/icon-figma.svg" alt="Figma" style={{width:32,height:32,borderRadius:8,objectFit:'cover'}}/>
                    <span style={{fontSize:12,fontWeight:600,color:'#111827'}}>Figma</span>
                  </div>
                  <p style={{fontSize:11.5,color:'#6B7280',lineHeight:1.6,margin:0}}>Direction validée → maquette avec notre Design System</p>
                </div>

                <div style={{display:'flex',alignItems:'flex-start',padding:'8px 10px',paddingTop:8,color:'#D1D5DB',fontSize:18,flexShrink:0}}>→</div>

                <div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    <div style={{width:32,height:32,borderRadius:8,background:'#1A2540',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A6E3A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    </div>
                    <span style={{fontSize:12,fontWeight:600,color:'#111827'}}>/spec-dev</span>
                  </div>
                  <p style={{fontSize:11.5,color:'#6B7280',lineHeight:1.6,margin:0}}>Spec technique générée automatiquement pour les devs</p>
                </div>

              </div>
              <div style={{marginTop:16,paddingTop:16,borderTop:'1px solid #E5E7EB'}}>
                <div style={{fontSize:11,color:'#9CA3AF',marginBottom:8}}>Ce que Claude sait du contexte :</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {['Études utilisateurs','Entretiens HH','Contexte produit','Business plan','Design System Pepyte','Skills UX','UX Writing'].map(tag => (
                    <span key={tag} style={{fontSize:11,background:'#fff',border:'1px solid #E5E7EB',borderRadius:6,padding:'3px 9px',color:'#374151',fontWeight:500}}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="illustrations-grid" style={{marginTop:20}}>
              <IllustrationItem src="/images/pepyte-claude-vscode.jpg" caption="Claude dans VS Code, conversation + prototype HTML généré en direct"/>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:32,marginTop:24}}>
              <div>
                <p className="step-num"><strong>PROTOTYPE 1 · L'état initial</strong></p>
                <p className="step-title">Reconstituer l'existant pour rendre le problème visible</p>
                <p className="step-body">Avant de corriger, j'ai modélisé ce qui existait. Verdict : le nombre de candidats ne dit rien sur l'avancement réel. Les flèches sont ambiguës : ↑ signifie-t-il "important" ou "en hausse" ? Les deux colonnes coexistent sans se parler.</p>
              </div>
              <div>
                <p className="step-num"><strong>PROTOTYPE 2 · Barre pipeline</strong></p>
                <p className="step-title">Montrer la répartition des candidats par étape</p>
                <p className="step-body">Une barre segmentée par couleur pour visualiser où se trouvent les candidats dans le pipeline. Esthétiquement riche, mais difficile à lire d'un coup d'œil : il faut apprendre le code couleur, puis comparer 8 barres en parallèle. La barre dit "où sont les candidats", pas "où dois-je agir".</p>
              </div>
              <div>
                <p className="step-num"><strong>PROTOTYPE 3 · Chips d'actions</strong></p>
                <p className="step-title">Afficher directement ce qu'il y a à faire</p>
                <p className="step-body">Des tags actionnables sur chaque ligne : "3 à relancer", "2 entretiens à planifier", "1 proposition à débriefer". Bonne intention, mais une offre pouvait cumuler 4 ou 5 tags différents, sans ordre de priorité entre eux. La lecture verticale devenait impraticable.</p>
              </div>
            </div>

            <div className="illustrations-grid" style={{marginTop:32}}>
              <IllustrationItem src="/images/pepyte-sig-proto1.jpg" caption="Prototype 1 : l'existant reconstitué"/>
              <IllustrationItem src="/images/pepyte-sig-proto2.jpg" caption="Prototype 2 : barre pipeline"/>
              <IllustrationItem src="/images/pepyte-sig-proto3.jpg" caption="Prototype 3 : chips d'actions"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="pivot">
          <div className="sec-label"><span className="sec-label-num">03</span><span className="sec-label-step">L'insight décisif</span></div>
          <div className="sec-body">
            <h2>Deux questions dans une interface. Il fallait trancher.</h2>
            <p>C'est en construisant le prototype 3 que le vrai problème est apparu : on essayait de répondre simultanément à <em>où en sont les candidats ?</em> et à <em>quelle action mener ?</em> Ce sont deux questions légitimes, mais qui méritent deux outils différents.</p>
            <p>Un dashboard de pilotage a une seule responsabilité : dire où mettre l'énergie maintenant. Tout ce qui répond à une autre question distrait.</p>
            <p>De là est née l'idée du pourcentage. Plutôt que de montrer l'état du pipeline, montrer l'issue probable. Un seul chiffre, une seule lecture, et un tri automatique qui élimine la question "par où je commence ?".</p>

            <div style={{marginTop:28}}>
              <p className="step-num"><strong>PROTOTYPE 4 · La solution retenue</strong></p>
              <p className="step-title">Un label de priorité + un pourcentage de signer</p>
              <p className="step-body">Le recruteur n'a pas besoin de réfléchir. L'offre Haute est en haut du tableau — il agit. Le pourcentage lui permet d'arbitrer entre deux offres au même niveau de priorité. Deux informations seulement, mais les deux utiles.</p>
            </div>

            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/pepyte-sig-proto4.jpg" caption="Prototype 4 : direction validée"/>
              <IllustrationItem src="/images/pepyte-sig-final.jpg" caption="Finalisation dans Figma"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="logique">
          <div className="sec-label"><span className="sec-label-num">04</span><span className="sec-label-step">Comment ça marche</span></div>
          <div className="sec-body">
            <h2>Une formule ancrée dans la réalité du pipeline</h2>
            <p>Chaque étape du pipeline candidat se voit affecter une probabilité de signature, croissante avec l'avancement :</p>

            <div style={{overflowX:'auto',marginTop:20,marginBottom:20}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.9rem'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--border)'}}>
                    <th style={{textAlign:'left',padding:'10px 16px 10px 0',fontWeight:600}}>Étape du pipeline</th>
                    <th style={{textAlign:'right',padding:'10px 0 10px 16px',fontWeight:600}}>Probabilité de signature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Pipe','5 %'],
                    ['Validé','10 %'],
                    ['Premier entretien','15 %'],
                    ['Deuxième entretien','20 %'],
                    ['Troisième entretien','40 %'],
                    ['Quatrième entretien','60 %'],
                    ['Proposition','75 %'],
                  ].map(([col, prob]) => (
                    <tr key={col} style={{borderBottom:'1px solid var(--border)'}}>
                      <td style={{padding:'10px 16px 10px 0',color:'var(--text-secondary)'}}>{col}</td>
                      <td style={{padding:'10px 0 10px 16px',textAlign:'right',fontWeight:500}}>{prob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>La probabilité d'une offre est la somme des probabilités de ses candidats actifs, plafonnée à 90 %. Les candidats écartés, refusés ou désistés sont exclus du calcul. Le résultat est arrondi à l'entier et détermine le niveau de priorité affiché :</p>

            <div style={{display:'flex',gap:16,marginTop:16,flexWrap:'wrap'}}>
              {[
                { label:'Haute', range:'0 – 49 %', color:'#FEF2F2', text:'#DC2626', dot:'#EF4444' },
                { label:'Moyenne', range:'50 – 74 %', color:'#FFFBEB', text:'#D97706', dot:'#F59E0B' },
                { label:'Faible', range:'75 – 90 %', color:'#F0FDF4', text:'#16A34A', dot:'#22C55E' },
              ].map(({ label, range, color, text, dot }) => (
                <div key={label} style={{
                  background: color,
                  border:`1px solid ${dot}33`,
                  borderRadius:10,
                  padding:'12px 18px',
                  display:'flex',
                  alignItems:'center',
                  gap:10,
                  flex:'1',
                  minWidth:160,
                }}>
                  <span style={{width:8,height:8,borderRadius:'50%',background:dot,flexShrink:0}}/>
                  <span style={{fontWeight:700,color:text,fontSize:'0.9rem'}}>{label}</span>
                  <span style={{color:'#6B7280',fontSize:'0.85rem',marginLeft:'auto'}}>{range}</span>
                </div>
              ))}
            </div>

            <p style={{marginTop:16,color:'var(--text-secondary)',fontSize:'0.9rem'}}>Le tableau est trié par priorité décroissante par défaut — Haute en tête, Faible en bas. Aucune action manuelle requise.</p>

            <div style={{marginTop:16,background:'#F0FDF4',border:'1px solid #BBF7D0',borderRadius:8,padding:'12px 16px',display:'flex',gap:10,alignItems:'flex-start'}}>
              <svg style={{flexShrink:0,marginTop:1}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <p style={{margin:0,fontSize:'0.875rem',color:'#166534',lineHeight:1.6}}>
                <strong>Calibré avec les headhunters.</strong> Ces probabilités ont été construites avec les recruteurs de Pepyte, à partir de leur expérience terrain.
              </p>
            </div>
          </div>
        </div>

        <div className="case-section" id="decisions">
          <div className="sec-label"><span className="sec-label-num">05</span><span className="sec-label-step">Les arbitrages</span></div>
          <div className="sec-body">
            <h2>Cinq décisions. Chacune justifiée.</h2>

            <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:16}}>

              <div style={{background:'#EEF3FD',borderRadius:10,padding:'16px 20px',display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#1956DB',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11,flexShrink:0,marginTop:2}}>01</div>
                <div>
                  <p className="step-title" style={{margin:'0 0 5px'}}>Supprimer le nombre de candidats</p>
                  <p className="step-body" style={{margin:0}}>En vue de pilotage, c'est une métrique de volume, pas d'urgence. Le recruteur qui veut ce chiffre l'a en un clic sur l'offre. Ce qu'on perd : la vision instantanée du volume. Ce qu'on gagne : un dashboard qui dit quoi faire, pas combien.</p>
                </div>
              </div>

              <div style={{background:'#EEF3FD',borderRadius:10,padding:'16px 20px',display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#1956DB',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11,flexShrink:0,marginTop:2}}>02</div>
                <div>
                  <p className="step-title" style={{margin:'0 0 5px'}}>Plafonner à 90 %, jamais 100 %</p>
                  <p className="step-body" style={{margin:0}}>Tant qu'un contrat n'est pas signé, il reste une part d'incertitude réelle. Afficher 100 % donnerait une fausse certitude et risquerait de démobiliser un recruteur sur une offre pas encore close. Décision mathématiquement non-pure, mais honnête sur le plan métier.</p>
                </div>
              </div>

              <div style={{background:'#EEF3FD',borderRadius:10,padding:'16px 20px',display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#1956DB',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11,flexShrink:0,marginTop:2}}>03</div>
                <div>
                  <p className="step-title" style={{margin:'0 0 5px'}}>Priorité Haute = probabilité basse (contre-intuitif assumé)</p>
                  <p className="step-body" style={{margin:0}}>"Priorité" décrit une action à mener, pas un état. Une offre à 25 % a besoin du recruteur : sourcer, qualifier, relancer. Une offre à 85 % avance seule. Validé avec les recruteurs avant de figer le wording. Contre-intuitif au premier regard, naturel dès le premier jour.</p>
                </div>
              </div>

              <div style={{background:'#EEF3FD',borderRadius:10,padding:'16px 20px',display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#1956DB',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11,flexShrink:0,marginTop:2}}>04</div>
                <div>
                  <p className="step-title" style={{margin:'0 0 5px'}}>Afficher le label ET le pourcentage</p>
                  <p className="step-body" style={{margin:0}}>Lecture en deux temps : le label ("Haute") → décision immédiate. Le pourcentage → arbitrage fin entre offres au même niveau. La densité visuelle augmente légèrement, mais elle est compensée par la hiérarchie badge coloré / chiffre discret en dessous.</p>
                </div>
              </div>

              <div style={{background:'#EEF3FD',borderRadius:10,padding:'16px 20px',display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#1956DB',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11,flexShrink:0,marginTop:2}}>05</div>
                <div>
                  <p className="step-title" style={{margin:'0 0 5px'}}>Wording "X % de signer"</p>
                  <p className="step-body" style={{margin:0}}>"Signer" est le mot du quotidien des recruteurs — un placement, c'est une signature. Pas de jargon abstrait ("score de conversion", "indice de confiance"). Très ancré dans l'univers du recrutement, non transférable à d'autres métiers — et c'est voulu.</p>
                </div>
              </div>

            </div>

            <div className="illustrations-grid" style={{marginTop:32}}>
              <IllustrationItem src="/images/pepyte-sig-decisions.jpg" caption="Arbitrages 02, 03 et 05 : plafond 90 %, logique inversée, wording métier"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="resultats">
          <div className="sec-label"><span className="sec-label-num">06</span><span className="sec-label-step">Avant / Après</span></div>
          <div className="sec-body">
            <h2>Un dashboard qui répond au besoin utilisateur</h2>
            <p>Après mise en production, les retours sont clairs : les recruteurs ouvrent leur dashboard et savent immédiatement où aller. La question "par où je commence ?" a quasiment disparu des échanges d'équipe. Le tri automatique est naturellement adopté — l'ordre du tableau correspond à l'ordre des actions à mener.</p>

            <div className="illustrations-grid-2" style={{marginTop:28}}>
              <IllustrationItem src="/images/pepyte-sig-avant.jpg" caption="Avant : nombre de candidats + priorité symbolique"/>
              <IllustrationItem src="/images/pepyte-sig-apres.jpg" caption="Après : priorité calculée automatiquement + % de signer"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="apprentissages">
          <p className="sec-label sec-label-plain">Ce que j'en retiens</p>
          <div className="sec-body">
            <h2>Deux leçons au-delà de la feature</h2>

            <div style={{display:'flex',flexDirection:'column',gap:14,marginTop:16}}>

              <div style={{background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:12,padding:'20px 24px'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:32,height:32,borderRadius:8,background:'#1956DB',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <p className="step-title" style={{margin:0}}>Un bon dashboard répond à une seule question</p>
                </div>
                <p className="step-body" style={{margin:0}}>Le prototype 3 me l'a montré : visibilité et aide à la décision ne sont pas la même chose. Montrer l'état d'un processus n'indique pas quoi faire. Dissocier ces deux intentions est souvent la décision de design la plus importante, et la moins visible.</p>
              </div>

              <div style={{background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:12,padding:'20px 24px'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:32,height:32,borderRadius:8,background:'#EA580C',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <p className="step-title" style={{margin:0}}>Prototyper en HTML a changé mes cycles d'itération</p>
                </div>
                <p className="step-body" style={{margin:'0 0 14px'}}>Travailler directement dans le navigateur, manipulable et comparable en quelques secondes, a réduit le temps entre une idée et un verdict. Pas de réunion de revue, pas d'export Figma : on ouvre, on regarde, on décide.</p>
                <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',paddingTop:12,borderTop:'1px solid #E5E7EB'}}>
                  <span style={{fontSize:11,color:'#9CA3AF',fontWeight:500}}>Stack :</span>
                  <img src="/images/icon-claude.svg" alt="Claude" style={{width:20,height:20,borderRadius:4}}/>
                  <span style={{fontSize:11,color:'#374151',fontWeight:500}}>Claude</span>
                  <span style={{color:'#E5E7EB'}}>·</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#24292E" style={{borderRadius:4}}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.1.82-.26.82-.57v-2.23c-3.02.56-3.8-.73-4.04-1.41-.13-.35-.72-1.41-1.23-1.7-.42-.22-1.02-.78-.01-.79.94-.01 1.62.87 1.84 1.23 1.08 1.82 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.46-1.34-5.46-5.93 0-1.3.47-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.63-5.48 5.93.44.38.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12.02 12.02 0 0 0 24 12C24 5.37 18.63 0 12 0z"/></svg>
                  <span style={{fontSize:11,color:'#374151',fontWeight:500}}>GitHub</span>
                  <span style={{color:'#E5E7EB'}}>·</span>
                  <img src="/images/icon-figma.svg" alt="Figma" style={{width:20,height:20,borderRadius:4}}/>
                  <span style={{fontSize:11,color:'#374151',fontWeight:500}}>Figma</span>
                </div>
              </div>

              <div style={{background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:12,padding:'20px 24px'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:32,height:32,borderRadius:8,background:'#1A2540',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A6E3A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                  </div>
                  <p className="step-title" style={{margin:0}}>Créer ses propres commandes IA change le métier</p>
                </div>
                <p className="step-body" style={{margin:0}}>J'ai créé <code style={{background:'#1A2540',color:'#A6E3A1',borderRadius:4,padding:'1px 6px',fontSize:11,fontFamily:'monospace'}}>/spec-dev</code>, une commande Claude Code personnalisée. En une instruction, elle génère le fichier de spec technique pour les développeurs, à partir du contexte métier et des décisions design prises en amont. Zéro friction entre la décision design et la transmission au dev.</p>
              </div>

            </div>
          </div>
        </div>

      </div>

      <CaseCta/>
      <OtherProjects projects={[
        { href:'/case/pepyte', thumb:'/images/thumb-pepyte.jpg', logo:'/images/logo-pepyte.svg', role:'Product Designer', roleClass:'role-pepyte', duration:'26 mois', name:'Pepyte — Matching', desc:'UX Research, formulaires et conception du matching candidats-offres de A à Z.', tags:['UX Research','Prototypage','Matching'] },
        { href:'/case/weborama', thumb:'/images/thumb-weborama.jpg', logo:'/images/logo-weborama.svg', role:'Design System Lead', roleClass:'role-weborama', duration:'16 mois', name:'Weborama', desc:"2 Design Systems, process AI Ready et idéation via Figma Make — 4 équipes alignées sur une source unique.", tags:['Design System','Figma Make','AI Ready'] },
      ]}/>
    </CaseLayout>
  );
}

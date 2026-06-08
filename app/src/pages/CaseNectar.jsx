import CaseLayout, { IllustrationItem, Step, MissionBanner, CaseCta, OtherProjects } from '../layouts/CaseLayout';
import { Link } from 'react-router-dom';

const TOC = [
  { id: 'contexte', label: 'Contexte' },
  { mission: 'Phase 01 — Conception' },
  { id: 'recherche', label: '01 — Recherche' },
  { id: 'definition', label: '02 — Définition' },
  { id: 'benchmark', label: '03 — Benchmark' },
  { id: 'ideation', label: '04 — Idéation' },
  { id: 'design-system', label: '05 — Design System' },
  { mission: 'Phase 02 — Build' },
  { id: 'developpement', label: '06 — Développement' },
];

export default function CaseNectar() {
  return (
    <CaseLayout title="Nectar" tocItems={TOC}>
      <div className="case-header">
        <div className="container">
          <Link className="back-link" to="/#projets">
            <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour aux projets
          </Link>
          <div className="header-tags">
            {['UX Research','Benchmark','Figma Make','Design System','Claude MCP','Founding Design IA'].map(t => (
              <span key={t} className="htag tag tag--display">{t}</span>
            ))}
          </div>
          <div className="case-title-row">
            <img className="case-logo" src="/images/logo-nectar.svg" alt="Nectar"/>
            <h1 className="case-h1">Nectar</h1>
          </div>
          <p className="meta-row">AI Product Designer · Projet personnel — B2B SaaS · En cours · Figma · Figma Make · Claude · Supabase · Vercel</p>
          <p className="reading-time">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Lecture · ~5 min
          </p>
          <p className="case-intro">Nectar est un outil SaaS B2B mobile-first pour collecter et centraliser les insights terrain des équipes commerciales. Ma mission couvre l'ensemble du process, de la recherche utilisateur au développement, entièrement piloté par IA.</p>
          <div className="stats-row">
            <div className="stat"><div className="stat-val">1</div><div className="stat-label">designer-développeur — de la recherche au produit</div></div>
            <div className="stat"><div className="stat-val">6</div><div className="stat-label">phases du process pilotées par IA</div></div>
            <div className="stat"><div className="stat-val">45</div><div className="stat-label">variants Figma générés via MCP Claude</div></div>
            <div className="stat"><div className="stat-val">100%</div><div className="stat-label">du process piloté par IA</div></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="illustrations-section">
          <p className="illustrations-label">Aperçu du produit</p>
          <div className="illustrations-grid-1">
            <IllustrationItem src="/images/nectar-apercu.jpg" caption="Du Design System au produit — variables, composants et interfaces"/>
          </div>
        </div>

        <div className="case-section no-border" id="contexte">
          <p className="sec-label sec-label-plain">Contexte</p>
          <div className="sec-body">
            <p>Nectar est un outil mobile-first B2B permettant aux commerciaux de capturer leurs insights post-RDV en moins d'une minute et de les transmettre directement au backlog produit sous forme de cartes priorisées.</p>
            <p>Deux objectifs : concevoir un MVP avec une priorisation déterministe et transparente, et <strong>formaliser un process de conception piloté par IA</strong>, réplicable. Je pilote ce projet seul — de la recherche au développement.</p>
          </div>
        </div>

        <MissionBanner label="Phase 01" title="Conception — pilotée par IA" desc="Recherche utilisateur, définition produit, benchmark, idéation et Design System — chaque étape assistée par Claude."/>

        <div className="case-section" id="recherche">
          <div className="sec-label"><span className="sec-label-num">01</span><span className="sec-label-step">Recherche</span></div>
          <div className="sec-body">
            <h2>Entretiens utilisateurs & intégration de l'IA</h2>
            <p>J'ai mené des entretiens auprès de commerciaux et de Product Managers pour valider les hypothèses et comprendre leurs besoins réels. Dès cette étape, l'IA est intégrée à chaque phase du process.</p>
            <p>Les retours sont clairs : les PM veulent des insights accessibles et priorisés, les commerciaux veulent pouvoir les remonter depuis leur mobile après un RDV — sans friction, sans reformulation.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTAPE 01" title="Claude crée la trame" body="Guide d'entretien structuré généré par Claude — questions ouvertes, JTBD, frictions identifiées."/>
              <Step icon={<img src="/images/icon-gpt.svg" alt="GPT"/>} stepNum="ÉTAPE 02" title="L'IA enregistre & retranscrit" body="Enregistrement et retranscription automatique de chaque entretien. Une demi-journée de travail économisée par session."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTAPE 03" title="Claude synthétise" body="Analyse automatique des pain points, JTBD et opportunités à partir des retranscriptions."/>
              <Step icon={<img src="/images/icon-notion.svg" alt="Notion"/>} stepNum="ÉTAPE 04" title="Notion documente" body="Création automatique des comptes rendus dans un projet Notion dédié via Claude." isLast/>
            </div>
            <ul className="result-list">
              <li>4 décisions produit définies : saisie rapide, reformulation IA, scoring par fréquence, mobile-first</li>
              <li>1 journée de travail économisée par entretien grâce à la retranscription automatique</li>
              <li>Comptes rendus générés automatiquement après chaque session</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/nectar-recherche-1.jpg" caption="Compte rendu automatique dans Notion"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="definition">
          <div className="sec-label"><span className="sec-label-num">02</span><span className="sec-label-step">Définition</span></div>
          <div className="sec-body">
            <h2>Principes de conception & cadrage produit</h2>
            <p>À partir des entretiens, Claude génère la définition du problème et les contraintes de conception.</p>
            <ul className="result-list">
              <li>3 champs de saisie maximum — saisie en moins d'une minute</li>
              <li>Mobile-first — conçu pour l'usage post-RDV</li>
              <li>IA frugale — titre normalisé + détection de similarité, aucune décision automatisée</li>
              <li>Scoring transparent — calcul basé sur la fréquence clients, 100% automatique</li>
              <li>15 edge cases documentés — abandon, échec IA, formulaire incomplet…</li>
            </ul>
            <p style={{marginTop:20}}>Architecture produit : <strong>input → insight brut (IA + rules) → normalisation + détection similarité → output PM → backlog priorisé.</strong></p>
            <div className="steps" style={{marginTop:24}}>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTAPE 01" title="Cadrer le parcours utilisateur" body="Parcours utilisateur, choix des inputs/outputs et prompt IA générés par Claude à partir des comptes rendus d'entretien."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTAPE 02" title="Définir les règles de calculs" body="Formule de scoring, contraintes techniques et règles de matching définies et documentées avec l'aide de Claude."/>
              <Step icon={<img src="/images/icon-notion.svg" alt="Notion"/>} stepNum="ÉTAPE 03" title="Préparer l'idéation" body="Zoning des composants, edge cases et compte rendu générés automatiquement pour alimenter la phase d'idéation." isLast/>
            </div>
          </div>
        </div>

        <div className="case-section" id="benchmark">
          <div className="sec-label"><span className="sec-label-num">03</span><span className="sec-label-step">Benchmark</span></div>
          <div className="sec-body">
            <h2>Méthodologie du benchmark</h2>
            <p>J'explore Mobbin à partir de requêtes générées par Claude pour identifier les patterns pertinents. Je sélectionne les résultats, les documente avec mes recommandations, puis Claude génère un compte rendu dans Notion qui sert de base à la phase d'idéation.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTAPE 01" title="Claude génère les requêtes" body="Requêtes générées à partir des décisions produit : saisie rapide, feed scannable, badge de priorité, détection de similarité."/>
              <Step icon={<img src="/images/icon-mobbin.svg" alt="Mobbin"/>} stepNum="ÉTAPE 02" title="Recherche et Sélection dans Mobbin" body="Exploration de Mobbin avec les requêtes, sélection de 7 écrans pertinents, importés dans Figma pour analyse."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTAPE 03" title="Documentation des patterns" body="Fiche de spécification pour chaque pattern : points forts, pertinence pour le MVP, éléments hors scope."/>
              <Step icon={<img src="/images/icon-notion.svg" alt="Notion"/>} stepNum="ÉTAPE 04" title="Claude documente dans Notion" body="Compte rendu structuré généré automatiquement — 7 patterns documentés, prêts pour l'idéation." isLast/>
            </div>
            <ul className="result-list">
              <li>7 patterns UX sélectionnés et documentés avec points forts et pertinence</li>
              <li>1 compte rendu structuré dans Notion, prêt pour la phase d'idéation</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/nectar-benchmark-1.jpg" caption="Patterns sélectionnés dans Mobbin"/>
              <IllustrationItem src="/images/nectar-benchmark-2.jpg" caption="Compte rendu benchmark dans Notion"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="ideation">
          <div className="sec-label"><span className="sec-label-num">04</span><span className="sec-label-step">Idéation</span></div>
          <div className="sec-body">
            <h2>Prompt à destination de Figma Make</h2>
            <p>Les prompts sont construits avec Claude et intègrent les décisions précédentes : recherche, définition et benchmark. Figma Make génère les écrans pour explorer et itérer.</p>
            <ul className="result-list">
              <li>Saisie & backlog — flow liste → saisie → validation, structuration automatique des insights</li>
              <li>Scoring & automatisation — logique basée sur la fréquence, objective et sans effort pour l'utilisateur</li>
              <li>IA suggestive, jamais décisive — suggestions de titre proposées, l'utilisateur confirme ou modifie (pattern Linear)</li>
              <li>15 edge cases identifiés et documentés</li>
            </ul>
            <div className="steps" style={{marginTop:24}}>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTAPE 01" title="Contexte" body="Décisions UX issues des étapes précédentes compilées dans un document structuré."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTAPE 02" title="Prompt généré par Claude" body="Prompt v1 intégrant le flow, l'anatomie des écrans, les contraintes de style et les edge cases."/>
              <Step icon={<img src="/images/icon-figma-make.svg" alt="Figma Make"/>} stepNum="ÉTAPE 03" title="Écrans générés dans Figma Make" body="Premières pistes produites en quelques minutes." isLast/>
            </div>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/nectar-ideation-1.jpg" caption="Résultat — spécifications UX et prompt dans Figma Make"/>
            </div>
            <div className="illustrations-grid-2" style={{marginTop:16}}>
              <IllustrationItem src="/images/nectar-screen-2.jpg" caption="Saisie d'un insight"/>
              <IllustrationItem src="/images/nectar-screen-3.jpg" caption="Vue backlog priorisé"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="design-system">
          <div className="sec-label"><span className="sec-label-num">05</span><span className="sec-label-step">Design System</span></div>
          <div className="sec-body">
            <h2>Conception du Design System par l'IA</h2>
            <p>J'ai mis en place un Design System avant les maquettes, pour poser des bases solides pour la conception et le développement. L'architecture suit les principes de l'Atomic Design.</p>
            <p>Via le MCP Claude, les variables et composants sont <strong>créés automatiquement dans Figma</strong> et documentés dans Notion.</p>
            <ul className="result-list">
              <li>5 collections de variables — Primitives, Colors, Spacing, Typography, Border</li>
              <li>13 composants déclinés en 45 variants, avec états et tokens associés</li>
              <li>Documentation auto-générée dans Notion via workflow Claude + Figma MCP</li>
            </ul>
            <p style={{marginTop:16}}><strong>Limite identifiée :</strong> certains variants nécessitent encore une intervention manuelle pour les cas les plus complexes.</p>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/nectar-ds-1.jpg" caption="Composants & variants dans Figma"/>
            </div>
          </div>
        </div>

        <MissionBanner label="Phase 02" title="Build & Livraison" desc="De Figma au produit live avec Claude Code — frontend, backend, déploiement Vercel."/>

        <div className="case-section" id="developpement">
          <div className="sec-label"><span className="sec-label-num">06</span><span className="sec-label-step">Développement</span></div>
          <div className="sec-body">
            <h2>De Figma au produit avec Claude Code</h2>
            <p>J'utilise Claude Code pour couvrir chaque étape du développement — de la configuration Supabase au déploiement Vercel — en respectant le Design System conçu dans Figma.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-nextjs.svg" alt="Next.js"/>} stepNum="STACK FRONTEND" title="TypeScript · Tailwind · Next.js · GitHub" body="12 composants React conformes au Design System Figma. 5 écrans livrés : Login, Backlog, Saisie, Vérification, Détail."/>
              <Step icon={<img src="/images/icon-supabase.svg" alt="Supabase"/>} stepNum="STACK BACKEND" title="Supabase · Vercel · Claude API · Gemini Flash" body="1 endpoint IA : structuration des insights + détection de similarité. Déploiement continu sur Vercel."/>
              <Step icon={<img src="/images/icon-notion.svg" alt="Notion"/>} stepNum="DOCUMENTATION" title="Notion MCP · claude.md réplicable" body="L'ensemble du process est formalisé dans un fichier claude.md documenté et réplicable sur d'autres projets." isLast/>
            </div>
            <ul className="result-list">
              <li>12 composants React conformes au Design System Figma</li>
              <li>5 écrans produits — Login · Backlog · Saisie · Vérification · Détail</li>
              <li>1 endpoint IA — structuration + détection de similarité</li>
              <li>Process documenté et réplicable — claude.md</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/nectar-dev-1.jpg" caption="Déployé sur Vercel depuis VS Code avec Claude Code"/>
            </div>
          </div>
        </div>
      </div>

      <CaseCta/>
      <OtherProjects projects={[
        { href:'/case/pepyte', thumb:'/images/thumb-pepyte.jpg', logo:'/images/logo-pepyte.svg', role:'UX Research & Design', roleClass:'role-pepyte', duration:'26 mois', name:'Pepyte', desc:"Recherche utilisateur & conception de la fonctionnalité de matching — de l'audit à l'interface.", tags:['UX Research','Entretiens','Figma'] },
        { href:'/case/weborama', thumb:'/images/thumb-weborama.jpg', logo:'/images/logo-weborama.svg', role:'Design System Lead', roleClass:'role-weborama', duration:'16 mois', name:'Weborama', desc:"2 Design Systems, process AI Ready et idéation via Figma Make — 4 équipes alignées sur une source unique.", tags:['Design System','Figma Make','AI Ready'] },
      ]}/>
    </CaseLayout>
  );
}

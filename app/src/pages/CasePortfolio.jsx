import CaseLayout, { IllustrationItem, Step, MissionBanner, CaseCta, OtherProjects } from '../layouts/CaseLayout';
import { Link } from 'react-router-dom';

const TOC = [
  { id: 'contexte', label: 'Contexte' },
  { mission: 'Phase 01 — Conception' },
  { id: 'documentation', label: '01 — Documentation' },
  { id: 'benchmark', label: '02 — Benchmark' },
  { id: 'ideation', label: '03 — Idéation' },
  { id: 'design-system', label: '04 — Design System' },
  { id: 'iteration', label: '05 — Itération & Tests' },
  { mission: 'Phase 02 — Build' },
  { id: 'developpement', label: '06 — Développement' },
];

export default function CasePortfolio() {
  return (
    <CaseLayout title="Portfolio" tocItems={TOC}>
      <div className="case-header">
        <div className="container">
          <Link className="back-link" to="/#projets">
            <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour aux projets
          </Link>
          <div className="header-tags">
            {['UX Design', 'Documentation', 'Benchmark', 'Idéation', 'Design System', 'Itération', 'Tests', 'Claude Code'].map(t => (
              <span key={t} className="htag tag tag--display">{t}</span>
            ))}
          </div>
          <div className="case-title-row">
            <img className="case-logo" src="/images/logo-portfolio.svg" alt="Portfolio"/>
            <h1 className="case-h1">Portfolio — Design&nbsp;×&nbsp;IA&nbsp;×&nbsp;Code</h1>
          </div>
          <p className="meta-row">Product Designer · Projet personnel · 2026 · Figma · Claude Code · React · Vercel</p>
          <p className="reading-time">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Lecture · ~5 min
          </p>
          <p className="case-intro">Ce portfolio est un projet design à part entière — brief, benchmark, idéation, design system, itérations et tests. Chaque décision est la mienne. L'IA a été l'outil d'exécution, pas le décideur.</p>
          <div className="stats-row">
            <div className="stat"><div className="stat-val">6</div><div className="stat-label">étapes design — du brief au produit livré</div></div>
            <div className="stat"><div className="stat-val">10</div><div className="stat-label">jours du premier brief au déploiement</div></div>
            <div className="stat"><div className="stat-val">155</div><div className="stat-label">itérations design — commits atomiques</div></div>
            <div className="stat"><div className="stat-val">100%</div><div className="stat-label">focus sur les décisions design — implémentation déléguée à l'IA</div></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="illustrations-section">
          <p className="illustrations-label">Aperçu du portfolio</p>
          <div className="illustrations-grid-1">
            <IllustrationItem src="/images/portfolio-apercu.png" caption="De la documentation au produit — process design complet, décisions humaines, exécution IA"/>
          </div>
        </div>

        <div className="case-section no-border" id="contexte">
          <p className="sec-label sec-label-plain">Contexte</p>
          <div className="sec-body">
            <p>Un portfolio de Product Designer doit prouver ce qu'il prétend. Le mien devait démontrer ma capacité à <strong>conduire un process design de A à Z</strong> — de la définition du brief à la livraison d'un produit fonctionnel.</p>
            <p>J'ai mené ce projet seul en intégrant l'IA à chaque étape comme outil d'exécution. Toutes les décisions de conception — structure, système visuel, hiérarchie, parcours — sont les miennes. Le développement React a été piloté via Claude Code pour rester concentré sur ce qui compte : le design.</p>
            <ul className="result-list">
              <li>Cible définie — recruteurs, directeurs produit, fondateurs · visite &lt; 3 min · desktop prioritaire</li>
              <li>Objectif de conversion — chaque section conçue pour amener au contact</li>
              <li>Process documenté et réplicable à d'autres projets</li>
            </ul>
          </div>
        </div>

        <MissionBanner label="Phase 01" title="Conception — décisions humaines, exécution IA" desc="Brief, benchmark, idéation, design system et tests — chaque étape pilotée par mes décisions de conception, accélérée par l'IA."/>

        <div className="case-section" id="documentation">
          <div className="sec-label"><span className="sec-label-num">01</span><span className="sec-label-step">Documentation</span></div>
          <div className="sec-body">
            <h2>Le CLAUDE.md comme brief de design</h2>
            <p>Avant toute conception, j'ai rédigé un document de référence — <code>CLAUDE.md</code> — structuré comme un brief de design : cible, objectifs, principes UX/UI, tone of voice, et ce qu'il ne faut pas faire.</p>
            <p>Ce brief est la source de vérité du projet. Il cadre chaque session de travail et garantit la cohérence des décisions de conception. Versionné sur GitHub, il accumule la connaissance du projet et reste traçable dans le temps — la même logique qu'un brief d'agence, appliquée à un workflow IA.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="CIBLE & OBJECTIFS" title="Profil, cible et objectifs de conversion" body="Qui est Thomas, quel poste il vise, quel message le portfolio doit transmettre — définis avant la première décision de conception."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="PRINCIPES" title="Règles UX/UI et tone of voice" body="Clarté, hiérarchie visuelle, responsive, accessibilité, registre sobre et direct — les garde-fous de toutes les décisions. Le copywriting de chaque page découle directement de ce brief."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="CONTRAINTES" title="Ligne rouge : ce qu'il ne faut pas faire" body="Animations lourdes, textes techniques, navigation ambiguë — documentés explicitement. Une contrainte explicite vaut mieux qu'une correction en cours de route." isLast/>
            </div>
            <ul className="result-list">
              <li>Brief complet rédigé avant le premier composant — la conception ne commence pas sans cadre</li>
              <li>Tone of voice défini — sobre, direct, résultats en premier, sans superlatifs</li>
              <li>Document versionné sur GitHub — chaque évolution est traçable, chaque session repart avec un contexte complet</li>
              <li>Méthodologie réplicable — applicable à tout projet produit ou client dès la première session</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-brief.png" caption="CLAUDE.md — brief de design versionné sur GitHub · source de vérité du projet"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="benchmark">
          <div className="sec-label"><span className="sec-label-num">02</span><span className="sec-label-step">Benchmark</span></div>
          <div className="sec-body">
            <h2>Patterns UX retenus et décisions structurantes</h2>
            <p>J'ai analysé des portfolios de Product Designers reconnus dans le produit SaaS B2B et la recherche utilisateur pour identifier les patterns qui fonctionnent pour une cible recruteur — et ceux qui la ralentissent.</p>
            <p>L'enjeu n'était pas de copier un format existant mais d'identifier les <strong>décisions UX qui servent le parcours recruteur</strong> — un visiteur qui scanne en moins de 3 minutes et doit comprendre l'expertise sans effort.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="PATTERN RETENU" title="Stats en header — résultats avant le détail" body="Les recruteurs portent leur attention sur les chiffres dans les 30 premières secondes. Décision : placer 4 KPIs mesurables en header de chaque étude de cas."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="PATTERN RETENU" title="Structure en phases numérotées" body="Un parcours de lecture lisible en diagonale. Décision : découper chaque case study en phases avec label visible — le recruteur pressé peut sauter à ce qui l'intéresse."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉCARTÉ" title="Portfolios visuels lourds" body="Portfolios très graphiques avec animations et effets de scroll — efficaces pour le design graphique, contre-productifs pour un profil Product Designer SaaS B2B lu par des recruteurs tech." isLast/>
            </div>
            <ul className="result-list">
              <li>KPIs en header — résultats visibles avant le récit, pour un lecteur pressé</li>
              <li>Sections numérotées — lisible en diagonale, sautables selon l'intérêt du profil visiteur</li>
              <li>Desktop prioritaire — layout, densité et typographie calibrés pour l'écran 13"–15" d'un recruteur</li>
            </ul>
          </div>
        </div>

        <div className="case-section" id="ideation">
          <div className="sec-label"><span className="sec-label-num">03</span><span className="sec-label-step">Idéation</span></div>
          <div className="sec-body">
            <h2>Structure, parcours et zoning</h2>
            <p>À partir du brief et du benchmark, j'ai défini les contraintes et les objectifs de chaque surface — sections de la Home, anatomie des études de cas, navigation. L'IA a proposé des structures que j'ai testées, rejetées ou retravaillées selon ces critères.</p>
            <p>La question centrale à chaque décision : <strong>est-ce que ce choix sert le parcours du recruteur, ou est-ce que ça me fait plaisir à moi ?</strong></p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="HOME" title="5 sections — un objectif par section" body="Hero · Compétences par filtre · Projets · Témoignages · Contact. Décision : pas de section sans objectif de conversion clair. Chaque section répond à une question précise du recruteur."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="ÉTUDES DE CAS" title="Anatomie standardisée et lisible en diagonale" body="Header KPIs → phases → étapes → résultats → visuels. Même structure sur tous les projets — le lecteur ne réapprend pas à lire à chaque case study."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="FILTRES" title="Parcours personnalisé par compétence" body="Décision structurante : 8 catégories filtrables sur la Home. Un recruteur Design System voit des projets différents d'un recruteur UX Research — le portfolio s'adapte sans page dédiée supplémentaire." isLast/>
            </div>
            <ul className="result-list">
              <li>Home — 5 sections, chaque section répond à une question précise du recruteur</li>
              <li>Case studies — structure identique sur tous les projets, lisible en diagonale</li>
              <li>Filtres — 8 catégories · personnalisation du parcours sans multiplication des pages</li>
              <li>Navigation — TOC sticky, scroll progress, section active en temps réel</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-ideation-1.png" caption="Structure de la Home — 5 sections, un objectif de conversion par section"/>
              <IllustrationItem src="/images/portfolio-ideation-2.png" caption="Anatomie d'une étude de cas — header KPIs, phases, résultats"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="design-system">
          <div className="sec-label"><span className="sec-label-num">04</span><span className="sec-label-step">Design System</span></div>
          <div className="sec-body">
            <h2>Tokens et composants comme fondation</h2>
            <p>Avant le premier écran, j'ai spécifié l'intégralité du système visuel — couleurs sémantiques, typographie, espacements, border radius. Ces tokens sont la source unique de toutes les décisions visuelles du site.</p>
            <p>J'ai ensuite conçu 4 composants custom avec leurs états complets. Chaque état — hover, pressed, disabled, focus — est défini comme une décision de design, pas comme une contrainte technique.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="TOKENS" title="Palette sémantique structurée en niveaux" body="Primaires (50→700), neutres, états, feedback — chaque couleur a un rôle. Aucune valeur ad hoc : si une couleur n'est pas dans le système, elle n'existe pas."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="COMPOSANTS" title="4 composants avec états complets" body="Button, Tag, Badge, TestimonialCard — hover, pressed, disabled, focus visible. Chaque état défini comme une décision de design avec ses valeurs précises."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="INVENTAIRE" title="Page /design-system — preuve de rigueur" body="Page dédiée à l'inventaire complet des composants. Accessible publiquement — pour un directeur design ou un lead qui veut vérifier la cohérence du système, pas seulement le résultat visuel." isLast/>
            </div>
            <ul className="result-list">
              <li>Tokens définis avant le premier composant — aucune valeur de couleur ou d'espacement hors système</li>
              <li>4 composants custom — tous les états interactifs couverts et documentés</li>
              <li>Page /design-system publique — la rigueur du système est vérifiable directement</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-ds-tokens.png" caption="Palette sémantique — niveaux 50 à 700, tokens couleur et typographie"/>
              <IllustrationItem src="/images/portfolio-ds-components.png" caption="Composants avec états — page /design-system"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="iteration">
          <div className="sec-label"><span className="sec-label-num">05</span><span className="sec-label-step">Itération & Tests</span></div>
          <div className="sec-body">
            <h2>Boucle d'affinage — observer, décider, vérifier</h2>
            <p>Une fois les premières pages générées, j'ai mis en place une boucle d'itération systématique : observer l'écart entre le rendu et la vision, formuler une décision de design précise, vérifier la cohérence avec le système.</p>
            <p>Les 155 commits ne sont pas des corrections de bugs — ce sont 155 décisions de design documentées. Chaque ajustement part d'une observation et d'un critère, pas d'une préférence intuitive.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="OBSERVER" title="Identifier l'écart avec la vision" body="Test visuel dans le navigateur après chaque changement — typographie, alignements, états interactifs, comportements au scroll, responsive mobile et desktop."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="DÉCIDER" title="Formuler une décision, pas une correction" body="Chaque retour est une décision de design : comportement attendu, référence dans le système, raison. Exemple : pressed doit être distinct de hover car l'utilisateur doit sentir le clic, pas seulement le survol."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="VALIDER" title="Vérifier la cohérence système" body="Chaque modification est validée par rapport aux tokens définis. Le Design System est le référentiel — pas le résultat visuel seul." isLast/>
            </div>
            <ul className="result-list">
              <li>155 décisions de design documentées — états interactifs, espacements, hiérarchie visuelle, animations</li>
              <li>États hover et pressed distincts — chaque élément cliquable a un feedback visuel perceptible</li>
              <li>Micro-interactions justifiées — temps de lecture, barre de progression, TOC actif, back-to-top · chacune répond à un besoin d'orientation identifié</li>
              <li>20+ proposals archivés dans le repo — les pistes explorées et les arbitrages sont traçables</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-iteration-1.png" caption="Boucle d'itération — observer l'écart, décider, vérifier la cohérence"/>
              <IllustrationItem src="/images/portfolio-iteration-2.png" caption="États interactifs — hover, pressed et focus définis comme décisions design"/>
            </div>
          </div>
        </div>

        <MissionBanner label="Phase 02" title="Build & Livraison" desc="Développement React piloté via Claude Code — les décisions d'implémentation déléguées, les décisions produit conservées."/>

        <div className="case-section" id="developpement">
          <div className="sec-label"><span className="sec-label-num">06</span><span className="sec-label-step">Développement</span></div>
          <div className="sec-body">
            <h2>De la conception au produit avec Claude Code</h2>
            <p>Le développement est la traduction des décisions de conception en produit livrable. J'ai piloté Claude Code avec les mêmes instructions que j'aurais données à un développeur — stack, structure, comportements attendus, contraintes.</p>
            <p>Claude Code gère également le versioning — commits, push, branches — ce qui me permet de rester concentré sur les décisions produit plutôt que sur la logistique technique.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="STACK" title="React · Vite · MUI · React Router · GitHub" body="15 fichiers JSX — pages, layouts et composants. Architecture décidée dès le départ pour rester lisible et maintenable au fil des itérations."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="LIVRAISON" title="Vercel · déploiement continu" body="Chaque push sur main déclenche un build automatique. Vercel Analytics et Speed Insights intégrés pour mesurer les performances réelles."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="CONNAISSANCE" title="Le repo comme base de connaissance active" body="Le CLAUDE.md versionné sur GitHub est aussi utilisé pour générer des lettres de motivation personnalisées par entreprise — la connaissance accumulée produit de la valeur au-delà du portfolio." isLast/>
            </div>
            <ul className="result-list">
              <li>15 fichiers JSX — 5 pages, 2 layouts, 4 composants custom, utilitaires</li>
              <li>CV HTML maintenu dans le même repo, avec le même design system — identité professionnelle cohérente depuis une source unique</li>
              <li>3 lettres de motivation personnalisées générées depuis le même repo — format HTML + PDF</li>
              <li>155 commits propres sur GitHub — versioning géré par Claude Code</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-lm-1.png" caption="Lettre de motivation — générée depuis le CLAUDE.md + brief entreprise"/>
              <IllustrationItem src="/images/portfolio-dev-1.png" caption="Claude Code en session — décision produit traduite en composant React"/>
            </div>
          </div>
        </div>
      </div>

      <CaseCta/>
      <OtherProjects projects={[
        { href:'/case/nectar', thumb:'/images/thumb-nectar.jpg', logo:'/images/logo-nectar.svg', role:'Founding Designer IA', roleClass:'role-nectar', duration:'En cours', name:'Nectar', desc:"MVP B2B mobile-first piloté par IA — de la recherche utilisateur aux 8 écrans livrés, avec un process documenté et réplicable.", tags:['Claude Code','Figma Make','Design System','UX Research'] },
        { href:'/case/weborama', thumb:'/images/thumb-weborama.jpg', logo:'/images/logo-weborama.svg', role:'Design System Lead', roleClass:'role-weborama', duration:'16 mois', name:'Weborama', desc:"Audit de 974 composants, ateliers de co-construction et création d'un Design System de zéro — 80% de composants en moins.", tags:['Design System','Atomic Design','Figma Make','Zeroheight'] },
      ]}/>
    </CaseLayout>
  );
}

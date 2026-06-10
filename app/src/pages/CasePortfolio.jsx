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
              <li>Base de connaissance IA persistante — zéro répétition de contexte entre sessions : le brief versionné remplace le briefing verbal</li>
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
            <p>Avant le premier écran, j'ai spécifié l'intégralité du système visuel — couleurs sémantiques, typographie, espacements, border radius. Ces tokens sont la source unique de toutes les décisions visuelles du site — et la base de connaissance transmise à l'IA une fois pour toutes.</p>
            <p>Un Design System précis se comporte comme un brief permanent pour l'IA : défini dans le CLAUDE.md, il a été appliqué automatiquement sur chaque composant et chaque page sans dérive. J'ai ensuite conçu 4 composants custom avec leurs états complets. Chaque état — hover, pressed, disabled, focus — est une décision de design documentée, pas une convention tacite.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="TOKENS" title="Palette sémantique structurée en niveaux" body="Primaires (50→700), neutres, états, feedback — chaque couleur a un rôle. Aucune valeur ad hoc : si une couleur n'est pas dans le système, elle n'existe pas."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="COMPOSANTS" title="4 composants avec états complets" body="Button, Tag, Badge, TestimonialCard — hover, pressed, disabled, focus visible. Chaque état défini comme une décision de design avec ses valeurs précises."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="INVENTAIRE" title="Page /design-system — preuve de rigueur, base de référence IA" body="Page dédiée à l'inventaire complet des composants. Accessible publiquement — et base de référence pour chaque session Claude Code. Aucun token rappelé manuellement : le Design System dans le repo garantit la cohérence sur l'ensemble du projet." isLast/>
            </div>
            <ul className="result-list">
              <li>Tokens définis avant le premier composant — aucune valeur de couleur ou d'espacement hors système</li>
              <li>4 composants custom — tous les états interactifs couverts et documentés</li>
              <li>Page /design-system publique — la rigueur du système est vérifiable directement</li>
              <li>Design System comme brief IA permanent — transmis une fois dans le CLAUDE.md, appliqué sur 15 fichiers JSX sans dérive de token ni rappel manuel</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-ds-tokens.png" caption="Palette sémantique — PRIMARY + GRAY scales + tokens sémantiques, chaque couleur a un rôle défini"/>
              <IllustrationItem src="/images/portfolio-ds-components.png" caption="Button component — 3 variantes × 2 tailles × états disabled, chaque comportement documenté pour l'IA"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="iteration">
          <div className="sec-label"><span className="sec-label-num">05</span><span className="sec-label-step">Itération & Tests</span></div>
          <div className="sec-body">
            <h2>Boucle d'affinage — observer, décider, vérifier</h2>
            <p>Une fois les premières pages générées, j'ai mis en place une boucle d'itération systématique : observer l'écart entre le rendu et la vision, formuler une décision de design précise, transmettre à Claude Code, vérifier dans le navigateur.</p>
            <p>La vélocité de cette boucle change la nature du travail : 30 à 90 secondes de l'instruction à la vérification visuelle. Chaque hypothèse de design se teste en conditions réelles, sans simulation mentale. Les 155 commits sont 155 décisions de design exécutées à cette cadence — pas des corrections de bugs, des arbitrages documentés.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="OBSERVER" title="Identifier l'écart avec la vision" body="Test visuel dans le navigateur après chaque changement — typographie, alignements, états interactifs, scroll, responsive. La vitesse IA rend chaque hypothèse testable en conditions réelles : plus besoin de simuler mentalement le rendu d'une décision de design."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="DÉCIDER" title="Briefer l'IA, pas lui donner une correction" body="Chaque instruction est structurée comme un brief : contexte précis, comportement attendu, référence token, critère de validation. La qualité de l'output IA est directement proportionnelle à la précision du brief. Exemple : pressed doit être distinct de hover — l'utilisateur doit sentir le clic, pas seulement le survol."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="VALIDER" title="Vérifier la cohérence système" body="Chaque modification est validée par rapport aux tokens définis. Le Design System est le référentiel — pas le résultat visuel seul." isLast/>
            </div>
            <ul className="result-list">
              <li>Vélocité × 10 — 30 à 90 secondes par décision de design : du brief à la vérification visuelle dans le navigateur</li>
              <li>155 décisions de design documentées — états interactifs, espacements, hiérarchie visuelle, micro-interactions</li>
              <li>États hover et pressed distincts — chaque élément cliquable a un feedback visuel perceptible</li>
              <li>Micro-interactions justifiées — barre de progression, TOC actif, back-to-top · chacune répond à un besoin d'orientation identifié</li>
              <li>20+ proposals archivés dans le repo — les pistes explorées et les arbitrages sont traçables</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-iteration-1.png" caption="Boucle d'affinage dans le cas d'étude — observer, briefer l'IA, vérifier dans le navigateur"/>
              <IllustrationItem src="/images/portfolio-iteration-2.png" caption="Documentation composant — props, règles d'usage, exemple JSX : chaque état défini comme une décision de design transmissible à l'IA"/>
            </div>
          </div>
        </div>

        <MissionBanner label="Phase 02" title="Build & Livraison" desc="Développement React piloté via Claude Code — les décisions d'implémentation déléguées, les décisions produit conservées."/>

        <div className="case-section" id="developpement">
          <div className="sec-label"><span className="sec-label-num">06</span><span className="sec-label-step">Développement</span></div>
          <div className="sec-body">
            <h2>De la conception au produit avec Claude Code</h2>
            <p>Le développement est la traduction des décisions de conception en produit livrable. J'ai piloté Claude Code avec les mêmes instructions que j'aurais données à un développeur — stack, structure, comportements attendus, contraintes.</p>
            <p>Le repo va plus loin qu'un site portfolio : il contient une feature autonome qui réutilise la connaissance accumulée pour accélérer chaque candidature. Le CLAUDE.md n'est pas qu'un brief de design — c'est le profil IA de Thomas, exploitable pour d'autres usages.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="STACK" title="React · Vite · MUI · React Router · GitHub" body="15 fichiers JSX — pages, layouts et composants. Architecture décidée dès le départ pour rester lisible et maintenable au fil des itérations."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="LIVRAISON" title="Vercel · déploiement continu" body="Chaque push sur main déclenche un build automatique. Vercel Analytics et Speed Insights intégrés pour mesurer les performances réelles."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="KNOWLEDGE REUSE" title="CLAUDE.md comme profil vivant — une base, plusieurs produits" body="Le même CLAUDE.md qui pilote le portfolio génère des lettres de motivation personnalisées. Coller une offre suffit : l'IA croise les exigences de l'offre avec le profil de Thomas, sélectionne les expériences pertinentes, respecte le tone of voice, et génère une lettre en 30 secondes — streaming temps réel, 4 tons, bloc KPI, export PDF A4." isLast/>
            </div>
            <h3 style={{fontSize:16,fontWeight:600,color:'var(--text)',letterSpacing:'-0.02em',marginTop:32,marginBottom:8}}>Feature Lettre de motivation — avantages du process</h3>
            <ul className="result-list">
              <li><strong>Offre collée → lettre complète en 30 secondes</strong> — sans cette feature : 45 min à 1h de rédaction par candidature</li>
              <li><strong>Personnalisation réelle, pas un template</strong> — l'IA lit l'offre, identifie les mots-clés et les croise avec les expériences concrètes de Thomas (Weborama, Pepyte, Nectar)</li>
              <li><strong>Tone of voice cohérent</strong> — le même registre sobre et direct que le portfolio, défini une fois dans le CLAUDE.md, appliqué à chaque lettre sans dérive</li>
              <li><strong>4 tons adaptables</strong> — Équilibré · Formel · Concis · Engagé — selon la culture de l'entreprise ciblée</li>
              <li><strong>Bloc KPI automatique</strong> — l'IA formate les métriques d'impact (80% de composants en moins, 12 entretiens, MVP en 10 jours) en callout visuel</li>
              <li><strong>Contexte complémentaire</strong> — un toggle pour ajouter des informations spécifiques à l'entreprise : motivation précise, projet en cours, contact interne</li>
              <li><strong>Export PDF A4 print-ready</strong> — même qualité visuelle que le CV du repo, directement envoyable</li>
              <li>Scalable — même process pour n'importe quelle offre, sans réécriture du profil à chaque fois</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-lm-form.png" caption="Interface de génération — offre collée, entreprise, poste, ton · prêt à générer"/>
              <IllustrationItem src="/images/portfolio-lm-1.png" caption="Lettre générée — profil croisé avec l'offre, bloc KPI formaté, ton respecté"/>
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

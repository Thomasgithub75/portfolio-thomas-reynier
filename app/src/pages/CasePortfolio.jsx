import CaseLayout, { IllustrationItem, Step, MissionBanner, CaseCta, OtherProjects } from '../layouts/CaseLayout';
import { Link } from 'react-router-dom';

const TOC = [
  { id: 'contexte', label: 'Contexte' },
  { mission: 'Phase 01 — Fondation' },
  { id: 'knowledge', label: '01 — Knowledge' },
  { id: 'design-system', label: '02 — Design System' },
  { mission: 'Phase 02 — Feature Design' },
  { id: 'besoin', label: '03 — Besoin identifié' },
  { id: 'benchmark', label: '04 — Benchmark' },
  { id: 'ideation', label: '05 — Idéation' },
  { id: 'design', label: '06 — Design' },
  { mission: 'Phase 03 — Build' },
  { id: 'developpement', label: '07 — Développement' },
  { id: 'synthese', label: 'Synthèse' },
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
            {['Besoin identifié', 'Benchmark', 'Idéation', 'Design', 'Knowledge', 'Design System', 'Claude Code', 'Vercel'].map(t => (
              <span key={t} className="htag tag tag--display">{t}</span>
            ))}
          </div>
          <div className="case-title-row">
            <img className="case-logo" src="/images/logo-portfolio.svg" alt="Portfolio"/>
            <h1 className="case-h1">Portfolio — Feature Lettre de Motivation</h1>
          </div>
          <p className="meta-row">Product Designer · Projet personnel · 2026 · Claude Code · React · MUI · Vercel</p>
          <p className="reading-time">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Lecture · ~5 min
          </p>
          <p className="case-intro">Ce portfolio est un produit. La feature Lettre de Motivation en est l'étude de cas principale — pas parce qu'elle est spectaculaire, mais parce qu'elle est représentative. Un besoin identifié, un process design complet, une solution livrée. C'est ma façon de travailler. Ce que vous voyez ici, vous l'avez sur chaque projet.</p>
          <div className="stats-row">
            <div className="stat"><div className="stat-val">30s</div><div className="stat-label">du brief à la lettre générée · offre collée, lettre personnalisée</div></div>
            <div className="stat"><div className="stat-val">4</div><div className="stat-label">tons adaptables · Équilibré · Formel · Concis · Engagé</div></div>
            <div className="stat"><div className="stat-val">1</div><div className="stat-label">profil · CLAUDE.md · réutilisé sur toutes les candidatures</div></div>
            <div className="stat"><div className="stat-val">100%</div><div className="stat-label">décisions humaines · l'IA exécute, le designer décide</div></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="illustrations-section">
          <p className="illustrations-label">Aperçu de la feature</p>
          <div className="illustrations-grid-1">
            <IllustrationItem src="/images/portfolio-apercu.png" caption="Portfolio — du brief structuré à la feature IA en production, process design complet"/>
          </div>
        </div>

        <div className="case-section no-border" id="contexte">
          <p className="sec-label sec-label-plain">Contexte</p>
          <div className="sec-body">
            <p>La feature Lettre de Motivation est née d'un constat simple : le profil, les expériences et le tone of voice étaient déjà documentés dans le CLAUDE.md du portfolio. Ajouter une offre d'emploi suffisait pour produire une lettre personnalisée et cohérente. Le problème était réel, la fondation existait — la décision de construire était évidente.</p>
            <p>Ce projet suit le même process que n'importe quelle feature produit : besoin identifié, benchmark, idéation, design, build, livraison. Pas de raccourci, pas de simulation. Une feature en production, utilisable maintenant.</p>
            <ul className="result-list">
              <li>Contexte — portfolio personnel en production · cible recruteurs SaaS B2B et directeurs design</li>
              <li>Problème — rédiger une lettre pertinente et personnalisée prend 45 min à 1h par candidature</li>
              <li>Solution — une feature ancrée dans un profil structuré · lettre générée en 30 secondes · exportable en PDF</li>
            </ul>
          </div>
        </div>

        <MissionBanner label="Phase 01" title="Fondation — la base qui rend tout possible" desc="Avant la première décision sur la feature, deux éléments sont en place : une architecture de connaissance structurée et un Design System spécifié. Ce n'est pas de la préparation — c'est la méthode."/>

        <div className="case-section" id="knowledge">
          <div className="sec-label"><span className="sec-label-num">01</span><span className="sec-label-step">Knowledge</span></div>
          <div className="sec-body">
            <h2>Structurer la connaissance avant de commencer — le brief qui ne meurt pas</h2>
            <p>Avant la première décision de design, le projet dispose d'une base de connaissance structurée : le <code>CLAUDE.md</code>. Profil, cible, objectifs, principes UX/UI, tone of voice, expériences, résultats mesurables, contraintes explicites — tout est documenté, versionné sur GitHub, disponible dès la première instruction à l'IA.</p>
            <p>Ce document fait deux choses simultanément. Pour le designer : chaque décision est ancrée dans un cadre, chaque dérive est identifiable immédiatement. Pour l'IA : chaque session démarre avec le contexte complet, sans répétition, sans perte d'information entre sessions. Le même profil qui structure le portfolio alimente directement la génération de lettres. Une seule base, plusieurs usages.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="PROFIL VIVANT" title="Qui est Thomas — documenté une fois, disponible partout" body="Expériences, résultats mesurables, compétences, ton de voix — documentés avec précision. L'IA ne réinterprète pas à chaque session : elle repart du même profil complet. Chaque lettre générée connaît Weborama, Pepyte, Nectar, les chiffres et le registre."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="BRIEF PERMANENT" title="Contexte cumulatif versionné — zéro répétition entre sessions" body="Objectifs, règles UX/UI, contraintes, décisions passées — versionné sur GitHub. Chaque évolution est traçable. Chaque session Claude Code repart de l'état exact du projet sans briefing verbal, sans risque de perte de contexte."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="RÉUTILISABLE" title="Une base, plusieurs produits — la même méthode, scalable" body="Ce n'est pas un document de projet. C'est un système. Le même CLAUDE.md qui pilote le portfolio génère des lettres personnalisées. La méthode est identique sur n'importe quel projet : brief structuré, connaissance cumulée, IA briefée." isLast/>
            </div>
            <ul className="result-list">
              <li>Zéro répétition de contexte entre sessions — le brief versionné remplace le briefing verbal</li>
              <li>Connaissance cumulée et persistante — chaque session repart de l'état exact, chaque décision est traçable</li>
              <li>Réutilisable immédiatement — la feature LM fonctionne parce que le profil existait déjà dans le CLAUDE.md</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-brief.png" caption="CLAUDE.md — profil structuré, tone of voice, expériences, résultats · versionné sur GitHub · source de vérité du projet"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="design-system">
          <div className="sec-label"><span className="sec-label-num">02</span><span className="sec-label-step">Design System</span></div>
          <div className="sec-body">
            <h2>Décider une fois — le Design System comme fondation réutilisable</h2>
            <p>Avant le premier composant de la feature, l'intégralité du système visuel est spécifiée : couleurs sémantiques, typographie, espacements, border radius, états interactifs. Ces tokens ne sont pas seulement la fondation visuelle du site — ils sont le langage partagé entre les décisions de design et leur exécution par l'IA.</p>
            <p>Un Design System mal spécifié produit une IA qui improvise — valeurs ad hoc, comportements incohérents entre composants, drift au fil des itérations. Spécifié avec précision, il est appliqué automatiquement sur l'ensemble des composants sans dérive. Quatre ans de pratique sur des Design Systems complexes chez Pepyte et Weborama ont défini à quel niveau de précision une spécification doit descendre pour être exécutable — par un développeur humain ou par l'IA.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="TOKENS" title="Palette sémantique structurée — chaque couleur a un rôle" body="Primaires (50→700), neutres, états, feedback — aucune valeur ad hoc. Si une couleur n'est pas dans le système, elle n'existe pas. Cette règle s'applique au designer et à l'IA indistinctement."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="COMPOSANTS" title="4 composants avec états interactifs complets" body="Button, Tag, Badge, TestimonialCard — hover, pressed, disabled, focus visible. Chaque état est une décision de design avec ses valeurs précises : l'IA les implémente, elle ne les invente pas."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="PAGE PUBLIQUE" title="/design-system — rigueur vérifiable et brief IA permanent" body="Page d'inventaire complet : variantes, règles d'usage, exemples. Accessible pour vérification directe. Et base de référence pour chaque session Claude Code — aucun token rappelé manuellement, aucune dérive possible." isLast/>
            </div>
            <ul className="result-list">
              <li>Tokens définis avant le premier composant — aucune valeur hors système</li>
              <li>4 composants custom — tous les états couverts, documentés, transmissibles à l'IA</li>
              <li>Page /design-system publique — la rigueur du système est vérifiable directement</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-ds-tokens.png" caption="Palette sémantique — PRIMARY + GRAY scales · chaque couleur a un rôle défini"/>
              <IllustrationItem src="/images/portfolio-ds-components.png" caption="Button component — 3 variantes × 2 tailles × états complets"/>
            </div>
          </div>
        </div>

        <MissionBanner label="Phase 02" title="Feature Design — du besoin au produit spécifié" desc="Besoin, benchmark, idéation, design — chaque étape produit une décision, pas un livrable Figma. L'output de chaque phase est la donnée d'entrée de la suivante."/>

        <div className="case-section" id="besoin">
          <div className="sec-label"><span className="sec-label-num">03</span><span className="sec-label-step">Besoin identifié</span></div>
          <div className="sec-body">
            <h2>Un problème concret, un scope clair — pas une feature opportuniste</h2>
            <p>Rédiger une lettre de motivation pertinente et personnalisée prend entre 45 minutes et 1 heure. Par candidature. Sans garantie de cohérence avec son propre profil, de pertinence avec l'offre, ni de justesse de ton selon la culture de l'entreprise ciblée.</p>
            <p>La question posée : est-ce que ce problème est résolvable avec l'architecture de connaissance déjà en place ? Le CLAUDE.md contient le profil complet — expériences, résultats, ton de voix. Il manque uniquement l'offre d'emploi pour croiser les deux et produire une lettre personnalisée. C'est la définition d'un scope minimal et suffisant.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="PROBLÈME" title="45 min par candidature — personnalisation manuelle, risque d'incohérence" body="Chaque lettre repart de zéro : reformuler le profil, sélectionner les expériences pertinentes, adapter le ton. Sans fondation structurée, chaque candidature est un one-shot. Le risque : des lettres génériques, des incohérences avec le CV, un ton inadapté."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="OPPORTUNITÉ" title="La fondation existe déjà — le profil est dans le CLAUDE.md" body="Expériences, résultats mesurables, tone of voice, compétences — tout est déjà documenté avec précision. Ajouter l'offre d'emploi comme variable suffit pour produire une lettre cohérente avec le profil et pertinente par rapport à l'offre."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="SCOPE" title="Décision de scope — ce que la feature fait et ce qu'elle ne fait pas" body="Génération personnalisée · 4 tons · bloc KPI · contexte complémentaire · export PDF A4. Hors scope : multi-profils, historique des candidatures, intégration ATS. La feature résout le problème identifié — elle n'anticipe pas les suivants." isLast/>
            </div>
            <ul className="result-list">
              <li>Problème validé — temps de rédaction élevé, personnalisation manuelle, risque d'incohérence</li>
              <li>Opportunité identifiée — la base de connaissance existait déjà dans le CLAUDE.md</li>
              <li>Scope décidé — minimal, suffisant, livrable sans dépendance externe</li>
            </ul>
          </div>
        </div>

        <div className="case-section" id="benchmark">
          <div className="sec-label"><span className="sec-label-num">04</span><span className="sec-label-step">Benchmark</span></div>
          <div className="sec-body">
            <h2>Ce qui existe ne répond pas au besoin — la décision de construire</h2>
            <p>ChatGPT, Claude.ai, les générateurs de lettres en ligne — tous produisent du générique à partir d'un prompt vide. Aucun ne part d'un profil structuré, d'une base d'expériences précises et d'un tone of voice documenté. La personnalisation est simulée, pas réelle : elle demande un re-prompt manuel complet pour chaque candidature.</p>
            <p>La décision de construire n'était pas "parce que c'est possible". C'était : les outils existants produisent une lettre que je devrais entièrement réécrire. La valeur ajoutée d'une solution ancrée dans un profil structuré est réelle et mesurable.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="OUTILS IA GÉNÉRIQUES" title="ChatGPT / Claude.ai — profil vide, ton arbitraire" body="Génèrent du texte à partir d'un prompt ad hoc. Chaque session repart de zéro — aucune mémoire du profil, aucune cohérence avec le CV, aucun tone of voice documenté. Résultat : lettre générique à réécrire entièrement."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="GÉNÉRATEURS EN LIGNE" title="Templates figés — pas de personnalisation réelle" body="Formulaires à remplir manuellement, templates figés, ton uniforme. La 'personnalisation' se limite à insérer le nom de l'entreprise et le poste. Aucune connexion avec le profil réel du candidat."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="DÉCISION" title="Construire sur la fondation existante — le différenciant est dans le profil" body="La valeur de cette feature n'est pas l'IA. C'est l'architecture de connaissance qui l'alimente. Le CLAUDE.md est le différenciant : un profil structuré, précis, cohérent avec le CV et le portfolio, disponible dès la première instruction." isLast/>
            </div>
            <ul className="result-list">
              <li>Outils génériques — personnalisation simulée, lettre à réécrire, aucune cohérence avec le profil</li>
              <li>Différenciant identifié — le CLAUDE.md comme profil structuré, pas un prompt vide</li>
              <li>Décision validée — construire la feature sur la fondation existante, sans dépendance externe</li>
            </ul>
          </div>
        </div>

        <div className="case-section" id="ideation">
          <div className="sec-label"><span className="sec-label-num">05</span><span className="sec-label-step">Idéation</span></div>
          <div className="sec-body">
            <h2>Les décisions qui définissent la feature — chaque choix a une raison</h2>
            <p>L'idéation n'est pas une exploration libre. C'est une série de décisions ancrées dans le besoin identifié et les contraintes du benchmark. Chaque élément de la feature a été décidé avant d'être designé.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="4 TONS" title="Équilibré · Formel · Concis · Engagé — 4 postures de candidature" body="Pas un curseur arbitraire : 4 registres distincts qui correspondent à 4 cultures d'entreprise différentes. Un recruteur startup attend un ton différent d'un grand groupe. La décision : proposer le choix, pas l'imposer."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="BLOC KPI" title="Les métriques en callout visuel — les chiffres avant le récit" body="Le recruteur lit les chiffres d'impact avant le corps du texte. Décision : extraire automatiquement les métriques (80% de composants en moins, 12 entretiens, MVP en 10 jours) et les formatter en callout distinct, pas noyé dans le corps."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="CONTEXTE COMPLÉMENTAIRE" title="Un toggle pour ce que le profil ne peut pas savoir" body="Contact interne, motivation particulière, projet en cours — des informations propres à chaque candidature que le CLAUDE.md ne contient pas. Un champ optionnel, pas obligatoire : la feature fonctionne sans lui."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="EXPORT PDF" title="La lettre directement envoyable — sans reformatage" body="Mise en page A4, même qualité visuelle que le CV du repo, directement téléchargeable. L'output de la feature est un livrable, pas un brouillon à reformater dans Word." isLast/>
            </div>
            <ul className="result-list">
              <li>4 tons — 4 cultures d'entreprise identifiées, pas une option arbitraire</li>
              <li>Bloc KPI — métriques extraites et formatées automatiquement, visibles avant le corps du texte</li>
              <li>Contexte complémentaire — optionnel, non bloquant, pour les informations candidature-spécifiques</li>
              <li>Export PDF — output directement utilisable, sans étape de reformatage</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-iteration-1.png" caption="Idéation — chaque décision ancrée dans le besoin, pas dans une inspiration board"/>
              <IllustrationItem src="/images/portfolio-iteration-2.png" caption="Décisions documentées — chaque choix a une raison, traçable dans l'historique"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="design">
          <div className="sec-label"><span className="sec-label-num">06</span><span className="sec-label-step">Design</span></div>
          <div className="sec-body">
            <h2>L'interface au service du process — chaque champ est une décision</h2>
            <p>Le form est conçu autour d'un principe : poser uniquement ce que le profil ne sait pas déjà. L'offre, l'entreprise, le poste, le ton — ce sont les 4 seules informations nécessaires. Le reste vient du CLAUDE.md. Moins de champs, moins de friction, personnalisation réelle.</p>
            <p>La lettre générée utilise le même Design System que le portfolio — tokens, typographie, espacements. Cohérence immédiate, zéro décision visuelle à reprendre.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="FORM" title="4 champs — le minimum viable pour une personnalisation réelle" body="Offre, entreprise, poste, ton. Tout ce que le CLAUDE.md ne peut pas déduire seul. Le form ne demande pas ce qu'il sait déjà — pas de reformulation du profil, pas de champs redondants avec le CV."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="GÉNÉRATION" title="Streaming temps réel — la lettre s'écrit progressivement" body="Le texte s'affiche token par token, en temps réel. Décision UX : rendre le process IA visible, pas opaque. L'utilisateur lit la lettre pendant qu'elle se génère — pas d'attente, pas d'écran de chargement."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="RÉSULTAT" title="Lettre + bloc KPI + export PDF — directement utilisable" body="Output complet : lettre personnalisée, bloc KPI formaté en callout, bouton d'export PDF A4. Aucune étape supplémentaire entre la génération et l'envoi." isLast/>
            </div>
            <ul className="result-list">
              <li>Form minimaliste — 4 champs · uniquement ce que le profil ne sait pas déjà</li>
              <li>Streaming temps réel — génération visible, pas de black box ni d'écran de chargement</li>
              <li>Design System appliqué — tokens du portfolio réutilisés sans décision à reprendre</li>
              <li>Output immédiatement utilisable — lettre + KPI block + PDF, sans reformatage</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-lm-form.png" caption="Form — 4 champs, chacun une décision · le profil remplit le reste"/>
              <IllustrationItem src="/images/portfolio-lm-1.png" caption="Lettre générée — profil croisé avec l'offre · bloc KPI formaté · export PDF A4"/>
            </div>
          </div>
        </div>

        <MissionBanner label="Phase 03" title="Build — les décisions techniques sont délégables, les décisions produit ne le sont pas" desc="L'IA implémente ce qui est spécifié. Chaque décision d'architecture, de sécurité ou de déploiement est pilotée par les mêmes critères que les décisions de design : clarté, robustesse, maintenabilité."/>

        <div className="case-section" id="developpement">
          <div className="sec-label"><span className="sec-label-num">07</span><span className="sec-label-step">Développement</span></div>
          <div className="sec-body">
            <h2>Build piloté — l'IA implémente ce qui est spécifié, pas ce qu'elle suppose</h2>
            <p>Le développement n'est pas une phase séparée du design — c'est la phase de vérification. Chaque décision de conception est testée dans le réel, dans le navigateur, en conditions réelles. Piloter Claude Code, c'est piloter une équipe d'exécution : stack définie, composants spécifiés, comportements documentés, contraintes transmises.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="STACK" title="React · Vite · MUI · Claude API · Vercel serverless" body="15 fichiers JSX — 5 pages, 2 layouts, 4 composants custom. Architecture component-based : séparation logique/UI, nommage explicite, découpage sémantique. Lisible pour l'IA autant que pour un développeur humain."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="API" title="Endpoint /api/generate-letter — streaming SSE · formatage KPI automatique" body="Claude Sonnet via l'API Anthropic · streaming Server-Sent Events pour le rendu temps réel · parsing automatique du bloc KPI avec marqueurs [KPI_START]...[KPI_END] · le CLAUDE.md injecté comme system prompt à chaque appel."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="SÉCURITÉ" title="Validation d'origine · pas de clé API exposée côté client" body="L'API key Claude reste côté serveur Vercel. Validation d'origine sur chaque requête. Variables d'environnement documentées dans un fichier .env.example — déployable sans exposition de credentials."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="DÉPLOIEMENT" title="CI/CD Vercel — chaque push sur main déclenche un build" body="Déploiement continu depuis GitHub. Vercel Analytics et Speed Insights intégrés — les performances réelles sont mesurées, pas supposées. 155 commits, chaque décision est traçable dans l'historique Git." isLast/>
            </div>
            <ul className="result-list">
              <li>Feature en production — utilisable directement depuis le portfolio, maintenant</li>
              <li>API sécurisée — clé Claude côté serveur, validation d'origine, variables d'environnement</li>
              <li>Streaming SSE — génération temps réel, expérience utilisateur sans latence perçue</li>
              <li>155 commits — chaque décision est traçable dans l'historique Git</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/portfolio-dev-1.png" caption="Build — décisions d'architecture pilotées par les mêmes critères que le design : clarté, robustesse, maintenabilité"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="synthese">
          <div className="sec-label"><span className="sec-label-num">—</span><span className="sec-label-step">Synthèse</span></div>
          <div className="sec-body">
            <h2>Ce n'est pas une démonstration — c'est ma façon de travailler</h2>
            <p>Besoin identifié → benchmark → idéation → design → build → livraison. Ce process n'a pas été mis en place pour cette étude de cas. C'est le process par défaut. Ce que vous voyez ici, vous l'avez sur chaque projet.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="MÉTHODE" title="Un process structuré, reproductible sur n'importe quel projet" body="Brief → benchmark → idéation → design → build → livraison. Chaque étape produit une décision qui est la donnée d'entrée de la suivante. Pas de saut de phase, pas de mockup sans contexte, pas de build sans spécification."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="KNOWLEDGE ARCHITECTURE" title="L'IA comme levier — parce que la connaissance est structurée" body="Un brief versionné, un profil documenté, un Design System spécifié. Ce n'est pas du prompting — c'est une architecture de connaissance qui rend l'IA précise et cohérente. La qualité de l'output IA est directement proportionnelle à la qualité du brief."/>
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="LIVRAISON" title="Un produit livré — pas seulement des maquettes" body="Une feature en production, utilisable maintenant. La capacité à livrer du code n'est pas une reconversion technique — c'est la conséquence d'un process design assez rigoureux pour que chaque décision soit exécutable par l'IA." isLast/>
            </div>
            <ul className="result-list">
              <li>Process complet de A à Z — documenté, vérifiable, reproductible sur n'importe quel projet</li>
              <li>Architecture de connaissance opérationnelle — CLAUDE.md comme profil vivant, Design System comme fondation, réutilisés sur plusieurs produits</li>
              <li>Feature en production — lettre personnalisée en 30 secondes · 4 tons · export PDF · utilisable maintenant</li>
            </ul>
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

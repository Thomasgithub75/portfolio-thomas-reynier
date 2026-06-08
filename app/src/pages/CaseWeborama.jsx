import CaseLayout, { IllustrationItem, Step, MissionBanner, Quote, CaseCta, OtherProjects } from '../layouts/CaseLayout';
import { Link } from 'react-router-dom';

const TOC = [
  { id: 'contexte', label: 'Contexte' },
  { mission: 'Mission 01' },
  { id: 'audit', label: '01 — Audit' },
  { id: 'design-system-unifie', label: '02 — Design System' },
  { id: 'fonctionnalites', label: '03 — Fonctionnalités' },
  { mission: 'Mission 02' },
  { id: 'ux-design', label: '01 — UX Research' },
  { id: 'design-system', label: '02 — Design System' },
  { id: 'ia-ready', label: '03 — Process IA Ready' },
  { id: 'ideation', label: '04 — Fonctionnalités IA' },
  { id: 'recommandation', label: 'Recommandation' },
];

export default function CaseWeborama() {
  return (
    <CaseLayout title="Weborama" tocItems={TOC}>
      <div className="case-header">
        <div className="container">
          <Link className="back-link" to="/#projets">
            <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour aux projets
          </Link>
          <div className="header-tags">
            {['Design System','Atomic Design','Variables & Tokens','Figma Make','AI Ready','UX Design'].map(t => (
              <span key={t} className="htag tag tag--display">{t}</span>
            ))}
          </div>
          <div className="case-title-row">
            <img className="case-logo" src="/images/logo-weborama.svg" alt="Weborama"/>
            <h1 className="case-h1">Weborama</h1>
          </div>
          <p className="meta-row">Product Designer · Weborama — AdTech SaaS · 16 mois · Figma · Zeroheight · Storybook · Figma Make</p>
          <p className="reading-time">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Lecture · ~6 min
          </p>
          <p className="case-intro">Weborama est une AdTech spécialisée dans la data et l'IA sémantique. Ma mission couvre la rationalisation du Design System sur 4 applications existantes et la conception d'une nouvelle application SaaS avec un process AI Ready via Figma Make.</p>
          <div className="stats-row">
            <div className="stat"><div className="stat-val">2</div><div className="stat-label">Design Systems livrés</div></div>
            <div className="stat"><div className="stat-val">−80%</div><div className="stat-label">de composants après rationalisation</div></div>
            <div className="stat"><div className="stat-val">195</div><div className="stat-label">variants créés pour les 4 applications</div></div>
            <div className="stat"><div className="stat-val">100%</div><div className="stat-label">prototypes IA conformes au Design System</div></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="illustrations-section">
          <p className="illustrations-label">Livrables</p>
          <div className="illustrations-grid">
            <IllustrationItem src="/images/weborama-final-1.jpg" caption="Design System unifié — 4 applications SaaS"/>
            <IllustrationItem src="/images/weborama-final-3.jpg" caption="Template créé dans le Design System"/>
            <IllustrationItem src="/images/weborama-final-2.jpg" caption="Génération d'audience par IA"/>
          </div>
        </div>

        <div className="case-section no-border" id="contexte">
          <p className="sec-label sec-label-plain">Contexte</p>
          <div className="sec-body">
            <h2>Deux missions, une continuité</h2>
            <p>Weborama développait 4 outils SaaS sans Design System commun — incohérences visuelles, friction entre designers et développeurs, livraison ralentie. J'ai audité l'existant et conçu un Design System unifié pour les 4 applications.</p>
            <p>Dans un second temps, Weborama souhaitait lancer un nouvel outil SaaS à partir d'explorations Figma Make des équipes Produit et Commerciales. Ces prototypes nécessitaient une conception UX structurée et un Design System dédié.</p>
            <p>J'ai conçu la nouvelle application de l'audit UX jusqu'à la synchronisation du Design System avec Figma Make, en reportant au Lead Designer.</p>
          </div>
        </div>

        <MissionBanner label="Mission 01" title="Création d'un Design System commun pour 4 applications SaaS" desc="Audit de l'existant, création d'un Design System commun et conception de nouvelles fonctionnalités sur sa base."/>

        <div className="case-section" id="audit">
          <div className="sec-label"><span className="sec-label-num">01</span><span className="sec-label-step">Audit</span></div>
          <div className="sec-body">
            <h2>État des lieux : 4 bibliothèques, zéro cohérence</h2>
            <p>J'ai audité les 4 bibliothèques Figma : <strong>974 composants, 44 variables et 14 variations de couleur</strong>. Chaque application avait évolué indépendamment — composants dupliqués, conventions de nommage divergentes, implémentation dev incertaine.</p>
            <p>J'ai piloté des ateliers réunissant <strong>3 designers et 3 développeurs</strong> pour statuer sur chaque composant : garder, fusionner ou supprimer. Ces sessions ont aussi aligné les équipes sur les principes Atomic Design, tokens et variables.</p>
            <ul className="result-list">
              <li>974 composants audités sur 4 applications</li>
              <li>11 composants en doublon identifiés comme point de départ</li>
              <li>−80% de composants après rationalisation</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/weborama-audit-1.jpg" caption="Atelier de co-construction — unification des composants Badge et Tag"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="design-system-unifie">
          <div className="sec-label"><span className="sec-label-num">02</span><span className="sec-label-step">Design System</span></div>
          <div className="sec-body">
            <h2>Un Design System unifié pour les 4 applications</h2>
            <p>J'ai conçu le Design System de zéro selon les principes de l'Atomic Design — une source de vérité unique pour les 4 applications, partagée entre design et développement.</p>
            <p><strong>Fondations</strong> — palettes avec 4 modes (un par application), typographies, espacements, bibliothèque d'icônes commune. 175 variables en 5 collections : Primitives, Colors, Spacing, Typography, Border.</p>
            <p><strong>Composants</strong> — 24 composants déclinés en 195 variants, connectés aux variables sémantiques. <strong>Templates</strong> — 7 templates réutilisables pour concevoir de nouvelles fonctionnalités sur une base cohérente.</p>
            <p>Documentation centralisée dans <strong>Zeroheight</strong> (design) et <strong>Storybook</strong> (développement).</p>
            <ul className="result-list">
              <li>24 composants · 195 variants connectés aux variables sémantiques</li>
              <li>175 variables en 5 collections · 4 modes de couleurs</li>
              <li>7 templates réutilisables</li>
              <li>100% documentés dans Zeroheight et Storybook</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/weborama-ds-avant.jpg" caption="Bibliothèque de composants — avant"/>
              <IllustrationItem src="/images/weborama-ds-unifie-1.jpg" caption="Nouveau Design System unifié — après"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="fonctionnalites">
          <div className="sec-label"><span className="sec-label-num">03</span><span className="sec-label-step">Fonctionnalités</span></div>
          <div className="sec-body">
            <h2>Le DS comme accélérateur de conception</h2>
            <p>Le Design System en place, la conception de nouvelles fonctionnalités est plus rapide et cohérente.</p>
            <p>Exemple : un <strong>flux unifié pour exporter des datasets vers des destinations externes</strong> (S3, Yandex…). Le parcours se déroule en deux étapes : créer une destination réutilisable, puis configurer un transfert avec contrôle fin des colonnes.</p>
            <p>Les templates du DS ont fourni les patterns de formulaire, les états et les composants. La conception s'est concentrée sur le <strong>parcours et la logique fonctionnelle</strong>.</p>
            <ul className="result-list">
              <li>Parcours conçu en 2 étapes claires et cohérentes</li>
              <li>Templates du DS réutilisés directement — aucune brique à recréer</li>
              <li>Contrôle fin des colonnes sans quitter l'application</li>
              <li>Zéro outil tiers nécessaire</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24,maxWidth:480}}>
              <IllustrationItem src="/images/weborama-feature-1.jpg" caption="Création d'un nouveau transfert"/>
            </div>
          </div>
        </div>

        <MissionBanner label="Mission 02" title="Nouvelle application SaaS" desc="UX Research, Design System dédié, process IA Ready et conception de fonctionnalités IA pour accélérer l'exploration produit."/>

        <div className="case-section" id="ux-design">
          <div className="sec-label"><span className="sec-label-num">01</span><span className="sec-label-step">UX Research</span></div>
          <div className="sec-body">
            <h2>Comprendre avant de concevoir</h2>
            <p>Weborama souhaitait lancer une nouvelle application SaaS à partir d'explorations Figma Make des équipes Produit et Commerciales. Ces prototypes nécessitaient une démarche UX structurée.</p>
            <p>J'ai analysé les prototypes existants, benchmarké les outils concurrents, puis conçu le parcours utilisateur final.</p>
            <ul className="result-list">
              <li>Analyse des prototypes PO & BU — frictions identifiées, opportunités définies</li>
              <li>Benchmark des conventions UX du marché</li>
              <li>Parcours utilisateur conçu et validé avec les équipes</li>
              <li>100% des propositions acceptées par les équipes Produit et Commerciale</li>
              <li>3 écrans supprimés — complexité réduite sans perte de fonctionnalité</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/weborama-ux-1.jpg" caption="Analyse des parcours & frictions"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="design-system">
          <div className="sec-label"><span className="sec-label-num">02</span><span className="sec-label-step">Design System</span></div>
          <div className="sec-body">
            <h2>Un Design System pensé pour l'IA</h2>
            <p>J'ai conçu le Design System de la nouvelle application pour fournir une base solide aux équipes design et dev, compatible nativement avec Figma Make.</p>
          </div>
        </div>

        <div className="case-section" id="ia-ready">
          <div className="sec-label"><span className="sec-label-num">03</span><span className="sec-label-step">Process IA Ready</span></div>
          <div className="sec-body">
            <h2>Intégrer le Design System dans le process IA</h2>
            <p>Le Design System est intégré comme knowledge dans le code Figma Make — chaque composant, token et guideline devient une instruction lisible par l'IA pour générer des prototypes conformes au DS.</p>
            <div className="steps">
              <Step icon={<img src="/images/icon-claude.svg" alt="Claude"/>} stepNum="IMPLÉMENTATION" title="Knowledge intégré dans le code Figma Make" body="Connaissance du Design System structurée en fichiers markdown : guidelines.md, fichiers par composant (button.md, input.md…) et dossier tokens (colors.md, spacing.md)." isLast/>
            </div>
            <ul className="result-list">
              <li>1 guidelines.md — point d'entrée unique pour cadrer l'IA</li>
              <li>8 fichiers composants documentés avec usage, tokens et variants</li>
              <li>4 collections de tokens structurées pour la lecture par l'IA</li>
              <li>100% des prototypes générés conformes au Design System</li>
            </ul>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/weborama-context-2.jpg" caption="Implémentation du knowledge dans le code"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="ideation">
          <div className="sec-label"><span className="sec-label-num">04</span><span className="sec-label-step">Fonctionnalités IA</span></div>
          <div className="sec-body">
            <h2>Concevoir de nouvelles fonctionnalités avec l'IA</h2>
            <p>Le process IA Ready en place, Figma Make génère des prototypes alignés avec le DS. Les explorations sont rapides et présentables aux équipes.</p>
            <p>Exemple : la <strong>génération d'audience par IA à partir d'un brief en langage naturel</strong>. L'IA produit une persona, estime le volume d'audience et génère les règles de segmentation WAM — sans outil tiers.</p>
            <p>La fonctionnalité a été idéée, maquettée et itérée via Figma Make. Le time-to-prototype est passé de plusieurs jours à quelques heures.</p>
            <ul className="result-list">
              <li>Génération d'audience IA depuis un brief en langage naturel</li>
              <li>Persona + volume estimé + règles WAM générés automatiquement</li>
              <li>Zéro outil tiers — tout dans l'interface</li>
              <li>Time-to-prototype réduit grâce au process IA Ready</li>
              <li>4 équipes alignées sur le process — PO, BU, Design, Dev</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/weborama-ideation-2.jpg" caption="Génération d'audience par IA — saisie du brief" noZoom/>
              <IllustrationItem src="/images/weborama-ideation-3.jpg" caption="Résultat de la génération d'audience" noZoom/>
            </div>
          </div>
        </div>

        <div className="case-section" id="recommandation">
          <p className="sec-label sec-label-plain">Recommandation</p>
          <div className="sec-body">
            <h2></h2>
            <Quote
              text="« En tant que Product Designer, Thomas a su faire de l'IA un véritable allié stratégique, l'intégrant avec maîtrise dans ses méthodes de conception pour créer des produits plus intelligents, optimiser les parcours utilisateurs et renforcer durablement la performance des produits Weborama. »"
              avatar="/images/avatar-donia.png"
              name="Donia Ben Ghorbal"
              role="Lead Product Designer · Weborama"
            />
          </div>
        </div>
      </div>

      <CaseCta/>
      <OtherProjects projects={[
        { href:'/case/pepyte', thumb:'/images/thumb-pepyte.jpg', logo:'/images/logo-pepyte.svg', role:'UX Research & Design', roleClass:'', duration:'26 mois', name:'Pepyte', desc:'Recherche utilisateur & conception de la fonctionnalité de matching — de l\'audit à l\'interface.', tags:['UX Research','Entretiens','Figma'] },
        { href:'/case/nectar', thumb:'/images/thumb-nectar.jpg', logo:'/images/logo-nectar.svg', role:'Founding Designer', roleClass:'role-nectar', duration:'En cours', name:'Nectar', desc:'MVP SaaS piloté par IA — de la recherche utilisateur au développement, 100% du process assisté par IA.', tags:['UX Research','Figma Make','Claude'] },
      ]}/>
    </CaseLayout>
  );
}

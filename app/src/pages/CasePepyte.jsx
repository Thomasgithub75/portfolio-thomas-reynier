import CaseLayout, { IllustrationItem, Quote, CaseCta, OtherProjects } from '../layouts/CaseLayout';
import { Link } from 'react-router-dom';

const TOC = [
  { id: 'contexte', label: 'Contexte' },
  { id: 'audit', label: '01 — Audit' },
  { id: 'entretiens', label: '02 — Entretiens' },
  { id: 'priorisation', label: '03 — Priorisation' },
  { id: 'formulaires', label: '04 — Formulaires' },
  { id: 'atelier', label: '05 — Atelier' },
  { id: 'scoring', label: '06 — Scoring' },
  { id: 'parcours', label: '07 — Parcours' },
  { id: 'tests', label: '08 — Tests' },
  { id: 'resultats', label: '09 — Résultats' },
  { id: 'recommandations', label: 'Recommandations' },
];

export default function CasePepyte() {
  return (
    <CaseLayout title="Pepyte" tocItems={TOC}>
      <div className="case-header">
        <div className="container">
          <Link className="back-link" to="/#projets">
            <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour aux projets
          </Link>
          <div className="header-tags">
            {['UX Research','Entretiens','Questionnaires','Prototypage','UX/UI Design','Matching'].map(t => (
              <span key={t} className="htag tag tag--display">{t}</span>
            ))}
          </div>
          <div className="case-title-row">
            <img className="case-logo" src="/images/logo-pepyte.svg" alt="Pepyte"/>
            <h1 className="case-h1">Pepyte</h1>
          </div>
          <p className="meta-row">Product Designer · Pepyte — HR tech SaaS · 26 mois · Figma · Notion · Figma Make</p>
          <p className="reading-time">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Lecture · ~7 min
          </p>
          <p className="case-intro">Pepyte est une plateforme SaaS B2B dédiée au recrutement dans les startups et entreprises tech. Ma mission couvre la recherche utilisateur, la restructuration des formulaires et la conception de la fonctionnalité de matching.</p>
          <div className="stats-row">
            <div className="stat"><div className="stat-val">15</div><div className="stat-label">recruteurs impliqués en recherche</div></div>
            <div className="stat"><div className="stat-val">10</div><div className="stat-label">champs prioritaires intégrés aux formulaires</div></div>
            <div className="stat"><div className="stat-val">12</div><div className="stat-label">critères de matching définis</div></div>
            <div className="stat"><div className="stat-val">1</div><div className="stat-label">fonctionnalité conçue de bout en bout</div></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="illustrations-section">
          <p className="illustrations-label">Maquettes finales</p>
          <div className="illustrations-grid">
            <IllustrationItem src="/images/pepyte-screen-1.jpg" caption="Nouveau formulaire candidat"/>
            <IllustrationItem src="/images/pepyte-screen-2.jpg" caption="Nouveau menu de personnalisation"/>
            <IllustrationItem src="/images/pepyte-screen-3.jpg" caption="Nouvelle fonctionnalité de matching"/>
          </div>
        </div>

        <div className="case-section no-border" id="contexte">
          <p className="sec-label sec-label-plain">Contexte</p>
          <div className="sec-body">
            <p>Le matching entre offres et candidats était réalisé manuellement, basé sur l'expérience individuelle de chaque recruteur, sans règles formalisées ni processus commun.</p>
            <p>Les formulaires contenaient des données incomplètes et perfectibles, ce qui limitait l'automatisation de la correspondance entre offres et candidats.</p>
          </div>
        </div>

        <div className="case-section" id="audit">
          <div className="sec-label"><span className="sec-label-num">01</span><span className="sec-label-step">Audit</span></div>
          <div className="sec-body">
            <h2>Cartographie de l'existant</h2>
            <p>J'ai commencé par inventorier l'ensemble des champs existants : <strong>62 champs</strong> répartis sur 3 formulaires (Candidat, Offre, Entreprise).</p>
            <p>En parallèle, j'ai mené un benchmark concurrentiel (LinkedIn, Welcome to the Jungle, ATS du marché) documenté dans Notion. Il a permis d'identifier <strong>11 nouveaux champs potentiels</strong>, qui ont servi de base au questionnaire de priorisation.</p>
            <div className="illustrations-grid-2-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/pepyte-audit-1.jpg" caption="Analyse de l'existant"/>
              <IllustrationItem src="/images/pepyte-audit-2.jpg" caption="Benchmark concurrentiel"/>
              <IllustrationItem src="/images/pepyte-audit-3.jpg" caption="Compte rendu"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="entretiens">
          <div className="sec-label"><span className="sec-label-num">02</span><span className="sec-label-step">Entretiens</span></div>
          <div className="sec-body">
            <h2>10 entretiens recruteurs</h2>
            <p>J'ai mené 10 entretiens avec des recruteurs, incluant une phase d'observation directe : chaque participant présentait son outil en conditions réelles. L'objectif était de comprendre les informations réellement collectées, les arbitrages quotidiens et les limites des outils existants.</p>
            <p>Ces entretiens ont permis d'identifier <strong>18 nouveaux champs pertinents</strong>, dont 8 absents du benchmark. Ils ont également fait émerger des opportunités concrètes : matching automatique, synthèse de profil par IA et complétion audio des fiches.</p>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/pepyte-recherche-1.jpg" caption="Entretien individuel" bg="#111"/>
              <IllustrationItem src="/images/pepyte-recherche-2.jpg" caption="Compte rendu des entretiens"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="priorisation">
          <div className="sec-label"><span className="sec-label-num">03</span><span className="sec-label-step">Priorisation</span></div>
          <div className="sec-body">
            <h2>Priorisation par les données</h2>
            <p>J'ai consolidé tous les champs identifiés (audit, benchmark, entretiens) dans un questionnaire soumis à <strong>15 recruteurs</strong> via Notion Form. Pour chaque champ : obligatoire, optionnel ou sans avis.</p>
            <p>Les résultats synthétisés en tableau ont permis de faire émerger <strong>10 champs prioritaires</strong> à intégrer immédiatement. Chaque décision de design repose sur ces données — aucune hypothèse interne.</p>
          </div>
        </div>

        <div className="case-section" id="formulaires">
          <div className="sec-label"><span className="sec-label-num">04</span><span className="sec-label-step">Formulaires</span></div>
          <div className="sec-body">
            <h2>De la recherche aux interfaces</h2>
            <p>J'ai intégré les <strong>10 champs prioritaires</strong> dans les trois formulaires en travaillant sur trois axes principaux.</p>
            <p><strong>Navigation latérale</strong> — ajout d'une side navigation entre les rubriques du formulaire pour structurer la progression et réduire la charge cognitive.</p>
            <p><strong>Remplacement par des pills</strong> — pour les champs avec peu de propositions, les dropdowns ont été remplacés par des pills sélectionnables directement visibles, plus rapides à compléter.</p>
            <p><strong>Suggestions contextuelles</strong> — pour les dropdowns conservés, ajout de tags de suggestion en dessous. Exemple : le champ "Langue" affiche en raccourci les 3 langues les plus renseignées — Anglais, Espagnol, Allemand.</p>
            <p>J'ai également conçu un <strong>menu de personnalisation</strong> permettant à chaque recruteur d'activer ou masquer les champs selon ses processus.</p>
            <ul className="result-list">
              <li>10 nouveaux champs intégrés, validés par les données</li>
              <li>Side navigation ajoutée pour structurer les rubriques du formulaire</li>
              <li>Pills pour les champs à choix courts, suggestions contextuelles pour les dropdowns</li>
              <li>Menu de personnalisation par profil recruteur</li>
            </ul>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/pepyte-formulaire-1.jpg" caption="Nouveau formulaire candidat"/>
              <IllustrationItem src="/images/pepyte-formulaire-2.jpg" caption="Menu de personnalisation"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="atelier">
          <div className="sec-label"><span className="sec-label-num">05</span><span className="sec-label-step">Atelier matching</span></div>
          <div className="sec-body">
            <h2>Comprendre les règles de matching</h2>
            <p>Avant de concevoir le matching, j'avais besoin de comprendre comment les recruteurs font correspondre un candidat à une offre au quotidien. Ce savoir-faire était implicite, non formalisé, variable d'un recruteur à l'autre.</p>
            <p>J'ai organisé un atelier collaboratif en deux temps : chaque participant liste ses critères de matching (séniorité, secteur, rémunération, langues…), puis les classe par niveau d'importance. Cinq niveaux ont émergé : <strong>Essentiel, Important, Bonus, Red flag éliminatoire</strong> et <strong>Red flag non éliminatoire</strong>.</p>
            <div className="illustrations-grid-1" style={{marginTop:24}}>
              <IllustrationItem src="/images/pepyte-atelier-1.jpg" caption="Atelier d'identification et hiérarchisation des critères" noZoom/>
            </div>
          </div>
        </div>

        <div className="case-section" id="scoring">
          <div className="sec-label"><span className="sec-label-num">06</span><span className="sec-label-step">Scoring</span></div>
          <div className="sec-body">
            <h2>Co-créer un système de notation</h2>
            <p>À partir des critères identifiés en atelier, j'ai formalisé une <strong>grille de scoring</strong> en trois catégories : critères Classiques (socle du matching), Bonus (différenciation) et Malus (pénalisants ou bloquants). Chaque critère est pondéré selon son poids dans la décision finale.</p>
            <p>En impliquant les recruteurs dans la définition des règles, le score affiché sera compris et utilisé. <strong>12 critères</strong> hiérarchisés, dont 3 d'exclusion automatique, et un seuil minimal de correspondance défini.</p>
            <ul className="result-list">
              <li>12 critères de matching hiérarchisés et pondérés</li>
              <li>3 critères d'exclusion automatique</li>
              <li>Seuil minimal de matching défini avec les équipes</li>
            </ul>
          </div>
        </div>

        <div className="case-section" id="parcours">
          <div className="sec-label"><span className="sec-label-num">07</span><span className="sec-label-step">Parcours UX</span></div>
          <div className="sec-body">
            <h2>Concevoir un parcours orienté action</h2>
            <p>Les règles de matching formalisées, j'ai conçu le parcours utilisateur autour d'un principe simple : le recruteur ne doit pas avoir à interpréter — il doit pouvoir décider rapidement.</p>
            <p>Le parcours se déroule en <strong>3 étapes</strong> : sélection de l'offre → résultats triés par score → action sur chaque candidat. Les critères correspondants sont mis en évidence, les non-correspondants atténués. Les actions (ajouter / rejeter) sont accessibles depuis la liste.</p>
            <div className="illustrations-grid" style={{marginTop:24}}>
              <IllustrationItem src="/images/pepyte-matching-1.jpg" caption="1. Sélection de l'offre"/>
              <IllustrationItem src="/images/pepyte-matching-2.jpg" caption="2. Consulter les résultats et décider"/>
              <IllustrationItem src="/images/pepyte-matching-3.jpg" caption="3. Consulter le profil"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="tests">
          <div className="sec-label"><span className="sec-label-num">08</span><span className="sec-label-step">Tests & itérations</span></div>
          <div className="sec-body">
            <h2>Valider et affiner avec les utilisateurs</h2>
            <p>Le parcours et les règles ont été testés avec les recruteurs puis ajustés.</p>
            <div style={{display:'flex',flexDirection:'column',gap:28,marginTop:16}}>
              {[
                { num:'AMÉLIORATION 01', title:'Ajustement des règles de matching', body:"Le seuil initial était trop strict et excluait des profils pertinents. Il a été ajusté pour trouver le bon équilibre entre qualité et volume de résultats." },
                { num:'AMÉLIORATION 02', title:'Contextualisation du matching', body:"Les recruteurs avaient du mal à évaluer les résultats sans voir les critères de l'offre en référence. J'ai intégré l'affichage des critères de l'offre directement dans la vue résultats pour ancrer le matching dans son contexte." },
                { num:'AMÉLIORATION 03', title:'Lisibilité optimisée', body:"Critères correspondants mis en avant avec un tag actif, non-correspondants en état disabled et repositionnés en fin de liste." },
              ].map(s => (
                <div key={s.num} style={{paddingBottom:0}}>
                  <p className="step-num">{s.num}</p>
                  <p className="step-title">{s.title}</p>
                  <p className="step-body">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="illustrations-grid-2" style={{marginTop:24}}>
              <IllustrationItem src="/images/pepyte-avant.jpg" caption="Avant itération"/>
              <IllustrationItem src="/images/pepyte-apres.jpg" caption="Après itération"/>
            </div>
          </div>
        </div>

        <div className="case-section" id="resultats">
          <div className="sec-label"><span className="sec-label-num">09</span><span className="sec-label-step">Résultats</span></div>
          <div className="sec-body">
            <h2>Impact sur le produit</h2>
            <p>La démarche a livré un matching ancré dans les usages réels. Les règles co-construites avec les recruteurs garantissent un score compris et adopté.</p>
            <ul className="result-list">
              <li>Matching instantané entre offres et candidats</li>
              <li>Priorisation claire via un score lisible et explicable</li>
              <li>Réduction significative du temps de sourcing manuel</li>
              <li>Actions directes : ajouter ou rejeter un candidat sans quitter le flux</li>
              <li>Adoption facilitée par une logique co-construite avec les équipes</li>
            </ul>
          </div>
        </div>

        <div className="case-section" id="recommandations">
          <p className="sec-label sec-label-plain">Recommandations</p>
          <div className="sec-body">
            <h2></h2>
            <Quote
              text="« Thomas a grandement amélioré notre plateforme. Il a su comprendre les besoins des utilisateurs et collaborer efficacement avec notre équipe de développement. Nous avons obtenu une augmentation importante de la satisfaction des utilisateurs et de l'efficacité des processus de recrutement. »"
              avatar="/images/avatar-antoine.png"
              name="Antoine Girard"
              role="Co-CEO & Co-Founder · Pepyte"
            />
            <Quote
              text="« Thomas est un Product Designer motivé, combinant une capacité de travail impressionnante à une positivité contagieuse. Son dévouement et son optimisme inspirent toute l'équipe. Fortement recommandé. »"
              avatar="/images/avatar-alexis.png"
              name="Alexis Vaysse"
              role="Co-CEO & Co-Founder · Pepyte"
            />
          </div>
        </div>
      </div>

      <CaseCta/>
      <OtherProjects projects={[
        { href:'/case/weborama', thumb:'/images/thumb-weborama.jpg', logo:'/images/logo-weborama.svg', role:'Design System Lead', roleClass:'role-weborama', duration:'16 mois', name:'Weborama', desc:"2 Design Systems, process AI Ready et idéation via Figma Make — 4 équipes alignées sur une source unique.", tags:['Design System','Figma Make','AI Ready'] },
        { href:'/case/nectar', thumb:'/images/thumb-nectar.jpg', logo:'/images/logo-nectar.svg', role:'Founding Designer', roleClass:'role-nectar', duration:'En cours', name:'Nectar', desc:'MVP SaaS piloté par IA — de la recherche utilisateur au développement, 100% du process assisté par IA.', tags:['UX Research','Figma Make','Claude'] },
      ]}/>
    </CaseLayout>
  );
}

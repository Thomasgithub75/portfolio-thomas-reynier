// Contenu de la page d'accueil, utilisé par l'aperçu Astryx (pages/AstryxHome.jsx).
// Copie du contenu de pages/Home.jsx : à fusionner dans un seul fichier si la migration est validée.

export const HERO_POINTS = [
  { label: 'Parcours & interfaces', desc: 'de la recherche utilisateur à la livraison' },
  { label: 'Design Systems', desc: 'création et gouvernance de systèmes' },
  { label: 'Intelligence artificielle', desc: 'de la discovery à la livraison' },
];

export const HERO_STATS = [
  { num: '5', label: "ans d'expérience" },
  { num: '+10', label: 'produits SaaS, e‑commerce & retail' },
  { num: '3', label: "entreprises accompagnées vers l'IA" },
];

export const PROJECTS = [
  {
    href: '/case/pepyte', thumb: '/images/thumb-pepyte.webp', logo: '/images/logo-pepyte.svg',
    role: 'UX Research & Design', roleVariant: 'purple', duration: '26 mois', name: 'Pepyte',
    desc: "Audit de 62 champs, 10 entretiens recruteurs et conception de la fonctionnalité de matching — de la recherche à l'interface.",
    tags: ['UX Research', 'Design System', 'Design IA'],
  },
  {
    href: '/case/weborama', thumb: '/images/thumb-weborama.webp', logo: '/images/logo-weborama.svg',
    role: 'Design System Lead', roleVariant: 'teal', duration: '16 mois', name: 'Weborama',
    desc: "Audit de 974 composants, ateliers de co-construction et création d'un Design System de zéro — 80% de composants en moins.",
    tags: ['UX Research', 'Design System', 'Design IA'],
  },
];

export const LOCKED_PROJECT = {
  href: '/case/pepyte-signature', logo: '/images/logo-pepyte.svg', role: 'Présentée en entretien', date: 'Juin 2026',
  name: 'Mon nouveau process IA',
  desc: "Comment transformer un dashboard de pilotage aveugle en outil de décision — feature conçue de A à Z, de l'insight à la mise en production.",
  tags: ['Product Design', 'Logique métier', 'Prototypage'],
};

export const MATCHING_STEPS = [
  "Collez votre offre d'emploi",
  "L'IA identifie nos points de matching",
  'Exportez le résultat en PDF.',
];

const PEPYTE = { logo: '/images/logo-pepyte.svg', name: 'Pepyte', url: '/case/pepyte' };
const WEBORAMA = { logo: '/images/logo-weborama.svg', name: 'Weborama', url: '/case/weborama' };
const PROCESS_IA = { logo: '/images/logo-pepyte.svg', name: 'Mon nouveau process IA', url: '/case/pepyte-signature', locked: true };

export const SKILL_PROJECTS = {
  'UX Research': [{ ...PEPYTE, desc: '12 entretiens · JTBD · synthèse IA' }, { ...WEBORAMA, desc: 'Audit UX · tests · heatmaps' }],
  'Product Design': [{ ...PROCESS_IA, desc: 'Feature · Dashboard · Logique métier' }, { ...PEPYTE, desc: 'Refonte onboarding · mobile first' }, { ...WEBORAMA, desc: 'Nouveau SaaS AdTech de 0' }],
  'Design System': [{ ...WEBORAMA, desc: 'DS from scratch · tokens · Storybook' }, { ...PEPYTE, desc: 'Audit & gouvernance DS existant' }],
  'Prototypage haute fidélité': [{ ...PROCESS_IA, desc: '4 prototypes HTML · itération rapide · IA' }, { ...PEPYTE, desc: 'Prototypes testables · Figma avancé' }],
  'Atomic Design': [{ ...WEBORAMA, desc: 'Architecture composants · Atomic' }],
  'Design to Code': [{ logo: '/images/logo-portfolio.svg', name: 'Portfolio', url: '/', desc: 'React · MUI · Design System' }],
  'IA générative': [{ ...PEPYTE, desc: 'Synthèse entretiens · research IA' }],
  'Entretiens utilisateurs': [{ ...PEPYTE, desc: '12 entretiens · JTBD · pain points' }, { ...WEBORAMA, desc: 'Entretiens équipes produit & sales' }],
  'Audit UX': [{ ...WEBORAMA, desc: 'Audit UX · heatmaps · tests utilisateurs' }, { ...PEPYTE, desc: 'Audit interface existante · quick wins' }],
  'Tests utilisateurs': [{ ...PEPYTE, desc: 'Tests modérés · validation hypothèses' }, { ...WEBORAMA, desc: 'Tests prototypes · itérations UX' }],
  'User flows & zoning': [{ ...PROCESS_IA, desc: 'Dashboard redesign · signal unique · pilotage' }, { ...PEPYTE, desc: 'Parcours onboarding complet · zoning' }],
};

export const CORE_SKILLS = ['UX Research', 'Product Design', 'Design System'];
export const SEC_SKILLS = ['Prototypage haute fidélité', 'Atomic Design', 'Design to Code', 'IA générative', 'Entretiens utilisateurs', 'Audit UX', 'Tests utilisateurs', 'User flows & zoning'];

export const TOOLS = [
  { name: 'Figma', cat: 'design' }, { name: 'Figma Make', cat: 'design' }, { name: 'Lovable', cat: 'design' },
  { name: 'Zeroheight', cat: 'design' }, { name: 'Supernova', cat: 'design' }, { name: 'Storybook', cat: 'design' },
  { name: 'Mobbin', cat: 'design' }, { name: 'Astryx', cat: 'design' }, { name: 'Claude Design', cat: 'design' },
  { name: 'Replit', cat: 'dev' }, { name: 'VSCode', cat: 'dev' }, { name: 'Claude Code', cat: 'dev' },
  { name: 'Supabase', cat: 'dev' }, { name: 'Vercel', cat: 'dev' }, { name: 'Bitbucket', cat: 'dev' },
  { name: 'Jira', cat: 'pm' }, { name: 'Notion', cat: 'pm' },
];

export const TESTIMONIALS = [
  {
    logo: '/images/logo-pepyte.svg', company: 'Pepyte', featured: true,
    keyquote: "« Une augmentation importante de la satisfaction des utilisateurs et de l'efficacité des processus de recrutement. »",
    quote: "Thomas a grandement amélioré notre plateforme de recrutement. Il a su comprendre les besoins des utilisateurs. Il a également collaboré efficacement avec notre équipe de développement. Nous avons obtenu une augmentation importante de la satisfaction des utilisateurs clients et de l'efficacité des processus de recrutement.",
    avatar: '/images/avatar-alexis.png', name: 'Alexis Vaysse', role: 'Co-CEO & Co-Founder · Pepyte', li: 'https://fr.linkedin.com/in/alexis-vaysse',
  },
  {
    logo: '/images/logo-pepyte.svg', company: 'Pepyte',
    keyquote: '« Une capacité de travail impressionnante à une positivité contagieuse. »',
    quote: "Thomas est un Product Designer motivé, combinant une capacité de travail impressionnante à une positivité contagieuse. Son dévouement et son optimisme inspirent toute l'équipe. Fortement recommandé !",
    avatar: '/images/avatar-antoine.png', name: 'Antoine Girard', role: 'Co-CEO & Co-Founder · Pepyte', li: 'https://www.linkedin.com/in/antoine-girard-202561143/',
  },
  {
    logo: '/images/logo-weborama.svg', company: 'Weborama',
    keyquote: "« Faire de l'IA un véritable allié stratégique. »",
    quote: "Thomas a su faire de l'IA un véritable allié stratégique, l'intégrant avec maîtrise dans ses méthodes de conception pour créer des produits plus intelligents et optimiser les parcours utilisateurs.",
    avatar: '/images/avatar-donia.png', name: 'Donia Ben Ghorbal', role: 'Lead Product Designer · Weborama', li: 'https://www.linkedin.com/in/donia-benghorbal-750ba1143/',
  },
];

export const CONTACT = {
  email: 'reynier.design@gmail.com',
  mailto: 'https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com',
  linkedin: 'https://www.linkedin.com/in/thomas-reynier-product-design/',
  cv: '/cv/CV_Thomas_Reynier_2026.pdf',
};

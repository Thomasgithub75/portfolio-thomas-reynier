// Fichier de référence — Compétences × Études de cas
// Chaque bloc "proof" est écrit à la première personne, ciblé sur la preuve.
// L'IA lit ce fichier pour assembler la réponse personnalisée au recruteur.

export const COMPETENCIES = [

  {
    id: 'ux-research',
    label: 'Recherche utilisateur',
    keywords: ['recherche utilisateur', 'ux research', 'user research', 'entretien', 'interview', 'découverte', 'discovery', 'investigation'],
    projects: [
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai mené 10 entretiens recruteurs avec une phase d'observation directe — chaque participant présentait son outil en conditions réelles. J'ai consolidé les résultats dans un questionnaire soumis à 15 professionnels pour prioriser les évolutions à apporter. Chaque décision de design repose sur ces données : aucune hypothèse interne n'a guidé les choix.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai conduit des entretiens avec les POs, BUs et équipes produit pour comprendre les usages réels des 4 outils SaaS. Ces entretiens ont alimenté l'audit du Design System existant et orienté les priorités de refonte — avant toute décision de conception.",
      },
      {
        name: 'Nectar',
        url: '/case/nectar',
        logo: '/images/logo-nectar.svg',
        proof: "J'ai mené une phase de discovery complète avec interviews utilisateurs et cadre JTBD (Jobs to Be Done) pour définir les besoins réels avant toute conception. Les insights ont directement structuré l'architecture de l'application et les fonctionnalités prioritaires du MVP.",
      },
    ],
  },

  {
    id: 'user-tests',
    label: 'Tests utilisateurs',
    keywords: ['test utilisateur', 'test utilisateurs', 'user testing', 'test modéré', 'validation', 'usability test', 'test d\'utilisabilité'],
    projects: [
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai conduit des tests utilisateurs modérés sur les prototypes de matching et de formulaires. Les résultats ont conduit à 3 itérations majeures : ajustement du seuil de matching, contextualisation des critères dans la vue résultats, et optimisation de la lisibilité des états actifs / inactifs.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai testé les composants et parcours du Design System avec les équipes produit et développement pour valider la cohérence et identifier les points de friction avant tout déploiement sur les applications.",
      },
    ],
  },

  {
    id: 'workshops',
    label: 'Facilitation d\'ateliers',
    keywords: ['atelier', 'workshop', 'facilitation', 'co-construction', 'design sprint', 'idéation collective', 'animation'],
    projects: [
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai organisé et animé un atelier collaboratif avec les recruteurs pour formaliser les règles de matching : identification des critères, classification par niveau d'importance (Essentiel, Important, Bonus, Red flag). Ce savoir-faire implicite et non formalisé est devenu la base du système de scoring intégré à la plateforme.",
      },
    ],
  },

  {
    id: 'benchmark',
    label: 'Benchmark concurrentiel',
    keywords: ['benchmark', 'veille concurrentielle', 'analyse concurrentielle', 'analyse marché', 'étude concurrentielle', 'competitive analysis'],
    projects: [
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai réalisé un benchmark de LinkedIn, Welcome to the Jungle et des principaux ATS du marché pour identifier 11 nouveaux champs absents de la plateforme. Ce benchmark documenté dans Notion a servi de base au questionnaire de priorisation soumis à 15 recruteurs.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai conduit un audit de 974 composants existants et réalisé un benchmark des Design Systems de référence (Material, Carbon, Atlassian) pour orienter les choix d'architecture, de gouvernance et de nommage.",
      },
    ],
  },

  {
    id: 'ux-flows',
    label: 'Conception de parcours utilisateur',
    keywords: ['parcours utilisateur', 'user flow', 'user journey', 'conception', 'flow', 'zoning', 'architecture information', 'ux design', 'expérience utilisateur', 'refonte'],
    projects: [
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai conçu le parcours de matching en 3 étapes — sélection de l'offre, résultats triés par score, action sur chaque candidat. Le principe directeur : le recruteur ne doit pas interpréter, il doit pouvoir décider en quelques secondes. Les actions sont accessibles directement depuis la liste sans quitter le flux.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai conçu les parcours UX des nouvelles fonctionnalités du SaaS AdTech en collaboration avec les équipes produit et développement — de la définition des besoins à la livraison des interfaces.",
      },
      {
        name: 'Nectar',
        url: '/case/nectar',
        logo: '/images/logo-nectar.svg',
        proof: "J'ai conçu l'intégralité du parcours utilisateur de Nectar, de la discovery à la livraison des 8 écrans du MVP. Chaque écran découle d'un besoin identifié en recherche — aucun écran gratuit, aucune feature sans usage validé.",
      },
      {
        name: 'Probabilité de signature — Pepyte',
        url: '/case/pepyte-signature',
        logo: '/images/logo-pepyte.svg',
        locked: true,
        proof: "J'ai refondu de A à Z l'outil de pilotage quotidien des headhunters : suppression des métriques parasites, conception d'un signal unique calculé automatiquement, 4 itérations de prototypes HTML avant de figer la solution. La décision centrale : le dashboard doit répondre à une seule question — sur quelle offre agir maintenant.",
      },
    ],
  },

  {
    id: 'design-system',
    label: 'Design System',
    keywords: ['design system', 'système de design', 'composants', 'atomic design', 'tokens', 'bibliothèque de composants', 'storybook', 'zeroheight', 'gouvernance', 'librairie'],
    projects: [
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai créé deux Design Systems de zéro pour 4 outils SaaS, en partant d'un audit de 974 composants existants. Architecture Atomic Design, tokens de design, documentation Storybook et Zeroheight. Résultat : 80 % de composants en moins, 4 équipes alignées sur une source de vérité unique.",
      },
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai contribué à la création et la gouvernance du Design System Trésor chez Pepyte — cohérence entre composants Figma et interfaces produit, audit de l'existant, identification des incohérences et priorisation des corrections.",
      },
      {
        name: 'Nectar',
        url: '/case/nectar',
        logo: '/images/logo-nectar.svg',
        proof: "J'ai construit un Design System token-based pour Nectar, de zéro, en suivant une approche Atomic Design — connecté directement au développement via Claude Code pour une cohérence design-code garantie.",
      },
    ],
  },

  {
    id: 'dev-collaboration',
    label: 'Collaboration avec les développeurs',
    keywords: ['collaboration dev', 'développeurs', 'handoff', 'specs', 'développement', 'front-end', 'intégration', 'agile', 'sprint', 'livraison'],
    projects: [
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai structuré le handoff design-développement via Storybook et Zeroheight — documentation des composants, specs exportables, tokens directement intégrables. Le Design System est la source unique de vérité partagée entre les 4 équipes design et dev.",
      },
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai collaboré étroitement avec l'équipe de développement Pepyte pour l'intégration des formulaires et de la fonctionnalité de matching — de la spec technique au suivi de livraison, avec des itérations design pilotées par les retours dev.",
      },
      {
        name: 'Nectar',
        url: '/case/nectar',
        logo: '/images/logo-nectar.svg',
        proof: "Sur Nectar, j'ai piloté moi-même le développement du MVP via Claude Code — ce qui m'a donné une compréhension concrète des contraintes techniques et une capacité à faire des choix de design réalistes dès la conception.",
      },
    ],
  },

  {
    id: 'ai-usage',
    label: 'Utilisation de l\'IA',
    keywords: ['intelligence artificielle', 'ia', 'ai', 'outil ia', 'figma make', 'claude', 'chatgpt', 'llm', 'génératif', 'ai-driven', 'ia générative', 'prompt', 'automatisation'],
    projects: [
      {
        name: 'Nectar',
        url: '/case/nectar',
        logo: '/images/logo-nectar.svg',
        proof: "J'ai piloté l'intégralité du process design de Nectar avec l'IA : recherche utilisateur assistée, idéation via Figma Make, maquettage, développement du MVP via Claude Code. Chaque étape — discovery, définition, conception, delivery — a été augmentée par l'IA. C'est un process documenté et réplicable.",
      },
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai utilisé l'IA pour synthétiser les entretiens utilisateurs, générer des prototypes HTML itératifs et accélérer les cycles de conception. La fonctionnalité de Probabilité de signature a été prototypée en 4 itérations HTML générées avec Claude — de l'insight à la solution en quelques heures.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai intégré l'IA dans le process de design du nouveau produit SaaS IA de Weborama — Founding Designer sur ce projet, j'ai utilisé Figma Make pour l'idéation et la génération de composants, et construit un Design System IA opérationnel.",
      },
    ],
  },

  {
    id: 'zero-to-one',
    label: 'Conception 0 → 1',
    keywords: ['from scratch', 'de zéro', '0 à 1', 'créer', 'nouveau produit', 'founding designer', 'lancement', 'startup', 'mvp', 'product design from scratch'],
    projects: [
      {
        name: 'Nectar',
        url: '/case/nectar',
        logo: '/images/logo-nectar.svg',
        proof: "J'ai conçu Nectar de zéro : recherche utilisateur, définition produit, architecture de l'information, Design System, 8 écrans livrés et développement du MVP. Projet 100 % piloté par IA, du premier entretien utilisateur au déploiement sur Vercel.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "En tant que Founding Designer IA sur le nouveau produit SaaS de Weborama, j'ai conçu l'expérience de zéro — vision produit, parcours utilisateur, Design System IA — en collaboration avec les équipes produit et développement.",
      },
    ],
  },

  {
    id: 'mobile-first',
    label: 'Design mobile-first',
    keywords: ['mobile', 'mobile-first', 'application mobile', 'app mobile', 'responsive', 'ios', 'android', 'smartphone', 'tablette'],
    projects: [
      {
        name: 'Nectar',
        url: '/case/nectar',
        logo: '/images/logo-nectar.svg',
        proof: "Nectar est une application mobile B2B conçue mobile-first. Les 8 écrans du MVP ont été pensés en priorité pour une utilisation terrain sur smartphone — navigation, saisie, consultation de données — avant toute adaptation desktop.",
      },
    ],
  },

  {
    id: 'prioritization',
    label: 'Priorisation produit',
    keywords: ['priorisation', 'priorité', 'roadmap', 'backlog', 'product owner', 'po', 'arbitrage produit', 'feature prioritization', 'valeur', 'impact', 'effort'],
    projects: [
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai conçu et piloté un processus de priorisation rigoureux : consolidation de 62 champs existants + benchmark + entretiens, synthèse en questionnaire soumis à 15 recruteurs, décision sur 10 champs prioritaires à intégrer. Chaque arbitrage est tracé et justifié par la donnée — aucune feature ne rentre sans raison.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "Sur le chantier Design System, j'ai priorisé les composants à créer en priorité en fonction de leur fréquence d'usage et de leur impact sur la cohérence des 4 applications — approche valeur/effort appliquée au design.",
      },
      {
        name: 'Probabilité de signature — Pepyte',
        url: '/case/pepyte-signature',
        logo: '/images/logo-pepyte.svg',
        locked: true,
        proof: "J'ai modélisé une logique de priorité automatique basée sur la position des candidats dans le pipeline. Chaque étape du kanban a une probabilité de signature associée. 5 arbitrages documentés — dont un contre-intuitif assumé : Priorité Haute = probabilité basse, car 'priorité' décrit une action à mener, pas un état.",
      },
    ],
  },

  {
    id: 'documentation',
    label: 'Documentation & specs',
    keywords: ['documentation', 'specs', 'spécifications', 'spec fonctionnelle', 'rédaction', 'storybook', 'zeroheight', 'notion', 'handoff', 'livrable', 'annotation'],
    projects: [
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai structuré l'ensemble de la documentation du Design System : guidelines sur Zeroheight, composants documentés dans Storybook avec props, états et exemples d'usage. La documentation est la source unique de vérité partagée entre designers et développeurs sur les 4 équipes.",
      },
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai documenté chaque étape de la recherche et des décisions design dans Notion — comptes rendus d'entretiens, synthèses de priorisation, règles de matching — pour garantir la traçabilité des choix et faciliter l'onboarding des équipes.",
      },
    ],
  },

  {
    id: 'product-vision',
    label: 'Vision & stratégie produit',
    keywords: ['vision produit', 'stratégie produit', 'product strategy', 'product thinking', 'sens produit', 'product sense', 'positionnement', 'proposition de valeur', 'founding designer'],
    projects: [
      {
        name: 'Nectar',
        url: '/case/nectar',
        logo: '/images/logo-nectar.svg',
        proof: "Sur Nectar, j'ai défini la vision produit de A à Z : identification du problème, proposition de valeur, périmètre du MVP, architecture de l'information et roadmap de livraison. Chaque décision de conception découle d'une logique produit — pas d'une intuition esthétique.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "En tant que Founding Designer IA sur le nouveau produit SaaS de Weborama, j'ai contribué à définir la vision et le positionnement du produit — en amont de la conception — en collaboration avec les équipes produit et métier.",
      },
    ],
  },

  {
    id: 'ux-writing',
    label: 'UX Writing',
    keywords: ['ux writing', 'microcopy', 'contenu', 'wording', 'rédaction interface', 'content design', 'copywriting', 'libellé', 'nomenclature', 'langage interface'],
    projects: [
      {
        name: 'Probabilité de signature — Pepyte',
        url: '/case/pepyte-signature',
        logo: '/images/logo-pepyte.svg',
        locked: true,
        proof: "Sur la feature Probabilité de signature, le choix du wording a été une décision de design à part entière. J'ai arbitré en faveur de '% de signer' — le verbe du quotidien des recruteurs — contre des formulations abstraites ('score de conversion', 'indice de confiance'). Un mot compris sans explication vaut mieux qu'une métrique précise mais opaque.",
      },
    ],
  },

  {
    id: 'stakeholder-communication',
    label: 'Communication & présentation',
    keywords: ['présentation', 'communication', 'parties prenantes', 'stakeholders', 'restitution', 'pitch', 'convaincre', 'alignement', 'comité', 'sponsor'],
    projects: [
      {
        name: 'Pepyte',
        url: '/case/pepyte',
        logo: '/images/logo-pepyte.svg',
        proof: "J'ai restitué les résultats de recherche aux équipes produit et fondateurs — synthèse des 10 entretiens, recommandations priorisées, règles de matching co-construites en atelier. Chaque présentation est structurée autour de la décision à prendre, pas du travail accompli.",
      },
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "J'ai présenté les choix d'architecture du Design System aux équipes produit, développement et management — en justifiant chaque décision par son impact sur la cohérence et la vélocité des équipes. Capacité à rendre des choix techniques compréhensibles pour des interlocuteurs non-designers.",
      },
    ],
  },

  {
    id: 'accessibility',
    label: 'Accessibilité',
    keywords: ['accessibilité', 'wcag', 'a11y', 'accessible', 'contraste', 'lecteur d\'écran', 'inclusive design', 'aria', 'handicap', 'rgaa'],
    projects: [
      {
        name: 'Weborama',
        url: '/case/weborama',
        logo: '/images/logo-weborama.svg',
        proof: "L'accessibilité a été intégrée comme critère de conception dans le Design System Weborama — ratios de contraste conformes aux exigences WCAG, états de focus visibles, sémantique HTML respectée dans la documentation Storybook. L'objectif : un Design System accessible par construction, pas en post-traitement.",
      },
    ],
  },

];

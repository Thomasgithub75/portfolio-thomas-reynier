# Lettre de motivation

Génère une lettre de motivation HTML personnalisée pour une offre d'emploi, en utilisant le design system de `proposals/book-thomas-reynier.html`.

## Profil de Thomas (source de vérité)

- **Nom :** Thomas Reynier
- **Rôle :** Product Designer IA
- **Spécialité :** UX Research, Design System, Product Design, IA générative
- **Expérience :** 4+ ans sur des produits SaaS B2B
- **Email :** reynier.design@gmail.com
- **Téléphone :** 06 26 53 21 29
- **LinkedIn :** linkedin.com/in/thomas-reynier-product-design
- **Portfolio :** thomas-reynier.fr
- **Localisation :** Paris

### Expériences clés
- **Weborama** (Adtech SaaS, Jan 2025 – présent, 13 mois) : Product Designer IA, piloté en autonomie le design sur 4 applications B2B. UX Research (benchmark, entretiens POs & BUs, tests). Founding Designer IA sur un nouveau produit SaaS B2B. Design System déployé sur 4 apps.
- **Pepyte** (HR Tech SaaS, Déc 2022 – Jan 2025, 2 ans) : Product Designer. Design System complet livré. UX Research (entretiens, ateliers, benchmark). Tests utilisateurs animés.
- **Nectar** (Projet personnel, Avr 2026) : Founding Product Designer IA. Process complet Discovery → Développement MVP, IA intégrée à chaque étape (Figma Make, Claude Code, Supabase).

### Compétences
UX Research · Entretiens utilisateurs · Tests utilisateurs · Animation d'ateliers · User Flows · Prototypage haute fidélité · Design System · Atomic Design · Figma · Figma Make · Zeroheight · Storybook · IA générative · Claude Code

---

## Instructions

À partir de l'offre d'emploi fournie dans le message, tu dois :

1. **Analyser l'offre en détail** — identifier chaque compétence, mission et qualité recherchée. Pour chacun de ces éléments, expliquer explicitement pourquoi le profil de Thomas y correspond en t'appuyant sur ses expériences, compétences et réalisations concrètes.

   Structurer l'argumentation de manière à ce que le recruteur puisse facilement faire le lien entre :
   - ce que l'entreprise recherche ;
   - ce que Thomas a réalisé dans son parcours ;
   - la valeur qu'il peut apporter au poste.

   Utiliser des exemples concrets plutôt que des affirmations générales. Lorsque c'est pertinent :
   - mobiliser l'**ethos** pour renforcer la crédibilité (expériences, résultats mesurables) ;
   - le **logos** pour démontrer rationnellement l'adéquation entre le profil et le poste ;
   - le **pathos** pour exprimer une motivation sincère et créer une connexion avec les valeurs ou les enjeux de l'entreprise.

   Ne pas paraphraser l'offre : répondre point par point aux attentes du recruteur en montrant précisément comment les expériences et compétences de Thomas y répondent. La lettre doit être fluide, naturelle, professionnelle et donner l'impression qu'elle a été rédigée spécifiquement pour cette candidature.

2. **Rédiger la lettre** en français, en respectant ces règles :
   - Ton professionnel, direct, sobre — pas de superlatifs
   - Pas de tirets "—" dans le corps du texte : utiliser des virgules ou des deux-points
   - Aucune affirmation générale : toujours appuyer sur une expérience concrète
   - Structure : accroche entreprise → expérience SaaS → point clé de l'offre (bloc KPI) → UX Research → IA → acculturation → conclusion
   - Longueur : 5 à 6 paragraphes, doit tenir sur un A4
   - **Expressions interdites** : ne jamais utiliser ces tournures ni leurs équivalents — elles sonnent défensives ou prétentieuses et affaiblissent la lettre :
     - "c'est exactement ce que j'ai fait" / "à l'échelle"
     - "c'est une démarche que j'ai déjà engagée, pas un objectif à découvrir"
     - "pas une curiosité périphérique"
     - "structurante dans ma pratique"
     - "de zéro" (ex : "livré un Design System de zéro")
     - "d'utilisabilité" seul (préférer "tests utilisateurs")
     - "synthétiques" pour qualifier des livrables
     - "JTBD" (acronyme opaque pour un recruteur)
     - Toute formule qui répond à l'offre de façon défensive ou superlative
   - Privilégier des formulations factuelles, sobres et directes : montrer par les faits, pas par l'affirmation

3. **Générer le fichier HTML** dans `proposals/lettre-motivation-[entreprise].html` en utilisant **exactement** le design system de `proposals/book-thomas-reynier.html` :
   - Police Outfit (Google Fonts)
   - Palette de couleurs : `--p500: #1956DB`, `--g900: #1A2540`, `--muted: #5B6A8A`, `--border: #E5E7EB`
   - Header identique : photo `../images/profile.png` + badge "À l'écoute d'opportunités"
   - Kicker bleu avec trait : "Lettre de motivation"
   - Bloc KPI (`background: var(--p50); border: 1px solid var(--p100)`) pour mettre en avant la réponse à l'exigence clé de l'offre
   - Page A4 (`width: 210mm`), tout doit tenir sur **une seule page**
   - Footer identique au book : Email / LinkedIn / Portfolio + mention © (toujours inclus)
   - La phrase de politesse finale ("Dans l'attente de votre retour…") est le dernier `<p>` du `.body`, pas dans `.signature`
   - La signature contient uniquement le nom "Thomas Reynier" (pas de sous-titre, **pas de border-top**)

4. **Ouvrir dans Chrome** pour que Thomas puisse vérifier et itérer.

5. **Attendre les retours** de Thomas avant de générer le PDF.

6. **Une fois validée**, générer le PDF avec :
```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless=new --no-pdf-header-footer --paper-width=8.27 --paper-height=11.69 --print-to-pdf="proposals/lettre-motivation-[entreprise].pdf" "file:///[chemin-absolu]/proposals/lettre-motivation-[entreprise].html"
```

---

## Format de réponse attendu

1. Confirmer ce que l'offre recherche (3 bullets max)
2. Générer le HTML et l'ouvrir dans Chrome
3. Indiquer en une phrase ce qui est prêt et inviter Thomas à itérer

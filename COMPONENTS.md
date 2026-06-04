# Composants — Index & Statut

> Référence de tous les composants du Design System.
> Mis à jour à chaque nouveau composant.
> Claude lit ce fichier avant de créer ou modifier un composant.

---

## Statuts

| Icône | Statut |
|-------|--------|
| ✅ | Fait — dispo dans `/design-system` |
| 🔄 | En cours |
| ⬜ | À faire |

---

## Composants UI de base

### ✅ Button
**Fichier :** `app/src/components/Button/Button.jsx`
**Variantes :** `primary` · `ghost`
**Tailles :** `md` (défaut) · `sm`
**Props :**
- `variant` — `"primary"` | `"ghost"`
- `size` — `"md"` | `"sm"`
- `children` — contenu du bouton
- `startIcon` — icône avant le texte
- `endIcon` — icône après le texte
- `disabled` — désactivé
- `onClick` — handler clic
- `href` — lien (transforme en `<a>`)

---

### ✅ Badge
**Fichier :** `app/src/components/Badge/Badge.jsx`
**Variantes :** `default` · `case` · `side` · `perso`
**Usage :** Label compact pill — type de projet, rôle
**Props :**
- `variant` — `"default"` | `"case"` | `"side"` | `"perso"`
- `children` — texte
- `sx` — override styles MUI

---

### ✅ Tag
**Fichier :** `app/src/components/Tag/Tag.jsx`
**Catégories :** `primary` · `secondary` · `design` · `dev` · `pm` · `langNatif` · `langPro`
**Usage :** Compétences, filtres, langues
**Props :**
- `category` — catégorie de couleur
- `clickable` — `true` / `false` — comportement bouton
- `isActive` — état actif (contrôlé)
- `isDimmed` — opacité réduite (filtre actif ailleurs)
- `onClick` — handler clic
- `icon` — icône optionnelle
- `sx` — override styles MUI

---

### ⬜ ProjectCard
**Fichier :** `app/src/components/ProjectCard/ProjectCard.jsx`
**Usage :** Grille des projets — home page
**Props prévues :**
- `title` — nom du projet
- `description` — texte court
- `thumbnail` — image de couverture
- `logo` — logo du projet
- `role` — ex : "Lead Product Designer"
- `duration` — ex : "6 mois"
- `tags` — tableau de strings
- `href` — lien vers l'étude de cas
- `badge` — variant Badge (case / side / perso)

---

### ✅ TestimonialCard
**Fichier :** `app/src/components/TestimonialCard/TestimonialCard.jsx`
**Layout associé :** `app/src/layouts/TestimonialsSection.jsx`
**Variantes :** `featured` (grande carte) · compact (défaut)
**Props :**
- `quote` — texte complet de la recommandation
- `keyQuote` — phrase clé mise en avant (bold, grande)
- `name` — prénom + nom
- `role` — poste · entreprise
- `avatar` — chemin image (null → initiales auto)
- `stars` — 1 à 5 (défaut 5)
- `project` — label badge projet (ex : "Pepyte")
- `linkedinUrl` — URL profil LinkedIn
- `featured` — `true` = grande carte colonne gauche, `false` = carte compacte

---

### ⬜ ContactLink
**Fichier :** `app/src/components/ContactLink/ContactLink.jsx`
**Usage :** Section contact — lignes cliquables (email, LinkedIn, CV)
**Props prévues :**
- `icon` — composant icône MUI
- `label` — texte principal
- `sublabel` — texte secondaire (ex : adresse email)
- `href` — URL ou mailto

---

### ⬜ StatBlock
**Fichier :** `app/src/components/StatBlock/StatBlock.jsx`
**Usage :** Hero — chiffres clés
**Props prévues :**
- `value` — ex : "8 ans"
- `label` — ex : "d'expérience"

---

### ⬜ HeroBadge
**Fichier :** `app/src/components/HeroBadge/HeroBadge.jsx`
**Usage :** Hero — pastille de disponibilité
**Props prévues :**
- `label` — ex : "Disponible"
- `color` — `"green"` | `"amber"` | `"red"`

---

### ⬜ SectionLabel
**Fichier :** `app/src/components/SectionLabel/SectionLabel.jsx`
**Usage :** Kicker uppercase bleu au-dessus des titres de section
**Props prévues :**
- `children` — texte

---

## Composants de navigation

### ⬜ Navbar
**Fichier :** `app/src/components/Navbar/Navbar.jsx`
**Usage :** Navigation fixe en haut de page
**Comportements :**
- Fixed top, backdrop blur
- Liens : À propos · Projets · Contact
- CTA : bouton "Me contacter"
- Burger menu sur mobile

---

## Composants expertise

### ⬜ ExpPanel
**Fichier :** `app/src/components/ExpPanel/ExpPanel.jsx`
**Usage :** Panneau sticky qui s'ouvre au clic sur une compétence
**Comportements :**
- Affiche les projets liés à la compétence sélectionnée
- Animation d'ouverture (fade + translateY)
- Bouton fermer
- Liste de projets cliquables avec logo, nom, type

---

## Layouts & Sections

### ⬜ HeroSection
**Fichier :** `app/src/layouts/HeroSection.jsx`
**Dépendances :** `StatBlock`, `HeroBadge`, `Button`

### ⬜ ExpertiseSection
**Fichier :** `app/src/layouts/ExpertiseSection.jsx`
**Dépendances :** `Tag`, `ExpPanel`

### ⬜ ProjectsSection
**Fichier :** `app/src/layouts/ProjectsSection.jsx`
**Dépendances :** `ProjectCard`

### ⬜ TestimonialsSection
**Fichier :** `app/src/layouts/TestimonialsSection.jsx`
**Dépendances :** `TestimonialCard`

### ⬜ ContactSection
**Fichier :** `app/src/layouts/ContactSection.jsx`
**Dépendances :** `ContactLink`, `Button`

### ⬜ Footer
**Fichier :** `app/src/layouts/Footer.jsx`

---

## Pages

### ⬜ Home
**Fichier :** `app/src/pages/Home.jsx`
**Sections :** Hero · Expertise · Projets · Témoignages · Contact · Footer

### ⬜ CaseStudyNectar
**Fichier :** `app/src/pages/CaseStudyNectar.jsx`

### ⬜ CaseStudyPepyte
**Fichier :** `app/src/pages/CaseStudyPepyte.jsx`

### ⬜ CaseStudyWeborama
**Fichier :** `app/src/pages/CaseStudyWeborama.jsx`

### ✅ DesignSystem
**Fichier :** `app/src/pages/DesignSystem.jsx`
**Route :** `/design-system`

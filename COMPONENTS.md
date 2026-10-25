# Composants — Index

> Référence des composants du site. Mis à jour à chaque nouveau composant.
> Claude lit ce fichier avant de créer ou modifier un composant.
> Tous sont documentés avec démo sur la page `/design-system`.

---

## Design system : Astryx

Le site est construit avec **Astryx** (`@astryxdesign/core`), thème « portfolio » aux couleurs du site : `app/src/theme/astryxTheme.js` (tokens en paires `[clair, sombre]`, tailles des titres, dégradé de marque sur les boutons primary).

Documentation d'un composant : `npx astryx component <Nom>` (dans `app/`).

| Composant Astryx | Usage sur le site |
|---|---|
| Button, IconButton | Actions, liens de contact, footer |
| Badge | Rôles, tags projet, catégories d'outils |
| ToggleButton, ToggleButtonGroup | Filtres de compétences (accueil), ton de la lettre |
| Switch | Options on/off (lettre) |
| TextInput, TextArea | Matching IA, lettre, écrans d'accès |
| Card, Section, Grid | Cartes projet, témoignages, sections teintées |
| Heading, Text, Link | Toute la typographie de l'interface |
| Avatar, Blockquote, Divider, Tooltip, CodeBlock | Témoignages, séparateurs, page design system |
| VStack, HStack | Mise en page interne des composants |

## Composants maison

| Composant | Fichier | Rôle |
|---|---|---|
| AstryxPage | `app/src/layouts/AstryxPage.jsx` | Gabarit de toutes les pages : Navbar + thème Astryx (suit le mode clair/sombre) + Footer |
| Navbar | `app/src/layouts/Navbar.jsx` | Barre en verre au défilement, menu mobile, bouton clair/sombre |
| Footer | `app/src/layouts/Footer.jsx` | Copyright + email, LinkedIn, CV (Astryx) |
| CaseLayout, CaseHeader, CaseCta, OtherProjects | `app/src/layouts/CaseLayout.jsx` | Gabarit des études de cas ; `Step`, `Quote`, `MissionBanner`, `IllustrationItem` = styles éditoriaux (classes `case-*` de `global.css`) |
| ProjectCard | `app/src/components/ProjectCard/` | Carte d'étude de cas cliquable avec animation au survol |
| AccessGate | `app/src/components/AccessGate/` | Écran de code des pages privées |
| StreamingText | `app/src/components/StreamingText/` | Sous-titre du hero tapé comme une réponse de LLM |
| Intro | `app/src/components/Intro/` | Écran d'arrivée « prompt → réponse » |
| Inspector | `app/src/components/Inspector/` | Mode inspection (composants + tokens) — non monté pour l'instant |

## Icônes

Uniquement `@mui/icons-material`, import par icône (`import LinkedIn from '@mui/icons-material/LinkedIn'`).

<!-- Fichier copié automatiquement depuis le dépôt « thomas » (travail/). Ne pas modifier ici : modifier la source. -->

# 🧩 Étude de cas — Design System Etam Group (Etam · Undiz · Maison 123)

---

## 🏷️ Titre et accroche (haut de page portfolio)

**Titre :** Un design system pour 3 marques, pensé pour être utilisé par les humains *et* par l'IA

**Accroche :**
Design System Manager pour le groupe Etam, j'ai conçu le Design System « Commun » qui accompagne le replateforming d'Etam, Undiz et Maison 123 (sites et apps), puis transformé le design system en socle exploitable par l'IA : skills Claude partagés, plateforme design centralisée et design system dédié aux équipes qui vibecodent leurs propres outils.

| Rôle | Périmètre | Durée | Équipe |
|---|---|---|---|
| Design System Manager (freelance) | 3 marques · web (desktop, mobile) + app | juillet 2026 → aujourd'hui | Marques, designers, product managers, devs |

**Outils :** Figma (variables, plugin sur mesure, FigJam) · Claude Code (skills, plugins, MCP) · Jira · Bitbucket

---

## 1. Contexte

- Groupe retail mode multimarque : **Etam, Undiz, Maison 123**, chacune avec son identité, présentes sur le web, en app et en magasins.
- **Replateforming** des sites et des apps des 3 marques → besoin d'une base de composants commune, déclinable par marque.
- Des équipes design et produit équipées en IA, mais sans méthode ni outils partagés pour en tirer parti.
- Des équipes transverses (hors design) qui commencent à construire leurs propres outils en vibecoding, sans cadre visuel.

## 2. Mon rôle

Responsable du design system de bout en bout : conception des composants, gouvernance, documentation, et adoption de l'IA dans le process design.
Interlocuteurs : les marques, les designers, les product managers et les développeurs.

**Ce que j'apportais :** 4 ans de product design en SaaS B2B, dont la création de design systems chez Weborama (un design system pour 4 outils SaaS, déjà connecté à l'IA) et chez Pepyte, en Atomic Design.

## 3. Ce que j'ai fait — 4 chantiers

### Chantier 1 — Le Design System « Commun » : replateforming des 3 marques
- Création de l'**ensemble des composants** des nouveaux sites (desktop, mobile) et apps d'Etam, Undiz et Maison 123.
- **Atomic Design et tokens multi-marques** (couleurs, typographies, espacements, rayons) : un seul socle, trois identités.
- Co-construction avec les marques, les designers et les product managers pour concilier socle commun et identité de chaque marque.
- Travail étroit avec les **développeurs** pour l'intégration des composants du design system.
- Réalisation des **DAT** (recette design) : contrôle de conformité entre les maquettes des designers et le rendu en pré-production.
- **Gouvernance** du design system : validation des maquettes, contribution, journal du DS publié chaque vendredi.
- Conception de **nouvelles features** et amélioration des parcours existants, à partir des résultats d'A/B tests. Exemple : l'**amélioration de la sélection des tailles**.

### Chantier 2 — Un design system lisible par l'IA
- Refonte des **composants, variables (tokens) et documentation**.
- Écriture de **règles d'utilisation** explicites (quand utiliser quel composant, quelles combinaisons sont interdites) pour qu'une IA puisse les appliquer correctement.
- Documentation et règles **synchronisées depuis Figma via un plugin sur mesure** : la doc lue par l'IA est toujours à jour avec les maquettes.
- 👉 Message clé : *un design system documenté pour l'IA est aussi mieux documenté pour les humains.*

### Chantier 3 — Skills Claude et automatisations pour l'équipe design
- **Ateliers de recueil des besoins** avec les designers : quelles tâches sont répétitives, longues ou sources d'erreurs ?
- Création de **plus de 20 skills Claude** à partir de ces besoins, qui couvrent tout le cycle de conception :

| Étape | Skills |
|---|---|
| 🔍 **Découvrir** | Benchmark automatisé, **branché sur Mobbin** (bibliothèque d'écrans d'apps réelles), et compte rendu pour l'idéation · aide à la décision à partir des études UX (A/B tests, interviews, …) |
| 💡 **Idéer** | Idéation qui s'appuie sur **l'ensemble des études UX déjà menées** et sur **les règles du design system** : chaque idée part de ce qu'on sait déjà des utilisateurs et reste réalisable avec les composants existants |
| ✏️ **Concevoir** | Création de maquettes à partir d'un benchmark, conformes au design system · prototypes fidèles aux maquettes et au DS, générés automatiquement |
| ✅ **Contrôler** | Contrôle des maquettes (conformité au design system) · DAT automatisée (maquette vs pré-prod) |
| 🧩 **Maintenir le DS** | Gestion du design system · suivi du design system (adoption, évolutions) |
| 📋 **Piloter** | Gestion des tickets Jira · gestion des tâches ad hoc du run dans Jira |

- Partage via un **repository Git (Bitbucket)** accessible à toute l'équipe design.
- **Accompagnement** des équipes dans la prise en main des skills, en particulier des profils les moins à l'aise avec l'IA.
- **Automatisation pour les marques** : les marques créent elles-mêmes leurs maquettes via des skills qui s'appuient sur les composants du design system.

### Chantier 4 — Une plateforme design et un design system IA pour le transverse
- Création de **Nymphea DS**, une plateforme design IA qui centralise tout ce dont les métiers ont besoin : design system, études utilisateur, A/B tests, règles design et skills.
- Création d'un **design system IA** pour les équipes transverses qui construisent leurs outils en vibecodant : leurs outils internes restent cohérents avec la marque sans passer par l'équipe design. Exemple : l'**équipe Data**.

## 4. Conduite du changement

**Obtenir le feu vert.** J'ai présenté le projet (design system lisible par l'IA, skills, plateforme) au **responsable DSI** et au **lead designer**. Leur validation m'a donné la légitimité pour le déployer auprès des équipes.

**Faire adopter.**
- **Présenter chaque avancée** : chaque nouveau skill, chaque évolution du design system ou de la plateforme est présenté aux équipes, pour que personne ne découvre un changement après coup.
- **N'oublier personne** : j'ai accompagné individuellement les profils les moins à l'aise avec l'IA dans cette transition, pour que l'outil ne creuse pas d'écart dans l'équipe.
- Résultat : les skills et la plateforme sont aujourd'hui utilisés par **l'ensemble de l'équipe design et de l'équipe UX (CRO)** : 4 designers et 2 CRO (UX recherche).

**Une gouvernance simple et lisible.**
- **Validation en deux temps** : les designers passent d'abord leur maquette dans le skill de pré-validation, puis c'est moi qui valide. Les erreurs simples sont corrigées avant d'arriver jusqu'à moi.
- **Le journal du DS, chaque vendredi** : je publie toutes les évolutions et tous les changements de la semaine au même endroit, à date fixe.
- **Deux canaux dédiés** : un canal **Design System** et un canal **IA**, pour poser ses questions, partager les nouveautés et faire remonter les besoins.

👉 Message clé : *la technique ne suffit pas ; un sponsor côté DSI et design, des avancées présentées au fil de l'eau, un accompagnement de chacun et des canaux ouverts font vivre le design system.*

## 5. Résultats

| Indicateur | Avant | Après |
|---|---|---|
| Marques / plateformes couvertes | — | 3 marques · web + app |
| Temps d'une DAT (contrôle maquette vs pré-prod) | ~2 h | **instantané** avec le skill |
| Temps d'un benchmark (avec Mobbin branché au skill) | ~½ journée | **3 min** |
| Utilisateurs des skills | 0 | **6** : 4 designers + 2 CRO (UX recherche) |
| Nombre de skills créés | 0 | **20+** |
| Équipes transverses utilisant le design system IA | 0 | dont l'équipe Data |
| Features / parcours livrés | — | dont la sélection des tailles (issue des A/B tests) |

## 6. Ce que j'en retiens

1. Documenter pour l'IA force à expliciter des règles qui n'existaient que dans la tête des designers.
2. Une idéation IA n'a de valeur que si elle part de la mémoire de l'entreprise : les études UX déjà menées et les règles du design system. Sinon, elle produit des idées génériques.
3. Les meilleures automatisations viennent des ateliers avec les équipes, pas de l'outil.

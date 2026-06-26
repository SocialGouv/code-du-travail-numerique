# @socialgouv/cdtn-stats

Extraction **statique** (sans exécuter l'app) des events Matomo émis par le frontend CDTN,
vers un fichier versionné `events/events.extracted.json`, avec un **drift-check** CI qui échoue
si le code et le fichier divergent.

Objectif : disposer d'un catalogue fiable et révisable de tous les events de tracking
**écrits explicitement** dans le code, et détecter en PR tout ajout / suppression / modification
d'event qui n'aurait pas régénéré le fichier.

## Pipeline

```
project        chargement des fichiers source (frontend/src/modules/**) via ts-morph
enum-index     index des enums (frontend + enums publicodes de modeles-social)
call-index     index des appels/définitions de fonctions (résolution cross-fichiers)
value-resolver résout category/action/name en valeurs concrètes (purement syntaxique)
scanner        détecte chaque callsite de tracking
aggregate      tri déterministe + comptages → events.extracted.json
```

Le résultat est **déterministe** (events triés, aucun timestamp) : le drift-check est une
simple égalité de chaîne.

## Plan de tracking pour le métier (markdown)

Le JSON est pensé pour l'outillage / l'IA. Pour le **métier**, un plan de tracking **rédigé**
(prose + tableaux commentés) vit dans `events/TRACKING_PLAN.md` :

```
events.extracted.json  +  code frontend   →   skill /tracking-plan   →   TRACKING_PLAN.md
```

- Ce document n'est **pas** produit par un algo : il est **rédigé par le skill Claude
  `/tracking-plan`** (`.claude/skills/tracking-plan`). Le skill lit le catalogue
  `events.extracted.json` **et** les modules frontend concernés (simulateurs et leurs étapes,
  parcours convention collective p1/p2/p3, recherche entreprise) pour produire une explication
  métier avec les vrais titres/étapes — ce qu'un rendu mécanique ne peut pas faire.
- Comme il est rédigé (non déterministe), il **n'est pas drift-checké** : on le régénère via le
  skill quand le tracking évolue. Seul le JSON (`events:check`) est vérifié en CI.

Ce fichier est **synchronisé automatiquement vers le wiki GitHub** (page
`Plan de tracking Matomo`) à chaque merge sur `dev` par le workflow
`.github/workflows/stats-events-wiki.yml`. La sync **ne remplace pas** la page : elle met à jour
uniquement le bloc délimité par les marqueurs
`<!-- TRACKING_PLAN:START -->` / `<!-- TRACKING_PLAN:END -->` (helper
`scripts/wiki-upsert.mjs`), préservant le titre et tout contenu manuel de la page. Le métier
consulte le wiki, jamais le repo.

> Le push wiki utilise `GITHUB_TOKEN`. Si la policy de l'org le bloque, ajouter un secret
> `WIKI_TOKEN` (PAT avec accès au dépôt) : le workflow l'utilisera en priorité.
>
> Prérequis : le **wiki doit être activé** dans les réglages du dépôt. Le workflow tente de
> créer la page au premier push ; si la policy de l'org refuse l'init par push, créer **une
> page** manuellement une fois (via l'UI GitHub) pour amorcer le dépôt wiki.

## Ce qui est capturé

- **`sendEvent({ category, action, name? })`** (de `@socialgouv/matomo-next`).
- **Push Matomo natifs** `push([cmd, ...])` / `_paq.push([...])` dont la commande produit un
  event : `trackEvent`, `trackSiteSearch`, `trackPageView`, `trackGoal`, `trackLink`,
  `trackContentImpression`, `trackContentInteraction`.
- **Commandes de configuration** Matomo (push non-event : `setReferrerUrl`, `optUserOut`,
  `HeatmapSessionRecording::*`…) → listées à part dans `matomo_config_calls`.
- **Relais first-party** `fetch(endpoint, { body: JSON.stringify({ category, action, … }) })` :
  events qui contournent les adblockers en POSTant vers une API interne qui relaie vers Matomo
  côté serveur (ex. `notation_contribution`/`validation_note` via `/api/contribution-rating`),
  au lieu de `sendEvent`. Détectés quand le corps JSON porte **à la fois** `category` et
  `action` ; le champ `tracking_method` vaut alors `relay:<endpoint>`.

Quand `category` ou `action` est un **enum** (ou un paramètre typé enum), une ligne est produite
**par valeur possible** (champ `resolution: "literal" | "enum-param"`). Les constantes string de
module (`const RATING_MATOMO_CATEGORY = "…"`) sont résolues comme des littéraux (cf. `const-index.ts`).

### Périmètre de scan

Seul `packages/code-du-travail-frontend/src/modules/**/*.{ts,tsx}` est scanné (hors tests /
stories). Aujourd'hui **tous** les `sendEvent` et push Matomo de l'app y vivent ; il n'y a
aucune émission dans `app/` ni `src/api/`. Si un jour du tracking est ajouté hors de
`src/modules`, il faudra élargir le glob dans `src/project.ts`.

## Ce qui n'est volontairement PAS capturé

Le catalogue se limite aux events **écrits explicitement** dans le code. Sont exclus :

- **Auto-tracking framework — `trackAppRouter` (matomo-next)**, dans
  `src/modules/config/MatomoAnalytics.tsx`. Il émet en interne, hors `sendEvent` :
  page-views au changement de route SPA, `trackSiteSearch` via `searchKeyword`, l'A/B testing,
  et les outlinks / téléchargements (link tracking activé par défaut). Ces hits sont réels mais
  pilotés par la lib, pas par un appel d'event dans le code → hors périmètre.
- **`gtag` (Google SEA / conversion)**, dans `src/modules/utils/consent.ts`
  (`window.gtag("event", "conversion", …)`) : ce n'est **pas** du Matomo.
- **Le champ numérique `value`** de `sendEvent({ …, value })` : supporté par la lib mais
  **non utilisé** dans l'app aujourd'hui ; le scanner n'extrait que `category` / `action` /
  `name`.
- **Les valeurs dynamiques** : quand `category` / `action` / `name` sont calculés au runtime
  (titre d'outil passé en prop, query de recherche, `JSON.stringify(...)`, texte saisi par
  l'utilisateur, URL…), la valeur est représentée par un placeholder `<...>`
  (`resolution: "dynamic"`) et **non énumérée**. C'est volontaire : ces valeurs n'identifient
  pas l'event et sont en nombre non borné. Les cas à ensemble **fini** (ex. l'enum de parcours
  dans `pushAgreementEvents.ts`) ont, eux, été rendus statiques côté code pour apparaître
  résolus.

## Régénérer / vérifier

```bash
# Régénère events/events.extracted.json à partir du code
pnpm -F @socialgouv/cdtn-stats events:extract

# Drift-check : échoue (exit 1) si le JSON est désynchronisé du code
pnpm -F @socialgouv/cdtn-stats events:check   # JSON vs code

# Tests unitaires du scanner
pnpm -F @socialgouv/cdtn-stats test
```

Le plan métier `events/TRACKING_PLAN.md` se **régénère via le skill Claude** `/tracking-plan`
(il n'a pas de commande npm : c'est un document rédigé, pas un artefact déterministe).

- **CI** : le workflow `.github/workflows/stats-events.yml` lance le drift-check du JSON sur
  **chaque** PR (sans filtre de chemins : un event peut être ajouté depuis n'importe quel
  module). `.github/workflows/stats-events-wiki.yml` pousse le markdown vers le wiki sur `dev`
  (mise à jour du bloc entre marqueurs, cf. plus haut).
- **Local** : un hook lint-staged régénère et re-stage automatiquement
  `events/events.extracted.json` dès qu'un fichier `src/modules/**` change (cf.
  `code-du-travail-frontend/lint-staged.config.js`). Après une évolution du tracking, pense à
  régénérer le plan métier via `/tracking-plan`.

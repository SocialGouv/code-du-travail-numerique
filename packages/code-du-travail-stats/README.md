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

Le JSON est pensé pour l'outillage / l'IA. Pour le **métier**, un plan de tracking lisible est
généré **à partir du JSON** dans `events/TRACKING_PLAN.md` :

```
events.extracted.json   →   generate-doc   →   TRACKING_PLAN.md
```

- Events regroupés **par module/feature** (déduit du chemin), puis par catégorie Matomo.
- Colonnes orientées métier : `Action`, `Name`, `Type`, et un lien **Source** vers la ligne
  de code (URL GitHub absolue sur la branche `dev`).
- Markdown **déterministe** (aucun timestamp), donc drift-checké comme le JSON.

Ce fichier est aussi **synchronisé automatiquement vers le wiki GitHub** (page
`Plan de tracking Matomo`) à chaque merge sur `dev` par le workflow
`.github/workflows/stats-events-wiki.yml`. Le métier consulte le wiki, jamais le repo.

> Le push wiki utilise `GITHUB_TOKEN`. Si la policy de l'org le bloque, ajouter un secret
> `WIKI_TOKEN` (PAT avec accès au dépôt) : le workflow l'utilisera en priorité.

## Ce qui est capturé

- **`sendEvent({ category, action, name? })`** (de `@socialgouv/matomo-next`).
- **Push Matomo natifs** `push([cmd, ...])` / `_paq.push([...])` dont la commande produit un
  event : `trackEvent`, `trackSiteSearch`, `trackPageView`, `trackGoal`, `trackLink`,
  `trackContentImpression`, `trackContentInteraction`.
- **Commandes de configuration** Matomo (push non-event : `setReferrerUrl`, `optUserOut`,
  `HeatmapSessionRecording::*`…) → listées à part dans `matomo_config_calls`.

Quand `category` ou `action` est un **enum** (ou un paramètre typé enum), une ligne est produite
**par valeur possible** (champ `resolution: "literal" | "enum-param"`).

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

# Régénère events/TRACKING_PLAN.md à partir du JSON
pnpm -F @socialgouv/cdtn-stats doc:generate

# Drift-checks : échouent (exit 1) si un fichier est désynchronisé
pnpm -F @socialgouv/cdtn-stats events:check   # JSON vs code
pnpm -F @socialgouv/cdtn-stats doc:check      # markdown vs JSON

# Tests unitaires du scanner
pnpm -F @socialgouv/cdtn-stats test
```

`events:check` + `doc:check` couvrent ensemble toute la chaîne `code → JSON → markdown`.

- **CI** : le workflow `.github/workflows/stats-events.yml` lance les deux drift-checks sur
  **chaque** PR (sans filtre de chemins : un event peut être ajouté depuis n'importe quel
  module). `.github/workflows/stats-events-wiki.yml` pousse le markdown vers le wiki sur `dev`.
- **Local** : un hook lint-staged régénère et re-stage automatiquement
  `events/events.extracted.json` **puis** `events/TRACKING_PLAN.md` dès qu'un fichier
  `src/modules/**` change (cf. `code-du-travail-frontend/lint-staged.config.js`).

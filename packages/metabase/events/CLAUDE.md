# events/ — consignes Claude

**Pipeline complet** du glossaire d'events Matomo du CDTN : schema, metadata metier, donnees extraites, et les 3 scripts qui font tourner le tout.

## Contenu du dossier

| Fichier | Role | Maintenance |
| --- | --- | --- |
| `events.schema.ts` | Types TS partages (`ExtractedEvent`, `EventMetadata`, `MatomoConfigCall`, `EventsExtraction`). | Manuel, rare. |
| `events.metadata.yaml` | Description **metier** de chaque event (label, trigger, KPI, dashboards, cards). | **Manuel**. A maintenir a chaque ajout/renommage d'event. |
| `events.extracted.json` | Ground truth **technique** extraite du code (category, action, fichier:ligne, tracking_method). | **Auto-genere** par `extract-events.ts`. Tracke en git pour voir les diffs en PR. |
| `extract-events.ts` | Scanne les fichiers du frontend via ts-morph, ecrit `events.extracted.json`. | Manuel, rare. |
| `generate-events-doc.ts` | Joint extracted + metadata → `../docs/events.md`. | Manuel, rare. |
| `check-events-drift.ts` | Rejoue le pipeline en memoire et compare. Exit 1 si drift. Utilise en precommit + CI. | Manuel, rare. |

## Pipeline

```
packages/code-du-travail-frontend/src/modules/**/*.{ts,tsx}  (sauf __tests__/)
  |  extract-events.ts (AST ts-morph)
  |  Detecte :
  |    - sendEvent({ category, action, name? })
  |    - push(["trackEvent"|"trackSiteSearch"|"trackPageView"|"trackGoal"|"trackLink"|"trackContentImpression"|"trackContentInteraction", ...])
  |    - _paq.push([...]) / paq.push([...])
  |  Range les autres push([cmd, ...]) (setReferrerUrl, AbTesting::create, HeatmapSessionRecording::*, opt-out, etc.) dans `matomo_config_calls` (non-events).
  v
events/events.extracted.json
  +
events/events.metadata.yaml
  |  generate-events-doc.ts (join par "<category>:<action>" avec fallback "<category>:*")
  v
packages/metabase/docs/events.md
```

## Commandes (definies dans `../package.json`)

```bash
pnpm -F @cdt/metabase events:extract   # extract-events.ts seul
pnpm -F @cdt/metabase events:docs      # extract + generate
pnpm -F @cdt/metabase events:check     # drift check (precommit + CI)
```

## Workflow "j'ajoute un nouvel event"

1. Dev ajoute un `sendEvent({ category, action, name? })` dans un fichier du frontend (n'importe ou dans `src/modules/**`, pas seulement dans un `tracking.ts`).
2. `pnpm -F @cdt/metabase events:docs`.
3. Le script extrait l'event et l'ajoute a `events.extracted.json`. Comme il n'a pas encore de description metier, il apparait dans la section **"Orphelins"** de `docs/events.md`.
4. Dev ajoute une entree dans `events.metadata.yaml` avec la cle `"<category>:<action>"` (ou un wildcard `"<category>:*"` si tous les events d'une categorie partagent la meme description).
5. Dev relance `pnpm events:docs` → l'event passe de "Orphelins" a sa section `feature_group`.
6. Dev commit `events.metadata.yaml`, `events.extracted.json`, `docs/events.md` dans la meme PR. Le precommit (husky → `events:check`) bloque sinon.

## Workflow "je renomme un event"

1. Dev modifie le `sendEvent` et / ou son enum associe.
2. `pnpm events:docs` → l'ancienne cle apparait dans "Metadata orpheline", la nouvelle soit normalement (si metadata.yaml a suivi) soit dans "Orphelins".
3. Dev corrige `events.metadata.yaml` (renomme la cle) et relance.

## Workflow "je supprime un event"

1. Dev retire le `sendEvent` du code.
2. `pnpm events:docs` → l'ancienne cle apparait dans "Metadata orpheline".
3. Dev supprime l'entree de `events.metadata.yaml` (ou la garde avec `deprecated: true` + `notes:` pour historique).
4. Dev relance et commit.

## Regles pour `events.metadata.yaml`

- **Cle** : `"<category>:<action>"` entre guillemets (certains actions contiennent des caracteres speciaux comme `é`).
- **Champs obligatoires** : `label_fr`, `trigger`, `feature_group`.
- **Champs optionnels** : `kpi`, `dashboards`, `cards`, `mv_source`, `since`, `deprecated`, `notes`.
- **Wildcard** `"<category>:*"` : utilise pour couvrir en bulk tous les events d'une categorie (ex: `"search:*"` → une seule entree couvre tous les actions de `search`). Le wildcard est un **fallback** : une cle exacte prend toujours le dessus.
- **`feature_group`** : groupe de regroupement dans `docs/events.md`. Valeurs recommandees : `contributions`, `cc-search`, `simulateurs`, `feedback`, `recherche`, `home`, `share`, `contact`, `documents`, `header`, `navigation`, `enterprise`. Ne pas multiplier les groupes (vise la lisibilite de la TOC).

## Regles pour les scripts (`extract-events.ts`, `generate-events-doc.ts`, `check-events-drift.ts`)

- **Deterministe** : la sortie doit etre stable entre runs (tri par `(category, action, file, line)`). Sinon drift check echoue en boucle.
- **Pas de dependance cyclique** : les scripts n'importent que depuis `events.schema.ts` et les deps listees dans `../package.json` (`ts-morph`, `tsx`, `yaml`, `@types/node`).
- **Ne pas importer depuis `../../code-du-travail-frontend`** : on **parse** les fichiers source avec ts-morph, on ne les **execute** pas.
- **Fail-safe** : si un `sendEvent(...)` a un `category` ou `action` dynamique non-resolu, l'event est liste dans `unresolved` de `events.extracted.json` (pas en silence).

### Resolution des enums

`extract-events.ts` construit une map globale `EnumName.Member -> "valeur"` en scannant tous les fichiers charges. Pour resoudre une reference comme `TrackingContributionCategory.TOOL`, le script cherche les 2 derniers segments (ce qui gere aussi les acces namespaces comme `analytics.MatomoBaseEvent.OUTIL`). Si un nouveau pattern apparait (enum local anonyme, object literal), ajouter un cas dans `resolveExpression`.

### Debug rapide

```bash
pnpm -F @cdt/metabase events:extract
cat packages/metabase/events/events.extracted.json | jq '.events | length'
cat packages/metabase/events/events.extracted.json | jq '.unresolved'
cat packages/metabase/events/events.extracted.json | jq '.matomo_config_calls'
```

## Exemple de metadata

```yaml
"contribution:click_afficher_les_informations_CC":
  label_fr: "Affichage de la reponse personnalisee sur une page contribution"
  trigger: "Clic sur le bouton 'afficher les informations personnalisees' apres selection d'une CC TRAITEE"
  kpi: "Personnalisation reussie (KPI 1 dashboard 36)"
  dashboards: [36]
  cards: [435, 438, 443]
  mv_source: "mv_kpi_personnalisation"
  feature_group: "contributions"
```

## Ne pas faire

- Editer `events.extracted.json` a la main : il est reecrit a chaque run.
- Ajouter une entree `events.metadata.yaml` pour un event qui n'existe pas encore dans le code : elle apparaitra en "Metadata orpheline" et polluera la CI.
- Ajouter dans les scripts des regex de "nom d'event connu" : le but est que le script soit l'autorite. Si un event n'apparait pas, c'est que le code ne le fire pas → corriger le code, pas le script.
- Ajouter des dependances runtime (le package `@cdt/metabase` reste dev-only).

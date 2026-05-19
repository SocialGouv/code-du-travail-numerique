# @cdt/metabase — consignes Claude

**Hub** du pipeline d'events Matomo du CDTN :

- glossaire auto-genere des events Matomo (`docs/events.md` + pipeline dans `events/`)
- docs du pipeline (`docs/CLAUDE.md`)
- automatisation precommit + CI (drift check, wiki sync)

## Regles absolues

- **Ne jamais editer `docs/events.md` a la main.** Il est regenere par `events/generate-events-doc.ts`. Pour modifier la description d'un event → editer `events/events.metadata.yaml`.
- **Ne jamais editer `events/events.extracted.json` a la main.** Il est reecrit par `events/extract-events.ts` a chaque run.

## Map du package

| Chemin                          | Role                                               | Maintenance                                  |
| ------------------------------- | -------------------------------------------------- | -------------------------------------------- |
| `CLAUDE.md` (ce fichier)        | regles IA, workflow events, automatisation         | manuel                                       |
| `README.md`                     | installation, pipeline, automatisation             | manuel                                       |
| `docs/events.md`                | **glossaire exhaustif des events Matomo**          | **AUTO-GENERE** — ne jamais editer a la main |
| `events/events.metadata.yaml`   | description metier des events                      | manuel (source pour `docs/events.md`)        |
| `events/events.extracted.json`  | ground truth extraite du code frontend             | auto-genere par `pnpm events:extract`        |
| `events/events.schema.ts`       | types TS partages du pipeline events               | manuel, rare                                 |
| `events/extract-events.ts`      | AST scan des tracking.ts → `events.extracted.json` | manuel, rare                                 |
| `events/generate-events-doc.ts` | joint extracted + metadata → `docs/events.md`      | manuel, rare                                 |
| `events/check-events-drift.ts`  | drift check (precommit + CI)                       | manuel, rare                                 |

## Evenements Matomo

> **Source de verite : `docs/events.md`** (auto-genere). Ne JAMAIS editer ce fichier a la main : il est reecrit par `pnpm -F @cdt/metabase events:docs`.

### Pipeline

```text
packages/code-du-travail-frontend/src/modules/**/*.{ts,tsx}  (sauf __tests__/)
  |  (AST scan via ts-morph)
  |  detecte :
  |   - sendEvent({ category, action, name? })            [custom events]
  |   - push(["trackEvent"|"trackSiteSearch"|...], ...)   [events Matomo natifs]
  |   - _paq.push([...]) / paq.push([...])                [events + config]
  v
events/events.extracted.json  ← ground truth technique (category, action, fichier:ligne)
  +
events/events.metadata.yaml   ← description metier (label, trigger, KPI, dashboards, cards)
  |  (join + groupement par feature_group, avec tracking_method)
  v
docs/events.md                ← glossaire lisible + section "Commandes Matomo (non-events)"
```

### Process "j'ajoute / modifie / supprime un event"

1. Modifier le `sendEvent({...})` dans le frontend.
2. `git add` + `git commit`. Le hook `lint-staged` du frontend declenche **automatiquement** `pnpm -F @cdt/metabase events:docs` sur tout fichier `src/modules/**/*.{ts,tsx}` stage, et restage `events.extracted.json` + `docs/events.md`.
3. Si l'event apparait en "Orphelins" dans `docs/events.md` : editer `events/events.metadata.yaml` (cle `"<category>:<action>"`) puis re-commit.
4. Si une cle orpheline apparait dans "Metadata orpheline" (event supprime du code) : supprimer l'entree de `events.metadata.yaml`.
5. Le commit est bloque par husky (`events:check`) si le pipeline n'a pas ete regenere (filet de securite).

## Automatisation

### Precommit

1. **Auto-regen** : `lint-staged` dans `packages/code-du-travail-frontend/lint-staged.config.js` detecte `src/modules/**/*.{ts,tsx}` stage → run `pnpm -F @cdt/metabase events:docs` → `git add` sur `packages/metabase/events/events.extracted.json` + `packages/metabase/docs/events.md`.
2. **Drift check** : `husky` → `pnpm precommit` → `lerna run precommit --stream` → `@cdt/metabase:precommit` = `tsx events/check-events-drift.ts`. Bloque le commit si drift subsiste (ne devrait jamais arriver apres l'auto-regen, mais filet de securite).

### CI (`.github/workflows/metabase-events.yml`)

- **`drift-check`** (sur PR touchant `packages/metabase/**` ou `packages/code-du-travail-frontend/src/modules/**/*.{ts,tsx}` ou le workflow lui-meme) : fail la PR si `docs/events.md` est desync.
- **`wiki-sync`** (sur push `dev` / `master`) : regenere `docs/events.md` + pousse les docs vers le [wiki GitHub](https://github.com/SocialGouv/code-du-travail-numerique/wiki).

## Commandes clefs

```bash
# Regenerer docs/events.md depuis le code et events.metadata.yaml
pnpm -F @cdt/metabase events:docs

# Verifier que docs/events.md est synchronise (CI / precommit)
pnpm -F @cdt/metabase events:check

# Extraire seulement les events (JSON ground truth)
pnpm -F @cdt/metabase events:extract
```

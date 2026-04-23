# @cdt/metabase

Pipeline d'events Matomo pour le CDTN : extraction AST du code frontend, glossaire auto-genere, drift check en precommit + CI.

## Sommaire

- [Installation](#installation)
- [Pipeline events Matomo](#pipeline-events-matomo)
- [Automatisation](#automatisation)
- [Structure des fichiers](#structure-des-fichiers)

## Installation

```bash
pnpm install
```

## Pipeline events Matomo

Le package centralise le glossaire des events Matomo emis par le frontend CDTN. `docs/events.md` est **genere automatiquement** et ne doit jamais etre edite a la main.

### Fonctionnement

```text
packages/code-du-travail-frontend/src/modules/**/*.{ts,tsx}  (sauf __tests__/)
  |
  |  events/extract-events.ts (AST via ts-morph)
  |  detecte sendEvent(), push(["trackEvent"|"trackSiteSearch"|...]), _paq.push()
  v
events/events.extracted.json  (ground truth technique, git-tracked)
  +
events/events.metadata.yaml   (description metier a maintenir a la main)
  |
  |  events/generate-events-doc.ts
  v
docs/events.md (groupe par feature_group, + sections Orphelins / Metadata orpheline / Commandes Matomo)
```

### Commandes

```bash
# Installer les deps (ts-morph, tsx, yaml)
pnpm install

# Regenerer docs/events.md
pnpm -F @cdt/metabase events:docs

# Verifier que docs/events.md est a jour (CI + precommit)
pnpm -F @cdt/metabase events:check
```

### Workflow dev

Aucune action manuelle requise : la regeneration est **automatique** au precommit.

1. Dev ajoute un `sendEvent({ category, action, name? })` dans un `tracking.ts` du frontend.
2. `git add` + `git commit` → `lint-staged` sur `src/modules/**/*.{ts,tsx}` declenche `events:docs` et restage `events.extracted.json` + `docs/events.md`.
3. L'event apparait dans `docs/events.md`, section "Orphelins".
4. Dev documente l'event dans `events/events.metadata.yaml` (cle `"<category>:<action>"`) et re-commit.
5. L'event passe dans sa section metier.

Voir `events/CLAUDE.md` pour les details (schema + metadata + scripts du pipeline sont colocalises).

## Automatisation

- **Precommit auto-regen** : `lint-staged` dans `@cdt/frontend` declenche `pnpm -F @cdt/metabase events:docs` des qu'un fichier `src/modules/**/*.{ts,tsx}` est stage, et restage automatiquement `events.extracted.json` + `docs/events.md`.
- **Precommit drift check** : `@cdt/metabase:precommit` = `events:check` — filet de securite qui bloque le commit si le pipeline n'a pas ete regenere.
- **CI drift-check** (PR) : workflow `.github/workflows/metabase-events.yml` fail la PR si `docs/events.md` est desync.
- **CI wiki-sync** (push `dev`/`master`) : regenere et pousse les docs vers le [wiki GitHub](https://github.com/SocialGouv/code-du-travail-numerique/wiki).

## Structure des fichiers

| Fichier                         | Description                                                              |
| ------------------------------- | ------------------------------------------------------------------------ |
| `CLAUDE.md`                     | **Hub IA pipeline events** : regles, workflow, automatisation            |
| `docs/events.md`                | **Glossaire exhaustif des events Matomo (AUTO-GENERE)**                  |
| `events/events.metadata.yaml`   | Description **metier** des events (label, trigger, KPI, dashboards)      |
| `events/events.extracted.json`  | Ground truth technique extraite depuis le code (auto)                    |
| `events/events.schema.ts`       | Types TS partages du pipeline events                                     |
| `events/extract-events.ts`      | AST scan des `tracking.ts` → `events.extracted.json`                     |
| `events/generate-events-doc.ts` | Join extracted + metadata → `docs/events.md`                             |
| `events/check-events-drift.ts`  | Exit 1 si `docs/events.md` est desynchronise (utilise en precommit + CI) |

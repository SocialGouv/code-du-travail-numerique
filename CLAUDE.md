# CLAUDE.md — Code du Travail Numerique

Monorepo pnpm + lerna. Point d'entree pour les IA agents. Chaque package a son propre `CLAUDE.md` avec les regles specifiques.

## Stack

- **Node 24** (`.node-version`), **pnpm 10** (`packageManager`), **lerna 9**.
- Packages dans `packages/*` — voir leur `CLAUDE.md` pour les details.

## Commandes racine

```bash
pnpm install          # install toutes les deps
pnpm build            # build tous les packages
pnpm test             # tests tous les packages
pnpm lint             # lint tous les packages
pnpm format           # prettier
pnpm type-check       # tsc
```

## Conventions

- **Code** : voir [`BEST_PRACTICE.md`](BEST_PRACTICE.md).
- **Commits / PR** : `feat:`, `fix:`, `chore:`, `docs:`. PR squashees sur `dev`, promues vers `master`.
- **Branche** : forker depuis `dev`. `master` = production.
- **Precommit** : `husky` + `lint-staged`. La pipeline d'events Matomo est regeneree automatiquement — voir `packages/metabase/CLAUDE.md`.
- **CI** : `.github/workflows/`.

## Ressources

- Site prod : <https://code-du-travail.beta.gouv.fr/>
- Issues : <https://github.com/SocialGouv/code-du-travail-numerique/issues>

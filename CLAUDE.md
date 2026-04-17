# CLAUDE.md — Code du Travail Numerique

Monorepo pnpm + lerna du projet Code du travail numerique (CDTN). Ce fichier est le point d'entree pour les IA agents (Claude Code, Cursor, etc.). Pour chaque dossier, un `CLAUDE.md` local precise les regles specifiques.

## Stack

- **Node 24** (`.node-version`), **pnpm 10** (`packageManager`), **lerna 9** pour l'orchestration monorepo.
- 4 packages dans `packages/*` :
  - `@cdt/frontend` (`code-du-travail-frontend`) — app Next.js principale ([CLAUDE.md](packages/code-du-travail-frontend/CLAUDE.md))
  - `@socialgouv/modeles-social` (`code-du-travail-modeles`) — regles publicodes et modeles de calcul (simulateurs)
  - `@socialgouv/cdtn-utils` (`code-du-travail-utils`) — utilitaires partages
  - `@cdt/metabase` (`metabase`) — dashboards Metabase + pipeline events Matomo ([CLAUDE.md](packages/metabase/CLAUDE.md))

## Regles globales

1. **Conventions de code** : voir [`BEST_PRACTICE.md`](BEST_PRACTICE.md) (nommage `kebab-case` / `PascalCase`, regle de l'`index.ts`, conventions de test).
2. **Commits / PR** : messages conventionnels (`feat:`, `fix:`, `chore:`, `docs:`). Les PR sont squashees sur `dev`, promues vers `master` pour release.
3. **Branch de travail** : forker depuis `dev` (branche integration). `master` = production.
4. **Precommit** : `husky` + `lint-staged` (config dans chaque package). Inclut les drift checks du pipeline events Metabase (`@cdt/metabase precommit`).
5. **CI** : voir `.github/workflows/` (build, lint, format, type-check, tests, e2e, lighthouse, wiki sync events).

## Commandes racine

```bash
pnpm install                      # install toutes les deps du monorepo
pnpm dev:frontend                 # dev frontend + modeles en parallele
pnpm build                        # build utils + modeles + frontend
pnpm test                         # frontend + modeles + utils
pnpm lint                         # lint tous les packages
pnpm format                       # prettier sur tous les packages
pnpm type-check                   # tsc sur tous les packages
```

## Ou trouver quoi

| Besoin | Ou |
| --- | --- |
| Ajouter un event Matomo | [`packages/metabase/events/CLAUDE.md`](packages/metabase/events/CLAUDE.md) |
| Modifier un simulateur | [`packages/code-du-travail-frontend/src/modules/outils/`](packages/code-du-travail-frontend/src/modules/outils/) + `packages/code-du-travail-modeles/src/modeles/` |
| Creer une carte Metabase | [`packages/metabase/CLAUDE.md`](packages/metabase/CLAUDE.md) (§Process avant TOUTE modification) |
| Ajouter une regle publicodes | `packages/code-du-travail-modeles/BEST_PRACTICE.md` |
| Comprendre le KPI d'un dashboard | [Wiki Metabase-Dashboards](https://github.com/SocialGouv/code-du-travail-numerique/wiki/Metabase-Dashboards) (auto-sync depuis `packages/metabase/docs/dashboards.md`) |
| Ajouter une contribution / CC traitee | `packages/code-du-travail-frontend/src/modules/contributions/` + modeles publicodes |
| Ajouter / modifier une variable d'env | Chercher dans `packages/code-du-travail-frontend/src/config.ts` |

## Priorites strictes

- **Toujours** mettre a jour la doc `docs/` du package touche en meme temps que le code (regle recursive : chaque package/sous-dossier precise ce qui doit etre sync).
- **Ne jamais** editer `packages/metabase/docs/events.md` a la main (auto-genere ; voir son CLAUDE.md).
- **Ne jamais** commiter `.mcp.json`, `.env`, cles API (gitignore defaillant = a corriger immediatement).
- **Pour tout event trace** : valider que le trio `(category, action, name)` matche bien ce qu'attend Metabase avant merge. Le pipeline `@cdt/metabase events:check` bloque la PR en cas de drift.

## Ressources externes

- Site prod : <https://code-du-travail.beta.gouv.fr/>
- Metabase : <https://metabase-cdtn.fabrique.social.gouv.fr>
- Issues GitHub : <https://github.com/SocialGouv/code-du-travail-numerique/issues>

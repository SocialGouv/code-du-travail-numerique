# AGENTS.md

Instructions pour les agents de code qui travaillent sur ce dépôt.

## Projet

Le Code du travail numérique ([code.travail.gouv.fr](https://code.travail.gouv.fr)) est un service public d'information en droit du travail : fiches, contributions par convention collective, simulateurs et modèles de courriers.

## Organisation du monorepo

Monorepo pnpm (workspaces `packages/*`) piloté par lerna. Node `24.22.1` (`.node-version`), pnpm `>= 10` (version exacte dans `packageManager` du `package.json` racine).

| Dossier                             | Nom npm                      | Rôle                                                                                |
| ----------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------- |
| `packages/code-du-travail-frontend` | `@cdt/frontend`              | Application Next.js (site et API)                                                   |
| `packages/code-du-travail-modeles`  | `@socialgouv/modeles-social` | Modèles [publicodes](https://publi.codes) des simulateurs (YAML dans `src/modeles`) |
| `packages/code-du-travail-utils`    | `@socialgouv/cdtn-utils`     | Utilitaires partagés                                                                |
| `packages/code-du-travail-stats`    | `@socialgouv/cdtn-stats`     | Extraction statique des events Matomo vers `events/events.extracted.json`           |

Le frontend dépend de `cdtn-utils` et `modeles-social` via `link:` : il consomme leur build. Après une modification dans l'un d'eux, le rebuilder (`pnpm build:npm`).

Frontend (`packages/code-du-travail-frontend`) :

- Next.js 16 en App Router : les routes (pages et `app/api`) sont dans `app/`.
- Le code métier vit dans `src/modules/<feature>` (un dossier par fonctionnalité : `outils`, `contributions`, `convention-collective`, `recherche`…). L'accès aux données (Elasticsearch, API DILA) est dans `src/api`.
- UI : DSFR via `@codegouvfr/react-dsfr`.
- Styles : Panda CSS. `panda codegen` génère `src/styled-system` (importé via l'alias `@styled-system/*`). Ce dossier est ignoré par git : ne jamais l'éditer à la main.
- `pnpm codegen` (tsup, prebuild, icônes DSFR, `panda codegen`, `next typegen`) est lancé automatiquement par `dev`, `build`, `lint`, `type-check` et `test`.
- Variables d'environnement : partir de `.env.sample` (`cp .env.sample .env`).
- Modèles publicodes : `src/modeles` (`conventions/` contient un fichier par convention collective), tests dans `src/__test__`.

## Commandes

À la racine :

```sh
pnpm install
pnpm build                 # utils, modeles puis frontend
pnpm build:npm             # utils et modeles seulement
pnpm dev:frontend          # frontend + modeles en watch
```

Par package (`<pkg>` = `@cdt/frontend`, `@socialgouv/modeles-social`, `@socialgouv/cdtn-utils` ou `@socialgouv/cdtn-stats`) :

```sh
pnpm --filter <pkg> lint --quiet
pnpm --filter <pkg> type-check
pnpm --filter <pkg> format:check   # `format` pour corriger
pnpm --filter <pkg> test
```

Tests du frontend :

```sh
pnpm test:frontend         # jest sans Elasticsearch (exclut *.es.test.ts et *.script.test.ts)
pnpm test:api              # tests *.es.test.ts, Elasticsearch requis sur localhost:9200
pnpm test:update           # met à jour les snapshots de test:frontend
pnpm test:update:api       # met à jour les snapshots de test:api
```

`pnpm --filter @cdt/frontend test` (celui de la CI) lance tout jest et exige aussi Elasticsearch. Pour en démarrer un comme la CI :

```sh
docker run -d --name es -p 9200:9200 -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.13.4
```

E2E (Playwright, `src/e2e/**/*.e2e.ts`) :

```sh
pnpm --filter @cdt/frontend test:e2e:install                 # navigateurs Playwright
pnpm test:e2e                                               # lance `pnpm start` : faire `pnpm build` avant
TEST_BASEURL=<url> pnpm --filter @cdt/frontend test:e2e --project=chromium  # contre un environnement déployé
```

Projets Playwright : `chromium`, `html-validation`, `widgets`.

### Avant de déclarer le travail terminé

Reproduire la CI (`.github/workflows/quality.yml`) pour chaque package touché :

1. `pnpm --filter @socialgouv/cdtn-utils --filter @socialgouv/modeles-social build` (prérequis de lint, type-check et test du frontend) ;
2. `lint --quiet`, `format:check`, `type-check` du package ;
3. `test` du package (en CI : frontend et modeles ; pour le frontend sans Elasticsearch, au minimum `pnpm test:frontend`) ;
4. si le tracking Matomo a bougé : `pnpm -F @socialgouv/cdtn-stats events:check`.

## Conventions de code

- Fichiers et dossiers en `kebab-case`, composants React (et leurs tests) en `PascalCase`.
- Un `index.ts` par dossier expose ce qui est public ; importer via cet index.
- Tests d'une même famille regroupés dans un `describe`.

Détails : [`BEST_PRACTICE.md`](./BEST_PRACTICE.md) et, pour les modèles, [`packages/code-du-travail-modeles/BEST_PRACTICE.md`](./packages/code-du-travail-modeles/BEST_PRACTICE.md) (un dossier de tests par convention collective, puis par simulateur).

## Points de vigilance

- **Changement ou suppression d'URL** : appliquer la checklist SEO de [`BEST_PRACTICE.md`](./BEST_PRACTICE.md#changement-durl-ou-suppression-de-page-seo).
  - Redirection 301 en un seul saut dans `packages/code-du-travail-frontend/redirects.json`, avec `"statusCode": 301` (pas `"permanent": true`, qui produit une 308).
  - La destination est l'URL finale, jamais la source d'une autre redirection. `scripts/__tests__/redirects.test.ts` détecte les chaînes dans `redirects.json`. Les redirections faites par une page se vérifient avec `curl -sI`.
  - Mettre à jour les liens internes (`grep -rn "<ancien-chemin>" packages/`).
- **Tracking Matomo** : seul `src/modules/**` du frontend est scanné (glob dans `packages/code-du-travail-stats/src/project.ts`).
  - Le hook pre-commit régénère et re-stage `packages/code-du-travail-stats/events/events.extracted.json`. Sinon : `pnpm -F @socialgouv/cdtn-stats events:extract`.
  - La CI (`stats-events.yml`) échoue si le JSON diverge du code (`events:check`).
  - Puis lancer le skill `/tracking-plan` pour actualiser `packages/code-du-travail-stats/events/TRACKING_PLAN.md`.
- **Next 16** : `next lint` n'existe plus, le lint passe directement par ESLint (`eslint.config.mjs`).

## Git et pull requests

- Branche de base : `dev`. Les releases partent de `master` (`release.yml`) ; la production est déployée depuis les tags `v*`.
- Messages de commit **et** titres de PR en français, au format Conventional Commits `type(scope): description`. Le titre de PR est vérifié par `.github/workflows/lint-pr.yml` (`amannn/action-semantic-pull-request`). Exemples réels :
  - `fix(breadcrumb): navigation client-side au lieu de recharger la page (#7605)`
  - `feat(recherche): ajoute les actualités au moteur de recherche avec un label « ACTUALITÉ » (#7590)`
- Remplir en français le template `.github/pull_request_template.md` (Contexte, Changements, Vérifications et, si une URL change, la checklist SEO).
- Le hook husky `pre-commit` lance `pnpm precommit` (lint-staged de chaque package : ESLint `--fix`, Prettier ; pour le frontend aussi `tsc --noEmit` et les tests jest liés). Ne pas le contourner.
- Ne jamais modifier à la main les `CHANGELOG.md` ni les versions (`lerna.json`, `package.json`). Le workflow `release.yml` les génère avec `lerna version --conventional-commits` et crée le commit `chore(release): version x.y.z`.

## Skills

| Skill            | Quand l'utiliser                                                                                                                                                       | Arguments                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `/sentry-issues` | Analyser les dernières issues Sentry du projet, examiner les stack traces et proposer des corrections dans le code source.                                             | `[nombre d'issues (défaut: 10)] [--assign] [--comment <PR_URL>] [--fix]` |
| `/tracking-plan` | Rédiger ou actualiser le plan de tracking Matomo métier (`events/TRACKING_PLAN.md`) à partir de `events.extracted.json` et du code. Après toute évolution du tracking. | `[--skip-extract]`                                                       |

Pour ajouter un skill :

- le créer dans `.agents/skills/<nom>/SKILL.md` (emplacement générique, lu aussi par les autres agents), avec un frontmatter `name`, `description` et, optionnellement, `argument-hint` ;
- pour que Claude Code le découvre, ajouter un lien symbolique relatif depuis la racine du dépôt : `ln -s ../../.agents/skills/<nom> .claude/skills/<nom>` ;
- ajouter une ligne à ce tableau.

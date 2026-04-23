# @cdt/frontend — consignes Claude

App Next.js (App Router) du CDTN.

## Stack

- **Next.js** (App Router) — `app/`, `next.config.mjs`
- **React** + **TypeScript strict**
- **@codegouvfr/react-dsfr** — Design System de l'Etat
- **Panda CSS** — `panda.config.ts`
- **Zustand + Immer** — state des simulateurs (`modules/outils/*/store/`)
- **Elasticsearch** — moteur de recherche (`src/api/modules/search/`)
- **@socialgouv/matomo-next** — tracking (voir `packages/metabase/events/CLAUDE.md`)
- **Sentry + OpenTelemetry** — monitoring
- **Jest** + **Playwright** — tests unit / e2e
- **Publicodes** (via `@socialgouv/modeles-social`) — moteur de regles simulateurs

## Commandes

```bash
pnpm dev              # serveur Next.js
pnpm build            # build
pnpm test             # tests
pnpm test:e2e         # Playwright
pnpm lint
pnpm type-check
```

## Architecture

`src/modules/<feature>/` :

- `tracking.ts` / `tracking.tsx` → hooks `useXxxTracking()` wrappant `sendEvent` ou `push` de matomo-next.
- `store/` (zustand), `components/`, `events/`, `__tests__/`.

Voir [`BEST_PRACTICE.md`](../../BEST_PRACTICE.md) pour les conventions de nommage et de test.

## Regles

- **Pas de secret dans le code** (clefs API, tokens). Tout passe par `.env` (gitignore).
- **Toujours passer par un hook `useXxxTracking()`** pour fire un event Matomo — jamais `sendEvent` direct dans un composant.
- **Pour tout ajout/modif d'event Matomo** : voir `packages/metabase/events/CLAUDE.md` (le pipeline `events:check` bloque la PR en cas de drift).

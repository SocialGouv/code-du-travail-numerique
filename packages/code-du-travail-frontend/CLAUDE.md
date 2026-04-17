# @cdt/frontend — consignes Claude

App Next.js (App Router) du CDTN. Stack principale :

| Techno | Role | Ou |
| --- | --- | --- |
| **Next.js 14+** (App Router) | Framework web, SSR + SSG | `app/`, `next.config.mjs` |
| **React 18+** | UI | composants fonctionnels + hooks |
| **TypeScript strict** | Typage | `tsconfig.json` |
| **@codegouvfr/react-dsfr** | Design System de l'Etat (DSFR) | composants `Button`, `Input`, `fr.cx()` pour les classes |
| **Panda CSS** | CSS-in-JS atomique | `panda.config.ts`, `@styled-system/css` |
| **Zustand + Immer** | State management (simulateurs) | `modules/outils/*/store/` |
| **Elasticsearch 8** | Moteur de recherche | `src/api/modules/search/` |
| **@socialgouv/matomo-next** | Tracking Matomo | voir §Tracking ci-dessous |
| **Sentry + OpenTelemetry** | Monitoring + traces | `sentry.*.config.ts`, `instrumentation*.ts` |
| **Jest + Testing Library** | Tests unitaires | `*.test.{ts,tsx}` colocalises |
| **Playwright** | Tests e2e | `test-results/`, `playwright.config.ts` |
| **Publicodes (via `@socialgouv/modeles-social`)** | Moteur de regles des simulateurs | `modules/outils/indemnite-*` |

## Architecture des modules

`src/modules/<feature>/` est le decoupage principal. Conventions par dossier :

- `tracking.ts` / `tracking.tsx` → hook `useXxxTracking()` qui expose des `emitXxx()` wrappant `sendEvent` ou `push` de matomo-next.
- `events/` → emitters specifiques aux simulateurs (ex: `useIndemniteLicenciementEventEmitter`).
- `store/` (zustand) → slice par etape de simulateur.
- `components/` → composants React colocalises.
- `__tests__/` → tests Jest colocalises (exclus du scan events).

Voir [`BEST_PRACTICE.md`](../../BEST_PRACTICE.md) pour les regles de nommage (`kebab-case` / `PascalCase`) et la convention `index.ts`.

## Tracking Matomo

**Toute modification d'event doit etre accompagnee d'une mise a jour de `@cdt/metabase`.**

### Ajouter un event custom (cas standard)

```typescript
// modules/ma-feature/tracking.ts
import { sendEvent } from "@socialgouv/matomo-next";

enum MyCategory {
  MY_CATEGORY = "ma_category",
}

enum MyAction {
  MY_ACTION = "mon_action",
}

export const useMyFeatureTracking = () => {
  const emitMyEvent = (idcc: number) => {
    sendEvent({
      category: MyCategory.MY_CATEGORY,
      action: MyAction.MY_ACTION,
      name: idcc.toString(),
    });
  };
  return { emitMyEvent };
};
```

Puis :
1. `pnpm -F @cdt/metabase events:docs` → l'event apparait dans `packages/metabase/docs/events.md` (section "Orphelins" au premier run).
2. Documenter dans `packages/metabase/events/events.metadata.yaml` (cle `"ma_category:mon_action"`, champs `label_fr`, `trigger`, `feature_group`, optionnellement `kpi`, `dashboards`, `cards`, `mv_source`).
3. Relancer `pnpm -F @cdt/metabase events:docs`. L'event passe dans sa section metier.
4. Commit tout ensemble : `tracking.ts` + `events.metadata.yaml` + `events.extracted.json` + `docs/events.md`.

Le precommit husky lance `events:check` qui bloque le commit si ces fichiers sont desync.

### Autres patterns Matomo

- `push(["trackSiteSearch", query])` → event natif Matomo site search (cf. `modules/recherche/tracking.ts:194`).
- `push(["trackEvent", cat, action, name])` → alternative a `sendEvent` (meme semantique, moins prefere).
- `_paq.push([cmd, ...])` → commandes de configuration (consent, heatmap, A/B test, etc.). Non-events ; listees en section "Commandes Matomo de configuration" du glossaire.

Tous ces patterns sont detectes par `@cdt/metabase events:extract` (AST scan).

## Ajouter un simulateur

1. Creer `modules/outils/<nom-simulateur>/` avec sous-dossiers : `steps/`, `store/`, `components/`, `events/`.
2. Implementer les etapes via Zustand + Immer (voir `indemnite-licenciement` comme reference).
3. Brancher `useXxxEventEmitter` pour fire `view_step_*`, `click_previous_*`, `results_ineligible`.
4. Ajouter la regle de calcul dans `@socialgouv/modeles-social` (publicodes).
5. Exposer la route dans `app/outils/<slug>/`.
6. Tester : Jest pour la logique, Playwright pour le parcours complet.
7. **Documenter les events** : editer `packages/metabase/events/events.metadata.yaml` (cf. §Tracking).

## Tests

- **Unit / integration** : `pnpm test:frontend` (Jest + Testing Library). Snapshot dans `__snapshots__/`, update avec `--updateSnapshot`.
- **API** : `pnpm test:api` (Elasticsearch en docker).
- **E2E** : `pnpm test:e2e` ou `pnpm test:e2e:ui` (Playwright).
- **RGAA** : `playwright.rgaa.config.ts` — tests d'accessibilite automatiques.

## Commandes courantes

```bash
pnpm dev                    # serveur Next.js en dev
pnpm build                  # prebuild (tsup) + panda + dsfr + next build
pnpm lint                   # eslint
pnpm format                 # prettier
pnpm type-check             # tsc --noEmit
```

## Ne pas faire

- **Ne jamais** mettre une cle API Matomo / Sentry / Elasticsearch dans le code source ; toutes les variables sensibles passent par `.env` (gitignore).
- **Ne jamais** appeler `sendEvent` / `push` depuis un composant directement — toujours passer par un hook `useXxxTracking()`. Facilite le mock en test et l'extraction AST.
- **Ne jamais** dupliquer un `enum` d'event : si `analytics/types.ts` contient deja l'enum, l'importer plutot que redeclarer localement (evite le drift).
- **Ne jamais** editer `packages/metabase/docs/events.md` a la main — c'est l'output auto-genere du pipeline. La source technique est le code TS de ce package ; la source metier est `packages/metabase/events/events.metadata.yaml`.

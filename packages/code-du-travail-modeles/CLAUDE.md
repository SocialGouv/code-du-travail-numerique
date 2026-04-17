# @socialgouv/modeles-social — consignes Claude

Moteur de regles **publicodes** pour les simulateurs CDTN.

## Stack

- **Publicodes** (fichiers `.yaml` dans `src/modeles/` et `src/publicodes/`)
- **TypeScript** — API programmatique
- **Jest** — tests
- **tsup** — bundler

## Structure

```
src/
├── __test__/       tests par theme (legal + CC specifiques)
├── internal/       wrappers TS autour des engines publicodes
├── modeles/        regles publicodes par simulateur
├── publicodes/     wrappers haut niveau par simulateur
└── index.ts        exports publics
```

Voir [`BEST_PRACTICE.md`](BEST_PRACTICE.md) pour la structure des tests.

## Commandes

```bash
pnpm -F @socialgouv/modeles-social test
pnpm -F @socialgouv/modeles-social build
```

## Regles

- **Pas de side-effect** : pas de reseau, pas de DOM, pas de tracking ici. Le package doit tourner cote serveur et client.
- **Pas d'import de `@cdt/frontend`** (cycle) ni de `matomo-next`.
- **Toute modification de regle** doit etre couverte par un test dans `src/__test__/`.
- **Les references legales** (code du travail, CC) sont obligatoires dans chaque regle — validees par les `references.spec.ts`.

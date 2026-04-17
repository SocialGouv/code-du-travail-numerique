# @socialgouv/modeles-social — consignes Claude

Moteur de **regles publicodes** pour les simulateurs CDTN (Indemnite de licenciement, IRC, Preavis retraite, Preavis demission, Heures recherche emploi, etc.).

## Stack

| Techno | Role |
| --- | --- |
| **Publicodes** | Langage de regles declaratif (fichiers `.yaml` dans `src/modeles/` et `src/publicodes/`) |
| **TypeScript** | API programmatique exposant les engines publicodes |
| **Jest** | Tests unitaires (un `*.spec.ts` par regle / CC) |
| **tsup** | Bundler pour l'export npm |

## Organisation du code

```
src/
├── __test__/       tests publicodes par theme (legal + CC specifiques) — voir BEST_PRACTICE.md
├── internal/       wrappers TS autour des engines publicodes
├── modeles/        regles publicodes par simulateur (packages de regles)
├── publicodes/     wrappers haut niveau par simulateur
└── index.ts        exports publics consommes par @cdt/frontend
```

Voir **[`BEST_PRACTICE.md`](BEST_PRACTICE.md)** pour la structure des tests (dossier `legal/` pour le code du travail, dossier par CC + simulateur, granularite des specs selon la complexite).

## Regles

1. **Toute modification d'une regle publicodes doit etre couverte par un test** dans `src/__test__/`.
2. **Les changements qui modifient le resultat d'un simulateur** doivent etre signales dans `CHANGELOG.md` et peuvent necessiter un rebuild du site (dependance directe de `@cdt/frontend`).
3. **Les references legales** (code du travail, CC) sont obligatoires dans chaque regle — voir les `references.spec.ts` qui les valident.
4. **Pas d'event Matomo ici** : le package est 100% moteur de regles, sans side-effects. Le tracking des simulateurs se fait dans `@cdt/frontend/src/modules/outils/**`.

## Commandes

```bash
pnpm -F @socialgouv/modeles-social test    # jest
pnpm -F @socialgouv/modeles-social build   # tsup
```

## Ne pas faire

- Ne jamais introduire un `import` vers `@cdt/frontend` (cycle) : ce package est consomme en aval, pas l'inverse.
- Ne jamais importer `matomo-next` ou `sendEvent` ici — le tracking est une responsabilite exclusive du frontend.
- Ne pas faire d'appel reseau / side-effect dans les wrappers publicodes — ils doivent rester purs.

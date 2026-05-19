# @socialgouv/cdtn-utils — consignes Claude

Utilitaires partages **purs** (pas de side-effects) consommes par `@cdt/frontend` et `@socialgouv/modeles-social`.

## Commandes

```bash
pnpm -F @socialgouv/cdtn-utils test
pnpm -F @socialgouv/cdtn-utils build
```

## Regles

- **100% pur** : pas de reseau, pas de DOM, pas de side-effect. Doit tourner cote serveur et client.
- **Pas de dep lourde** : le bundle doit rester leger (importe partout).
- **Pas d'import de `react`, `next`, `matomo-next`, `publicodes`** — casserait la reutilisabilite.
- **Pas de metier specifique** (regles CC, etc.) : ca va dans `modeles-social` ou le frontend.
- **Test unitaire obligatoire** pour chaque fonction exposee dans `index.ts`.

# @socialgouv/cdtn-utils — consignes Claude

Utilitaires partages **purs** (pas de side-effects) consommes par `@cdt/frontend` et `@socialgouv/modeles-social`.

## Contenu

| Fichier | Role |
| --- | --- |
| `idcc.ts` | Mapping/helpers autour des identifiants IDCC de CC |
| `naf.ts` | Codes NAF (nomenclature d'activites francaises) |
| `slugify.ts` | Normalisation de strings en slugs URL |
| `sources.ts` | Constantes/enums des types de contenu CDTN (articles, fiches, CC, contributions, modeles, outils...) et mapping vers leurs routes (`routeBySource`) |
| `icons/` | Icones SVG partagees |

## Regles

1. **100% pur** : pas de dep reseau, pas de DOM, pas de side-effect. Doit fonctionner cote serveur (Node) et client (browser).
2. **Pas de dep lourdes** : garder le bundle leger, ce package est importe partout.
3. **Couverture de test** : chaque fonction exposee dans `index.ts` doit avoir un test unitaire dans `__tests__/`.

## Commandes

```bash
pnpm -F @socialgouv/cdtn-utils test    # jest
pnpm -F @socialgouv/cdtn-utils build   # tsup
```

## Ne pas faire

- Importer `react`, `next`, `matomo-next`, `publicodes`, ou toute dep "app" — ca casserait la reutilisabilite (ce package est aussi utilise par le backend data-pipeline et des scripts).
- Ajouter des helpers metier trop specifiques (ex: regles CC) — ils appartiennent a `modeles-social` ou au frontend.

# docs/ — consignes Claude

Documentation auto-generee du pipeline events Matomo.

## Fichiers

| Fichier     | Source                                                                                                                     | Maintenance                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `events.md` | **AUTO-GENERE** par `events/generate-events-doc.ts` depuis `events/events.extracted.json` + `events/events.metadata.yaml`. | Ne jamais editer a la main. `pnpm -F @cdt/metabase events:docs` pour regenerer. |

## Regles

- **`events.md`** : toute modification est ecrasee au prochain run. Pour corriger la description d'un event → editer `events/events.metadata.yaml` et relancer `pnpm events:docs`.
- La regen est **automatique** au precommit via `lint-staged` du frontend.

## Ne pas faire

- Creer un nouveau fichier de doc pour un event : il doit etre dans `events.md` (auto).
- Dupliquer le contenu de `events/events.metadata.yaml` dans un autre fichier : c'est la source unique.

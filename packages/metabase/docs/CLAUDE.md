# docs/ — consignes Claude

Documentation de reference pour humains et IA. Un seul fichier ici est auto-genere : `events.md`.

## Fichiers

| Fichier                 | Source                                                                                                                     | Maintenance                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `events.md`             | **AUTO-GENERE** par `events/generate-events-doc.ts` depuis `events/events.extracted.json` + `events/events.metadata.yaml`. | Ne jamais editer a la main. `pnpm -F @cdt/metabase events:docs` pour regenerer. |
| `materialized-views.md` | Manuel.                                                                                                                    | A synchroniser avec `sql/mv_*.sql` a chaque modif de DDL.                       |
| `dashboards.md`         | Manuel.                                                                                                                    | A jour a chaque ajout / suppression de card ou de dashboard.                    |
| `models.md`             | Manuel.                                                                                                                    | Documente les "models" Metabase (cards sans dashboard, ex: card 106).           |
| `schema.md`             | Manuel.                                                                                                                    | Documente le schema de la DB OVH PG CDTN (tables, partitions).                  |

## Regles

- **`events.md`** : toute modification est ecrasee au prochain run. Pour corriger la description d'un event → editer `events/events.metadata.yaml` et relancer `pnpm events:docs`.
- **`materialized-views.md`** : source de verite pour l'architecture. Doit correspondre aux fichiers de `sql/`. Le header de chaque `mv_xxx.sql` pointe vers la section correspondante (`§N`).
- **`dashboards.md`** : garder a jour la table des cards par dashboard. Quand tu ajoutes ou modifies une card → mettre a jour cette table ET la section "Cartes" du dashboard concerne dans `../CLAUDE.md`.
- **Cross-references** : preferer des liens relatifs (`[materialized-views.md](./materialized-views.md)`) plutot que des chemins absolus.

## Ne pas faire

- Creer un nouveau fichier de doc pour un event : il doit etre dans `events.md` (auto) ou dans `../CLAUDE.md` si c'est une regle metier.
- Dupliquer le contenu de `events/events.metadata.yaml` dans un autre fichier : c'est la source unique.

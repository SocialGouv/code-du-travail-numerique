# docs/ — consignes Claude

Documentation de reference pour humains et IA sur les MV, dashboards, cards, et schema de la DB Metabase CDTN.

## Fichiers

| Fichier                 | Source  | Maintenance                                                           |
| ----------------------- | ------- | --------------------------------------------------------------------- |
| `materialized-views.md` | Manuel. | A synchroniser avec `sql/mv_*.sql` a chaque modif de DDL.             |
| `dashboards.md`         | Manuel. | A jour a chaque ajout / suppression de card ou de dashboard.          |
| `models.md`             | Manuel. | Documente les "models" Metabase (cards sans dashboard, ex: card 106). |
| `schema.md`             | Manuel. | Documente le schema de la DB OVH PG CDTN (tables, partitions).        |

## Regles

- **`materialized-views.md`** : source de verite pour l'architecture. Doit correspondre aux fichiers de `sql/`. Le header de chaque `mv_xxx.sql` pointe vers la section correspondante (`§N`).
- **`dashboards.md`** : garder a jour la table des cards par dashboard. Quand tu ajoutes ou modifies une card → mettre a jour cette table ET la section "Cartes" du dashboard concerne dans `../CLAUDE.md`.
- **Cross-references** : preferer des liens relatifs (`[materialized-views.md](./materialized-views.md)`) plutot que des chemins absolus.

## Ne pas faire

- Dupliquer le contenu de `sql/mv_*.sql` dans la doc : la DDL est source de verite.
- Hard-coder des chiffres volatils (volumes de lignes, IDs de cards specifiques a un dashboard) dans la doc : preferer pointer vers la commande MCP / `curl` qui donne l'etat live.

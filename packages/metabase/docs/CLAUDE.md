# docs/ — consignes Claude

Documentation de reference pour humains et IA sur les MV, dashboards, cards, et schema de la DB Metabase CDTN.

## Fichiers

| Fichier                 | Source  | Maintenance                                                           |
| ----------------------- | ------- | --------------------------------------------------------------------- |
| `materialized-views.md` | Manuel. | **Source de verite SQL** : contient le CREATE + INDEX de chaque MV.   |
| `dashboards.md`         | Manuel. | A jour a chaque ajout / suppression de card ou de dashboard.          |
| `models.md`             | Manuel. | Documente les "models" Metabase (cards sans dashboard, ex: card 106). |
| `schema.md`             | Manuel. | Documente le schema de la DB OVH PG CDTN (tables, partitions).        |

## Regles

- **`materialized-views.md`** : source de verite pour l'architecture ET pour la DDL des MV. Chaque section de MV contient le bloc `CREATE MATERIALIZED VIEW` + `CREATE INDEX` complets.
- **`dashboards.md`** : garder a jour la table des cards par dashboard. Quand tu ajoutes ou modifies une card → mettre a jour cette table ET la section "Cartes" du dashboard concerne dans `../CLAUDE.md`.
- **Cross-references** : preferer des liens relatifs (`[materialized-views.md](./materialized-views.md)`) plutot que des chemins absolus.

## Ne pas faire

- Ajouter un fichier `.sql` separe dans le package : toute la DDL vit dans `materialized-views.md`.
- Hard-coder des chiffres volatils (volumes de lignes, IDs de cards specifiques a un dashboard) dans la doc : preferer pointer vers la commande MCP / `curl` qui donne l'etat live.

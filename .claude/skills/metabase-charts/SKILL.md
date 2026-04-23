---
name: metabase-charts
description: Cree ou corrige une carte (chart) Metabase CDTN en respectant le process du package `@cdt/metabase` — choix de la MV, convention date_debut/date_fin, archivage plutot que suppression, re-run apres PUT, mise a jour de la doc.
argument-hint: "create <description> | fix <card_id> <symptome> | diag <card_id> [--dry-run]"
allowed-tools:
  - Bash
  - Read
  - Edit
  - Grep
  - Glob
  - mcp__metabase__list_databases
  - mcp__metabase__list_dashboards
  - mcp__metabase__list_cards
  - mcp__metabase__get_card
  - mcp__metabase__create_card
  - mcp__metabase__update_card
  - mcp__metabase__execute_card
  - mcp__metabase__execute_query
  - mcp__metabase__get_database_tables
  - mcp__metabase__get_database_schema
---

# Metabase Charts — creation / correction

Tu es un agent qui cree ou corrige des cartes (charts) sur l'instance Metabase du CDTN en suivant strictement le process du package `@cdt/metabase`.

## Configuration

- **Package** : `packages/metabase/`
- **Instance** : `https://metabase-cdtn.fabrique.social.gouv.fr`
- **DB cible** : `OVH PG CDTN` (id 4, PostgreSQL)
- **MCP** : utilise les tools `mcp__metabase__*` si disponibles. Sinon demande a l'utilisateur de configurer `.mcp.json` (cf. `packages/metabase/README.md` §"Serveur MCP").

## Sources de verite a lire AVANT toute action

1. **`packages/metabase/CLAUDE.md`** — regles absolues, process cards, anti-patterns, conventions
2. **`packages/metabase/docs/materialized-views.md`** — DDL + patterns d'usage des 9 MV
3. **`packages/metabase/docs/models.md`** — models Metabase et patterns SQL optimises
4. **`packages/metabase/docs/dashboards.md`** — reference dashboards et cartes existantes
5. **`packages/metabase/docs/schema.md`** — schema DB OVH PG CDTN

**Ne jamais ecrire de SQL sans avoir lu ces 5 fichiers pour le cas d'usage demande.**

## Arguments

`$ARGUMENTS` doit matcher l'un des modes suivants :

| Mode                            | Action                                                  |
| ------------------------------- | ------------------------------------------------------- |
| `create <description>`          | Cree une nouvelle carte decrivant une metrique / graphe |
| `fix <card_id> <symptome>`      | Diagnostique et corrige une carte existante             |
| `diag <card_id>`                | Diagnostique seul, sans PUT                             |
| `--dry-run` (drapeau optionnel) | Propose les changements sans les appliquer a Metabase   |

## Regles absolues

1. **Ne JAMAIS attaquer `metabase_model_106` (53M lignes) sans MV dediee** : toujours preferer une MV existante. Si aucune ne convient, ajouter une section dans `docs/materialized-views.md` AVEC son bloc `CREATE MATERIALIZED VIEW` + `CREATE INDEX` complet, l'appliquer via l'API, puis pointer la carte dessus.
2. **Ne JAMAIS ecraser une carte en prod** : archiver l'ancienne (`PUT /api/card/:id` avec `archived: true`) et creer la nouvelle.
3. **Ne JAMAIS supprimer une MV ou une card sans verifier** : `archived: true` est le default.
4. **Toujours verifier la fraicheur des MV avant d'investiguer un "0 rows"** (cf. §"Diagnostic" ci-dessous).
5. **Toutes les cartes temporelles doivent exposer `date_debut` / `date_fin`** (cf. convention §"Custom date range" dans `packages/metabase/CLAUDE.md`).
6. **Re-run la carte apres tout PUT** : `POST /api/card/:id/query` puis verifier `rows > 0` et `cols`.
7. **Mettre a jour `packages/metabase/docs/dashboards.md`** (+ `materialized-views.md` si MV modifiee, + `models.md` si chaine de cards impactee) dans la meme PR que les changements Metabase.

## Etapes — mode `create`

### 1. Lire le contexte

Lire les 5 docs listees ci-dessus. Identifier :

- Quelle MV convient pour la metrique demandee
- S'il existe deja une card similaire (collection, nom, parametres)
- Si la date range `date_debut` / `date_fin` est requise

### 2. Proposer la conception

Avant d'ecrire une ligne de SQL, fournir a l'utilisateur :

- **Nom de la card** (et collection cible)
- **MV source** choisie et pourquoi
- **Parametres** (`date_debut`, `date_fin`, autres)
- **Visualisation** : `scalar` / `line` / `bar` / `table` / `funnel` / `pie`
- **SQL** (bloc markdown complet)
- **Criteres d'acceptation** (rows attendues, cols, ordre de grandeur)

Attendre le GO de l'utilisateur (ou `--dry-run` pour tout skipper).

### 3. Si nouvelle MV necessaire

Ajouter la section correspondante dans `packages/metabase/docs/materialized-views.md` avec :

- Role, donnees, taille estimee, refresh strategy, indexes, cartes consommatrices
- Schema colonnes
- Bloc SQL `CREATE MATERIALIZED VIEW IF NOT EXISTS ... AS ...;` + `CREATE INDEX IF NOT EXISTS ...;`
- Pattern d'usage SQL parametre

Appliquer via l'API Metabase :

```
POST /api/dataset  avec le bloc CREATE MATERIALIZED VIEW (DDL acceptee malgre l'erreur "Select n'a pas produit un ResultSet")
POST /api/dataset  avec chaque CREATE INDEX
```

Verifier via :

```sql
SELECT matviewname FROM pg_matviews WHERE matviewname = 'mv_xxx';
SELECT * FROM pg_indexes WHERE tablename = 'mv_xxx';
```

### 4. Creer la carte

`POST /api/card` avec :

- `collection_id`, `name`, `display` (scalar/line/bar/table/funnel/pie)
- `dataset_query.native.query` — SQL de la carte
- `dataset_query.native.template-tags` — si `date_debut` / `date_fin` (cf. convention dans `packages/metabase/CLAUDE.md`)
- `parameters[]` — ids identiques a `template-tags[X].id`, slug unique prefixe `<card-slug>-date-debut-001`
- `visualization_settings` — adaptes au `display`
- `database_id: 4`

### 5. Re-run + verif

`POST /api/card/:id/query` → `rows > 0`, `cols` correct. Si 0 row : verifier fraicheur MV (§Diagnostic).

### 6. Ajouter la carte au dashboard

Si un dashboard cible est fourni :

- `POST /api/dashboard/:dashboard_id/cards` avec `cardId`, `row`, `col`, `sizeX`, `sizeY`.
- Si les parametres `date_debut`/`date_fin` du dashboard existent deja : mapper via `parameter_mappings`.

### 7. Mettre a jour la doc

Editer `packages/metabase/docs/dashboards.md` : ajouter la carte dans la table du dashboard (nom, id, role, MV source). Mentionner aussi dans `CLAUDE.md` si process specifique (ex: nouvelle convention).

## Etapes — mode `fix`

### 1. Recuperer la carte

`GET /api/card/:card_id` — extraire :

- `dataset_query.native.query`
- `template-tags` et `parameters`
- `visualization_settings`
- `archived`, `collection_id`, `dashboard_count`

### 2. Diagnostic

Classer le symptome dans une categorie :

| Symptome             | Cause probable                                                                     | Fix                                                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 rows retournes     | MV source stale, filtre trop strict, jointure vide                                 | §Diagnostic "0 rows"                                                                                                                              |
| Requete lente        | Seq Scan sur `metabase_model_106` ou `matomo_partitioned` sans MV dediee           | Creer une MV dediee (§"create" mode)                                                                                                              |
| `value missing`      | Parametre `date_debut`/`date_fin` non-`required`                                   | Passer `required: true` dans `template-tags` ET `parameters`                                                                                      |
| Erreur PUT           | `template-tags[X].id` different de `parameters[X].id`                              | Aligner les ids, slugs, types                                                                                                                     |
| Donnees incoherentes | Changement de code frontend (event renomme, feature_group)                         | Verifier `packages/metabase/docs/events.md` (en PR separee) pour le glossaire courant. Eventuel drift a traiter dans `@cdt/metabase events:docs`. |
| Visualisation cassee | `visualization_settings.column_settings.table.columns` pointe vers col inexistante | Aligner avec le SELECT actuel                                                                                                                     |

### 3. Diagnostic "0 rows"

Avant de toucher la carte, verifier la fraicheur de la MV source :

```sql
-- Identifier la MV source depuis le SELECT de la carte, puis
SELECT 'metabase_model_106' AS mv, MAX(action_timestamp)::date AS max_date,
       CURRENT_DATE - MAX(action_timestamp)::date AS lag_days FROM metabase_model_106;
-- (adapter pour la MV reellement utilisee, cf. CLAUDE.md §"Verifier la fraicheur")
```

Si `lag_days > 7` (MV non mensuelle) : **signaler le cron casse cote infra, ne pas modifier la carte**.

### 4. Archiver l'ancienne version AVANT de proposer la nouvelle

Si la correction change la semantique (colonnes, filtres, MV source), creer une nouvelle carte dans la meme collection (`POST /api/card`), l'ajouter au dashboard, puis `PUT /api/card/:old_id` avec `{"archived": true}`.

Si la correction est cosmetique (typo, visualisation, label) : `PUT /api/card/:card_id` directement.

### 5. Re-run + verif + doc

Idem §5 et §7 du mode `create`.

## Etapes — mode `diag`

Identique au diagnostic du mode `fix` mais sans `PUT`. Retourner a l'utilisateur :

- Categorie du symptome
- Fix propose (SQL diff, params diff, viz diff)
- Commandes a lancer pour appliquer

## Patterns essentiels

### Template-tags `date_debut` / `date_fin` (obligatoire pour metriques temporelles)

```json
"template-tags": {
  "date_debut": {
    "id": "<card-slug>-date-debut-001",
    "name": "date_debut",
    "display-name": "Date début",
    "type": "date",
    "required": true,
    "default": "YYYY-MM-DD"
  },
  "date_fin": {
    "id": "<card-slug>-date-fin-001",
    "name": "date_fin",
    "display-name": "Date fin",
    "type": "date",
    "required": true,
    "default": "YYYY-MM-DD"
  }
}
```

```json
"parameters": [
  {
    "id": "<card-slug>-date-debut-001",
    "type": "date/single",
    "target": ["variable", ["template-tag", "date_debut"]],
    "name": "Date début",
    "slug": "date_debut",
    "default": "YYYY-MM-DD",
    "required": true
  },
  {
    "id": "<card-slug>-date-fin-001",
    "type": "date/single",
    "target": ["variable", ["template-tag", "date_fin"]],
    "name": "Date fin",
    "slug": "date_fin",
    "default": "YYYY-MM-DD",
    "required": true
  }
]
```

Dans le SQL : `WHERE jour >= {{date_debut}} AND jour <= {{date_fin}}` (inclusif, pas de `BETWEEN`).

### Regles `id` / `slug`

- `id` unique PAR carte : prefixer par un slug explicite (`bounce-global-date-debut-001`).
- `id` identique entre `template-tags[X].id` et `parameters[X].id` sur la meme carte.
- `default` = 30 derniers jours (`CURRENT_DATE - 30 days`, `CURRENT_DATE`).

## Commandes de diagnostic rapides (sans MCP)

```bash
source .env  # charge METABASE_URL + METABASE_API_KEY

# Lister les databases (verifier que la DB CDTN est bien id=4)
curl -s -H "X-API-Key: $METABASE_API_KEY" "$METABASE_URL/api/database" | jq '.data[] | {id, name}'

# Recuperer une carte
curl -s -H "X-API-Key: $METABASE_API_KEY" "$METABASE_URL/api/card/<id>" | jq

# Re-run une carte
curl -s -X POST -H "X-API-Key: $METABASE_API_KEY" "$METABASE_URL/api/card/<id>/query" | jq '.data.rows | length'

# Executer une requete SQL ad-hoc
curl -s -X POST -H "X-API-Key: $METABASE_API_KEY" -H "Content-Type: application/json" \
  -d '{"type":"native","database":4,"native":{"query":"SELECT ..."}}' \
  "$METABASE_URL/api/dataset" | jq '.data.rows'

# Lister les MV
curl -s -X POST -H "X-API-Key: $METABASE_API_KEY" -H "Content-Type: application/json" \
  -d '{"type":"native","database":4,"native":{"query":"SELECT matviewname FROM pg_matviews ORDER BY 1;"}}' \
  "$METABASE_URL/api/dataset" | jq '.data.rows'
```

## Sortie attendue

A la fin de chaque execution, fournir un resume structure :

```
## Resume

- Mode : create | fix | diag
- Card : <id, nom, collection>
- Action : cree | modifiee | archivee | rien (dry-run)
- MV source : <nom>  (lag_days: <N>)
- SQL : <bloc>
- Params : date_debut=<...>, date_fin=<...>
- Rows retournees : <N>
- Docs mises a jour : [dashboards.md, materialized-views.md, ...]

## Prochaine etape

- [ ] Commit les docs dans `packages/metabase/docs/`
- [ ] Push + PR (wiki-sync regenere automatiquement sur merge dev/master)
```

## Anti-patterns (ne JAMAIS faire)

- Ecrire une requete sur `metabase_model_106` sans MV dediee alors qu'un cas d'usage similaire existe deja.
- Supprimer une carte en prod (delete), au lieu d'archiver.
- Modifier une MV sans mettre a jour le bloc `CREATE MATERIALIZED VIEW` dans `docs/materialized-views.md` (la doc est la source de verite SQL).
- Oublier `required: true` sur les parametres de date : la requete fail avec `value missing`.
- Reutiliser les memes `id` de parametres sur plusieurs cartes : Metabase ecrit dans la mauvaise carte au PUT.
- Hardcoder des ids de cards / volumes / lag dans les docs : preferer pointer vers les commandes MCP / `curl`.

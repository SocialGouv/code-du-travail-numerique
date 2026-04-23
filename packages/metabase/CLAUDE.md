# @cdt/metabase — consignes Claude

**Hub central** de tout ce qui concerne Metabase pour le CDTN :

- docs de reference (vues materialisees, dashboards, cards, schema, patterns SQL) dans `docs/` — source de verite git-tracked pour les definitions SQL
- config MCP pour interroger l'instance Metabase (`.mcp.json` a la racine du repo)

## Contexte

Dashboards Metabase pour le CDTN trackant les KPI de personnalisation des contenus.

- Issue principale : SocialGouv/code-du-travail-numerique#7199
- Instance : `https://metabase-cdtn.fabrique.social.gouv.fr`
- Database cible : `OVH PG CDTN` (id 4, PostgreSQL)

### Commandes pour decouvrir l'etat courant

Toutes les listes specifiques (cards, dashboards, MV, tables) sont **volatiles**. Ne les hardcode pas dans les docs : requete les en direct.

```bash
# Lister les databases Metabase (pour trouver l'ID de la DB CDTN)
curl -s -H "X-API-Key: $METABASE_API_KEY" "$METABASE_URL/api/database" | jq '.data[] | {id, name, engine}'

# Lister les dashboards
curl -s -H "X-API-Key: $METABASE_API_KEY" "$METABASE_URL/api/dashboard" | jq '.[] | {id, name, collection_id}'

# Inspecter une carte (SQL, parametres, visualisation)
curl -s -H "X-API-Key: $METABASE_API_KEY" "$METABASE_URL/api/card/<id>" | jq

# Lister les vues materialisees sur la DB
curl -s -X POST -H "X-API-Key: $METABASE_API_KEY" -H "Content-Type: application/json" \
  -d '{"type":"native","database":4,"native":{"query":"SELECT matviewname FROM pg_matviews ORDER BY 1;"}}' \
  "$METABASE_URL/api/dataset" | jq '.data.rows'

# Verifier la fraicheur d'une MV
curl -s -X POST -H "X-API-Key: $METABASE_API_KEY" -H "Content-Type: application/json" \
  -d '{"type":"native","database":4,"native":{"query":"SELECT MAX(action_timestamp)::date AS max_date, CURRENT_DATE - MAX(action_timestamp)::date AS lag_days FROM metabase_model_106;"}}' \
  "$METABASE_URL/api/dataset" | jq '.data.rows'
```

Via MCP (Claude Code, Cursor, Windsurf avec `.mcp.json` configure) : `list_databases`, `list_dashboards`, `list_cards`, `get_card`, `execute_query`.

## Avant de toucher quoi que ce soit

1. **Lire ce fichier** (CLAUDE.md) entierement : regles SQL, process card, anti-patterns, sources de donnees.
2. **Lire `docs/materialized-views.md`** : source de verite des MV (schemas, definitions, ordre de refresh).

## Regles absolues

- **Toujours archiver** (pas supprimer) une carte obsolete : `POST /api/card/:id` avec `archived: true`. La carte va dans la corbeille Metabase et reste restaurable ; Metabase conserve en plus l'historique des revisions (onglet "History" de la carte). Pas besoin de backup local.
- **Toujours verifier la fraicheur** des MV avant d'investiguer un "0 rows" (cf. §Process ci-dessous, point 2).
- **Toujours mettre a jour la doc** quand on modifie une MV ou une card (cf. §Process point 7).

## Map du package

| Chemin                       | Role                                                     | Maintenance                         |
| ---------------------------- | -------------------------------------------------------- | ----------------------------------- |
| `CLAUDE.md` (ce fichier)     | regles IA, process card, sources de donnees, conventions | manuel                              |
| `README.md`                  | installation, MCP                                        | manuel                              |
| `docs/materialized-views.md` | **definitions SQL des MV + patterns d'usage**            | manuel, source de verite versionnee |
| `docs/dashboards.md`         | reference dashboards et cartes                           | manuel                              |
| `docs/models.md`             | models Metabase et patterns SQL                          | manuel                              |
| `docs/schema.md`             | schema DB OVH PG CDTN                                    | manuel                              |

Chaque sous-dossier a son propre `CLAUDE.md`. Pour "ou je trouve X", commencer par `CLAUDE.md` du dossier concerne.

## Process avant TOUTE modification ou creation de carte

> Regle absolue : **les requetes ad-hoc sur `metabase_model_106` (gros volume) sont lentes et fragiles**. Elles font systematiquement du Seq Scan. Toujours preferer une MV / un modele existant.

1. **LIRE `docs/materialized-views.md` ET `docs/models.md` EN PREMIER**. Identifier la MV ou la card-modele dediee au cas d'usage avant d'ecrire une seule ligne de SQL.
2. **Verifier la fraicheur des sources** (commande §"Commandes pour decouvrir l'etat courant" ci-dessus). Si la MV est en retard, signaler le besoin de refresh AVANT d'investiguer un "0 rows".
3. **Si une MV existe pour ton cas d'usage** : l'utiliser. Si une etape ou un evenement manque, mettre a jour la section correspondante de `docs/materialized-views.md` (bloc SQL) puis DROP/CREATE la MV - ne JAMAIS bypass la MV en attaquant `metabase_model_106` directement.
4. **Si AUCUNE MV ne convient** : ajouter une nouvelle section dans `docs/materialized-views.md` avec la definition SQL (CREATE + INDEX), l'appliquer via `/api/dataset` (cf. tip ci-dessous), puis pointer la carte dessus.
5. **Pour remplacer une carte en prod** : creer la nouvelle version, la tester, puis **archiver l'ancienne via `archived: true`**. Ne jamais ecrire "par dessus" une carte en prod sans historique : l'onglet "History" de Metabase + la corbeille sont le canal de rollback.
6. **Apres tout PUT sur une carte, RE-RUN la carte** (`POST /api/card/:id/query`) et verifier que `rows > 0` et que `cols` correspond aux colonnes attendues. Une carte qui parse mais retourne 0 ligne est souvent un probleme de fraicheur (point 2).
7. **Apres toute modification d'une MV ou d'une carte, METTRE A JOUR LES DOCS** :
   - `docs/materialized-views.md` (ajout/maj de section, schema, refresh, **bloc SQL CREATE + INDEX**)
   - `docs/models.md` (chaines de cards, patterns)
   - `docs/dashboards.md` (table des cartes par dashboard)
   - `README.md` si la liste des dashboards/MV change

### Tips API Metabase

- **`POST /api/dataset` accepte les DDL** (DROP, CREATE, REFRESH MATERIALIZED VIEW, CREATE INDEX) **malgre une erreur "L'instruction Select n'a pas produit un ResultSet"**. La DDL est executee cote DB avant que Metabase ne plante en essayant de lire un ResultSet inexistant. Verifier le resultat avec un `SELECT` sur `pg_matviews` / `pg_indexes` / `SELECT MAX(...)`.
- **`REFRESH MATERIALIZED VIEW` sur une grosse MV** peut depasser le timeout HTTP de `/api/dataset`. Dans ce cas il faut un acces direct psql ou une tache planifiee cote infra.
- **PUT sur une carte avec parametres** (`type=date/single`, `required=true`) : bien synchroniser les `template-tags` du `dataset_query.native` avec le tableau `parameters` au niveau de la carte (meme `id`, meme `slug`).
- **Archiver une carte** : `PUT /api/card/:id` avec `{"archived": true}`. Restauration via l'UI Metabase (Corbeille → Unarchive) ou `PUT` avec `archived: false`.
- **Creer une carte** : `POST /api/card` avec `collection_id`, `name`, `display`, `dataset_query`, `visualization_settings`.

### Convention "Custom date range" - parametres `date_debut` / `date_fin`

Toute nouvelle carte qui presente une metrique sur une fenetre temporelle (taux, comptage, ratio) **doit** etre parametree avec deux dates pour permettre a l'utilisateur final de zoomer/comparer des periodes sans toucher au SQL.

#### Pattern SQL

```sql
WITH visits AS (
  SELECT *
  FROM mv_xxx
  WHERE jour >= {{date_debut}}
    AND jour <= {{date_fin}}
)
SELECT ... FROM visits ...;
```

#### Pattern `template-tags` (dans `dataset_query.native`)

```json
"template-tags": {
  "date_debut": {
    "id": "<carte-slug>-date-debut-001",
    "name": "date_debut",
    "display-name": "Date début",
    "type": "date",
    "required": true,
    "default": "<YYYY-MM-DD>"
  },
  "date_fin": {
    "id": "<carte-slug>-date-fin-001",
    "name": "date_fin",
    "display-name": "Date fin",
    "type": "date",
    "required": true,
    "default": "<YYYY-MM-DD>"
  }
}
```

#### Pattern `parameters` (au niveau de la carte)

```json
"parameters": [
  {
    "id": "<carte-slug>-date-debut-001",
    "type": "date/single",
    "target": ["variable", ["template-tag", "date_debut"]],
    "name": "Date début",
    "slug": "date_debut",
    "default": "<YYYY-MM-DD>",
    "required": true
  },
  {
    "id": "<carte-slug>-date-fin-001",
    "type": "date/single",
    "target": ["variable", ["template-tag", "date_fin"]],
    "name": "Date fin",
    "slug": "date_fin",
    "default": "<YYYY-MM-DD>",
    "required": true
  }
]
```

#### Regles

1. **Les `id` doivent etre uniques par carte** (prefixer avec un slug explicite, ex: `bounce-global-date-debut-001`). Si le meme `id` est reutilise sur plusieurs cartes, Metabase lit/ecrit dans la mauvaise carte au moment du PUT.
2. **Les `id` doivent etre identiques entre `template-tags[X].id` et `parameters[X].id`** sur la meme carte.
3. **`required: true`** : sinon la requete echoue avec "value missing" si l'utilisateur n'envoie pas le param.
4. **Default = derniers 30 jours** par convention.
5. **Ordre du SQL** : `WHERE jour >= {{date_debut}} AND jour <= {{date_fin}}` (inclusif des deux cotes). Eviter `BETWEEN` pour rester explicite.
6. **Dashboard parameters** : pour un widget "range" combine, utiliser un parametre dashboard `date/range` mappe sur `date_debut` ET `date_fin`.

### Anti-patterns

- Ecrire `SELECT ... FROM metabase_model_106 WHERE pathname = '...' AND action_eventname IN (...)` sans avoir verifie qu'il n'existe pas deja une MV pour ces filtres -> **toujours lent**.
- Ecraser une carte en prod sans archivage prealable de l'ancienne version.
- Modifier une MV sans mettre a jour la section correspondante de `docs/materialized-views.md` (bloc SQL inclus).
- Dupliquer l'etat courant (listes de cards, volumes, lag) dans les docs : ces chiffres drifent tous les jours. Preferer pointer vers une commande MCP / `curl`.

## Regles de performance SQL

1. **Toujours filtrer sur `action_timestamp`** - la table source est partitionnee hebdomadairement.
2. **Preferer une MV dediee** plutot que `metabase_model_106` brut.
3. **Utiliser `metabase_model_106`** UNIQUEMENT en dernier recours pour les 12 derniers mois (pathname, path_level2, path_level3 deja calcules).
4. **Utiliser `visites_uniques`** pour les comptages de visites par page/mois.
5. **Ne PAS utiliser `matomo_partitioned` directement** sauf si donnees > 1 an necessaires OU si on veut une MV temps-reel (cf. `mv_funnel_il_irc_visits`, `mv_bounce_contributions`).
6. **`path_level2`** pour filtrer par type de contenu : `'contribution'` ou `'outils'`.
7. **`month`** colonne pre-calculee au lieu de `DATE_TRUNC('month', action_timestamp)`.

## Sources de donnees (vue d'ensemble)

| Source                      | Type                            | Fenetre                     | Dependance           |
| --------------------------- | ------------------------------- | --------------------------- | -------------------- |
| `matomo_partitioned`        | table partitionnee hebdomadaire | illimitee                   | source brute         |
| `metabase_model_106`        | MV                              | 12 derniers mois            | `matomo_partitioned` |
| `visites_uniques`           | MV                              | 13 derniers mois            | `metabase_model_106` |
| `mv_perso_weekly`           | MV hebdomadaire                 | periode couverte par source | `metabase_model_106` |
| `mv_kpi_personnalisation`   | MV (DROP/CREATE)                | 12 derniers mois            | `metabase_model_106` |
| `mv_cc_non_traitees`        | MV statique                     | 2025                        | `matomo_partitioned` |
| `mv_funnel_il_irc`          | MV hebdomadaire                 | 12 derniers mois            | `metabase_model_106` |
| `mv_funnel_il_irc_visits`   | MV par visite (temps reel)      | 60 jours glissants          | `matomo_partitioned` |
| `mv_bounce_contributions`   | MV par (visite, contribution)   | 60 jours glissants          | `matomo_partitioned` |
| `commentaires_utilisateurs` | MV                              | 13 derniers mois            | `matomo_partitioned` |

> Les MV **independantes de `metabase_model_106`** (`mv_funnel_il_irc_visits`, `mv_bounce_contributions`, `commentaires_utilisateurs`, `mv_cc_non_traitees`) restent a jour meme si la MV source est figee. C'est volontaire : les cartes "temps reel" ne doivent pas etre bloquees par le retard de la MV source.

Pour les volumes exacts et les schemas detailles : `docs/materialized-views.md`.
Pour la liste des cartes qui consomment chaque MV : `docs/dashboards.md`.

## Refresh des MV

Planification cron **geree cote infra** (Kubernetes CronJob / `pg_cron`) — hors perimetre dev. Voir `docs/materialized-views.md` §"Ordre de refresh des MV" pour le detail.

Resume rapide :

```sql
-- 1. MV source principale (lente, ~minutes - declenche la stale-trace de toutes les MV dependantes)
REFRESH MATERIALIZED VIEW metabase_model_106;

-- 2. mv_kpi_personnalisation : DROP + CREATE (schema fixe, voir docs/materialized-views.md §4)

-- 3. MV simples (REFRESH, rapide)
REFRESH MATERIALIZED VIEW visites_uniques;
REFRESH MATERIALIZED VIEW mv_perso_weekly;
REFRESH MATERIALIZED VIEW mv_funnel_il_irc;            -- depend de metabase_model_106
REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;     -- INDEPENDANT (source matomo_partitioned), cron quotidien
REFRESH MATERIALIZED VIEW mv_bounce_contributions;     -- INDEPENDANT (source matomo_partitioned), cron quotidien
REFRESH MATERIALIZED VIEW commentaires_utilisateurs;   -- INDEPENDANT
```

### Verifier la fraicheur

```sql
SELECT 'metabase_model_106' AS mv, MAX(action_timestamp)::date AS max_date,
       CURRENT_DATE - MAX(action_timestamp)::date AS lag_days FROM metabase_model_106
UNION ALL SELECT 'mv_funnel_il_irc_visits', MAX(jour), CURRENT_DATE - MAX(jour) FROM mv_funnel_il_irc_visits
UNION ALL SELECT 'mv_bounce_contributions', MAX(jour), CURRENT_DATE - MAX(jour) FROM mv_bounce_contributions
UNION ALL SELECT 'mv_funnel_il_irc', MAX(semaine), CURRENT_DATE - MAX(semaine) FROM mv_funnel_il_irc
UNION ALL SELECT 'mv_perso_weekly', MAX(semaine), CURRENT_DATE - MAX(semaine) FROM mv_perso_weekly
UNION ALL SELECT 'mv_kpi_personnalisation', MAX(month), CURRENT_DATE - MAX(month) FROM mv_kpi_personnalisation
UNION ALL SELECT 'visites_uniques', MAX(month), CURRENT_DATE - MAX(month) FROM visites_uniques
UNION ALL SELECT 'commentaires_utilisateurs', MAX(action_timestamp)::date, CURRENT_DATE - MAX(action_timestamp)::date FROM commentaires_utilisateurs
ORDER BY lag_days DESC;
```

Une `lag_days > 7` (sauf pour les MV mensuelles) indique un cron casse cote infra.

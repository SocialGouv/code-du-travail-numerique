# Metabase MCP - Projet CDTN

## Contexte

Dashboards Metabase pour le CDTN (Code du Travail Numerique) trackant les KPI de personnalisation des contenus.

- Issue GitHub : SocialGouv/code-du-travail-numerique#7199
- Instance : `https://metabase-cdtn.fabrique.social.gouv.fr`
- Database : OVH PG CDTN (ID 4, PostgreSQL)
- API : `curl -H "X-API-Key: $METABASE_API_KEY" https://metabase-cdtn.fabrique.social.gouv.fr/api/...`

## Databases

| ID  | Nom             | Engine   |
| --- | --------------- | -------- |
| 1   | Sample Database | h2       |
| 2   | Metabase DB     | postgres |
| 3   | Matomo          | postgres |
| 4   | **OVH PG CDTN** | postgres |

## Process avant TOUTE modification ou creation de carte

> Regle absolue : **les requetes ad-hoc sur `metabase_model_106` (53M lignes) sont lentes et fragiles**. Elles font systematiquement du Seq Scan. Toujours preferer une MV / un modele existant.

1. **LIRE `docs/materialized-views.md` ET `docs/models.md` EN PREMIER**. Identifier la MV ou la card-modele dediee au cas d'usage avant d'ecrire une seule ligne de SQL.
2. **Verifier la fraicheur des sources** (`SELECT MAX(action_timestamp) FROM metabase_model_106;`). Si la MV est en retard, signaler le besoin de refresh AVANT d'investiguer un "0 rows".
3. **Si une MV existe pour ton cas d'usage** : l'utiliser. Si une etape ou un evenement manque, ajouter ce qui manque a la definition (`sql/mv_*.sql`) puis DROP/CREATE la MV - ne JAMAIS bypass la MV en attaquant `metabase_model_106` directement.
4. **Si AUCUNE MV ne convient** : creer une nouvelle MV dediee dans `sql/mv_*.sql`, l'appliquer via `/api/dataset` (cf. tip ci-dessous), creer son index, puis pointer la carte dessus.
5. **Backup obligatoire** : sauvegarder le SQL existant dans `backup/` avant tout PUT sur une carte deja en prod.
6. **Apres tout PUT sur une carte, RE-RUN la carte** (`POST /api/card/:id/query`) et verifier que `rows > 0` et que `cols` correspond aux colonnes attendues. Une carte qui parse mais retourne 0 ligne est souvent un probleme de fraicheur (point 2).
7. **Apres toute modification d'une MV ou d'une carte, METTRE A JOUR LES DOCS** :
   - `docs/materialized-views.md` (ajout/maj de section, schema, refresh)
   - `docs/models.md` (chaines de cards, patterns)
   - `docs/dashboards.md` (table des cartes par dashboard)
   - `AGENTS.md` (table "Sources de donnees", section "Cartes" du dashboard concerne)
   - `README.md` si la liste des dashboards/MV change

### Tips API Metabase

- **`POST /api/dataset` accepte les DDL** (DROP, CREATE, REFRESH MATERIALIZED VIEW, CREATE INDEX) **malgre une erreur "L'instruction Select n'a pas produit un ResultSet"**. La DDL est executee cote DB avant que Metabase ne plante en essayant de lire un ResultSet inexistant. Verifier le resultat avec un `SELECT` sur `pg_matviews` / `pg_indexes` / `SELECT MAX(...)`.
- **`REFRESH MATERIALIZED VIEW` sur une grosse MV** (ex: `metabase_model_106` ~128M lignes) peut depasser le timeout HTTP de `/api/dataset`. Dans ce cas il faut un acces direct psql ou une tache planifiee cote infra.
- **PUT sur une carte avec parametres** (`type=date/single`, `required=true`) : bien synchroniser les `template-tags` du `dataset_query.native` avec le tableau `parameters` au niveau de la carte (meme `id`, meme `slug`).
- **Pour creer une carte** : `POST /api/card` avec `collection_id`, `name`, `display`, `dataset_query`, `visualization_settings`. La carte est creee meme sans liaison de dashboard.

### Convention "Custom date range" - parametres `date_debut` / `date_fin`

Toute nouvelle carte qui presente une metrique sur une fenetre temporelle (taux, comptage, ratio) **doit** etre parametree avec deux dates pour permettre a l'utilisateur final de zoomer/comparer des periodes sans toucher au SQL. C'est la convention utilisee par les cartes 170, 107, 448, 449 (Taux completion IL/IRC) et 450, 451 (Taux de rebond contributions).

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
    "id": "<carte>-date-debut-001",
    "name": "date_debut",
    "display-name": "Date début",
    "type": "date",
    "required": true,
    "default": "2026-03-12"
  },
  "date_fin": {
    "id": "<carte>-date-fin-001",
    "name": "date_fin",
    "display-name": "Date fin",
    "type": "date",
    "required": true,
    "default": "2026-04-10"
  }
}
```

#### Pattern `parameters` (au niveau de la carte)

```json
"parameters": [
  {
    "id": "<carte>-date-debut-001",
    "type": "date/single",
    "target": ["variable", ["template-tag", "date_debut"]],
    "name": "Date début",
    "slug": "date_debut",
    "default": "2026-03-12",
    "required": true
  },
  {
    "id": "<carte>-date-fin-001",
    "type": "date/single",
    "target": ["variable", ["template-tag", "date_fin"]],
    "name": "Date fin",
    "slug": "date_fin",
    "default": "2026-04-10",
    "required": true
  }
]
```

#### Regles

1. **Les `id` doivent etre uniques par carte** (prefixe avec un nom de carte explicite, ex: `bounce-global-date-debut-001`). Si tu utilises le meme `id` sur plusieurs cartes, Metabase lit/ecrit dans la mauvaise carte au moment du PUT.
2. **Les `id` doivent etre identiques entre `template-tags[X].id` et `parameters[X].id`** sur la meme carte, sinon Metabase ne fait pas le lien.
3. **`required: true`** : sinon la requete echoue avec "value missing" si l'utilisateur n'envoie pas le param. La valeur par defaut est appliquee si rien n'est passe.
4. **Default = derniers 30 jours** par convention (ex: aujourd'hui = 2026-04-11 -> default `date_debut=2026-03-12`, `date_fin=2026-04-10`). Mettre a jour les defaults occasionnellement (ils sont statiques, pas dynamiques).
5. **Ordre du SQL** : `WHERE jour >= {{date_debut}} AND jour <= {{date_fin}}` (inclusif des deux cotes). Eviter `BETWEEN` pour rester explicite.
6. **Pour les date range parameters de dashboard** : si la carte est ajoutee a un dashboard, le parametre dashboard peut etre map sur `date_debut` et `date_fin` separement. Pour un picker "range" combine, il faut un parametre dashboard de type `date/range` map sur les deux.

### Anti-patterns

- Ecrire `SELECT ... FROM metabase_model_106 WHERE pathname = '...' AND action_eventname IN (...)` sans avoir verifie qu'il n'existe pas deja une MV pour ces filtres -> **toujours lent**.
- Mettre a jour une carte sans backup du SQL precedent.
- Modifier une MV sans mettre a jour `materialized-views.md` ni `sql/mv_*.sql`.

## Regles de performance SQL

1. **Toujours filtrer sur `action_timestamp`** - partitionnement hebdomadaire
2. **Preferer une MV dediee** (`mv_funnel_il_irc`, `mv_kpi_personnalisation`, `mv_perso_weekly`...) plutot que `metabase_model_106` brut
3. **Utiliser `metabase_model_106`** UNIQUEMENT en dernier recours pour les 12 derniers mois (pathname, path_level2, path_level3 deja calcules)
4. **Utiliser `visites_uniques`** pour les comptages de visites par page/mois
5. **Ne PAS utiliser `matomo_partitioned` directement** sauf si donnees > 1 an necessaires
6. **`path_level2`** pour filtrer par type de contenu : `'contribution'` ou `'outils'`
7. **`month`** colonne pre-calculee au lieu de `DATE_TRUNC('month', action_timestamp)`

## Sources de donnees

| Source                    | Periode                                                                 | Taille           | Colonnes cles                                                                                       |
| ------------------------- | ----------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| `metabase_model_106`      | 12 derniers mois                                                        | ~53M lignes      | pathname, path_level2, path_level3, month                                                           |
| `visites_uniques`         | 13 derniers mois                                                        | -                | idvisit, pathname, month (dedoublonne)                                                              |
| `matomo_partitioned`      | Toute periode                                                           | partitions hebdo | action_url (a parser avec regexp)                                                                   |
| `mv_perso_weekly`         | Pre-agrege                                                              | ~100 lignes      | semaine, type, total_visits, personalized_visits                                                    |
| `mv_kpi_personnalisation` | Pre-agrege                                                              | ~4.3M lignes     | month, content_type, path, idvisit, is_perso, is_cc_non_traitee, is_pas_entreprise, is_renonciation |
| `mv_cc_non_traitees`      | Pre-agrege                                                              | ~800 lignes      | cc_name, nb_utilisateurs, nb_selections                                                             |
| `mv_funnel_il_irc`        | Pre-agrege hebdo (depuis `metabase_model_106`, lent a refresh)          | ~890 lignes      | semaine, simulateur, etape, visites                                                                 |
| `mv_funnel_il_irc_visits` | Pre-agrege par visite 60j (depuis `matomo_partitioned`, **temps reel**) | ~400k lignes     | idvisit, simulateur, jour, s_start..s_results (booleens)                                            |
| `mv_bounce_contributions` | Pre-agrege par (visite, contribution) 60j (depuis `matomo_partitioned`, **temps reel**) | ~1.5M lignes     | idvisit, pathname, jour, has_pageview, has_interaction, has_click_generic, has_click_cc, has_click_sans_cc, has_cc_search |

> Ces MV dediees evitent les Seq Scan sur `metabase_model_106` et `matomo_partitioned`. Elles doivent etre rafraichies en meme temps que `metabase_model_106` (sauf `mv_funnel_il_irc_visits` et `mv_bounce_contributions` qui sont independantes - voir `cron.md`).

## Dashboard 36 - Personnalisation des contenus (#7199)

- Collection : General (29)
- 5 KPI :
  1. Taux personnalisation global (par simulateur + contributions)
  2. Taux personnalisation dans le temps (8 semaines)
  3. Taux renonciation (hors CC non traitee)
  4. Parcours bloques (CC non traitee + pas d'entreprise)
  5. CC non traitees en 2025

### Cartes V2

| Card ID | Nom                                            | KPI   | Display | Source                  |
| ------- | ---------------------------------------------- | ----- | ------- | ----------------------- |
| 435     | Personnalisation - Vue consolidee              | KPI 1 | table   | mv_kpi_personnalisation |
| 436     | Renonciation - Taux global                     | KPI 3 | scalar  | mv_kpi_personnalisation |
| 437     | Personnalisation - Evolution 8 semaines        | KPI 2 | line    | mv_perso_weekly         |
| 438     | Personnalisation - Taux par contribution       | KPI 1 | table   | mv_kpi_personnalisation |
| 439     | Personnalisation - Taux par simulateur         | KPI 1 | table   | mv_kpi_personnalisation |
| 440     | Renonciation - Par contribution (V2)           | KPI 3 | table   | mv_kpi_personnalisation |
| 441     | Parcours bloques - CC non traitee et pas de CC | KPI 4 | table   | mv_kpi_personnalisation |
| 442     | CC non traitees - Volume 2025                  | KPI 5 | table   | mv_cc_non_traitees      |
| 443     | Personnalisation - Vue agregee                 | KPI 1 | table   | mv_kpi_personnalisation |
| 444     | Renonciation - Par simulateur                  | KPI 3 | table   | mv_kpi_personnalisation |

## Cartes "Taux de rebond" Contributions (collection 88, #7136)

| Card ID | Nom                               | Display | Source                  | Parametres                                      |
| ------- | --------------------------------- | ------- | ----------------------- | ----------------------------------------------- |
| 450     | Taux de rebond - Global           | scalar  | mv_bounce_contributions | `date_debut`, `date_fin` (defaut 30 derniers j) |
| 451     | Taux de rebond - Par contribution | table   | mv_bounce_contributions | `date_debut`, `date_fin` (defaut 30 derniers j) |

**Definition du rebond** : visite qui arrive sur une page contribution AVEC bouton "afficher les informations generales" et qui repart **sans aucune interaction** :

- pas de recherche CC (`cc_search`, `cc_select_*`, `click_p1/p2/p3`, `enterprise_*`, `je_n_ai_pas_d_entreprise`)
- pas de clic sur le bouton secondaire generique (`click_afficher_les_informations_générales`)
- pas de clic sur les informations CC (`click_afficher_les_informations_CC` ou `click_afficher_les_informations_sans_CC`)

**Filtre des contributions** : seules les contributions qui ont fire au moins une fois `click_afficher_les_informations_générales` dans la fenetre de la MV (60 jours glissants) sont incluses dans le ratio. Sur 2349 contributions visitees, **41** ont ce bouton (les autres sont CC-specifiques et n'ont pas de reponse generique). Voir issue #7136.

## Cartes "Taux completion" IL et IRC (collections 56 et 53)

| Card ID | Nom                                      | Display | Source                  | Parametres                                           |
| ------- | ---------------------------------------- | ------- | ----------------------- | ---------------------------------------------------- |
| 170     | Taux completion des etapes (IL)          | bar     | mv_funnel_il_irc_visits | `date_debut`, `date_fin` (defaut: 30 derniers jours) |
| 107     | Taux completion des etapes (IRC)         | bar     | mv_funnel_il_irc_visits | `date_debut`, `date_fin` (defaut: 30 derniers jours) |
| 448     | Taux completion des etapes (IL, funnel)  | funnel  | mv_funnel_il_irc_visits | `date_debut`, `date_fin` (defaut: 30 derniers jours) |
| 449     | Taux completion des etapes (IRC, funnel) | funnel  | mv_funnel_il_irc_visits | `date_debut`, `date_fin` (defaut: 30 derniers jours) |

Etapes attendues (post refonte avril 2026) :
`start` -> `info_cc` -> `infos` -> `anciennete` -> `absences` -> `salaires` -> `results`

Les 4 cartes utilisent une logique de **funnel cumulatif** : pour chaque etape N, on compte les visites qui ont fire l'evenement de l'etape N OU d'une etape ulterieure. Cela garantit un funnel monotone meme en presence d'evenements manquants (deploiement recent de `absences`, etapes conditionnelles `infos`/`salaires`, refresh sur etape avancee, ad blocker). Voir `docs/materialized-views.md` §7.

L'evenement `contrat_travail` a ete supprime du front (cf. `IndemniteLicenciementSimulator.tsx` et `IndemniteRuptureCoSimulator.tsx`) mais reste present dans les filtres `IN` de `mv_funnel_il_irc` (la MV hebdo) pour les comparaisons historiques du dashboard 37.

> **Important : `metabase_model_106` est en retard de plusieurs semaines** (max constate le 2026-04-11 : `2026-02-22`). Toute MV qui en depend (dont `mv_funnel_il_irc`) est donc systematiquement en retard. Pour les vues "fenetre glissante temps reel", utiliser `mv_funnel_il_irc_visits` qui tape `matomo_partitioned` directement.
>
> **Date de deploiement de l'etape `absences` : 2026-03-13**. Avant cette date, les visites IL/IRC firaient `salaires`/`results` sans firer `absences`. La logique de funnel cumulatif des cartes 170/107/448/449 absorbe correctement cette discontinuite. Une fois 30+ jours passes (apres le 2026-04-13), un comptage par evenement strict serait egalement coherent.

## Evenements cles

- `click_afficher_les_informations_CC` : Personnalisation reussie (contribution)
- `click_afficher_les_informations_sans_CC` : CC non traitee (contribution)
- `cc_select_traitee` : CC traitee (simulateur)
- `cc_select_non_traitee` : CC non traitee (simulateur)
- `click_p3` (cc_search_type_of_users) : Renonciation (saute l'etape CC)
- `click_je_n_ai_pas_d_entreprise` : Pas d'entreprise

## Refresh des MV

Source de verite : **`cron.md`** (a la racine du package) qui liste tout ce qu'il faut rafraichir manuellement, avec les commandes psql / `/api/dataset` / Kubernetes CronJob pour chaque MV. Voir aussi `docs/materialized-views.md` (section "Ordre de refresh des MV") pour les definitions.

Resume rapide :

```sql
-- 1. MV source principale (lente, ~minutes - declenche la stale-trace de toutes les MV qui en dependent)
REFRESH MATERIALIZED VIEW metabase_model_106;

-- 2. mv_kpi_personnalisation : DROP + CREATE (schema fixe, voir sql/mv_kpi_personnalisation.sql)

-- 3. MV simples (REFRESH, rapide)
REFRESH MATERIALIZED VIEW visites_uniques;
REFRESH MATERIALIZED VIEW mv_perso_weekly;
REFRESH MATERIALIZED VIEW mv_funnel_il_irc;            -- depend de metabase_model_106
REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;     -- INDEPENDANT (source matomo_partitioned), a planifier en cron quotidien
REFRESH MATERIALIZED VIEW mv_bounce_contributions;     -- INDEPENDANT (source matomo_partitioned), a planifier en cron quotidien
REFRESH MATERIALIZED VIEW commentaires_utilisateurs;
```

> **`mv_funnel_il_irc_visits` est independante de `metabase_model_106`** : elle peut etre rafraichie quotidiennement sans devoir d'abord rafraichir la MV source. C'est volontaire (les cartes 170/107/448/449 doivent rester a jour meme si `metabase_model_106` est stale).

## Conventions

- Sauvegarder les requetes existantes dans `backup/` avant toute modification
- Creer les cartes via API (`POST /api/card`, `PUT /api/dashboard/:id`)
- Collection par defaut : 29 (General)
- Prefixe carte : "Personnalisation -" ou "Renonciation -"

# @cdt/metabase — consignes Claude

**Hub central** de tout ce qui concerne Metabase pour le CDTN :

- definitions des vues materialisees (`sql/`)
- glossaire auto-genere des events Matomo (`docs/events.md` + pipeline dans `events/`)
- docs de reference pour les dashboards, cards, schema DB (`docs/`)
- backups locaux des SQL de cards avant modification (`backup/`)
- config MCP pour interroger l'instance Metabase directement depuis l'IA (`.mcp.json` a la racine du repo)

## Contexte

Dashboards Metabase pour le CDTN (Code du Travail Numerique) trackant les KPI de personnalisation des contenus.

- Issue GitHub : SocialGouv/code-du-travail-numerique#7199
- Instance : `https://metabase-cdtn.fabrique.social.gouv.fr`
- Database : OVH PG CDTN (ID 4, PostgreSQL)
- API : `curl -H "X-API-Key: $METABASE_API_KEY" https://metabase-cdtn.fabrique.social.gouv.fr/api/...`

### Databases

| ID  | Nom             | Engine   |
| --- | --------------- | -------- |
| 1   | Sample Database | h2       |
| 2   | Metabase DB     | postgres |
| 3   | Matomo          | postgres |
| 4   | **OVH PG CDTN** | postgres |

## Avant de toucher quoi que ce soit

1. **Lire ce fichier** (CLAUDE.md) entierement : regles SQL, process card, anti-patterns, sources de donnees.
2. **Lire `docs/materialized-views.md`** : source de verite des MV (schemas, definitions, ordre de refresh).
3. **Pour les events Matomo** : lire `docs/events.md` (auto-genere). Si manquant ou stale → `pnpm -F @cdt/metabase events:docs`.

## Regles absolues

- **Ne jamais editer `docs/events.md` a la main.** Il est regenere par `events/generate-events-doc.ts`. Pour modifier la description d'un event → editer `events/events.metadata.yaml`.
- **Toujours backup** le SQL d'une card avant un `PUT /api/card/:id` (cf. `backup/CLAUDE.md`).
- **Toujours verifier la fraicheur** des MV avant d'investiguer un "0 rows" (cf. §Process ci-dessous, point 2).
- **Toujours mettre a jour la doc** quand on modifie une MV, une card ou le code qui fire des events (cf. §Process point 7).

## Map du package

| Chemin | Role | Maintenance |
| --- | --- | --- |
| `CLAUDE.md` (ce fichier) | regles IA, process card, sources de donnees, conventions | manuel |
| `README.md` | installation, MCP, dashboards maintenus | manuel |
| `docs/materialized-views.md` | definitions et patterns des MV | manuel (synchro avec `sql/`) |
| `docs/dashboards.md` | reference dashboards et cartes | manuel |
| `docs/models.md` | models Metabase et patterns SQL | manuel |
| `docs/schema.md` | schema DB OVH PG CDTN | manuel |
| `docs/events.md` | **glossaire exhaustif des events Matomo** | **AUTO-GENERE** — ne jamais editer a la main |
| `events/events.metadata.yaml` | description metier des events | manuel (source pour `docs/events.md`) |
| `events/events.extracted.json` | ground truth extraite du code frontend | auto-genere par `pnpm events:extract` |
| `events/events.schema.ts` | types TS partages du pipeline events | manuel, rare |
| `events/extract-events.ts` | AST scan des tracking.ts → `events.extracted.json` | manuel, rare |
| `events/generate-events-doc.ts` | joint extracted + metadata → `docs/events.md` | manuel, rare |
| `events/check-events-drift.ts` | drift check (precommit + CI) | manuel, rare |
| `sql/` | DDL des MV custom | manuel, source de verite versionnee |
| `backup/` | backups locaux des SQL de cards | **gitignore** (sauf `backup/CLAUDE.md`) |

Chaque sous-dossier a son propre `CLAUDE.md`. Pour "ou je trouve X", commencer par `CLAUDE.md` du dossier concerne.

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
   - `CLAUDE.md` (table "Sources de donnees", section "Cartes" du dashboard concerne)
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
- Editer `docs/events.md` a la main (auto-genere).

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

> Ces MV dediees evitent les Seq Scan sur `metabase_model_106` et `matomo_partitioned`. Les MV dependantes de `metabase_model_106` sont stales quand la MV source est stale ; les MV independantes (`mv_funnel_il_irc_visits`, `mv_bounce_contributions`, `commentaires_utilisateurs`) restent a jour meme quand la source est figee.

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

> **Important : `metabase_model_106` est historiquement en retard** (max constate le 2026-04-11 : `2026-02-22`). Toute MV qui en depend (dont `mv_funnel_il_irc`) est donc systematiquement en retard. Pour les vues "fenetre glissante temps reel", utiliser `mv_funnel_il_irc_visits` qui tape `matomo_partitioned` directement.
>
> **Date de deploiement de l'etape `absences` : 2026-03-13**. Avant cette date, les visites IL/IRC firaient `salaires`/`results` sans firer `absences`. La logique de funnel cumulatif des cartes 170/107/448/449 absorbe correctement cette discontinuite. Une fois 30+ jours passes (apres le 2026-04-13), un comptage par evenement strict serait egalement coherent.

## Evenements Matomo

> **Source de verite : `docs/events.md`** (auto-genere depuis le code frontend et `events/events.metadata.yaml`). Ne JAMAIS editer ce fichier a la main : il est reecrit par `pnpm -F @cdt/metabase events:docs`.

### Pipeline

```text
packages/code-du-travail-frontend/src/modules/**/*.{ts,tsx}  (sauf __tests__/)
  |  (AST scan via ts-morph)
  |  detecte :
  |   - sendEvent({ category, action, name? })            [custom events]
  |   - push(["trackEvent"|"trackSiteSearch"|...], ...)   [events Matomo natifs]
  |   - _paq.push([...]) / paq.push([...])                [events + config]
  v
events/events.extracted.json  ← ground truth technique (category, action, fichier:ligne)
                                 + matomo_config_calls (non-events : consent, A/B, heatmap, etc.)
  +
events/events.metadata.yaml   ← description metier (label, trigger, KPI, dashboards, cards)
  |  (join + groupement par feature_group, avec tracking_method)
  v
docs/events.md                ← glossaire lisible + section "Commandes Matomo (non-events)"
```

> **Note** : `trackAppRouter({...})` dans `modules/config/MatomoAnalytics.tsx` initialise Matomo et emet automatiquement un `trackPageView` a chaque changement de route (pageviews SPA Next.js). Il n'est pas liste comme event car c'est un wrapper de haut niveau de matomo-next.

### Process "j'ajoute / modifie / supprime un event"

1. Modifier le `sendEvent({...})` dans le frontend.
2. `pnpm -F @cdt/metabase events:docs` → regarder si l'event apparait en "Orphelins" ou en "Metadata orpheline" dans `docs/events.md`.
3. Editer `events/events.metadata.yaml` pour documenter le nouvel event (cle `"<category>:<action>"`), ou supprimer la cle qui n'existe plus.
4. Relancer `pnpm events:docs` jusqu'a obtenir 0 orphelin (ou des orphelins dynamiques documentes via wildcard `<category>:*`).
5. Commit `events.metadata.yaml`, `events.extracted.json`, `docs/events.md` ensemble.

### Evenements cles pour les dashboards (resume)

Voir `docs/events.md` pour la liste exhaustive. Les events les plus consommes par les dashboards actuels :

| Event | Signification | Dashboards |
| --- | --- | --- |
| `contribution:click_afficher_les_informations_CC` | Personnalisation reussie (contribution) | 36 |
| `contribution:click_afficher_les_informations_sans_CC` | CC non traitee (contribution) | 36 |
| `contribution:click_afficher_les_informations_générales` | Info generique (contribution) | 88 (rebond) |
| `outil:cc_select_traitée` | CC traitee (simulateur) | 36 |
| `outil:cc_select_non_traitée` | CC non traitee (simulateur) | 36 |
| `outil:view_step_Indemnité de licenciement` | Etape simulateur IL | 37 |
| `outil:view_step_Indemnité de rupture conventionnelle` | Etape simulateur IRC | 37 |
| `cc_search_type_of_users:click_p3` | Renonciation (saute l'etape CC) | 36 |
| `cc_search_type_of_users:click_je_n_ai_pas_d_entreprise` | Pas d'entreprise | 36 |

## Refresh des MV

Planification cron **geree cote infra** (Kubernetes CronJob / `pg_cron`) — hors perimetre dev. Voir `docs/materialized-views.md` §"Ordre de refresh des MV" pour le detail et les commandes psql / `/api/dataset`.

Resume rapide :

```sql
-- 1. MV source principale (lente, ~minutes - declenche la stale-trace de toutes les MV qui en dependent)
REFRESH MATERIALIZED VIEW metabase_model_106;

-- 2. mv_kpi_personnalisation : DROP + CREATE (schema fixe, voir sql/mv_kpi_personnalisation.sql)

-- 3. MV simples (REFRESH, rapide)
REFRESH MATERIALIZED VIEW visites_uniques;
REFRESH MATERIALIZED VIEW mv_perso_weekly;
REFRESH MATERIALIZED VIEW mv_funnel_il_irc;            -- depend de metabase_model_106
REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;     -- INDEPENDANT (source matomo_partitioned), cron quotidien
REFRESH MATERIALIZED VIEW mv_bounce_contributions;     -- INDEPENDANT (source matomo_partitioned), cron quotidien
REFRESH MATERIALIZED VIEW commentaires_utilisateurs;   -- INDEPENDANT
```

> **`mv_funnel_il_irc_visits`, `mv_bounce_contributions` et `commentaires_utilisateurs` sont independantes de `metabase_model_106`** : elles peuvent etre rafraichies quotidiennement sans devoir d'abord rafraichir la MV source. C'est volontaire (les cartes temps reel doivent rester a jour meme si `metabase_model_106` est stale).

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

## Commandes clefs

```bash
# Regenerer docs/events.md depuis le code et events.metadata.yaml
pnpm -F @cdt/metabase events:docs

# Verifier que docs/events.md est synchronise (utilise en CI / precommit)
pnpm -F @cdt/metabase events:check

# Extraire seulement les events (JSON ground truth)
pnpm -F @cdt/metabase events:extract
```

## Automatisation CI / Wiki

- **Precommit** (`husky` -> `pnpm precommit` -> `lerna run precommit` -> `tsx events/check-events-drift.ts`) : bloque le commit si `docs/events.md` est desync.
- **Workflow GitHub** : [`.github/workflows/metabase-events.yml`](../../.github/workflows/metabase-events.yml)
  - `drift-check` (PR) : fail la PR si `docs/events.md` n'est pas a jour.
  - `wiki-sync` (push sur `dev` / `master`) : regenere et pousse les docs vers le [wiki GitHub](https://github.com/SocialGouv/code-du-travail-numerique/wiki) (pages `Matomo-Events`, `Metabase-Dashboards`, `Metabase-Materialized-Views`, `Metabase-Models`, `Metabase-Schema`, `Home`).
  - **Prerequis** : le wiki doit avoir ete initialise (creer une premiere page manuellement). Ensuite tout est auto. Si `secrets.GITHUB_TOKEN` n'a pas les droits d'ecriture sur le wiki, definir `secrets.WIKI_TOKEN` (PAT avec scope `repo`).

## Conventions

- Sauvegarder les requetes existantes dans `backup/` avant toute modification de card
- Creer les cartes via API (`POST /api/card`, `PUT /api/dashboard/:id`)
- Collection par defaut : 29 (General)
- Prefixe carte : "Personnalisation -" ou "Renonciation -"

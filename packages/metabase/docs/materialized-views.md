<!-- markdownlint-disable MD024 -->
<!-- MD024 desactive : les sous-titres "Schema", "Definition SQL", "Quand l'utiliser" se repetent
     intentionnellement sous chaque MV pour garder une structure parallele. -->

# Vues Materialisees (Materialized Views)

9 vues materialisees dans le schema `public` de la DB OVH PG CDTN.

---

## 1. `metabase_model_106` - Matomo Enriched

**Role** : Cache pre-agrège des donnees Matomo avec colonnes calculees (`pathname`, `path_level2`, `path_level3`, `month`).

**Donnees** : Derniere annee glissante (filtrage sur `action_timestamp >= date_trunc('month', CURRENT_DATE - interval '1 year')`).

**Refresh** : `REFRESH MATERIALIZED VIEW metabase_model_106;`

### Schema (15 colonnes)

| Colonne | Type source | Calcul |
|---|---|---|
| `action_id` | text | Direct |
| `idvisit` | text | Direct |
| `action_type` | text | Direct |
| `action_eventcategory` | text | Direct |
| `action_eventaction` | text | Direct |
| `action_eventname` | text | Direct |
| `action_eventvalue` | numeric | Direct |
| `action_timestamp` | timestamptz | Direct |
| `month` | date | `date_trunc('month', action_timestamp)::date` |
| `action_url` | text | Direct |
| `referrertype` | text | Direct |
| `referrername` | text | Direct |
| **`pathname`** | text | `substring(action_url, 'https?://[^/]+(/[^?#]*)')` |
| **`path_level2`** | text | `split_part(pathname, '/', 2)` (ex: `contribution`, `outils`) |
| **`path_level3`** | text | `split_part(pathname, '/', 3)` (ex: `heures-supplementaires`) |

### Definition SQL

```sql
SELECT action_id,
    idvisit,
    action_type,
    action_eventcategory,
    action_eventaction,
    action_eventname,
    action_eventvalue,
    action_timestamp,
    (date_trunc('month', action_timestamp))::date AS month,
    action_url,
    referrertype,
    referrername,
    substring(action_url, 'https?://[^/]+(/[^?#]*)') AS pathname,
    split_part(substring(action_url, 'https?://[^/]+(/[^?#]*)'), '/', 2) AS path_level2,
    split_part(substring(action_url, 'https?://[^/]+(/[^?#]*)'), '/', 3) AS path_level3
FROM matomo_partitioned
WHERE action_timestamp >= date_trunc('month', CURRENT_DATE - interval '1 year');
```

### Quand l'utiliser

- Requetes sur les 12 derniers mois
- Besoin de `pathname` (plus propre que de parser `action_url`)
- Besoin de `path_level2` / `path_level3` pour grouper par type de contenu
- **Ne PAS utiliser** pour des donnees plus vieilles qu'1 an

---

## 2. `visites_uniques`

**Role** : Liste dedoublonnee des visites par chemin et par mois.

**Donnees** : Derniers ~13 mois.

**Refresh** : `REFRESH MATERIALIZED VIEW visites_uniques;`

### Schema (3 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `idvisit` | text | ID visite unique |
| `pathname` | text | Chemin de la page |
| `month` | date | Mois (tronque) |

### Definition SQL

```sql
SELECT DISTINCT idvisit, pathname, month
FROM metabase_model_106
WHERE month >= date_trunc('month', CURRENT_DATE - interval '1 year 1 month');
```

### Quand l'utiliser

- Compter les visites uniques par page/mois
- Calculer des taux (visites uniques qui atteignent une etape / total visites uniques)
- Cross-join avec d'autres donnees pour des ratios

---

## 3. `commentaires_utilisateurs`

**Role** : Feedbacks utilisateurs agrèges (suggestion + categorie + feedback en une ligne).

**Donnees** : Derniers ~13 mois. Filtre sur `action_eventcategory` commencant par `feedback_`.

**Refresh** : `REFRESH MATERIALIZED VIEW commentaires_utilisateurs;`

### Schema (7 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `action_id` | text | ID de l'action |
| `feedback_suggestion` | text | Texte du feedback |
| `pathname` | text | Chemin de la page |
| `feedback` | text | Action feedback (depuis `feedback` category) |
| `feedback_category` | text | Categorie de feedback (depuis `feedback_category` category) |
| `idvisit` | text | ID visite |
| `action_timestamp` | timestamptz | Horodatage |

### Definition SQL

```sql
WITH feedbacks AS (
    SELECT action_id,
        substring(action_url, 'https?://[^/]+(/[^?#]*)') AS pathname,
        idvisit, action_timestamp, action_eventcategory, action_eventaction, action_type
    FROM matomo_partitioned
    WHERE split_part(action_eventcategory, '_', 1) = 'feedback'
      AND action_timestamp >= date_trunc('month', CURRENT_DATE - interval '1 year 1 month')
)
SELECT action_id,
    action_eventaction AS feedback_suggestion,
    pathname,
    (SELECT f.action_eventaction FROM feedbacks f
     WHERE f.action_eventcategory = 'feedback'
       AND f.idvisit = fs.idvisit
       AND date_trunc('hour', f.action_timestamp) = date_trunc('hour', fs.action_timestamp)
     LIMIT 1) AS feedback,
    (SELECT f.action_eventaction FROM feedbacks f
     WHERE f.action_eventcategory = 'feedback_category'
       AND f.idvisit = fs.idvisit
       AND date_trunc('hour', f.action_timestamp) = date_trunc('hour', fs.action_timestamp)
     LIMIT 1) AS feedback_category,
    idvisit, action_timestamp
FROM feedbacks fs
WHERE action_type = 'event' AND action_eventcategory = 'feedback_suggestion'
ORDER BY action_timestamp DESC;
```

---

## 4. `mv_kpi_personnalisation` - KPI Personnalisation (dediee)

**Role** : Pre-agrege les evenements cibles de personnalisation par visite dedupliquee. Evite les Seq Scan sur `metabase_model_106` (53M lignes) pour les cartes du dashboard 36.

**Donnees** : Derniere annee glissante (source : `metabase_model_106`).

**Taille** : ~4.3M lignes, ~446 MB.

**Refresh** : `DROP MATERIALIZED VIEW + CREATE` (non REFRESHABLE car schema fixe). Requete dans `sql/mv_kpi_personnalisation.sql`.

**Indexes** :
- `idx_mvkpi_month_type` : `(month, content_type)`
- `idx_mvkpi_month_type_path` : `(month, content_type, path)`
- `idx_mvkpi_idvisit` : `(idvisit)`

**Cartes utilisees** : 435, 436, 438, 439, 440, 441, 443, 444 (KPI 1, 3, 4).

### Schema (8 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `month` | date | Mois de l'evenement |
| `content_type` | text | `'contribution'`, `'simulateur'` ou `'cc_search'` |
| `path` | text | Chemin (pathname ou action_eventname selon le type) |
| `idvisit` | text | ID visite (deduplique par month/content_type/path) |
| `is_perso` | boolean | L'utilisateur a obtenu une reponse personnalisee |
| `is_cc_non_traitee` | boolean | L'utilisateur a rencontre une CC non traitee |
| `is_pas_entreprise` | boolean | L'utilisateur a declare ne pas avoir d'entreprise |
| `is_renonciation` | boolean | L'utilisateur a renonce a chercher sa CC (click_p3) |

### Logique de deduplication

Chaque ligne represente une visite unique (idvisit) pour un (month, content_type, path) donne. Les booleens sont calcules via `BOOL_OR` sur les evenements de la visite :
- **contribution** : regroupe `click_afficher_les_informations_CC`, `click_afficher_les_informations_sans_CC`, `click_afficher_les_informations_generales`
- **simulateur** : regroupe `cc_select_traitée`, `cc_select_non_traitée`
- **cc_search** : regroupe `click_p1`, `click_p2`, `click_p3`, `click_je_n_ai_pas_d_entreprise`, `select_je_n_ai_pas_d_entreprise`

### Definition SQL

Voir `sql/mv_kpi_personnalisation.sql` pour la requete complete de creation.

### Quand l'utiliser

- Toutes les cartes du dashboard 36 sauf Evolution 8 semaines (437) et CC non traitees 2025 (442)
- Calcul de taux de personnalisation, renonciation, parcours bloques
- Requetes filtrees sur `month = (SELECT MAX(month) FROM mv_kpi_personnalisation)`

---

## 5. `mv_perso_weekly` - Evolution 8 semaines (dediee)

**Role** : Pre-agrege les stats de personnalisation par semaine pour le graphique d'evolution (KPI 2).

**Donnees** : Toute la periode couverte par `metabase_model_106`.

**Taille** : ~100 lignes.

**Refresh** : `REFRESH MATERIALIZED VIEW mv_perso_weekly;`

**Cartes utilisees** : 437 (KPI 2 - Evolution 8 semaines).

### Schema (4 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `semaine` | date | Debut de semaine (`DATE_TRUNC('week', action_timestamp)::date`) |
| `type` | text | `'contribution'` ou `'simulateur'` |
| `total_visits` | bigint | Nombre de visites uniques |
| `personalized_visits` | bigint | Nombre de visites personnalisees |

### Definition SQL

```sql
CREATE MATERIALIZED VIEW mv_perso_weekly AS
SELECT
    DATE_TRUNC('week', action_timestamp)::date AS semaine,
    CASE WHEN action_eventaction LIKE 'cc_select%' THEN 'simulateur' ELSE 'contribution' END AS type,
    COUNT(DISTINCT idvisit) AS total_visits,
    COUNT(DISTINCT CASE WHEN action_eventaction IN ('click_afficher_les_informations_CC', 'cc_select_traitée') THEN idvisit END) AS personalized_visits
FROM metabase_model_106
WHERE action_type = 'event'
  AND action_eventaction IN (
    'click_afficher_les_informations_CC',
    'click_afficher_les_informations_sans_CC',
    'click_afficher_les_informations_générales',
    'cc_select_traitée',
    'cc_select_non_traitée'
  )
GROUP BY 1, 2;
```

---

## 6. `mv_funnel_il_irc` - Funnel IL / IRC (dediee)

**Role** : Pre-agrege par semaine, simulateur, etape les visites uniques sur les funnels Indemnite Licenciement (IL) et Indemnite Rupture Conventionnelle (IRC). Evite les Seq Scan sur `metabase_model_106` (53M lignes) pour les cartes des dashboards 37 et des sous-collections "Taux completion" (53 et 56).

**Donnees** : Toute la periode couverte par `metabase_model_106` (12 derniers mois glissants).

**Taille** : ~890 lignes, requetes < 200 ms (vs 188 s en attaquant `metabase_model_106` directement).

**Refresh** : `REFRESH MATERIALIZED VIEW mv_funnel_il_irc;` (refresh simple, pas de DROP/CREATE necessaire).

**Indexes** :
- `idx_mv_funnel_il_irc_semaine` : `(semaine, simulateur, etape)`

**Cartes utilisees** :

- Dashboard 37 (Funnel IL/IRC, #7202) : cartes 445, 446, 447

> Les cartes 170 et 107 (Taux completion IL/IRC, collections 56 et 53) **ne consomment plus cette MV** depuis le 2026-04-11. Elles utilisent `mv_funnel_il_irc_visits` (cf. §7) qui est independante de `metabase_model_106` et donc en temps reel.

### Schema (4 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `semaine` | date | Debut de semaine ISO (`DATE_TRUNC('week', action_timestamp)::date`) |
| `simulateur` | text | `'indemnite-licenciement'` ou `'indemnite-rupture-conventionnelle'` (= `path_level3`) |
| `etape` | text | Nom de l'etape (= `action_eventname`) |
| `visites` | bigint | Nombre de visites uniques (`COUNT(DISTINCT idvisit)`) |

### Etapes trackees

| Etape | Statut | Apparition |
|---|---|---|
| `start` | Active | Toujours |
| `info_cc` | Active | Toujours |
| `infos` | Active | Apres refonte du 2025-03-13 |
| `anciennete` | Active | Toujours |
| `absences` | Active | Deploye le **2026-03-13** (avant cette date, les visites n'emettent pas l'evenement) |
| `salaires` | Active | Toujours |
| `results` | Active | Toujours |
| `results_ineligible` | Active | Toujours |
| `contrat_travail` | Legacy | Avant refonte du 2025-03-13 uniquement, supprime du front mais conserve dans la MV pour les comparaisons historiques |

> Toute modification de la liste des etapes (front + DB) implique de mettre a jour `sql/mv_funnel_il_irc.sql` puis de relancer un DROP/CREATE de la MV pour rafraichir le filtre `IN`.

### Definition SQL

Voir `sql/mv_funnel_il_irc.sql`.

```sql
SELECT
  DATE_TRUNC('week', action_timestamp)::date AS semaine,
  path_level3 AS simulateur,
  action_eventname AS etape,
  COUNT(DISTINCT idvisit) AS visites
FROM metabase_model_106
WHERE path_level3 IN ('indemnite-licenciement','indemnite-rupture-conventionnelle')
  AND action_eventcategory = 'outil'
  AND action_eventaction LIKE 'view_step_%'
  AND action_eventname IN (
    'start','contrat_travail','info_cc',
    'anciennete','absences','salaires','infos','results','results_ineligible'
  )
GROUP BY 1, 2, 3;
```

### Quand l'utiliser

- Toutes les cartes "Funnel IL/IRC" et "Taux completion" pour les simulateurs IL et IRC
- Calcul de fenetres glissantes par semaine (4-5 semaines pour ~30 jours)
- **Ne PAS attaquer `metabase_model_106`** pour ces simulateurs : utiliser cette MV

### Pattern de fenetre glissante 30 jours

```sql
WHERE simulateur = 'indemnite-licenciement'
  AND semaine >= DATE_TRUNC('week', CURRENT_DATE - INTERVAL '30 day')
  AND semaine < DATE_TRUNC('week', CURRENT_DATE)
```

> Granularite hebdomadaire : la fenetre couvre 4 a 5 semaines completes selon la position dans la semaine courante. La precision exacte au jour pres n'est pas atteignable sans changer la granularite de la MV.

---

## 7. `mv_funnel_il_irc_visits` - Funnel IL/IRC par visite (dediee)

**Role** : Pre-agrege une ligne PAR VISITE (idvisit) pour les funnels IL et IRC sur les 60 derniers jours, avec un flag booleen par etape. Permet aux cartes "Taux completion des etapes" (cards 170, 107, 448, 449) de calculer un funnel **cumulatif et monotone** sur une fenetre temporelle parametrable.

**Pourquoi cette MV** :
- `mv_funnel_il_irc` depend de `metabase_model_106` qui est rafraichi rarement (~mensuel) et donc systematiquement en retard pour une fenetre courante.
- Cette MV tape directement `matomo_partitioned` (temps reel).
- Une ligne par visite (avec flags par etape) permet une logique de funnel cumulatif robuste : "etape N atteinte" = "a fire l'evenement de l'etape N OU d'une etape ulterieure". Cette logique reste monotone meme quand des evenements manquent (deploiement recent d'une nouvelle etape, ad blocker, deep-link, etape conditionnellement masquee).

**Donnees** : 60 derniers jours, source : `matomo_partitioned`.

**Taille** : ~400-500k lignes (60j x ~3-5k visites/jour x 2 simulateurs).

**Refresh** : `REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;` -- a planifier en cron quotidien.

**Indexes** :
- `idx_mv_funnel_il_irc_visits_jour` : `(simulateur, jour)`

**Cartes utilisees** :
- 170 : Taux completion des etapes (IL, bar) - collection 56
- 107 : Taux completion des etapes (IRC, bar) - collection 53
- 448 : Taux completion des etapes (IL, funnel) - collection 56
- 449 : Taux completion des etapes (IRC, funnel) - collection 53

### Schema (10 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `idvisit` | text | ID de la visite Matomo |
| `simulateur` | text | `'indemnite-licenciement'` ou `'indemnite-rupture-conventionnelle'` |
| `jour` | date | Date du premier evenement de la visite sur le simulateur |
| `s_start` | bool | A vu l'etape Introduction (`view_step_*` name=`start`) |
| `s_info_cc` | bool | A vu l'etape Convention collective |
| `s_infos` | bool | A vu l'etape Informations (peut etre conditionnellement masquee) |
| `s_anciennete` | bool | A vu l'etape Anciennete |
| `s_absences` | bool | A vu l'etape Absences (ajoutee le 2026-03-13) |
| `s_salaires` | bool | A vu l'etape Salaires (peut etre conditionnellement masquee) |
| `s_results` | bool | A vu l'etape Indemnite (resultat) |

### Definition SQL

Voir `sql/mv_funnel_il_irc_visits.sql`.

```sql
SELECT
  idvisit,
  CASE
    WHEN action_url LIKE '%/outils/indemnite-licenciement%' THEN 'indemnite-licenciement'
    WHEN action_url LIKE '%/outils/indemnite-rupture-conventionnelle%' THEN 'indemnite-rupture-conventionnelle'
  END AS simulateur,
  MIN(action_timestamp)::date AS jour,
  BOOL_OR(action_eventname = 'start')      AS s_start,
  BOOL_OR(action_eventname = 'info_cc')    AS s_info_cc,
  BOOL_OR(action_eventname = 'infos')      AS s_infos,
  BOOL_OR(action_eventname = 'anciennete') AS s_anciennete,
  BOOL_OR(action_eventname = 'absences')   AS s_absences,
  BOOL_OR(action_eventname = 'salaires')   AS s_salaires,
  BOOL_OR(action_eventname = 'results')    AS s_results
FROM matomo_partitioned
WHERE action_timestamp >= CURRENT_DATE - INTERVAL '60 day'
  AND action_timestamp < CURRENT_DATE
  AND action_type = 'event'
  AND action_eventcategory = 'outil'
  AND action_eventaction LIKE 'view_step_%'
  AND action_eventname IN ('start','info_cc','infos','anciennete','absences','salaires','results')
  AND (action_url LIKE '%/outils/indemnite-licenciement%'
    OR action_url LIKE '%/outils/indemnite-rupture-conventionnelle%')
GROUP BY 1, 2;
```

### Pattern funnel cumulatif parametre

```sql
WITH visits AS (
  SELECT * FROM mv_funnel_il_irc_visits
  WHERE simulateur = 'indemnite-licenciement'
    AND s_start = true
    AND jour >= {{date_debut}}
    AND jour <= {{date_fin}}
),
counts(action_eventname, idx, nombre) AS (
  SELECT 'start',      1, COUNT(*) FROM visits
  UNION ALL SELECT 'info_cc',    2, COUNT(*) FILTER (WHERE s_info_cc OR s_infos OR s_anciennete OR s_absences OR s_salaires OR s_results) FROM visits
  UNION ALL SELECT 'infos',      3, COUNT(*) FILTER (WHERE s_infos OR s_anciennete OR s_absences OR s_salaires OR s_results) FROM visits
  UNION ALL SELECT 'anciennete', 4, COUNT(*) FILTER (WHERE s_anciennete OR s_absences OR s_salaires OR s_results) FROM visits
  UNION ALL SELECT 'absences',   5, COUNT(*) FILTER (WHERE s_absences OR s_salaires OR s_results) FROM visits
  UNION ALL SELECT 'salaires',   6, COUNT(*) FILTER (WHERE s_salaires OR s_results) FROM visits
  UNION ALL SELECT 'results',    7, COUNT(*) FILTER (WHERE s_results) FROM visits
)
SELECT c.action_eventname, c.nombre,
  ROUND(100.0 * c.nombre / NULLIF((SELECT nombre FROM counts WHERE idx=1), 0))::int AS ratio
FROM counts c ORDER BY c.idx;
```

### Quand l'utiliser vs `mv_funnel_il_irc`

| Cas d'usage | Utiliser |
|---|---|
| Funnel temps reel parametre par dates (cards 170, 107, 448, 449) | `mv_funnel_il_irc_visits` |
| Funnel hebdomadaire historique (12 mois) | `mv_funnel_il_irc` |
| Comparaison avant/apres une refonte (dashboard 37) | `mv_funnel_il_irc` |

### Pourquoi un funnel cumulatif et pas un comptage par evenement

Un comptage par evenement (`COUNT visites WHERE s_etape`) suppose que tous les evenements sont fires de facon fiable. En pratique, ce n'est pas le cas :
- Une nouvelle etape (ex: `absences` deployee le 2026-03-13) n'a pas d'evenements pour les visites pre-deploiement -> le comptage strict d'`absences` est plus bas que celui de `salaires`/`results` sur les fenetres a cheval sur le deploiement.
- Une etape conditionnellement masquee (`infos`, `salaires`) n'emet pas d'evenement quand elle est masquee -> son comptage est plus bas que prevu.
- Un user qui refresh la page sur une etape avancee ne re-fire pas les evenements des etapes precedentes.

La logique cumulative ("a vu l'etape N OU une etape ulterieure") evite ces faux negatifs en faisant l'hypothese (raisonnable) qu'une visite qui a atteint l'etape N+1 a forcement franchi l'etape N. Le funnel devient strictement monotone par construction.

---

## 8. `mv_bounce_contributions` - Taux de rebond contributions (dediee)

**Role** : Pre-agrege une ligne par couple (visite, contribution visitee) pour le calcul du taux de rebond des contributions du CDTN. Permet aux cartes "Taux de rebond" (450, 451) de calculer le pourcentage de visites qui arrivent sur une contribution avec bouton "afficher les informations generales" et qui repartent **sans aucune interaction**. Issue #7136.

**Pourquoi cette MV** :
- Source `matomo_partitioned` directement (temps reel, **independant** de `metabase_model_106` et de son retard).
- Granularite par (idvisit, pathname) avec un flag booleen par type d'interaction -> permet de calculer le rebond avec une seule requete simple sur une fenetre temporelle parametrable.
- Filtre optimise sur `action_url LIKE '%/contribution/%'` pour eviter de scanner toute la table.

**Donnees** : 60 derniers jours, source : `matomo_partitioned`.

**Taille** : ~1.5M lignes (60j x ~10k visites/jour x ~3 contributions visitees/visite en moyenne).

**Refresh** : `REFRESH MATERIALIZED VIEW mv_bounce_contributions;` -- a planifier en cron quotidien.

**Indexes** :

- `idx_mv_bounce_contributions_jour` : `(jour, pathname)`
- `idx_mv_bounce_contributions_path` : `(pathname)`

**Cartes utilisees** :

- 450 : Taux de rebond - Global (scalar) - collection 88
- 451 : Taux de rebond - Par contribution (table) - collection 88

### Schema (9 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `idvisit` | text | ID de la visite Matomo |
| `pathname` | text | Chemin de la contribution (`/contribution/...`, query string strippe) |
| `jour` | date | Date du premier evenement de la visite sur cette contribution |
| `has_pageview` | bool | A vu la page (`action_type = 'action'`) |
| `has_interaction` | bool | A fait au moins une interaction (toute combinaison des autres flags) |
| `has_click_generic` | bool | A clique sur "afficher les informations generales" |
| `has_click_cc` | bool | A clique sur "afficher les informations CC" (parcours personnalise reussi) |
| `has_click_sans_cc` | bool | A clique sur "afficher les informations sans ma CC" |
| `has_cc_search` | bool | A interagi avec la recherche de CC (`cc_search`, `cc_select_*`, `click_p1/p2/p3`, `enterprise_*`, `je_n_ai_pas_d_entreprise`) |

### Definition SQL

Voir `sql/mv_bounce_contributions.sql`.

```sql
WITH contrib_actions AS (
  SELECT
    idvisit,
    substring(action_url, 'https?://[^/]+(/[^?#]*)') AS pathname,
    DATE_TRUNC('day', action_timestamp)::date AS jour,
    action_type, action_eventcategory, action_eventaction
  FROM matomo_partitioned
  WHERE action_timestamp >= CURRENT_DATE - INTERVAL '60 day'
    AND action_timestamp < CURRENT_DATE
    AND action_url LIKE '%/contribution/%'
    AND substring(action_url, 'https?://[^/]+(/[^?#]*)') LIKE '/contribution/%'
)
SELECT
  idvisit, pathname, MIN(jour) AS jour,
  BOOL_OR(action_type = 'action') AS has_pageview,
  BOOL_OR(action_type = 'event' AND (
    action_eventcategory IN ('contribution','cc_search','cc_search_type_of_users','cc_select_p1','cc_select_p2','enterprise_search','enterprise_select')
    OR action_eventaction IN ('click_p1','click_p2','click_p3','click_je_n_ai_pas_d_entreprise','select_je_n_ai_pas_d_entreprise',
      'click_afficher_les_informations_CC','click_afficher_les_informations_sans_CC',
      'click_afficher_les_informations_générales','click_afficher_les_informations_generales')
  )) AS has_interaction,
  BOOL_OR(action_eventaction IN ('click_afficher_les_informations_générales','click_afficher_les_informations_generales')) AS has_click_generic,
  BOOL_OR(action_eventaction = 'click_afficher_les_informations_CC') AS has_click_cc,
  BOOL_OR(action_eventaction = 'click_afficher_les_informations_sans_CC') AS has_click_sans_cc,
  BOOL_OR(
    action_eventcategory IN ('cc_search','cc_search_type_of_users','cc_select_p1','cc_select_p2','enterprise_search','enterprise_select')
    OR action_eventaction IN ('click_p1','click_p2','click_p3','click_je_n_ai_pas_d_entreprise','select_je_n_ai_pas_d_entreprise')
  ) AS has_cc_search
FROM contrib_actions
GROUP BY idvisit, pathname;
```

### Pattern : taux de rebond global (filtre = contributions avec bouton generique)

```sql
WITH contribs_avec_generique AS (
  SELECT DISTINCT pathname FROM mv_bounce_contributions WHERE has_click_generic
),
filtered AS (
  SELECT v.* FROM mv_bounce_contributions v
  INNER JOIN contribs_avec_generique g ON g.pathname = v.pathname
  WHERE v.has_pageview
    AND v.jour >= {{date_debut}}
    AND v.jour <= {{date_fin}}
)
SELECT
  COUNT(*) AS total_visites,
  COUNT(*) FILTER (WHERE NOT has_interaction) AS bounces,
  ROUND(100.0 * COUNT(*) FILTER (WHERE NOT has_interaction) / NULLIF(COUNT(*), 0), 1) AS taux_rebond
FROM filtered;
```

### Pourquoi filtrer sur les contributions avec bouton generique

Sur ~2349 contributions visitees, **41 seulement** ont un bouton "afficher les informations generales" (donc une reponse non-personnalisee disponible). Les autres sont CC-specifiques (ex: `/contribution/3248-quel-est-le-salaire-minimum`) et ne peuvent pas etre "rebondies" au sens du KPI : le user n'a aucun choix autre que de chercher sa CC.

Le filtre `pathname IN (SELECT DISTINCT pathname FROM mv_bounce_contributions WHERE has_click_generic)` identifie automatiquement ces 41 contributions en se basant sur l'historique d'evenements (toute contribution qui a fire au moins une fois `click_afficher_les_informations_générales` dans la fenetre 60j).

> Si une nouvelle contribution avec bouton generique est ajoutee mais n'a pas encore de clic dans la fenetre, elle sera **manquee** par le filtre. Le filtre est probabiliste mais robuste apres quelques jours d'usage.

### Definition du "rebond"

Une visite est consideree comme un rebond sur une contribution si :

1. Elle a vu la page (`has_pageview = true`) sur une contribution avec bouton generique
2. ET elle n'a fait **aucune** interaction (`has_interaction = false`) :
   - pas de recherche CC
   - pas de clic sur le bouton secondaire generique
   - pas de clic sur les informations CC ou sans-CC

Voir issue [#7136](https://github.com/SocialGouv/code-du-travail-numerique/issues/7136) pour le contexte produit.

---

## 9. `mv_cc_non_traitees` - CC non traitees 2025 (dediee)

**Role** : Pre-agrege les selections de CC non traitees par nom de CC pour l'annee 2025.

**Donnees** : Annee 2025 (source : `matomo_partitioned`).

**Taille** : ~800 lignes, ~80 KB.

**Refresh** : Statique (donnees 2025). Pas besoin de rafraichir.

**Cartes utilisees** : 442 (KPI 5 - CC non traitees 2025).

### Schema (3 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `cc_name` | text | Nom/ID de la convention collective |
| `nb_utilisateurs` | bigint | Nombre d'utilisateurs distincts |
| `nb_selections` | bigint | Nombre total de selections |

### Definition SQL

```sql
CREATE MATERIALIZED VIEW mv_cc_non_traitees AS
SELECT action_eventname AS cc_name,
    COUNT(DISTINCT idvisit) AS nb_utilisateurs,
    COUNT(*) AS nb_selections
FROM matomo_partitioned
WHERE action_type = 'event' AND action_eventcategory = 'outil'
  AND action_eventaction = 'cc_select_non_traitée'
  AND action_eventname IS NOT NULL AND action_eventname != ''
  AND action_timestamp >= '2025-01-01' AND action_timestamp < '2026-01-01'
GROUP BY action_eventname;
```

---

## Ordre de refresh des MV

```sql
-- 1. MV source principale (recompute les donnees brutes)
REFRESH MATERIALIZED VIEW metabase_model_106;

-- 2. MV dediees qui dependent de metabase_model_106
-- mv_kpi_personnalisation : DROP + CREATE (voir sql/mv_kpi_personnalisation.sql)
DROP MATERIALIZED VIEW IF EXISTS mv_kpi_personnalisation;
-- ... coller la requete CREATE depuis 06_mv_kpi_personnalisation.sql ...

-- 3. MV simples (REFRESH)
REFRESH MATERIALIZED VIEW visites_uniques;
REFRESH MATERIALIZED VIEW mv_perso_weekly;
REFRESH MATERIALIZED VIEW mv_funnel_il_irc;
REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;
REFRESH MATERIALIZED VIEW mv_bounce_contributions;
REFRESH MATERIALIZED VIEW commentaires_utilisateurs;
-- mv_cc_non_traitees est statique, pas de refresh necessaire
```

---

## Autres vues (test)

- `test_view_2` : `SELECT 1` (test)
- `mv_test_bidon` : Table de test avec valeurs statiques

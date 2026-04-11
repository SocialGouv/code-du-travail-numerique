# Modeles Metabase et Patterns Optimises

## Modeles Metabase (100 modeles / datasets)

### Arborescence des collections (76 collections)

```
root (Nos analyses)
├── 2: Examples (cards Sample Database)
├── 14: CDTN
│   ├── 16: Outils
│   │   ├── 19: Indemnite rupture conventionnelle
│   │   │   ├── 50: Rapport mensuel
│   │   │   ├── 51: Satisfaction
│   │   │   ├── 53: Taux completion
│   │   │   └── 85: Satisfaction Top 100
│   │   ├── 20: Indemnite licenciement
│   │   │   ├── 54: Rapport mensuel
│   │   │   ├── 55: Satisfaction
│   │   │   ├── 56: Taux completion
│   │   │   └── 84: Satisfaction Top 100
│   │   ├── 21: Preavis licenciement (69-71)
│   │   ├── 22: Preavis demission (63-65)
│   │   ├── 23: Indemnite precarite (57-59)
│   │   ├── 24: Heures recherche emploi (60-62)
│   │   ├── 25: Preavis depart retraite (66-68)
│   │   └── 79: Trouver convention collective
│   │       ├── 80: Satisfaction
│   │       ├── 81: Popularite
│   │       └── 82: Taux completion
│   ├── 29: General
│   │   ├── 31: Satisfaction
│   │   ├── 32: Popularite
│   │   └── 33: Rapport mensuel
│   ├── 34: Contributions
│   │   ├── 35: Popularite
│   │   ├── 36: Rapport mensuel
│   │   ├── 37: Satisfaction
│   │   └── 83: Taux completion
│   ├── 38: Informations (39-41)
│   ├── 42: Modeles de documents (43-45)
│   ├── 46: Convention collectives (47-49)
│   ├── 73: Quoi de neuf (74-75)
│   └── 76: Infographies (77-78)
└── Collections personnelles (4-10, 26, 72, 86-87, etc.)
```

---

## Modeles principaux (datasets)

### Modele racine : `matomo enriched` (Card 106)

- **Collection** : CDTN (14)
- **Base** : Vue materialisee `metabase_model_106`
- **Colonnes** : idvisit, action_type, action_eventcategory, action_eventaction, action_eventname, action_eventvalue, action_timestamp, action_url, referrertype, referrername, pathname
- **Utilise comme source** par la plupart des dashboards

```sql
SELECT idvisit, action_type, action_eventcategory, action_eventaction,
    action_eventname, action_eventvalue, action_timestamp,
    action_url, referrertype, referrername, pathname
FROM metabase_model_106;
```

### Modele secondaire : `Visites uniques par chemin et par mois` (Card 151)

- **Collection** : Rapport mensuel (33)
- **Base** : Vue materialisee `visites_uniques`
- **Utilise par** : Card 69, 339, et toutes les cards "Visites uniques par mois"

```sql
SELECT * FROM visites_uniques;
```

### Modele : `Nombre Visites uniques par mois` (Card 339)

- **Collection** : CDTN (14)
- **Source** : Card 151 (`visites_uniques`)

```sql
SELECT month, pathname, COUNT(DISTINCT idvisit) AS visit_count
FROM {{#151-visites-uniques-par-chemin-et-par-mois}}
WHERE month >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '3 month')
GROUP BY month, pathname
ORDER BY visit_count DESC;
```

### Modele : `Top pages` (Card 69)

- **Collection** : Popularite (32)
- **Source** : Card 151 (`visites_uniques`)

```sql
WITH top AS (
    SELECT pathname,
        COUNT(*) FILTER (WHERE month = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')) AS one_month_ago_visits
    FROM {{#151-visites-uniques-par-chemin-et-par-mois}}
    GROUP BY pathname ORDER BY one_month_ago_visits DESC LIMIT 10
)
SELECT v.pathname, v.month, COUNT(*) AS visits
FROM {{#151-visites-uniques-par-chemin-et-par-mois}} AS v
INNER JOIN top t ON t.pathname = v.pathname
WHERE v.month >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '3 month')
GROUP BY v.pathname, v.month;
```

### Modele : `Evolution par chemin` (Card 341)

- **Collection** : Contributions - Popularite (35)
- **Source** : Card 339

```sql
WITH list AS (
    SELECT pathname,
        sum(visit_count) FILTER (WHERE month = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')) AS one_month_ago_visits,
        sum(visit_count) FILTER (WHERE month = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '2 month')) AS two_month_ago_visits
    FROM {{#339-nombre-visites-uniques-par-mois}}
    GROUP BY pathname
)
SELECT pathname, (one_month_ago_visits - two_month_ago_visits) * 100.0 / two_month_ago_visits AS ratio
FROM list WHERE two_month_ago_visits > 0 AND one_month_ago_visits > 0;
```

### Modele : `ratio_feedback_par_page` (Card 75)

- **Collection** : General (29)
- **Source** : Directement `metabase_model_106`

```sql
SELECT pathname,
    COUNT(CASE WHEN action_eventaction = 'positive' THEN 1 END) -
    COUNT(CASE WHEN action_eventaction = 'negative' THEN 1 END) AS satisfaction,
    COUNT(CASE WHEN action_eventaction = 'positive' THEN 1 END) AS nb_positive,
    COUNT(CASE WHEN action_eventaction = 'negative' THEN 1 END) AS nb_negative
FROM metabase_model_106
WHERE action_type = 'event' AND action_eventcategory = 'feedback'
  AND action_timestamp >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
  AND action_timestamp < DATE_TRUNC('month', CURRENT_DATE)
GROUP BY pathname;
```

### Modele : `Ratio avis utilisateurs` (Card 193)

- **Collection** : Satisfaction (31)
- **Source** : `metabase_model_106`

```sql
SELECT DATE_TRUNC('month', action_timestamp) AS month,
    CASE WHEN COUNT(CASE WHEN action_eventaction = 'negative' THEN 1 END) = 0 THEN 100
    ELSE (COUNT(CASE WHEN action_eventaction = 'positive' THEN 1 END)::FLOAT /
          COUNT(CASE WHEN action_eventaction = ANY(ARRAY['negative', 'positive']) THEN 1 END)) * 100
    END AS pourcentage_positive_negative
FROM metabase_model_106
WHERE action_type = 'event' AND action_eventcategory = 'feedback'
  AND action_timestamp >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '2 month')
GROUP BY DATE_TRUNC('month', action_timestamp);
```

### Modele : Funnel Trouver CC - `Nombre visites par etapes P1` (Card 374)

- **Collection** : Trouver convention collective - Taux completion (82)
- **Source** : `metabase_model_106`
- **Utilise** : `path_level2`, `path_level3` pour filtrer

```sql
WITH list AS (
    SELECT DISTINCT idvisit,
        CASE WHEN action_eventcategory = 'cc_search_type_of_users' THEN action_eventaction ELSE action_eventcategory END AS action,
        month
    FROM metabase_model_106
    WHERE path_level2 = 'outils' AND path_level3 = 'convention-collective'
      AND action_type = 'event'
      AND (action_eventaction = 'click_p1' OR action_eventcategory = 'cc_select_p1')
      AND month >= date_trunc('month', CURRENT_DATE - INTERVAL '2 month')
)
SELECT action, month, COUNT(*) AS nombre FROM list GROUP BY action, month;
```

### Modele : Funnel Trouver CC P2 (Card 376)

```sql
WITH list AS (
    SELECT idvisit,
        array_agg(CASE WHEN action_eventaction = 'click_p2' THEN 'click_p2' ELSE action_eventcategory END) AS actions, MONTH
    FROM metabase_model_106
    WHERE path_level2 = 'outils' AND path_level3 = 'convention-collective'
      AND action_type = 'event'
      AND (action_eventaction = 'click_p2' OR action_eventcategory IN ('cc_select_p2', 'enterprise_search', 'enterprise_select'))
      AND MONTH >= date_trunc('month', CURRENT_DATE - INTERVAL '2 month')
    GROUP BY idvisit, MONTH
),
filtered_list AS (
    SELECT DISTINCT idvisit, unnest(actions) AS action, MONTH FROM list WHERE 'click_p2' = any(actions)
)
SELECT action, MONTH, COUNT(*) AS visits FROM filtered_list GROUP BY action, MONTH;
```

### Modele : Funnel Contributions P2 (Card 379)

```sql
WITH list AS (
    SELECT idvisit,
        array_agg(DISTINCT CASE WHEN action_eventaction IN ('click_p2', 'cc_select_traitee') THEN action_eventaction ELSE action_eventcategory END) AS actions,
        MONTH
    FROM metabase_model_106
    WHERE path_level2 = 'contribution' AND action_type = 'event'
      AND (action_eventaction IN ('click_p2', 'cc_select_traitee') OR action_eventcategory IN ('cc_select_p2', 'enterprise_select', 'enterprise_search'))
      AND MONTH >= date_trunc('month', CURRENT_DATE - INTERVAL '2 month')
    GROUP BY idvisit, month
),
filtered_list AS (
    SELECT idvisit, unnest(actions) AS action, MONTH FROM list WHERE 'click_p2' = any(actions)
)
SELECT action, MONTH, COUNT(*) AS visits FROM filtered_list GROUP BY action, MONTH;
```

---

## Modeles par simulateur (pattern "visites par etapes")

Chaque simulateur a historiquement le meme pattern de 3 cards en chaine :

| Simulateur | Visites etapes | Nombre etapes | Taux completion |
|---|---|---|---|
| Indemnite licenciement | 168 | 169 | **170** (migre -> mv_funnel_il_irc) |
| Indemnite precarite | 174 | 180 | 186 |
| Indemnite rupture conv. | 105 | 167 | **107** (migre -> mv_funnel_il_irc) |
| Preavis demission | 172 | 178 | 182 |
| Preavis depart retraite | 176 | 177 | 184 |
| Preavis licenciement | 173 | 181 | 183 |
| Heures recherche emploi | 175 | 179 | 185 |
| Rupture conv. (autre) | 189 | 191 | - |
| Rupture conv. (autre 2) | 187 | 192 | - |
| Rupture conv. (autre 3) | 188 | 190 | - |

Pattern historique (encore actif pour les autres simulateurs) :

```
Card 106 (matomo enriched) -> Card 168 (filtre pathname) -> Card 169 (GROUP BY) -> Card 170 (ratio)
```

> **IL et IRC** : les cartes de taux completion (170 et 107) ne suivent plus la chaine 168/169 ni 105/167/190/191/192. Elles attaquent directement la MV `mv_funnel_il_irc` (voir `materialized-views.md`) avec une fenetre glissante de 30 jours. Les cards intermediaires (168, 169, 105, 167, 187, 188, 189, 190, 191, 192) restent presentes mais sont **orphelines** ; ne pas les utiliser dans de nouvelles cartes - ajouter les nouvelles etapes a la MV plutot que de les ressusciter.

---

## Patterns de requetes optimises

### Pattern 1 : Chaine de cards (3 niveaux)

```
Card 106 (matomo enriched)
  -> Card 168 (visites par etapes - filtre pathname + events)
    -> Card 169 (nombre visites par etapes - GROUP BY)
      -> Card 170 (taux completion - ratio / start)
```

**Avantage** : Chaque card est un cache reutilisable. Metabase peut cacher les resultats intermediaires.

### Pattern 2 : Requete directe sur `matomo_partitioned` avec filtres temporels

Pour les nouvelles cards (funnels, taux de conversion) ou les requetes sur plus d'1 an.

```sql
SELECT ... FROM matomo_partitioned
WHERE action_timestamp >= DATE '2026-02-16'
  AND action_eventcategory = 'outil'
  AND action_eventaction = 'view_step_Indemnité de licenciement'
GROUP BY idvisit, DATE_TRUNC('week', action_timestamp);
```

### Pattern 3 : Funnel avec CASE WHEN MAX

Pour les taux de completion par simulateur.

```sql
WITH funnel_steps AS (
    SELECT idvisit,
        MAX(CASE WHEN action_eventname = 'start' THEN 1 ELSE 0 END) AS reached_start,
        MAX(CASE WHEN action_eventname = 'results' THEN 1 ELSE 0 END) AS reached_result
    FROM matomo_partitioned
    WHERE action_timestamp BETWEEN DATE '2026-01-15' AND DATE '2026-02-15'
      AND action_eventcategory = 'outil'
      AND action_url LIKE '%indemnite-licenciement%'
      AND NOT (action_eventaction LIKE 'click_previous%')
    GROUP BY idvisit
)
SELECT 'start' AS etape, SUM(reached_start) FROM funnel_steps WHERE reached_start = 1
UNION ALL SELECT 'results', SUM(reached_result) FROM funnel_steps WHERE reached_start = 1;
```

### Pattern 4 : Funnel CC avec array_agg

Pour les parcours multi-chemins (Trouver CC, Contributions).

```sql
WITH list AS (
    SELECT idvisit,
        array_agg(DISTINCT ...) AS actions, MONTH
    FROM metabase_model_106
    WHERE path_level2 = 'contribution' AND ...
    GROUP BY idvisit, month
),
filtered_list AS (
    SELECT idvisit, unnest(actions) AS action, MONTH
    FROM list WHERE 'click_p2' = any(actions)
)
SELECT action, MONTH, COUNT(*) FROM filtered_list GROUP BY action, MONTH;
```

---

## Reference Card Template Tags

```
{{#106-matomo-enriched}}                  -> Modele principal
{{#151-visites-uniques-par-chemin-et-par-mois}} -> Visites uniques
{{#339-nombre-visites-uniques-par-mois}}  -> Comptage visites
{{#169-indemnite-licenciement-nombre-visites-par-etapes}} -> Etapes IL
{{#379-nombre-visites-par-etapes-p2}}     -> Funnel Contributions P2
{{#376-nombre-visites-par-etapes-p2}}     -> Funnel Trouver CC P2
```

---

## Optimisation Performance

### Regles cles

1. **Toujours filtrer sur `action_timestamp`** - PostgreSQL n'interroge que les partitions pertinentes
2. **Utiliser `metabase_model_106`** pour les 12 derniers mois (pathname deja calcule, 1 an de data)
3. **Utiliser `visites_uniques`** pour les comptages de visites par page/mois (deja dedoublonne)
4. **Limiter les `COUNT(DISTINCT idvisit)`** - cher sur de gros volumes
5. **Grouper par `action_eventcategory` + `action_eventaction`** avant les jointures
6. **Chaines de cards** pour les sous-requetes reutilisables (Metabase met en cache)
7. **`path_level2` / `path_level3`** du modele pour filtrer par type de contenu sans regexp

### Quand utiliser quoi

| Source | Periode | Performance | Colonnes speciales |
|---|---|---|---|
| `metabase_model_106` | 12 derniers mois | Rapide (MV) | pathname, path_level2, path_level3, month |
| `visites_uniques` | 13 derniers mois | Tres rapide | idvisit dedoublonne par pathname/mois |
| `commentaires_utilisateurs` | 13 derniers mois | Tres rapide | feedback joint avec feedback_category |
| `matomo_partitioned` | Toute periode | OK avec filtre date | action_url (a parser) |

### Refresher les vues materialisees

```sql
REFRESH MATERIALIZED VIEW metabase_model_106;
REFRESH MATERIALIZED VIEW commentaires_utilisateurs;
REFRESH MATERIALIZED VIEW visites_uniques;
```

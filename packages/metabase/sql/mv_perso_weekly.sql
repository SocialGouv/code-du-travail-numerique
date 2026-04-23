-- mv_perso_weekly.sql
-- Source de verite : docs/materialized-views.md §5
-- Role : pre-agrege les stats de personnalisation par semaine pour le graphique
--        d'evolution (KPI 2 du dashboard "Personnalisation des contenus").
-- Source : metabase_model_106.
-- Refresh : REFRESH MATERIALIZED VIEW mv_perso_weekly;
-- Cartes consommatrices : voir docs/dashboards.md §"Dashboard Personnalisation" (KPI 2).

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_perso_weekly AS
SELECT
    DATE_TRUNC('week', action_timestamp)::date AS semaine,
    CASE WHEN action_eventaction LIKE 'cc_select%' THEN 'simulateur' ELSE 'contribution' END AS type,
    COUNT(DISTINCT idvisit) AS total_visits,
    COUNT(DISTINCT CASE
      WHEN action_eventaction IN ('click_afficher_les_informations_CC', 'cc_select_traitée')
      THEN idvisit
    END) AS personalized_visits
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

-- mv_funnel_il_irc.sql
-- Source de verite : docs/materialized-views.md §6
-- Role : pre-agrege par (semaine, simulateur, etape) les visites uniques sur
--        les funnels IL et IRC. Usage historique (12 mois), donc base sur
--        metabase_model_106 (stale si metabase_model_106 n'est pas rafraichi).
-- Refresh : REFRESH MATERIALIZED VIEW mv_funnel_il_irc;
-- Cartes consommatrices : voir docs/dashboards.md §"Funnel IL/IRC" (dashboard
-- de comparaison avant/apres refonte). Pour les cartes temps reel, voir
-- mv_funnel_il_irc_visits.

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_funnel_il_irc AS
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

CREATE INDEX IF NOT EXISTS idx_mv_funnel_il_irc_semaine
  ON mv_funnel_il_irc (semaine, simulateur, etape);

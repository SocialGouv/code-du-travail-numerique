-- mv_funnel_il_irc_visits.sql
-- Source de verite : docs/materialized-views.md §7
-- Role : une ligne PAR VISITE (idvisit) pour les funnels IL et IRC sur les 60j
--        derniers, avec un flag booleen par etape. Source matomo_partitioned,
--        INDEPENDANTE de metabase_model_106 -> temps reel.
-- Taille : ~400-500k lignes.
-- Refresh : REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;
-- Cartes : 170, 107, 448, 449 (cumulative funnel, fenetre parametrable).

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_funnel_il_irc_visits AS
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

CREATE INDEX IF NOT EXISTS idx_mv_funnel_il_irc_visits_jour
  ON mv_funnel_il_irc_visits (simulateur, jour);

-- mv_bounce_contributions.sql
-- Source de verite : docs/materialized-views.md §8
-- Role : une ligne par (visite, contribution) pour le calcul du taux de rebond
--        des contributions. Source matomo_partitioned, INDEPENDANTE de
--        metabase_model_106 -> temps reel.
-- Refresh : REFRESH MATERIALIZED VIEW mv_bounce_contributions;
-- Cartes consommatrices : voir docs/dashboards.md §"Taux de rebond Contributions".

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_bounce_contributions AS
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
    action_eventcategory IN ('contribution','cc_search','cc_search_type_of_users',
                             'cc_select_p1','cc_select_p2',
                             'enterprise_search','enterprise_select')
    OR action_eventaction IN (
      'click_p1','click_p2','click_p3',
      'click_je_n_ai_pas_d_entreprise','select_je_n_ai_pas_d_entreprise',
      'click_afficher_les_informations_CC',
      'click_afficher_les_informations_sans_CC',
      'click_afficher_les_informations_générales','click_afficher_les_informations_generales'
    )
  )) AS has_interaction,
  BOOL_OR(action_eventaction IN (
    'click_afficher_les_informations_générales','click_afficher_les_informations_generales'
  )) AS has_click_generic,
  BOOL_OR(action_eventaction = 'click_afficher_les_informations_CC') AS has_click_cc,
  BOOL_OR(action_eventaction = 'click_afficher_les_informations_sans_CC') AS has_click_sans_cc,
  BOOL_OR(
    action_eventcategory IN ('cc_search','cc_search_type_of_users',
                             'cc_select_p1','cc_select_p2',
                             'enterprise_search','enterprise_select')
    OR action_eventaction IN (
      'click_p1','click_p2','click_p3',
      'click_je_n_ai_pas_d_entreprise','select_je_n_ai_pas_d_entreprise'
    )
  ) AS has_cc_search
FROM contrib_actions
GROUP BY idvisit, pathname;

CREATE INDEX IF NOT EXISTS idx_mv_bounce_contributions_jour
  ON mv_bounce_contributions (jour, pathname);
CREATE INDEX IF NOT EXISTS idx_mv_bounce_contributions_path
  ON mv_bounce_contributions (pathname);

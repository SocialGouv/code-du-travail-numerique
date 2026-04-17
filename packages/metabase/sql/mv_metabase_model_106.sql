-- mv_metabase_model_106.sql
-- Source de verite : docs/materialized-views.md §1
-- Role : cache pre-agrege des donnees Matomo avec colonnes calculees
--        (pathname, path_level2, path_level3, month).
-- Donnees : derniere annee glissante (filtre sur action_timestamp).
-- Refresh : REFRESH MATERIALIZED VIEW metabase_model_106;
-- Taille : ~53M lignes.
-- !! Attention : cette MV est TRES lente a refresh (~minutes a heures).
--    Plusieurs autres MV dependent d'elle. Cf. ../CLAUDE.md §"Refresh des MV" et ../docs/materialized-views.md §"Ordre de refresh des MV".

-- NOTE : cette MV est geree cote Metabase (card 106). La definition ci-dessous
-- est la requete equivalente, fournie ici pour tracabilite et recreation manuelle
-- si besoin. Ne pas la DROP/CREATE sans concertation.

CREATE MATERIALIZED VIEW IF NOT EXISTS metabase_model_106 AS
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

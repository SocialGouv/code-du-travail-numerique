-- mv_visites_uniques.sql
-- Source de verite : docs/materialized-views.md §2
-- Role : liste dedoublonnee des visites par chemin et par mois.
-- Source : metabase_model_106 (donc stale si metabase_model_106 n'est pas rafraichi).
-- Refresh : REFRESH MATERIALIZED VIEW visites_uniques;
-- Usage : compter les visites uniques par page/mois, calculer des taux.

CREATE MATERIALIZED VIEW IF NOT EXISTS visites_uniques AS
SELECT DISTINCT idvisit, pathname, month
FROM metabase_model_106
WHERE month >= date_trunc('month', CURRENT_DATE - interval '1 year 1 month');

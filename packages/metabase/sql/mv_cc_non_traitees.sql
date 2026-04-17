-- mv_cc_non_traitees.sql
-- Source de verite : docs/materialized-views.md §9
-- Role : pre-agrege les selections de CC non traitees par nom de CC pour 2025.
-- Source : matomo_partitioned.
-- Taille : ~800 lignes.
-- Refresh : STATIQUE (donnees 2025, pas de refresh prevu).
-- Cartes : 442 (KPI 5 - CC non traitees 2025).

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_cc_non_traitees AS
SELECT action_eventname AS cc_name,
    COUNT(DISTINCT idvisit) AS nb_utilisateurs,
    COUNT(*) AS nb_selections
FROM matomo_partitioned
WHERE action_type = 'event' AND action_eventcategory = 'outil'
  AND action_eventaction = 'cc_select_non_traitée'
  AND action_eventname IS NOT NULL AND action_eventname != ''
  AND action_timestamp >= '2025-01-01' AND action_timestamp < '2026-01-01'
GROUP BY action_eventname;

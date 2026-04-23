-- mv_kpi_personnalisation.sql
-- Source de verite : docs/materialized-views.md §4
-- Role : pre-agrege les evenements cibles de personnalisation par visite dedupliquee.
--        Evite les Seq Scan sur metabase_model_106 pour les cartes du dashboard
--        "Personnalisation des contenus".
-- Source : metabase_model_106 (derniere annee glissante).
-- Refresh : DROP + CREATE (schema fixe, pas de REFRESH).
-- Cartes consommatrices : voir docs/dashboards.md §"Dashboard Personnalisation".
--
-- PROCEDURE DE REFRESH
-- --------------------
-- 1. Lancer REFRESH MATERIALIZED VIEW metabase_model_106 (long).
-- 2. Sauvegarder SELECT COUNT(*) FROM mv_kpi_personnalisation (controle avant/apres).
-- 3. Executer ce fichier (DROP + CREATE).
-- 4. Verifier SELECT COUNT(*) FROM mv_kpi_personnalisation (proche de l'avant).
-- Les index sont recrees automatiquement en fin de fichier.

DROP MATERIALIZED VIEW IF EXISTS mv_kpi_personnalisation CASCADE;

CREATE MATERIALIZED VIEW mv_kpi_personnalisation AS
WITH events_bruts AS (
    SELECT
        month,
        action_eventcategory,
        action_eventaction,
        action_eventname,
        pathname,
        path_level2,
        path_level3,
        idvisit,
        -- Type de contenu
        CASE
            WHEN path_level2 = 'contribution' THEN 'contribution'
            WHEN action_eventcategory = 'outil' AND action_eventaction IN ('cc_select_traitée', 'cc_select_non_traitée') THEN 'simulateur'
            WHEN action_eventcategory = 'cc_search_type_of_users' THEN 'cc_search'
            ELSE NULL
        END AS content_type,
        -- Path unique par type
        CASE
            WHEN path_level2 = 'contribution' THEN pathname
            WHEN action_eventcategory = 'outil' THEN path_level3
            WHEN action_eventcategory = 'cc_search_type_of_users' THEN 'global'
            ELSE NULL
        END AS path
    FROM metabase_model_106
    WHERE action_type = 'event'
      AND (
        -- Contributions
        (path_level2 = 'contribution' AND action_eventaction IN (
            'click_afficher_les_informations_CC',
            'click_afficher_les_informations_sans_CC',
            'click_afficher_les_informations_générales',
            'click_afficher_les_informations_generales'
        ))
        -- Simulateurs
        OR (action_eventcategory = 'outil' AND action_eventaction IN (
            'cc_select_traitée', 'cc_select_non_traitée',
            'cc_select_traitee', 'cc_select_non_traitee'
        ))
        -- CC search
        OR (action_eventcategory = 'cc_search_type_of_users' AND action_eventaction IN (
            'click_p1','click_p2','click_p3',
            'click_je_n_ai_pas_d_entreprise','select_je_n_ai_pas_d_entreprise'
        ))
      )
)
SELECT
    month,
    content_type,
    path,
    idvisit,
    BOOL_OR(
        action_eventaction IN (
            'click_afficher_les_informations_CC',
            'cc_select_traitée', 'cc_select_traitee'
        )
    ) AS is_perso,
    BOOL_OR(
        action_eventaction IN (
            'click_afficher_les_informations_sans_CC',
            'cc_select_non_traitée', 'cc_select_non_traitee'
        )
    ) AS is_cc_non_traitee,
    BOOL_OR(
        action_eventaction IN (
            'click_je_n_ai_pas_d_entreprise', 'select_je_n_ai_pas_d_entreprise'
        )
    ) AS is_pas_entreprise,
    BOOL_OR(action_eventaction = 'click_p3') AS is_renonciation
FROM events_bruts
WHERE content_type IS NOT NULL
GROUP BY month, content_type, path, idvisit;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_mvkpi_month_type ON mv_kpi_personnalisation (month, content_type);
CREATE INDEX IF NOT EXISTS idx_mvkpi_month_type_path ON mv_kpi_personnalisation (month, content_type, path);
CREATE INDEX IF NOT EXISTS idx_mvkpi_idvisit ON mv_kpi_personnalisation (idvisit);

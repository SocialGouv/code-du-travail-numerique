-- mv_commentaires_utilisateurs.sql
-- Source de verite : docs/materialized-views.md §3
-- Role : feedbacks utilisateurs agreges (suggestion + categorie + feedback par ligne).
-- Source : matomo_partitioned (independant de metabase_model_106).
-- Refresh : REFRESH MATERIALIZED VIEW commentaires_utilisateurs;

CREATE MATERIALIZED VIEW IF NOT EXISTS commentaires_utilisateurs AS
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

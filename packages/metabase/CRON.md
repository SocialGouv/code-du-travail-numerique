# Cron / refresh manuels

Ce document liste **tout ce qui doit etre rafraichi a la main ou planifie** sur la DB OVH PG CDTN pour que les dashboards Metabase restent a jour.

> **Tant que les refresh ci-dessous ne sont pas planifies cote infra, il faut les lancer manuellement.** L'instance Metabase n'a pas de scheduler interne pour les MV PostgreSQL : c'est le SGBD qui gere les MV, donc il faut un cron OS, un `pg_cron`, un Kubernetes CronJob, ou une action Github programmee.

## Sommaire

- [Etat actuel (au 2026-04-11)](#etat-actuel-au-2026-04-11)
- [Refresh quotidien (recommande)](#refresh-quotidien-recommande)
- [Refresh declenche par metabase_model_106](#refresh-declenche-par-metabase_model_106)
- [Refresh manuel one-shot](#refresh-manuel-one-shot)
- [Statique - jamais refresh](#statique---jamais-refresh)
- [Comment lancer un refresh](#comment-lancer-un-refresh)
- [Comment verifier la fraicheur](#comment-verifier-la-fraicheur)
- [Recap dependances](#recap-dependances)

---

## Etat actuel (au 2026-04-11)

| MV | Frequence cible | Derniere fraicheur observee | Statut |
| --- | --- | --- | --- |
| `metabase_model_106` | Quotidien | `MAX(action_timestamp) = 2026-02-22` | **EN RETARD ~50 jours** - cron casse cote infra, a diagnostiquer |
| `mv_funnel_il_irc_visits` | Quotidien | `MAX(jour) = 2026-04-10` | OK (cree le 2026-04-11) - **pas encore de cron**, a planifier |
| `mv_bounce_contributions` | Quotidien | `MAX(jour) = 2026-04-10` | OK (cree le 2026-04-11) - **pas encore de cron**, a planifier |
| `mv_funnel_il_irc` | Apres `metabase_model_106` | `MAX(semaine) = 2026-02-16` | Stale (depend de `metabase_model_106`) |
| `visites_uniques` | Apres `metabase_model_106` | Stale | Depend de `metabase_model_106` |
| `mv_perso_weekly` | Apres `metabase_model_106` | Stale | Depend de `metabase_model_106` |
| `mv_kpi_personnalisation` | Apres `metabase_model_106` (DROP/CREATE) | Stale | Depend de `metabase_model_106` |
| `commentaires_utilisateurs` | Apres `metabase_model_106` | Stale | Depend de `matomo_partitioned` directement |
| `mv_cc_non_traitees` | Statique 2025 | - | OK (pas de refresh prevu) |

---

## Refresh quotidien (recommande)

A planifier en cron quotidien independamment de `metabase_model_106`.

### `mv_funnel_il_irc_visits`

- **Source** : `matomo_partitioned` (temps reel, pas de dependance)
- **Cardinalite** : ~400-500k lignes (60 jours x ~7-10k visites/jour x 2 simulateurs)
- **Duree** : quelques minutes max
- **Cartes impactees** : 170, 107, 448, 449 (Taux completion IL et IRC)

```sql
REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;
```

> Sans ce refresh quotidien, les cards 170/107/448/449 montrent toujours la meme fenetre 30 jours ancrée au dernier refresh - elles "vieillissent" et la fenetre glissante n'avance plus.

### `mv_bounce_contributions`

- **Source** : `matomo_partitioned` (temps reel, pas de dependance)
- **Cardinalite** : ~1.5M lignes (60 jours x ~10k visites/jour x ~3 contributions visitees/visite)
- **Duree** : ~30 secondes a une minute
- **Cartes impactees** : 450 (Taux de rebond - Global), 451 (Taux de rebond - Par contribution)

```sql
REFRESH MATERIALIZED VIEW mv_bounce_contributions;
```

> Sans ce refresh quotidien, les cards 450/451 montrent toujours la meme fenetre 60 jours ancrée au dernier refresh.

### `commentaires_utilisateurs`

- **Source** : `matomo_partitioned`
- **Cardinalite** : ~13 mois de feedbacks
- **Duree** : quelques secondes a une minute

```sql
REFRESH MATERIALIZED VIEW commentaires_utilisateurs;
```

---

## Refresh declenche par `metabase_model_106`

Ces MV dependent de `metabase_model_106`. Elles doivent etre rafraichies **apres** un refresh reussi de `metabase_model_106`, dans cet ordre.

```sql
-- 0. Source de verite (lent, ~minutes a heures sur 128M lignes)
REFRESH MATERIALIZED VIEW metabase_model_106;

-- 1. MV simples qui en dependent
REFRESH MATERIALIZED VIEW visites_uniques;
REFRESH MATERIALIZED VIEW mv_perso_weekly;
REFRESH MATERIALIZED VIEW mv_funnel_il_irc;

-- 2. mv_kpi_personnalisation : DROP + CREATE (schema fixe)
DROP MATERIALIZED VIEW IF EXISTS mv_kpi_personnalisation CASCADE;
-- ... coller integralement le contenu de sql/mv_kpi_personnalisation.sql ...
-- (voir le fichier pour les CREATE INDEX a relancer apres)
```

> Voir `docs/materialized-views.md` (section "Ordre de refresh des MV") pour les details.

### Frequence cible de `metabase_model_106`

- **Quotidien** ou **toutes les 6 h** est ideal pour avoir des dashboards a jour
- En pratique, la duree du refresh peut depasser 30 min sur 128M lignes -> a planifier a un moment creux (nuit)
- Si le refresh echoue / depasse le timeout, la source de verite reste figee et **toutes les MV dependantes deviennent stale**

---

## Refresh manuel one-shot

### `mv_kpi_personnalisation`

Cette MV ne supporte pas `REFRESH MATERIALIZED VIEW` (le DROP/CREATE est deja en sql/mv_kpi_personnalisation.sql parce que des contraintes / indexes doivent etre recrees).

```bash
# Depuis psql ou via /api/dataset
DROP MATERIALIZED VIEW IF EXISTS mv_kpi_personnalisation CASCADE;
\i sql/mv_kpi_personnalisation.sql
```

### Recreation complete d'une MV (apres modification du SQL source)

Quand on modifie le filtre `IN`, les colonnes ou la source d'une MV (ex: ajout de l'etape `absences` dans `mv_funnel_il_irc` le 2026-04-11), un simple `REFRESH` ne suffit pas - il faut DROP/CREATE :

```bash
# Exemple pour mv_funnel_il_irc :
DROP MATERIALIZED VIEW IF EXISTS mv_funnel_il_irc;
\i sql/mv_funnel_il_irc.sql
```

> Voir `AGENTS.md` (section "Tips API Metabase") : DROP/CREATE/INDEX peut se faire via `POST /api/dataset` malgre l'erreur "L'instruction Select n'a pas produit un ResultSet" (la DDL est executee cote DB).

---

## Statique - jamais refresh

### `mv_cc_non_traitees`

- Filtre fige sur l'annee 2025 (`action_timestamp >= '2025-01-01' AND < '2026-01-01'`)
- A revoir si on veut couvrir 2026 -> editer `sql/mv_cc_non_traitees.sql` (a creer si absent) puis DROP/CREATE

---

## Comment lancer un refresh

### Via Metabase API (recommande pour les agents IA et les scripts)

```bash
source .env

# REFRESH simple
curl -s -X POST -H "X-API-Key: $METABASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"native","database":4,"native":{"query":"REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;"}}' \
  "$METABASE_URL/api/dataset"
# (l'API va renvoyer une erreur "no ResultSet" mais le REFRESH est execute)

# Verifier que ca a bien tourne
curl -s -X POST -H "X-API-Key: $METABASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"native","database":4,"native":{"query":"SELECT MAX(jour) FROM mv_funnel_il_irc_visits;"}}' \
  "$METABASE_URL/api/dataset" | jq '.data.rows'
```

> **Limite** : `/api/dataset` a un timeout HTTP (~60-300 s selon la config). Pour les MV grosses (`metabase_model_106` 128M lignes), le refresh peut depasser le timeout. Dans ce cas, **passer par psql direct** ou un job server-side.

### Via psql

```bash
PGPASSWORD=... psql -h <host> -U <user> -d cdtn -c "REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;"
```

### Via Kubernetes CronJob (pattern recommande)

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: cdtn-refresh-mv-funnel-visits
  namespace: cdtn-prod
spec:
  schedule: "30 4 * * *" # tous les jours a 04:30 UTC
  concurrencyPolicy: Forbid
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: psql
              image: postgres:15
              command:
                - sh
                - -c
                - |
                  psql "$DATABASE_URL" \
                    -c "REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits;"
              env:
                - name: DATABASE_URL
                  valueFrom:
                    secretKeyRef:
                      name: cdtn-db-credentials
                      key: url
```

### Via `pg_cron` (si l'extension est installee)

```sql
-- A executer une seule fois
SELECT cron.schedule(
  'refresh-mv-funnel-visits',
  '30 4 * * *',
  'REFRESH MATERIALIZED VIEW mv_funnel_il_irc_visits'
);

-- Lister les jobs
SELECT * FROM cron.job;
```

---

## Comment verifier la fraicheur

A lancer regulierement (ou via un job de monitoring) pour detecter des MV stale.

```sql
SELECT
  'metabase_model_106' AS mv,
  MAX(action_timestamp)::date AS max_date,
  CURRENT_DATE - MAX(action_timestamp)::date AS lag_days
FROM metabase_model_106
UNION ALL
SELECT
  'mv_funnel_il_irc',
  MAX(semaine),
  CURRENT_DATE - MAX(semaine)
FROM mv_funnel_il_irc
UNION ALL
SELECT
  'mv_funnel_il_irc_visits',
  MAX(jour),
  CURRENT_DATE - MAX(jour)
FROM mv_funnel_il_irc_visits
UNION ALL
SELECT
  'mv_perso_weekly',
  MAX(semaine),
  CURRENT_DATE - MAX(semaine)
FROM mv_perso_weekly
UNION ALL
SELECT
  'mv_kpi_personnalisation',
  MAX(month),
  CURRENT_DATE - MAX(month)
FROM mv_kpi_personnalisation
UNION ALL
SELECT
  'visites_uniques',
  MAX(month),
  CURRENT_DATE - MAX(month)
FROM visites_uniques
UNION ALL
SELECT
  'commentaires_utilisateurs',
  MAX(action_timestamp)::date,
  CURRENT_DATE - MAX(action_timestamp)::date
FROM commentaires_utilisateurs
ORDER BY lag_days DESC;
```

Sortie attendue (exemple sain) :

```text
mv                          max_date       lag_days
metabase_model_106          2026-04-10     1
mv_funnel_il_irc_visits     2026-04-10     1
mv_funnel_il_irc            2026-04-06     5    (semaine ISO)
mv_perso_weekly             2026-04-06     5
mv_kpi_personnalisation     2026-04-01     10   (mois)
visites_uniques             2026-04-01     10
commentaires_utilisateurs   2026-04-10     1
```

Une `lag_days > 7` (sauf pour les MV mensuelles) indique un cron casse.

---

## Recap dependances

```text
matomo_partitioned (temps reel, geree par Matomo)
   |
   +--> metabase_model_106                              [REFRESH lent, ~minutes-heures]
   |       |
   |       +--> visites_uniques                         [REFRESH simple]
   |       +--> mv_perso_weekly                         [REFRESH simple]
   |       +--> mv_funnel_il_irc                        [REFRESH simple]
   |       +--> mv_kpi_personnalisation                 [DROP + CREATE manuel]
   |
   +--> mv_funnel_il_irc_visits                         [REFRESH quotidien independant]
   +--> mv_bounce_contributions                         [REFRESH quotidien independant]
   +--> commentaires_utilisateurs                       [REFRESH quotidien independant]
   +--> mv_cc_non_traitees                              [statique, pas de refresh]
```

> Les MV "independantes" (`mv_funnel_il_irc_visits`, `mv_bounce_contributions`, `commentaires_utilisateurs`) sont volontairement decouplees de `metabase_model_106` : elles doivent rester a jour meme quand le cron de la MV source est casse (comme c'est le cas au 2026-04-11).

---

## Action immediates a prendre

1. **Diagnostiquer pourquoi `metabase_model_106` est figee depuis le 2026-02-22.** Probablement un cron infra casse - voir avec l'equipe ops.
2. **Planifier un cron quotidien pour les MV independantes** (Kubernetes CronJob, pg_cron, ou autre) :
   - `mv_funnel_il_irc_visits` (cards 170/107/448/449)
   - `mv_bounce_contributions` (cards 450/451)
   - `commentaires_utilisateurs`

   Une seule CronJob qui les enchaine est suffisant.

3. **Mettre en place un monitoring de fraicheur** (script de la section "Comment verifier la fraicheur" execute quotidiennement, alerte Slack si `lag_days > 7`).

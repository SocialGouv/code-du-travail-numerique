# sql/ — consignes Claude

DDL des vues materialisees de la DB OVH PG CDTN (ID 4). **Source de verite versionnee** : tout changement de schema doit passer par une modification de ces fichiers.

## Convention de nommage

`mv_<usage>.sql` — un fichier par MV. Le nom du fichier doit matcher le nom de la MV en DB.

## Header obligatoire

Chaque fichier commence par un bloc de commentaires avec :

```sql
-- mv_xxx.sql
-- Source de verite : docs/materialized-views.md §N
-- Role : <description courte>
-- Source : <table ou MV source>
-- Taille : <~ cardinalite>
-- Refresh : <REFRESH ... | DROP + CREATE | statique>
-- Cartes : <liste des IDs de cards qui consomment cette MV>
```

## Regles

1. **Toute modification d'une MV** :
   - Modifier `sql/mv_xxx.sql` (la DDL canonique)
   - Mettre a jour la section correspondante de `docs/materialized-views.md`
   - Mettre a jour `CLAUDE.md` §Refresh des MV si la frequence change
   - Appliquer via `/api/dataset` (voir `CLAUDE.md` §"Tips API Metabase") OU psql direct
   - Verifier via `SELECT * FROM pg_matviews WHERE matviewname = 'mv_xxx';`

2. **Pour les MV avec `DROP + CREATE`** (`mv_kpi_personnalisation`) :
   - Lister les index dans le fichier SQL (le CASCADE du DROP les supprime aussi)
   - Tester sur un environnement de dev si possible
   - Backup du SELECT COUNT(\*) avant / apres

3. **Ne PAS** ajouter de REFRESH dans ces fichiers : le refresh est execute separement cote infra (cf. `../CLAUDE.md` §Refresh des MV).

## Ordre de dependance

```
matomo_partitioned  (table source)
  -> metabase_model_106
       -> visites_uniques
       -> mv_perso_weekly
       -> mv_funnel_il_irc
       -> mv_kpi_personnalisation (DROP/CREATE)
  -> mv_funnel_il_irc_visits     (INDEPENDANT, source = matomo_partitioned)
  -> mv_bounce_contributions     (INDEPENDANT, source = matomo_partitioned)
  -> commentaires_utilisateurs   (INDEPENDANT, source = matomo_partitioned)
  -> mv_cc_non_traitees          (STATIQUE, source = matomo_partitioned)
```

Voir `docs/materialized-views.md` §"Ordre de refresh des MV" pour la sequence de commandes.

## Ne pas faire

- Modifier la DDL sans mettre a jour la doc.
- Hard-coder des dates (preferer `CURRENT_DATE - INTERVAL 'N day'`).
- Creer une MV en dehors de ce folder (la DDL doit etre tracee en git).

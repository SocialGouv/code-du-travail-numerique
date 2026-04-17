# backup/ — consignes Claude

Backups **locaux** des SQL de cards Metabase avant modification. Le contenu du folder est **gitignore** (seul ce `CLAUDE.md` est tracke) : ce sont des artefacts de travail, pas une source de verite.

## Convention de nommage

`card_<id>_<YYYYMMDD>_<short-description>.sql`

Exemples :

- `card_170_20260411_funnel_il_bar.sql`
- `card_450_20260410_bounce_global.sql`

## Procedure avant tout `PUT /api/card/:id`

1. `curl -H "X-API-Key: $METABASE_API_KEY" $METABASE_URL/api/card/<id>` → extraire `dataset_query.native.query`.
2. Ecrire dans `backup/card_<id>_<YYYYMMDD>_<description>.sql` avec un header :

```sql
-- Backup card <id> - <nom de la card>
-- Date    : YYYY-MM-DD
-- Auteur  : <toi>
-- Raison  : <pourquoi on modifie>
-- Dashboard(s) : #36, #37...

<query SQL telle qu'elle etait>
```

3. Verifier le backup (`wc -l backup/...`, ouvrir dans l'editeur).
4. **Seulement apres** : proceder au `PUT`.

## Regles

- **Ne jamais ecraser un backup existant.** Si un backup du meme jour existe deja, suffixer `_v2`, `_v3`, etc.
- Le backup doit inclure **toute la configuration utile** de la card si elle est dynamique : `template-tags`, `parameters`, `visualization_settings` — pas seulement le SQL.
- Les backups vieux de plus de 3 mois peuvent etre supprimes localement (la source reste Metabase + git pour la nouvelle version).

## Ne pas faire

- Commit le contenu de `backup/` : il est gitignore, et pour une bonne raison (SQL potentiellement sensibles, verbeux, non-canoniques).
- Utiliser `backup/` comme source de verite : c'est `sql/` pour les MV, et Metabase pour les cards (via l'API).

# Base de donnees OVH PG CDTN (ID: 4)

## Connexion

- **URL Metabase** : `https://metabase-cdtn.fabrique.social.gouv.fr`
- **Database Metabase ID** : `4` (OVH PG CDTN)
- **Engine** : PostgreSQL

---

## Table principale : `matomo_partitioned`

Table partitionnee hebdomadairement. La table parent `matomo_partitioned` unionise toutes les partitions automatiquement avec filtre sur `action_timestamp`.

### Colonnes (39 colonnes)

| Colonne | Type | Description |
|---|---|---|
| `action_id` | text | ID unique de l'action |
| `idsite` | text | ID du site Matomo |
| `idvisit` | text | ID de visite (utilisateur session) |
| `actions` | text | Nombre d'actions dans la visite |
| `country` | text | Pays du visiteur |
| `region` | text | Region |
| `city` | text | Ville |
| `operatingsystemname` | text | OS |
| `devicemodel` | text | Modele appareil |
| `devicebrand` | text | Marque appareil |
| `visitduration` | text | Duree de visite |
| `dayssincefirstvisit` | text | Jours depuis 1ere visite |
| `visitortype` | text | Type visiteur (new/returning) |
| `sitename` | text | Nom du site |
| `userid` | text | ID utilisateur |
| `serverdateprettyfirstaction` | date | Date premiere action |
| **`action_type`** | text | Type d'action (`event`, page view, etc.) |
| **`action_eventcategory`** | text | Categorie de l'evenement |
| **`action_eventaction`** | text | Action de l'evenement |
| **`action_eventname`** | text | Nom de l'evenement |
| **`action_eventvalue`** | numeric | Valeur de l'evenement |
| `action_timespent` | text | Temps passe sur l'action |
| **`action_timestamp`** | timestamptz | Horodatage de l'action |
| `usercustomproperties` | json | Proprietes custom utilisateur |
| `usercustomdimensions` | json | Dimensions custom |
| `dimension1` - `dimension10` | text | Dimensions Matomo (custom) |
| **`action_url`** | text | URL complete de l'action |
| `sitesearchkeyword` | text | Mot-cle de recherche |
| `action_title` | text | Titre de la page |
| `visitorid` | text | ID visiteur |
| `referrertype` | text | Type de referent |
| `referrername` | text | Nom du referent |
| `resolution` | text | Resolution ecran |

### Colonnes cles pour les requetes

- **`action_type`** : toujours filtrer sur `'event'` pour les evenements tracks
- **`action_eventcategory`** + **`action_eventaction`** + **`action_eventname`** : identifient l'evenement
- **`action_url`** : contient l'URL complete (`https://code.travail.gouv.fr/...`)
- **`action_timestamp`** : toujours filtrer avec un range de dates pour la performance
- **`idvisit`** : identifiant de session utilisateur (pour COUNT DISTINCT)

### Extraction du chemin depuis action_url

```sql
-- Extraire le pathname sans query params
regexp_replace(
    regexp_replace(action_url, 'https://code.travail.gouv.fr(/[^?]+).*', '\1'),
    'https://code.travail.gouv.fr', ''
)
```

---

## Partitions hebdomadaires

80 partitions de `matomo_partitioned_2024w40` a `matomo_partitioned_2026w15`.

Format : `matomo_partitioned_YYYYwWW`

- Les partitions sont automatiquement unions par la table parent `matomo_partitioned`
- Toujours filtrer sur `action_timestamp` pour que PostgreSQL n'interroge que les partitions pertinentes
- Pour des requetes tres lourdes, cibler directement une partition (ex: `matomo_partitioned_2026w14`)

---

## Table brute : `matomo` (ID DB Metabase: 3)

Base Matomo directe, meme schema que `matomo_partitioned` mais sans partitions. Moins performante.

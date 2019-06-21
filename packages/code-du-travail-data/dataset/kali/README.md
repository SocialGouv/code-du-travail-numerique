# Indexation des Conventions Collectives Nationales

Ce script permet de récupérer le contenu des conventions collectives nationales.
Pour l'instant, l'origine des données est hybride entre l'API de [dila2sql](https://github.com/SocialGouv/dila2sql) et [l'API de la DILA](https://github.com/SocialGouv/dila-api-client/)

Le script `yarn start` génère plusieurs fichiers qui seront ensuite indexés par ElasticSearch :

- `/dataset/code-du-travail-data/conventions.json`
- `/dataset/code-du-travail-data/convention_${IDCC}.json` *

* par défaut, seule la liste `conventions.json` est exportée, pour avoir toutes
les conventions, utilisez l'option `yarn start --all`

## Config

⚠️ Vous aurez besoin d'avoir exporté les variables d'environnement
`OAUTH_CLIENT_ID` et `OAUTH_CLIENT_SECRET` pour vous authentifier à l'API de la
DILA via PISTE -> ask @revolunet

## Debug

Exportez `DEBUG=dila-api-client` pour voir les messages d'erreurs de la lib
utilisée pour requêter l'API.

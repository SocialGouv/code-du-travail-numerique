# Indexation du code du travail

Afin de pouvoir proposer à l'utilisateur les articles du code du travail,
Il faut pouvoir indexer le code du travail dans son intégralité.

Le script `yarn start` permet de récupérer l'intégralité du code du travail depuis [l'API de la DILA](https://developer.aife.economie.gouv.fr).

Le fichier sera généré dans `/dataset/code_du_travail/code-du-travail.json` qui sera ensuite indexé par ElasticSearch.

## Config

⚠️ Vous aurez besoin d'avoir exporté les variables d'environnement
`OAUTH_CLIENT_ID` et `OAUTH_CLIENT_SECRET` pour vous authentifier à l'API de la
DILA via PISTE -> ask @revolunet

## Debug

Exportez `DEBUG=dila-api-client` pour voir les messages d'erreurs de la lib
utilisée pour requêter l'API.

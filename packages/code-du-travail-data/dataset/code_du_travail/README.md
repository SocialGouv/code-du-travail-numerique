# Indexation du code du travail

Afin de pouvoir proposer à l'utilisateur les articles du code du travail,
Il faut pouvoir indexer le code du travail dans son intégralité.

Le script `yarn start` permet de récupérer l'intégralité du code du travail depuis [l'API de la DILA](https://developer.aife.economie.gouv.fr).

Le fichier sera généré dans `/dataset/code_du_travail/code-du-travail.json` qui sera ensuite indexé par ElasticSearch.


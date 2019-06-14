# Indexation du code du travail

Afin de pouvoir proposer à l'utilisateur les articles du code du travail,
Il faut pouvoir indexer le code du travail dans son intégralité.

Le script `yarn start` permet de récupérer l'intégralité du code du travail depuis [l'API de la DILA](https://developer.aife.economie.gouv.fr).

Pour générer le fichier qui servira à l'indexation, la commande

```
$ npm start
```

va générer le fichier `/dataset/code_du_travail/code-du-travail.json` qui sera ensuite indexé par ElasticSearch.


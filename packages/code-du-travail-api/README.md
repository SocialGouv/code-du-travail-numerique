# Code du travail - API

Ce dépôt de code contient l'API permettant d'intérroger les différentes sources de données relatives au Code du travail.

Projet Node.js avec `Node v9` et `npm 5`.

## Installation de l'environnement de développement

```shell
npm install
npm run start
```

Exemple d'appel :

```shell
http://localhost:1337/api/v1/search?q=incapacité%20travail
```

Note : le serveur Elasticsearch du dépôt de code [`code-du-travail-data`](https://github.com/SocialGouv/code-du-travail-data) doit être actif.

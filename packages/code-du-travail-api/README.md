# Code du travail - API

Ce dépôt de code contient l'API permettant d'intérroger les différentes sources de données relatives au Code du travail.

Projet Node.js avec `Node v9` et `npm 5`.

## Installation de l'environnement de développement

### Pour construire l'image Docker :

```shell
$ docker build -t code-du-travail-api .
```

### Pour lancer une instance de l'image :

Note : le serveur Elasticsearch du dépôt de code [`code-du-travail-data`](https://github.com/SocialGouv/code-du-travail-data) doit être actif au préalable. On utilise le réseau par défaut généré par le Compose de `code-du-travail-data` et le nom du conteneur Elasticsearch en tant que valeur de `ELASTICSEARCH_URL` :

```shell
$ docker run -p 1337:1337 -e 'ELASTICSEARCH_URL=http://code-du-travail-data-elasticsearch:9200' -e 'ELASTICSEARCH_LOG_LEVEL=trace' --network='code-du-travail-data_default' code-du-travail-api
```

## Exemple d'appel :

```shell
http://localhost:1337/api/v1/search?q=incapacité%20travail
```

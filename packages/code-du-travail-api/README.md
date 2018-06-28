# Code du travail - API

Ce dépôt de code contient l'API permettant d'intérroger les différentes sources de données relatives au Code du travail.

Projet Node.js avec `Node v9` et `npm 5`.

## Installation de l'environnement de développement

Créez un fichier `.env` (utilisé par Docker) :

```shell
ELASTICSEARCH_URL=http://code-du-travail-data-elasticsearch:9200
ELASTICSEARCH_LOG_LEVEL=trace
```

Note : le serveur Elasticsearch du dépôt de code [`code-du-travail-data`](https://github.com/SocialGouv/code-du-travail-data) doit être actif au préalable. On utilise le réseau par défaut généré par le Compose de `code-du-travail-data` et le nom du conteneur Elasticsearch en tant que valeur de `ELASTICSEARCH_URL`.

Puis :

```bash
$ docker-compose up
```

## Pour lancer un shell Docker

```shell
$ docker exec -ti code-du-travail-api /bin/sh
```

## Exemple d'appel :

```shell
http://localhost:1337/api/v1/search?q=incapacité%20travail
```

# Code du travail - API (@cdt/api)

Ce dépôt de code contient l'API permettant d'intérroger les différentes sources de données relatives au Code du travail.

Projet Node.js avec `Node v9` et `npm 5`.

## Installation de l'environnement de développement

Créez un fichier `.env` (utilisé par Docker) :

```shell
# adresse de l'elastic search
ELASTICSEARCH_URL=http://code-du-travail-data-elasticsearch:9200
ELASTICSEARCH_LOG_LEVEL=trace

APM_SERVER_URL=http://code-du-travail-apm-server:8200
APM_SERVER_ACTIVE=1

API_PORT=1337
```

Puis :

```bash
$ npm i && npm start.dev
```

## Docker

Editer `.env` et `docker-compose.override.yml`

```sh
docker-compose up -d
```

**Important** :

- le serveur Elasticsearch du dépôt de code [`code-du-travail-data`](https://github.com/SocialGouv/code-du-travail-numerique/tree/master/packages/code-du-travail-data) doit être actif et accessible à l'url `ELASTICSEARCH_URL` définie dans le ficher `.env`.

## Exemple d'appel :

```shell
http://localhost:1337/api/v1/search?q=incapacité%20travail
```

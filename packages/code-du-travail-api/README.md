# Code du travail - API

Ce dépôt de code contient l'API permettant d'intérroger les différentes sources de données relatives au Code du travail.

Projet Node.js avec `Node v9` et `npm 5`.

## Installation de l'environnement de développement

Créez un fichier `.env` (utilisé par Docker) :

```shell
ELASTICSEARCH_URL=http://code-du-travail-data-elasticsearch:9200
ELASTICSEARCH_LOG_LEVEL=trace

APM_SERVER_URL=http://code-du-travail-apm-server:8200
```

Puis :

```bash
$ docker-compose up
```

**Important** :

- le serveur Elasticsearch du dépôt de code [`code-du-travail-data`](https://github.com/SocialGouv/code-du-travail-data) doit être actif au préalable car on utilise le réseau généré par son Compose et le nom de son conteneur Elasticsearch (`code-du-travail-data-elasticsearch`) en tant que valeur de `ELASTICSEARCH_URL` dans le ficher `.env`

- en mode développement le répertoire du code source est monté dans le conteneur via un volume, et le processus Node principal est lancé via Nodemon de façon à ce qu'un changement dans la base de code soit immédiatement pris en compte par le serveur de développement

## Pour lancer un shell dans le conteneur

```shell
$ docker exec -ti code-du-travail-api /bin/sh
```

## Exemple d'appel :

```shell
http://localhost:1337/api/v1/search?q=incapacité%20travail
```

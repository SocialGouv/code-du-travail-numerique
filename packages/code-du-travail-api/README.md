# Code du travail - API (@cdt/api)

> Ce dépôt de code contient l'API permettant d'intérroger les différentes sources de données relatives au Code du travail.

## Usage

### Docker image

Get the `@cdt/api` image from the [Social Gitlab Registry](https://gitlab.factory.social.gouv.fr/SocialGouv/code-du-travail-numerique/container_registry)

```sh
$ docker run --rm \
    --name cdtn_api \
    -p 1337:1337 \
    registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique/api:<commit hash>
$ curl http://localhost:1337/api/v1/version

# With options

$ docker run --rm \
    --name cdtn_api \
    -p 1337:80 \
    -e PORT=80 \
    -e APM_SERVER_ACTIVE=false \
    -e APM_SERVER_URL="http://apm" \
    -e ELASTICSEARCH_LOG_LEVEL="info" \
    -e ELASTICSEARCH_URL="http://elasticsearch:9200" \
    -e VERSION="foo" \
    registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique/api:<commit hash>
$ curl http://localhost:1337/api/v1/version
```

### Local build

```sh
# You need a parent monorepo image !
# You can download it from our registry
$ docker pull registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash>
$ docker tag registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash> ctdn_master:local

# Or build it
# From where this README.md is :
$ docker build -t ctdn_master:local ../..

#

$ docker build -t cdtn_api:local --build-arg BASE_IMAGE=ctdn_master:local .
$ docker run --rm \
    --name cdtn_api \
    -p 1337:80 \
    -e PORT=80 \
    -e APM_SERVER_ACTIVE=false \
    -e APM_SERVER_URL="http://apm" \
    -e ELASTICSEARCH_LOG_LEVEL="info" \
    -e ELASTICSEARCH_URL="http://localhost:9200" \
    -e VERSION="local" \
    cdtn_api:local

$ curl http://localhost:1337/api/v1/version
```

## Installation de l'environnement de développement

Créez un fichier `.env` (utilisé par Docker) :

```shell
# adresse de l'elastic search
ELASTICSEARCH_URL=http://code-du-travail-data-elasticsearch:9200
ELASTICSEARCH_LOG_LEVEL=trace

APM_SERVER_URL=http://code-du-travail-apm-server:8200
APM_SERVER_ACTIVE=1

API_PORT=1337

# Optional
# For tests, you can configure ElasticSearch indices using
# ELASTICSEARCH_DOCUMENT_INDEX=cdtn_document_test
# ELASTICSEARCH_ANNUAIRE_INDEX=cdtn_annuaire_test
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

## Tester les requêtes.

Un script permet de tester la non régréssion du moteur de recherche lorsqu'on modifie la configuration d'Elasticsearch ou le contenu des requetes que l'on fait.

Pour cela on se base sur un [fichier en ligne](https://docs.google.com/spreadsheets/d/e/2PACX-1vTBTINraToLx_LgkQtfr0BjGVm3VZ332vYsZsZ0Cc6TB3p5ukaPQ95yOod5Pzcr1R1amf26DJrm5b-Y/pubhtml?gid=0&single=true) qui regroupe l'ensemble de tests.

Chaque document est identifié par un clé contenant `/${source}/${slug}`. Afin de récupérer cette information simplement, un click sur la loupe du champ de recherche vous permet d'avoir cette information directement dans le presse-papier. Il ne reste plus qu'à copier l'information dans la colone des documents attendus pour compléter le tests.
![](https://user-images.githubusercontent.com/160320/53883257-c7621f00-4018-11e9-9ea9-c269fb66fd68.png)

Le script génére aussi un rapport succint ainsi qu'un rapport détaillé et met à jour un fichier de résultats.
Pour lancer le script, il est nécessaire d'avoir une instance en local d'elasticsearch ainsi que de l'api.

```
node /packages/code-du-travail-api/scripts/elastic.js
```

Le script accepte les paramètres suivants:

- `-v, --verbose` affiche le rapport détaillé pour chaque tests
- `-u, --update` met à jour le fichier de resultats

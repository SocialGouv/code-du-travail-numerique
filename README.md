# Code du travail numérique

[![Build Status](https://travis-ci.com/SocialGouv/code-du-travail-numerique.svg?branch=master)](https://travis-ci.com/SocialGouv/code-du-travail-numerique)
[![codecov](https://codecov.io/gh/SocialGouv/code-du-travail-numerique/branch/master/graph/badge.svg)](https://codecov.io/gh/SocialGouv/code-du-travail-numerique)

> Ce repository regroupe les informations sur les projets du code du travail numérique.

## Installation

Make sure you're using NodeJS 10.15 (9 or 11 won't work).

```sh
# Install all the packages
$ yarn
```

Note: les fichiers d'environment seront créés au _postinstall_ (see [scripts/setup-env.js](scripts/setup-env.js)) en fonction du `NODE_ENV`

#### Première instanciation

Pour (re-)initialiser les données du elasticsearch:

```sh
# Démarrez un elasticsearch
$ docker-compose up

#
# Attendez de voir le message
#
elasticsearch_1  | [20XX-YY-XXT00:00:00,000][INFO ][o.e.n.Node               ] [code-du-travail-data-elasticsearch-single-node] started

# > En parallèle dans un autre terminal <

# Lancez le script d'indexation
$ docker-compose run --rm python pipenv run python /app/search/indexing/create_indexes.py
```

## Usage

### Local development

```sh
$ yarn dev
```

You can see which data will be indexed into ES by using the `--verbose` option:

```sh
# Pour vérifier les données du code du travail :
# 1) Données accompagnées des "tags" extraits de ePoseidon :
$ docker-compose run --rm python pipenv run python /app/search/extraction/code_du_travail/eposeidon_tags/data.py -v
# 2) Données accompagnées des "tags" renommés humainement :
$ docker exec -ti code-du-travail-data-python pipenv run python search/extraction/code_du_travail/cleaned_tags/data.py -v

# Pour vérifier les données des fiches Ministère du Travail :
$ docker exec -ti code-du-travail-data-python pipenv run python search/extraction/fiches_ministere_travail/data.py -v

# Pour vérifier les données des fiches services public :
$ docker exec -ti code-du-travail-data-python pipenv run python search/extraction/fiches_service_public/data.py -v

# Pour vérifier les données des synonymes :
$ docker exec -ti code-du-travail-data-python pipenv run python search/extraction/synonyms/data.py -v
```

### Build

```sh
# Build all the packages
$ yarn build

# Build the "<package-name>"
$ yarn workspace <package-name> build

# For example for "code-du-travail-frontend"
$ yarn workspace @cdt/frontend build
```

### Test

```sh
# Prepare ES indexes for the test environment. This will create the indexes
# cdtn_document_test and cdtn_annuaire_test. This is needed initially and
# every time you update the indexing code or remove the Docker volume
$ ELASTICSEARCH_LOG_LEVEL=info node packages/code-du-travail-api/tests/create_indexes.js

# If there were changes in the css or the ui packages, you need to rebuild
$ yarn build

# Run all the packages tests
$ yarn test

# Run the "<package-name>" tests
$ yarn workspace <package-name> test

# For example for "code-du-travail-frontend"
$ yarn workspace @cdt/frontend test
```

### Prod

```sh
# copy and edit the sample environment file
$ cp .env.sample .env

# Use prod containers configs
$ cp docker-compose.override.prod.yml docker-compose.override.yml

# update dev server
$ sh scripts/deploy-dev.sh
```

<br>
<br>
<br>
<br>

## Release policy

### Auto

Trigger a custom build on [Travis](https://travis-ci.com/SocialGouv/code-du-travail-numerique) (in the "More options" right menu) on the `master` branch with a custom config:

```yml
env:
  global:
    - RELEASE=true
```

### Manual

You need an [Github token](https://github.com/settings/tokens/new) to release.

```sh
#
# Bump, push to git and publish to npm
$ yarn lerna version

#
# Publish the tag change log on the Github Release
$ CONVENTIONAL_GITHUB_RELEASER_TOKEN==************ npx conventional-github-releaser -p angular

#
# You might want to add a Gif to your release to make it groovy ;)
```

## Architecture

```
                             +--------+
                             | kibana |
                             +--------+
                                 |
                                 |
     +--------+          +-------v--------+
     |        |          |                |
     |  data  +---------->  elastisearch  <----------+
     |        |          |                |          |
     +--------+          +----------------+          |
                                 |               +-------+
                                 |               |  APM  |
                             +-------+           +---^---+
                             |       |               |
                             |  API  +---------------+
                             |       |
                             +-------+
                                 |
                                 |
                                 |
                           +------------+
                           |            |
                           |  frontend  |
                           |            |
                           +------------+
```

## URLs

### Demos

- Prod - https://codedutravail.num.social.gouv.fr/
- Dev - https://codedutravail-dev.num.social.gouv.fr
- Sprint 1.1 - https://codedutravail-sprint11.num.social.gouv.fr
- Sprint 1.2 - https://codedutravail-sprint12.num.social.gouv.fr

### Outils

- Slack : https://incubateur-mas.slack.com
- Trello orga : https://trello.com/b/mZfSEZhg/code-du-travail-num%C3%A9rique
- Issues GitHub : [https://github.com/SocialGouv/code-du-travail-numerique/issues]
  - nomenclature des labels :
    - t : `t`ype d’issue
    - p : nom du `p`roduit (j’ai différencié ES et la nav par thèmes pour l’instant)
    - s : `s`tatut de l’issue
    - o : nom de l’`o`util dédié
- Piwik : https://stats.num.social.gouv.fr
- Sentry : https://sentry.num.social.gouv.fr/incubateur/code-du-travail-numerique

## Setup

- ElasticSearch : `docker-compose up`
- API : `yarn api`
- FrontEnd : `yarn frontend`

## Contributions

- Travailler sur des features branches
- Faire des [commits conventionnels](https://github.com/conventional-changelog/conventional-changelog)
- Soumettre des PR sur la branche du sprint en cours

## FAQ

### J'ai rajouté un nouveau package dans dataset mais il n'est pas trouvé lorsqu'on build l'api

il faut le rajouter dans le fichier `/packages/code-du-travail-api/Dockerfile`

```diff
+ COPY ./packages/code-du-travail-data/dataset/yolo/package.json /app/packages/code-du-travail-data/dataset/yolo/package.json
```

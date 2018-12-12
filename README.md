# Code du travail numérique

[![Build Status](https://travis-ci.com/SocialGouv/code-du-travail-numerique.svg?branch=master)](https://travis-ci.com/SocialGouv/code-du-travail-numerique)
[![codecov](https://codecov.io/gh/SocialGouv/code-du-travail-numerique/branch/master/graph/badge.svg)](https://codecov.io/gh/SocialGouv/code-du-travail-numerique)

> Ce repository regroupe les informations sur les projets du code du travail numérique.

## Installation

```sh
# Install all the packages
$ yarn
```

Note: les fichiers d'environment seront créés au _postinstall_ (see [scripts/setup-env.sh](scripts/setup-env.sh)) en fonction du `NODE_ENV`

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
$ docker-compose run python pipenv run python /app/search/indexing/create_indexes.py
```

## Usage

### Local development

```sh
$ yarn dev
```

### Build

```sh
# Build all the packages
$ yarn build

# Build the "<package-name>"
$ yarn workspace <package-name> build

# For example for "code-du-travail-frontend"
$ yarn workspace code-du-travail-frontend build
```

### Test

```sh
# Run all the packages tests
$ yarn test

# Run the "<package-name>" tests
$ yarn workspace <package-name> test

# For example for "code-du-travail-frontend"
$ yarn workspace code-du-travail-frontend test
```

### Prod

```sh
# copy and edit the sample environment file
$ cp .env.sample .env

# Use prod containers configs
$ cp docker-compose.override.prod.yml docker-compose.override.yml

# Run all the containers
$ docker-compose up -d

# Indexing documents
$ docker-compose run python pipenv run python /app/search/indexing/create_indexes.py
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

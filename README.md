# Code du travail numérique

[![Build Status](https://travis-ci.com/SocialGouv/code-du-travail-numerique.svg?branch=master)](https://travis-ci.com/SocialGouv/code-du-travail-numerique)

> Ce repository regroupe les informations sur les projets du code du travail numérique.

## Installation

```sh
# Install all the packages
$ yarn
```

Note: les fichiers d'environment seront créés au _postinstall_ (see [scripts/setup-env.s](scripts/setup-env.sh)) en fonction du `NODE_ENV`

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
$ docker-compose exec python pipenv run python /app/search/indexing/create_indexes.py
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

Edit `.env`

```sh
# Use prod containers configs
$ cp docker-compose.override.prod.yml docker-compose.override.yml

# Run all the containers
$ docker-compose up --build -d
```

## Architecture

```
+--------+          +----------------+          +-------+
|        |          |                |          |       |
|  data  +---------->  elastisearch  +---------->  APM  |
|        |          |                |          |       |
+--------+          +-------+--------+          +-------+
                            |
                            |
                        +---+---+
                        |       |
                        |  API  |
                        |       |
                        +---+---+
                            |
                            |
                            |
                      +-----+------+
                      |            |
                      |  frontend  |
                      |            |
                      +-----+------+
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
- Issues GitHub : packages/code-du-travail-frontend/issues

## Setup

- ElasticSearch : `docker-compose up`
- API : `yarn api`
- FrontEnd : `yarn frontend`

## Contributions

- Travailler sur des features branches
- Faire des [commits conventionnels](https://github.com/conventional-changelog/conventional-changelog)
- Soumettre des PR sur la branche du sprint en cours

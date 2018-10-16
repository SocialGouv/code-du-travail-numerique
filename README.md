# Code du travail numérique

[![Build Status](https://travis-ci.com/SocialGouv/code-du-travail-numerique.svg?branch=master)](https://travis-ci.com/SocialGouv/code-du-travail-numerique)

> Ce repository regroupe les informations sur les projets du code du travail numérique.

## Installation

```sh
$ yarn
```

Note, environment files will be created on *postinstall* (see [scripts/setup-env.s](scripts/setup-env.sh))

### Local development

```sh
$ yarn dev
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

#### Mettre à jour l'index ElasticSearch :

```sh
docker-compose exec python pipenv run python /app/search/indexing/create_indexes.py
```

## Contributions

- Travailler sur des features branches
- Faire des [commits conventionnels](https://github.com/conventional-changelog/conventional-changelog)
- Soumettre des PR sur la branche du sprint en cours

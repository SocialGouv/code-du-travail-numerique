# Code du travail numérique

> Ce repository regroupe les informations sur les projets du code du travail numérique.

## Installation

```sh
$ yarn
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

Editer `.env` et `docker-compose.override.yml` puis lancer `docker-compose up`

#### Mettre à jour l'index ElasticSearch :

```sh
docker-compose exec python pipenv run python /app/search/indexing/create_indexes.py
```

## Contributions

- Travailler sur des features branches
- Faire des [commits conventionnels](https://github.com/conventional-changelog/conventional-changelog)
- Soumettre des PR sur la branche du sprint en cours

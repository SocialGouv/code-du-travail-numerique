
# Code du travail numérique

> Ce repository regroupe les informations sur les projets du code du travail numérique.

## Installation

```sh
$ yarn
```

## Sous-projets

| Projet                                                                             | Scope                                          |
| ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| [code-du-travail-css](packages/code-du-travail-css)           | CSS et HTML de base                            |
| [code-du-travail-ui](packages/code-du-travail-ui)             | composants ReactJS                             |
| [code-du-travail-data](packages/code-du-travail-data)         | datasets et scripts d'indexation elasticsearch |
| [code-du-travail-api](packages/code-du-travail-api)           | API                                            |
| [code-du-travail-frontend](packages/code-du-travail-frontend) | frontend                                       |


Se référer à chaque projet pour les informations spécifiques

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
- Dev -  https://codedutravail-dev.num.social.gouv.fr
- Sprint 1.1 -  https://codedutravail-sprint11.num.social.gouv.fr
- Sprint 1.2 -  https://codedutravail-sprint12.num.social.gouv.fr

### Outils

 - Slack : https://incubateur-mas.slack.com
 - Trello orga : https://trello.com/b/mZfSEZhg/code-du-travail-num%C3%A9rique
 - Issues GitHub : packages/code-du-travail-frontend/issues
 
## Setup

### Dev

En dev, on utilise les scripts npm localement et on fait tourner elastic search dans un docker

 - récupérer [code-du-travail-data](packages/code-du-travail-data), ajouter le `.env` et lancer `docker-compose up`
 - lancer l'indexation ElasticSearch avec la commande indiquée dans le README
 - récupérer [code-du-travail-api](packages/code-du-travail-api), ajouter le `.env` et lancer `npm i && npm start`
 - récupérer [code-du-travail-frontend](packages/code-du-travail-frontend), ajouter le `.env` et lancer `npm i && npm run dev`

### Prod

 - récupérer [code-du-travail-data](packages/code-du-travail-data), ajouter le `.env` et lancer `docker-compose up`
 - lancer l'indexation ElasticSearch avec la commande indiquée dans le README
 - récupérer [code-du-travail-api](packages/code-du-travail-api), ajouter le `.env` et lancer `docker-compose up`
 - récupérer [code-du-travail-frontend](packages/code-du-travail-frontend), ajouter le `.env` et lancer `docker-compose up`

### Network

Les environnements dockers doivent être sur le même docker network

## Contributions

 - Travailler sur des features branches
 - Faire des [commits conventionnels](https://github.com/conventional-changelog/conventional-changelog)
 - Soumettre des PR sur la branche du sprint en cours

# Code du travail numérique

[![Build Status](https://travis-ci.com/SocialGouv/code-du-travail-numerique.svg?branch=master)](https://travis-ci.com/SocialGouv/code-du-travail-numerique)
[![codecov](https://codecov.io/gh/SocialGouv/code-du-travail-numerique/branch/master/graph/badge.svg)](https://codecov.io/gh/SocialGouv/code-du-travail-numerique)

> This repository regroups information about code du travail numerique projects.

<br>
<br>
<br>
<br>

## Installation

Make sure you're using NodeJS 10+.

```sh
# Install all the packages
$ yarn
```

Note: environment file are created at _postinstall_ (see [scripts/setup-env.js](scripts/setup-env.js)) according to `NODE_ENV`

### Data

Before doing anything, update environment variables in the non versioned `.env` file. A versioned `.env.sample` file will help you to do so.
Beware that `SUGGEST_DATA_URL` is a test url in the `.env.sample` file.
Then, ensure that you also have the correct params in the unversioned `docker-compose.override.yml` file

Finally, to (re)initialize data for elasticsearch:

```sh
# Start elasticsearch
$ docker-compose up

#
# Wait for the message:
#
elasticsearch_1  | [20XX-YY-XXT00:00:00,000][INFO ][o.e.n.Node               ] [code-du-travail-data-elasticsearch-single-node] started

# > In parallel, in another terminal <

# Launch indexing script
$ docker-compose run --rm data

# or alternatively
$ yarn workspace @cdt/data populate

```

If some error appears for the nlp_api container, run `docker-compose down`, then run 
the data checklist above again, then run `docker-compose build nlp_api`, and, finally, reinitialize data for elasticsearch.

<br>
<br>
<br>
<br>

## Usage

### Local development

```sh
$ yarn dev
```

If you get weird errors like an `Invariant Violation`, try to rebuild with `yarn build`.

### UI

The UI components are showcased here: [https://socialgouv.github.io/code-du-travail-numerique/](https://socialgouv.github.io/code-du-travail-numerique/)

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

# If there were changes in the ui or the fiche-service-public packages, you need to rebuild them
$ yarn build

# Run all the packages tests
$ yarn test

# Run the "<package-name>" tests
$ yarn workspace <package-name> test

# For example for "code-du-travail-frontend"
$ yarn workspace @cdt/frontend test
```

<br>
<br>
<br>
<br>

## Release policy

Development environment : http://master.code-du-travail-numerique.dev.factory.social.gouv.fr
This is the process to release to the preprod URL like : `https://x-y-z.codedutravail-dev.num.social.gouv.fr/`

### Auto

First, trigger a custom build on [Travis CI > code-du-travail-numerique]((https://travis-ci.com/SocialGouv/code-du-travail-numerique)) > master branch > in the "More options" right menu > trigger custom build.
Add a message like "Release v2.1.0".
Use this YAML config:

```yml
env:
  global:
    - RELEASE=true
```

You can change the lerna arguments though the LERNA_ARGS variable.

 ```yml
env:
  global:
    - LERNA_ARGS="--force-publish --yes --preid next"
    - RELEASE=true
```

> This will :
> - tag the release on GitHub
> - update the changelogs
> - build Docker images
> - push them to DockerHub

Optionally needed:

- update environment variables with `vim dev/.env`
- refresh NLP data with: `sh dev/scripts/download-nlp-data.sh`

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

<br>
<br>
<br>
<br>

## Deployment policy
Tags can be automaticly deployed See https://github.com/SocialGouv/code-du-travail-numerique/deployments

Trigger a custom build on Travis (in the "More options" right menu) on the tag v* you with a custom config:

```
env:
  global:
    - PRODUCTION=true 
```

## Architecture

```
     +--------+          +----------------+
     |        |          |                |
     |  data  +---------->  elastisearch  |
     |        |          |                | 
     +--------+          +----------------+ 
                                 |
                                 |
                             +-------+
                             |       |
                             |  API  |
                             |       |
                             +-------+
                                 |
                                 |
                                 |
                           +------------+      +---------+
                           |            |      |         |
                           |  frontend  +------> API-nlp |
                           |            |      |         |
                           +------------+      +---------+
```

<br>
<br>
<br>
<br>

## URLs

### Demos

- Prod - https://codedutravail.num.social.gouv.fr/
- Dev - https://codedutravail-dev.num.social.gouv.fr

### Tools

- Slack : https://incubateur-mas.slack.com
- Trello orga : https://trello.com/b/mZfSEZhg/code-du-travail-num%C3%A9rique
- Issues GitHub : [https://github.com/SocialGouv/code-du-travail-numerique/issues]
  - nomenclature des labels :
    - t : `t`ype of issue
    - p : name of `p`roduct (we differentiate ES and nav by themes for now)
    - s : `s`tatus of the issue
    - o : name of the dedicated t`o`ol
- Piwik : https://matomo.tools.factory.social.gouv.fr
- Sentry : https://sentry.num.social.gouv.fr/incubateur/code-du-travail-numerique

<br>
<br>
<br>
<br>

## Setup

- ElasticSearch : `docker-compose up`
- API : `yarn api`
- FrontEnd : `yarn frontend`

<br>
<br>
<br>
<br>

## Contributions

- Work on feature branches
- Make [conventional commits](https://github.com/conventional-changelog/conventional-changelog)
- Submit PR on current's sprint branch

<br>
<br>
<br>
<br>

## FAQ

### I added a new package in dataset but it is not found when we build the API ?

You must add it to the `/packages/code-du-travail-api/Dockerfile`

```diff
+ COPY ./packages/code-du-travail-data/dataset/yolo/package.json /app/packages/code-du-travail-data/dataset/yolo/package.json
```

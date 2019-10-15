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

### Running nlp service locally using .dev config

By default nlp api is mocked with our local node api.
To launch the nodejs API without mock, you should use

```sh
# for local dev using nodemon
$ yarn workspace @cdt/api dev-with-nlp

# or to test the built version
$ yarn workspace @cdt/api build && yarn workspace @cdt/api start
```

To launch the frontend app without mock, you should use

```sh
# for local dev
$ yarn workspace @cdt/frontend dev-with-nlp

# or to test the built version
$ yarn workspace @cdt/frontend build && yarn workspace @cdt/frontend start
```

Before doing anything, update environment variables in the non versioned `.env` file. A versioned `.env.sample` file will help you to do so.
Then, ensure that you also have the correct params in the unversioned `docker-compose.override.yml` file

If you opted for the `docker-compose.override.dev.yml` config (Good choice !) you will need to have a local monorepo image.
So let's build it.

```sh
# Build the monorepo image
$ docker build . -t cdtn_master:local
```

You have to populate data locally for the nlp api with this command

```sh
# Populate data to nlp api
$ CDTN_REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
$ docker run \
        --rm \
        --entrypoint cat $CDTN_REGISTRY/data:$(git rev-parse origin/master) /app/dump.tf.json \
        > ./packages/code-du-travail-nlp/data/dump.data.json
```

Then you can launch services using docker-compose

```sh
# start elasticsearch + nlp_api
$ docker-compose up elasticsearch nlp_api
```

### Running elasticsearch service locally

```sh
# start elasticsearch
$ docker-compose up elasticsearch
#
# Wait for the message:
#
elasticsearch_1  | [20XX-YY-XXT00:00:00,000][INFO ][o.e.n.Node               ] [code-du-travail-data-elasticsearch-single-node] started

# > In parallel, in another terminal <

# Launch indexing script
$ yarn workspace @cdt/data populate-dev

```

Each packages readme also details how to build and run a locally version of the service using docker.

## Usage

### Javascript development

```sh
$ yarn dev
```

If you get weird errors like an `Invariant Violation`, try to rebuild with `yarn build`.

### UI

The UI components are showcased here: <https://socialgouv.github.io/code-du-travail-numerique/>

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

Development environment : <http://master.code-du-travail-numerique.dev.factory.social.gouv.fr>
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
>
> -  tag the release on GitHub
> -  update the changelogs
> -  build Docker images
> -  push them to DockerHub

Optionally needed:

-   update environment variables with `vim dev/.env`
-   refresh NLP data with: `sh dev/scripts/download-nlp-data.sh`

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

Tags can be automaticly deployed See <https://github.com/SocialGouv/code-du-travail-numerique/deployments>

Trigger a custom build on Travis (in the "More options" right menu) on the tag v\* you with a custom config:

```yml
env:
  global:
    - PRODUCTION=true
```

## Architecture

```img
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

-  Production
  -  <https://code.travail.gouv.fr/> (previously codedutravail.num.social.gouv.fr )

-  master (dev)
  -  <http://master.code-du-travail-numerique.dev.factory.social.gouv.fr(previously> codedutravail-dev.num.social.gouv.fr)

-  staging (tag):
  -  <https://v3-2-0.code-du-travail-numerique.incubateur.social.gouv.fr>
  -  <https://v3-1-0.code-du-travail-numerique.incubateur.social.gouv.fr>

### Tools

-  Issues GitHub : <https://github.com/SocialGouv/code-du-travail-numerique/issues>
-  nomenclature des labels :
    -  t : `t`ype of issue
    -  p : name of `p`roduct (we differentiate ES and nav by themes for now)
    -  s : `s`tatus of the issue
    -  o : name of the dedicated t`o`ol

-  Matomo (piwik) : <https://matomo.tools.factory.social.gouv.fr>
-  Sentry : <https://sentry.tools.factory.social.gouv.fr>
-  Mattermost : <https://mattermost.num.social.gouv.fr/>
-  Trello orga : <https://trello.com/b/mZfSEZhg/code-du-travail-num%C3%A9rique>

<br>
<br>
<br>
<br>

## Setup

-  ElasticSearch & nlp : `docker-compose up elasticsearch nlp_api`
-  API : `yarn api`
-  FrontEnd : `yarn frontend`

<br>
<br>
<br>
<br>

## Contributions

-  Work on feature branches
-  Make [conventional commits](https://github.com/conventional-changelog/conventional-changelog)
-  Submit PR on current's sprint branch

<br>
<br>
<br>
<br>

## HOW TO

To print SHA1 hashe to a given revision you can use :

```ssh
$ git rev-parse origin/master
```

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

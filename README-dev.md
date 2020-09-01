# Code du travail numérique - dev

[![Build Status](https://travis-ci.com/SocialGouv/code-du-travail-numerique.svg?branch=master)](https://travis-ci.com/SocialGouv/code-du-travail-numerique)
[![codecov](https://codecov.io/gh/SocialGouv/code-du-travail-numerique/branch/master/graph/badge.svg)](https://codecov.io/gh/SocialGouv/code-du-travail-numerique)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique?ref=badge_shield)

<br/><br/>

![schema](./schema.png)

<br/><br/>

## URLs

### Demos

- Production : <https://code.travail.gouv.fr>
- master (dev) : <https://master-code-travail.dev.fabrique.social.gouv.fr>

## Installation

Make sure you're using NodeJS 12+.

```sh
# Install all the packages
$ yarn
$ yarn build
```

Note: environment file can be created using [scripts/setup-env.js](scripts/setup-env.js)) according to `NODE_ENV`, default to `dev`

### Dev

#### Packages

| Package                                                               | description                                        |
| --------------------------------------------------------------------- | -------------------------------------------------- |
| [code-du-travail-api](./packages/code-du-travail-api)                 | NodeJS koa API                                     |
| [code-du-travail-data](./packages/code-du-travail-data)               | Datasets and Elastic indexing scripts and mappings |
| [code-du-travail-frontend](./packages/code-du-travail-frontend)       | Next.js frontend application                       |
| [react-fiches-service-public](./packages/react-fiches-service-public) | React components for fiches service-public.fr      |
| [react-ui](./packages/react-ui)                                       | React components and styleguide                    |

#### Frontend

Run the frontend with our online latest API :

```sh
API_URL=https://api-master-code-travail.dev.fabrique.social.gouv.fr/api/v1 yarn workspace @cdt/frontend dev
```

If you need to work on both frontend and api, don't provide API_URL as it will fallback to `http://localhost:1317/api/v1`

```sh
yarn workspace @cdt/frontend dev
```

The React components are defined in the [react-ui](./packages/react-ui) package and showcased here: <https://socialgouv-react-ui.netlify.com>

#### Backend

To run the NodeJS API, you need an Elasticsearch instance and a [python-nlp](./packages/code-du-travail-nlp) instance.

The provided [docker-compose.yml](./docker-compose.yml) provide all the environment.

We recommend to use the `docker-compose.override.dev.yml` config for local development.

To fill your ElasticSearch, you'll need to get the latest dataset dump from our registry :

```sh
$ CDTN_REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
$ docker run \
        --rm \
        --entrypoint cat $CDTN_REGISTRY/data:$(git rev-parse origin/master) /app/dist/dump.data.json \
        >! packages/code-du-travail-data/dist/dump.tf.json
```

Then you can launch services using docker-compose

```sh
# start elasticsearch 
$ docker-compose up elasticsearch 

# Launch indexing script : fill ElasticSearch
$ yarn workspace @cdt/data populate-dev

# Start API in dev mode : runs on http://localhost:1337
yarn workspace @cdt/api dev
```

## Howto

In this section you will find commands that you may need during your work

Start a local TF Serve NLP instance
[Look at this repo](https://github.com/SocialGouv/serving-ml)


Create a dump with semantic vectors (you will need a NLP service available)
(if NLP_URL env is not provide it will create a dump without semantic vectors)

```
NLP_URL=https://preprod-serving-ml.dev2.fabrique.social.gouv.fr yarn workspace @cdt/data dump-dev
```

Populate elasticsearch index using a local dump

```
yarn workspace @cdt/data populate-dev
```

Download a dump from master data image

```
docker run \
   --rm --entrypoint cat \
   registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique/data:$(git rev-parse origin/master) \
   /app/dist/dump.data.json \
   >! packages/code-du-travail-data/dist/dump.tf.json
```

To launch a local tf-serve instance, you can report to the README of our [serving-ml project](https://github.com/SocialGouv/serving-ml#using-a-tensorflow-model-with-tensorflowserving)

You can also read the packages readme

- [Data README](./packages/code-du-travail-nlp/README.md)
- [API README](./packages/code-du-travail-nlp/README.md)
- [e2e README](./optional/e2e/README.md)

## Contributions

- See [code of conduct](./CODE_OF_CONDUCT.md)
- Work on feature branches
- Make [conventional commits](https://github.com/conventional-changelog/conventional-changelog)

### Issues

- Issues GitHub : <https://github.com/SocialGouv/code-du-travail-numerique/issues>
- nomenclature des labels :

  - t : `t`ype of issue
  - p : name of `p`roduct (we differentiate ES and nav by themes for now)
  - s : `s`tatus of the issue
  - o : name of the dedicated t`o`ol

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique?ref=badge_large)

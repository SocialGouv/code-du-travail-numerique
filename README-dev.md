# Code du travail numérique - dev

[![Build Status](https://travis-ci.com/SocialGouv/code-du-travail-numerique.svg?branch=master)](https://travis-ci.com/SocialGouv/code-du-travail-numerique)
[![codecov](https://codecov.io/gh/SocialGouv/code-du-travail-numerique/branch/master/graph/badge.svg)](https://codecov.io/gh/SocialGouv/code-du-travail-numerique)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique?ref=badge_shield)

<br/><br/>

![schema](./schema.png)

<br/><br/>

## Installation

Make sure you're using NodeJS 12+.

```sh
# Install all the packages
$ yarn
$ yarn build
```

Note: environment file are created at _postinstall_ (see [scripts/setup-env.js](scripts/setup-env.js)) according to `NODE_ENV`

### Dev

#### Packages

| Package                                                               | description                                        |
| --------------------------------------------------------------------- | -------------------------------------------------- |
| [code-du-travail-api](./packages/code-du-travail-api)                 | NodeJS koa API                                     |
| [code-du-travail-data](./packages/code-du-travail-data)               | Datasets and Elastic indexing scripts and mappings |
| [code-du-travail-frontend](./packages/code-du-travail-frontend)       | Next.js frontend application                       |
| [code-du-travail-nlp](./packages/code-du-travail-nlp)                 | TensorFlow API                                     |
| [react-fiches-service-public](./packages/react-fiches-service-public) | React components for fiches service-public.fr      |
| [react-ui](./packages/react-ui)                                       | React components and styleguide                    |

#### Frontend

Run the frontend with our online latest API :

```sh
# Launch packages/code-du-travail-frontend dev
yarn workspace @cdt/frontend dev
```

The React components are defined in the [react-ui](./packages/react-ui) package and showcased here: <https://socialgouv-react-ui.netlify.com>

#### Backend

To run the NodeJS API, you need an Elastic Search instance and a [python-nlp](./packages/code-du-travail-nlp) instance.

The provided [docker-compose.yml](./docker-compose.yml) provide all the environment.

If you opted for the `docker-compose.override.dev.yml` config (Good choice !) you will need to have a local monorepo image.
So let's build it.

```sh
# Build the monorepo image
$ docker build . -t cdtn_master:local
```

To fill your ElasticSearch, you'll need to get the latest dataset dump from our registry :

```sh
$ CDTN_REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
$ docker run \
        --rm \
        --entrypoint cat $CDTN_REGISTRY/data:$(git rev-parse origin/master) /app/dump.tf.json \
        > ./packages/code-du-travail-nlp/data/dump.tf.json
```

Then you can launch services using docker-compose

```sh
# start elasticsearch + nlp_api
$ docker-compose up elasticsearch nlp_api

# Launch indexing script : fill ElasticSearch
$ yarn workspace @cdt/data populate-dev

# Start API in dev mode : runs on http://localhost:1337
yarn workspace @cdt/api dev
```

## URLs

### Demos

- Production : <https://code.travail.gouv.fr>
- master (dev) : <https://master-code-travail.dev.fabrique.social.gouv.fr>

### Tools

- Issues GitHub : <https://github.com/SocialGouv/code-du-travail-numerique/issues>
- nomenclature des labels :

  - t : `t`ype of issue
  - p : name of `p`roduct (we differentiate ES and nav by themes for now)
  - s : `s`tatus of the issue
  - o : name of the dedicated t`o`ol

## Contributions

- See [code of conduct](./CODE_OF_CONDUCT.md)
- Work on feature branches
- Make [conventional commits](https://github.com/conventional-changelog/conventional-changelog)

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique?ref=badge_large)

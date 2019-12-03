FROM node:10-alpine

# NOTE(douglasduteil): add `curl` in the master image
# `curl` is very useful for later health check tests ;)
RUN apk add --no-cache --update git=2.22.0-r0 curl=7.66.0-r0

#

WORKDIR /app
RUN chown node:node /app

#

COPY ./scripts /app/scripts

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

COPY ./packages/code-du-travail-data/dataset/courrier-type/package.json /app/packages/code-du-travail-data/dataset/courrier-type/package.json
COPY ./packages/code-du-travail-data/dataset/fiches_ministere_travail/package.json /app/packages/code-du-travail-data/dataset/fiches_ministere_travail/package.json
COPY ./packages/code-du-travail-data/dataset/stop_words/package.json /app/packages/code-du-travail-data/dataset/stop_words/package.json
COPY ./packages/code-du-travail-data/dataset/synonyms/package.json /app/packages/code-du-travail-data/dataset/synonyms/package.json
COPY ./packages/code-du-travail-data/dataset/stats/package.json /app/packages/code-du-travail-data/dataset/stats/package.json
COPY ./packages/code-du-travail-data/dataset/datafiller/package.json /app/packages/code-du-travail-data/dataset/datafiller/package.json
COPY ./packages/code-du-travail-data/package.json /app/packages/code-du-travail-data/package.json
COPY ./packages/react-fiche-service-public/package.json /app/packages/react-fiche-service-public/package.json
COPY ./packages/code-du-travail-data/dataset/preavis-demission/package.json /app/packages/code-du-travail-data/dataset/preavis-demission/package.json
COPY ./packages/code-du-travail-data/dataset/preavis-licenciement/package.json /app/packages/code-du-travail-data/dataset/preavis-licenciement/package.json
COPY ./packages/code-du-travail-data/dataset/prime-precarite/package.json /app/packages/code-du-travail-data/dataset/prime-precarite/package.json
COPY ./packages/sources/package.json /app/packages/sources/package.json


# PERF(douglasduteil): put packages that are more likely to change in order here
# By order of "more likely to change" the frontend, the api, etc... are changing
# more often than the dataset.
# Putting them after will optimise the native docker build cache of the image
COPY ./packages/react-ui/package.json /app/packages/react-ui/package.json
COPY ./packages/code-du-travail-api/package.json /app/packages/code-du-travail-api/package.json
COPY ./packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json


RUN yarn --frozen-lockfile && yarn cache clean

#

COPY ./lerna.json /app/lerna.json
COPY ./packages /app/packages

RUN yarn build

USER node

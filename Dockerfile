FROM node:10-alpine

# NOTE(douglasduteil): add `curl` in the master image
# `curl` is very useful for later health check tests ;)
RUN apk add --no-cache --update curl

#

WORKDIR /app

#

COPY ./scripts /app/scripts

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

COPY ./packages/code-du-travail-data/dataset/annuaire/package.json /app/packages/code-du-travail-data/dataset/annuaire/package.json
COPY ./packages/code-du-travail-data/dataset/code_du_travail/eposeidon_script/package.json /app/packages/code-du-travail-data/dataset/code_du_travail/eposeidon_script/package.json
COPY ./packages/code-du-travail-data/dataset/courrier-type/package.json /app/packages/code-du-travail-data/dataset/courrier-type/package.json
COPY ./packages/code-du-travail-data/dataset/fiches_ministere_travail/package.json /app/packages/code-du-travail-data/dataset/fiches_ministere_travail/package.json
COPY ./packages/code-du-travail-data/dataset/kali/package.json /app/packages/code-du-travail-data/dataset/kali/package.json
COPY ./packages/code-du-travail-data/dataset/stop_words/package.json /app/packages/code-du-travail-data/dataset/stop_words/package.json
COPY ./packages/code-du-travail-data/dataset/synonyms/package.json /app/packages/code-du-travail-data/dataset/synonyms/package.json
COPY ./packages/code-du-travail-data/dataset/themes/package.json /app/packages/code-du-travail-data/dataset/themes/package.json
COPY ./packages/code-du-travail-data/package.json /app/packages/code-du-travail-data/package.json
COPY ./packages/react-fiche-service-public/package.json /app/packages/react-fiche-service-public/package.json

# PERF(douglasduteil): put packages that are more likely to change in order here
# By order of "more likely to change" the frontend, the api, etc... are changing
# more often than the dataset.
# Putting them after will optimise the native docker build cache of the image
COPY ./packages/code-du-travail-ui/package.json /app/packages/code-du-travail-ui/package.json
COPY ./packages/code-du-travail-api/package.json /app/packages/code-du-travail-api/package.json
COPY ./packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json


RUN yarn --frozen-lockfile && yarn cache clean

#

COPY ./lerna.json /app/lerna.json
COPY ./packages /app/packages

RUN yarn build

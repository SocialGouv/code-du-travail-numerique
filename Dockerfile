FROM node:14.17-alpine3.13

# NOTE(douglasduteil): add `curl` in the master image
# `curl` is very useful for later health check tests ;)
RUN apk add --no-cache git=~2 curl=~7

#

WORKDIR /app

#

COPY ./scripts /app/scripts

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

COPY ./packages/code-du-travail-data/package.json /app/packages/code-du-travail-data/package.json
COPY ./packages/code-du-travail-data/prime-precarite/package.json /app/packages/code-du-travail-data/prime-precarite/package.json
COPY ./packages/code-du-travail-data/simulateurs/package.json /app/packages/code-du-travail-data/simulateurs/package.json
COPY ./packages/code-du-travail-data/tools/package.json /app/packages/code-du-travail-data/tools/package.json
COPY ./packages/react-fiche-service-public/package.json /app/packages/react-fiche-service-public/package.json
COPY ./packages/sources/package.json /app/packages/sources/package.json
COPY ./packages/slugify/package.json /app/packages/slugify/package.json


# PERF(douglasduteil): put packages that are more likely to change in order here
# By order of "more likely to change" the frontend, the api, etc... are changing
# more often than the dataset.
# Putting them after will optimise the native docker build cache of the image
COPY ./packages/react-ui/package.json /app/packages/react-ui/package.json
COPY ./packages/code-du-travail-api/package.json /app/packages/code-du-travail-api/package.json
COPY ./packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json
COPY ./packages/code-du-travail-modeles/package.json /app/packages/code-du-travail-modeles/package.json

RUN yarn --frozen-lockfile && yarn cache clean

# fake CI env
ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

COPY ./lerna.json /app/lerna.json
COPY ./packages /app/packages

RUN yarn build


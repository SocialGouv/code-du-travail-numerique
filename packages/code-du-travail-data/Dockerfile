ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}


# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image

ARG NLP_URL
ENV NLP_URL=$NLP_URL

ENV CDTN_ADMIN_ENDPOINT=https://lionelb-add-publi-vdgr1r-cdtn-admin.dev2.fabrique.social.gouv.fr/api/graphql

RUN yarn workspace @cdt/data dump-dev

FROM node:14.16-alpine3.13

WORKDIR /app

COPY ./package.json /app/package.json
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist /app/dist
COPY ./dataset/stop_words/stop_words.json ./dataset/stop_words/stop_words.json
COPY ./dataset/synonyms/synonyms.json ./dataset/synonyms/synonyms.json
COPY ./dataset/suggestions.txt ./dataset/suggestions.txt

ENV SUGGEST_FILE=./dataset/suggestions.txt
ENV DUMP_PATH=../dump.data.json

USER node

ENTRYPOINT ["yarn", "populate"]

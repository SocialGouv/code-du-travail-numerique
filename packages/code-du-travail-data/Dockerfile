ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}


# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image

ARG NLP_URL
ENV NLP_URL=$NLP_URL

RUN yarn workspace @cdt/data dump-dev

FROM node:12.18-alpine3.10
COPY ./package.json /app/package.json
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist /app/dist
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/kali-data/data /app/node_modules/@socialgouv/kali-data/data
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/fiches-travail-data/data /app/node_modules/@socialgouv/fiches-travail-data/data
COPY ./dataset/stop_words/stop_words.json ./dataset/stop_words/stop_words.json
COPY ./dataset/synonyms/synonyms.json ./dataset/synonyms/synonyms.json
COPY ./dataset/suggestions.txt ./dataset/suggestions.txt

WORKDIR /app

ENV SUGGEST_FILE=../dataset/suggestions.txt

USER node

ENV DUMP_PATH=../dump.data.json
ENTRYPOINT ["yarn", "populate"]

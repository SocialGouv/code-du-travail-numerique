ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

ARG NLP_IMAGE=${REGISTRY}/nlp:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image

# hadolint ignore=DL3006
FROM ${NLP_IMAGE} as cdtn-nlp-image

FROM node:10-alpine

RUN apk add --no-cache curl=7.55.0-r2 && rm -rf /var/cache/apk/*

COPY ./package.json /app/package.json
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist /app/dist
COPY --from=cdtn-nlp-image /app/data/dump.tf.json /app/dump.tf.json
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/kali-data/data /app/node_modules/@socialgouv/kali-data/data
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/legi-data/package.json /app/node_modules/@socialgouv/legi-data/package.json

COPY ./dataset/stop_words/stop_words.json ./dataset/stop_words/stop_words.json
COPY ./dataset/synonyms/synonyms.json ./dataset/synonyms/synonyms.json
COPY ./dataset/datafiller/themes.data.json ./dataset/datafiller/themes.data.json

ENV SUGGEST_DATA_URL=https://gist.github.com/rmelisson/31a6a17284d4022baa1faeda13afcc3a/raw/05d8138deed49cbab058b474fa8a0594b233bca2/cdtn_entities.txt
RUN curl -L $SUGGEST_DATA_URL -o ./dataset/suggestions.txt

WORKDIR /app
ENV SUGGEST_FILE=../dataset/suggestions.txt
ENV DUMP_PATH=../dump.tf.json
ENTRYPOINT ["yarn", "populate"]

ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}


# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image

FROM node:14.16-alpine3.13

WORKDIR /app

COPY ./package.json /app/package.json
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist /app/dist
COPY ./dataset/suggestions.txt ./dataset/suggestions.txt

ENV SUGGEST_FILE=./dataset/suggestions.txt

USER node

ENTRYPOINT ["yarn", "start"]

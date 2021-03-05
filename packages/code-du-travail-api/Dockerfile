ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image

FROM node:12.21-alpine3.10

COPY ./package.json /app/package.json

COPY --from=cdtn-base-image /app/packages/code-du-travail-api/dist /app/dist

RUN yarn add elastic-apm-node --production

WORKDIR /app

USER node

ENTRYPOINT ["yarn", "start"]

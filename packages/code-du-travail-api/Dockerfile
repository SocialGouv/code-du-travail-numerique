ARG IMAGE_TAG=master
ARG REGISTRY=harbor.fabrique.social.gouv.fr/cdtn/cdtn-base
ARG BASE_IMAGE=${REGISTRY}:${IMAGE_TAG}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image

FROM node:14.17-alpine3.13

COPY ./package.json /app/package.json

COPY --from=cdtn-base-image /app/packages/code-du-travail-api/dist /app/dist

RUN yarn add elastic-apm-node --production

WORKDIR /app

USER node

ENTRYPOINT ["yarn", "start"]

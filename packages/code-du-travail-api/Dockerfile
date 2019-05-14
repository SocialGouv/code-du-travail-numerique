ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

FROM ${BASE_IMAGE} as cdtn-base-image

FROM node:10-alpine

COPY ./package.json /app/package.json
COPY --from=cdtn-base-image /app/packages/code-du-travail-api/dist /app/dist
COPY --from=cdtn-base-image /app/node_modules/@cdt/data...courrier-type /node_modules/@cdt/data...courrier-type
COPY --from=cdtn-base-image /app/node_modules/@cdt/data...themes /node_modules/@cdt/data...themes

WORKDIR /app

ENTRYPOINT ["yarn", "start"]

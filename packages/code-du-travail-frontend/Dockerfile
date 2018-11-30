ARG BASE_IMAGE=socialgouv/code-du-travail-numerique:master

FROM ${BASE_IMAGE} as master

FROM node:10-alpine

COPY ./package.json /app/package.json
COPY --from=master /app/packages/code-du-travail-frontend/dist /app/dist

WORKDIR /app

ENTRYPOINT ["yarn", "start"]

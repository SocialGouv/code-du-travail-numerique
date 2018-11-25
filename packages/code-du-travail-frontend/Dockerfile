ARG BASE_IMAGE=socialgouv/code-du-travail-numerique:master

FROM ${BASE_IMAGE} as master

FROM node:10-alpine

COPY ./package.json /app/package.json
COPY ./server.js /app/server.js
COPY ./routes.js /app/routes.js
COPY --from=master /app/packages/code-du-travail-frontend/.next /app/.next

WORKDIR /app

ENTRYPOINT ["yarn", "start"]

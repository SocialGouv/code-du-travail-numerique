ARG BASE_IMAGE=socialgouv/code-du-travail-numerique:master

FROM ${BASE_IMAGE} as master

FROM node:10-alpine

COPY ./package.json /app/package.json
COPY --from=master /app/packages/code-du-travail-api/dist /app/dist
COPY --from=master /app/node_modules/@cdt/data...courrier-type /node_modules/@cdt/data...courrier-type

WORKDIR /app

ENTRYPOINT ["yarn", "start"]

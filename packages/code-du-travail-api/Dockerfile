ARG BASE_IMAGE=socialgouv/code-du-travail-numerique:master

FROM ${BASE_IMAGE} as master

FROM node:10-alpine

COPY --from=master /app/packages/code-du-travail-api/src /app/src
COPY --from=master /app/packages/code-du-travail-api/node_modules /app/node_modules
COPY --from=master /app/node_modules /node_modules

WORKDIR /app

ENTRYPOINT ["yarn", "start"]

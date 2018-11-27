ARG BASE_IMAGE=socialgouv/code-du-travail-numerique:master

FROM ${BASE_IMAGE} as master

FROM node:10-alpine

COPY ./package.json /app/package.json
COPY ./server.js /app/server.js
COPY ./routes.js /app/routes.js
COPY --from=master /app/packages/code-du-travail-frontend/.next /app/.next
COPY --from=master /app/packages/code-du-travail-frontend/node_modules /app/node_modules
COPY --from=master /app/node_modules /node_modules

WORKDIR /app

ENTRYPOINT ["yarn", "start"]

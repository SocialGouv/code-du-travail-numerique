ARG BASE_IMAGE=socialgouv/code-du-travail-numerique:master

FROM ${BASE_IMAGE} as master

FROM node:10-alpine

ENV API_PORT=1337
ENV ELASTICSEARCH_LOG_LEVEL="trace"
ENV APM_SERVER_ACTIVE=0
ENV ELASTICSEARCH_URL="http://elasticsearch:9200"
ENV APM_SERVER_URL="http://apm:8200"

COPY ./package.json /app/package.json
COPY ./dist /app/dist
COPY --from=master /app/node_modules/@cdt/data...courrier-type /node_modules/@cdt/data...courrier-type

WORKDIR /app
EXPOSE ${API_PORT}

ENTRYPOINT ["yarn", "start"]

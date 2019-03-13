ARG TAG_BASE_IMAGE=master
ARG BASE_IMAGE=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:${TAG_BASE_IMAGE}

FROM ${BASE_IMAGE} as cdtn-base-image

FROM node:10-alpine

ENV API_PORT=1337
ENV ELASTICSEARCH_LOG_LEVEL="trace"
ENV APM_SERVER_ACTIVE=0
ENV ELASTICSEARCH_URL="http://elasticsearch:9200"
ENV APM_SERVER_URL="http://apm:8200"

COPY ./package.json /app/package.json
COPY --from=cdtn-base-image /app/packages/code-du-travail-api/dist /app/dist
COPY --from=cdtn-base-image /app/node_modules/@cdt/data...courrier-type /node_modules/@cdt/data...courrier-type

WORKDIR /app
EXPOSE ${API_PORT}

ENTRYPOINT ["yarn", "start"]

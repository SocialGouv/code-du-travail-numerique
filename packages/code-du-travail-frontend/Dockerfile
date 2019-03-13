ARG TAG_BASE_IMAGE=master
ARG BASE_IMAGE=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:${TAG_BASE_IMAGE}

FROM ${BASE_IMAGE}

ENV PORT=3000
ENV API_URL="http://code-du-travail-numerique-api.ops.factory.social.gouv.fr/api/v1"

WORKDIR /app
EXPOSE ${PORT}

ENTRYPOINT ["yarn", "workspace", "@cdt/frontend", "start"]

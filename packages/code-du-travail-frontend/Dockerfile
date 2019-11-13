ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE}

WORKDIR /app

USER node

ENV DUMP_PATH "../../code-du-travail-data/dist/dump.data.json"

RUN yarn workspace @cdt/frontend generate-sitemap

ENTRYPOINT ["yarn", "workspace", "@cdt/frontend", "start"]

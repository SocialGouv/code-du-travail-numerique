ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}
ARG API_URL=${API_URL}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE}

WORKDIR /app

USER node

RUN API_URL=${API_URL} yarn workspace @cdt/frontend build-front
RUN yarn workspace @cdt/frontend generate-sitemap

ENTRYPOINT ["yarn", "workspace", "@cdt/frontend", "start"]

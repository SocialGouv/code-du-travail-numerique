ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

FROM ${BASE_IMAGE}

WORKDIR /app

ENTRYPOINT ["yarn", "workspace", "@cdt/frontend", "start"]

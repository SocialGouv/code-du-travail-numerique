ARG TAG_BASE_IMAGE=master
ARG BASE_IMAGE=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:${TAG_BASE_IMAGE}

FROM ${BASE_IMAGE}

WORKDIR /app

ENTRYPOINT ["yarn", "workspace", "@cdt/frontend", "start"]

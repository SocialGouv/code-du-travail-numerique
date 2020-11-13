ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE}

WORKDIR /app

USER node

RUN yarn workspace @cdt/frontend generate-sitemap
RUN yarn workspace @cdt/frontend generate-robots

ENV NEXT_TELEMETRY_DISABLED=1
ENTRYPOINT ["yarn", "workspace", "@cdt/frontend", "start"]

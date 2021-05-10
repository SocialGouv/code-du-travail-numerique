ARG TAG_BASE_IMAGE=master
ARG REGISTRY=harbor.fabrique.social.gouv.fr/cdtn/cdtn-base
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE}

WORKDIR /app

USER node

ENV NEXT_TELEMETRY_DISABLED=1
ENTRYPOINT ["yarn", "workspace", "@cdt/frontend", "start"]

ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image

FROM node:10-alpine

COPY ./package.json /app/package.json
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist /app/dist
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/kali-data/package.json /app/node_modules/@socialgouv/kali-data/package.json
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/kali-data/data /app/node_modules/@socialgouv/kali-data/data
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/legi-data/package.json /app/node_modules/@socialgouv/legi-data/package.json
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/legi-data/data/LEGITEXT000006072050.json /app/node_modules/@socialgouv/legi-data/data

COPY ./dataset/fiches_ministere_travail/fiches-mt.json ./dataset/fiches_ministere_travail/fiches-mt.json
COPY ./dataset/stop_words/stop_words.json ./dataset/stop_words/stop_words.json
COPY ./dataset/synonyms/synonyms.json ./dataset/synonyms/synonyms.json
COPY ./dataset/annuaire/annuaire.data.json ./dataset/annuaire/annuaire.data.json
COPY ./dataset/fiches_service_public/fiches-sp.json ./dataset/fiches_service_public/fiches-sp.json
COPY ./dataset/datafiller/themes.data.json ./dataset/datafiller/themes.data.json
COPY ./dataset/faq.json ./dataset/faq.json
COPY ./dataset/faq-contributions.json ./dataset/faq-contributions.json
COPY ./dataset/export-courriers.json ./dataset/export-courriers.json
COPY ./dataset/outils.json ./dataset/outils.json

WORKDIR /app

ENTRYPOINT ["yarn", "populate"]

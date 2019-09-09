ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

FROM ${BASE_IMAGE} as cdtn-base-image

FROM node:10-alpine

COPY ./package.json /app/package.json
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist /app/dist
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist-dump /app/dist-dump
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/kali-data/package.json /app/node_modules/@socialgouv/kali-data/package.json
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/kali-data/data /app/node_modules/@socialgouv/kali-data/data
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/legi-data/package.json /app/node_modules/@socialgouv/legi-data/package.json
COPY --from=cdtn-base-image /app/node_modules/@socialgouv/legi-data/data/LEGITEXT000006072050.json /app/node_modules/@socialgouv/legi-data/data

COPY ./dataset/fiches_ministere_travail/fiches-min-travail.json ./dataset/fiches_ministere_travail/fiches-min-travail.json
COPY ./dataset/stop_words/stop_words.json ./dataset/stop_words/stop_words.json
COPY ./dataset/synonyms/synonyms.json ./dataset/synonyms/synonyms.json
COPY ./dataset/annuaire/annuaire.data.json ./dataset/annuaire/annuaire.data.json
COPY ./dataset/fiches_service_public/fiches-sp-travail.json ./dataset/fiches_service_public/fiches-sp-travail.json
COPY ./dataset/themes/themes.json ./dataset/themes/themes.json
COPY ./dataset/faq.json ./dataset/faq.json
COPY ./dataset/faq-contributions.json ./dataset/faq-contributions.json
COPY ./dataset/faq-snippets.json ./dataset/faq-snippets.json
COPY ./dataset/export-courriers.json ./dataset/export-courriers.json
COPY ./dataset/outils.json ./dataset/outils.json

WORKDIR /app

ENTRYPOINT ["sh", "entrypoint.sh"]

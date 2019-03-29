FROM node:10-alpine

WORKDIR /app

#

COPY ./scripts /app/scripts

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

COPY ./packages/code-du-travail-api/package.json /app/packages/code-du-travail-api/package.json
COPY ./packages/code-du-travail-css/package.json /app/packages/code-du-travail-css/package.json
COPY ./packages/code-du-travail-data/package.json /app/packages/code-du-travail-data/package.json
COPY ./packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json
COPY ./packages/code-du-travail-ui/package.json /app/packages/code-du-travail-ui/package.json
COPY ./packages/code-du-travail-data/dataset/annuaire/package.json /app/packages/code-du-travail-data/dataset/annuaire/package.json
COPY ./packages/code-du-travail-data/dataset/courrier-type/package.json /app/packages/code-du-travail-data/dataset/courrier-type/package.json
COPY ./packages/code-du-travail-data/dataset/fiches_ministere_travail/package.json /app/packages/code-du-travail-data/dataset/fiches_ministere_travail/package.json
COPY ./packages/code-du-travail-data/dataset/kali/package.json /app/packages/code-du-travail-data/dataset/kali/package.json
COPY ./packages/code-du-travail-data/dataset/stop_words/package.json /app/packages/code-du-travail-data/dataset/stop_words/package.json
COPY ./packages/code-du-travail-data/dataset/synonyms/package.json /app/packages/code-du-travail-data/dataset/synonyms/package.json
COPY ./packages/code-du-travail-data/dataset/code_du_travail/eposeidon_script/package.json /app/packages/code-du-travail-data/dataset/code_du_travail/eposeidon_script/package.json

RUN yarn --frozen-lockfile && yarn cache clean

#

COPY ./lerna.json /app/lerna.json
COPY ./packages /app/packages

RUN yarn build

#

COPY ./docker /app/docker
COPY ./docker-compose.yml /app/docker-compose.yml

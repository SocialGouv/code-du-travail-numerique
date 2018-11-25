FROM node:10


COPY ./scripts /app/scripts

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

COPY ./packages/code-du-travail-api/package.json /app/packages/code-du-travail-api/package.json
COPY ./packages/code-du-travail-css/package.json /app/packages/code-du-travail-css/package.json
COPY ./packages/code-du-travail-data/package.json /app/packages/code-du-travail-data/package.json
COPY ./packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json
COPY ./packages/code-du-travail-ui/package.json /app/packages/code-du-travail-ui/package.json

WORKDIR /app

RUN yarn --frozen-lockfile

COPY ./lerna.json /app/lerna.json
COPY ./packages /app/packages

RUN yarn build

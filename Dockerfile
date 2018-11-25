FROM node:10 as installer

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

#

FROM node:10

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages /app/packages
COPY ./lerna.json /app/lerna.json
COPY ./package.json /app/package.json
COPY ./packages /app/packages

WORKDIR /app

RUN yarn build

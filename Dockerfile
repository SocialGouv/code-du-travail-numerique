# dist
FROM node:14.17-alpine3.13 AS dist

WORKDIR /

# Copy all package.json
COPY ./package.json ./package.json
COPY ./packages/code-du-travail-data/package.json ./packages/code-du-travail-data/package.json
COPY ./packages/code-du-travail-data/prime-precarite/package.json ./packages/code-du-travail-data/prime-precarite/package.json
COPY ./packages/code-du-travail-data/simulateurs/package.json ./packages/code-du-travail-data/simulateurs/package.json
COPY ./packages/code-du-travail-data/tools/package.json ./packages/code-du-travail-data/tools/package.json
COPY ./packages/react-fiche-service-public/package.json ./packages/react-fiche-service-public/package.json
COPY ./packages/sources/package.json ./packages/sources/package.json
COPY ./packages/slugify/package.json ./packages/slugify/package.json
COPY ./packages/react-ui/package.json ./packages/react-ui/package.json
COPY ./packages/code-du-travail-api/package.json ./packages/code-du-travail-api/package.json
COPY ./packages/code-du-travail-frontend/package.json ./packages/code-du-travail-frontend/package.json
COPY ./packages/code-du-travail-modeles/package.json ./packages/code-du-travail-modeles/package.json

# Copy lockfile
COPY ./yarn.lock ./yarn.lock

# Install packages
RUN yarn --frozen-lockfile && yarn cache clean

COPY . ./

RUN yarn build

# node_modules
FROM node:14.17-alpine3.13 AS node_modules

WORKDIR /

COPY package.json ./

RUN yarn install --prod

# app
FROM node:14.17-alpine3.13

RUN mkdir -p /app

WORKDIR /app

COPY --from=dist . /app/

COPY --from=node_modules node_modules /app/node_modules

COPY . /app


CMD [ "yarn", "start"]

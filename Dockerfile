ARG NODE_VERSION=14.18-alpine3.13
# dist
FROM node:$NODE_VERSION AS dist

WORKDIR /

# Add build-arg from github actions
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_ENV
ENV NEXT_PUBLIC_SENTRY_ENV=$NEXT_PUBLIC_SENTRY_ENV
ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT

# Copy all package.json
COPY ./package.json ./package.json
COPY ./packages/code-du-travail-data/package.json ./packages/code-du-travail-data/package.json
COPY ./packages/react-fiche-service-public/package.json ./packages/react-fiche-service-public/package.json
COPY ./packages/sources/package.json ./packages/sources/package.json
COPY ./packages/slugify/package.json ./packages/slugify/package.json
COPY ./packages/react-ui/package.json ./packages/react-ui/package.json
COPY ./packages/cdtn-types/package.json ./packages/cdtn-types/package.json
COPY ./packages/code-du-travail-api/package.json ./packages/code-du-travail-api/package.json
COPY ./packages/code-du-travail-frontend/package.json ./packages/code-du-travail-frontend/package.json
COPY ./packages/code-du-travail-modeles/package.json ./packages/code-du-travail-modeles/package.json

# Copy lockfile
COPY ./yarn.lock ./yarn.lock

# Install packages
RUN yarn --frozen-lockfile && yarn cache clean

COPY . ./

RUN yarn build && yarn --frozen-lockfile --prod

# app
FROM node:$NODE_VERSION

WORKDIR /app

COPY --from=dist . /app/

USER 1000

CMD [ "yarn", "start"]

ARG NODE_VERSION=14.17-alpine3.13

# build
FROM node:$NODE_VERSION AS build

WORKDIR /

# Add build-arg from github actions
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_ENV
ENV NEXT_PUBLIC_SENTRY_ENV=$NEXT_PUBLIC_SENTRY_ENV
ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT

COPY . ./

RUN yarn --frozen-lockfile && yarn build

# FROM node:$NODE_VERSION AS dep

# WORKDIR /

# COPY ./packages/code-du-travail-frontend/package.json ./

# Install packages
# RUN yarn --frozen-lockfile --production --offline

# add dep from other repo

# app
FROM node:$NODE_VERSION

WORKDIR /app

COPY --from=build ./packages/code-du-travail-frontend/package.json /app/package.json
COPY --from=build ./packages/code-du-travail-frontend/public /app/public
COPY --from=build ./packages/code-du-travail-frontend/.next /app/.next
COPY --from=build ./node_modules /app/node_modules
COPY --from=build ./packages/code-du-travail-frontend/node_modules /app/node_modules

USER 1000

CMD ["yarn", "start"]

ARG NODE_VERSION=14.18.3-alpine
# dist
FROM node:$NODE_VERSION AS dist

WORKDIR /

# Add build-arg from github actions
ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_AZURE_BASE_URL
ENV NEXT_PUBLIC_AZURE_BASE_URL=$NEXT_PUBLIC_AZURE_BASE_URL
ARG NEXT_PUBLIC_AZURE_CONTAINER
ENV NEXT_PUBLIC_AZURE_CONTAINER=$NEXT_PUBLIC_AZURE_CONTAINER
ARG NEXT_PUBLIC_PIWIK_SITE_ID
ENV NEXT_PUBLIC_PIWIK_SITE_ID=$NEXT_PUBLIC_PIWIK_SITE_ID
ARG NEXT_PUBLIC_PIWIK_URL
ENV NEXT_PUBLIC_PIWIK_URL=$NEXT_PUBLIC_PIWIK_URL
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_ENV
ENV NEXT_PUBLIC_SENTRY_ENV=$NEXT_PUBLIC_SENTRY_ENV
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_COMMIT
ENV NEXT_PUBLIC_COMMIT=$NEXT_PUBLIC_COMMIT
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Copy all package.json
COPY ./package.json ./package.json
COPY ./packages/react-ui/package.json ./packages/react-ui/package.json
COPY ./packages/code-du-travail-utils/package.json ./packages/code-du-travail-utils/package.json
COPY ./packages/code-du-travail-frontend/package.json ./packages/code-du-travail-frontend/package.json
COPY ./packages/code-du-travail-modeles/package.json ./packages/code-du-travail-modeles/package.json

# Copy lockfile
COPY ./yarn.lock ./yarn.lock

# Install packages
RUN yarn --frozen-lockfile && yarn cache clean

COPY . ./

ENV NODE_ENV=production

RUN yarn build:frontend && yarn --frozen-lockfile --prod

# app
FROM node:$NODE_VERSION

ENV NODE_ENV=production

WORKDIR /app

COPY --from=dist . /app/

RUN mkdir -p /app/packages/code-du-travail-frontend/.next/cache/images && chown -R node:node /app/packages/code-du-travail-frontend/.next

USER 1000

CMD [ "yarn", "start"]

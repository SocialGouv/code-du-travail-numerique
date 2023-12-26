ARG NODE_VERSION=20.3.1-alpine
# dist
FROM node:$NODE_VERSION AS dist

WORKDIR /dep

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
ARG NEXT_PUBLIC_COMMIT
ENV NEXT_PUBLIC_COMMIT=$NEXT_PUBLIC_COMMIT
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SENTRY_RELEASE
ENV NEXT_PUBLIC_SENTRY_RELEASE=$NEXT_PUBLIC_SENTRY_RELEASE
ARG NEXT_PUBLIC_SENTRY_ORG
ENV NEXT_PUBLIC_SENTRY_ORG=$NEXT_PUBLIC_SENTRY_ORG
ARG NEXT_PUBLIC_SENTRY_PROJECT
ENV NEXT_PUBLIC_SENTRY_PROJECT=$NEXT_PUBLIC_SENTRY_PROJECT
ARG NEXT_PUBLIC_SENTRY_URL
ENV NEXT_PUBLIC_SENTRY_URL=$NEXT_PUBLIC_SENTRY_URL

# Copy lockfile
COPY ./yarn.lock ./.yarnrc.yml ./
COPY .yarn .yarn

# Install packages
RUN yarn fetch --immutable

COPY . ./

ENV NODE_ENV=production

# hadolint ignore=SC2046
RUN --mount=type=secret,id=sentry_auth_token \
  --mount=type=secret,id=elasticsearch_token_api \
  --mount=type=secret,id=elasticsearch_url \
  export SENTRY_AUTH_TOKEN=$(cat /run/secrets/sentry_auth_token) && \
  export ELASTICSEARCH_TOKEN_API=$(cat /run/secrets/elasticsearch_token_api) && \
  export ELASTICSEARCH_URL=$(cat /run/secrets/elasticsearch_url) && \
  yarn build && \
  yarn workspaces focus --production --all && \
  yarn cache clean

# app
FROM node:$NODE_VERSION

# hadolint ignore=DL3018
RUN apk --update --no-cache add ca-certificates && apk upgrade

ENV NODE_ENV=production

WORKDIR /app

USER 1000

COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/.next /app/packages/code-du-travail-frontend/.next
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/public /app/packages/code-du-travail-frontend/public
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/next.config.js /app/packages/code-du-travail-frontend/next.config.js
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/sentry.client.config.js /app/packages/code-du-travail-frontend/sentry.client.config.js
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/sentry.server.config.js /app/packages/code-du-travail-frontend/sentry.server.config.js
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/redirects.json /app/packages/code-du-travail-frontend/redirects.json
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/scripts /app/packages/code-du-travail-frontend/scripts
COPY --from=dist --chown=1000:1000 /dep/package.json /app/package.json
COPY --from=dist --chown=1000:1000 /dep/node_modules /app/node_modules

RUN mkdir -p /app/packages/code-du-travail-frontend/.next/cache/images && chown -R 1000:1000 /app/packages/code-du-travail-frontend/.next

CMD [ "yarn", "workspace", "@cdt/frontend", "start"]

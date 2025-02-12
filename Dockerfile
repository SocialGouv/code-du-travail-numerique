ARG NODE_VERSION=20.3.1-alpine
# dist
FROM node:$NODE_VERSION AS dist

WORKDIR /dep

# Copy lockfile
COPY ./yarn.lock ./.yarnrc.yml ./
COPY .yarn .yarn

# Install packages
RUN yarn fetch --immutable

COPY . ./

ENV NEXT_PUBLIC_APP_ENV=production
# Add build-arg from github actions
ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_BUCKET_FOLDER
ENV NEXT_PUBLIC_BUCKET_FOLDER=$NEXT_PUBLIC_BUCKET_FOLDER
ARG NEXT_PUBLIC_BUCKET_SITEMAP_FOLDER
ENV NEXT_PUBLIC_BUCKET_SITEMAP_FOLDER=$NEXT_PUBLIC_BUCKET_SITEMAP_FOLDER
ARG NEXT_PUBLIC_BUCKET_URL
ENV NEXT_PUBLIC_BUCKET_URL=$NEXT_PUBLIC_BUCKET_URL
ARG NEXT_PUBLIC_PIWIK_SITE_ID
ENV NEXT_PUBLIC_PIWIK_SITE_ID=$NEXT_PUBLIC_PIWIK_SITE_ID
ARG NEXT_PUBLIC_PIWIK_URL
ENV NEXT_PUBLIC_PIWIK_URL=$NEXT_PUBLIC_PIWIK_URL
ARG NEXT_PUBLIC_COMMIT
ENV NEXT_PUBLIC_COMMIT=$NEXT_PUBLIC_COMMIT
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ARG NEXT_PUBLIC_SENTRY_ENV
ENV NEXT_PUBLIC_SENTRY_ENV=$NEXT_PUBLIC_SENTRY_ENV
ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_RELEASE
ARG NEXT_PUBLIC_SENTRY_DSN
ENV SENTRY_URL=$SENTRY_URL
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ENV SENTRY_RELEASE=$SENTRY_RELEASE

ARG NEXT_PUBLIC_ES_INDEX_PREFIX
ENV NEXT_PUBLIC_ES_INDEX_PREFIX=$NEXT_PUBLIC_ES_INDEX_PREFIX
ARG NEXT_PUBLIC_BRANCH_NAME_SLUG
ENV NEXT_PUBLIC_BRANCH_NAME_SLUG=$NEXT_PUBLIC_BRANCH_NAME_SLUG

# Enable source map generation during build
ENV GENERATE_SOURCEMAP=true \
    NODE_ENV=production

# hadolint ignore=SC2046
RUN --mount=type=secret,id=sentry_auth_token \
  --mount=type=secret,id=elasticsearch_token_api \
  --mount=type=secret,id=elasticsearch_url \
  export SENTRY_AUTH_TOKEN=$(cat /run/secrets/sentry_auth_token) && \
  export ELASTICSEARCH_TOKEN_API=$(cat /run/secrets/elasticsearch_token_api) && \
  export ELASTICSEARCH_URL=$(cat /run/secrets/elasticsearch_url) && \
  export GENERATE_SOURCEMAP=true && \
  yarn build && \
  yarn workspaces focus --production --all && \
  yarn cache clean

# app
FROM node:$NODE_VERSION

# hadolint ignore=DL3018
RUN apk --update --no-cache add ca-certificates && apk upgrade

ENV NEXT_PUBLIC_APP_ENV=production

WORKDIR /app

USER 1000

COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/.next /app/packages/code-du-travail-frontend/.next
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/public /app/packages/code-du-travail-frontend/public
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/next.config.mjs /app/packages/code-du-travail-frontend/next.config.mjs
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/instrumentation.ts /app/packages/code-du-travail-frontend/instrumentation.ts
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/sentry.client.config.ts /app/packages/code-du-travail-frontend/sentry.client.config.ts
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/sentry.server.config.ts /app/packages/code-du-travail-frontend/sentry.server.config.ts
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/sentry.edge.config.ts /app/packages/code-du-travail-frontend/sentry.edge.config.ts
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/redirects.json /app/packages/code-du-travail-frontend/redirects.json
COPY --from=dist --chown=1000:1000 /dep/packages/code-du-travail-frontend/scripts /app/packages/code-du-travail-frontend/scripts
COPY --from=dist --chown=1000:1000 /dep/package.json /app/package.json
COPY --from=dist --chown=1000:1000 /dep/node_modules /app/node_modules

RUN mkdir -p /app/packages/code-du-travail-frontend/.next/cache/images && chown -R 1000:1000 /app/packages/code-du-travail-frontend/.next

CMD [ "yarn", "workspace", "@cdt/frontend", "start"]

ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_RELEASE
ARG NEXT_PUBLIC_SENTRY_DSN
ENV SENTRY_URL=$SENTRY_URL
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ENV SENTRY_RELEASE=$SENTRY_RELEASE

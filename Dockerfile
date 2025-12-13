ARG NODE_VERSION=24.10.0-alpine

# builder stage: install dependencies and build
FROM node:$NODE_VERSION AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

# Copy lockfiles and config for better layer caching
COPY pnpm-lock.yaml pnpm-workspace.yaml lerna.json .npmrc ./

# Fetch dependencies (frozen-lockfile contains all package info)
RUN pnpm fetch --frozen-lockfile

# Copy package.json files (needed for workspace structure)
COPY package.json ./
COPY packages/code-du-travail-frontend/package.json ./packages/code-du-travail-frontend/
COPY packages/code-du-travail-modeles/package.json ./packages/code-du-travail-modeles/
COPY packages/code-du-travail-utils/package.json ./packages/code-du-travail-utils/

# Install dependencies (uses fetched packages, cached if package.json not changed, offline to avoid network calls, frozen-lockfile to ensure consistency)
RUN pnpm install --recursive --frozen-lockfile --offline

# Copy source code (after install to maximize cache efficiency)
COPY . ./

ENV HUSKY=0
ENV GENERATE_SOURCEMAP=true
ENV NODE_ENV=production
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
ARG NEXT_PUBLIC_SENTRY_URL
ARG NEXT_PUBLIC_SENTRY_ORG
ARG NEXT_PUBLIC_SENTRY_PROJECT
ARG NEXT_PUBLIC_SENTRY_RELEASE
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_URL=$NEXT_PUBLIC_SENTRY_URL
ENV NEXT_PUBLIC_SENTRY_ORG=$NEXT_PUBLIC_SENTRY_ORG
ENV NEXT_PUBLIC_SENTRY_PROJECT=$NEXT_PUBLIC_SENTRY_PROJECT
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_RELEASE=$NEXT_PUBLIC_SENTRY_RELEASE
ARG NEXT_PUBLIC_ES_INDEX_PREFIX
ENV NEXT_PUBLIC_ES_INDEX_PREFIX=$NEXT_PUBLIC_ES_INDEX_PREFIX
ARG NEXT_PUBLIC_BRANCH_NAME_SLUG
ENV NEXT_PUBLIC_BRANCH_NAME_SLUG=$NEXT_PUBLIC_BRANCH_NAME_SLUG

# Build
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=ELASTICSEARCH_TOKEN_API,env=ELASTICSEARCH_TOKEN_API \
  --mount=type=secret,id=ELASTICSEARCH_URL,env=ELASTICSEARCH_URL \
  pnpm build

# Deploy (creates a production-ready deployment without dev dependencies)
RUN pnpm --filter @cdt/frontend deploy --prod /app/deploy && \
  cp -r /app/packages/code-du-travail-frontend/.next /app/deploy/.next && \
  cp -r /app/packages/code-du-travail-frontend/public/* /app/deploy/public/

# runner stage: no corepack/pnpm, just Node runtime
FROM node:$NODE_VERSION AS runner

RUN apk --update --no-cache add ca-certificates && apk upgrade

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy deployed standalone files (with real node_modules, not symlinks)
COPY --from=builder --chown=1000:1000 /app/deploy /app

# Ensure necessary directories exist and have correct permissions
RUN mkdir -p /app/.next/cache/images && \
  chown -R 1000:1000 /app

USER 1000

CMD ["node", "node_modules/next/dist/bin/next", "start"]


# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=24.10.0-alpine

# builder stage: install dependencies and build
FROM node:$NODE_VERSION AS builder

WORKDIR /app

# Enable pnpm via corepack, and configure a stable location for caches
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

# Copy lockfiles and config for better layer caching
COPY pnpm-lock.yaml pnpm-workspace.yaml lerna.json .npmrc ./

# Fetch dependencies (frozen-lockfile contains all package info)
# Cache pnpm store across builds for faster installs
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm fetch --frozen-lockfile --store-dir=/pnpm/store

# Copy package.json files (needed for workspace structure)
COPY package.json ./
COPY packages/code-du-travail-frontend/package.json ./packages/code-du-travail-frontend/
COPY packages/code-du-travail-modeles/package.json ./packages/code-du-travail-modeles/
COPY packages/code-du-travail-utils/package.json ./packages/code-du-travail-utils/

# Install dependencies (uses fetched packages, cached if package.json not changed, offline to avoid network calls, frozen-lockfile to ensure consistency)
# Cache pnpm store across builds for faster installs
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --recursive --frozen-lockfile --offline --store-dir=/pnpm/store

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
# Cache Next.js build cache across builds to speed up next build
RUN --mount=type=cache,id=next-cache,target=/app/packages/code-du-travail-frontend/.next/cache \
  --mount=type=secret,id=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=ELASTICSEARCH_TOKEN_API \
  --mount=type=secret,id=ELASTICSEARCH_URL \
  sh -ce ' \
  if [ -f /run/secrets/SENTRY_AUTH_TOKEN ]; then export SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)"; fi; \
  if [ -f /run/secrets/ELASTICSEARCH_TOKEN_API ]; then export ELASTICSEARCH_TOKEN_API="$(cat /run/secrets/ELASTICSEARCH_TOKEN_API)"; fi; \
  if [ -f /run/secrets/ELASTICSEARCH_URL ]; then export ELASTICSEARCH_URL="$(cat /run/secrets/ELASTICSEARCH_URL)"; fi; \
  pnpm build \
  '

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

# Make the copied tree read-only (no write permissions for any user).
# Then re-enable write access only where the runtime needs it (Next.js cache).
RUN chmod -R a-w /app && \
  mkdir -p /app/.next/cache/images && \
  chown -R 1000:1000 /app/.next/cache && \
  chmod -R u+rwX,go+rX /app/.next/cache

USER 1000

CMD ["node", "node_modules/next/dist/bin/next", "start"]


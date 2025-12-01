ARG NODE_VERSION=24.10.0-alpine

# Base stage with pnpm setup
FROM node:$NODE_VERSION AS base
RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

# Dependencies stage - fetch and install dependencies
FROM base AS dependencies
WORKDIR /app

# Copy only package manifests for better layer caching
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/code-du-travail-frontend/package.json ./packages/code-du-travail-frontend/
COPY packages/code-du-travail-modeles/package.json ./packages/code-du-travail-modeles/
COPY packages/code-du-travail-utils/package.json ./packages/code-du-travail-utils/

# Fetch dependencies to pnpm store with cache mount
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm fetch --frozen-lockfile

# Install all dependencies (including dev) with cache mount
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile --offline

# Build stage
FROM dependencies AS builder
WORKDIR /app

# Copy source code
COPY . .

# Set build environment variables
ENV NEXT_PUBLIC_APP_ENV=production \
  GENERATE_SOURCEMAP=true \
  NODE_ENV=production

# Build arguments
ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_BUCKET_FOLDER
ARG NEXT_PUBLIC_BUCKET_SITEMAP_FOLDER
ARG NEXT_PUBLIC_BUCKET_URL
ARG NEXT_PUBLIC_PIWIK_SITE_ID
ARG NEXT_PUBLIC_PIWIK_URL
ARG NEXT_PUBLIC_COMMIT
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SENTRY_ENV
ARG NEXT_PUBLIC_SENTRY_URL
ARG NEXT_PUBLIC_SENTRY_ORG
ARG NEXT_PUBLIC_SENTRY_PROJECT
ARG NEXT_PUBLIC_SENTRY_RELEASE
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_ES_INDEX_PREFIX
ARG NEXT_PUBLIC_BRANCH_NAME_SLUG

# Export environment variables
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT \
  NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT \
  NEXT_PUBLIC_BUCKET_FOLDER=$NEXT_PUBLIC_BUCKET_FOLDER \
  NEXT_PUBLIC_BUCKET_SITEMAP_FOLDER=$NEXT_PUBLIC_BUCKET_SITEMAP_FOLDER \
  NEXT_PUBLIC_BUCKET_URL=$NEXT_PUBLIC_BUCKET_URL \
  NEXT_PUBLIC_PIWIK_SITE_ID=$NEXT_PUBLIC_PIWIK_SITE_ID \
  NEXT_PUBLIC_PIWIK_URL=$NEXT_PUBLIC_PIWIK_URL \
  NEXT_PUBLIC_COMMIT=$NEXT_PUBLIC_COMMIT \
  NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
  NEXT_PUBLIC_SENTRY_ENV=$NEXT_PUBLIC_SENTRY_ENV \
  NEXT_PUBLIC_SENTRY_URL=$NEXT_PUBLIC_SENTRY_URL \
  NEXT_PUBLIC_SENTRY_ORG=$NEXT_PUBLIC_SENTRY_ORG \
  NEXT_PUBLIC_SENTRY_PROJECT=$NEXT_PUBLIC_SENTRY_PROJECT \
  NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN \
  NEXT_PUBLIC_SENTRY_RELEASE=$NEXT_PUBLIC_SENTRY_RELEASE \
  NEXT_PUBLIC_ES_INDEX_PREFIX=$NEXT_PUBLIC_ES_INDEX_PREFIX \
  NEXT_PUBLIC_BRANCH_NAME_SLUG=$NEXT_PUBLIC_BRANCH_NAME_SLUG

# Build with secrets and cache mount
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=ELASTICSEARCH_TOKEN_API,env=ELASTICSEARCH_TOKEN_API \
  --mount=type=secret,id=ELASTICSEARCH_URL,env=ELASTICSEARCH_URL \
  --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm build

# Deploy stage - create production-ready deployment
FROM base AS deploy
WORKDIR /app

COPY --from=builder /app /app

# Create optimized production deployment using pnpm deploy
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm deploy --filter=@cdt/frontend --prod /prod/app && \
  pnpm store prune

# Runtime stage - minimal production image
FROM node:$NODE_VERSION

RUN apk --update --no-cache add ca-certificates && apk upgrade

ENV NEXT_PUBLIC_APP_ENV=production \
  NODE_ENV=production

WORKDIR /app

# Copy the optimized deployment from deploy stage
COPY --from=deploy --chown=1000:1000 /prod/app /app

# Runtime environment variables
ARG NEXT_PUBLIC_SENTRY_URL
ARG NEXT_PUBLIC_SENTRY_ORG
ARG NEXT_PUBLIC_SENTRY_PROJECT
ARG NEXT_PUBLIC_SENTRY_RELEASE
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_URL=$NEXT_PUBLIC_SENTRY_URL \
  NEXT_PUBLIC_SENTRY_ORG=$NEXT_PUBLIC_SENTRY_ORG \
  NEXT_PUBLIC_SENTRY_PROJECT=$NEXT_PUBLIC_SENTRY_PROJECT \
  NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN \
  NEXT_PUBLIC_SENTRY_RELEASE=$NEXT_PUBLIC_SENTRY_RELEASE

# Create cache directory with proper permissions
RUN mkdir -p /app/.next/cache/images && \
  chown -R 1000:1000 /app

USER 1000

CMD ["node_modules/.bin/next", "start"]

# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=24-alpine

# Builder stage: install dependencies and build
FROM node:$NODE_VERSION AS builder

WORKDIR /app

# Enable pnpm via corepack
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

# Copy workspace config + lockfile + package.jsons for install
COPY pnpm-lock.yaml .npmrc pnpm-workspace.yaml package.json ./
COPY packages/code-du-travail-utils/package.json ./packages/code-du-travail-utils/
COPY packages/code-du-travail-modeles/package.json ./packages/code-du-travail-modeles/
COPY packages/code-du-travail-frontend/package.json ./packages/code-du-travail-frontend/

ENV HUSKY=0

# Install dependencies with pnpm store cache
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile --store-dir=/pnpm/store

# Build @socialgouv/cdtn-utils
COPY packages/code-du-travail-utils ./packages/code-du-travail-utils/
RUN pnpm --filter @socialgouv/cdtn-utils run build

# Build @socialgouv/modeles-social
COPY packages/code-du-travail-modeles ./packages/code-du-travail-modeles/
RUN pnpm --filter @socialgouv/modeles-social run build

# App build args
ENV GENERATE_SOURCEMAP=true
ENV NODE_ENV=production
ENV NEXT_PUBLIC_APP_ENV=production

ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT=$NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_ENABLE_AB_TESTING
ENV NEXT_PUBLIC_ENABLE_AB_TESTING=$NEXT_PUBLIC_ENABLE_AB_TESTING
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

# Copy frontend source and build with Next.js cache persisted across builds
COPY packages/code-du-travail-frontend ./packages/code-du-travail-frontend/

RUN --mount=type=cache,id=next-cache,target=/tmp/.next-cache \
  --mount=type=secret,id=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=ELASTICSEARCH_TOKEN_API \
  --mount=type=secret,id=ELASTICSEARCH_URL \
  sh -ce ' \
  cp -a /tmp/.next-cache packages/code-du-travail-frontend/.next/cache 2>/dev/null || true && \
  if [ -f /run/secrets/SENTRY_AUTH_TOKEN ]; then export SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)"; fi; \
  if [ -f /run/secrets/ELASTICSEARCH_TOKEN_API ]; then export ELASTICSEARCH_TOKEN_API="$(cat /run/secrets/ELASTICSEARCH_TOKEN_API)"; fi; \
  if [ -f /run/secrets/ELASTICSEARCH_URL ]; then export ELASTICSEARCH_URL="$(cat /run/secrets/ELASTICSEARCH_URL)"; fi; \
  pnpm --filter @cdt/frontend run build && \
  rm -rf /tmp/.next-cache/* && \
  cp -a packages/code-du-travail-frontend/.next/cache/. /tmp/.next-cache/ 2>/dev/null || true \
  '

# Deploy (creates a production-ready deployment without dev dependencies)
# Clean build-time caches (webpack/swc) from .next to keep the runner image lean
# Ensure .next/cache/images exists for Next.js image optimization at runtime
RUN pnpm --filter @cdt/frontend deploy --prod /app/deploy && \
  cp -r /app/packages/code-du-travail-frontend/.next /app/deploy/.next && \
  rm -rf /app/deploy/.next/cache/webpack /app/deploy/.next/cache/swc && \
  mkdir -p /app/deploy/.next/cache/images && \
  cp -r /app/packages/code-du-travail-frontend/public/* /app/deploy/public/


# Runner stage: minimal Node runtime
FROM node:$NODE_VERSION AS runner

RUN apk --update --no-cache add ca-certificates && apk upgrade

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy deployed standalone files (with real node_modules, not symlinks)
COPY --from=builder --chown=1000:1000 /app/deploy /app

USER 1000

CMD ["node", "node_modules/next/dist/bin/next", "start"]

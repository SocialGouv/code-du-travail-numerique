# syntax=docker/dockerfile:1.7
# Version épinglée, alignée sur .node-version (correctifs de sécurité Node.js)
ARG NODE_VERSION=24.22.1-alpine

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
# L'image est partagée entre les environnements : seules les valeurs propres à
# l'image (commit, release Sentry) sont fixées au build. La configuration par
# environnement (URL du site, Matomo, buckets, Sentry DSN...) est lue à
# l'exécution, cf. packages/code-du-travail-frontend/src/runtime-env.ts
ENV GENERATE_SOURCEMAP=true
ENV NODE_ENV=production
ENV NEXT_PUBLIC_APP_ENV=production

ARG NEXT_PUBLIC_COMMIT
ENV NEXT_PUBLIC_COMMIT=$NEXT_PUBLIC_COMMIT
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=$SENTRY_RELEASE

# Copy frontend source and build with Next.js cache persisted across builds
COPY packages/code-du-travail-frontend ./packages/code-du-travail-frontend/

RUN --mount=type=cache,id=next-cache,target=/tmp/.next-cache \
  --mount=type=secret,id=SENTRY_AUTH_TOKEN \
  sh -ce ' \
  cp -a /tmp/.next-cache packages/code-du-travail-frontend/.next/cache 2>/dev/null || true && \
  if [ -f /run/secrets/SENTRY_AUTH_TOKEN ]; then export SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)"; fi; \
  pnpm --filter @cdt/frontend run build && \
  rm -rf /tmp/.next-cache/* && \
  cp -a packages/code-du-travail-frontend/.next/cache/. /tmp/.next-cache/ 2>/dev/null || true \
  '

# Deploy (creates a production-ready deployment without dev dependencies)
# Clean build-time caches (webpack/swc) from .next to keep the runner image lean
# Ensure .next/cache/images exists for Next.js image optimization at runtime
RUN pnpm --filter @cdt/frontend deploy --prod --legacy /app/deploy && \
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

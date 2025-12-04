ARG NODE_VERSION=24.10.0-alpine

# builder stage: install dependencies and build
FROM node:$NODE_VERSION AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# Copy lockfiles and source code
COPY . ./

# Install dependencies
RUN pnpm install --frozen-lockfile

ENV CI=true
ENV HUSKY=0
ENV GENERATE_SOURCEMAP=true
ENV NEXT_PUBLIC_APP_ENV=production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

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

# Build and prune
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=ELASTICSEARCH_TOKEN_API,env=ELASTICSEARCH_TOKEN_API \
  --mount=type=secret,id=ELASTICSEARCH_URL,env=ELASTICSEARCH_URL \
  pnpm build && \
  pnpm prune --prod --ignore-scripts

# runner stage: no corepack/pnpm, just Node runtime
FROM node:$NODE_VERSION AS runner

RUN apk --update --no-cache add ca-certificates && apk upgrade

ENV NEXT_PUBLIC_APP_ENV=production
ENV NODE_ENV=production

WORKDIR /app

USER 1000

COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/.next /app/packages/code-du-travail-frontend/.next
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/public /app/packages/code-du-travail-frontend/public
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/next.config.mjs /app/packages/code-du-travail-frontend/next.config.mjs
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/instrumentation.ts /app/packages/code-du-travail-frontend/instrumentation.ts
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/instrumentation-client.ts /app/packages/code-du-travail-frontend/instrumentation-client.ts
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/sentry.server.config.ts /app/packages/code-du-travail-frontend/sentry.server.config.ts
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/sentry.edge.config.ts /app/packages/code-du-travail-frontend/sentry.edge.config.ts
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/redirects.json /app/packages/code-du-travail-frontend/redirects.json
COPY --from=builder --chown=1000:1000 /app/packages/code-du-travail-frontend/scripts /app/packages/code-du-travail-frontend/scripts
COPY --from=builder --chown=1000:1000 /app/node_modules /app/node_modules

RUN mkdir -p /app/packages/code-du-travail-frontend/.next/cache/images && chown -R 1000:1000 /app/packages/code-du-travail-frontend/.next

WORKDIR /app/packages/code-du-travail-frontend

CMD ["node", "../../node_modules/next/dist/bin/next", "start"]

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

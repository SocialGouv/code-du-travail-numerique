ARG NODE_VERSION=20.2.0-alpine
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
ARG NEXT_PUBLIC_COMMIT
ENV NEXT_PUBLIC_COMMIT=$NEXT_PUBLIC_COMMIT
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SENTRY_RELEASE
ENV NEXT_PUBLIC_SENTRY_RELEASE=$NEXT_PUBLIC_SENTRY_RELEASE

# Copy lockfile
COPY ./yarn.lock ./.yarnrc.yml ./
COPY .yarn ./.yarn

# Install packages
RUN yarn fetch --immutable

COPY . ./

ENV NODE_ENV=production

RUN yarn build  && \
  yarn --immutable --production

# app
FROM node:$NODE_VERSION

ENV NODE_ENV=production

WORKDIR /app

COPY --from=dist ./packages/code-du-travail-frontend/.next /app/packages/code-du-travail-frontend/.next
COPY --from=dist ./packages/code-du-travail-frontend/node_modules /app/packages/code-du-travail-frontend/node_modules
COPY --from=dist ./packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json
COPY --from=dist ./packages/code-du-travail-frontend/public /app/packages/code-du-travail-frontend/public
COPY --from=dist ./packages/code-du-travail-frontend/next.config.js /app/packages/code-du-travail-frontend/next.config.js
COPY --from=dist ./packages/code-du-travail-frontend/sentry.client.config.js /app/packages/code-du-travail-frontend/sentry.client.config.js
COPY --from=dist ./packages/code-du-travail-frontend/sentry.server.config.js /app/packages/code-du-travail-frontend/sentry.server.config.js
COPY --from=dist ./packages/code-du-travail-frontend/redirects.json /app/packages/code-du-travail-frontend/redirects.json
COPY --from=dist ./packages/code-du-travail-frontend/scripts /app/packages/code-du-travail-frontend/scripts
COPY --from=dist ./package.json /app/package.json
COPY --from=dist ./node_modules /app/node_modules

RUN mkdir -p /app/packages/code-du-travail-frontend/.next/cache/images && chown -R 1000 /app/packages/code-du-travail-frontend/.next

USER 1000

CMD [ "yarn", "workspace", "@cdt/frontend", "start"]

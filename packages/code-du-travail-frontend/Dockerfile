FROM node:12.14-alpine3.10

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json yarn.lock /app/
RUN yarn --production --frozen-lockfile --no-cache

USER node

# COPY ./node_modules/@cdt /node_modules/@cdt
COPY ./node_modules/@socialgouv /app/node_modules/@socialgouv

COPY ./next.config.js /app
COPY ./public /app/public
COPY ./server /app/server
COPY ./.next /app/.next

ENTRYPOINT ["yarn", "start"]

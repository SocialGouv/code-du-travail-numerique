FROM node:10.8.0-alpine as builder

COPY package.json /app/package.json
#COPY yarn.lock /app/yarn.lock

WORKDIR /app

RUN npm install -g yarn

# install everything

RUN NODE_ENV=development yarn install

ARG API_URL
ARG SENTRY_PUBLIC_DSN
ARG PIWIK_URL
ARG PIWIK_SITE_ID

# for javascript browser build and entrypoint
ENV NODE_ENV=production
ENV API_URL=$API_URL
ENV SENTRY_PUBLIC_DSN=$SENTRY_PUBLIC_DSN
ENV PIWIK_URL=$PIWIK_URL
ENV PIWIK_SITE_ID=$PIWIK_SITE_ID

RUN env

COPY . /app

ENV NODE_ENV=production

RUN echo $SENTRY_PUBLIC_DSN

RUN npm run build

FROM node:10.8.0-alpine

WORKDIR /app

COPY --from=builder /app /app

ENTRYPOINT ["npm", "start"]

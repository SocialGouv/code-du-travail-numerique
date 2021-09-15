FROM node:14.17-alpine3.13

# used in CI tests
RUN apk add --no-cache curl=~7

WORKDIR /app

COPY ./package.json .

RUN yarn --frozen-lockfile && yarn cache clean

COPY src .

RUN yarn build

RUN yarn add elastic-apm-node --production

USER node

ENTRYPOINT ["yarn", "start"]

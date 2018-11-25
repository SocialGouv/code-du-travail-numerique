FROM node:10


COPY ./scripts /app/scripts

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

COPY ./dataset /app/dataset

COPY ./packages/api/package.json /app/packages/api/package.json
COPY ./packages/css/package.json /app/packages/css/package.json
COPY ./packages/frontend/package.json /app/packages/frontend/package.json
COPY ./packages/ui/package.json /app/packages/ui/package.json

WORKDIR /app

RUN yarn --frozen-lockfile

COPY ./packages /app/packages

RUN yarn build

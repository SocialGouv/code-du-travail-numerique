FROM node:14.17-alpine3.13

WORKDIR /app

COPY ./package.json /app/package.json

RUN yarn --frozen-lockfile && yarn cache clean

RUN yarn build

RUN yarn add elastic-apm-node --production


USER node

ENTRYPOINT ["yarn", "start"]

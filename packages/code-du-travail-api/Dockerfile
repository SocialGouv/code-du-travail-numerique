FROM node:14.16-alpine3.13

USER node

WORKDIR /app

RUN yarn add elastic-apm-node --production

COPY ./dist /app/dist
COPY ./package.json /app/package.json

ENTRYPOINT ["yarn", "start"]

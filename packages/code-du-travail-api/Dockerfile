FROM node:14.16-alpine3.13

WORKDIR /app

RUN yarn add elastic-apm-node --production

USER nodemkdir '/app/node_modules'

COPY ./dist /app/dist
COPY ./package.json /app/package.json

ENTRYPOINT ["yarn", "start"]

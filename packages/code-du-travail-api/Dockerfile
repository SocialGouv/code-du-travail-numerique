FROM node:14.16-alpine3.13

WORKDIR /app

RUN yarn add elastic-apm-node --production

USER node

COPY ./dist /app/dist
COPY ./package.json /app/

ENTRYPOINT ["yarn", "start"]

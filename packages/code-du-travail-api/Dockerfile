ARG NODE_VERSION=14.18-alpine3.13
# dist
FROM node:$NODE_VERSION AS dist

WORKDIR /

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

# node_modules
FROM node:$NODE_VERSION AS node_modules

WORKDIR /

COPY package.json ./

RUN yarn install --frozen-lockfile --prod

# app
FROM node:$NODE_VERSION

RUN mkdir -p /app

WORKDIR /app

COPY --from=dist dist /app/dist

COPY --from=node_modules node_modules /app/node_modules

COPY . /app

USER 1000

CMD [ "yarn", "start" ]

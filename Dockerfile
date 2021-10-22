FROM node:14.17-alpine3.13 AS dist

COPY package.json ./

RUN yarn install

COPY . ./

RUN yarn build

FROM node:14.17-alpine3.13 AS node_modules

COPY package.json ./

RUN yarn install --prod

FROM node:14.17-alpine3.13

RUN mkdir -p /app

WORKDIR /app

COPY --from=dist dist /app/dist

COPY --from=node_modules node_modules /app/node_modules

COPY . /app

CMD [ "yarn", "workspace", "@cdt/frontend", "start" ]

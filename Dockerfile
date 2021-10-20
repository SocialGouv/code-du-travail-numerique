FROM node:14.17-alpine3.13
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

RUN yarn build

COPY . .

CMD [ "yarn", "workspace", "@cdt/frontend", "start" ]
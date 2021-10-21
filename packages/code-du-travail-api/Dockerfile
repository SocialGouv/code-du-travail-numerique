FROM node:14.17-alpine3.13

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]

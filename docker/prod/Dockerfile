FROM node:10.8.0-alpine

COPY . /app

WORKDIR /app

RUN npm install

RUN npm build

ENTRYPOINT ["npm", "start"]

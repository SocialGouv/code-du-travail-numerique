FROM node:9.11.2-alpine

COPY package.json /app/package.json

WORKDIR /app

RUN npm install

COPY . /app

ENTRYPOINT ["npm", "start"]

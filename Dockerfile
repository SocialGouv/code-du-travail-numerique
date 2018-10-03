FROM node:10.8.0-alpine

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install

COPY . /app

ARG API_URL
ARG NODE_ENV

# for javascript browser build
ENV API_URL=$API_URL
ENV NODE_ENV=$NODE_ENV

RUN npm run build

ENTRYPOINT ["npm", "start"]

FROM node:10.8.0-alpine

COPY . /app

WORKDIR /app

RUN npm install

ARG NODE_ENV
ARG API_URL
ARG PORT

ENV NODE_ENV=$NODE_ENV
ENV API_URL=$API_URL
ENV PORT=$PORT

RUN npm run build

ENTRYPOINT ["npm", "run", "dev"]

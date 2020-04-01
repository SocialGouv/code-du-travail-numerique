FROM node:12.14-alpine3.10
ARG NLP_URL
ENV NLP_URL=$NLP_URL
ARG LATEST
ENV LATEST=$LATEST

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./bump-socialgouv.js /app/bump-socialgouv.js

RUN node bump-socialgouv.js > ./package-latest.json
RUN mv package-latest.json > ./package.json

RUN yarn
RUN yarn build

COPY ./dist /app/dist
COPY ./node_modules/@socialgouv/kali-data/data ./node_modules/@socialgouv/kali-data/data
COPY ./node_modules/@socialgouv/legi-data/package.json /app/node_modules/@socialgouv/legi-data/package.json
COPY ./node_modules/@socialgouv/datafiller-data/package.json /app/node_modules/@socialgouv/datafiller-data/package.json
COPY ./dataset/stop_words/stop_words.json ./dataset/stop_words/stop_words.json
COPY ./dataset/synonyms/synonyms.json ./dataset/synonyms/synonyms.json
COPY ./dataset/datafiller/themes.data.json ./dataset/datafiller/themes.data.json
COPY ./dataset/suggestions.txt ./dataset/suggestions.txt

# RUN yarn dump-dev

ENV SUGGEST_FILE=../dataset/suggestions.txt

USER node

ENTRYPOINT ["yarn", "populate"]

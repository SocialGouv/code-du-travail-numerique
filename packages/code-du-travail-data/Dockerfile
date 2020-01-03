FROM node:12.14-alpine3.10

COPY ./package.json /app/package.json
COPY ./dist/index.js /app/dist/index.js

COPY ./dataset/stop_words/stop_words.json /app/dataset/stop_words/stop_words.json
COPY ./dataset/synonyms/synonyms.json /app/dataset/synonyms/synonyms.json
COPY ./dataset/datafiller/themes.data.json /app/dataset/datafiller/themes.data.json

# COPY ./node_modules/@socialgouv/kali-data/data /app/node_modules/@socialgouv/kali-data/data
# COPY ./node_modules/@socialgouv/legi-data/package.json /app/node_modules/@socialgouv/legi-data/package.json
COPY ./node_modules/@cdt/nlp/data/dump.tf.json /app/dump.tf.json

ENV SUGGEST_DATA_URL=https://cdtndata.blob.core.windows.net/public/cdtn_entities_latest
RUN wget -O /app/dataset/suggestions.txt $SUGGEST_DATA_URL

ENV SUGGEST_FILE=/app/dataset/suggestions.txt
ENV DUMP_PATH=/app/dump.tf.json

WORKDIR /app
ENTRYPOINT ["yarn", "populate"]

ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

FROM ${BASE_IMAGE} as cdtn-base-image
FROM tensorflow/tensorflow:1.14.0-py3

ARG SUGGEST_DATA_URL
ENV SUGGEST_DATA_URL=$SUGGEST_DATA_URL

RUN apt-get update
RUN apt-get -y install curl unzip git

WORKDIR /app

COPY requirements.txt .
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist/dump.data.json ./data/content.json

# embed suggester files at docker build time. todo: minio
RUN echo '#!/bin/sh                                                \n\
  count=0                                                            \n\
  # download suggester data                                          \n\
  mkdir data || true                                                 \n\
  for file in $(curl -Ls $SUGGEST_DATA_URL); do                      \n\
  curl -L $file > data/data-$count.zip                             \n\
  unzip -j -o -d data data/data-$count.zip                         \n\
  count=$((count+1))                                                \n\
  done;                                                              \n\
  cat data/data-*.txt > data/data.txt                                \n\
  rm data/data-*' > download-suggester.sh

RUN chmod +x ./download-suggester.sh
RUN ./download-suggester.sh

ENV PYTHONIOENCODING="UTF-8"
ENV FLASK_APP api
ENV FLASK_APP="development"

RUN apt-get -y install python3-venv git
RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

COPY ./scripts ./scripts
COPY ./api ./api

ENTRYPOINT ["sh", "scripts/entrypoint.sh"]

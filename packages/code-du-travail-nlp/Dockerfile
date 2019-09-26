ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

FROM ${BASE_IMAGE} as cdtn-base-image
FROM tensorflow/tensorflow:1.14.0-py3

ARG SUGGEST_DATA_URL=https://gist.githubusercontent.com/ArmandGiraud/aaa65ed694e6b8d46918d44e41bae9e4/raw/2b5fa5ff67d87bbf08b33fecfe2fb98e15c73a06/data-test.txt
ENV SUGGEST_DATA_URL=$SUGGEST_DATA_URL

RUN apt-get update
RUN apt-get -y install curl unzip git python3-venv

WORKDIR /app

COPY requirements.txt .
COPY ./scripts/download-suggester.sh ./scripts/download-suggester.sh
COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist/dump.data.json ./data/content.json

RUN sh ./scripts/download-suggester.sh

ENV PYTHONIOENCODING="UTF-8"
ENV FLASK_APP api
ENV FLASK_APP="development"

RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

COPY ./api ./api
COPY ./scripts/entrypoint.sh ./scripts/entrypoint.sh

ENTRYPOINT ["sh", "scripts/entrypoint.sh"]

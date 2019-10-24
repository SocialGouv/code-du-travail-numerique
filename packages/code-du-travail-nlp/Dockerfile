ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image
FROM tensorflow/tensorflow:1.13.1-py3

ARG SUGGEST_DATA_URL=https://gist.githubusercontent.com/ArmandGiraud/aaa65ed694e6b8d46918d44e41bae9e4/raw/2b5fa5ff67d87bbf08b33fecfe2fb98e15c73a06/data-test.txt
ENV SUGGEST_DATA_URL=$SUGGEST_DATA_URL

RUN apt-get update && apt-get -y --no-install-recommends install curl=7.58.0-2ubuntu3.8 unzip=6.0-21ubuntu1 git=1:2.17.1-1ubuntu0.4 python3-venv=3.6.7-1~18.04 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
COPY ./scripts/download-suggester.sh ./scripts/download-suggester.sh

RUN sh ./scripts/download-suggester.sh

ENV PYTHONIOENCODING="UTF-8"
ENV FLASK_APP api
ENV FLASK_APP="development"

RUN python -m venv venv

# hadolint ignore=SC1091
RUN . venv/bin/activate

# hadolint ignore=SC1091
RUN pip install -r requirements.txt

COPY ./api ./api
COPY ./scripts ./scripts

ENV PYTHONPATH=.

COPY --from=cdtn-base-image /app/packages/code-du-travail-data/dist/dump.data.json ./data/dump.json
RUN python scripts/dump.py

ENTRYPOINT ["sh", "scripts/entrypoint.sh"]

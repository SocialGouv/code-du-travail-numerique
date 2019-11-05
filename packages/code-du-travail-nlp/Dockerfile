ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image
FROM tensorflow/tensorflow:1.14.0-py3


RUN apt-get update && apt-get -y --no-install-recommends install curl=7.58.0-2ubuntu3.8 unzip=6.0-21ubuntu1 git=1:2.17.1-1ubuntu0.4 python3-venv=3.6.7-1~18.04 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

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

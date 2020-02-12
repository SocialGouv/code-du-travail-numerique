ARG TAG_BASE_IMAGE=master
ARG REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
ARG BASE_IMAGE=${REGISTRY}:${TAG_BASE_IMAGE}

# hadolint ignore=DL3006
FROM ${BASE_IMAGE} as cdtn-base-image
#FROM tensorflow/tensorflow:2.0.0-py3
FROM python:3.8-slim-buster

ENV PYTHONIOENCODING="UTF-8"

RUN useradd -ms /bin/bash worker
WORKDIR /home/worker
USER worker

COPY --chown=worker:worker requirements.txt .

# hadolint ignore=SC1091
RUN pip install --user -r requirements.txt
#RUN pip install -r requirements.txt

COPY --chown=worker:worker ./data ./data
COPY --chown=worker:worker ./api ./api
COPY --chown=worker:worker ./scripts ./scripts

ENV PATH="/home/worker/.local/bin:${PATH}"
ENV PYTHONPATH="."

COPY --chown=worker:worker --from=cdtn-base-image /app/packages/code-du-travail-data/dist/dump.data.json ./data/dump.json

RUN python scripts/dump.py

ENTRYPOINT ["sh", "scripts/entrypoint.sh"]

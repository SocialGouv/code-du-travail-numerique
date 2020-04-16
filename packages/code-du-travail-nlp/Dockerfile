#FROM tensorflow/tensorflow:2.0.0-py3
FROM python:3.7-slim-buster

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

ENTRYPOINT ["sh", "scripts/entrypoint.sh"]

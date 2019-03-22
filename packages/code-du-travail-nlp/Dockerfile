FROM python:3.7.2-stretch

ENV APP_DIR /app
ENV PYTHONIOENCODING="UTF-8"
ENV FLASK_APP ./api/app


WORKDIR ${APP_DIR}

COPY requirements.txt .
COPY ./api ./api


RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

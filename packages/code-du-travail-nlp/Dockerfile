FROM python:3.7.2-stretch

ENV APP_DIR /app
ENV FLASK_APP ./api/app

WORKDIR ${APP_DIR}

COPY api .
COPY requirements .

RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

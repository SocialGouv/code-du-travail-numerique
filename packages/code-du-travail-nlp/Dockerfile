FROM python:3.8.0b1-stretch

ENV PYTHONIOENCODING="UTF-8"
ENV FLASK_APP api
WORKDIR /app

COPY requirements.txt .

RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

COPY ./scripts ./scripts
COPY ./api ./api

ENTRYPOINT ["sh", "scripts/entrypoint.sh"]

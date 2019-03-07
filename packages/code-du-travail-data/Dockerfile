FROM python:3.6-alpine

ENV APP_DIR="/app"
ENV PYTHONIOENCODING="UTF-8"
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=.
ENV ELASTICSEARCH_URL="http://elasticsearch:9200"

WORKDIR $APP_DIR

RUN apk update \
    && apk add --no-cache \
      curl \
      gcc \
      libc-dev \
      linux-headers \
      make \
      musl-dev \
      pcre-dev

RUN pip install pipenv==11.10.1

COPY ./Pipfile .
COPY ./Pipfile.lock .

RUN pipenv install --deploy

COPY . .

RUN chmod +x ./scripts/entrypoint.sh

ENTRYPOINT ["./scripts/entrypoint.sh"]

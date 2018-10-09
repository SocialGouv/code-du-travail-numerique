FROM python:3.6-alpine

ENV APP_DIR="/app"
ENV PYTHONIOENCODING="UTF-8"
ENV PYTHONUNBUFFERED=1

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

COPY Pipfile $APP_DIR/

WORKDIR $APP_DIR

RUN pipenv install --deploy

COPY . $APP_DIR

ENTRYPOINT ["/app/docker/entrypoint.sh"]

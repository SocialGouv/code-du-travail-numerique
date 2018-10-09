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

COPY . $APP_DIR

COPY ./docker/dev/entrypoint.sh /
RUN chmod +x /entrypoint.sh

WORKDIR $APP_DIR

# Create a real virtualenv in dev: this will make it possible to use the pipenv upgrade workflow etc.
# https://github.com/pypa/pipenv/issues/1490#issuecomment-369288621
RUN pipenv --python 3.6
RUN pipenv install --verbose
RUN pipenv install --dev --verbose

ENTRYPOINT ["/entrypoint.sh"]

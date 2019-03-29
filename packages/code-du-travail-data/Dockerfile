FROM python:3.6-alpine

ENV PYTHONIOENCODING="UTF-8"
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=.

WORKDIR /app

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

COPY ./Pipfile /app/Pipfile
COPY ./Pipfile.lock /app/Pipfile.lock

RUN pipenv install --deploy

COPY . .

RUN chmod +x ./scripts/entrypoint.sh

ENTRYPOINT ["./scripts/entrypoint.sh"]

#!/usr/bin/env bash

set -exu pipefail

# Running inside a docker instance, dont modify files
[[ ! -f /.dockerenv ]] || {
  exit 0
}


[[ -f .env ]] || {
  # No `.env` file
  # Create one from the `.env.sample` file
  cp .env.sample .env
}

[[ -f docker-compose.override.yml ]] || {
  # No `docker-compose.override.yml` file
  # Create one from the `docker-compose.override.dev.yml` or `docker-compose.override.prod.yml` file
  # Depending if the current NODE_ENV is "production" or else.
  [[ ${NODE_ENV:-development} = production ]] && _ENV=prod || _ENV=dev
  cp docker-compose.override.${_ENV}.yml docker-compose.override.yml
  unset _ENV
}

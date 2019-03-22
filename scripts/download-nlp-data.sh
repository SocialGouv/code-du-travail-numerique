#!/usr/bin/env sh

export $(grep -v '^#' .env | xargs)

set -exu pipefail

curl -L $SUGGEST_DATA_URL | tar zx -C packages/code-du-travail-nlp/data --strip-components=1

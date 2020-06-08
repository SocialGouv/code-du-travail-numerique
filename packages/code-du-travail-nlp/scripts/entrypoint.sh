#!/usr/bin/env sh

set -exu pipefail



# start the serveur
gunicorn -t 60 --keep-alive 20 --threads=4 --worker-class=gthread -b :${NLP_PORT:=5000} --env NLP_HOST=${NLP_HOST} "api:app"


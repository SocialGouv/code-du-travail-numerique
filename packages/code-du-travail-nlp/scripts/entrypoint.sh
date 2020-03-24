#!/usr/bin/env sh

set -exu pipefail



# start the serveur
gunicorn -t 60 --keep-alive 20 --threads=8 --worker-class=gthread -b :${NLP_PORT} "api:app"


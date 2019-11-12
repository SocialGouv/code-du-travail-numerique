#!/usr/bin/env sh

set -exu pipefail



# start the serveur
gunicorn -t 3000 --threads 4 -b :${NLP_PORT} "api:app"



#!/usr/bin/env sh

set -exu pipefail



# start the serveur
gunicorn -t 3000 --threads 4 -w 2 -b :${NLP_PORT} "api:create_app()"



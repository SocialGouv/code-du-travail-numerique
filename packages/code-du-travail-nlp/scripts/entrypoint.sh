#!/usr/bin/env sh

set -exu pipefail

# start the serveur
gunicorn -t 300 -k gevent -w 2 -b :${NLP_PORT} "api:create_app()"



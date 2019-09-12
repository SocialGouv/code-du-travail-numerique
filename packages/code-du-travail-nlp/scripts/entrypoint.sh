#!/usr/bin/env sh

set -exu pipefail



# start the serveur
gunicorn -t 3000 -k gevent -w 1 -b :${NLP_PORT} "api:create_app()" --log-level "debug" --log-file "-"



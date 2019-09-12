#!/usr/bin/env sh

set -exu pipefail



# start the serveur
#python3 -c 'import tensorflow as tf; print(tf.__version__)' 
gunicorn -t 300 -k gevent -w 2 -b :${NLP_PORT} "api:create_app()" --log-level "debug" --log-file "-"



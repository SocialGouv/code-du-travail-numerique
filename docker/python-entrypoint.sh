#!/bin/sh
set -e

while ! curl "${ELASTICSEARCH_URL}/_cat/health?h=status"
do
    echo "Elasticsearch instance not available: still trying to connect."
    sleep 1
done
echo "Elasticsearch instance available: connected successfully."

cd /app

#python ./search/indexing/create_indexes.py;

# Infinite wait: keep the container alive until it is told to stop.
# Using trap will make the container react immediately to a stop request.
#/bin/sh -c "trap : TERM INT; while sleep 3600; do :; done"

exec "$@"

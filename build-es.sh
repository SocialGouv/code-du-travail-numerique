#!/bin/sh

#
# create a docker image with ElasticSearch + our data by :
#
#   - running a fresh ES setup
#   - ingest data to ES via code-du-travail-data scripts
#   - create a new docker image with the ES data folder embedded
#

TMP_ES_LOCAL_PORT=9222
TMP_DATA_PATH="$PWD/docker/elasticsearch/data"  # this must be under elasticsearch Dockerfile-with-data context

docker rm -f cdtn-es || true
rm -rf $PWD/docker/elasticsearch/data || true

# build and launch custom ES image with local mount
docker build ./docker/elasticsearch -t cdtn-es
docker run -d -v $TMP_DATA_PATH:/usr/share/elasticsearch/data -p $TMP_ES_LOCAL_PORT:9200 --name cdtn-es cdtn-es

# build python ES ingestion script
docker build ./packages/code-du-travail-data -t cdtn-data

# wait ES
retry=60
while
  ! curl -sS "http://127.0.0.1:$TMP_ES_LOCAL_PORT/_cat/health?h=status" &&
  [[ $(( retry-- )) -gt 0 ]];
do echo "Waiting for Elasticsearch to go Green ($retry)" ; sleep 1 ; done ;

# launch python ES ingestion script
docker run --rm --network=host -e ELASTICSEARCH_URL="http://127.0.0.1:$TMP_ES_LOCAL_PORT" cdtn-data

# stop ES gracefully
docker stop cdtn-es

# build a new ES docker image with produced data
docker build ./docker/elasticsearch -f ./docker/elasticsearch/Dockerfile-with-data -t cdtn-es-2




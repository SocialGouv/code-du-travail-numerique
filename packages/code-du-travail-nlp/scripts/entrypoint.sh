#!/usr/bin/env sh

set -exu pipefail
count=0
for file in $(curl -Ls $SUGGEST_DATA_URL); do
  curl -L $file > data/data-$count.zip
  unzip -j -o -d data data/data-$count.zip
  ((count++))
done;

cat data/data-*.txt > data/data.txt
rm data/data-*

# start the serveur
gunicorn -t 200 -w 4 -b :${NLP_PORT} "api:create_app()"

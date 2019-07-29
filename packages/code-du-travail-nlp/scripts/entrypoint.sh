#!/usr/bin/env sh

set -exu pipefail
count=0 
if [ ! -d "data" ]; then mkdir data; fi
for file in $(curl -Ls $SUGGEST_DATA_URL); do
  curl -L $file > data/data-$count.zip
  unzip -j -o -d data data/data-$count.zip
 count=$((count+1))
done;

curl -L https://gist.githubusercontent.com/ArmandGiraud/1a1559091689c036235f380c7136e45a/raw/2ab712066057d8659f1ed9a42739a45c07b39d17/content.json > data/content.json

cat data/data-*.txt > data/data.txt
rm data/data-*

# start the serveur
gunicorn -t 200 -k gevent -w 2 -b :${NLP_PORT} "api:create_app()"



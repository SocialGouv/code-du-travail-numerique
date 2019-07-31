#!/usr/bin/env sh

set -exu pipefail
count=0 
if [ ! -d "data" ]; then mkdir data; fi
for file in $(curl -Ls $SUGGEST_DATA_URL); do
  curl -L $file > data/data-$count.zip
  unzip -j -o -d data data/data-$count.zip
 count=$((count+1))
done;

curl -L https://gist.githubusercontent.com/ArmandGiraud/a39fe6bfb7052579e1ea49c1318b8134/raw/20cf2249f76f55b5ff463fa55808926417c31cef/content.json > data/content.json

cat data/data-*.txt > data/data.txt
rm data/data-*

# start the serveur
gunicorn -t 300 -k gevent -w 2 -b :${NLP_PORT} "api:create_app()"



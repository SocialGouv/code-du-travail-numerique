#!/bin/sh
count=0
# download suggester data
mkdir data || true
for file in $(curl -Ls $SUGGEST_DATA_URL); do
  curl -L $file > data/data-$count.zip
  unzip -j -o -d data data/data-$count.zip
  count=$((count+1))
done;
cat data/data-*.txt > data/data.txt
rm data/data-*

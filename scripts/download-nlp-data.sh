#!/usr/bin/env sh

export $(grep -v '^#' .env | xargs)

set -exu pipefail
for file in $(curl -Ls $SUGGEST_DATA_URL); do
  curl -L $file | tar zx -C packages/code-du-travail-nlp/data --strip-components=1
done;

cat packages/code-du-travail-nlp/data/data-*.txt > packages/code-du-travail-nlp/data/data.txt

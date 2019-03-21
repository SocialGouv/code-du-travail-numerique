#!/usr/bin/env sh

export $(grep -v '^#' .env | xargs)

set -exu pipefail
data_dir=packages/code-du-travail-nlp/api/data
curl -sL $SUGGEST_DATA_URL -o $data_dir/$SUGGEST_DATA_FILE

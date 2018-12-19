#!/usr/bin/env bash

set -exu pipefail

git fetch
git checkout $(git describe --abbrev=0 --tags)
sudo docker-compose pull
sudo docker-compose build
sudo docker-compose run --rm python pipenv run python /app/search/indexing/create_indexes.py
sudo docker-compose up -d
echo "🚀"

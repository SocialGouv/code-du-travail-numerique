#!/usr/bin/env bash

set -exu pipefail

git fetch
git checkout $(git describe --tags $(git rev-list --tags --max-count=1))
sudo docker-compose pull
sudo docker-compose build
sudo docker-compose run --rm python pipenv run python /app/search/indexing/create_indexes.py
sudo docker-compose up -d
echo "🚀"

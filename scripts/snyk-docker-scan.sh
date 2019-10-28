#!/bin/bash

#
# run SNYK vuln scanner on docker images
# need a SNYK_TOKEN environment variable
#

export REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv

LATEST=$(git rev-parse origin/master)
export LATEST

declare -a images=("data" "api" "frontend" "nlp")

for image in "${images[@]}"
do
  docker pull "$REGISTRY"/code-du-travail-numerique/"$image":"$LATEST"
  snyk test --docker "$REGISTRY"/code-du-travail-numerique/"$image":"$LATEST" --file=./packages/code-du-travail-"$image"/Dockerfile
done

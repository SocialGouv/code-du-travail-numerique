#!/bin/sh
# cli tools to detect changes between latest branch commit and master
# Usage :
#   sh scripts/changes.sh code-du-travail-data packages/sources

# git fetch origin --quiet
# git checkout master
# git checkout -
echo "detect changes between master and ${CI_COMMIT_SHA}"
files=$(git diff --name-only master ${CI_COMMIT_SHA})
for pattern in "$@"
do
  for file in $files
  do
    if [[ $file == *$pattern* ]]; then
      echo "$file trigger data update !";
      touch $(basename ${pattern}_SKIP | tr '[:lower:]' '[:upper:]' | tr '-' '_' )
      exit 0
    fi
  done
  echo "no update detected for $pattern"
done

# pattern=packages/code-du-travail-data
# file=packages/code-du-travail-data/dataset/courrier-type/CHANGELOG.md
# if [[ $file == *$pattern* ]]; then
#   echo "$file trigger data update !";
# fi

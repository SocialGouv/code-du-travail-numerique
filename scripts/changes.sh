#!/bin/sh
## cli tools to detect changes between commit branch and master
# Usage :
#   sh scripts/changes.sh packages/code-du-travail-data packages/sources

git fetch origin --quiet
files=$(git diff --name-only master ${CI_COMMIT_SHA})
for pattern in "$@"
do
  for file in $files
  do
    if [[ file == pattern ]]; then
      echo "$file trigger data update !";
      export "skip_data_update"
      exit 0
    fi
  done
  echo "no update detected for $pattern"
done

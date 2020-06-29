#!/bin/bash

git fetch origin --quiet
files=$(git diff --name-only master ${CI_COMMIT_SHA})

for pattern in "$@"
do
  for file in $files
  do
    if [[ file == pattern ]]; then
      echo "$file trigger data update !";
      exit 0
    fi
  done
  echo "no update detected for $pattern"
done

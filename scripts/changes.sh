#!/bin/sh
set -euo pipefail
# -e exits if a command fails
# -u errors if an variable is referenced before being set
# -x shows the commands that get run
# - pipefail the return value of a pipeline is the status of
#   the last command to exit with a non-zero status,
#   or zero if no command exited with a non-zero status

# cli tools to detect changes between latest branch commit and master
# Usage :
#   sh scripts/changes.sh code-du-travail-data packages/sources

# git fetch origin --quiet
# git checkout master
# git checkout -

files=$(git diff --name-only master ${CI_COMMIT_SHA})
echo "detect changes between master and ${CI_COMMIT_SHA}"

build=""

for pattern in "$@"
do
  echo $pattern
  for file in $files
  do
    echo - $file
    ## Poor man str contain
    case $file in *$pattern*)
      echo "🥳 $file trigger data update !";
      build=$(basename ${pattern}_BUILD | tr '[:lower:]' '[:upper:]' | tr '-' '_' ),$build
    esac
  done
done

export CDTN_PACKAGES=$build

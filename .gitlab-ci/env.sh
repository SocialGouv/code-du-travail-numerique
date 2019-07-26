#!/usr/bin/env bash

#

export BRANCH_NAME=${BRANCH_NAME:=$CI_COMMIT_REF_NAME}
export COMMIT=${COMMIT:=$CI_COMMIT_SHA}
export COMMIT_TAG=${COMMIT_TAG:=$CI_COMMIT_TAG}
export JOB_ID=${JOB_ID:=$CI_JOB_ID}
export HASH_SIZE=${HASH_SIZE}
export ENVIRONMENT=${ENVIRONMENT:="dev.factory"};
BRANCH_NAME_HASHED=$(printf "${BRANCH_NAME}" | sha1sum | cut -c1-${HASH_SIZE} )
export BRANCH_HASH=${BRANCH_HASH:=$BRANCH_NAME_HASHED}

#
# For master branch we keep branch name as branch hash
if [[ "${BRANCH_NAME}" = "master" ]]; then
  export BRANCH_HASH=master;
fi

# For versions we replace the version number v2.3.1 to v2-3-1
if [[ -n "${COMMIT_TAG}" ]]; then
  export ENVIRONMENT=incubateur;
  export BRANCH_HASH=$( printf "${COMMIT_TAG}" | sed "s/\./-/g" );
fi

if [[ -n "${PRODUCTION+x}" ]]; then
  export ENVIRONMENT=incubateur;
  export SERVER="incubateur";
  export BRANCH_HASH_DOT=""
  export ELASTICSEARCH_HOST=elasticsearch:${ES_PORT};
else
  export ENVIRONMENT=dev;
  export SERVER="dev.factory";
  BRANCH_HASH_DOT = "${BRANCH_HASH}."
  export ELASTICSEARCH_HOST=elasticsearch-${BRANCH_HASH}:${ES_PORT};
fi

export FRONTEND_HOST="${BRANCH_HASH_DOT}code-du-travail-numerique.${SERVER}.social.gouv.fr";
export API_HOST="api.${BRANCH_HASH_DOT}code-du-travail-numerique.${SERVER}.social.gouv.fr";
export NLP_HOST="nlp.${BRANCH_HASH_DOT}code-du-travail-numerique.${SERVER}.social.gouv.fr";

printenv | grep -E \
  "BRANCH_HASH|BRANCH_NAME|BRANCH_HASH_DOT|COMMIT|COMMIT_TAG|ENVIRONMENT|SERVER|HASH_SIZE|JOB_ID" \
  | sort
printenv | grep -E \
  "FRONTEND_HOST|API_HOST|NLP_HOST" \
  | sort

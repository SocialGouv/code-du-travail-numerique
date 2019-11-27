#!/usr/bin/env bash

#

export BRANCH_NAME=${BRANCH_NAME:=$CI_COMMIT_REF_SLUG}
export COMMIT_TAG=${COMMIT_TAG:=$CI_COMMIT_TAG}
export COMMIT=${COMMIT:=$CI_COMMIT_SHA}
export HASH_SIZE=${HASH_SIZE:=7}
export JOB_ID=${JOB_ID:=$CI_JOB_ID}
export PROJECT_PATH=${PROJECT_PATH:=$CI_PROJECT_PATH}
export REGISTRY=${REGISTRY:=$CI_REGISTRY_IMAGE}
export VERSION=${VERSION:=$CI_COMMIT_REF_NAME}

BRANCH_NAME_HASHED=$( printf "${BRANCH_NAME}" | sha1sum | cut -c1-${HASH_SIZE} )
export BRANCH_HASH=${BRANCH_HASH:=$BRANCH_NAME_HASHED}


export K8S_NAMESPACE="${PROJECT}-feature-${BRANCH_HASH}"

#

#
# For master branch we keep branch name as branch hash
if [[ "${BRANCH_NAME}" = "master" ]]; then
  export BRANCH_HASH=master;
fi

if [[ -n "${COMMIT_TAG}" ]]; then
  # For versions we replace the version number v2.3.1 to v2-3-1
  export BRANCH_HASH=$( printf "${COMMIT_TAG}" | sed "s/\./-/g" );
fi

if [[ -n "${PRODUCTION+x}" ]]; then
  export BRANCH_HASH=prod;
  export DOMAIN="code.travail.fabrique.social.gouv.fr";
else
  export DOMAIN="${BRANCH_HASH}-code-travail.dev.fabrique.social.gouv.fr";
fi


#

export API_HOST="api-${DOMAIN}";
export ELASTICSEARCH_HOST="cdtn-es-http";
export ELASTICSEARCH_URL="http://${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}";
export FRONTEND_HOST="${DOMAIN}";
export NLP_HOST="nlp-${DOMAIN}";
export NLP_API_HOST="nlp";
export NLP_API_URL="http://${NLP_API_HOST}:${NLP_PORT}"

#

if [[ -n "${PRODUCTION+x}" ]]; then
  export API_HOST="api.${DOMAIN}";
  export NLP_HOST="nlp.${DOMAIN}";
fi

export API_URL="https://${API_HOST}"
export FRONTEND_URL="https://${FRONTEND_HOST}"
export NLP_URL="https://${NLP_HOST}"

printenv | grep -E \
  "BRANCH_HASH|BRANCH_NAME|BRANCH_HASH_DOT|COMMIT|COMMIT_TAG|DOMAIN|CLUSTER_NAME|HASH_SIZE|JOB_ID|K8S_NAMESPACE" \
  | sort
printenv | grep -E \
  "API_HOST|API_URL|ELASTICSEARCH_HOST|FRONTEND_HOST|FRONTEND_URL|NLP_HOST|NLP_URL" \
  | sort

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

#

export K8S_NAMESPACE="${PROJECT}-feature-${BRANCH_HASH}"
export AZURE_CONTAINER="cdtn-dev"
if [ -z ${ES_INDEX_PREFIX+x} ]; then
  export ES_INDEX_PREFIX="cdtn-preprod"
fi

#
# For master branch we keep branch name as branch hash
if [[ "${BRANCH_NAME}" = "master" ]]; then
  export BRANCH_HASH=master;
  export ES_INDEX_PREFIX="cdtn-${BRANCH_HASH}"
  export K8S_NAMESPACE="cdtn-${BRANCH_HASH}"
  export AZURE_CONTAINER="cdtn"
fi

if [[ -n "${COMMIT_TAG}" ]]; then
  # For versions we replace the version number v2.3.1 to v2-3-1
  export BRANCH_HASH="preprod";
  export IMAGE_TAG=$(printf "${COMMIT_TAG}" | sed "s/^v//")
  export ES_INDEX_PREFIX="cdtn-${BRANCH_HASH}"
  export K8S_NAMESPACE="cdtn-${BRANCH_HASH}"
  export AZURE_CONTAINER="cdtn"
fi



if [[ -n "${PRODUCTION+x}" ]]; then
  export BRANCH_HASH=prod;
  export ES_INDEX_PREFIX="cdtn-prod"
  export K8S_NAMESPACE="cdtn"
  export DOMAIN="code.travail.fabrique.social.gouv.fr";
  export NLP_URL="https://serving-ml.fabrique.social.gouv.fr";
  export AZURE_CONTAINER="cdtn"
else
  export DOMAIN="${CI_ENVIRONMENT_SLUG}-${CI_PROJECT_NAME}.${KUBE_INGRESS_BASE_DOMAIN}";
fi


#

export API_HOST="api-${DOMAIN}";
export FRONTEND_HOST="${DOMAIN}";

#

if [[ -n "${PRODUCTION+x}" ]]; then
  export API_HOST="api.${DOMAIN}";
  export FRONTEND_HOST="code.travail.gouv.fr";
fi

export API_URL="https://${API_HOST}"
export FRONTEND_URL="https://${FRONTEND_HOST}"

printenv | grep -E \
  "ES_INDEX_PREFIX|BRANCH_HASH|BRANCH_NAME|BRANCH_HASH_DOT|COMMIT|COMMIT_TAG|DOMAIN|CLUSTER_NAME|HASH_SIZE|JOB_ID|K8S_NAMESPACE|ENVIRONMENT" \
  | sort
printenv | grep -E \
  "API_HOST|API_URL|FRONTEND_HOST|FRONTEND_URL|NLP_HOST|NLP_URL" \
  | sort

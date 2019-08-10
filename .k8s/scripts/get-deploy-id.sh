#!/usr/bin/env bash
set -eu -o pipefail

CACHE_RESPONSE=${CACHE_RESPONSE:="/tmp/deploy_payload.json"}
DEPLOY_ID_FILE=${DEPLOY_ID_FILE:="DEPLOY_ID"}
PROJECT_PATH=${PROJECT_PATH:=$CI_PROJECT_PATH}
REF=${REF:=$CI_COMMIT_REF_NAME}
TRANSIENT_ENVIRONMENT=${TRANSIENT_ENVIRONMENT:=true}
PRODUCTION_ENVIRONMENT=${PRODUCTION_ENVIRONMENT:=false}

if [[ -n "${COMMIT_TAG}" ]]; then
  REF="${COMMIT_TAG}"
  TRANSIENT_ENVIRONMENT=false
fi

if [[ "${REF}" = "master" ]]; then
  TRANSIENT_ENVIRONMENT=false
fi

if [[ -n "${PRODUCTION+x}" ]]; then
  ENVIRONMENT=production
  PRODUCTION_ENVIRONMENT=true
fi

curl -0 -sS \
"https://${GITHUB_TOKEN}@api.github.com/repos/${PROJECT_PATH}/deployments" \
-H "Content-Type:application/json" \
-H "Accept: application/vnd.github.flash-preview+json, application/vnd.github.ant-man-preview+json" \
-o "${CACHE_RESPONSE}" \
-d @- << EOF
{
  "auto_merge": false,
  "description": "Deplying ${PROJECT_PATH}@${CI_COMMIT_SHORT_SHA} in ${ENVIRONMENT}",
  "environment": "${ENVIRONMENT}",
  "ref": "${REF}",
  "required_contexts": [],
  "transient_environment": ${TRANSIENT_ENVIRONMENT},
  "production_environment": ${PRODUCTION_ENVIRONMENT}
}
EOF

cat << EOF
{
  "auto_merge": false,
  "description": "Deplying ${PROJECT_PATH}@${CI_COMMIT_SHORT_SHA} in ${ENVIRONMENT}",
  "environment": "${ENVIRONMENT}",
  "ref": "${REF}",
  "required_contexts": [],
  "transient_environment": ${TRANSIENT_ENVIRONMENT},
  "production_environment": ${PRODUCTION_ENVIRONMENT}
}
EOF

cat "${CACHE_RESPONSE}"

cat "${CACHE_RESPONSE}" \
  | python -c "import json,sys;obj=json.load(sys.stdin);print(obj.get('id'))" \
  > "${DEPLOY_ID_FILE}"

if [[ $(cat $DEPLOY_ID_FILE) = "None" ]]; then
  exit 1;
fi

#!/usr/bin/env bash
set -eu -o pipefail

CACHE_RESPONSE=${CACHE_RESPONSE:="/tmp/deploy_payload.json"}
DEPLOY_ID_FILE=${DEPLOY_ID_FILE:="DEPLOY_ID"}

curl -0 -sS \
"https://${GITHUB_TOKEN}@api.github.com/repos/${CI_PROJECT_PATH}/deployments" \
-H "Content-Type:application/json" \
-H "Accept: application/vnd.github.flash-preview+json, application/vnd.github.ant-man-preview+json" \
-o "${CACHE_RESPONSE}" \
-d @- << EOF
{
  "auto_merge": false,
  "description": "Deplying ${CI_PROJECT_PATH}@${CI_COMMIT_SHORT_SHA}",
  "environment": "${ENVIRONMENT}",
  "ref": "${CI_COMMIT_REF_NAME}",
  "required_contexts": [],
  "transient_environment": true
}
EOF

cat "$CACHE_RESPONSE" \
  | python -c "import json,sys;obj=json.load(sys.stdin);print(obj.get('id'))" \
  > "$DEPLOY_ID_FILE"

if [[ $(cat $DEPLOY_ID_FILE) = "None" ]]; then
  exit 1;
fi

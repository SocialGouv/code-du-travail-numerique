#!/usr/bin/env bash
set -eu -o pipefail

#

DEPLOY_ID="${1}"
STATE="${2}"

if [[ -z ${DEPLOY_ID} ]] || ! [[ ${STATE} = "success" || ${STATE} = "failure" ]]; then
  echo -e "$0 <github_deployment_id> <success|failure>"
  exit 128
fi

#

curl -0 \
"https://${GITHUB_TOKEN}@api.github.com/repos/${CI_PROJECT_PATH}/deployments/${DEPLOY_ID}/statuses" \
-H "Content-Type:application/json" \
-H "Accept: application/vnd.github.flash-preview+json, application/vnd.github.ant-man-preview+json" \
-d @- << EOF
{
  "description": "Deployment ${STATE}",
  "environment": "${ENVIRONMENT}",
  "environment_url": "${URL}",
  "log_url": "${URL}",
  "state": "${STATE}"
}
EOF

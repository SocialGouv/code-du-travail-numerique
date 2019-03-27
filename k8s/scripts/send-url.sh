#!/bin/bash

curl \
  --verbose \
  https://${GITHUB_TOKEN}@api.github.com/repos/${CI_PROJECT_PATH}/deployments/${DEPLOY_ID}/statuses \
  -X POST \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/vnd.github.flash-preview+json, application/vnd.github.ant-man-preview+json' \
  --data '{"environment": "'${CI_ENVIRONMENT_NAME}'", "environment_url": "'${URL}'", "log_url": "'${URL}'", "description": "Deployment finished successfully.", "state":"success"}'

#!/bin/bash

curl -v https://${GITHUB_TOKEN}@api.github.com/repos/${CI_PROJECT_PATH}/deployments \
-H 'Content-Type:application/json' \
--data '{"ref":"'${CI_COMMIT_REF_NAME}'", "auto_merge":false, "environment": "'${CI_ENVIRONMENT_NAME}'", "required_contexts": [], "description": "Deploying '${CI_PROJECT_PATH}'@'${CI_COMMIT_SHORT_SHA}'"}' | python3 -c "import json,sys;obj=json.load(sys.stdin);print(obj.get('id'))" >> github_deploy_id

#!/usr/bin/env bash

#

[[ type curl ]] || apk add curl=~7
[[ type git ]] || apk add git=~2
[[ type jq ]] || apk add jq=~1

#

wget https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/minio_s3_cache.sh &&
source minio_s3_cache.sh

wget https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/git_files_changes.sh &&
source git_files_changes.sh

wget https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/manual_caching.sh &&
source manual_caching.sh

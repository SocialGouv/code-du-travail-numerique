#!/usr/bin/env bash

#

[[ type apt-get ]] && apt-get -y update
[[ type curl ]] || apk add curl=~7 || apt-get install curl=7.*
[[ type git ]] || apk add git=~2 || apt-get install git=1:2.*
[[ type jq ]] || apk add jq=~1 || apt-get install jq=1.*

#

wget -qO ./minio_s3_cache.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/minio_s3_cache.sh &&
source ./minio_s3_cache.sh

wget -qO ./git_files_changes.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/git_files_changes.sh &&
source ./git_files_changes.sh

wget -qO ./manual_caching.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/manual_caching.sh &&
source ./manual_caching.sh

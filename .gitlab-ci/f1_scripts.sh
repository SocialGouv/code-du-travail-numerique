#!/usr/bin/env bash

#

if type apt-get; then apt-get -y update; fi
if type curl; then curl --version; else apk add curl=~7 || apt-get install curl=7.* ; fi
if type git; then git --version; else apk add git=~2 || apt-get install git=1:2.* ; fi
if type jq; then jq --version; else  apk add jq=~1 || apt-get install jq=1.* ; fi

#

wget -qO ./minio_s3_cache.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/minio_s3_cache.sh &&
source ./minio_s3_cache.sh

wget -qO ./git_files_changes.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/git_files_changes.sh &&
source ./git_files_changes.sh

wget -qO ./manual_caching.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/manual_caching.sh &&
source ./manual_caching.sh

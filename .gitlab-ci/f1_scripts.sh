#!/usr/bin/env bash

[[ -n "${TRACE}" ]] && set -x

#

if type apt-get; then apt-get -y update; fi
if type curl; then curl --version; else apk add curl=~7 || apt-get install -y curl=7.* ; fi
if type wget; then wget --version || true; else apk add wget=~1 || apt-get install -y wget=1.* ; fi
if type git; then git --version; else apk add git=~2 || apt-get install -y git=1:2.* ; fi
if type jq; then jq --version; else  apk add jq=~1 || apt-get install -y jq=1.* ; fi

#

wget -qO ./minio_s3_cache.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/minio_s3_cache.sh
source ./minio_s3_cache.sh

wget -qO ./git_files_changes.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/git_files_changes.sh
source ./git_files_changes.sh

wget -qO ./manual_caching.sh https://raw.githubusercontent.com/SocialGouv/gitlab-ci-yml/master/manual_caching.sh
source ./manual_caching.sh

function f1_install_before () {
  echo "🏎️ If ${F1_CHECK_FILES} changes"
  echo "🏎️ Reinstall the ${F1_PACKAGES_FOLDER} as ${package_name}"
  echo "🏎️ Using ${F1_CACHE_FOLDER}"

  local package_name=${F1_PACKAGES_NAME:=${F1_PACKAGES_FOLDER}}

  if [[ -z ${NO_CACHE} ]]; then
    echo ""
    echo "///"
    echo ""
    checking_cache "${CI_COMMIT_REF_SLUG}/${CONTEXT}-${package_name}.tar.gz" || \
    (echo "" && checking_cache "${CI_DEFAULT_BRANCH}/${CONTEXT}-${package_name}.tar.gz") || \
    true
  fi

  echo ""
  echo "///"
  echo ""

  sha1sum ${F1_CHECK_FILES} > PACKAGE_SHA
  cat PACKAGE_SHA

  if ( \
      [[ -d "${CI_PROJECT_DIR}/${F1_PACKAGES_FOLDER}" ]] || \
      [[ -f "${CI_PROJECT_DIR}/${F1_PACKAGES_FOLDER}" ]] \
    ) && cmp -s PACKAGE_SHA SHA ; then
    echo "No changes detected."
    exit "${CI_JOB_SKIP_EXIT_CODE:-0}"
  else
    echo "Changes detected."
    rm -rf "${CI_PROJECT_DIR:?}/${F1_PACKAGES_FOLDER}"
    mv PACKAGE_SHA SHA
  fi

  if [[ -n "${F1_CACHE_FOLDER}" ]] && [[ -z ${NO_CACHE} ]]; then
    echo ""
    echo "///"
    echo ""
    checking_cache "${CI_COMMIT_REF_SLUG}/${CONTEXT}-${F1_CACHE_FOLDER}.tar.gz" || \
    (echo "" && checking_cache "${CI_DEFAULT_BRANCH}/${CONTEXT}-${F1_CACHE_FOLDER}.tar.gz") || \
    true
  fi
}

function f1_install_after () {
  if [[ -n "${F1_CACHE_FOLDER}" ]]; then
    echo "Cache ${F1_CACHE_FOLDER}"
    creating_cache "${CONTEXT}-${F1_CACHE_FOLDER}.tar.gz" "${F1_CACHE_FOLDER}" || true
  fi

  local package_name=${F1_PACKAGES_NAME:=${F1_PACKAGES_FOLDER}}

  echo "Cache ${F1_PACKAGES_FOLDER} as ${package_name}"
  creating_cache "${CONTEXT}-${package_name}.tar.gz" SHA "${F1_PACKAGES_FOLDER}" || true
}

#!/usr/bin/env bash
# Étape 2 de la release (automatique sur main) : si la version de lerna.json n'est pas encore
# taguée (= la MR release/vX.Y.Z vient d'être mergée), publie les libs sur npm, puis crée le
# tag vX.Y.Z et la release GitLab sur le commit mergé. Le tag déclenche ensuite le pipeline
# de prod (build + deploy-prod manuel).
set -euo pipefail
source "$(dirname "$0")/release-common.sh"

setup_git

VERSION="$(lerna_version)"
TAG="v${VERSION}"
if tag_exists "$TAG"; then
  echo "${TAG} déjà tagué : rien à publier."
  exit 0
fi

# Garde-fou : une version inférieure au dernier tag (ex. lerna.json ramené par une synchro
# GitHub) ne doit pas être publiée.
LATEST="$(latest_tag)"
if [ -n "$LATEST" ] && [ "$(printf '%s\n%s\n' "$LATEST" "$TAG" | sort -V | tail -1)" != "$TAG" ]; then
  echo "lerna.json (${TAG}) est en dessous du dernier tag (${LATEST}) : publication ignorée." >&2
  exit 0
fi

# npm d'abord : `from-package` est idempotent, on peut relancer le job tant que le tag
# n'existe pas. Facultatif : sans NPM_TOKEN, on tague et on crée la release sans publier.
if [ -n "${NPM_TOKEN:-}" ]; then
  install_deps
  pnpm build:npm
  npm config set --location=user "//registry.npmjs.org/:_authToken" "${NPM_TOKEN}"
  pnpm exec lerna publish from-package --yes
else
  echo "NPM_TOKEN absent : publication npm des libs ignorée."
fi

NOTES="$(changelog_section "$VERSION" | json_string)"
gitlab_api POST "/releases" \
  "{\"tag_name\":\"${TAG}\",\"ref\":\"${CI_COMMIT_SHA}\",\"name\":\"${TAG}\",\"description\":${NOTES}}" >/dev/null
echo "Release ${TAG} créée sur ${CI_COMMIT_SHA}."

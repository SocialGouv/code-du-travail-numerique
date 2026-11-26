#!/usr/bin/env bash
# Étape 1 de la release (bouton manuel sur main) : calcule la prochaine version avec lerna
# (conventional commits depuis le dernier tag), commite le bump des package.json + CHANGELOG
# sur une branche release/vX.Y.Z et ouvre la MR vers main. Ni tag ni publication ici :
# c'est release-publish.sh qui s'en charge une fois la MR mergée.
set -euo pipefail
source "$(dirname "$0")/release-common.sh"

setup_git
# lerna refuse de travailler en HEAD détaché.
git checkout -B "$CI_COMMIT_BRANCH" "$CI_COMMIT_SHA"

# Tag de départ (version courante de lerna.json) s'il manque sur la PIC, pour que lerna
# ne reprenne pas tout l'historique.
BASE="v$(lerna_version)"
if ! tag_exists "$BASE"; then
  BASE_SHA="$(git log -1 --format=%H -S "${BASE#v}" -- lerna.json)"
  if [ -n "$BASE_SHA" ]; then
    gitlab_api POST "/repository/tags?tag_name=${BASE}&ref=${BASE_SHA}" >/dev/null
    git fetch origin --tags --force
  fi
fi

install_deps
# `createRelease: github` (lerna.json) est sans effet ici : lerna ne crée pas de release avec --no-push.
HUSKY=0 pnpm exec lerna version --conventional-commits --force-publish --no-git-tag-version --no-push --yes

VERSION="$(lerna_version)"
TAG="v${VERSION}"
BRANCH="release/${TAG}"
if tag_exists "$TAG"; then
  echo "Le tag ${TAG} existe déjà : réaligner lerna.json sur le dernier tag ($(latest_tag))." >&2
  exit 1
fi

git checkout -B "$BRANCH"
git add -A
HUSKY=0 git commit --no-verify -m "chore(release): version ${VERSION}"
# --force : écrase une éventuelle branche laissée par une MR de release fermée sans merge.
git push --force --no-verify origin "$BRANCH"

NOTES="$(changelog_section "$VERSION")"
DESCRIPTION="$(printf 'Release **%s**. Au merge, `publish-release` crée le tag, la release GitLab et publie @socialgouv/modeles-social et @socialgouv/cdtn-utils sur npm (si NPM_TOKEN est défini).\n\n%s\n' "$TAG" "$NOTES" | json_string)"

EXISTING="$(gitlab_api GET "/merge_requests?state=opened&source_branch=${BRANCH}" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const m=JSON.parse(s)[0];process.stdout.write(m?String(m.iid):"")})')"
if [ -n "$EXISTING" ]; then
  gitlab_api PUT "/merge_requests/${EXISTING}" "{\"description\":${DESCRIPTION}}" >/dev/null
  echo "MR !${EXISTING} mise à jour pour ${TAG}."
else
  gitlab_api POST "/merge_requests" \
    "{\"source_branch\":\"${BRANCH}\",\"target_branch\":\"${CI_COMMIT_BRANCH}\",\"title\":\"chore(release): version ${VERSION}\",\"description\":${DESCRIPTION},\"remove_source_branch\":true}" \
    | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log("MR ouverte : "+JSON.parse(s).web_url))'
fi

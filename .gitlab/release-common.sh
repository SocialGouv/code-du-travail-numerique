# Fonctions partagées par release-mr.sh et release-publish.sh (sourcé, pas exécuté).

# Git authentifié avec GITLAB_TOKEN (api + write_repository) et tags à jour.
setup_git() {
  # Identifiants dans l'URL : le runner installe son propre credential helper (CI_JOB_TOKEN,
  # sans droit de push), consulté avant tout helper ajouté ici → 403 au push. Des identifiants
  # présents dans l'URL court-circuitent les helpers. `oauth2` : utilisateur attendu pour un
  # token d'accès (personnel, projet ou groupe). GITLAB_TOKEN est masqué dans les logs.
  git remote set-url origin "https://oauth2:${GITLAB_TOKEN}@${CI_SERVER_HOST}/${CI_PROJECT_PATH}.git"
  # Diagnostic (non bloquant) : le token doit avoir les scopes api + write_repository.
  gitlab_token_info || true
  git config user.name "${GITLAB_USER_NAME}"
  git config user.email "${GITLAB_USER_EMAIL}"
  git fetch origin --tags --force --prune
}

lerna_version() {
  node -p "require('./lerna.json').version"
}

tag_exists() {
  git rev-parse -q --verify "refs/tags/$1" >/dev/null
}

latest_tag() {
  git tag -l 'v[0-9]*.[0-9]*.[0-9]*' | sort -V | tail -1
}

# Appel API GitLab : gitlab_api METHOD PATH [JSON]
gitlab_api() {
  curl --fail-with-body -sS -X "$1" \
    -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" -H "Content-Type: application/json" \
    ${3:+--data "$3"} "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}$2"
}

# Affiche le nom, les scopes et l'expiration de GITLAB_TOKEN.
gitlab_token_info() {
  curl --fail -sS -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "${CI_API_V4_URL}/personal_access_tokens/self" \
    | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const t=JSON.parse(s);console.log(`GITLAB_TOKEN : ${t.name} ; scopes ${t.scopes.join(",")} ; expire ${t.expires_at}`)})'
}

# Section du CHANGELOG racine pour une version (« ## [X.Y.Z] » ou « # [X.Y.Z] »).
changelog_section() {
  awk -v ver="$1" '
    $0 ~ "^##? \\[" ver "\\]" { inside = 1; next }
    inside && $0 ~ "^##? \\[" { exit }
    inside { print }
  ' CHANGELOG.md
}

# Échappe stdin en chaîne JSON.
json_string() {
  node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>process.stdout.write(JSON.stringify(s.trim())))'
}

install_deps() {
  npm install -g pnpm@11.9.0
  pnpm install --frozen-lockfile
}

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const parse = (v) => v.replace(/^v/, "").split(".").map(Number);
const compare = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];

git("fetch", "--tags", "--force", "--quiet", "origin");

let last = "";
try {
  last = execFileSync("git", ["describe", "--tags", "--abbrev=0", "--match", "v[0-9]*.[0-9]*.[0-9]*", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
} catch {}

const lernaVersion = parse(JSON.parse(readFileSync("lerna.json", "utf8")).version);
const base = last && compare(parse(last), lernaVersion) > 0 ? parse(last) : lernaVersion;

const log = git("log", "--no-merges", "--format=%h%x1f%s%x1f%b%x1e", last ? `${last}..HEAD` : "HEAD");
const commits = log
  .split("\x1e")
  .map((entry) => entry.trim())
  .filter(Boolean)
  .map((entry) => {
    const [sha, subject, body] = entry.split("\x1f");
    return { sha, subject, body: body || "" };
  })
  .filter((commit) => !/^chore\(release\)/.test(commit.subject));

if (commits.length === 0) {
  console.log(`Aucun commit depuis ${last || "le début"} : rien à publier.`);
  process.exit(0);
}

const pattern = /^(\w+)(\([^)]*\))?(!)?:\s*(.+)$/;
const sections = { feat: [], fix: [] };
let level = 0;
for (const commit of commits) {
  const match = commit.subject.match(pattern);
  if (!match) continue;
  if (match[3] || /BREAKING CHANGE/.test(commit.body)) level = Math.max(level, 2);
  else if (match[1] === "feat") level = Math.max(level, 1);
  if (match[1] === "feat" || match[1] === "fix") sections[match[1]].push(`- ${match[4]} (${commit.sha})`);
}

const next =
  level === 2 ? [base[0] + 1, 0, 0] : level === 1 ? [base[0], base[1] + 1, 0] : [base[0], base[1], base[2] + 1];
const tag = `v${next.join(".")}`;
const notes =
  [
    sections.feat.length && `### Nouveautés\n\n${sections.feat.join("\n")}`,
    sections.fix.length && `### Corrections\n\n${sections.fix.join("\n")}`,
  ]
    .filter(Boolean)
    .join("\n\n") || "Maintenance.";

console.log(
  `Dernier tag : ${last || "aucun"} ; base : v${base.join(".")} ; ${commits.length} commit(s) ; nouvelle version : ${tag}`
);

if (process.env.RELEASE_DRY_RUN === "true") {
  console.log(notes);
  process.exit(0);
}

const response = await fetch(`${process.env.CI_API_V4_URL}/projects/${process.env.CI_PROJECT_ID}/releases`, {
  method: "POST",
  headers: { "JOB-TOKEN": process.env.CI_JOB_TOKEN, "Content-Type": "application/json" },
  body: JSON.stringify({ tag_name: tag, ref: process.env.CI_COMMIT_SHA, name: tag, description: notes }),
});

if (!response.ok) {
  console.error(`Échec de la création de ${tag} : ${response.status} ${await response.text()}`);
  process.exit(1);
}

console.log(`Release ${tag} créée sur ${process.env.CI_COMMIT_SHA}.`);

const execSync = require("child_process").execSync;

const objectTypes = [
  "pod",
  "service",
  "ingress",
  "configmap",
  "statefulset",
  "deployment"
];
const listK8sCmd = `kubectl get ${objectTypes.join(
  ","
)}  -n cdtn -o custom-columns=":metadata.name,:metadata.labels['git/branch']"`;

const listGithubBranchCmd = "git ls-remote --heads | cut -f2";

const listIndicesCmd = `curl -u ${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PWD} ${process.env.ELASTICSEARCH_URL}/_cat/indices?h=index`;

function getDeleteIndexCmd(indexName) {
  return `curl -X "DELETE" -u ${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PWD} ${process.env.ELASTICSEARCH_URL}/${indexName}`;
}

function getDeleteObjectCmd(id) {
  return `kubectl  pod,service,ingress,deployement,configmap,statefulset   -n cdtn`;
}

// when all items will have correct label
function getDeleteObjectFromBranchCmd(branch) {
  return `kubectl get pod,service,ingress,deployement,configmap,statefulset  -n cdtn -l 'git/branch'=${branch}`;
}

function hashBranchName(branchName) {
  return execSync(` printf "${branchName}" | shasum | cut -c1-7`)
    .toString()
    .trim();
}

function ciCommitRefSlug(str) {
  return str
    .toLowerCase()
    .slice(0 - 63)
    .replace(/[^0-9a-z]/g, "-");
}

function getk8sObject() {
  const k8ObjectList = execSync(listK8sCmd).toString();
  return k8ObjectList
    .split("\n")
    .map(line => {
      const [id, branchRaw] = line.split(/\s+/);
      return { id, branch: branchRaw === "<none>" ? undefined : branchRaw };
    })
    .filter(({ id }) => Boolean(id));
}

function getGithubBranches() {
  const remoteBranches = execSync(listGithubBranchCmd).toString();
  return remoteBranches
    .split("\n")
    .filter(branch => branch !== "master")
    .map(branch => ciCommitRefSlug(branch.replace("refs/heads/", "")))
    .filter(Boolean);
}

function uniq(ar) {
  return [...new Set(ar)];
}

function cleanOldIndex(hashes) {
  execSync(listIndicesCmd)
    .toString()
    .split("\n")
    .map(indexName => {
      if (hashes.some(hash => new RegExp(`cdtn-${hash}`).test(indexName))) {
        execSync(getDeleteIndexCmd(indexName));
      }
    });
}

const k8sObjectList = getk8sObject();
const branchList = getGithubBranches();
const hashedBranchName = branchList.map(hashBranchName);

const objectsToDelete = k8sObjectList.filter(({ id, branch }) => {
  if (/master/.test(branch) || /-master-/.test(id)) {
    return false;
  }
  if (/v\d+-\d+-\d+/.test(branch) || /-v\d+-\d+-\d+-/.test(id)) {
    return false;
  }
  if (branchList.includes(branch)) {
    return false;
  }
  return !hashedBranchName.some(hash => new RegExp(`-${hash}(-|$)`).test(id));
});

/**
 * Dele k8s object using label git/branch
 */
// uniq(objectsToDelete.map(({ branch }) => branch)).map(banch =>
//   execSync(getDeleteObjectFromBranchCmd(branch))
// );

/**
 * Delete ES index using deployed hashes
 */
// const hashToDelete = uniq(
//   objectsToDelete
//     .map(({ id }) => {
//       const [, hash] =
//         id.match(
//           /cdtn-(?:api|nlp|frontend|elasticsearch|data)-([0-9a-z]{7})(-|$)/
//         ) || [];
//       return hash;
//     })
//     .filter(Boolean)
// );
// cleanOldIndex(has)

/**
 * Delete k8s object
 */
// uniq(objectsToDelete.map(({ id }) => id)).map(id =>
//   execSync(getDeleteObjectCmd(id))
// );

console.log(
  `${uniq(objectsToDelete.map(({ id }) => id)).length} items to delete`
);

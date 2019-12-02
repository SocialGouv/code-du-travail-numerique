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

function getDeleteIndicesCmd(hash) {
  return `curl -X "DELETE" -u ${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PWD} ${process.env.ELASTICSEARCH_URL}/cdtn-${hash}-*`;
}

function getDeleteObjectCmd(id) {
  return `kubectl pod,service,ingress,deployement,configmap,statefulset -n cdtn`;
}

// when all items will have correct label
function getDeleteObjectFromBranchCmd(branch) {
  return `kubectl get pod,service,ingress,deployement,configmap,statefulset  -n cdtn -l 'git/branch'=${branch}`;
}

function cleanOldIndex(hashes) {
  hashes.map(getDeleteIndicesCmd).forEach(execSync);
}

function hashBranchName(branchName) {
  return execSync(` printf "${branchName}" | shasum | cut -c1-7`)
    .toString()
    .trim();
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

function ciCommitRefSlug(str) {
  return str
    .toLowerCase()
    .slice(0 - 63)
    .replace(/[^0-9a-z]/g, "-");
}

function uniq(ar) {
  return [...new Set(ar)];
}

const k8sObjectList = getk8sObject();
const branchList = getGithubBranches();
const hashedBranchName = branchList.map(hashBranchName);

const objectsToDelete = k8sObjectList.filter(({ id, branch }) => {
  if (/master/.test(branch) || /-master(-|$)?/.test(id)) {
    return false;
  }
  if (/v\d+-\d+-\d+/.test(branch) || /-v\d+-\d+-\d+(-|$)/.test(id)) {
    return false;
  }
  if (branchList.includes(branch)) {
    return false;
  }
  return !hashedBranchName.some(hash => new RegExp(`-${hash}(-|$)`).test(id));
});

const hashToDelete = objectsToDelete
  .map(({ id }) => {
    const [, hash] =
      id.match(
        /cdtn-(?:api|nlp|frontend|elasticsearch|data)-([0-9a-z]{7})(-|$)/
      ) || [];
    return hash;
  })
  .filter(Boolean);

const deleteCandidate = uniq(objectsToDelete.map(({ id }) => id));
const deleteHashCandidate = uniq(hashToDelete);

/**
 * Delete ES index using deployed hashes
 */
// cleanOldIndex(deleteHashCandidate)
// or
/**
 * Delete k8s object using label git/branch
 */
// uniq(objectsToDelete.map(({ branch }) => branch)).map(banch =>
//   execSync(getDeleteObjectFromBranchCmd(branch))
// );

/**
 * Delete k8s object
 */
// deleteCandidate.map(id => execSync(getDeleteObjectCmd(id)));
// console.log(JSON.stringify(deleteCandidate, 0, 2));
// console.log(`${deleteCandidate.length} items to delete`);
// console.log("candidate hashes to delete");
// console.log({ deleteHashCandidate });
branchList.forEach((b, index) => console.log(b, hashedBranchName[index]));

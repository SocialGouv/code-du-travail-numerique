const dependencies = require("../package.json").dependencies;

export function getVersions(pattern = "^@socialgouv/") {
  const packageRule = new RegExp(pattern);
  return Object.entries(dependencies)
    .filter(([name]) => {
      return packageRule.test(name);
    })
    .reduce((state, [name, version]) => ({ ...state, [name]: version }), {});
}

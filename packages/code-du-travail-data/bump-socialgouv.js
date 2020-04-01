const version = require("./package.json");
const latest = process.env.LATEST || false;

Object.keys(version.dependencies).forEach((dep) => {
  if (dep.startsWith("@socialgouv") && latest) {
    version.dependencies[dep] = "latest";
  }
});

console.log(JSON.stringify(version, 0, 2));

const dependencies = require("../package.json").dependencies;

export function getVersions(pattern = "^@socialgouv/") {
  const packageRule = new RegExp(pattern);
  return (
    Object.entries(dependencies)
      // NOTE(douglasduteil): do not list packages with dots.
      // As most @socialgouv/cdtn...* are internals we do not need to list them versions
      .filter(([name]) => name.includes("."))
      .filter(([name]) => {
        return packageRule.test(name);
      })
      .reduce((state, [name, version]) => ({ ...state, [name]: version }), {})
  );
}

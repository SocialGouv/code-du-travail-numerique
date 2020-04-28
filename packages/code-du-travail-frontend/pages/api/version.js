import getConfig from "next/config";

const {
  publicRuntimeConfig: { COMMIT, PACKAGE_VERSION },
} = getConfig();

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ commit: COMMIT, version: PACKAGE_VERSION }));
};

module.exports = {
  API_BASE_URL: "/api/v1",
  CDTN_ADMIN_VERSION: require("../../../package.json").dependencies[
    "@socialgouv/cdtn-elasticsearch"
  ].split(".")[0],
};

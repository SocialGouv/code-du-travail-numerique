const cdtnAdminVersion = require("../../../package.json").dependencies[
  "@socialgouv/cdtn-elasticsearch"
];

const [, major] = cdtnAdminVersion.match(/^(?:\^|~)?(\d+)/);

if (!major) {
  throw new Error("[prefix]: cdtnAdminVersion major not found");
}
module.exports = {
  API_BASE_URL: "/api/v1",
  CDTN_ADMIN_VERSION: `v${major}`,
};

const cdtnAdminVersion =
  require("../../package.json").dependencies["@socialgouv/cdtn-elasticsearch"];

const [, major] = cdtnAdminVersion.match(/^(?:\^|~)?(\d+)/);

if (!major) {
  throw new Error("[prefix]: cdtnAdminVersion major not found");
}

export const API_BASE_URL = "/api/v1/";
export const CDTN_ADMIN_VERSION = `v${major}`;

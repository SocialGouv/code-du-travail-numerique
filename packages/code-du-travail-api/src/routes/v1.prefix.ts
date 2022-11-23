import pkg from "../../package.json";

const cdtnAdminVersion = pkg.version;

const [, major] = cdtnAdminVersion.match(/^(?:\^|~)?(\d+)/) as any;

if (!major) {
  throw new Error("[prefix]: cdtnAdminVersion major not found");
}

export const API_BASE_URL = "/api/v1";
export const CDTN_ADMIN_VERSION = `v${major}`;

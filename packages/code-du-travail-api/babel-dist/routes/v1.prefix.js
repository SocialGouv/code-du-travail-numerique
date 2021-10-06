"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDTN_ADMIN_VERSION = exports.API_BASE_URL = void 0;
const cdtnAdminVersion =
  require("../../package.json").dependencies["@socialgouv/cdtn-elasticsearch"];

const [, major] = cdtnAdminVersion.match(/^(?:\^|~)?(\d+)/);
if (!major) {
  throw new Error("[prefix]: cdtnAdminVersion major not found");
}
const API_BASE_URL = "/api/v1";
exports.API_BASE_URL = API_BASE_URL;
const CDTN_ADMIN_VERSION = `v${major}`;
exports.CDTN_ADMIN_VERSION = CDTN_ADMIN_VERSION;

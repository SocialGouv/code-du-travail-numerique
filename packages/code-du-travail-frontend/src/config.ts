const { version } = require("../package.json");

export const API_ENTREPRISE_URL =
  process.env.API_ENTREPRISE_URL ??
  "https://entreprise.data.gouv.fr/api/sirene";
export const API_SIRET2IDCC_URL =
  process.env.API_SIRET2IDCC_URL ??
  "https://siret2idcc.fabrique.social.gouv.fr/api/v2";
export const API_URL = process.env.API_URL ?? "http://127.0.0.1:1337/api/v1";
export const AZURE_BASE_URL =
  process.env.AZURE_BASE_URL ?? "https://cdtnadmindev.blob.core.windows.net";
export const AZURE_CONTAINER = process.env.AZURE_CONTAINER ?? "cdtn-dev";
export const COMMIT = process.env.COMMIT;
export const FRONTEND_HOST = process.env.FRONTEND_HOST
  ? `https://${process.env.FRONTEND_HOST}`
  : `http://localhost:${process.env.FRONTEND_PORT ?? 3000}`;
export const PACKAGE_VERSION = process.env.VERSION ?? version;
export const PIWIK_SITE_ID = process.env.PIWIK_SITE_ID ?? "";
export const PIWIK_URL = process.env.PIWIK_URL ?? "";

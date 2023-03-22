const { version } = require("../package.json");

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337/api/v1";
export const AZURE_BASE_URL =
  process.env.NEXT_PUBLIC_AZURE_BASE_URL ??
  "https://cdtnadmindev.blob.core.windows.net";
export const AZURE_CONTAINER =
  process.env.NEXT_PUBLIC_AZURE_CONTAINER ?? "cdtn-dev";
export const COMMIT = process.env.NEXT_PUBLIC_COMMIT ?? "";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:3000`;
export const PACKAGE_VERSION = version;
export const PIWIK_SITE_ID = process.env.NEXT_PUBLIC_PIWIK_SITE_ID ?? "";
export const PIWIK_URL = process.env.NEXT_PUBLIC_PIWIK_URL ?? "";
export const IS_PREPROD =
  process.env.NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT ?? false;
export const IS_PROD =
  process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT ?? false;
export const ENTERPRISE_API_URL =
  "https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1";

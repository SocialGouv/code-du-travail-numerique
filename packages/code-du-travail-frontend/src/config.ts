const { version } = require("../package.json");

export const API_ENTREPRISE_URL =
  process.env.NEXT_PUBLIC_API_ENTREPRISE_URL ??
  "https://entreprise.data.gouv.fr/api/sirene";
export const API_SIRET2IDCC_URL =
  process.env.NEXT_PUBLIC_API_SIRET2IDCC_URL ??
  "https://siret2idcc.fabrique.social.gouv.fr/api/v2";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337/api/v1";
export const AZURE_BASE_URL =
  process.env.NEXT_PUBLIC_AZURE_BASE_URL ??
  "https://cdtnadmindev.blob.core.windows.net";
export const AZURE_CONTAINER =
  process.env.NEXT_PUBLIC_AZURE_CONTAINER ?? "cdtn-dev";
export const COMMIT = process.env.NEXT_PUBLIC_COMMIT ?? "";
export const FRONTEND_HOST = process.env.NEXT_PUBLIC_FRONTEND_HOST
  ? `https://${process.env.NEXT_PUBLIC_FRONTEND_HOST}`
  : `http://localhost:${process.env.NEXT_PUBLIC_FRONTEND_PORT ?? 3000}`;
export const PACKAGE_VERSION = process.env.NEXT_PUBLIC_VERSION ?? version;
export const PIWIK_SITE_ID = process.env.NEXT_PUBLIC_PIWIK_SITE_ID ?? "";
export const PIWIK_URL = process.env.NEXT_PUBLIC_PIWIK_URL ?? "";

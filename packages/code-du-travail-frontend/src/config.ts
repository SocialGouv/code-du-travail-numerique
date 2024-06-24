const { version } = require("../package.json");

export const BUCKET_URL =
  process.env.NEXT_PUBLIC_BUCKET_URL ??
  "https://cdtn-prod-public.s3.gra.io.cloud.ovh.net/preview";
export const BUCKET_DEFAULT_FOLDER =
  process.env.NEXT_PUBLIC_BUCKET_DEFAULT_FOLDER ?? "default";
export const BUCKET_SITEMAP_FOLDER =
  process.env.NEXT_PUBLIC_BUCKET_SITEMAP_FOLDER ?? "sitemap";
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
export const REVALIDATE_TIME = 1800; // 30 minutes
export const REVALIDATE_TIME_DAY = 86400; // 1 day
export const API_GEO_URL = "https://geo.api.gouv.fr";
export const DEBOUNCE_TIME_MS = 300;
export const API_GEO_MAX_SEARCH_RESULTS = 10;

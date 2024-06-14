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
export const ENTERPRISE_API_URL = "https://recherche-entreprises.api.gouv.fr";
export const REVALIDATE_TIME = 1800; // 30 minutes

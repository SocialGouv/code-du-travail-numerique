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
export const PIWIK_SITE_ID = process.env.NEXT_PUBLIC_PIWIK_SITE_ID ?? "3";
export const PIWIK_URL =
  process.env.NEXT_PUBLIC_PIWIK_URL ?? "https://matomo.fabrique.social.gouv.fr";
export const IS_PREPROD =
  process.env.NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT ?? false;
export const IS_PROD =
  process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT ?? false;
export const ENTERPRISE_API_URL = "https://recherche-entreprises.api.gouv.fr";
export const API_GEO_URL = "https://geo.api.gouv.fr";
export const REVALIDATE_TIME = 1800; // 30 minutes
export const REVALIDATE_TIME_DAY = 86400; // 1 day
export const DEBOUNCE_TIME_MS = 300;
export const API_GEO_MAX_SEARCH_RESULTS = 10;
export const SUGGEST_DEBOUNCE_DELAY = 200;
export const SUGGEST_MAX_RESULTS = 5;
export const WIDGETS_PATH = /\/widgets\/.*/;
export const MAX_RELATED_ITEMS_MODELS_AND_TOOLS = 2;
export const MAX_RELATED_ITEMS_ARTICLES = 4;

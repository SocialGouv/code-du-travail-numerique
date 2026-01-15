const { version } = require("../package.json");

type EnvironmentType = "development" | "preprod" | "production";
export const BUCKET_URL =
  process.env.NEXT_PUBLIC_BUCKET_URL ??
  "https://cdtn-dev-public.s3.gra.io.cloud.ovh.net";
export const BUCKET_FOLDER = process.env.NEXT_PUBLIC_BUCKET_FOLDER ?? "preview";
export const BUCKET_SITEMAP_FOLDER =
  process.env.NEXT_PUBLIC_BUCKET_SITEMAP_FOLDER ?? "sitemap";
export const COMMIT = process.env.NEXT_PUBLIC_COMMIT ?? "";
// Beware: Docker/GHA can pass an empty string build-arg, which would break `new URL(SITE_URL)`.
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const SITE_URL =
  RAW_SITE_URL && RAW_SITE_URL.trim().length > 0
    ? RAW_SITE_URL
    : "http://localhost:3000";
export const PACKAGE_VERSION = version;
export const PIWIK_SITE_ID = process.env.NEXT_PUBLIC_PIWIK_SITE_ID ?? "3";
export const PIWIK_URL =
  process.env.NEXT_PUBLIC_PIWIK_URL ?? "https://matomo.fabrique.social.gouv.fr";
export const IS_PREPROD =
  process.env.NEXT_PUBLIC_IS_PREPRODUCTION_DEPLOYMENT ?? false;
export const IS_PROD =
  process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT ?? false;
export const ENV = (process.env.NEXT_PUBLIC_CDTN_ENV ??
  "development") as EnvironmentType;
export const ENTERPRISE_API_URL = "https://recherche-entreprises.api.gouv.fr";
export const API_GEO_URL = "https://geo.api.gouv.fr";
export const DEBOUNCE_TIME_MS = 300;
export const API_GEO_MAX_SEARCH_RESULTS = 10;
export const SUGGEST_DEBOUNCE_DELAY = 200;
export const SUGGEST_MAX_RESULTS = 5;
export const WIDGETS_PATH = /\/widgets\/.*/;
export const MAX_RELATED_ITEMS_MODELS_AND_TOOLS = 2;
export const MAX_RELATED_ITEMS_ARTICLES = 4;

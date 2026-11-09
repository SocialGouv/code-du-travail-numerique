import { getRuntimeEnv } from "./runtime-env";

const { version } = require("../package.json");

type EnvironmentType = "development" | "preprod" | "production";
export const BUCKET_URL =
  getRuntimeEnv("BUCKET_URL") ??
  "https://cdtn-dev-public.s3.gra.io.cloud.ovh.net";
export const BUCKET_FOLDER = getRuntimeEnv("BUCKET_FOLDER") ?? "preview";
export const BUCKET_SITEMAP_FOLDER =
  getRuntimeEnv("BUCKET_SITEMAP_FOLDER") ?? "sitemap";
// Seule valeur propre à l'image (et non à l'environnement) : fixée au build.
export const COMMIT = process.env.NEXT_PUBLIC_COMMIT ?? "";
export const SITE_URL = getRuntimeEnv("SITE_URL") ?? `http://localhost:3000`;
export const PACKAGE_VERSION = version;
export const PIWIK_SITE_ID = getRuntimeEnv("PIWIK_SITE_ID") ?? "3";
export const PIWIK_URL =
  getRuntimeEnv("PIWIK_URL") ?? "https://matomo.fabrique.social.gouv.fr";
export const IS_PROD = getRuntimeEnv("IS_PRODUCTION_DEPLOYMENT") === "true";
export const ENV = (getRuntimeEnv("CDTN_ENV") ??
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
export const TALLY_ID = undefined;

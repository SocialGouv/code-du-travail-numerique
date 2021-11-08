// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

function getSentryCspUrl() {
  const PACKAGE_VERSION = process.env.VERSION || "";
  const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;
  const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
  const isProduction = FRONTEND_HOST.includes("code.travail.gouv.fr");
  const environment = isProduction ? "production" : "preproduction";
  if (process.env.SENTRY_DSN) {
    return `${process.env.SENTRY_DSN}&sentry_environment=${environment}&sentry_release=${PACKAGE_VERSION}`;
  }
  return "";
}

Sentry.init({
  dsn: getSentryCspUrl(),
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

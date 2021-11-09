// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
const PACKAGE_VERSION = process.env.VERSION || "";

const isPreProduction = PACKAGE_VERSION && /^v\d+-\d+-\d+/.test(FRONTEND_HOST);
const environment = isPreProduction ? "preproduction" : "production";

let DSN = "";

if (SENTRY_DSN !== "" && PACKAGE_VERSION !== "") {
  DSN = `${SENTRY_DSN}&sentry_environment=${environment}&sentry_release=${PACKAGE_VERSION}`;
}

Sentry.init({
  dsn: DSN,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

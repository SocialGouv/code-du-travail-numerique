// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
const isProduction = FRONTEND_HOST.includes("code.travail.gouv.fr");
const isPreproduction = FRONTEND_HOST.includes(
  "preprod.dev.fabrique.social.gouv.fr"
);

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  environment: isProduction
    ? "production"
    : isPreproduction
    ? "preproduction"
    : "dev",
  tracesSampleRate: 1.0,
});

// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { Replay } from "@sentry/browser";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_PUBLIC_DSN || "",
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENV || process.env.SENTRY_ENV || "dev",
  tracesSampleRate: 0.2,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || process.env.SENTRY_RELEASE,

  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 1.0,
  integrations: [new Replay()],
});

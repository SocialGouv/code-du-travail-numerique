// This file configures the initialization of Sentry for edge runtimes
// The config you add here will be used whenever your app runs on the edge

import * as Sentry from "@sentry/nextjs";

const ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENV || "dev";
const IS_PRODUCTION = ENVIRONMENT === "production";

Sentry.init({
  // Basic configuration
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: ENVIRONMENT,
  debug: true, // Temporarily enable debug mode to troubleshoot
  dist: process.env.NEXT_PUBLIC_GITHUB_SHA || "dev",

  // Performance monitoring and source maps
  enableTracing: true,
  attachStacktrace: true, // Attach stack traces to all messages
  normalizeDepth: 10, // Increase stack trace depth for better context
  tracesSampleRate: IS_PRODUCTION ? 0.1 : 1.0, // Sample 10% of traces in prod, all in dev
  maxBreadcrumbs: 100, // Increase from default 100 to capture more context

  // Error tracking configuration
  sampleRate: 1.0, // Capture all errors

  beforeSend(event) {
    // Filter out non-error events in production
    if (IS_PRODUCTION && !event.exception) return null;

    // Filter out known unnecessary errors
    const ignoreErrors = [
      "ResizeObserver loop limit exceeded",
      "Network request failed",
      /^Loading chunk .* failed/,
      /^Loading CSS chunk .* failed/,
    ];

    if (
      event.exception &&
      ignoreErrors.some((pattern) => {
        if (typeof pattern === "string") {
          return event.exception?.values?.[0]?.value?.includes(pattern);
        }
        return pattern.test(event.exception?.values?.[0]?.value || "");
      })
    ) {
      return null;
    }

    return event;
  },
});

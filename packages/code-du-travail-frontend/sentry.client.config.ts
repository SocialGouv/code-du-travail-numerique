// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { replayIntegration } from "@sentry/nextjs";

const ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENV || "dev";
const IS_PRODUCTION = ENVIRONMENT === "production";

// Declare Cypress on window for TypeScript
declare global {
  interface Window {
    Cypress?: unknown;
  }
}

// Disable Sentry during Cypress tests
const isCypressTest =
  typeof window !== "undefined" && window.Cypress !== undefined;

Sentry.init({
  // Basic configuration
  dsn: isCypressTest ? undefined : process.env.NEXT_PUBLIC_SENTRY_DSN, // Disable Sentry in Cypress by setting DSN to undefined
  environment: ENVIRONMENT,
  debug: true, // Temporarily enable debug mode to troubleshoot
  dist: process.env.NEXT_PUBLIC_GITHUB_SHA || "dev",

  // Performance monitoring and source maps
  enableTracing: true,
  attachStacktrace: true, // Attach stack traces to all messages
  normalizeDepth: 10, // Increase stack trace depth for better context
  tracesSampleRate: IS_PRODUCTION ? 0.1 : 1.0, // Sample 10% of traces in prod, all in dev
  maxBreadcrumbs: 100, // Increase from default 100 to capture more context

  // Session replay configuration
  replaysSessionSampleRate: IS_PRODUCTION ? 0.1 : 0.5, // Sample 10% of sessions in prod, 50% in dev
  replaysOnErrorSampleRate: 1.0, // Always capture sessions with errors

  // Error tracking configuration
  sampleRate: 1.0, // Capture all errors
  autoSessionTracking: true, // Enable automatic session tracking
  sendClientReports: true, // Enable immediate client reports

  beforeSend(event) {
    console.log("Sentry beforeSend called with event:", {
      eventId: event.event_id,
      type: event.type,
      exception: event.exception?.values?.[0],
      environment: event.environment,
    });

    // Filter out non-error events in production
    if (IS_PRODUCTION && !event.exception) {
      console.log("Filtering out non-error event in production");
      return null;
    }

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

  integrations: [
    replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
      useCompression: false, // https://github.com/nuxt-community/sentry-module/issues/562#issuecomment-1516338000 , see also https://github.com/getsentry/sentry-javascript/issues/7302 (but not evocated the problem of selfhost instance on this issue)
    }),
  ],
});

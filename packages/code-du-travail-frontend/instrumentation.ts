import * as Sentry from "@sentry/nextjs";

const ENVIRONMENT =
  process.env.NEXT_PUBLIC_SENTRY_ENV || process.env.SENTRY_ENVIRONMENT || "dev";
const IS_PRODUCTION = ENVIRONMENT === "production";

// Check for Cypress test environment
const IS_CYPRESS_TEST = process.env.CYPRESS === "true";

const DIST =
  process.env.NEXT_PUBLIC_GITHUB_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  "dev";

const RELEASE =
  process.env.NEXT_PUBLIC_SENTRY_RELEASE ||
  process.env.SENTRY_RELEASE ||
  process.env.NEXT_PUBLIC_GITHUB_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  "dev";

function shouldIgnoreError(errorValue: string | undefined): boolean {
  if (!errorValue) return false;

  const ignoreErrors: Array<string | RegExp> = [
    "ResizeObserver loop limit exceeded",
    "Network request failed",
    /^Loading chunk .* failed/,
    /^Loading CSS chunk .* failed/,
    // Common transient infra/network errors on the server
    /^ECONNREFUSED/,
    /^ECONNRESET/,
    /^ETIMEDOUT/,
    "Database connection timeout",
  ];

  return ignoreErrors.some((pattern) => {
    if (typeof pattern === "string") return errorValue.includes(pattern);
    return pattern.test(errorValue);
  });
}

/**
 * Next.js instrumentation entrypoint.
 * Sentry v10 requires `Sentry.init()` to be called from this hook (server + edge).
 */
export async function register() {
  // Disable Sentry entirely during Cypress runs.
  if (IS_CYPRESS_TEST) return;

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  const commonOptions = {
    dsn,
    environment: ENVIRONMENT,
    dist: DIST,
    release: RELEASE,

    attachStacktrace: true,
    normalizeDepth: 10,
    maxBreadcrumbs: 100,

    tracesSampleRate: IS_PRODUCTION ? 0.1 : 1.0,
    sampleRate: 1.0,
  } as const;

  // Next sets NEXT_RUNTIME to "nodejs" or "edge" when executing this file.
  const runtime = process.env.NEXT_RUNTIME;

  Sentry.init({
    ...commonOptions,
    beforeSend(event) {
      // Filter out known unnecessary errors
      const errorValue = event.exception?.values?.[0]?.value;
      if (shouldIgnoreError(errorValue)) return null;

      // Keep everything else (don't block transactions/replays)
      return event;
    },
  });

  // Tags are set on the scope (not as init options)
  Sentry.setTag("runtime", runtime ?? "unknown");
  Sentry.setTag("framework", "next.js");
}

export const onRequestError = Sentry.captureRequestError;

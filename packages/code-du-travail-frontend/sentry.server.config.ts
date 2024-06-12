import * as Sentry from "@sentry/nextjs";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_PUBLIC_DSN || "",
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENV || process.env.SENTRY_ENV || "dev",
  tracesSampleRate: 0.2,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || process.env.SENTRY_RELEASE,
});

registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()],
});

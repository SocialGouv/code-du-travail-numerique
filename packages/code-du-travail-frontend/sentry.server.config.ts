import * as Sentry from "@sentry/nextjs";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { NetInstrumentation } from "@opentelemetry/instrumentation-net";
import { GenericPoolInstrumentation } from "@opentelemetry/instrumentation-generic-pool";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_PUBLIC_DSN || "",
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENV || process.env.SENTRY_ENV || "dev",
  tracesSampleRate: 0.2,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || process.env.SENTRY_RELEASE,
});

Sentry.addOpenTelemetryInstrumentation(
  new GenericPoolInstrumentation(),
  new HttpInstrumentation(),
  new NetInstrumentation()
);

import * as Sentry from "@sentry/nextjs";

type ErrorType = "api" | "client" | "middleware" | "server";

interface RequestContext {
  method?: string;
  path?: string;
  url?: string;
}

export interface ErrorContext extends RequestContext {
  [key: string]: unknown;
  type: ErrorType;
}

export function captureError(error: unknown, context: ErrorContext): Error {
  // Ensure we have an Error object
  const errorObject = error instanceof Error ? error : new Error(String(error));

  const contexts: Record<string, Record<string, unknown>> = {
    error: {
      message: errorObject.message,
      name: errorObject.name,
      stack: errorObject.stack,
    },
    runtime: {
      environment: process.env.NEXT_PUBLIC_EGAPRO_ENV || "dev",
      type: context.type,
    },
  };

  // Add request context for API and middleware errors
  if (context.type === "api" || context.type === "middleware") {
    contexts.request = {
      url: context.url,
      method: context.method,
      path: context.path,
    };
  }

  // Add any additional context as custom context
  const customContext: Record<string, unknown> = {};
  Object.entries(context).forEach(([key, value]) => {
    if (!["type", "url", "method", "path"].includes(key)) {
      customContext[key] = value;
    }
  });

  if (Object.keys(customContext).length > 0) {
    contexts.custom = customContext;
  }

  Sentry.captureException(errorObject, {
    contexts,
    tags: {
      errorType: context.type,
      framework: "next.js",
    },
  });

  return errorObject;
}
